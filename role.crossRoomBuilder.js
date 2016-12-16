var roleCrossRoomBuilder = {
    
    /** @paran {Creep} creep **/
    run : function(creep) {
        
        if (creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('harvesting');
        }
        if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('building');
        }
        
		if (creep.room.name == creep.memory.target) {
			if (creep.memory.building) {
				var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
				if (targets.length) {
					if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
						creep.moveTo(targets[0]);
					}
				}
			} else {
				var sources = _.sortBy(Game.rooms[creep.memory.target].find(FIND_SOURCES_ACTIVE), (source) => creep.pos.getRangeTo(source));
				if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
					creep.moveTo(sources[0]);
				}
			}
		} else {
			var exit = creep.room.findExitTo(creep.memory.target);
			creep.moveTo(creep.pos.findClosestByRange(exit));
		}
        
    }
    
};

module.exports = roleCrossRoomBuilder;