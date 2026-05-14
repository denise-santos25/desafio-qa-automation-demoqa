import { BasePage } from "./BasePage";

export class PracticeFormPage extends BasePage {
  open() {
    this.visit("/automation-practice-form");
  }

  fillForm(user) {
    cy.get("#firstName").type(user.firstName);
    cy.get("#lastName").type(user.lastName);
    cy.get("#userEmail").type(user.email);
    cy.get('label[for="gender-radio-1"]').click({ force: true });
    cy.get("#userNumber").type(user.mobile);
    cy.get("#dateOfBirthInput").click().type(`{selectall}${user.birthDate}{enter}`);
    cy.get("#subjectsInput").type(`${user.subject}{enter}`);
    cy.get('label[for="hobbies-checkbox-1"]').click({ force: true });
    cy.get("#uploadPicture").selectFile("cypress/fixtures/sample-upload.txt", { force: true });
    cy.get("#currentAddress").type(user.address);
    cy.get("#state").click();
    cy.get("#react-select-3-input").type(`${user.state}{enter}`, { force: true });
    cy.get("#city").click();
    cy.get("#react-select-4-input").type(`${user.city}{enter}`, { force: true });
  }

  submit() {
    cy.get("#submit").click({ force: true });
  }

  assertConfirmationModal(user) {
    cy.get(".modal-content").should("be.visible");
    cy.get("#example-modal-sizes-title-lg").should("contain", "Thanks for submitting the form");
    cy.get("tbody").within(() => {
      cy.contains(`${user.firstName} ${user.lastName}`).should("be.visible");
      cy.contains(user.email).should("be.visible");
      cy.contains(user.mobile).should("be.visible");
      cy.contains("sample-upload.txt").should("be.visible");
    });
  }

  closeModal() {
    cy.contains("button", "Close").click({ force: true });
    cy.get("body").type("{esc}", { force: true });
    cy.get(".modal-content").should("not.exist");
  }
}
