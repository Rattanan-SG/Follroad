describe("Login", () => {
  context("login with valid user", () => {
    it("Go to login page", () => {
      cy.visit(
        "https://follroad.netlify.com/?fbclid=IwAR15G4iTl_UE6jeWYNE2zZzeWRmxRQzJWYFiRVXnCtg6Rs9YjPdLuUtyGzg"
      );
    });
    it("click login", () => {
      cy.get(":nth-child(7) > .v-btn__content").click();
    });
  });
});
