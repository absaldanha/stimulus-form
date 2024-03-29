describe('Equal validator fields', () => {
  beforeEach(() => {
    cy.visit('http://vite:3636/fixtures/equal_fields_form.html');
  });

  it('Prevents form submission when fields are not equal to the given value', () => {
    cy.contains('Submit').click();
    cy.get('[data-testid="test"]').should('have.text', 'Must be equal to test');

    cy.get('#test').type('wrong');
    cy.contains('Submit').click();
    cy.get('[data-testid="test"]').should('have.text', 'Must be equal to test');
  });

  it('Submits the form when all fields are filled', () => {
    const alertStub = cy.stub();

    cy.on('window:alert', alertStub);

    cy.get('#test').type('test');
    cy.contains('Submit')
      .click()
      .then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith('Submit successfull')
      });
  });
});
