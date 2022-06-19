describe('aria-allowed-role', function() {
  'use strict';

  var fixture = document.getElementById('fixture');
  var checkContext = axe.testUtils.MockCheckContext();
  var flatTreeSetup = axe.testUtils.flatTreeSetup;

  afterEach(function() {
    fixture.innerHTML = '';
    checkContext.reset();
  });

  it('returns true if given element is an ignoredTag in options', function() {
    var node = document.createElement('article');
    node.setAttribute('role', 'presentation');
    fixture.appendChild(node);
    flatTreeSetup(fixture);
    var options = {
      ignoredTags: ['article']
    };
    var actual = axe.testUtils
      .getCheckEvaluate('aria-allowed-role')
      .call(checkContext, node, options);
    var expected = true;
    assert.equal(actual, expected);
    assert.isNull(checkContext._data, null);
  });

  it('returns false with implicit role of row for TR when allowImplicit is set to false via options', function() {
    fixture.innerHTML =
      '<table role="grid"><tr id="target" role="row"></tr></table>';
    var target = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    var options = {
      allowImplicit: false
    };
    var actual = axe.testUtils
      .getCheckEvaluate('aria-allowed-role')
      .call(checkContext, target, options);
    var expected = false;
    assert.equal(actual, expected);
    assert.deepEqual(checkContext._data, ['row']);
  });

  it('returns true when A has namespace as svg', function() {
    var node = document.createElementNS('http://www.w3.org/2000/svg', 'a');
    fixture.appendChild(node);
    flatTreeSetup(fixture);
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-role')
        .call(checkContext, node)
    );
  });

  it('returns undefined (needs review) when element is hidden and has unallowed role', function() {
    fixture.innerHTML =
      '<button id="target" type="button" aria-hidden="true"' +
      'role="presentation"></button>';
    var target = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    var actual = axe.testUtils
      .getCheckEvaluate('aria-allowed-role')
      .call(checkContext, target);
    assert.isUndefined(actual);
  });

  it('returns undefined (needs review) when element is with in hidden parent and has unallowed role', function() {
    fixture.innerHTML =
      '<div style="display:none">' +
      '<button id="target" class="mm-tabstart" type="button"' +
      'role="presentation"></button>' +
      '</div>';
    var target = fixture.querySelector('#target');
    flatTreeSetup(fixture);
    var actual = axe.testUtils
      .getCheckEvaluate('aria-allowed-role')
      .call(checkContext, target);
    assert.isUndefined(actual);
  });

  it('returns true when BUTTON has type menu and role as menuitem', function() {
    var node = document.createElement('button');
    node.setAttribute('type', 'menu');
    node.setAttribute('role', 'menuitem');
    fixture.appendChild(node);
    flatTreeSetup(fixture);
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-role')
        .call(checkContext, node)
    );
  });

  it('returns true when img has no alt', function() {
    var node = document.createElement('img');
    node.setAttribute('role', 'presentation');
    fixture.appendChild(node);
    flatTreeSetup(fixture);
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-role')
        .call(checkContext, node)
    );
    assert.deepEqual(checkContext._data, null);
    node.setAttribute('role', 'none');
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-role')
        .call(checkContext, node)
    );
    assert.deepEqual(checkContext._data, null);
  });

  it('returns true when img has empty alt', function() {
    var node = document.createElement('img');
    node.setAttribute('alt', '');
    node.setAttribute('role', 'presentation');
    fixture.appendChild(node);
    flatTreeSetup(fixture);
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-role')
        .call(checkContext, node)
    );
    assert.deepEqual(checkContext._data, null);
    node.setAttribute('role', 'none');
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-role')
        .call(checkContext, node)
    );
    assert.deepEqual(checkContext._data, null);
  });

  it('returns false when img has alt', function() {
    var node = document.createElement('img');
    node.setAttribute('alt', 'not empty');
    node.setAttribute('role', 'presentation');
    fixture.appendChild(node);
    flatTreeSetup(fixture);
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-role')
        .call(checkContext, node)
    );
    assert.deepEqual(checkContext._data, ['presentation']);
    node.setAttribute('role', 'none');
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-role')
        .call(checkContext, node)
    );
    assert.deepEqual(checkContext._data, ['none']);
  });

  it('returns true when input of type image and no role', function() {
    var node = document.createElement('img');
    node.setAttribute('type', 'image');
    fixture.appendChild(node);
    flatTreeSetup(fixture);
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-role')
        .call(checkContext, node)
    );
    assert.isNull(checkContext._data, null);
  });

  it('returns true when INPUT type is checkbox and has aria-pressed attribute', function() {
    var node = document.createElement('input');
    node.setAttribute('type', 'checkbox');
    node.setAttribute('aria-pressed', '');
    fixture.appendChild(node);
    flatTreeSetup(fixture);
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-role')
        .call(checkContext, node)
    );
  });

  it('returns true when INPUT type is text with role combobox', function() {
    var node = document.createElement('input');
    node.setAttribute('type', 'text');
    node.setAttribute('role', 'combobox');
    fixture.appendChild(node);
    flatTreeSetup(fixture);
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-role')
        .call(checkContext, node)
    );
  });

  it('returns true when INPUT type is tel with role combobox', function() {
    var node = document.createElement('input');
    node.setAttribute('type', 'tel');
    node.setAttribute('role', 'combobox');
    fixture.appendChild(node);
    flatTreeSetup(fixture);
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-role')
        .call(checkContext, node)
    );
  });

  it('returns true when INPUT type is url with role combobox', function() {
    var node = document.createElement('input');
    node.setAttribute('type', 'url');
    node.setAttribute('role', 'combobox');
    fixture.appendChild(node);
    flatTreeSetup(fixture);
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-role')
        .call(checkContext, node)
    );
  });

  it('returns true when INPUT type is search with role combobox', function() {
    var node = document.createElement('input');
    node.setAttribute('type', 'search');
    node.setAttribute('role', 'combobox');
    fixture.appendChild(node);
    flatTreeSetup(fixture);
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-role')
        .call(checkContext, node)
    );
  });

  it('returns true when INPUT type is email with role combobox', function() {
    var node = document.createElement('input');
    node.setAttribute('type', 'email');
    node.setAttribute('role', 'combobox');
    fixture.appendChild(node);
    flatTreeSetup(fixture);
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-role')
        .call(checkContext, node)
    );
  });

  it('returns true when INPUT type is text with role spinbutton', function() {
    var node = document.createElement('input');
    node.setAttribute('type', 'text');
    node.setAttribute('role', 'spinbutton');
    fixture.appendChild(node);
    flatTreeSetup(fixture);
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-role')
        .call(checkContext, node)
    );
  });

  it('returns true when INPUT type is number with role spinbutton', function() {
    var node = document.createElement('input');
    node.setAttribute('type', 'number');
    node.setAttribute('role', 'spinbutton');
    fixture.appendChild(node);
    flatTreeSetup(fixture);
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-role')
        .call(checkContext, node)
    );
  });

  it('returns true when INPUT type is tel with role spinbutton', function() {
    var node = document.createElement('input');
    node.setAttribute('type', 'tel');
    node.setAttribute('role', 'spinbutton');
    fixture.appendChild(node);
    flatTreeSetup(fixture);
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-role')
        .call(checkContext, node)
    );
  });

  it('returns true when INPUT type is text with role searchbox', function() {
    var node = document.createElement('input');
    node.setAttribute('type', 'text');
    node.setAttribute('role', 'searchbox');
    fixture.appendChild(node);
    flatTreeSetup(fixture);
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-role')
        .call(checkContext, node)
    );
  });

  it('returns false when a role is set on an element that does not allow any role', function() {
    var node = document.createElement('dd');
    node.setAttribute('role', 'link');
    fixture.appendChild(node);
    flatTreeSetup(fixture);
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-role')
        .call(checkContext, node)
    );
    assert.deepEqual(checkContext._data, ['link']);
  });

  it('returns true when a role is set on an element that can have any role', function() {
    var node = document.createElement('div');
    node.setAttribute('role', 'link');
    fixture.appendChild(node);
    flatTreeSetup(fixture);
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-role')
        .call(checkContext, node)
    );
  });

  it('returns true an <a> without a href to have any role', function() {
    var node = document.createElement('a');
    node.setAttribute('role', 'presentation');
    fixture.appendChild(node);
    flatTreeSetup(fixture);
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-role')
        .call(checkContext, node)
    );
  });

  it('returns true <a> with a empty href to have any valid role', function() {
    var node = document.createElement('a');
    node.setAttribute('role', 'link');
    node.href = '';
    fixture.appendChild(node);
    flatTreeSetup(fixture);
    var actual = axe.testUtils
      .getCheckEvaluate('aria-allowed-role')
      .call(checkContext, node);
    assert.isTrue(actual);
  });

  it('returns true <img> with a non-empty alt', function() {
    var node = document.createElement('img');
    node.setAttribute('role', 'button');
    node.alt = 'some text';
    fixture.appendChild(node);
    flatTreeSetup(fixture);
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-role')
        .call(checkContext, node)
    );
  });

  it('returns false for <img> with a non-empty alt and role `presentation`', function() {
    var node = document.createElement('img');
    node.setAttribute('role', 'presentation');
    node.alt = 'some text';
    fixture.appendChild(node);
    flatTreeSetup(fixture);
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-role')
        .call(checkContext, node)
    );
  });

  it('should allow <select> without a multiple and size attribute to have a menu role', function() {
    var node = document.createElement('select');
    node.setAttribute('role', 'menu');
    fixture.appendChild(node);
    flatTreeSetup(fixture);
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-role')
        .call(checkContext, node)
    );
    assert.isNull(checkContext._data, null);
  });

  it('returns true custom element <my-navbar> with a role of navigation', function() {
    var node = document.createElement('my-navbar');
    node.setAttribute('role', 'navigation');
    fixture.appendChild(node);
    flatTreeSetup(fixture);
    var actual = axe.testUtils
      .getCheckEvaluate('aria-allowed-role')
      .call(checkContext, node);
    assert.isTrue(actual);
    assert.isNull(checkContext._data, null);
  });

  it('returns false if a dpub role’s type is not the element’s implicit role', function() {
    fixture.innerHTML = '<article role="doc-biblioref" id="target"></article>';
    var target = fixture.children[0];
    flatTreeSetup(fixture);
    assert.isFalse(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-role')
        .call(checkContext, target)
    );
  });

  it('returns true if a dpub role’s type is the element’s implicit role', function() {
    fixture.innerHTML = '<a href="foo" role="doc-biblioref" id="target"></a>';
    var target = fixture.children[0];
    flatTreeSetup(fixture);
    assert.isTrue(
      axe.testUtils
        .getCheckEvaluate('aria-allowed-role')
        .call(checkContext, target)
    );
  });
});
