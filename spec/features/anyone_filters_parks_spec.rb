require 'spec_helper'

feature "Filters list of parks" do
  scenario "by clicking an amenity", :js => true do
    visit '/'
    first("input[type='checkbox']").set(true)
    # hacky magic number until we put the parks and amenities into the DB
    expect(page).to have_content('37 parks')
  end
end
