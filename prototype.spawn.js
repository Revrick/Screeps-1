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
	
	StructureSpawn.prototype.createRangedGuard = function(energy, target, x, y) {
		var ranged_attack = Math.floor(energy * .5 / 150);
		var attack = Math.floor(energy * .25 / 80);
		var move = Math.floor(energy * .23 / 50);
		var tough = Math.floor(energy * .02 / 10);
		var leftoverEnergy = energy - (ranged_attack * 150 + attack * 80 + move * 50 + tough * 10);
		var body = [];
		
		if (leftoverEnergy / 150 >= 1) {
			ranged_attack += Math.floor(leftoverEnergy / 150);
			leftoverEnergy = energy - (ranged_attack * 150 + attack * 80 + move * 50 + tough * 10);
		}
		if (leftoverEnergy / 10 >= 1) {
			tough += Math.floor(leftoverEnergy / 10);
		}
		
		for (var i = 0; i < attack; i++) {
			body.push(ATTACK);
		}
		
		for (var i = 0; i < ranged_attack; i++) {
			body.push(RANGED_ATTACK);
		}
		
		for (var i = 0; i < tough; i++) {
			body.push(TOUGH);
		}
		
		for (var i = 0; i < move; i++) {
			body.push(MOVE);
		}
		
		let cMemory = {role: 'rangedGuard'};
		if (target != undefined) {
			cMemory.target = target;
			cMemory.x = x;
			cMemory.y = y;
		}
		
		return this.createCreep(body, undefined, cMemory);
	}
	
	StructureSpawn.prototype.createGuard = function(energy, target, x, y) {
		var attack = Math.floor(energy * .49 / 80);
		var move = Math.floor(energy * .49 / 50);
		var tough = Math.floor((energy - (attack * 80 + move * 50)) / 10);
		var body = [];
		
		for (var i = 0; i < tough; i++) {
			body.push(TOUGH);
		}
		
		for (var i = 0; i < attack; i++) {
			body.push(ATTACK);
		}
		
		for (var i = 0; i < move; i++) {
			body.push(MOVE);
		}
		
		let cMemory = {role: 'guard'};
		if (target != undefined) {
			cMemory.target = target;
			cMemory.x = x;
			cMemory.y = y;
		}
		
		return this.createCreep(body, undefined, cMemory)
	}
	
}