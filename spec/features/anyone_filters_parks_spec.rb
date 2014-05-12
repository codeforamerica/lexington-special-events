require 'spec_helper'

feature 'Filters list of parks' do
  scenario 'by clicking an amenity', :js => true do
    bball_park = Park.create(:name => 'BBall Park')
    bball_park.amenities << Amenity.create(name: 'Basketball')
    Park.create(:name => 'Other Park')

    visit '/'
    select('Basketball', :from => 'Search')
    expect(page).to have_content('Total of 1 park')
    expect(page).to have_content('BBall Park')
  end

  scenario 'by selecting park name', :js => true do
    Park.create(:name => 'Cool Park')
    Park.create(:name => 'Other Park')

    visit '/'
    select('Cool Park', :from => 'Search')
    expect(page).to have_content('1 park')
    expect(page).to have_content('Cool Park')
  end
end
