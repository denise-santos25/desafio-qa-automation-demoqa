Cypress.Commands.add("randomUser", () => {
  const id = Date.now();

  return {
    firstName: "QA",
    lastName: `Automation${id}`,
    email: `qa.automation.${id}@example.com`,
    gender: "Male",
    mobile: String(id).slice(-10).padStart(10, "9"),
    birthDate: "15 May 1990",
    subject: "Computer Science",
    hobby: "Sports",
    address: `Rua Teste ${id}`,
    state: "NCR",
    city: "Delhi",
    age: "33",
    salary: "15000",
    department: "Quality",
  };
});

Cypress.Commands.add("forceClick", { prevSubject: "element" }, (subject) => {
  cy.wrap(subject).click({ force: true });
});
