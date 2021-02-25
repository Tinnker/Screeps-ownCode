var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var sources = creep.room.find(FIND_SOURCES);
        var target = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {return structure.structureType == STRUCTURE_CONTAINER}});
        if(creep.harvest(sources[creep.memory.S]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target[creep.memory.S]);
        }
	}
};

module.exports = roleHarvester;
