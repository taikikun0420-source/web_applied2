// 敵：作る・入れる・動かす・踏まれたら倒す・描く
function createEnemy(x, vx) {
  return { x: x, y: floor.y - 32, w: 32, h: 32, vx: vx, alive: true };
}

let enemies = [];
enemies.push(createEnemy(200, 80));
enemies.push(createEnemy(380, -120));
enemies.push(createEnemy(540, 60));

function updateEnemies(dt) {
  for (const enemy of enemies) {
    enemy.x = enemy.x + enemy.vx * dt;
    if (enemy.x < 0) {
      enemy.x = 0;
      enemy.vx = -enemy.vx;
    }
    if (enemy.x + enemy.w > canvas.width) {
      enemy.x = canvas.width - enemy.w;
      enemy.vx = -enemy.vx;
    }
  }
}

function collideWithEnemies(prevBottom) {
  for (const enemy of enemies) {
    if (aabb(player, enemy) && prevBottom <= enemy.y && player.vy > 0) {
      enemy.alive = false;
      player.vy = -JUMP_SPEED / 2;
    }
  }
  enemies = enemies.filter((enemy) => enemy.alive);
}

function drawEnemies() {
  ctx.fillStyle = "#ff6b6b";
  for (const enemy of enemies) {
    ctx.fillRect(enemy.x, enemy.y, enemy.w, enemy.h);
  }
  ctx.fillStyle = "#e8eeff";
  ctx.fillText("敵 = " + enemies.length, 10, 40);
}
