# frozen_string_literal: true

# require "pry-byebug"; binding.pry

ENV["RAILS_ENV"] = "test"

if ENV["COVERAGE"]
  require "simplecov"
end

# require "bundler/setup"
require "minitest/autorun"
require "minitest/focus"
require "minitest/reporters"
require "rails"
require "rails/test_help"
require "view_component/test_helpers"
require "stimulus_form"

Minitest::Reporters.use! [Minitest::Reporters::DefaultReporter.new(color: true)]

require File.expand_path("../sandbox/config/environment.rb", __dir__)
