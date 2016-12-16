require('prototype.creep')();

var roleCrossRoomBuilder = {
    
    /** @paran {Creep} creep **/
    run : function(creep) {
        
		creep.manageState();
		
        if (creep.room.name == creep.memory.target) {
			if (creep.memory.working) {
				if (creep.buildConstructionSites()) {
					creep.repairStructures();
				}
			} else {
				creep.mineClosestSource();
			}
		} else {
			var exit = creep.room.findExitTo(creep.memory.target);
			creep.moveTo(creep.pos.findClosestByRange(exit));
		}
        
    }
    
};

module.exports = roleCrossRoomBuilder;