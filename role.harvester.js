var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var sources = creep.room.find(FIND_SOURCES);
        if(creep.harvest(sources[creep.memory.S]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[creep.memory.S]);
        }
	}
};

module.exports = roleHarvester;
