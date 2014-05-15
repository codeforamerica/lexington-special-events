class SplitEventDateAndTime < ActiveRecord::Migration
  def change
    change_column(:events, :start, :date)
    rename_column(:events, :start, :starts_on)
    add_column(:events, :start_time, :time)
  end
end
