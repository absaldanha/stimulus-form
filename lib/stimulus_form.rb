# frozen_string_literal: true

require "view_component"
require "action_view"
require "dry-initializer"
require "zeitwerk"

loader = Zeitwerk::Loader.for_gem
loader.setup

module StimulusForm
end
