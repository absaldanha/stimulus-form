describe('Min Length validator fields', () => {
  beforeEach(() => {
    cy.visit('http://vite:3636/fixtures/min_length_fields_form.html');
  });

  it('Prevents form submission when fields are too short', () => {
    cy.get('#test').type('abcde');
    cy.contains('Submit').click();
    cy.get('[data-testid="test"]').should('have.text', 'Is too short (minimum is 10 character(s))');
  });

  it('Submits the form when fields are filled with correct length', () => {
    const alertStub = cy.stub();

    cy.on('window:alert', alertStub);

    cy.get('#test').type('abcdefghijklmn');

    cy.contains('Submit')
      .click()
      .then(() => {
        expect(alertStub.getCall(0)).to.be.calledWith('Submit successfull')
      });
  });
});
