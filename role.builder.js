var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
		if(creep.store[RESOURCE_ENERGY] == 0 || creep.store.getUsedCapacity() < 50) {
			var sources = creep.room.find(FIND_STRUCTURES, {
				filter: (structure) => {
					return (structure.structureType == STRUCTURE_STORAGE)
				}
			});
			if(creep.withdraw(sources[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
				creep.moveTo(sources[0]);
			}
		}

		/*
	    if(creep.store[RESOURCE_ENERGY] == 0) {
			var source = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
			if(source == null) {
				var sources = creep.pos.findClosestByRange(FIND_STRUCTURES, {
					filter: (structure) => {
						return (structure.structureType == STRUCTURE_CONTAINER
								|| structure.structureType == STRUCTURE_STORAGE)
								&& structure.store[RESOURCE_ENERGY] > 0 }});
				creep.memory.sourcesID = sources.id;
				var closedSources = Game.getObjectById(creep.memory.sourcesID);
				if(creep.withdraw(closedSources, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					creep.moveTo(closedSources);
				}
			}
			else {
				creep.memory.sourceID = source.id;
				var closedSource = Game.getObjectById(creep.memory.sourceID);
				if(creep.pickup(closedSource, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					creep.moveTo(closedSource);
				}
			}
		}
		*/
		else {
			
			var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
			if(targets.length == 0) {
				const targets = creep.room.find(FIND_STRUCTURES, {
					filter: (structure) => {
						return structure.structureType == STRUCTURE_ROAD &&
                                (structure.hitsMax - structure.hits) > 1000
					}
				});
				
				targets.sort((a,b) => a.hits - b.hits);
				if(targets.length > 0) {
					if(creep.repair(targets[1]) == ERR_NOT_IN_RANGE) {
						creep.moveTo(targets[1]);
					}
				}
			}
			else {
				if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
					creep.moveTo(targets[0]);
				}
			}
		}
	}
};

module.exports = roleBuilder;