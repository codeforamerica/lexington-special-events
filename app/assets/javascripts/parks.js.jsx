/**
 * @jsx React.DOM
 */
var ParksForm = React.createClass({
  render: function() {
    var _this = this;
    var checkboxes = _.map(_.range(0, 10), function(amenity) {
      var amenity = _this.props.amenities[0];
      return (
        <li>
          <label>
            <input type="checkbox" value={amenity} onChange={_this.handleAmenityChange} />
            {amenity}
          </label>
        </li>
      );
    });

    var parks = _.map(_.sortBy(this.props.parks, function(park) {
        return park.properties.NAME;
      }), function(park) {
        return (
          <option>{park.properties.NAME}</option>
        );
     });

    return (
      <form>
        <div className="row">
          <div className="large-4 columns">
            <label>By Amenity
              <select>
                <option value="show-amenities">Show Amenities</option>
                <option value="hide-amenities">Hide Amenities</option>
              </select>
            </label>
          </div>
          <div className="large-4 columns">
            <label>By Zip Code
              <input type="text" placeholder="Enter Zip Code" />
            </label>
          </div>
          <div className="large-4 columns">
            <label>By Name
              <select className="parkName" onChange={_this.handleParkNameChange}>
                <option value=""> -- </option>
                {parks}
              </select>
            </label>
          </div>
        </div>
        <div className="row">
          <div className="columns four-columns">
            <ul className="no-bullet">
              {checkboxes}
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="large-4 columns">
            <a href="#" className="button radius expand">Search</a>
          </div>
          <hr />
        </div>
      </form>
    );
  },
  handleParkNameChange: function(event) {
    this.props.onParkSearch('Name', event.target.value);
  },
  handleAmenityChange: function(event) {
    if (event.target.checked) {
      this.props.onParkSearch('Amenity', [event.target.value]);
    } else {
      this.props.onParkSearch('Amenity', []);
    }
  },
});

var ParksList = React.createClass({
  render: function() {
    var parkNodes = _.map(this.props.filteredParks, function (park) {
      var amenities = park.properties.amenities;
      return <Park name={park.properties['PARK_NAME']} amenities={amenities} />
    });

    return (
      <div className="row">
        <div className="large-4 columns">
          <p>Total of <strong>{parkNodes.length}</strong> park{parkNodes.length !== 1 ? 's' : ''}</p>
          <ol>
            {parkNodes}
          </ol>
        </div>
        <div className="large-8 columns">
          <div id="map"></div>
        </div>
      </div>
    );
  }
});

var ParksFilter = {
  // property 'Foo' becomes filterByFoo(whereValues)
  filterBy: function(property, parks, whereValues) {
    return this['filterBy' + property](parks, whereValues);
  },
  filterByName: function(parks, name) {
    return _.select(parks, function(park) {
      return park.properties.NAME === name;
    });
  },
  filterByAmenity: function(parks, amenities) {
    return _.select(parks, function(park) {
      var filterOn = amenities[0];
      return (park.properties.amenities[filterOn] === 1 ||
        park.properties.amenities[filterOn] === 'Yes');
    });
  },
};

var Search = React.createClass({
  getInitialState: function() {
    var amenityKeys = ['BASKETBALL', 'FISHING'];

    // we can eliminate this mutation once the server returns more shapely data
    var parks = _.map(this.props.parks, function(park) {
      park.properties.amenities = _.pick(park.properties, amenityKeys);
      return park;
    });

    return {parks: parks, filteredParks: parks, amenities: amenityKeys};
  },
  handleParkSearch: function(searchProperty, whereValues) {
    var filterdParks;
    if (!whereValues || whereValues.length === 0) {
      filteredParks = this.props.parks;
    } else {
      filteredParks = ParksFilter.filterBy(searchProperty,
        this.state.filteredParks, whereValues);
    }
    this.setState({filteredParks: filteredParks});
  },
  render: function() {
    return (
      <div>
        <div className="row">
          <div className="large-4 columns">
            <h1>Find a Venue</h1>
          </div>
        </div>
        <ParksForm onParkSearch={this.handleParkSearch} amenities={this.state.amenities}
          parks={this.state.parks} />
        <ParksList filteredParks={this.state.filteredParks} />
      </div>
    );
  }
});

var Park = React.createClass({
  render: function() {
    var amenities = _.map(this.props.amenities, function(amenityVal, amenity) {
      return (<p>{amenity}: {amenityVal}</p>);
    });
    return (
      <li>
        <h4><a href="">{this.props.name}</a></h4>
        {amenities}
      </li>
    );
  }
});

$(function() {
  React.renderComponent(
    <Search url="parks.json" />,
    document.getElementById('content')
  );
  
  var map;

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
    var park = feature.properties;
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
    onEachFeature: onEachFeature
  })
  .addTo(map);

});
