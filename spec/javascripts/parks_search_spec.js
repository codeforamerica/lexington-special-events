describe('User search', function() {
  it('filters parks by amenity', function() {
    fixture.set('<div id="content"></div>');
    var basketball = {properties: {NAME: 'foo', BASKETBALL: 1}}
    var other = {properties: {NAME: 'bar'}};
    var search = React.renderComponent(
      Search({parks: [basketball, other]}),
      document.getElementById('content')
    );
    expect(search.filterParks(['BASKETBALL'])).toEqual([basketball]);
  });
});
