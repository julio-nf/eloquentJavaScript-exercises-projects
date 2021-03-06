/*
Measuring robot

It’s hard to objectively compare robots by just letting them solve a few
scenarios. Maybe one robot just happened to get easier tasks or the kind of
tasks that it is good at, whereas the other didn’t.

Write a function compareRobots that takes two robots (and their starting
memory). It should generate 100 tasks and let each of the robots solve each
of these tasks. When done, it should output the average number of steps each
robot took per task.

For the sake of fairness, make sure you give each task to both robots, rather
than generating different tasks per robot.
*/


// Code from Project - Chapter 7
// -----------------------------
// function buildGraph(edges) {
//   let graph = Object.create(null);

//   function addEdge(from, to) {
//     if (graph[from] == null) {
//       graph[from] = [to];
//     } else {
//       graph[from].push(to);
//     }
//   }
//   for (let [from, to] of edges.map(r => r.split("-"))) {
//     addEdge(from, to);
//     addEdge(to, from);
//   }
//   return graph;
// }

// const roads = [
//   "Alice's House-Bob's House",   "Alice's House-Cabin",
//   "Alice's House-Post Office",   "Bob's House-Town Hall",
//   "Daria's House-Ernie's House", "Daria's House-Town Hall",
//   "Ernie's House-Grete's House", "Grete's House-Farm",
//   "Grete's House-Shop",          "Marketplace-Farm",
//   "Marketplace-Post Office",     "Marketplace-Shop",
//   "Marketplace-Town Hall",       "Shop-Town Hall"
// ];
// const roadGraph = buildGraph(roads);

// function randomPick(array) {
//   let choice = Math.floor(Math.random() * array.length);
//   return array[choice];
// }

// class VillageState {
//   constructor(place, parcels) {
//     this.place = place;
//     this.parcels = parcels;
//   }

//   move(destination) {
//     if (!roadGraph[this.place].includes(destination)) {
//       return this;
//     } else {
//       let parcels = this.parcels.map(p => {
//         if (p.place != this.place) return p;
//         return {
//           place: destination,
//           address: p.address
//         };
//       }).filter(p => p.place != p.address);
//       return new VillageState(destination, parcels);
//     }
//   }
// }

// VillageState.random = function(parcelCount = 5) {
//   let parcels = [];
//   for (let i = 0; i < parcelCount; i++) {
//     let address = randomPick(Object.keys(roadGraph));
//     let place;
//     do {
//       place = randomPick(Object.keys(roadGraph));
//     } while (place == address);
//     parcels.push({place, address});
//   }
//   return new VillageState("Post Office", parcels);
// };

// const mailRoute = [
//   "Alice's House", "Cabin", "Alice's House", "Bob's House",
//   "Town Hall", "Daria's House", "Ernie's House",
//   "Grete's House", "Shop", "Grete's House", "Farm",
//   "Marketplace", "Post Office"
// ];

// function routeRobot(state, memory) {
//   if (memory.length == 0) {
//     memory = mailRoute;
//   }
//   return {direction: memory[0], memory: memory.slice(1)};
// }

// function findRoute(graph, from, to) {
//   let work = [{at: from, route: []}];
//   for (let i = 0; i < work.length; i++) {
//     let {at, route} = work[i];
//     for (let place of graph[at]) {
//       if (place == to) return route.concat(place);
//       if (!work.some(w => w.at == place)) {
//         work.push({
//           at: place,
//           route: route.concat(place)
//         });
//       }
//     }
//   }
// }

// function goalOrientedRobot({place, parcels}, route) {
//   if (route.length == 0) {
//     let parcel = parcels[0];
//     if (parcel.place != place) {
//       route = findRoute(roadGraph, place, parcel.place);
//     } else {
//       route = findRoute(roadGraph, place, parcel.address);
//     }
//   }
//     return {direction: route[0], memory: route.slice(1)};
// }


// My code
function runRobot(state, robot, memory) {
  for (let steps = 0;; steps++) {
  if (state.parcels.length == 0) {
      return steps;
    }
    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
  }
}

function compareRobots(robot1, memory1, robot2, memory2) {
  let robot1Steps = 0;
  let robot2Steps = 0;

  for (let i = 0; i < 100; i++) {
    const state = VillageState.random();

    robot1Steps += runRobot(state, robot1, memory1);
    robot2Steps += runRobot(state, robot2, memory2);
  }

  console.log('Average steps per task for Robot 1: ' + robot1Steps/100);
  console.log('Average steps per task for Robot 2: ' + robot2Steps/100);
}


// Tests
compareRobots(routeRobot, [], goalOrientedRobot, []);
// -> Average steps per task for Robot 1: 18.86
// -> Average steps per task for Robot 2: 14.43

// -> Average steps per task for Robot 1: 18
// -> Average steps per task for Robot 2: 14.9