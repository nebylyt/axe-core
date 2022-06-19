describe('object-alt virtual-rule', function() {
  it('should pass for aria-label', function() {
    var results = axe.runVirtualRule('object-alt', {
      nodeName: 'object',
      attributes: {
        'aria-label': 'foobar'
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should incomplete for aria-labelledby', function() {
    var results = axe.runVirtualRule('object-alt', {
      nodeName: 'object',
      attributes: {
        'aria-labelledby': 'foobar'
      }
    });

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 1);
  });

  it('should pass for title', function() {
    var results = axe.runVirtualRule('object-alt', {
      nodeName: 'object',
      attributes: {
        title: 'foobar'
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass for role=presentation', function() {
    var results = axe.runVirtualRule('object-alt', {
      nodeName: 'object',
      attributes: {
        role: 'presentation'
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass for role=none', function() {
    var results = axe.runVirtualRule('object-alt', {
      nodeName: 'object',
      attributes: {
        role: 'none'
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail for visible text content', function() {
    var node = new axe.SerialVirtualNode({
      nodeName: 'object'
    });
    var child = new axe.SerialVirtualNode({
      nodeName: '#text',
      nodeType: 3,
      nodeValue: 'foobar'
    });
    node.children = [child];

    var results = axe.runVirtualRule('object-alt', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail when alt and children are missing', function() {
    var results = axe.runVirtualRule('object-alt', {
      nodeName: 'object',
      attributes: {}
    });

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail children contain no visible text', function() {
    var node = new axe.SerialVirtualNode({
      nodeName: 'object'
    });
    node.children = [];

    var results = axe.runVirtualRule('object-alt', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail when alt contains only whitespace', function() {
    var node = new axe.SerialVirtualNode({
      nodeName: 'object',
      attributes: {
        alt: ' \t   \n   '
      }
    });
    node.children = [];

    var results = axe.runVirtualRule('object-alt', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail when aria-label is empty', function() {
    var node = new axe.SerialVirtualNode({
      nodeName: 'object',
      attributes: {
        'aria-label': ''
      }
    });
    node.children = [];

    var results = axe.runVirtualRule('object-alt', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail when title is empty', function() {
    var node = new axe.SerialVirtualNode({
      nodeName: 'object',
      attributes: {
        title: ''
      }
    });
    node.children = [];

    var results = axe.runVirtualRule('object-alt', node);

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });
});
