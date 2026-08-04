// Create game objects
const player = new Car(playerX, playerY, "player");
road.push(new Road(0, roadY));
road.push(new Road(road[0].x + roadWidth, roadY));
road.push(new Road(road[1].x + roadWidth, roadY));
const titleText = new Text(centreX, centreY, "90px", "consolas", "black");
const instText = new Text(centreX, 460, "40px", "consolas", "white");
const gameOverText = new Text(centreX, 400, "30px", "consolas", "white");
const scoreInfo = new Text(firstQuartX, 20, "20px", "consolas", "white");
const scoreText = new Text(firstQuartX, 50, "30px", "consolas", "white");
const highInfo = new Text(thirdQuartX, 20, "20px", "consolas", "white");
const highText = new Text(thirdQuartX, 50, "30px", "consolas", "white");

// Main game loop
function gameLoop() {
  window.requestAnimationFrame(gameLoop);

  if (keys?.[" "]) {
    switch (phase) {
      case 0:
        phase = 1;
        break;
      case 3:
        phase = 4;
        break;
      default:
        break;
    }
  }

  // Draws game background
  ctx.fillStyle = "DarkOliveGreen";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  animateRoad();

  player.draw();
  player.update();

  gameLogic();
  printGameText();
}

function everyInterval(n) {
  if ((frameNo / n) % 1 === 0) {
    return true;
  }
}

// Draws and animates Road
function animateRoad() {
  if (road[0].x + roadWidth < 0) {
    road.push(new Road(road[2].x + roadWidth, roadY));
    road.splice(0, 1);
  }
  for (r in road) {
    if (phase === 0 || phase === 3) {
      road[r].xVelocity = moveSpeed / 2;
    } else {
      road[r].xVelocity = moveSpeed;
    }
    road[r].draw();
    road[r].update();
  }
}

// Handles game phases and logic (e.g. player, traffic, scoring)
function gameLogic() {
  switch (phase) {
    case 1:
      frameNo++;
      // Movement
      player.xVelocity = 0;
      player.yVelocity = 0;
      if (
        keys &&
        (keys.ArrowLeft || keys.a || keys.A) &&
        player.left > roadLeft
      ) {
        player.xVelocity = -(moveSpeed / brakeForce);
      }
      if (
        keys &&
        (keys.ArrowRight || keys.d || keys.D) &&
        player.right < roadRight
      ) {
        player.xVelocity = moveSpeed;
      }
      if (keys && (keys.ArrowUp || keys.w || keys.W) && player.top > roadTop) {
        player.yVelocity = -moveSpeed;
      }
      if (
        keys &&
        (keys.ArrowDown || keys.s || keys.S) &&
        player.bottom < roadBottom
      ) {
        player.yVelocity = moveSpeed;
      }
      // Spawns traffic
      if (everyInterval(spawnRate)) {
        spawnTraffic();
      }
      // Updates score every second
      if (everyInterval(60)) {
        score += timeScore;
      }
      trafficLogic();
      break;
    case 2:
      trafficLogic();
      // Waits until player is offscreen and all traffic has despawned
      if (player.right < roadLeft && traffic.length === 0) {
        player.reset();
        phase = 3;
      }
      break;
    case 4:
      frameNo = 0;
      score = 0;
      scoreFlag = false;
      player.xVelocity = moveSpeed;
      if (player.left >= playerX) {
        player.xVelocity = 0;
        phase = 0;
      }
      break;
    default:
      break;
  }
}

// Traffic
function spawnTraffic() {
  const howMany = Math.floor(Math.random() * (maxCars - minCars + 1) + minCars);
  const spawns = new Set();
  while (spawns.size < howMany) {
    spawns.add(ySpawnPoints[Math.floor(Math.random() * ySpawnPoints.length)]);
  }
  const x = canvas.width + 200;
  spawns.forEach((y) => {
    traffic.push(new Car(x, y, null, "traffic"));
  });
}

function trafficLogic() {
  for (car in traffic) {
    // Despawns traffic that goes off screen
    if (traffic[car].right < roadLeft) {
      traffic.splice(traffic.indexOf(traffic[car]), 1);
    }

    try {
      traffic[car].draw();
      traffic[car].update();
      // Collision detection
      if (collision(player, traffic[car])) {
        player.crash();
        traffic[car].crash();
        phase = 2;
      }
      for (otherCar in traffic) {
        if (
          collision(traffic[car], traffic[otherCar]) &&
          traffic[car] !== traffic[otherCar]
        ) {
          traffic[otherCar].crash();
        }
      }

      // Updates score if player passes car
      if (
        player.left > traffic[car].right &&
        !traffic[car].isPassed() &&
        phase === 1
      ) {
        score += passScore;
        traffic[car].pass();
      }
    } catch {
      console.log("Non-fatal error: Traffic despawn"); // An exception appears during phase 2 (crashed) when the last two cars despawn
    }
  }
}

// Detects car crashes
function collision(object1, object2) {
  if (
    object1.right > object2.left &&
    object1.left < object2.right &&
    object1.top < object2.bottom &&
    object1.bottom > object2.top
  ) {
    return true;
  }
}

// Prints main game text
function printGameText() {
  let title = "";
  let instruction = "";
  let yourScore = "";
  switch (phase) {
    case 0:
      title = "Canvas Car  Game";
      instruction = "PRESS SPACE TO START";
      printGameText2(title, instruction, yourScore);
      break;
    case 3:
      title = "GAME OVER";
      instruction = "PRESS SPACE TO RESTART";
      if (score > highScore || scoreFlag) {
        highScore = score;
        yourScore = "NEW HI-";
        scoreFlag = true;
      }
      yourScore += `SCORE: ${Math.round(score)}`;
      printGameText2(title, instruction, yourScore);
      break;
    case 4:
      title = "LOADING...";
      printGameText2(title, instruction, yourScore);
      break;
    default:
      break;
  }

  // Below text is always on screen
  scoreInfo.text = "SCORE";
  highInfo.text = "HI-SCORE";
  scoreText.text = Math.round(score);
  highText.text = Math.round(highScore);
  scoreInfo.draw();
  highInfo.draw();
  scoreText.draw();
  highText.draw();
}

// Prints supporting text (e.g. scores)
function printGameText2(title, instruction, yourScore) {
  titleText.text = title;
  titleText.draw();
  gameOverText.text = yourScore;
  gameOverText.draw();
  instText.text = instruction;
  instText.draw();
}

// Event Listeners for key presses
window.addEventListener("keydown", (event) => {
  event.preventDefault();
  keys = keys || [];
  keys[event.key] = event.type === "keydown";
});

window.addEventListener("keyup", (event) => {
  keys[event.key] = event.type === "keydown";
});

// Game start
window.addEventListener("DOMContentLoaded", () => {
  gameLoop();
});
