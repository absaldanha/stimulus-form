describe('Length validator fields', () => {
  beforeEach(() => {
    cy.visit('http://vite:3636/fixtures/length_fields_form.html');
  });

  it('Prevents form submission when fields are with incorrect length', () => {
    cy.contains('Submit').click();
    cy.get('[data-testid="test"]').should('have.text', 'Is the wrong length (should be 10 character(s))');

    cy.get('#test').type('abc');
    cy.contains('Submit').click();
    cy.get('[data-testid="test"]').should('have.text', 'Is the wrong length (should be 10 character(s))');

    cy.get('#test').type('abcdefghikamdiwjdiwlal');
    cy.contains('Submit').click();
    cy.get('[data-testid="test"]').should('have.text', 'Is the wrong length (should be 10 character(s))');
  });

  it('Submits the form when fields are filled with correct length', () => {
    const alertStub = cy.stub();

    cy.on('window:alert', alertStub);

    cy.get('#test').type('abcdefghik');

    cy.contains('Submit')
      .click()
      .then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith('Submit successfull')
      });
  });
});
