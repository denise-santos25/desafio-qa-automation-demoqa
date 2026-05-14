import { BasePage } from "./BasePage";

const orderedItems = ["One", "Two", "Three", "Four", "Five", "Six"];

export class SortablePage extends BasePage {
  open() {
    this.visit("/sortable");
  }

  reorderAscending() {
    cy.get("#demo-tabpane-list .list-group-item").then(($items) => {
      const current = [...$items].map((item) => item.innerText.trim());

      orderedItems.forEach((label, targetIndex) => {
        const currentIndex = current.indexOf(label);
        if (currentIndex === targetIndex) {
          return;
        }

        const [item] = current.splice(currentIndex, 1);
        current.splice(targetIndex, 0, item);
        this.dragItem(currentIndex, targetIndex);
      });
    });
  }

  assertAscendingOrder() {
    cy.get("#demo-tabpane-list .list-group-item").then(($items) => {
      const values = [...$items].map((item) => item.innerText.trim());
      expect(values).to.deep.eq(orderedItems);
    });
  }

  dragItem(fromIndex, toIndex) {
    cy.get("#demo-tabpane-list .list-group-item").eq(fromIndex).then(($source) => {
      cy.get("#demo-tabpane-list .list-group-item").eq(toIndex).then(($target) => {
        const dataTransfer = new DataTransfer();
        cy.wrap($source)
          .trigger("dragstart", { dataTransfer, force: true })
          .trigger("mousedown", { which: 1, force: true });
        cy.wrap($target)
          .trigger("dragover", { dataTransfer, force: true })
          .trigger("drop", { dataTransfer, force: true })
          .trigger("mouseup", { force: true });
      });
    });
  }
}
