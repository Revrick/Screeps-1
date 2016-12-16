require('prototype.creep')();

var roleUpgrader = {
    
    /** @paran {Creep} creep **/
    run : function(creep) {
        if (!creep.isCollecting()) {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        } else {
            creep.collectDroppedEnergy();
        }
    }
    
};

module.exports = roleUpgrader;