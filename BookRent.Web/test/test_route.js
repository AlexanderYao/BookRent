var chai = require('chai')
var expect = chai.expect;
var Router  = require('../base/router')

describe('router', function(){
    var router = new Router();

    before(function(){
        router.addRoute('factor/:id');
        router.addRoute('factor/result/:id');
    });

    describe('#check()', function(){
        it('should return null when unmatched', function(){
            expect(router.check('factor_null/1')).to.equal(null);
        });

        it('should match factor/:id', function(){
            var result = router.check('factor/1?a=0&b=1');
            expect(result.path).to.equal('factor/:id');
            expect(result.params.id).to.equal('1');
            expect(result.params.a).to.equal('0');
            expect(result.params.b).to.equal('1');
        });

        it('should match factor/result/:id', function(){
            var result = router.check('factor/result/1?c=2&d=3');
            expect(result.path).to.equal('factor/result/:id');
            expect(result.params.id).to.equal('1');
            expect(result.params.c).to.equal('2');
            expect(result.params.d).to.equal('3');
        });
    });

    after(function(){

    });
});
