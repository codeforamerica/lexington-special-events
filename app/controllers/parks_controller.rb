class ParksController < ApplicationController
  layout 'application'

  def index
    @parks_geo = JSON.parse(File.read('public/data/lexparks.json'))
    @parks = @parks_geo['features'].map { |p| p.select { |key,_| key == 'properties' } }
    respond_to do |format|
      format.html { }
      format.json { render json: @parks }
    end
  end
end
