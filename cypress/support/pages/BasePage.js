export class BasePage {
  visit(path) {
    cy.visit(path);
    this.hideAds();
  }

  hideAds() {
    cy.document().then((doc) => {
      const style = doc.createElement("style");
      style.innerHTML = `
        #fixedban, footer, iframe[id^="google_ads"], .adsbygoogle {
          display: none !important;
        }
      `;
      doc.head.appendChild(style);
    });
  }
}
