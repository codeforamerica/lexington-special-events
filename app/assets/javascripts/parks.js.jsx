/**
 * @jsx React.DOM
 */
$(function() {
  var ParksForm = React.createClass({
    render: function() {
      var _this = this;
      var amenities = ['my amenity', 'your amenity'];
      var checkboxes = _.map(amenities, function(amenity) {
        return (
          <input type="checkbox" value={amenity} onChange={_this.handleChange} />
        );
      });
      return (
        <form className="parkForm">
          {checkboxes}
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
    // handleSubmit: function() {
    //   // var name = this.refs.name.getDOMNode().value.trim();
    //   // var amenities = this.refs.amenity.getDOMNode().value;
    //   debugger
    //   console.log('handleSubmit: ' + amenities);
    //   this.props.onParkSubmit([amenities]);
    //   // this.refs.name.getDOMNode().value = '';
    //   // this.refs.amenities.getDOMNode().value = '';
    //   return false;
    // }
  });
  var ParksList = React.createClass({
    render: function() {
      var parkNodes = this.props.parks.map(function (park) {
        return <Park name={park.name}>{park.amenities}</Park>;
      });
      return (
        <div className="parkList">
          {parkNodes}
        </div>
      );
    }
  });
  var Search = React.createClass({
    getInitialState: function() {
      return {parks: []}
    },
    filterParks: function(amenities) {
      if (amenities.length === 0 ) { return this.state.allParks; }

      return _.select(this.state.allParks, function(park) {
        var i = _.intersection(park.amenities, amenities);
        return i.length > 0;
      });
    },
    handleParkSubmit: function(amenities) {
      this.setState({parks: this.filterParks(amenities)});
    },
    loadParksFromServer: function() {
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        success: function(parks) {
          this.setState({allParks: parks, parks: parks});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    },
    componentWillMount: function() {
      this.loadParksFromServer();
      // setInterval(this.loadParksFromServer, this.props.pollInterval);
    },
    render: function() {
      return (
        <div className="search">
          <h1>Parks Search</h1>
          <ParksList parks={this.state.parks}/>
          <ParksForm onParkSubmit={this.handleParkSubmit} />
        </div>
      );
    }
  });
  var Park = React.createClass({
    render: function() {
      var rawMarkup = this.props.children.toString();
      return (
        <div className="park">
          <h2 className="parkAuthor">
            {this.props.name}
          </h2>
          <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
        </div>
      );
    }
  });
  React.renderComponent(
    <Search url="parks.json" />,
    document.getElementById('content')
  );
});
