# frozen_string_literal: true

module StimulusForm
  class BaseComponent < ViewComponent::Base
    extend Dry::Initializer

    include ActionView::Helpers::TagHelper
  end
end
