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
          <div className="large-4 columns">
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
  filterBy: function(parks, property, whereValues) {
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
      filteredParks = ParksFilter.filterBy(this.state.filteredParks,
       searchProperty, whereValues);
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
