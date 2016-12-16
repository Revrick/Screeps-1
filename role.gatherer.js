require('prototype.creep')();

var roleGatherer = {
    
    /** @paran {Creep} creep **/
    run : function(creep) {
        if (creep.carry.energy < creep.carryCapacity) {
            creep.collectDroppedEnergy();
        } else {
            creep.storeCollectedEnergy();
        }
    }
    
};

module.exports = roleGatherer;