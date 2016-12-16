var roleLongRangeHarvester = {
	
	run : function(creep) {
		if (creep.carry.energy < creep.carryCapacity) {
			if (creep.room.name == creep.memory.target) {
				var sources = _.sortBy(Game.rooms[creep.memory.target].find(FIND_SOURCES_ACTIVE), (source) => creep.pos.getRangeTo(source));
				if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
					creep.moveTo(sources[0]);
				}
			} else {
				var exit = creep.room.findExitTo(creep.memory.target);
				creep.moveTo(creep.pos.findClosestByRange(exit));
			}
		} else {
			if (creep.room.name == creep.memory.home) {
				var targets = Game.rooms[creep.memory.home].find(FIND_STRUCTURES, {
					filter: (structure) => {
						return (structure.structureType == STRUCTURE_EXTENSION ||
								structure.structureType == STRUCTURE_SPAWN ||
								structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
					}
				});
				if (targets.length > 0) {
					if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
						creep.moveTo(targets[0]);
					}
				}
			} else {
				var exit = creep.room.findExitTo(creep.memory.home);
				creep.moveTo(creep.pos.findClosestByRange(exit));
			}
		}
	}
	
};

module.exports = roleLongRangeHarvester;