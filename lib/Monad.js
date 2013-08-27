/*
 * Monad
 * https://github.com/mbseid/Monad.js
 *
 * Copyright (c) 2013 Michael Seid
 * Licensed under the MIT license.
 */

(function(exports) {

  'use strict';

	var isFunction = function (functionToCheck) {
	  var getType = {};
	  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
	}

	 exports.Option = function( value ){
	   this.get = value;
		 this.isDefined = function(){
		 	return (typeof this.get != "undefined");
	 	 }
	 this.getOrElse = function( elseVal ){
	         if(this.isDefined){
	             return this.get;
	         }else{
	             if(isFunction( elseVal)){
	               return elseVal();
	             }else{
	               return elseVal;
	             }

	         }
	     }
	     return this;
	 }
		exports.Some = function( value ){
			return exports.Option(value);
		}
	exports.None = function(){
			return exports.Option(undefined);
		}
	

}(typeof exports === 'object' && exports || this));