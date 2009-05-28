Joose.Managed.StemElement.MetaRoles = new Joose.Proto.Class('Joose.Managed.StemElement.MetaRoles', {

	isa : Joose.Managed.StemElement.Requirements,
    
    //initially closed
    opened : 0,
    
    propertyMetaClass : Joose.Managed.Property.MetaRole,
    
    
    cleanClone : function (name) {
        var clone = Joose.Managed.StemElement.MetaRoles.superClass.cleanClone.call(this, name)
        
        clone.opened = 1
        
        return clone
    },
    
    
    apply : function (targetClass) {
        if (Joose.O.isEmpty(this.properties)) return
        
        var metaRoles = []
        
        this.each(function (property) {
            metaRoles.push(property.value)
        })
        
        var metaInstance = targetClass.meta
        
        metaInstance.detach()
        
        metaInstance.meta.extend({
            does : metaRoles
        })
    },
    
    
    unapply : function (from) {
        if (Joose.O.isEmpty(this.properties)) return
        
        from.meta.attach()
    },
    
    
    reCompose : function(){
        //commenting this, not needed stage
        //this.prepareApply(this.targetMeta.c)
        
        Joose.Managed.StemElement.MetaRoles.superClass.reCompose.call(this)
        
        this.apply(this.targetMeta.c)
    },
    
    
    deCompose : function(){
        this.unapply(this.targetMeta.c)
        
        Joose.Managed.StemElement.MetaRoles.superClass.deCompose.call(this)
    }
    
    
}).c