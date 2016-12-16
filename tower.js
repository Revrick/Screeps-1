var towerControl = {
	
	run : function(tower) {
		
		var hostiles = _.sortBy(tower.room.find(FIND_HOSTILE_CREEPS), (hostile) => tower.pos.getRangeTo(hostile));
		var creeps = _.sortBy(_.sortBy(tower.room.find(FIND_MY_CREEPS, {
			filter: (creep) => creep.hits < creep.hitsMax
		}), (creep) => tower.pos.getRangeTo(creep)), (creep) => creep.hits);
		var rampart = Game.getObjectById('5853f55f56174ace2c00dc0f');
		
		if (hostiles.length > 0) {
			tower.attack(hostiles[0]);
		} else if (creeps.length > 0) {
			tower.heal(creeps[0]);
		} else if (tower.energy / tower.energyCapacity > .5) {
			tower.repair(rampart);
		} 
		
	}
	
};

module.exports = towerControl;