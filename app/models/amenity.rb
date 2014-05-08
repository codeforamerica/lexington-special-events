class Amenity < ActiveRecord::Base
  has_many :park_amenities
  has_many :parks, through: :park_amenities
end
