require('prototype.creep')();

var roleGatherer = require('role.gatherer');

var roleBuilder = {
    
    /** @paran {Creep} creep **/
    run : function(creep) {
        
        if (!creep.isCollecting()) {
            if (!creep.buildConstructionSites()) {
				roleGatherer.run(creep);
			}
        } else {
            creep.collectDroppedEnergy();
        }
        
    }
    
};

module.exports = roleBuilder;