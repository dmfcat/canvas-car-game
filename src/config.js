// Config
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 480;
var keys = [];
var traffic = [];
var road = [];
var phase = 0; // 0 = Title Screen, 1 = Game, 2 = Crashed, 3 = Game Over, 4 = Reset
var frameNo = 0;
var score = 0.0;
var scoreFlag = false;

// Scoring
var highScore = 20;
const timeScore = 1; // Score for every second
const passScore = 0.5; // Score for every car passed

// Player
// Player Speed
const moveSpeed = 6;
const brakeForce = 2 // Speed when braking is moveSpeed / brakeForce
// Player Spawn Coords
const playerX = 315;
const playerY = 175;

// Dimensions
const carWidth = 70;
const carHeight = 30;
const roadWidth = canvas.width;
const roadHeight = 260;
const borderHeight = 10;

// Traffic
// Traffic Speed
const defaultSpeed = 8.0; // Speed traffic moves at
const speedVariance = 0.2;
const maxSpeed = defaultSpeed + speedVariance;
const minSpeed = defaultSpeed - speedVariance;
// Traffic Spawn
const spawnRate = 45; // Spawns traffic every 'spawnRate' frames (Game runs at 60fps)
const minCars = 2;
const maxCars = 4; // DO NOT set higher than the amount of spawn points!
const carColours = ["red", "green", "blue", "yellow", "black", "white", "lightgrey", "darkgrey", "brown", "pink", "cyan", "police"];

// DON'T EDIT BELOW
// Scoring Coords
const firstQuartX = canvas.width / 4;
const thirdQuartX = (canvas.width / 4) + (canvas.width / 2);
const centreX = canvas.width / 2;
const centreY = canvas.height / 2;

// Traffic Spawn Coords
const xVariance = 30; // Traffic x axis spawns
const yVariance = 5;
const ySpawnPoints = [75, 125, 175, 225, 275]; // Traffic y axis spawns

// Road
// Road Spawn Coords
const roadY = 60;
// Road edges
const roadLeft = 0;
const roadRight = roadWidth;
const roadTop = roadY + borderHeight;
const roadBottom = roadY + roadHeight - borderHeight;
