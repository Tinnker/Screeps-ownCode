var roleCarryer = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.store.getUsedCapacity() < 50) {
            //var source = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
            //if(source.length == 0) {
                var sources = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER)
                    }
                });
                if(creep.withdraw(sources[creep.memory.C], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[creep.memory.C]);
                }
            }
        /*
            else {
				creep.memory.sourceID = source.id;
				var closedSource = Game.getObjectById(creep.memory.sourceID);
				if(creep.pickup(closedSource, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					creep.moveTo(closedSource);
				}
			}
        }*/
        else {
            var targets = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_STORAGE) && 
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
        
            creep.memory.targetID = targets.id;
            var closedTarget = Game.getObjectById(creep.memory.targetID);
            if(creep.transfer(closedTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(closedTarget);
            }
        }
	}
};

module.exports = roleCarryer;