var manage = {
    
	/** 
	 * @param {Integer} builderLimit
	 * @param {Integer} gathererLimit
	 * @param {Integer} minerLimit
	 * @param {Integer} upgraderLimit
	 * @param {Integer} repairerLimit
	 * @param {Integer} longRangeHarvesterLimit
	 **/
    run : function(builderLimit, gathererLimit, minerLimit, upgraderLimit, repairerLimit, longRangeHarvesterLimit, crossRoomBuilderLimit, guardLimit, rangedGuardLimit) {
        var SPAWNER = Game.spawns['Spawner_Main'];
		var energy = SPAWNER.room.energyCapacityAvailable;
        
        // CLEAR MEMORY
        for (var name in Memory.creeps) {
            if (!Game.creeps[name]) {
                delete Memory.creeps[name];
            }
        }
        
		// Spawner is busy, cannot spawn, so don't check.
		if (SPAWNER.spawning == null) {
			// RESPAWN CREEPS
			var count = manage.count();
			
			var name = undefined;
			
			// MINER
			if (count.miners.length < minerLimit) {
				var source0 = 0;
				var source1 = 0;
				count.miners.forEach(function(creep) {
					if (creep.memory.source == 'source0') {
						source0++;
					} else {
						source1++;
					}
				});
				name = SPAWNER.createMiner(count.miners.length == 0 ? (SPAWNER.room.energyAvailable >= 300 ? SPAWNER.room.energyAvailable : 300) : energy, (source0 < source1 ? 'source0' : 'source1'));
				
				if (name != undefined && !(name < 0)) {
					manage.spawned(name, "Miner");
				}
			}
			
			// GATHERER
			if (count.gatherers.length < gathererLimit) {
				name = SPAWNER.createGatherer(count.gatherers.length == 0 ? (SPAWNER.room.energyAvailable >= 300 ? SPAWNER.room.energyAvailable : 300) : energy);
				
				if (name != undefined && !(name < 0)) {
					manage.spawned(name, "Gatherer");
				}
			}
			
			// UPGRADER
			if (count.upgraders.length < upgraderLimit) {
				name = SPAWNER.createUpgrader(count.upgraders.length == 0 ? (SPAWNER.room.energyAvailable >= 300 ? SPAWNER.room.energyAvailable : 300) : energy);
				
				if (name != undefined && !(name < 0)) {
					manage.spawned(name, "Upgrader");
				}
			}
			
			// BUILDER
			if (count.builders.length < builderLimit) {
				name = SPAWNER.createBuilder(energy);
				
				if (name != undefined && !(name < 0)) {
					manage.spawned(name, "Builder");
				}
			}
			
			// REPAIRER
			if (count.repairers.length < repairerLimit) {
				name = SPAWNER.createRepairer(energy);
				
				if (name != undefined && !(name < 0)) {
					manage.spawned(name, "Repairer");
				}
			}
			
			// GUARD
			if (count.guards.length < guardLimit) {
				name = SPAWNER.createGuard(energy, 'W77S31', 2, 34);
				
				if (name != undefined && !(name < 0)) {
					manage.spawned(name, "Guard");
				}
			}
			
			// RANGED GUARD
			if (count.rangedGuards.length < rangedGuardLimit) {
				name = SPAWNER.createRangedGuard(energy, 'W77S32', 22, 1);
				
				if (name != undefined && !(name < 0)) {
					manage.spawned(name, "Ranged Guard");
				}
			}
			
			// LONG RANGE HARVESTER
			if (count.longRangeHarvesters.length < longRangeHarvesterLimit) {
				var rooms = {
					W77S31: 0,
					W77S33: 0,
					W78S32: 0
				};
				count.longRangeHarvesters.forEach(function(creep) {
					for (var key in rooms) {
						if (creep.memory.target == key) {
							rooms[key]++;
						}
					}
				});
				var target = Object.keys(rooms).sort((a,b) => rooms[a] - rooms[b])[0];
				
				name = SPAWNER.createLongRangeHarvester(energy, SPAWNER.room.name, target);
				
				if (name != undefined && !(name < 0)) {
					manage.spawned(name, "Long Range Harvester");
				}
			}
			
			// CROSS ROOM BUILDER
			if (count.crossRoomBuilder.length < crossRoomBuilderLimit) {
				name = SPAWNER.createCrossRoomBuilder(energy, 'W78S32');
			}
		}
    },
	
	spawned : function(name, type) {
		console.log("New " + type + ", " + name + " with " + Game.creeps[name].body.length + " parts.");
		manage.allCreeps();
	},
	
	allCreeps : function() {
		var count = manage.count();
		
		console.log("---[CREEPS COUNT]---");
		console.log("------------------------------------------------------");
		console.log("Builders:", count.builders.length);
		console.log("Gatherers:", count.gatherers.length);
		console.log("Miners:", count.miners.length);
		console.log("Upgraders:", count.upgraders.length);
		console.log("Repairers:", count.repairers.length);
		console.log("Long Range Harvesters:", count.longRangeHarvesters.length);
		console.log("Cross Room Builders:", count.crossRoomBuilder.length);
		console.log("Guard:", count.guards.length);
		console.log("Ranged Guards:", count.rangedGuards.length);
		return;
	},
	
	count : function() {
		var count = {};
		count.builders	= manage.listBuilders();
		count.gatherers = manage.listGatherers();
		count.miners	= manage.listMiners();
		count.upgraders = manage.listUpgraders();
		count.repairers = manage.listRepairers();
		count.guards	= manage.listGuards();
		count.longRangeHarvesters = manage.listLongRangeHarvesters();
		count.crossRoomBuilder	  = manage.listCrossRoomBuilders();
		count.rangedGuards		  = manage.listRangedGuards();
		return count;
	},
	
	listAll : function(type) {
		switch (type) {
			case 'builder':
				return _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
			case 'gatherer':
				return _.filter(Game.creeps, (creep) => creep.memory.role == 'gatherer');
			case 'miner':
				return _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
			case 'upgrader':
				return _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
			case 'repairer':
				return _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
			case 'longRangeHarvester':
			case 'lrHarvester':
				return _.filter(Game.creeps, (creep) => creep.memory.role == 'lrHarvester');
			case 'crossRoomBuilder':
			case 'crBuilder':
				return _.filter(Game.creeps, (creep) => creep.memory.role == 'crBuilder');
			case 'guard':
				return _.filter(Game.creeps, (creep) => creep.memory.role == 'guard');
			case 'rangedGuard':
				return _.filter(Game.creeps, (creep) => creep.memory.role == 'rangedGuard');
		}
	},
	
	listBuilders : function() {
		return manage.listAll('builder');
	},
	
	listGatherers : function() {
		return manage.listAll('gatherer');
	},
	
	listMiners : function() {
		return manage.listAll('miner');
	},
	
	listUpgraders : function() {
		return manage.listAll('upgrader');
	},
	
	listRepairers : function() {
		return manage.listAll('repairer');
	},
	
	listLongRangeHarvesters : function() {
		return manage.listAll('lrHarvester');
	},
	
	listCrossRoomBuilders : function() {
		return manage.listAll('crBuilder');
	},
	
	listGuards : function() {
		return manage.listAll('guard');
	},
	
	listRangedGuards : function() {
		return manage.listAll('rangedGuard');
	},
	
	buildersSpeak : function() {
		manage.listBuilders().forEach(b => b.say('Builder'));
	},
	
	gatherersSpeak : function() {
		manage.listGatherers().forEach(g => g.say('Gatherer'));
	},
	
	minersSpeak : function() {
		manage.listMiners().forEach(m => m.say('Miner'));
	},
	
	upgradersSpeak : function() {
		manage.listUpgraders().forEach(u => u.say('Upgrader'));
	},
	
	repairersSpeak : function() {
		manage.listRepairers().forEach(r => r.say('Repairer'));
	},
	
	longRangeHarvestersSpeak : function() {
		manage.listLongRangeHarvesters().forEach(lrh => lrh.say('Long Range Harvester'));
	},
	
	crossRoomBuildersSpeak : function() {
		manage.listCrossRoomBuilders().forEach(crb => crb.say('Cross Room Builder'));
	},
	
	guardsSpeak : function() {
		manage.listGuards().forEach(g => g.say('Guard'));
	},
	
	rangedGuardsSpeak : function() {
		manage.listRangedGuards().forEach(rg => rg.say('Ranged Guard'));
	}
    
};

module.exports = manage;