var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.store[RESOURCE_ENERGY] == 0) {
			var targets = creep.pos.findClosestByRange(FIND_STRUCTURES, {
				filter: (structure) => {
					return (structure.structureType == STRUCTURE_CONTAINER ) && 
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
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
	}
};

module.exports = roleUpgrader;