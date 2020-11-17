export function Initialize() {

  function gameStart() {

    // create Phaser.Game object named "game"
  var game = new Phaser.Game(800, 600, Phaser.AUTO, "my-game", {
    preload: preload,
    create: create,
    update: update,
  });
  
  // declare global variables for game
  
  let player,
    arrowKey,
    fireKey,
    engineSound,
    space,
    asteroidGroup,
    boomSound,
    explosion,
    laser,
    fireSound,
    asteroidParticles,
    healthText,
    healthBar,
    livesText,
    livesBar,
    livesCrop,
    teleportSound,
    lifeSound,
    gameTitle,
    startText,
    createdBy,
    gameOverText,
    leaderBoardText;
  let shipLives = 3;
  
  let score = 0;
  let scoreText;
  let maxLives = 5;
  let newLife = 10000;
  
  let maxSpeed = 100;
  
  // preload game assets - runs once at start
  function preload() {
    game.load.spritesheet("ship", "assets/images/spaceship.png", 64, 64);
    game.load.audio("engine", "assets/sounds/engine.mp3");
    game.load.image("space", "assets/images/space-stars.jpg");
    game.load.image("bullet", "assets/images/laser.png");
    game.load.image("particle", "assets/images/asteroid-particle.png");
    game.load.image("red-bar", "assets/images/health-red.png");
    game.load.image("green-bar", "assets/images/health-green.png");
    game.load.image("lives", "assets/images/ship-lives.png");
    game.load.image("title", "assets/images/asteroids-2084-title.png");
  
    game.load.audio("boom", "assets/sounds/boom.wav");
    game.load.audio("fire", "assets/sounds/fire.wav");
    game.load.audio("teleport", "assets/sounds/teleport.mp3");
    game.load.audio("life", "assets/sounds/extra-life.wav");
    game.load.spritesheet("asteroid", "assets/images/asteroid.png ", 40, 40);
  
    game.load.spritesheet("explosion", "assets/images/explosion.png", 128, 128);
  }
  
  // create game world - runs once after "preload" finished
  function create() {
    // sounds
    engineSound = game.add.audio("engine", 0.3);
    engineSound.loop = true;
    engineSound.play();
  
    boomSound = game.add.audio("boom", 0.3);
    teleportSound = game.add.audio("teleport", 0.5);
    lifeSound = game.add.audio("life", 0.5);
  
    // add physics
    game.physics.startSystem(Phaser.Physics.ARCADE);
  
    //   main background
    space = game.add.tileSprite(0, 0, 800, 600, "space");
  
    // bullets
    laser = game.add.weapon(10, "bullet");
    laser.bulletKillType = Phaser.Weapon.KILL_CAMERA_BOUNDS;
    laser.bulletSpeed = 600;
    laser.fireRate = 250;
  
    // set bullet collision area to match its visual size
    laser.setBulletBodyOffset(24, 12, 6, 6);
  
    player = game.add.sprite(400, 300, "ship");
  
    player.anchor.set(0.5, 0.5);
    player.angle = -90;
  
    player.health = 100;
    player.maxHealth = 100;
  
    // amination setting for player
    player.animations.add("moving", [0, 1, 2], 10, true);
    // hide player until game starts
    player.exists = false;
  
    player.events.onKilled.add(function () {
      explosion.reset(player.x, player.y);
      explosion.animations.play("explode", 30, false, true);
      shipLives -= 1;
  
      livesCrop = new Phaser.Rectangle(0, 0, shipLives * 25, 25);
      livesBar.crop(livesCrop);
  
      // respawn player if lives are left
      if (shipLives > 0) {
        player.x = game.world.centerX;
        player.y = game.world.centerY;
        player.angle = -90;
        player.body.velocity.set(0);
        player.body.acceleration.set(0);
        player.revive(player.maxHealth);
        player.alpha = 0; // start as transparent
        game.add
          .tween(player)
          .to({ alpha: 1 }, 2000, Phaser.Easing.Cubic.Out, true);
      } else {
        // game over
  
        gameOverText.visible = true;
        gameOverText.scale.setTo(3, 3);
        leaderBoardText.visible = true;
      
  
        fireKey.onDown.addOnce(restartGame, this);
  
        //    call the function here to save score
      }
  
      teleportSound.play();
    });
  
    laser.trackSprite(player, 0, 0, true);
    fireSound = game.add.audio("fire", 0.1);
    laser.onFire.add(function () {
      fireSound.play();
    });
  
    // group of streroids
    asteroidGroup = game.add.group();
    asteroidGroup.enableBody = true;
  
    // add asteroids to group
    for (var i = 0; i < 10; i++) {
      // create individual asteroid in group
      var asteroid = asteroidGroup.create(
        game.world.randomX,
        game.world.randomY,
        "asteroid"
      );
      asteroid.anchor.set(0.5, 0.5);
      asteroid.body.setCircle(15, 5, 5);
      asteroid.animations.add(
        "spin-clock",
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        16,
        true
      );
      asteroid.animations.add(
        "spin-counter",
        [15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
        16,
        true
      );
  
      // randomly select animation for asteroid spinning
      if (Math.random() < 0.5) asteroid.animations.play("spin-clock");
      else asteroid.animations.play("spin-counter");
  
      // give asteroid random speed and direction
      asteroid.body.velocity.x = Math.random() * maxSpeed;
      if (Math.random() < 0.5) asteroid.body.velocity.x *= -1;
  
      asteroid.body.velocity.y = Math.random() * maxSpeed;
      if (Math.random() < 0.5) asteroid.body.velocity.y *= -1;
    }
  
    asteroidParticles = game.add.emitter(0, 0, 50);
    asteroidParticles.makeParticles("particle");
    asteroidParticles.gravity = 0;
    asteroidParticles.setAlpha(1, 0, 1000); // fade out after 1000 ms
  
    //   add explosion sprite
    explosion = game.add.sprite(100, 100, "explosion");
    explosion.visible = false; // hide until needed
    //   amination for the explode
    explosion.animations.add(
      "explode",
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      30,
      false
    );
  
    // enable physics to player
    game.physics.arcade.enable(player);
  
    player.body.setCircle(20, 12, 12);
    // set physics
    player.body.maxVelocity.set(400);
    player.body.drag.set(20);
  
    // let the player be in the world
    player.body.collideWorldBounds = true;
  
    arrowKey = game.input.keyboard.createCursorKeys();
    fireKey = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    fireKey.onDown.addOnce(startGame, this);
  
    scoreText = game.add.text(20, 20, "Score: " + score, {
      font: "Arial",
      fontSize: "20px",
      fontStyle: "bold",
      fill: "#ffffff",
    });
  
    healthText = game.add.text(210, 20, "Shields", {
      font: "Arial",
      fontSize: "20px",
      fontStyle: "bold",
      fill: "#ffffff",
    });
  
    livesText = game.add.text(590, 20, "Ships", {
      font: "Arial",
      fontSize: "20px",
      fontStyle: "bold",
      fill: "#ffffff",
    });
  
    game.add.image(300, 20, "red-bar");
    healthBar = game.add.image(300, 20, "green-bar");
    livesBar = game.add.image(655, 20, "lives");
  
    livesCrop = new Phaser.Rectangle(0, 0, shipLives * 25, 25);
    livesBar.crop(livesCrop);
  
    gameTitle = game.add.image(400, 200, "title");
    gameTitle.anchor.set(0.5, 0.5);
  
    startText = game.add.text(
      400,
      300,
      "THE GREAT WAR OF MARS  KINDLY PRESS SPACE TO BEGIN",
      {
        font: "Arial",
        fontSize: "25px",
        fontStyle: "bold",
        fill: "#00ff00",
        text: "center",
      }
    );
  
    startText.anchor.set(0.5, 0.5);
  
    createdBy = game.add.text(400, 350, "created by peter robert", {
      font: "Arial",
      fontSize: "20px",
      fontStyle: "bold",
      fill: "#00ff00",
    });
  
    createdBy.anchor.set(0.5, 0.5);
  
    gameOverText = game.add.text(400, 300, "GAME OVER", {
      font: "Arial",
      fontSize: "40px",
      fontStyle: "bold",
      fill: "#ff0000",
      text: "center",
    });
  
    gameOverText.anchor.set(0.5, 0.5);
  
    gameOverText.visible = false;
  
    leaderBoardText = game.add.text(
      400,
      400,
      "press W to show the leader board or space to restart",
      {
        font: "Arial",
        fontSize: "25px",
        fontStyle: "bold",
        fill: "#00ff00",
        text: "center",
      }
    );
  
    leaderBoardText.anchor.set(0.5, 0.5);
  
    leaderBoardText.visible = false;
  }
  
  // update gameplay - runs in continuous loop after "create" finished
  function update() {
    // playing the amination
    player.animations.play("moving");
  
    player.animations.stop();
    player.frame = 1;
  
    game.physics.arcade.collide(
      player,
      asteroidGroup,
      collideAsteroid,
      null,
      this
    );
  
    game.physics.arcade.collide(laser.bullets, asteroidGroup, shootAsteroid);
  
    if (arrowKey.left.isDown) {
      // rotate player counter-clockwise (negative value)
      player.body.angularVelocity = -200;
    } else if (arrowKey.right.isDown) {
      // rotate player clockwise (positive value)
      player.body.angularVelocity = 200;
    } else {
      // stop rotating player
      player.body.angularVelocity = 0;
    }
  
    if (arrowKey.up.isDown && player.exists) {
      // accelerate player forward
      game.physics.arcade.accelerationFromRotation(
        player.rotation,
        200,
        player.body.acceleration
      );
      engineSound.volume = 1;
    } else {
      // stop accelerating player
      player.body.acceleration.set(0);
      engineSound.volume = 0.3;
    }
  
    //   space button
    if (fireKey.isDown && player.exists) {
      laser.fire();
    }
  
    // keep player onscreen (instead of collideWorldBounds)
    // will allow space tilesprite to keep scrolling
    if (player.left <= 50) player.left = 50;
    else if (player.right >= game.world.width - 50)
      player.right = game.world.width - 50;
  
    if (player.top <= 50) player.top = 50;
    else if (player.bottom >= game.world.height - 50)
      player.bottom = game.world.height - 50;
  
    // scroll space tilesprite in opposite direction of player velocity
    space.tilePosition.x = space.tilePosition.x - player.body.velocity.x / 40;
    space.tilePosition.y = space.tilePosition.y - player.body.velocity.y / 40;
  
    asteroidGroup.forEach(function (asteroid) {
      game.world.wrap(asteroid, 20);
    });
  
    // randomly add new asteroid if dead asteroid available
    if (Math.random() < 0.02) {
      var asteroid = asteroidGroup.getFirstDead();
      if (asteroid) {
        // reset asteroid at random position in game
  
        asteroid.revive();
  
        // give asteroid random speed and direction
        asteroid.body.velocity.x = Math.random() * maxSpeed;
        if (Math.random() < 0.5) asteroid.body.velocity.x *= -1;
  
        asteroid.body.velocity.y = Math.random() * maxSpeed;
        if (Math.random() < 0.5) asteroid.body.velocity.y *= -1;
  
        // give asteroid random speed and direction
  
        // make asteroid fade into view
        asteroid.alpha = 0; // start as transparent
        game.add
          .tween(asteroid)
          .to({ alpha: 1 }, 500, Phaser.Easing.Cubic.Out, true);
      }
    }
  }
  
  // add custom functions (for collisions, etc.)
  function collideAsteroid(player, asteroid) {
    asteroidParticles.x = asteroid.x;
    asteroidParticles.y = asteroid.y;
    asteroidParticles.explode(1000, 5);
    asteroid.kill();
    player.damage(25);
    healthBar.scale.setTo(player.health / player.maxHealth, 1);
    boomSound.play();
  
    game.camera.shake(0.02, 250);
  }
  
  function shootAsteroid(bullet, asteroid) {
    asteroid.kill();
    bullet.kill();
    boomSound.play();
    score += 250;
    checkNewLife();
  
    scoreText.text = "score: " + score;
  
    maxSpeed = maxSpeed + 1;
  }
  
  function checkNewLife() {
    if (score >= newLife) {
      if (shipLives < maxLives) {
        // award extra life
  
        shipLives += 1;
  
        livesCrop = new Phaser.Rectangle(0, 0, shipLives * 25, 25);
        livesBar.crop(livesCrop);
  
        lifeSound.play();
        game.camera.flash(0x00ff00, 500);
      }
      // maxLives already reached
      else if (player.health < player.maxHealth) {
        // replenish health instead
        player.health = player.maxHealth;
        healthBar.scale.setTo(player.health / player.maxHealth, 1);
  
        lifeSound.plays();
      }
      // increase score needed for next new life
      newLife = newLife + 10000;
    }
  }
  
  function startGame() {
    // fade out start text
    game.add
      .tween(startText)
      .to({ alpha: 0 }, 250, Phaser.Easing.Cubic.Out, true);
    game.add
      .tween(createdBy)
      .to({ alpha: 0 }, 250, Phaser.Easing.Cubic.Out, true);
  
    // fade out and zoom out game title (after slight delay)
    game.add
      .tween(gameTitle)
      .to({ alpha: 0 }, 3000, Phaser.Easing.Cubic.Out, true, 250);
    game.add
      .tween(gameTitle.scale)
      .to({ x: 3, y: 3 }, 3000, Phaser.Easing.Cubic.Out, true, 250);
  
    // fade in player
    teleportSound.play();
    // show player game starts
    player.exists = true;
  
    
  }
  
  
  function restartGame() {
      score = 0;
      shipLives = 3;
      newLife = 10000;
      maxSpeed = 100;
      game.state.restart();
  }


    
  }

  return gameStart();

}

