class ParksController < ApplicationController
  layout 'application'

  def index
    respond_to do |format|
      format.html {}
      format.json { render json: [
        {properties: {name: 'Masterson', amenities: ['my amenity']}},
        {properties: {name: 'Other park', amenities: ['your amenity']}}
      ]}
    end
  end
end
