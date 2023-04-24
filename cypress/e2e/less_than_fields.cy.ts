describe('Less Than validator fields', () => {
  beforeEach(() => {
    cy.visit('http://vite:3636/fixtures/less_than_fields_form.html');
  });

  it('Prevents form submission when text fields are greater than or equal to the given value', () => {
    cy.get('#test_text').type('12');
    cy.contains('Submit').click();
    cy.get('[data-testid="test_text"]').should('have.text', 'Must be less than 10');
  });

  it('Prevents form submission when number fields are greater than or equal to the given value', () => {
    cy.get('#test_number').type('10');
    cy.contains('Submit').click();
    cy.get('[data-testid="test_number"]').should('have.text', 'Must be less than 10');
  });

  it('Submits the form when fields are less than the given value', () => {
    const alertStub = cy.stub();

    cy.on('window:alert', alertStub);

    cy.get('#test_text').type('9');
    cy.get('#test_number').type('5');

    cy.contains('Submit')
      .click()
      .then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith('Submit successfull')
      });
  });
});
