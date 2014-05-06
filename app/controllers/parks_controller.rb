class ParksController < ApplicationController
  layout 'application'

  def index
    respond_to do |format|
      format.html {
        @parks_geo = JSON.parse(File.read('public/data/lexparks.json'))
      }
      format.json { render file: 'public/data/lexparks' }
    end
  end
end
