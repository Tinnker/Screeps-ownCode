var roleReloader = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.store.getUsedCapacity() < 50) {
            var sources = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_STORAGE)
                }
            });
            if(creep.withdraw(sources[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
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