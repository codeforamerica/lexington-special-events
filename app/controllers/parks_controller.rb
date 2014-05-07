class ParksController < ApplicationController
  layout 'application'

  def index
    @parks = Park.all.includes(:amenities).order(:name).map do |p|
      {
        :name => p.name,
        :amenities => {
          'Basketball Courts' => p.amenities.count
        },
      }
    end
    @amenities = Amenity.order(:name).all
  end
end
