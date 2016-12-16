require('prototype.creep')();

var roleBuilder = require('role.builder');

var roleRepairer = {
	
	/** @param {Creep} creep **/
	run : function(creep) {
        if (!creep.isCollecting()) {
            if (!creep.repairStructures()) {
				roleBuilder.run(creep);
			}
        } else {
            creep.collectDroppedEnergy();
        }
	}
	
};

module.exports = roleRepairer;