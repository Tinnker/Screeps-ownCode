var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.store[RESOURCE_ENERGY] == 0) {
			var targets = creep.pos.findClosestByRange(FIND_STRUCTURES, {
				filter: (structure) => {
					return (
							structure.structureType == STRUCTURE_CONTAINER ) && 
							structure.store[RESOURCE_ENERGY] > 0;
				}
			});
			if(targets != null) {
				creep.memory.targetID = targets.id;
				var closedTarget = Game.getObjectById(creep.memory.targetID);
				if(creep.withdraw(closedTarget, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					creep.moveTo(closedTarget);
				}
			}
		}
		
		else {
			var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
			if(targets.length == 0) {
				const targets = creep.room.find(FIND_STRUCTURES, {
					filter: (structure) => {return structure.structureType == STRUCTURE_CONTAINER ||
						structure.structureType == STRUCTURE_ROAD &&
						structure.hits < structure.hitsMax
					}
				});
				
				targets.sort((a,b) => a.hits - b.hits);
				
				if(targets.length > 0) {
					if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
						creep.moveTo(targets[0]);
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