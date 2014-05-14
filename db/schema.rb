# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140512231727) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "amenities", force: true do |t|
    t.string "name"
  end

  create_table "park_amenities", force: true do |t|
    t.integer "park_id"
    t.integer "amenity_id"
    t.integer "quantity"
  end

  add_index "park_amenities", ["amenity_id", "park_id"], name: "index_park_amenities_on_amenity_id_and_park_id", using: :btree
  add_index "park_amenities", ["park_id", "amenity_id"], name: "index_park_amenities_on_park_id_and_amenity_id", using: :btree

  create_table "parks", force: true do |t|
    t.string "name"
    t.string "address_1"
    t.string "zip"
  end

end
