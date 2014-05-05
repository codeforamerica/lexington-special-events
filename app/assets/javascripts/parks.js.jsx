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
            <input type="checkbox" value={amenity} onChange={_this.handleChange} />
            {amenity}
          </label>
        </li>
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
              <input type="text" placeholder="Enter Park Name" />
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
  handleChange: function(event) {
    if (event.target.checked) {
      this.props.onParkSubmit([event.target.value]);
    } else {
      this.props.onParkSubmit([]);
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

var Search = React.createClass({
  getInitialState: function() {
    return {parks: [], filteredParks: [], amenities: []}
  },
  filterParks: function(amenities) {
    if (amenities.length === 0 ) { return this.state.parks; }

    return _.select(this.state.parks, function(park) {
      var filterOn = amenities[0];
      return (park.properties.amenities[filterOn] === 1 ||
        park.properties.amenities[filterOn] === 'Yes');
    });
  },
  handleParkSearch: function(amenities) {
    this.setState({filteredParks: this.filterParks(amenities)});
  },
  loadParksFromServer: function() {
    this.setParks(theParks);
  },
  setParks: function(parksGeo) {
    var amenityKeys = ['BASKETBALL', 'FISHING'];

    var parks = _.map(parksGeo.features, function(park) {
      park.properties.amenities = _.pick(park.properties, amenityKeys);
      return park;
    });

    this.setState({parks: parks, filteredParks: parks, amenities: amenityKeys});
  },
  componentWillMount: function() {
    this.loadParksFromServer();
  },
  render: function() {
    return (
      <div>
        <div className="row">
          <div className="large-4 columns">
            <h1>Find a Venue</h1>
          </div>
        </div>
        <ParksForm onParkSubmit={this.handleParkSearch} amenities={this.state.amenities} />
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
