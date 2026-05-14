import "./commands";

Cypress.on("uncaught:exception", (error) => {
  if (error.message.includes("findDOMNode is not a function")) {
    return false;
  }

  return true;
});

beforeEach(() => {
  cy.intercept({ resourceType: /xhr|fetch/ }, (req) => {
    req.continue();
  });

  cy.window({ log: false }).then((win) => {
    const style = win.document.createElement("style");
    style.innerHTML = `
      #fixedban, footer, iframe[id^="google_ads"], .adsbygoogle {
        display: none !important;
      }
    `;
    win.document.head.appendChild(style);
  });
});
