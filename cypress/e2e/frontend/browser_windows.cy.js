import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { BrowserWindowsPage } from "../../support/pages/BrowserWindowsPage";

const page = new BrowserWindowsPage();

Given("que eu acesso a pagina Browser Windows", () => {
  page.open();
});

When("eu clico no botao New Window", () => {
  page.clickNewWindow();
});

Then("uma nova janela deve ser aberta com a mensagem {string}", (message) => {
  page.assertNewWindowMessage(message);
});
