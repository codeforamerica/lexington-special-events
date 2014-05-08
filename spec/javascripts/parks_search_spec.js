describe('User search', function() {
  it('filters parks by amenity', function() {
    var bball = {name: 'foo', amenities: [{name: 'bball'}]}
    var other = {name: 'bar', amenities: [{name: 'fishing'}]};
    var filtered = ParksFilter.filterByAmenity([bball, other], ['bball']);
    expect(filtered).toEqual([bball]);
  });

  it('filters parks by name', function() {
    var cheapside = {name: 'cheapside park'}
    var other = {name: 'other park'};
    var filtered = ParksFilter.filterByName([cheapside, other], 'cheapside park');
    expect(filtered).toEqual([cheapside]);
  });

  it('filters by amenity and name', function() {
    var foo = {name: 'foo', amenities: [{name: 'bball'}]};
    var bar = {name: 'bar', amenities: [{name: 'bball'}]};
    var baz = {name: 'baz', amenities: []};

    var filters = {Amenity: ['bball']}
    expect(ParksFilter.filter([foo, bar, baz], filters)).toEqual([foo, bar]);

    filters = {Amenity: ['bball'], Name: 'foo'}
    expect(ParksFilter.filter([foo, bar, baz], filters)).toEqual([foo]);
  });

  it('updates name filter when name changes', function() {
    fixture.set('<div id="content"></div>');
    var foo = {name: 'foo'}
    var bar = {name: 'bar'};
    var search = React.renderComponent(
      Search({parks: [foo, bar]}),
      document.getElementById('content')
    );
    search.handleParkSearch('Name', 'foo')
    expect(search.state.filteredParks).toEqual([foo]);

    search.handleParkSearch('Name', 'bar')
    expect(search.state.filteredParks).toEqual([bar]);
  });

  it('unfilters when whereValues empty', function() {
    fixture.set('<div id="content"></div>');
    var bball = {name: 'foo', amenities: [{name: 'bball'}]};
    var other = {name: 'bar', amenities: []};
    var search = React.renderComponent(
      Search({parks: [bball, other]}),
      document.getElementById('content')
    );
    search.handleParkSearch('Amenity', ['bball'])
    expect(search.state.filteredParks).toEqual([bball]);

    search.handleParkSearch('Amenity', [])
    expect(search.state.filteredParks).toEqual([bball, other]);
  });
});
