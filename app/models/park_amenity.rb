class ParkAmenity < ActiveRecord::Base
  belongs_to :park
  belongs_to :amenity
end
