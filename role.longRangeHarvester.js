require('prototype.creep')();

var roleLongRangeHarvester = {
	
	run : function(creep) {
		if (creep.carry.energy < creep.carryCapacity) {
			if (creep.room.name == creep.memory.target) {
				creep.mineClosestSource();
			} else {
				var exit = creep.room.findExitTo(creep.memory.target);
				creep.moveTo(creep.pos.findClosestByRange(exit));
			}
		} else {
			if (creep.room.name == creep.memory.home) {
				creep.storeCollectedEnergy();
			} else {
				var exit = creep.room.findExitTo(creep.memory.home);
				creep.moveTo(creep.pos.findClosestByRange(exit));
			}
		}
	}
	
};

module.exports = roleLongRangeHarvester;