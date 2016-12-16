var roleBuilder = require('role.builder');

var roleRepairer = {
	
	/** @param {Creep} creep **/
	run : function(creep) {
        if (creep.memory.repairing && creep.carry.energy == 0) {
            creep.memory.repairing = false;
            creep.say('gathering');
        }
        if (!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
            creep.memory.repairing = true;
            creep.say('repairing');
        }
        
        if (creep.memory.repairing) {
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
            var energy = creep.room.find(FIND_DROPPED_ENERGY);
            if (energy.length > 0) {
                if (creep.pickup(energy[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(energy[0]);
                }
            }
        }
	}
	
};

module.exports = roleRepairer;