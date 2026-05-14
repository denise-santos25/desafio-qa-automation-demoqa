import { BasePage } from "./BasePage";

export class WebTablesPage extends BasePage {
  open() {
    this.visit("/webtables");
  }

  createRecord(user) {
    cy.get("#addNewRecordButton").click();
    this.fillRecordModal(user);
    cy.get("#submit").click();
  }

  editRecord(currentEmail, nextUser) {
    this.search(currentEmail);
    this.rowByEmail(currentEmail).within(() => {
      cy.get('[title="Edit"]').click({ force: true });
    });
    this.fillRecordModal(nextUser, true);
    cy.get("#submit").click();
  }

  deleteRecord(email) {
    this.search(email);
    this.rowByEmail(email).within(() => {
      cy.get('[title="Delete"]').click({ force: true });
    });
  }

  assertRecordExists(email) {
    this.search(email);
    this.rowByEmail(email).should("be.visible");
  }

  assertRecordDoesNotExist(email) {
    this.search(email);
    cy.contains(".rt-tr", email).should("not.exist");
  }

  deleteVisibleRecords() {
    this.search("qa.automation.");

    cy.get("body").then(($body) => {
      const deleteButton = $body.find('[title="Delete"]').first();
      if (!deleteButton.length) {
        return;
      }

      cy.wrap(deleteButton).click({ force: true });
      this.deleteVisibleRecords();
    });
  }

  assertNoDynamicRecords() {
    this.search("qa.automation.");
    cy.contains("qa.automation.").should("not.exist");
  }

  fillRecordModal(user, clear = false) {
    const fields = {
      "#firstName": user.firstName,
      "#lastName": user.lastName,
      "#userEmail": user.email,
      "#age": user.age,
      "#salary": user.salary,
      "#department": user.department,
    };

    Object.entries(fields).forEach(([selector, value]) => {
      const field = cy.get(selector);
      if (clear) {
        field.clear();
      }
      cy.get(selector).type(value);
    });
  }

  rowByEmail(email) {
    return cy.contains(email).parent().parent();
  }

  search(value) {
    cy.get("#searchBox").clear().type(value);
  }
}
