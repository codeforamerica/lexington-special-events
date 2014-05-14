class EventsController < ApplicationController
  layout 'application'

  def index
    @events = Event.all
  end
end
