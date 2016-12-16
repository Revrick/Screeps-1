var roleGatherer = require('role.gatherer');

var roleBuilder = {
    
    /** @paran {Creep} creep **/
    run : function(creep) {
        
        if (creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('gathering');
        }
        if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('building');
        }
        
        if (creep.memory.building) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if (targets.length) {
                if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            } else {
				roleGatherer.run(creep);
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

module.exports = roleBuilder;