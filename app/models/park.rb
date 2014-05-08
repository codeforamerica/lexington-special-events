class Park < ActiveRecord::Base
  has_many :park_amenities
  has_many :amenities, through: :park_amenities
end
