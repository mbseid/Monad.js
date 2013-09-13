/*
 * Monad
 * https://github.com/mbseid/Monad.js
 *
 * Copyright (c) 2013 Michael Seid
 * Licensed under the MIT license.
 */

(function (exports, undefined) {

    'use strict';
    var version = 0.1,
        hasModule = (typeof module !== 'undefined' && module.exports);

    var isFunction = function (functionToCheck) {
        var getType = {};
        return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
    };
    var match = function(){
        var value = this.get;
        for(var i= 0, l = arguments.length; i < l; i++){
            var mcase = arguments[i];
            if(mcase.shouldCallback.apply(this)){
                return mcase.callback.apply(this, [value]);
            }
        }
    };

    var map = function( func ) {
        return this.match(
            exports.case(Some, function(item){ return new Option(func.call(item, item));}),
            exports.case(None, None)
        );

    };



    var Option = function (value) {
        this.get = value;
        return this;
    };
    Option.prototype.isDefined = function () {
        return !(typeof this.get === "undefined" || this.get === null);
    };
    Option.prototype.getOrElse = function (elseVal) {
        if (this.isDefined()) {
            return this.get;
        } else {
            if (isFunction(elseVal)) {
                return elseVal();
            } else {
                return elseVal;
            }

        }
    };
    Option.prototype.match = match;
    Option.prototype.map = map;
    exports.Option = Option;




    var Some = function (value) {
        this.get = value;
        return this;
    };
    Some.prototype = exports.Option.prototype;
    exports.Some = Some;


    var None = function () {
        this.get = undefined;
        return this;
    };
    None.prototype = exports.Option.prototype;
    exports.None = None;


    exports.case = function(ifStatement, callback){
        var shouldCallback = function(){
            var shouldCallback = false;
            if(isFunction(ifStatement)){
                shouldCallback = !! ifStatement.apply(this);
            }else if(this instanceof ifStatement){
               shouldCallback = true;
            }
            return shouldCallback;
        };

        return {
            shouldCallback: shouldCallback,
            callback: callback
        };
    };






    var symbol = function(value){
        this.get = value;
        return this;
    };
    exports.Either = function(){
        return this;
    };
    exports.Either.prototype.match = match;
    exports.Either.prototype.fold = function(left, right){
        return this.match(
            exports.case(exports.Left, left),
            exports.case(exports.Right, right)
        );
    };
    var Left = symbol;
    Left.prototype = exports.Either.prototype;
    var Right = symbol;
    Right.prototype = exports.Either.prototype;
    exports.Left = Left;
    exports.Right = Right;


    /**
     * Exporting time!
     */
    // CommonJS module is defined
    if (hasModule) {
        exports = exports;
    }else if (typeof ender === 'undefined') {
        // here, `this` means `window` in the browser, or `global` on the server
        // add `moment` as a global object via a string identifier,
        // for Closure Compiler "advanced" mode
        this['M'] = exports;
    }

}(typeof exports === 'object' && exports || this));