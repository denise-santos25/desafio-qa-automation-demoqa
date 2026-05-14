import { Given, When, Then, After } from "@badeball/cypress-cucumber-preprocessor";

const state = {};

const createPassword = () => `Qa@${Date.now()}x`;

After(() => {
  if (!state.userId || !state.token) {
    return;
  }

  cy.request({
    method: "DELETE",
    url: `/Account/v1/User/${state.userId}`,
    headers: { Authorization: `Bearer ${state.token}` },
    failOnStatusCode: false,
  });
});

Given("que eu crio um usuario valido na API", () => {
  state.username = `qa_${Date.now()}`;
  state.password = createPassword();

  cy.request("POST", "/Account/v1/User", {
    userName: state.username,
    password: state.password,
  }).then((response) => {
    expect(response.status).to.eq(201);
    expect(response.body).to.have.property("userID");
    state.userId = response.body.userID;
  });
});

When("eu gero um token de acesso para o usuario", () => {
  cy.request("POST", "/Account/v1/GenerateToken", {
    userName: state.username,
    password: state.password,
  }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body.status).to.eq("Success");
    expect(response.body.token).to.be.a("string").and.not.be.empty;
    state.token = response.body.token;
  });
});

Then("o usuario deve estar autorizado", () => {
  cy.request("POST", "/Account/v1/Authorized", {
    userName: state.username,
    password: state.password,
  }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.eq(true);
  });
});

When("eu consulto a lista de livros disponiveis", () => {
  cy.request("GET", "/BookStore/v1/Books").then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body.books).to.have.length.greaterThan(1);
    state.selectedBooks = response.body.books.slice(0, 2);
  });
});

When("eu reservo dois livros de livre escolha", () => {
  cy.request({
    method: "POST",
    url: "/BookStore/v1/Books",
    headers: { Authorization: `Bearer ${state.token}` },
    body: {
      userId: state.userId,
      collectionOfIsbns: state.selectedBooks.map((book) => ({ isbn: book.isbn })),
    },
  }).then((response) => {
    expect(response.status).to.eq(201);
    expect(response.body.books.map((book) => book.isbn)).to.deep.eq(
      state.selectedBooks.map((book) => book.isbn),
    );
  });
});

Then("os detalhes do usuario devem exibir os dois livros reservados", () => {
  cy.request({
    method: "GET",
    url: `/Account/v1/User/${state.userId}`,
    headers: { Authorization: `Bearer ${state.token}` },
  }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body.username).to.eq(state.username);
    expect(response.body.books.map((book) => book.isbn)).to.deep.eq(
      state.selectedBooks.map((book) => book.isbn),
    );
  });
});
