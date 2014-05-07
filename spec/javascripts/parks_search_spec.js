describe('User search', function() {
  it('filters parks by amenity', function() {
    var basketball = {name: 'foo', amenities: {BASKETBALL: 1}}
    var other = {name: 'bar', amenities: []};
    var filtered = ParksFilter.filterByAmenity([basketball, other], ['BASKETBALL']);
    expect(filtered).toEqual([basketball]);
  });

  it('filters parks by name', function() {
    var cheapside = {name: 'cheapside park'}
    var other = {name: 'other park'};
    var filtered = ParksFilter.filterByName([cheapside, other], 'cheapside park');
    expect(filtered).toEqual([cheapside]);
  });

  it('filters by amenity and name', function() {
    var foo = {name: 'foo', amenities: {BASKETBALL: 1}};
    var bar = {name: 'bar', amenities: {BASKETBALL: 1}};
    var baz = {name: 'baz', amenities: {}};

    var filters = {Amenity: ['BASKETBALL']}
    expect(ParksFilter.filter([foo, bar, baz], filters)).toEqual([foo, bar]);

    filters = {Amenity: ['BASKETBALL'], Name: 'foo'}
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
    var basketball = {name: 'foo', amenities: {BASKETBALL: 1}};
    var other = {name: 'bar', amenities: {}};
    var search = React.renderComponent(
      Search({parks: [basketball, other]}),
      document.getElementById('content')
    );
    search.handleParkSearch('Amenity', ['BASKETBALL'])
    expect(search.state.filteredParks).toEqual([basketball]);

    search.handleParkSearch('Amenity', [])
    expect(search.state.filteredParks).toEqual([basketball, other]);
  });
});
