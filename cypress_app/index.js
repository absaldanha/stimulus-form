import { Application } from '@hotwired/stimulus';
import { FormController } from '../dist/stimulus_form';

const application = Application.start();
application.debug = true;
window.Stimulus = application;

FormController.errorMessages.locale = 'pt-BR'

application.register('form', FormController);
