class ParksController < ApplicationController
  layout 'application'

  def index
    @parks = Park.all.includes(:amenities).order(:name).map do |p|
      {
        :name => p.name,
        :address => p.address_1,
        :amenities => p.amenities.map { |a| {name: a.name} },
      }
    end
    @amenities = Amenity.order(:name).all
    respond_to do |format|
      format.html { }
      format.json { render file: 'public/data/lex_parks.geojson' }
    end
  end
end
