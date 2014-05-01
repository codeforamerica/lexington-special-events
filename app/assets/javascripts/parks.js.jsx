/**
 * @jsx React.DOM
 */
$(function() {
  var ParksForm = React.createClass({
    render: function() {
      return (
        <form className="parkForm" onSubmit={this.handleSubmit}>
          <input type="checkbox" name="amenity" value="my amenity" />
          <input type="checkbox" name="amenity" value="your amenity" />
          <input type="submit" value="Post" />
        </form>
      );
    },
    handleSubmit: function() {
      // var name = this.refs.name.getDOMNode().value.trim();
      this.props.onParkSubmit({name: name, amenities: 'my amenity'});
      // this.refs.name.getDOMNode().value = '';
      // this.refs.amenities.getDOMNode().value = '';
      return false;
    }
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
    handleParkSubmit: function(park) {
      var parks = this.state.parks;
      // var newParks = parks.concat([park]);
      this.setState({parks: []});
      // $.ajax({
      //   url: this.props.url,
      //   dataType: 'json',
      //   type: 'POST',
      //   data: park,
      //   success: function(data) {
      //     this.setState({data: data});
      //   }.bind(this)
      // });
    },
    loadParksFromServer: function() {
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        success: function(parks) {
          this.setState({parks: parks});
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
