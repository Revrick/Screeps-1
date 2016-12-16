require('prototype.creep')();

var roleCrossRoomBuilder = {
    
    /** @paran {Creep} creep **/
    run : function(creep) {
        
        if (creep.room.name == creep.memory.target) {
			if (!creep.isCollecting()) {
				creep.buildConstructionSites();
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