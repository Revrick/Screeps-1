require('prototype.creep')();

var roleBuilder = require('role.builder');

var roleRepairer = {
	
	/** @param {Creep} creep **/
	run : function(creep) {
        if (!creep.isCollecting()) {
            var targets = _.sortBy(creep.room.find(FIND_STRUCTURES, {
				filter: (structure) => {
					return (structure.structureType == STRUCTURE_ROAD ||
                            structure.structureType == STRUCTURE_RAMPART ||
                            structure.structureType == STRUCTURE_CONTAINER) && structure.hits < structure.hitsMax;
				}
			}), t => t.hits / t.hitsMax);
			if (targets.length > 0) {
				if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
					creep.moveTo(targets[0]);
				}
			} else {
				targets = creep.room.find(FIND_STRUCTURES, {
					filter: (structure) => {
						return structure.structureType == STRUCTURE_WALL && structure.hits < structure.hitsMax;
					}
				});
				if (targets.length > 0) {
					if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
						creep.moveTo(targets[0]);
					}
				} else {
					roleBuilder.run(creep);
				}
			}
        } else {
            creep.collectDroppedEnergy();
        }
	}
	
};

module.exports = roleRepairer;