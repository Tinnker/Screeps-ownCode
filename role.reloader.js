var roleReloader = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.store[RESOURCE_ENERGY] == 0) {
            var source = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
            if(source != null) {
                creep.memory.sourceID = source.id;
				var closedSource = Game.getObjectById(creep.memory.sourceID);
				if(creep.pickup(closedSource, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					creep.moveTo(closedSource);
				}
            }
            else {
                var sources = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER)
                    }
                });
                if(creep.withdraw(sources[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0]);
                }
				
			}
        }
        
        else {
            var targets = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType ==  STRUCTURE_TOWER) && 
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 200
                }
            });
            if(targets != null) {
                creep.memory.targetID = targets.id;
                var closedTarget = Game.getObjectById(creep.memory.targetID);
                if(creep.transfer(closedTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(closedTarget);
                }
            }
            else {
            }
        }
	}
};

module.exports = roleReloader;