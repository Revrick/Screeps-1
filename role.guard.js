var roleGuard = {
    
    /** @paran {Creep} creep **/
    run : function(creep) {
		
		var flag = Game.flags['guard_move'];
        
		if (flag != undefined) {
			creep.moveTo(flag, {ignoreDestructibleStructures: true});
			
			let towers = creep.room.find(FIND_HOSTILE_STRUCTURES, {
				filter: s => s.structureType == STRUCTURE_TOWER
			});
			
			if (towers.length > 0) {
				
				if (creep.attack(towers[0]) == ERR_NOT_IN_RANGE) {
					creep.moveTo(towers[0], {ignoreDestructibleStructures: true});
				}
				
			} else {
			
				var hostiles = _.sortBy(creep.room.find(FIND_HOSTILE_CREEPS), h => creep.pos.getRangeTo(h));
				if (hostiles.length > 0) {
					if (creep.attack(hostiles[0]) == ERR_NOT_IN_RANGE) {
						creep.moveTo(hostiles[0], {ignoreDestructibleStructures: true});
					}
				} else {
					creep.moveTo(flag, {ignoreDestructibleStructures: true});
				}
			
			}
		} else {
			var hostiles = _.sortBy(creep.room.find(FIND_HOSTILE_CREEPS), h => creep.pos.getRangeTo(h));
			if (hostiles.length > 0) {
				if (creep.rangedAttack(hostiles[0]) == ERR_NOT_IN_RANGE) {
					creep.moveTo(hostiles[0]);
				}
			}
		}
        
    }
    
};

module.exports = roleGuard;