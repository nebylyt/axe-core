describe('meta-refresh virtual-rule', function() {
  it('should pass missing content', function() {
    var results = axe.runVirtualRule('meta-refresh', {
      nodeName: 'meta',
      attributes: {
        'http-equiv': 'refresh'
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass for content=0', function() {
    var results = axe.runVirtualRule('meta-refresh', {
      nodeName: 'meta',
      attributes: {
        'http-equiv': 'refresh',
        content: '0'
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should pass for content=0 and url', function() {
    var results = axe.runVirtualRule('meta-refresh', {
      nodeName: 'meta',
      attributes: {
        'http-equiv': 'refresh',
        content: '0;url=http://example.com/'
      }
    });

    assert.lengthOf(results.passes, 1);
    assert.lengthOf(results.violations, 0);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail for content other than 0', function() {
    var results = axe.runVirtualRule('meta-refresh', {
      nodeName: 'meta',
      attributes: {
        'http-equiv': 'refresh',
        content: '300'
      }
    });

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });

  it('should fail for content other than 0 and url', function() {
    var results = axe.runVirtualRule('meta-refresh', {
      nodeName: 'meta',
      attributes: {
        'http-equiv': 'refresh',
        content: '20;url=http://example.com/'
      }
    });

    assert.lengthOf(results.passes, 0);
    assert.lengthOf(results.violations, 1);
    assert.lengthOf(results.incomplete, 0);
  });
});
