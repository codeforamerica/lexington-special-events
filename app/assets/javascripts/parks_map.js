$(function() {
  $('.parkName').select2();

  var map;

  map = L.map("map", {
    zoom: 11,
    center: [38.042,-84.515],
    maxZoom: 14,
    minZoom: 10
  });

  var basemapTiles = L.tileLayer('http://{s}.tiles.mapbox.com/v3/codeforamerica.i3l4b022/{z}/{x}/{y}.png').addTo(map);

  var parks = L.geoJson(lexParks, {
    style: function(feature) {
      return {
        fillColor: "#18A866",
        weight: 1,
        opacity: 0.7,
        color: "#18A866",
        fillOpacity: 0.6
      };
    },
    onEachFeature: function(feature, layer) {
      layer.on('click', function(e) {
        map.fitBounds(e.target.getBounds());
      });
      layer.bindPopup("This is " + feature.properties.PARK_NAME + "!");
    }
  })
  .addTo(map);

});
