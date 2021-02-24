var roleCarryer = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.store[RESOURCE_ENERGY] == 0) {
            var source = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
            if(source.length == 0) {
                var sources = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER)
                    }
                });
                if(creep.withdraw(sources[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0]);
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
        else {
            var targets = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN ||
                            structure.structureType ==  STRUCTURE_TOWER ||
                            structure.structureType == STRUCTURE_STORAGE ) && 
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if(targets != null)
            {
                creep.memory.targetID = targets.id;
                var closedTarget = Game.getObjectById(creep.memory.targetID);
                if(creep.transfer(closedTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(closedTarget);
                }
            }
            else {
                var sources = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER)
                    }
                });
                if(creep.transfer(sources[2], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[2]);
                }
            }
        }
	}
};

module.exports = roleCarryer;
