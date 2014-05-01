class ParksController < ApplicationController
  layout 'application'

  def index
    respond_to do |format|
      format.html {}
      format.json { render json: [{ author: 'my auth', text: 'my text' }] }
    end
  end
end
