/// <reference types="cypress" />
describe("Login successfully", () => {
  it("Visits the login page when no auth provided", () => {
    cy.visit("http://localhost:3000");
    cy.url().should("include", "/login");

    cy.contains("Login").click();
    cy.get("[id=username-input]").focus();
    cy.contains("Enter Username");
    cy.contains("Enter Password");

    cy.get("[id=username-input]").type("Dung");
    cy.get("[id=password-input]").type("123");
    cy.contains("Login").click();
  });
});

describe("Login with wrong username or password", () => {
  it("Visits the login page when no auth provided", () => {
    cy.visit("http://localhost:3000");
    cy.url().should("include", "/login");

    cy.contains("Login").click();

    cy.get("[id=username-input]").focus();
    cy.contains("Enter Username");
    cy.contains("Enter Password");

    // enter wrong username
    cy.get("[id=username-input]").type("Dun");
    cy.get("[id=password-input]").type("123");
    cy.contains("Login").click();

    cy.get("[id=username-input]").focus();
    cy.contains("Username not found");

    //enter wrong password
    cy.get("[id=username-input]").clear();
    cy.get("[id=username-input]").type("Dung");
    cy.get("[id=password-input]").clear();
    cy.get("[id=password-input]").type("12");
    cy.contains("Login").click();
    cy.contains("Your password is incorrect");
  });
});

describe("Visit register page", () => {
  it("Visit register page when click register", () => {
    cy.visit("http://localhost:3000");
    cy.get("[id=register]").click();
    cy.url().should("include", "/register");
  });
});
