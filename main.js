require('prototype.spawn')();
require('prototype.creep')();

var manage = require('manage');

var roleMap = {};
roleMap['builder'] = require('role.builder');
roleMap['gatherer'] = require('role.gatherer');
roleMap['miner'] = require('role.miner');
roleMap['upgrader'] = require('role.upgrader');
roleMap['repairer'] = require('role.repairer');
roleMap['lrHarvester'] = require('role.longRangeHarvester');
roleMap['crBuilder'] = require('role.crossRoomBuilder');
roleMap['guard'] = require('role.guard');
roleMap['rangedGuard'] = require('role.rangedGuard');

var towerControl = require('tower');

var BUILDER_LIMIT = 2;
var GATHERER_LIMIT = 2;
var MINER_LIMIT = 2;
var UPGRADER_LIMIT = 2;
var REPAIRER_LIMIT = 2;
var LONG_RANGE_HARVESTER_LIMIT = 5;
var CROSS_ROOM_BUILDER_LIMIT = 1;
var GUARD_LIMIT = 2;
var RANGED_GUARD_LIMIT = 1;

module.exports.loop = function () {
    
    // console.log(Game.time);
    
    manage.run(BUILDER_LIMIT,GATHERER_LIMIT,MINER_LIMIT,UPGRADER_LIMIT,REPAIRER_LIMIT,LONG_RANGE_HARVESTER_LIMIT,CROSS_ROOM_BUILDER_LIMIT,GUARD_LIMIT,RANGED_GUARD_LIMIT);
    
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (roleMap[creep.memory.role] != undefined) {
            roleMap[creep.memory.role].run(creep);
        }
    }
	
    var towers = Game.spawns['Spawner_Main'].room.find(FIND_STRUCTURES, {
        filter: (structure) => structure.structureType == STRUCTURE_TOWER
    });
    towers.forEach((tower) => towerControl.run(tower));
}
