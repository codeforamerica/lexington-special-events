namespace :events do
  desc "Load events"
  task :load do
    events = JSON.parse(File.read('public/data/may-2014-street-closings.json'))
    events['rows'].each do |event|
      db_event = Event.create!(
        :name => event['event'],
        :start => Date.parse("#{event['day']} #{event['month']} 2014"),
        :location => event['LOCATION'],
        :street_closings => event['STREET CLOSINGS'],
        :status => event['STATUS']
      )
      p db_event
    end
  end
end
