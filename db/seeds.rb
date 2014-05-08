Park.delete_all
ParkAmenity.delete_all
Amenity.delete_all

amenities = {
    "AMPHITHEAT" =>  "Amphitheater",
    "BASKETBALL" =>  "Basketball Courts",
    "HARDCOURT" =>  "Hardcourts",
    "BOAT" =>  "Boats",
    "DAY_CAMP" =>  "Day Camp",
    "DISC_GOLF" =>  "Disc Golf Course",
    "DOG_PARKS" =>  "Dog Park",
    "EQUESTRIAN" =>  "Horse Facilities",
    "FISHING" =>  "Fishing",
    "GOLF" =>  "Golf Course",
    "GYMNASIUM" =>  "Gymnasium",
    "HORSESHOES" =>  "Horseshoes",
    "LAKE_POND" =>  "Lake and/or Pond",
    "OPEN_FIELD" =>  "Open Field and/or Passive Wooded Area",
    "PAVED_TRAI" =>  "Paved Trails",
    "PLAYGROUND" =>  "Playground",
    "SPECIAL_EV" =>  "Special Events Space",
    "SWIMMING" =>  "Swimming",
    "TENNIS_COU" =>  "Tennis Courts",
    "VOLLEYBALL" =>  "Volleyball Courts",
    "WEIGHT_ROO" =>  "Weight Rooms",
    "BALLFIELD" =>  "Baseball and/or Softball Fields",
    "CC_YOUTH" =>  "Community Centers for Seniors",
    "CC_SENIOR" =>  "Community Centers for Adults",
    "GARDENS" =>  "Community Gardens",
    "FOOTBALLS" =>  "Football and Soccer Fields",
    "NAT_PRGMS" =>  "Nature Programs",
    "NGHBRBLDGS" =>  "Neighborhood Buildings",
    "PICNICTBLS" =>  "Picnic Tables",
    "GRILLS" =>  "Grills",
    "UNPVD_TRLS" =>  "Unpaved Trails",
    "SHELTERS_" =>  "Shelters"
}

amenities.each do |key, amenity|
  amenities[key] = Amenity.create(:name => amenity)
end

parks_geo = JSON.parse(File.read('./public/data/lexparks.json'))
parks = parks_geo['features'].map { |p| p.select { |key,_| key == 'properties' } }

parks.each do |park_from_json|
  park = Park.create(:name => park_from_json['properties']['PARK_NAME'] ||
    park_from_json['properties']['NAME'])
  amenities.each do |key, amenity|
    value = park_from_json['properties'][key]
    if (value && value != 'No' && value != 0)
      pa = ParkAmenity.new(amenity: amenities[key])
      pa.quanity = value if (value =~ /\d+/)
      pa.save!
      park.park_amenities << pa
      p "#{value} \t creating #{park.name} #{key}"
    end
  end
end

