var roleRangedGuard = {
    
    /** @paran {Creep} creep **/
    run : function(creep) {
        
		if (creep.memory.target != undefined) {
			if (creep.room.name == creep.memory.target) {
				let roomPos = Game.rooms[creep.memory.target].getPositionAt(creep.memory.x, creep.memory.y);
				var hostiles = _.sortBy(creep.room.find(FIND_HOSTILE_CREEPS), h => roomPos.getRangeTo(h));
				if (hostiles.length > 0) {
					if (creep.rangedAttack(hostiles[0]) == ERR_NOT_IN_RANGE) {
						creep.moveTo(hostiles[0]);
					} else if (creep.rangedAttack(hostiles[0]) == ERR_NO_BODYPART) {
						if (creep.attack(hostiles[0]) == ERR_NOT_IN_RANGE) {
							creep.moveTo(hostiles[0]);
						}
					}
				} else {
					creep.moveTo(roomPos);
				}
			} else {
				var exit = creep.room.findExitTo(creep.memory.target);
				creep.moveTo(creep.pos.findClosestByRange(exit));
			}
		} else {
			var hostiles = _.sortBy(creep.room.find(FIND_HOSTILE_CREEPS), h => roomPos.getRangeTo(h));
			if (hostiles.length > 0) {
				if (creep.rangedAttack(hostiles[0]) == ERR_NOT_IN_RANGE) {
					creep.moveTo(hostiles[0]);
				}
			}
		}
        
    }
    
};

module.exports = roleRangedGuard;