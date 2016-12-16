var roleMiner = {
    
    /** @paran {Creep} creep **/
    run : function(creep) {
        var source0 = creep.room.lookAt(36,25)[0].source;
        var source1 = creep.room.lookAt(40,32)[0].source;
        var mySource = creep.memory.source == 'source0' ? source0 : source1;
        
        if (creep.harvest(mySource) == ERR_NOT_IN_RANGE) {
            creep.moveTo(mySource);
        }
    }
    
};

module.exports = roleMiner;