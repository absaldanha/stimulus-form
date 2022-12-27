# frozen_string_literal: true

lib = File.expand_path("lib", __dir__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)

require "stimulus_form/version"

Gem::Specification.new do |spec|
  spec.name          = "stimulus_form"
  spec.version       = StimulusForm::VERSION::STRING
  spec.authors       = ["Alexandre Saldanha"]
  spec.email         = ["absaldanha@protonmail.com"]
  spec.summary       = "View components for the stimulus_form npm package"
  spec.license       = "MIT"

  spec.required_ruby_version = [">= 3.0", "< 3.3"]

  spec.metadata = {
    "source_code_uri" => "https://github.com/absaldanha/active_event"
  }

  spec.files = Dir["lib/**/*"]

  spec.require_path = "lib"

  spec.add_dependency "actionview", [">= 6.1", "< 8.0"]
  spec.add_dependency "activesupport", [">= 6.1", "< 8.0"]
  spec.add_dependency "zeitwerk", [">= 2.6", "< 3.0"]
  spec.add_dependency "dry-initializer", [">= 3.1", "< 4.0"]
  spec.add_dependency "view_component", [">= 2.80", "< 3.0"]

  spec.add_development_dependency "rails", "~> 6.1"
  spec.add_development_dependency "minitest", "~> 5.14"
  spec.add_development_dependency "minitest-focus", "~> 1.2"
  spec.add_development_dependency "minitest-reporters", "~> 1.4"
  spec.add_development_dependency "pry-byebug", "~> 3.7"
  spec.add_development_dependency "rake", "~> 13.0"
  spec.add_development_dependency "rubocop", "~> 1.18"
  spec.add_development_dependency "rubocop-performance", "~> 1.11"
  spec.add_development_dependency "simplecov", "0.21.2"
end
