module.exports = function() {
	
	StructureSpawn.prototype.createBuilder = function(energy) {
		var parts = Math.floor(energy / 200);
		var body = [];
		
		for (var i = 0; i < parts; i++) {
			body.push(WORK);
		}
		
		for (var i = 0; i < parts; i++) {
			body.push(CARRY);
		}
		
		for (var i = 0; i < parts; i++) {
			body.push(MOVE);
		}
		
		return this.createCreep(body, undefined, {role: 'builder'});
	}
	
	StructureSpawn.prototype.createGatherer = function(energy) {
		var carry = 2;
		var body = [];
		
		for (var i = 0; i < carry; i++) {
			body.push(CARRY);
		}
		
		body.push(MOVE);
		
		return this.createCreep(body, undefined, {role: 'gatherer'});
	}
	
	StructureSpawn.prototype.createMiner = function(energy, source) {
		var work = Math.floor((energy - 50) / 100);
		work = work > 5 ? 5 : work;
		var body = [];
		
		for (var i = 0; i < work; i++) {
			body.push(WORK);
		}
		
		body.push(MOVE);
		
		return this.createCreep(body, undefined, {role: 'miner', source: source});
	}
	
	StructureSpawn.prototype.createUpgrader = function(energy) {
		var work = Math.floor(energy * .55 / 100);
		var carry = Math.floor(energy * .28 / 50);
		var move = Math.floor(energy * .17 / 50);
		var leftoverEnergy = energy - (work * 100 + carry * 50 + move * 50);
		var body = [];
		
		if (leftoverEnergy / 100 >= 1) {
			work++;
			leftoverEnergy = energy - (work * 100 + carry * 50 + move * 50);
		}
		if (leftoverEnergy / 50 >= 1) {
			move++;
		}
		
		for (var i = 0; i < work; i++) {
			body.push(WORK);
		}
		
		for (var i = 0; i < carry; i++) {
			body.push(CARRY);
		}
		
		for (var i = 0; i < move; i++) {
			body.push(MOVE);
		}
		
		return this.createCreep(body, undefined, {role: 'upgrader'});
	}
	
	StructureSpawn.prototype.createRepairer = function(energy) {
		var parts = Math.floor(energy / 200);
		var body = [];
		
		for (var i = 0; i < parts; i++) {
			body.push(WORK);
		}
		
		for (var i = 0; i < parts; i++) {
			body.push(CARRY);
		}
		
		for (var i = 0; i < parts; i++) {
			body.push(MOVE);
		}
		
		return this.createCreep(body, undefined, {role: 'repairer'});
	}
	
	StructureSpawn.prototype.createLongRangeHarvester = function(energy, home, target) {
		var work = Math.floor(energy * .55 / 100);
		var carry = Math.floor(energy * .27 / 50);
		var move = Math.floor(energy * .18 / 50);
		var leftoverEnergy = energy - (work * 100 + carry * 50 + move * 50);
		var body = [];
		
		if (leftoverEnergy / 50 >= 1) {
			move += Math.floor(leftoverEnergy / 50);
		}
		
		for (var i = 0; i < work; i++) {
			body.push(WORK);
		}
		
		for (var i = 0; i < carry; i++) {
			body.push(CARRY);
		}
		
		for (var i = 0; i < move; i++) {
			body.push(MOVE);
		}
		
		return this.createCreep(body, undefined, {role: 'lrHarvester', home: home, target: target});
	}
	
	StructureSpawn.prototype.createCrossRoomBuilder = function(energy, target) {
		var parts = Math.floor(energy / 200);
		var body = [];
		
		for (var i = 0; i < parts; i++) {
			body.push(WORK);
		}
		
		for (var i = 0; i < parts; i++) {
			body.push(CARRY);
		}
		
		for (var i = 0; i < parts; i++) {
			body.push(MOVE);
		}
		
		return this.createCreep(body, undefined, {role: 'crBuilder', target: target});
	}
	
}