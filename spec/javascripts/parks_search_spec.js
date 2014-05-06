describe('User search', function() {
  it('filters parks by amenity', function() {
    var basketball = {properties: {NAME: 'foo', amenities: {BASKETBALL: 1}}}
    var other = {properties: {NAME: 'bar', amenities: []}};
    var filtered = ParksFilter.filterByAmenity([basketball, other], ['BASKETBALL']);
    expect(filtered).toEqual([basketball]);
  });

  it('filters parks by name', function() {
    var cheapside = {properties: {NAME: 'cheapside park'}}
    var other = {properties: {NAME: 'other park'}};
    var filtered = ParksFilter.filterByName([cheapside, other], 'cheapside park');
    expect(filtered).toEqual([cheapside]);
  });

  it('unfilters when whereValues empty', function() {
    fixture.set('<div id="content"></div>');
    var basketball = {properties: {NAME: 'foo', BASKETBALL: 1}}
    var other = {properties: {NAME: 'bar'}};
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
