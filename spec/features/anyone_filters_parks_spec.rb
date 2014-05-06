require 'spec_helper'

feature 'Filters list of parks' do
  scenario 'by clicking an amenity', :js => true do
    visit '/'
    first("input[type='checkbox']").set(true)
    # hacky magic number until we put the parks and amenities into the DB
    expect(page).to have_content('37 parks')
  end

  scenario 'by selecting park name', :js => true do
    visit '/'
    select('CHEAPSIDE', :from => 'By Name')
    expect(page).to have_content('1 park')
  end
end
