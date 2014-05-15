/**
 * @jsx React.DOM
 */
var ParksForm = React.createClass({
  getInitialState: function() {
    return {showAmenitiesCheckboxes: false};
  },
  toggleAmenitiesDisplay: function() {
    this.setState({showAmenitiesCheckboxes: !this.state.showAmenitiesCheckboxes});
  },
  render: function() {
    var _this = this;
    var checkboxes = '';

    if (_this.state.showAmenitiesCheckboxes) {
      checkboxes = _.map(this.props.amenities, function(amenity) {
        return (
          <li>
            <label>
              <input type="checkbox" value={amenity} onChange={_this.handleAmenityChange} />
              {amenity}
            </label>
          </li>
        );
      });
    };

    var parkOpts = _.map(this.props.parks, function(park) {
      return <option data-filter-name={ParksFilter.filterName('Name')}
        value={park.name}>{park.name}</option>;
    });
    var amenityOpts = _.map(this.props.amenities, function(amenity) {
      return <option data-filter-name={ParksFilter.filterName('Amenity')}
        value={amenity}>{amenity}</option>;
    });

    return (
      <form>
        <div className="row">
          <div className="large-5 columns">
            <label>
              By Keyword (<a onClick={_this.toggleAmenitiesDisplay} href="#">
                {this.state.showAmenitiesCheckboxes ? 'Hide' : 'Show'} amenities)</a>
              <ReactSelect2 defaultValue="" onChange={_this.handleSelectChange}>
                <option value=""> e.g. park name, activity, facility </option>
                <optgroup label="Park">
                  {parkOpts}
                </optgroup>
                <optgroup label="Amenity">
                  {amenityOpts}
                </optgroup>
              </ReactSelect2>
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
      </form>
    );
  },
  handleSelectChange: function(event) {
    var type = $(event.target).find('option:selected').data('filterName');
    var value = event.target.value;

    this.props.onParkSearch(type, [value]);
  },
});

var ParksList = React.createClass({
  render: function() {
    var parkNodes = _.map(this.props.filteredParks, function (park) {
      return <Park park={park} />
    });

    return (
      <div className="row">
        <div className="large-7 columns search-results-container">
          <p>Total of <strong>{parkNodes.length}</strong> park{
            parkNodes.length !== 1 ? 's' : ''}</p>
          <ol>
            {parkNodes}
          </ol>
        </div>
        <div className="large-5 columns">
          <div id="map"></div>
        </div>
      </div>
    );
  }
});

var ParksFilter = {
  filterNames: ['Name', 'Amenity'],
  filterName: function(desired) {
    if (_.contains(this.filterNames, desired)) { return desired; }
  },
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
    if (name instanceof Array) { name = name[0] }

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
    return {filters: {},
      filteredParks: this.props.parks,
      amenities: amenityNames};
  },
  handleParkSearch: function(searchProperty, whereValues) {
    // clear all previous filter state. To cumulate: _.clone(this.state.filters);
    var filters = {};
    filters[searchProperty] = whereValues;
    this.setState({filters: filters});

    var filteredParks = ParksFilter.filter(this.props.parks, filters);

    try {
      this.addPinsToMap(filteredParks);
    } catch(e) {}

    // pass filters instead of this.state.filters. The latter may not take yet
    this.setState({filteredParks: filteredParks});
  },
  addPinsToMap: function(filteredParks) {
    ParksMap.centers.clearLayers();

    filteredParks.forEach(function(filteredPark) {
      var centroid = _.find(ParksMap.centroids.features, function(feature) {
        return (feature.properties['PARK_NAME'] === filteredPark.name);
      });
      ParksMap.centers.addData(centroid);
    });
  },
  render: function() {
    return (
      <div id="search-content">
        <div className="row">
          <div className="large-4 columns">
            <h1>Find a Venue</h1>
          </div>
        </div>
        <ParksForm onParkSearch={this.handleParkSearch} amenities={this.state.amenities}
          parks={this.props.parks} />
        <hr />
        <ParksList filteredParks={this.state.filteredParks} />
      </div>
    );
  }
});

var Park = React.createClass({
  render: function() {
    return (
      <div className="row search-result">
        <div className="large-4 columns">
          <img src="http://artandarts.com/images/clip_art/nature/landscapes/landscape_art_city_park.JPG"  height="100px" />
        </div>
        <div className="large-8 columns">
          <li>
            <h4><a href="">{this.props.park.name}</a></h4>
            <p>{this.props.park.address}</p>
          </li>
        </div>
      </div>
    );
  }
});
