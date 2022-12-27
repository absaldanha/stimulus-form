# frozen_string_literal: true

require "test_helper"

module StimulusForm
  class FormComponentTest < ::ViewComponent::TestCase
    def test_render_form_tag_with_given_url
      result = render_inline(FormComponent.new(url: "/foo"))

      assert_equal "", result.to_s
    end
  end
end
