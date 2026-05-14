import { BasePage } from "./BasePage";

export class ProgressBarPage extends BasePage {
  open() {
    this.visit("/progress-bar");
  }

  start() {
    cy.get("#startStopButton").click();
  }

  stopBefore(percentLimit) {
    this.waitUntilAtLeast(10);
    cy.get("#startStopButton").click();
    this.value().should("be.lte", percentLimit);
  }

  waitUntilComplete() {
    this.waitUntilAtLeast(100, 14000);
  }

  reset() {
    cy.get("#resetButton").should("contain", "Reset");
    cy.get("#resetButton").click({ force: true });
    cy.get("#startStopButton").should("contain", "Start");
  }

  value() {
    return cy.get(".progress-bar").invoke("attr", "aria-valuenow").then(Number);
  }

  waitUntilAtLeast(target, timeout = 5000, startedAt = Date.now()) {
    return this.value().then((value) => {
      if (value >= target) {
        return value;
      }

      if (Date.now() - startedAt > timeout) {
        throw new Error(`Progress bar nao chegou em ${target}%. Valor atual: ${value}%`);
      }

      cy.wait(100);
      return this.waitUntilAtLeast(target, timeout, startedAt);
    });
  }
}
