
var Emitter = require('..');

describe('Emitter', function(){
  describe('.on(event, fn)', function(){
    it('should add listeners', function(){
      var emitter = new Emitter;
      var calls = [];

      emitter.on('foo', function(val){
        calls.push('one', val);
      });

      emitter.on('foo', function(val){
        calls.push('two', val);
      });

      emitter.emit('foo', 1);
      emitter.emit('bar', 1);
      emitter.emit('foo', 2);

      calls.should.eql([ 'one', 1, 'two', 1, 'one', 2, 'two', 2 ]);
    })
  })

  describe('.once(event, fn)', function(){
    it('should add a single-shot listener', function(){
      var emitter = new Emitter;
      var calls = [];
  
      emitter.once('foo', function(val){
        calls.push('one', val);
      });
  
      emitter.emit('foo', 1);
      emitter.emit('foo', 2);
      emitter.emit('foo', 3);
      emitter.emit('bar', 1);
  
      calls.should.eql([ 'one', 1 ]);
    })
  })

  describe('.off(event, fn)', function(){
    it('should remove a listener', function(){
      var emitter = new Emitter;
      var calls = [];

      function one() { calls.push('one'); }
      function two() { calls.push('two'); }

      emitter.on('foo', one);
      emitter.on('foo', two);
      emitter.off('foo', two);

      emitter.emit('foo');

      calls.should.eql([ 'one' ]);
    })

    it('should work with .once()', function(){
      var emitter = new Emitter;
      var calls = [];

      function one() { calls.push('one'); }

      emitter.once('foo', one);
      emitter.off('foo', one);

      emitter.emit('foo');

      calls.should.eql([]);
    })
  })

  describe('.off(event)', function(){
    it('should remove all listeners for an event', function(){
      var emitter = new Emitter;
      var calls = [];

      function one() { calls.push('one'); }
      function two() { calls.push('two'); }

      emitter.on('foo', one);
      emitter.on('foo', two);
      emitter.off('foo');

      emitter.emit('foo');
      emitter.emit('foo');

      calls.should.eql([]);
    })
  })

  describe('.has(event)', function(){
    describe('when handlers are present', function(){
      it('should return true', function(){
        var emitter = new Emitter;
        emitter.on('foo', function(){});
        emitter.has('foo').should.be.true;
      })
    })

    describe('when no handlers are present', function(){
      it('should return false', function(){
        var emitter = new Emitter;
        emitter.has('foo').should.be.false;
      })
    })
  })
})