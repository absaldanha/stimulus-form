describe('Integration Form', () => {
  beforeEach(() => {
    cy.visit('http://vite:3636/fixtures/integration_form.html');
  });

  it('Sends the form when all fields are correctly filled', () => {
    const alertStub = cy.stub();
    cy.on('window:alert', alertStub);

    cy.get("#first_name").type('Joe');
    cy.get("#last_name").type('Doe');
    cy.get("#age").type('20');
    cy.get("#coffe_number").type('4');
    cy.get("#bio").type('I like many things, and I dislike other things.');
    cy.get("#email").type('joe.doe@mail.com');
    cy.get("#password").type('verystrongandlongpassword');
    cy.get("#password_confirmation").type('verystrongandlongpassword');
    cy.get("#captcha").type('captcha');

    cy.contains('Submit')
      .click()
      .then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith('Submit successfull')
      });
  });
});
