/**
 * @jsx React.DOM
 */
var ParksForm = React.createClass({
  render: function() {
    var _this = this;
    var checkboxes = _.map(this.props.amenities, function(amenity) {
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
        return park.name;
      }), function(park) {
        return <option>{park.name}</option>;
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
      var amenities = park.amenities;
      return <Park name={park.name} amenities={amenities} />
    });

    return (
      <div className="row">
        <div className="large-4 columns">
          <p>Total of <strong>{parkNodes.length}</strong> park{
            parkNodes.length !== 1 ? 's' : ''}</p>
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
  filter: function(parks, filters) {
    var _this = this;
    var filtered = _.clone(parks);
    _.each(filters, function(values, name) {
      filtered = _this.filterBy(name, filtered, values);
    });
    return filtered;
  },
  // property 'Foo' becomes filterByFoo(whereValues)
  filterBy: function(property, parks, whereValues) {
    if (!whereValues || whereValues.length === 0) { return parks }

    return this['filterBy' + property](parks, whereValues);
  },
  filterByName: function(parks, name) {
    return _.select(parks, function(park) {
      return park.name === name;
    });
  },
  filterByAmenity: function(parks, amenities) {
    // only apply first amenity filter. Cumulate in later story
    var filterOn = amenities[0];
    return _.select(parks, function(park) {
      return (_.find(park.amenities, function(amenity) {
        return amenity.name === filterOn;
      }));
    });
  },
};

var Search = React.createClass({
  getInitialState: function() {
    var amenityNames = _.map(this.props.amenities, function(a) {
      return a.name;
    });
    return {filters: {Name: [], Amenity: []},
      filteredParks: this.props.parks,
      amenities: amenityNames};
  },
  handleParkSearch: function(searchProperty, whereValues) {
    var filters = _.clone(this.state.filters);
    filters[searchProperty] = whereValues;
    this.setState({filters: filters});
    // pass filters instead of this.state.filters. The latter may not take yet
    this.setState({filteredParks: ParksFilter.filter(this.props.parks, filters)});
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
          parks={this.props.parks} />
        <ParksList filteredParks={this.state.filteredParks} />
      </div>
    );
  }
});

var Park = React.createClass({
  render: function() {
    // this.props.amenities also exists
    return (
      <li>
        <h4><a href="">{this.props.name}</a></h4>
      </li>
    );
  }
});
