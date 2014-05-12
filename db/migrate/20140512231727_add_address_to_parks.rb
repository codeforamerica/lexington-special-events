class AddAddressToParks < ActiveRecord::Migration
  def change
    add_column :parks, :address_1, :string
    add_column :parks, :zip, :string
  end
end
