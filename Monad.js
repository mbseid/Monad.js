;(function(M, undefined){
 var isFunction = function (functionToCheck) {
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
 }

 M.Option = function( value ){
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
	M.Some = function( value ){
		return M.Option(value);
	}
	M.None = function(){
		return M.Option(undefined);
	}
	}
}(window.M = window.M || {}));