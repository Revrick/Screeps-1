var roleGatherer = {
    
    /** @paran {Creep} creep **/
    run : function(creep) {
        if (creep.carry.energy < creep.carryCapacity) {
            var energy = creep.room.find(FIND_DROPPED_ENERGY);
            if (energy.length > 0) {
                if (creep.pickup(energy[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(energy[0]);
                }
            }
        } else {
            var targets = creep.room.find(FIND_MY_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity;
                }
            });
			creep.room.find(FIND_MY_STRUCTURES, {
				filter: (structure) => {
					return structure.structureType == STRUCTURE_TOWER && structure.energy < structure.energyCapacity;
				}
			}).forEach((tower) => targets.push(tower));
            if (targets.length > 0) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
        }
    }
    
};

module.exports = roleGatherer;