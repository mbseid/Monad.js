'use strict';

var M = require('../lib/Monad.js');

/*
 ======== A Handy Little Nodeunit Reference ========
 https://github.com/caolan/nodeunit

 Test methods:
 test.expect(numAssertions)
 test.done()
 Test assertions:
 test.ok(value, [message])
 test.equal(actual, expected, [message])
 test.notEqual(actual, expected, [message])
 test.deepEqual(actual, expected, [message])
 test.notDeepEqual(actual, expected, [message])
 test.strictEqual(actual, expected, [message])
 test.notStrictEqual(actual, expected, [message])
 test.throws(block, [error], [message])
 test.doesNotThrow(block, [error], [message])
 test.ifError(value)
 */

exports['Monad'] = {
    setUp: function (done) {
        done();
    },
    'Option.get': function (test) {
        test.expect(1);
        // tests here
        var option = new M.Option("awesome");
        test.equal(option.get, 'awesome', 'should be awesome.');
        test.done();
    },
    'Option.isDefined': function (test) {
        test.expect(4);
        // tests here
        var nullOption = new M.Option(null);
        test.equal(nullOption.isDefined(), false, 'nullOption should be false');
        var emptyOption = new M.Option();
        test.equal(emptyOption.isDefined(), false, 'emptyOption should be false');
        var undefinedOption = new M.Option(undefined);
        test.equal(undefinedOption.isDefined(), false, 'undefinedOption should be false');
        var option = new M.Option(1);
        test.equal(option.isDefined(), true, 'option should be true');
        test.done();
    },
    'Option.getOrElse': function (test) {
        test.expect(4);
        var nullOption = new M.Option(null);
        test.equal(nullOption.getOrElse("nullOpt"), "nullOpt", "nullOption should getOrElse");
        var option = new M.Option(1);
        test.equal(option.getOrElse(2), 1, "option should return original value");
        test.equal(nullOption.isDefined(), false, "nullOption should not be defined");
        var res = "it worked!";
        var functionResult = nullOption.getOrElse(function () {
            return res;
        });
        test.equal(functionResult, res, "function should get applied as an argument");
        test.done();
    },
    'Some': function (test) {
        test.expect(2);
        var some = new M.Some(1);
        test.equal(some.get, 1, "should get proper value");
        test.equal(some.isDefined(), true, "isDefined should work");
        test.done();
    },
    'None': function (test) {
        test.expect(1);
        var none = new  M.None();
        test.equal(none.isDefined(), false, "should get proper value");
        test.done();
    }

};
