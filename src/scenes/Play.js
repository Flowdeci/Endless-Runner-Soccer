class Play extends Phaser.Scene {
    constructor() {
        super("PlayScene");
    }

    init() {
        console.log("play scene");
    }

    preload() {
        // Load assets here
        this.load.image('background', './assets/Sprites/Others/soccer-field.png');
        this.load.image('cone', './assets/Sprites/Others/cone.png')
        this.load.image('soccerball', './assets/Sprites/Others/Soccerball.png')

        //Player Run images
        this.load.image('player_run1', './assets/Sprites/Player/Run 5-1.png');
        this.load.image('player_run2', './assets/Sprites/Player/Run 5-2.png');
        this.load.image('player_run3', './assets/Sprites/Player/Run 5-3.png');
        this.load.image('player_run4', './assets/Sprites/Player/Run 5-4.png');
        this.load.image('player_run5', './assets/Sprites/Player/Run 5-5.png');
        this.load.image('player_run6', './assets/Sprites/Player/Run 5-6.png');
        this.load.image('player_run7', './assets/Sprites/Player/Run 5-7.png');
        this.load.image('player_run8', './assets/Sprites/Player/Run 5-8.png');
        this.load.image('player_run9', './assets/Sprites/Player/Run 5-9.png');
        this.load.image('player_run10', './assets/Sprites/Player/Run 5-10.png');

        //Plaer Jump images
        this.load.image('player_jump1', './assets/Sprites/Player/jump 5-1.png')
        this.load.image('player_jump2', './assets/Sprites/Player/jump 5-2.png')
        this.load.image('player_jump3', './assets/Sprites/Player/jump 5-3.png')
        this.load.image('player_jump4', './assets/Sprites/Player/jump 5-4.png')
        this.load.image('player_jump5', './assets/Sprites/Player/jump 5-5.png')
        this.load.image('player_jump6', './assets/Sprites/Player/jump 5-6.png')

        //Player Slide images
        this.load.image('player_slide1', './assets/Sprites/Player/slide 5-1.png')
        this.load.image('player_slide2', './assets/Sprites/Player/slide 5-2.png')
        this.load.image('player_slide3', './assets/Sprites/Player/slide 5-3.png')
        this.load.image('player_slide4', './assets/Sprites/Player/slide 5-4.png')
        this.load.image('player_slide5', './assets/Sprites/Player/slide 5-5.png')
        this.load.image('player_slide6', './assets/Sprites/Player/slide 5-6.png')
        this.load.image('player_slide7', './assets/Sprites/Player/slide 5-7.png')
        this.load.image('player_slide8', './assets/Sprites/Player/slide 5-8.png')




    }

    create() {
        // Initialize game objects here
        this.DeathSound = this.sound.add('Death');
        this.SprintSound = this.sound.add('Whoosh');
        this.ErrorSound = this.sound.add('Error');

        this.backgroundMusic = this.sound.add('Gameloop', {
            loop: true,
            volume: 0.5,
        });

        // Play the background music
        this.backgroundMusic.play();

        //  scrolling background
        this.background = this.add.tileSprite(
            game.config.width / 2,
            game.config.height / 2,
            this.textures.get('background').getSourceImage().width,
            this.textures.get('background').getSourceImage().height,
            'background'
        )
            .setOrigin(0.5, 0.5);

        // Scale the background to fit the game canvas while maintaining its aspect ratio
        let scaleX = game.config.width / this.background.width;
        let scaleY = game.config.height / this.background.height;
        let scale = Math.max(scaleX, scaleY); // use the larger scale to cover the whole canvas

        this.background.setScale(scale);

        let borderColor = 0xFF0000;
        let backgroundColor = 0x0080FF;

        // Borders
        // Top border
        this.add.rectangle(
            0,
            0,
            game.config.width,
            borderUISize,
            borderColor
        ).setOrigin(0, 0);
        // Bottom border


        // right border
        this.add.rectangle(
            game.config.width - borderUISize,
            0,
            borderUISize,
            game.config.height,
            borderColor
        ).setOrigin(0, 0);

        let instructionsConfig = {
            fontFamily: 'Courier',
            fontSize: '36px',
            backgroundColor: '#F3B141',
            color: '#000000',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0,
        };



        // Add physics-enabled borders 
        this.bottomBorder = this.add.rectangle(
            game.config.width / 2,
            game.config.height - 10,
            game.config.width,
            borderUISize,
            borderColor
        );

        this.physics.add.existing(this.bottomBorder);
        this.bottomBorder.body.setImmovable(true);


        this.backWall = this.add.rectangle(
            0,
            0,
            borderUISize,
            this.game.config.height,
            borderColor,
        ).setOrigin(0, 0);
        this.physics.add.existing(this.backWall);
        this.backWall.body.setImmovable(true);

        //PLayer Physics
        this.player = this.physics.add.sprite(200, 300, 'player_run1').setScale(0.75);
        this.player.body.setGravityY(500);
        this.player.setCollideWorldBounds(true);
        this.player.body.setSize(100, 180);
        this.defaultBodySize = { width: this.player.body.width, height: this.player.body.height };
        this.defaultBodyOffset = { x: this.player.body.offset.x, y: this.player.body.offset.y };


        // Add collisions for player
        this.physics.add.collider(this.player, this.bottomBorder);
        this.physics.add.collider(this.player, this.backWall, () => {
            console.log("Game Over! Player hit the back wall.");
            this.DeathSound.play();
            this.backgroundMusic.stop();
            this.scene.start('MenuScne')
            // Restart the game or show a game-over screen
        });

        this.score = 0;
        //this.textures.get('player_run1').setFilter(Phaser.Textures.FilterMode.LINEAR);
        keyJump = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keySlide = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        keySprint = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

        // Create the running animation
        this.anims.create({
            key: 'run',
            frames: [
                { key: 'player_run1' },
                { key: 'player_run2' },
                { key: 'player_run3' },
                { key: 'player_run4' },
                { key: 'player_run5' },
                { key: 'player_run6' },
                { key: 'player_run7' },
                { key: 'player_run8' },
                { key: 'player_run9' },
                { key: 'player_run10' },
            ],
            frameRate: 12,
            repeat: -1,
        });

        this.anims.create({
            key: 'jump_startup',
            frames: [
                { key: 'player_jump1' },
                { key: 'player_jump2' },
                { key: 'player_jump3' },
                { key: 'player_jump4' },
            ],
            frameRate: 25,
            repeat: 0,
        });

        this.anims.create({
            key: 'jump_airborne',
            frames: [
                { key: 'player_jump5' },
            ],
            frameRate: 1,
            repeat: -1,
        });

        this.anims.create({
            key: 'slide_startup',
            frames: [
                { key: 'player_slide1' },
                { key: 'player_slide2' },
                { key: 'player_slide3' },
                { key: 'player_slide4' },
            ],
            frameRate: 10,
            repeat: 0,
        })

        this.anims.create({
            key: 'slide',
            frames: [
                { key: 'player_slide5' },
            ],
            frameRate: 1,
            repeat: -1,
        })
        this.anims.create({
            key: 'slide_end',
            frames: [
                { key: 'player_slide6' },
                { key: 'player_slide7' },
                { key: 'player_slide8' },
            ],
            frameRate: 10,
            repeat: 0,
        })

        // Play the animation
        this.player.play('run');

        this.player.on('animationcomplete', (animation) => {
            //after using jump startup launcht the player
            if (animation.key === 'jump_startup') {
                this.player.setVelocityY(-350);
                this.player.play('jump_airborne');
                this.time.delayedCall(100, () => { this.leftGround = true; });
            }

            //after slide startup slide
            if (animation.key === 'slide_startup') {
                this.player.play('slide')
                this.time.delayedCall(1000, () => { this.player.play('slide_end') });
            }

            //slide over
            if (animation.key === 'slide_end') {
                this.slideing = false;
                this.slideOver = true
                this.player.body.setOffset(this.defaultBodyOffset.x, this.defaultBodyOffset.y);

                this.player.body.setSize(this.defaultBodySize.width, this.defaultBodySize.height);
                const groundY = this.bottomBorder.getBounds().top; // Get the top of the ground
                this.player.y = groundY - this.player.body.height / 2;

            }
        });

        this.player.on('animationstart', (animation) => {
            //change hitbox size when jumping
            if (animation.key === 'jump_startup') {
                console.log("changing to jump hitbox")
                this.player.body.setSize(40, this.defaultBodySize.height);
            }
            if (animation.key === 'slide_startup') {
                console.log("changing to slide hitbox")
                const newHeight = 100;
                const heightDifference = this.player.body.height - newHeight;

                //this.player.body.setOffset(this.player.body.offset.x, this.player.body.offset.y + heightDifference);

                this.player.body.setSize(this.player.body.width + 50, newHeight);
                const offsetX = 20; // Horizontal offset to center the hitbox
                const offsetY = this.defaultBodySize.height - newHeight;
                this.player.body.setOffset(offsetX, offsetY);
            }

            //rest hitbox once run anitmation starts again
            if (animation.key === 'run') {
                console.log("resseting hitbox")
                this.player.body.setOffset(this.defaultBodyOffset.x, this.defaultBodyOffset.y);

                this.player.body.setSize(this.defaultBodySize.width, this.defaultBodySize.height);

            }
        });

        this.leftGround = false;
        this.slideing = false;
        this.slideOver = false;
        this.isSprinting = false;
        this.canSprint = true;
        // Stamina variables
        this.stamina = 100;
        this.staminaDrainRate = 50;
        this.staminaRegenRate = 30;

        // Create a stamina bar (optional)
        this.staminaBar = this.add.rectangle(borderUISize + borderPadding, borderUISize + borderPadding + 100, this.stamina * 2, 20, 0x00FF00).setOrigin(0, 0);
        this.add.text(borderUISize + borderPadding, borderUISize + borderPadding + 70, 'Stamina', { fontSize: '18px', fill: '#000000' });

        //score text
        this.scoreText = this.add.text(
            borderUISize + borderPadding,
            borderUISize + borderPadding,
            "Score: 0",
            instructionsConfig
        );


        this.difficultyMultiplier = 1;
        this.obstacleSpeedMultiplier = 1;
        this.obstacles = this.physics.add.group({
            runChildUpdate: true,
        });

        this.physics.add.collider(this.player, this.obstacles, this.handleCollision, null, this);


        // start the obstacle spawning system
        this.spawnObstacleTimer = this.time.addEvent({
            delay: Phaser.Math.Between(2000, 4000),
            callback: this.spawnObstacle,
            callbackScope: this,
            loop: true,
        });

        // Difficulty scaling
        this.difficultyTimer = this.time.addEvent({
            delay: 10000,
            callback: this.increaseDifficulty,
            callbackScope: this,
            loop: true,
        });
    }

    update(time, delta) {
        // scroll background
        this.background.tilePositionX += 2;

        // Resume running animation when the player lands
        if (this.player.body.touching.down && this.player.anims.currentAnim.key !== 'run' && (this.leftGround || this.slideOver)) {
            console.log("resuming run");
            this.player.play('run');
            this.leftGround = false;
            this.slideOver = false
        }

        //jump logic
        if (Phaser.Input.Keyboard.JustDown(keyJump)) {
            //all the checks to make sure we can acutally jump
            if (this.player.body.touching.down && this.player.anims.currentAnim.key !== 'jump_startup' && !this.slideing && !this.isSprinting) {
                console.log("jump startup");
                this.player.play('jump_startup');
            }
        }

        if (Phaser.Input.Keyboard.JustDown(keySlide)) {
            //check if can slide
            if (this.player.body.touching.down && this.player.anims.currentAnim.key !== 'jump_startup' && !this.slideing && !this.isSprinting) {
                console.log("slide starting");
                this.slideing = true;
                this.player.play('slide_startup');
            }
        }

        // Check if the player is holding down the sprint key
        if (keySprint.isDown && this.stamina > 0) {
            if (!this.isSprinting && this.player.body.touching.down && this.player.anims.currentAnim.key !== 'jump_startup' && !this.slideing) {
                console.log("Player started sprinting!");
                this.isSprinting = true;
                this.SprintSound.play();
                // Sprint behavior
                this.player.setVelocityX(300);
                this.stamina -= this.staminaDrainRate * (delta / 1000);

                // Prevent stamina from going below 0
                if (this.stamina <= 0) {
                    this.stamina = 0;
                    this.isSprinting = false;
                    this.player.setVelocityX(0);
                    console.log("Stamina depleted!");
                }
            }
        } else {
            // Not sprinting, stop the player
            this.player.setVelocityX(0);
            if (this.isSprinting) {
                console.log("Player stopped sprinting!");
                this.isSprinting = false;
            }

            // Regenerate stamina
            if (this.stamina < 100) {
                this.stamina += this.staminaRegenRate * (delta / 1000);
                if (this.stamina > 100) this.stamina = 100;
            }
        }

        // Update stamina bar
        this.staminaBar.width = this.stamina * 2;


        // Update the score over time
        this.score += delta / 1000;
        this.scoreText.setText(`Score: ${Math.floor(this.score)}`);
    }

    spawnObstacle() {
        const obstacleType = Phaser.Math.Between(0, 1);
        console.log("spawn obstacle");

        if (obstacleType === 0) {
            // Spawn a cone obstacle
            let cone = this.obstacles.create(
                game.config.width + 50,
                game.config.height - 50, // Ground position
                'cone'
            );
            cone.setVelocityX(-300 * this.obstacleSpeedMultiplier);
            cone.setImmovable(true);
        } else {
            // Spawn a soccer ball obstacle
            let soccerBall = this.obstacles.create(
                game.config.width + 50,
                game.config.height - 150,
                'soccerball'
            );
            soccerBall.setVelocityX(-400 * this.obstacleSpeedMultiplier);
            soccerBall.setImmovable(true);
            soccerBall.setScale(0.5);
            soccerBall.setAngularVelocity(200);
            soccerBall.body.setAllowGravity(false);
        }

        // Adjust Spawn timer
        this.spawnObstacleTimer.delay = Phaser.Math.Between(1500, 3500) / this.difficultyMultiplier;
    }

    increaseDifficulty() {
        // Increase difficulty over time
        this.difficultyMultiplier += 0.1;
        this.obstacleSpeedMultiplier += 0.1;

        console.log(`Difficulty increased: ${this.difficultyMultiplier}`);
    }

    handleCollision(player, obstacle) {
        console.log("Player hit an obstacle!");
        player.x -= 50;
        this.stamina -= 20;
        if (this.stamina < 0) this.stamina = 0;
        this.ErrorSound.play();
        obstacle.destroy();
    }
}