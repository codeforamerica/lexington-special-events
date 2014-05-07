class ParksController < ApplicationController
  layout 'application'

  def index
    @parks = Park.all.includes(:amenities).map do |p|
      {
        properties:
        {
          'PARK_NAME' => p.name,
          'NAME' => p.name,
          'BASKETBALL' => p.amenities.count
        }
      }
    end
    respond_to do |format|
      format.html { }
      format.json { render json: @parks }
    end
  end
end
