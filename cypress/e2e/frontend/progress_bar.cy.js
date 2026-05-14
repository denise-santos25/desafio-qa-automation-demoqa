import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { ProgressBarPage } from "../../support/pages/ProgressBarPage";

const page = new ProgressBarPage();
let stoppedValue;

Given("que eu acesso a pagina Progress Bar", () => {
  page.open();
});

When("eu inicio a progress bar", () => {
  page.start();
});

When("paro a progress bar antes de 25 porcento", () => {
  page.stopBefore(25);
  page.value().then((value) => {
    stoppedValue = value;
  });
});

Then("o valor da progress bar deve ser menor ou igual a 25 porcento", () => {
  expect(stoppedValue).to.be.lte(25);
});

When("eu inicio novamente e aguardo chegar a 100 porcento", () => {
  page.start();
  page.waitUntilComplete();
});

Then("devo resetar a progress bar", () => {
  page.reset();
});
