class Menu extends Phaser.Scene {
    constructor() {
        super("MenuScne");
    }
    preload() {
        this.load.audio('UI', './assets/Sounds/UI.wav');
        this.load.audio('Death', './assets/Sounds/Death.wav');
        this.load.audio('Error', './assets/Sounds/Error.wav')
        this.load.audio('Gameloop', './assets/Sounds/Muchachos 8-bit simple.wav');
        this.load.audio('Whoosh', './assets/Sounds/Whoosh.wav')
    }
    create() {
        
        this.UIsound = this.sound.add('UI');
        
        let borderColor = 0xFF0000;
        let backgroundColor = 0x0080FF;

        // Background rectangle (for the menu area)
        this.add.rectangle(
            game.config.width / 2,
            game.config.height / 2,
            game.config.width - borderPadding * 6,
            game.config.height - borderPadding * 6,
            backgroundColor
        ).setOrigin(0.5);

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
        this.add.rectangle(
            0,
            game.config.height - borderUISize,
            game.config.width,
            borderUISize,
            borderColor
        ).setOrigin(0, 0);

        // Left border
        this.add.rectangle(
            0,
            0,
            borderUISize,
            game.config.height,
            borderColor
        ).setOrigin(0, 0);

        // right border
        this.add.rectangle(
            game.config.width - borderUISize,
            0,
            borderUISize,
            game.config.height,
            borderColor
        ).setOrigin(0, 0);

        // menu text configurations
        let titleConfig = {
            fontFamily: 'Courier',
            fontSize: '48px',
            backgroundColor: '#6C63FF',
            color: '#FFFFFF',
            align: 'center',
            padding: {
                top: 10,
                bottom: 10,
            },
            fixedWidth: 0
        };

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
            fixedWidth: 0
        };

        // Title text
        this.add.text(
            game.config.width / 2,
            game.config.height / 4,
            "Soccer Endless Runner",
            titleConfig
        ).setOrigin(0.5);

        // insturctions text
        this.add.text(
            game.config.width / 2,
            game.config.height / 2,
            "Press LEFT for Instructions",
            instructionsConfig
        ).setOrigin(0.5);

        this.add.text(
            game.config.width / 2,
            game.config.height / 2 + 50,
            "Press RIGHT to Start",
            instructionsConfig
        ).setOrigin(0.5);

        // Define keys
        keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLeft)) {
            //easy mode
            console.log("heyy");
            this.scene.start('InstructionsScene')
            this.UIsound.play();
        }
        if (Phaser.Input.Keyboard.JustDown(keyRight)) {
            //easy mode
            console.log("heyy");
            this.scene.start('PlayScene')
            this.UIsound.play();
        }
    }

}