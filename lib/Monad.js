/*
 * Monad
 * https://github.com/mbseid/Monad.js
 *
 * Copyright (c) 2013 Michael Seid
 * Licensed under the MIT license.
 */

(function (exports, undefined) {

    'use strict';

    var isFunction = function (functionToCheck) {
        var getType = {};
        return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
    }
    var match = function(){
        var value = this.get;
        for(var i= 0, l = arguments.length; i < l; i++){
            var mcase = arguments[i];
            if(mcase.shouldCallback.apply(this)){
                return mcase.callback.apply(this, [value]);
            }
        }
    }



    var Option = function (value) {
        this.get = value;
        return this;
    }
    Option.prototype.isDefined = function () {
        return !(typeof this.get == "undefined" || this.get === null);
    }
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
    }
    Option.prototype.match = match;
    exports.Option = Option;




    exports.Some = function (value) {
        this.get = value;
        return this;
    }
    exports.Some.prototype = exports.Option.prototype;



    exports.None = function () {
        this.get = undefined;
        return this;
    }
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
        }

        return {
            shouldCallback: shouldCallback,
            callback: callback
        };
    }






    var symbol = function(value){
        this.get = value;
        return this;
    };
    exports.Either = function(){
        this.get = value;
        return this;
    }
    exports.Either.prototype.match = match;
    exports.Left = symbol;
    exports.Left.prototype = exports.Either.prototype;
    exports.Right = symbol;
    exports.Right.prototype = exports.Either.prototype;

}(typeof exports === 'object' && exports || this));