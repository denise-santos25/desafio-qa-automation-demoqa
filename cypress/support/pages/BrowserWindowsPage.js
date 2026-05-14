import { BasePage } from "./BasePage";

export class BrowserWindowsPage extends BasePage {
  open() {
    this.visit("/browser-windows");
  }

  clickNewWindow() {
    cy.window().then((win) => {
      cy.stub(win, "open").as("newWindow");
    });

    cy.get("#windowButton").click();
  }

  assertNewWindowMessage(message) {
    cy.get("@newWindow").should("have.been.calledOnce");
    cy.get("@newWindow").then((stub) => {
      const targetUrl = stub.firstCall.args[0];
      expect(targetUrl).to.contain("/sample");

      cy.request(targetUrl).its("body").should("contain", message);
    });
  }
}
