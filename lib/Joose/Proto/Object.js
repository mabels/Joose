(function(){

    Joose.Proto = function(){ throw "Modules may not be instantiated." };
    
    
    Joose.Proto.Object = function (){
        throw "Joose.Proto.Object can't be instantiated";
    }
    
    
        
    var findSuperCall = function(startFrom){
        //sufficient for Joose.Proto.Class
        var self = startFrom.caller;
        
        //required for Joose.Managed.Class
        if (!self.SUPER) self = self.caller;
        
        if (!self.SUPER) throw "Invalid call to SUPER";
        
        //self._original is always undefined for Joose.Proto.Class
        return self._original || self.SUPER[self.methodName];
    }
    
    
    Joose.Proto.Object.prototype = {
        
        SUPERARG : function SUPERARG(){
            return findSuperCall(Joose.is_IE ? arguments.callee : SUPERARG).apply(this, arguments[0]);
        },
        
        
        SUPER : function SUPER(){
            return findSuperCall(Joose.is_IE ? arguments.callee : SUPER).apply(this, arguments);
        },
        
        
        INNER : function INNER(){
            //sufficient for augment modifiers and original methods from Joose.Proto.Class
            var self = (Joose.is_IE ? arguments.callee : INNER).caller.caller;
            
            //required for original methods from Joose.Managed.Class which can be also 'around' modifiers
            if (self.SUPER || self.AROUND) self = self.caller;
            
            var callstack = self.__INNER_STACK__;
            if (!callstack) throw "Invalid call to INNER";
            
            var augmentWrapper = function(){
                var innerCall = callstack.pop();
                
                return innerCall ? innerCall.apply(this, arguments) : undefined;
            }
            
            augmentWrapper.__INNER_STACK__ = callstack;
            
            return augmentWrapper.apply(this, arguments);
        },        
        
        
        initialize: function () {
        },
        
        
        toString: function () {
            return "a " + this.meta.name;
        }
        
    };
        
    
    Joose.Proto.Object.meta = {
        methods : Joose.Proto.Object.prototype,
        attributes : {}
    }
    
    
    Joose.Proto.Empty = function(){ throw "Joose.Proto.Empty can't be instantiated" };
    
    Joose.Proto.Empty.meta = {
        methods : {},
        attributes : {}
    }
    

})();