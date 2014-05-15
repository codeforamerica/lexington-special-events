require 'spec_helper'

feature 'Visits event page' do
  scenario 'views list of events' do
    event = Event.create!(:name => 'A really wild time!',
      :starts_on => '2014-01-01')

    visit events_path
    expect(page).to have_content(event.name)
  end
end
