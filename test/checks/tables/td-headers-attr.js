describe('td-headers-attr', function() {
  'use strict';

  var fixture = document.getElementById('fixture');
  var checkContext = axe.testUtils.MockCheckContext();

  afterEach(function() {
    fixture.innerHTML = '';
    checkContext.reset();
  });

  it('returns true no headers attribute is present', function() {
    fixture.innerHTML =
      '<table>' +
      '  <tr> <th>hi</th> <td>hello</td> </tr>' +
      '  <tr> <th>hi</th> <td>hello</td> </tr>' +
      '</table>';

    var node = fixture.querySelector('table');
    assert.isTrue(
      axe.testUtils.getCheckEvaluate('td-headers-attr').call(checkContext, node)
    );
  });

  it('returns true if a valid header is present', function() {
    fixture.innerHTML =
      '<table>' +
      '  <tr> <th id="hi">hello</th> </tr>' +
      '  <tr> <td headers="hi">goodbye</td> </tr>' +
      '</table>';

    var node = fixture.querySelector('table');
    assert.isTrue(
      axe.testUtils.getCheckEvaluate('td-headers-attr').call(checkContext, node)
    );
  });

  it('returns true if multiple valid headers are present', function() {
    fixture.innerHTML =
      '<table>' +
      '  <tr> <th id="hi1">hello</th> <th id="hi2">hello</th> </tr>' +
      '  <tr> <td headers="hi1 \t\n hi2">goodbye</td> </tr>' +
      '</table>';

    var node = fixture.querySelector('table');
    assert.isTrue(
      axe.testUtils.getCheckEvaluate('td-headers-attr').call(checkContext, node)
    );
  });

  it('returns true with an empty header', function() {
    fixture.innerHTML =
      '<table>' +
      '  <tr> <th id="hi1"></th> </tr>' +
      '  <tr> <td headers="hi1">goodbye</td> </tr>' +
      '</table>';

    var node = fixture.querySelector('table');
    assert.isTrue(
      axe.testUtils.getCheckEvaluate('td-headers-attr').call(checkContext, node)
    );
  });

  it('returns undefined if headers is empty', function() {
    fixture.innerHTML =
      '<table>' +
      '  <tr> <th id="hi"> </th> </tr>' +
      '  <tr> <td headers="">goodbye</td> </tr>' +
      '</table>';

    var node = fixture.querySelector('table');
    assert.isUndefined(
      axe.testUtils.getCheckEvaluate('td-headers-attr').call(checkContext, node)
    );
  });

  it('returns false if the header is a table cell', function() {
    var node;

    fixture.innerHTML =
      '<table>' +
      '  <tr> <th> <span id="hi">hello</span> </th> </tr>' +
      '  <tr> <td headers="h1">goodbye</td> </tr>' +
      '</table>';
    node = fixture.querySelector('table');
    assert.isFalse(
      axe.testUtils.getCheckEvaluate('td-headers-attr').call(checkContext, node)
    );

    fixture.innerHTML =
      '<span id="hi">hello</span>' +
      '<table>' +
      '  <tr> <th></th> </tr>' +
      '  <tr> <td headers="h1">goodbye</td> </tr>' +
      '</table>';
    node = fixture.querySelector('table');
    assert.isFalse(
      axe.testUtils.getCheckEvaluate('td-headers-attr').call(checkContext, node)
    );

    fixture.innerHTML =
      '<table id="hi">' +
      '  <tr> <th>hello</th> </tr>' +
      '  <tr> <td headers="h1">goodbye</td> </tr>' +
      '</table>';
    node = fixture.querySelector('table');
    assert.isFalse(
      axe.testUtils.getCheckEvaluate('td-headers-attr').call(checkContext, node)
    );
  });

  it('returns false if the header refers to the same cell', function() {
    fixture.innerHTML =
      '<table id="hi">' +
      '  <tr> <th>hello</th> </tr>' +
      '  <tr> <td id="bye" headers="bye">goodbye</td> </tr>' +
      '</table>';

    var node = fixture.querySelector('table');
    assert.isFalse(
      axe.testUtils.getCheckEvaluate('td-headers-attr').call(checkContext, node)
    );
  });
});
