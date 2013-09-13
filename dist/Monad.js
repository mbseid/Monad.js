/*! Monad - v0.1.0 - 2013-09-13
* https://github.com/mbseid/Monad.js
* Copyright (c) 2013 Michael Seid; Licensed MIT */
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
    exports.Option = Option;




    exports.Some = function (value) {
        this.get = value;
        return this;
    };
    exports.Some.prototype = exports.Option.prototype;



    exports.None = function () {
        this.get = undefined;
        return this;
    };
    exports.None.prototype = exports.Option.prototype;



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
    exports.Left = symbol;
    exports.Left.prototype = exports.Either.prototype;
    exports.Right = symbol;
    exports.Right.prototype = exports.Either.prototype;

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