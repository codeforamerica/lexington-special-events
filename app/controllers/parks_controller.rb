class ParksController < ApplicationController
  layout 'application'

  def index
    respond_to do |format|
      format.html {}
      format.json { render json: [
        { name: 'Masterson', amenities: 'my amenity' },
        { name: 'Other park', amenities: 'your amenity' }
      ] }
    end
  end
end
