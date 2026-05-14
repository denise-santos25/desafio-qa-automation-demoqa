import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { SortablePage } from "../../support/pages/SortablePage";

const page = new SortablePage();

Given("que eu acesso a pagina Sortable", () => {
  page.open();
});

When("eu reorganizo os elementos usando drag and drop", () => {
  page.reorderAscending();
});

Then("os elementos devem estar em ordem crescente", () => {
  page.assertAscendingOrder();
});
