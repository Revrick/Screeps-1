require('prototype.spawn')();
require('prototype.creep')();

var manage = require('manage');

var roleBuilder = require('role.builder');
var roleGatherer = require('role.gatherer');
var roleMiner = require('role.miner');
var roleUpgrader = require('role.upgrader');
var roleRepairer = require('role.repairer');
var roleLongRangeHarvester = require('role.longRangeHarvester');
var roleCrossRoomBuilder = require('role.crossRoomBuilder');
var roleGuard = require('role.guard');
var roleRangedGuard = require('role.rangedGuard');
var towerControl = require('tower');

module.exports.loop = function () {
    
    // console.log(Game.time);
    
    var BUILDER_LIMIT = 4;
    var GATHERER_LIMIT = 4;
    var MINER_LIMIT = 2;
    var UPGRADER_LIMIT = 5;
	var REPAIRER_LIMIT = 5;
	var LONG_RANGE_HARVESTER_LIMIT = 5;
	var CROSS_ROOM_BUILDER_LIMIT = 1;
	var GUARD_LIMIT = 3;
	var RANGED_GUARD_LIMIT = 1;
    
    manage.run(BUILDER_LIMIT,GATHERER_LIMIT,MINER_LIMIT,UPGRADER_LIMIT,REPAIRER_LIMIT,LONG_RANGE_HARVESTER_LIMIT,CROSS_ROOM_BUILDER_LIMIT,GUARD_LIMIT,RANGED_GUARD_LIMIT);
    
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if (creep.memory.role == 'gatherer') {
            roleGatherer.run(creep);
        }
        if (creep.memory.role == 'miner') {
            roleMiner.run(creep);
        }
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
		if (creep.memory.role == 'repairer') {
			roleRepairer.run(creep);
		}
		if (creep.memory.role == 'lrHarvester') {
			roleLongRangeHarvester.run(creep);
		}
		if (creep.memory.role == 'crBuilder') {
			roleCrossRoomBuilder.run(creep);
		}
		if (creep.memory.role == 'guard') {
			roleGuard.run(creep);
		}
		if (creep.memory.role == 'rangedGuard') {
			roleRangedGuard.run(creep);
		}
    }
	
	var towers = Game.spawns['Spawner_Main'].room.find(FIND_STRUCTURES, {
		filter: (structure) => structure.structureType == STRUCTURE_TOWER
	});
	towers.forEach((tower) => towerControl.run(tower));
    
}