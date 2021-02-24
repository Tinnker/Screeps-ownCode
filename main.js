var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleCarryer = require('role.carryer');

// The creep configs
const creepConfigs = [
    {
        role: 'harvester',
        bodys: [ WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE, MOVE ],
        number: 1
    }, 
    {
        role: 'upgrader',
        bodys: [ WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE ],
        number: 3
    },
    {
        role: 'carryer',
        bodys: [ CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE ],
        number: 3
    }, 
    {
        role: 'builder',
        bodys: [ WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE ],
        number: 2
    }
]

// Check the task queue
Spawn.prototype.work = function() { 
    // Do nothing if spawning or nothing in list
    if(this.spawning || !this.memory.spawnList || this.memory.spawnList.length == 0) return;
    if(this.memory.spawnList[0] == null) this.memory.spawnList.shift();
    // Creating newCreeps
    var spawnSuccess = this.mainSpawn(this.memory.spawnList[0]);
    // Remove task if finished
    if(spawnSuccess) this.memory.spawnList.shift();
}

// Push tasks into the queue
Spawn.prototype.addTask = function(taskName) { 
    this.memory.spawnList.push(taskName);
    return this.memory.spawnList.length - 1;
}

// Creep generation
Spawn.prototype.mainSpawn = function(taskName) {
    for(var num in creepConfigs) {
        
        if(creepConfigs[num].role == taskName) {
            var newName = creepConfigs[num].role.substr(0,1) + Game.time;
            var sucCreate = Game.spawns['Spawn1'].spawnCreep(creepConfigs[num].bodys, newName,
            {memory: {role: creepConfigs[num].role, S: this.memory.S}});
            if(sucCreate == 0) {
                if(taskName == 'harvester') {
                    this.memory.S = this.memory.S ^ 1;
                }
                return true;
            }
        }
    }
}

module.exports.loop = function () {

    // Dead Check
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
           Game.spawns['Spawn1'].addTask(Memory.creeps[name].role);
           delete Memory.creeps[name];
        }
    }
    //  Create newCreeps
    Game.spawns['Spawn1'].work();


    // Check Creeps Num
    var checkTime = 5;
    if(!(Game.time % checkTime)) {
        console.log(Game.creeps.length);
        
    }

    // Tower mode
    var tower = Game.getObjectById('602b512566bfca3cc41aa321');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => {return structure.structureType == STRUCTURE_CONTAINER ||
                structure.structureType == STRUCTURE_ROAD &&
                structure.hits < structure.hitsMax
            }
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }


    // Run creeps
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'carryer') {
            roleCarryer.run(creep);
        }
        
    }
}