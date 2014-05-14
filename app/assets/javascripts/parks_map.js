$(function() {

  var amenities = {
    "AMPHITHEAT": "Amphitheater",
    "BASKETBALL": "Basketball Courts",
    "HARDCOURT": "Hardcourts",
    "BOAT": "Boats",
    "DAY_CAMP": "Day Camp",
    "DISC_GOLF": "Disc Golf Course",
    "DOG_PARKS": "Dog Park",
    "EQUESTRIAN": "Horse Facilities",
    "FISHING": "Fishing",
    "GOLF": "Golf Course",
    "GYMNASIUM": "Gymnasium",
    "HORSESHOES": "Horseshoes",
    "LAKE_POND": "Lake and/or Pond",
    "OPEN_FIELD": "Open Field and/or Passive Wooded Area",
    "PAVED_TRAI": "Paved Trails",
    "PLAYGROUND": "Playground",
    "SPECIAL_EV": "Special Events Space",
    "SWIMMING": "Swimming",
    "TENNIS_COU": "Tennis Courts",
    "VOLLEYBALL": "Volleyball Courts",
    "WEIGHT_ROO": "Weight Rooms",
    "BALLFIELD": "Baseball and/or Softball Fields",
    "CC_YOUTH": "Community Centers for Seniors",
    "CC_SENIOR": "Community Centers for Adults",
    "GARDENS": "Community Gardens",
    "FOOTBALLS": "Football and Soccer Fields",
    "NAT_PRGMS": "Nature Programs",
    "NGHBRBLDGS": "Neighborhood Buildings",
    "PICNICTBLS": "Picnic Tables",
    "GRILLS": "Grills",
    "UNPVD_TRLS": "Unpaved Trails",
    "SHELTERS_": "Shelters"
  };

  function popup(feature) {
    var park = feature.properties;
    var popupText = '<strong>' + park.PARK_NAME + '</strong><br><em>' + park.ADDRESS_1 + '</em>';
    for (var amenity in park) {
      if (park.hasOwnProperty(amenity) && amenities[amenity]) {
        if (park[amenity] == "Yes") {
          popupText += "<br>- " + amenities[amenity];
        }
        else if (park[amenity] > 0 && (amenity == "PAVED_TRAI" || amenity == "UNPVD_TRLS")) {
          popupText += "<br>- " + park[amenity] + " miles of " + amenities[amenity];
        }
        else if (park[amenity] > 0 && amenities[amenity]) {
          popupText += "<br>- " + park[amenity] + " " + amenities[amenity];
        }
      }
    };
    return popupText;
  };

  function onEachFeature(feature, layer) {
    layer.on('click', function(e) {
      map.fitBounds(e.target.getBounds());
    });
    layer.bindPopup(popup(feature));
  };

  map = L.map("map", {
    zoom: 11,
    center: [38.042,-84.515],
    maxZoom: 14,
    minZoom: 10
  });

  var basemapTiles = L.tileLayer('http://{s}.tiles.mapbox.com/v3/codeforamerica.i6fijbde/{z}/{x}/{y}.png').addTo(map);

  parks = L.geoJson(lexParks, {
    style: function(feature) {
      return {
        fillColor: "#18A866",
        weight: 1,
        opacity: 0.7,
        color: "#18A866",
        fillOpacity: 0.6
      };
    },
    onEachFeature: onEachFeature
  })
  .addTo(map);

  centroids = L.geoJson(centroids, {
    onEachFeature: onEachFeature,
    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng);
    },
    style: function(feature) {
      return {
        opacity: 0,
        fillOpacity: 0
      };
    }
  }).addTo(map);

});
