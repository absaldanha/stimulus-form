# frozen_string_literal: true

module StimulusForm
  class FieldComponent < BaseComponent
    option :name
    option :html, type: method(:Hash), default: proc { Hash.new }
  end
end
