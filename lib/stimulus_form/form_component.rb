# frozen_string_literal: true

module StimulusForm
  class FormComponent < BaseComponent
    renders_many :fields

    option :url
    option :method, optional: true
    option :enforce_utf8, optional: true
    option :multipart, optional: true
    option :authenticity_token, optional: true
    option :remote, optional: true
    option :html, type: method(:Hash), default: proc { Hash.new }

    private

    def form_tag_options
      tag_options.merge(html_options)
    end

    def tag_options
      FormComponent.dry_initializer.attributes(self).except(:url, :html)
    end

    def html_options
      html.deep_merge(data: { controller: "form" })
    end
  end
end
