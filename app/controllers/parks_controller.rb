class ParksController < ApplicationController
  layout 'application'

  def index
    respond_to do |format|
      format.html {}
      format.json { render file: 'public/data/lexparks' }
    end
  end
end
