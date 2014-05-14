class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.column :name, :string
      t.column :start, :datetime
      t.column :location, :string
      t.column :street_closings, :string
      t.column :status, :string
    end
  end
end
