describe('Max Length validator fields', () => {
  beforeEach(() => {
    cy.visit('http://vite:3636/fixtures/max_length_fields_form.html');
  });

  it('Prevents form submission when fields are too long', () => {
    cy.get('#test').type('abcdefghikamdiwjdiwlal');
    cy.contains('Submit').click();
    cy.get('[data-testid="test"]').should('have.text', 'Is too long (maximum is 10 character(s))');
  });

  it('Submits the form when fields are filled with correct length', () => {
    const alertStub = cy.stub();

    cy.on('window:alert', alertStub);

    cy.get('#test').type('abcd');

    cy.contains('Submit')
      .click()
      .then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith('Submit successfull')
      });
  });
});
