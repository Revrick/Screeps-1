var towerControl = {
	
	run : function(tower) {
		
		var hostiles = _.sortBy(tower.room.find(FIND_HOSTILE_CREEPS), (hostile) => tower.pos.getRangeTo(hostile));
		var creeps = _.sortBy(_.sortBy(tower.room.find(FIND_MY_CREEPS, {
			filter: (creep) => creep.hits < creep.hitsMax
		}), (creep) => tower.pos.getRangeTo(creep)), (creep) => creep.hits);
		var structures = _.sortBy(_.sortBy(tower.room.find(FIND_STRUCTURES, {
			filter: (structure) => structure.structureType != STRUCTURE_WALL && structure.hits < structure.hitsMax
		}), (structure) => tower.pos.getRangeTo(structure)), (structure) => structure.hits / structure.hitsMax);
		var walls = _.sortBy(_.sortBy(tower.room.find(FIND_STRUCTURES, {
			filter: (structure) => structure.structureType == STRUCTURE_WALL && structure.hits < structure.hitsMax
		}), (wall) => tower.pos.getRangeTo(wall)), (wall) => wall.hits / wall.hitsMax);
		
		if (hostiles.length > 0) {
			tower.attack(hostiles[0]);
		} else if (creeps.length > 0) {
			tower.heal(creeps[0]);
		} else if (structures.length > 0) {
			tower.repair(structures[0]);
		} else if (walls.length > 0) {
			tower.repair(walls[0]);
		}
		
	}
	
};

module.exports = towerControl;