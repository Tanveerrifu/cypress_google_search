
import XLSX from "xlsx";

Cypress.Commands.add("writeToExcel", (filePath, data) => {
  cy.task("writeExcel", { filePath, data });
});

describe("Google Search Automation", () => {
  it("Should search keywords on Google and save longest and shortest options", () => {
    const filePath = "C:\\Users\\Tanvir\\Documents\\Excel.xlsx";

  
    const keywords = [
      "Dhaka",
      "University",
      "Cricket",
      "Bombay",
      "Football",
      "Paper",
      "Knife",
    ];

    
    const results = {};

    
    cy.visit("https://www.google.com");

   
    keywords.forEach((keyword) => {
    
      cy.get('#APjFqb').clear().type(keyword);

      
      cy.get('#c7mM1c > .wM6W7d > span').should("be.visible");

      
      cy.get('#c7mM1c > .wM6W7d > span').contains(keyword).then(() => {
        
        cy.xpath('//div[@id="search"]//div[@class="tF2Cxc"]/div[@class="yuRUbf"]//h3[@class="LC20lb DKV0Md"]')
          .then((resultElements) => {
            const resultsList = [...resultElements].map((el) => el.innerText);

          
            const longestOption = resultsList.reduce((a, b) => (a.length >= b.length ? a : b));
            const shortestOption = resultsList.reduce((a, b) => (a.length <= b.length ? a : b));

         
            results[keyword] = {
              "Longest Option": longestOption,
              "Shortest Option": shortestOption,
            };

          
            cy.writeToExcel(filePath, results);
          });
      });
    });
  });
});
