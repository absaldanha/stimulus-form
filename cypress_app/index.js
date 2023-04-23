import { Application } from '@hotwired/stimulus';
import { FormController } from '../dist/stimulus_form';

const application = Application.start();
application.debug = true;
window.Stimulus = application;

application.register('form', FormController);

window.submitSuccessfull = function submitSuccessfull(event) {
  event.preventDefault();
  alert('Submit successfull');
}
