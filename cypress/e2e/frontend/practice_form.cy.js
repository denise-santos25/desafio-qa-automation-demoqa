import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { PracticeFormPage } from "../../support/pages/PracticeFormPage";

const page = new PracticeFormPage();
let user;

Given("que eu acesso o formulario Practice Form", () => {
  cy.randomUser().then((randomUser) => {
    user = randomUser;
  });
  page.open();
});

When("eu preencho todos os campos obrigatorios e complementares", () => {
  page.fillForm(user);
});

When("submeto o formulario", () => {
  page.submit();
});

Then("devo visualizar o popup de confirmacao", () => {
  page.assertConfirmationModal(user);
});

Then("devo fechar o popup de confirmacao", () => {
  page.closeModal();
});
