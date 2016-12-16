module.exports = function() {
	
	Creep.prototype.manageState = function() {
		if (this.memory.working && this.isCollecting()) {
			this.memory.working = false;
		}
		if (!this.memory.working && this.isWorking()) {
			this.memory.working = true;
		}
	}
	
	Creep.prototype.isCollecting = function() {
		return this.carry.energy == 0;
	}
	
	Creep.prototype.isWorking = function() {
		return this.carry.energy == this.carryCapacity;
	}
	
	Creep.prototype.collectDroppedEnergy = function() {
		let energy = this.room.find(FIND_DROPPED_ENERGY);
		if (energy.length > 0) {
			if (this.pickup(energy[0]) == ERR_NOT_IN_RANGE) {
				this.moveTo(energy[0]);
			}
		} else {
			return false;
		}
	}
	
	Creep.prototype.withdrawFromStorage = function() {
		let storage = this.room.storage;
		if (storage != undefined) {
			if (storage.store[RESOURCE_ENERGY] > 0) {
				if (this.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					this.moveTo(storage);
				}
			} else {
				return false;
			}
		}
		return false;
	}
	
	Creep.prototype.buildConstructionSites = function() {
		let targets = this.room.find(FIND_CONSTRUCTION_SITES);
		if (targets.length > 0) {
			if (this.build(targets[0]) == ERR_NOT_IN_RANGE) {
				this.moveTo(targets[0]);
			}
		} else {
			return false;
		}
	}
	
	Creep.prototype.repairStructures = function() {
		let targets = _.sortBy(this.room.find(FIND_STRUCTURES, {
			filter: (structure) => structure.hits < structure.hitsMax && structure.structureType != STRUCTURE_WALL
		}), t => t.hits / t.hitsMax);
		if (targets.length > 0) {
			if (this.repair(targets[0]) == ERR_NOT_IN_RANGE) {
				this.moveTo(targets[0]);
			}
		} else {
			targets = _.sortBy(this.room.find(FIND_STRUCTURES, {
				filter: (structure) => structure.structureType == STRUCTURE_WALL && structure.hits < structure.hitsMax
			}), w => w.hits / w.hitsMax);
			if (targets.length > 0) {
				if (this.repair(targets[0]) == ERR_NOT_IN_RANGE) {
					this.moveTo(targets[0]);
				}
			} else {
				return false;
			}
		}
	}
	
	Creep.prototype.storeCollectedEnergy = function() {
		let targets = this.room.find(FIND_MY_STRUCTURES, {
			filter: (structure) => {
				return (structure.structureType == STRUCTURE_EXTENSION ||
						structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity;
			}
		});
		this.room.find(FIND_MY_STRUCTURES, {
			filter: (structure) => structure.structureType == STRUCTURE_TOWER && structure.energy < structure.energyCapacity
		}).forEach(tower => targets.push(tower));
		this.room.find(FIND_MY_STRUCTURES, {
			filter: (structure) => structure.structureType == STRUCTURE_STORAGE && structure.store < structure.storeCapacity
		}).forEach(storage => targets.push(storage));
		if (targets.length > 0) {
			if (this.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
				this.moveTo(targets[0]);
			}
		} else {
			return false;
		}
	}
	
	Creep.prototype.mineClosestSource = function() {
		if (!this.collectDroppedEnergy()) {
			let sources = _.sortBy(this.room.find(FIND_SOURCES_ACTIVE), (source) => this.pos.getRangeTo(source));
			if (this.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
				this.moveTo(sources[0]);
			}
		}
	}
	
}