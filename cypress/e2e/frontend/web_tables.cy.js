import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { WebTablesPage } from "../../support/pages/WebTablesPage";

const page = new WebTablesPage();
let createdUser;
let editedUser;
let dynamicUsers = [];

Given("que eu acesso a pagina Web Tables", () => {
  dynamicUsers = [];
  page.open();
});

When("eu crio um novo registro", () => {
  cy.randomUser().then((user) => {
    createdUser = user;
    page.createRecord(createdUser);
  });
});

When("edito o registro criado", () => {
  cy.randomUser().then((user) => {
    editedUser = {
      ...user,
      firstName: "QAEditado",
      lastName: createdUser.lastName,
      email: `editado.${Date.now()}@example.com`,
    };
    page.editRecord(createdUser.email, editedUser);
  });
});

Then("o registro editado deve aparecer na tabela", () => {
  page.assertRecordExists(editedUser.email);
});

When("eu deleto o registro criado", () => {
  page.deleteRecord(editedUser.email);
});

Then("o registro nao deve mais aparecer na tabela", () => {
  page.assertRecordDoesNotExist(editedUser.email);
});

When("eu crio {int} novos registros dinamicos", (quantity) => {
  Cypress._.times(quantity, () => {
    cy.randomUser().then((user) => {
      dynamicUsers.push(user);
      page.createRecord(user);
    });
  });
});

Then("os {int} registros devem aparecer na tabela", (quantity) => {
  expect(dynamicUsers).to.have.length(quantity);
  dynamicUsers.forEach((user) => {
    page.assertRecordExists(user.email);
  });
});

When("eu deleto todos os registros dinamicos", () => {
  page.deleteVisibleRecords();
});

Then("nenhum registro dinamico deve aparecer na tabela", () => {
  page.assertNoDynamicRecords();
});
