class CreateParks < ActiveRecord::Migration
  def change
    create_table :parks do |t|
      t.string :name
    end
  end
end
