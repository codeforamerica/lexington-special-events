class CreateJoinTableParkAmenity < ActiveRecord::Migration
  def change
    create_table :park_amenities do |t|
      t.belongs_to :park
      t.belongs_to :amenity
      t.index [:park_id, :amenity_id]
      t.index [:amenity_id, :park_id]
    end
  end
end
