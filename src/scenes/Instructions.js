class Instructions extends Phaser.Scene {
    constructor() {
        super("InstructionsScene");
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
            "Instructions",
            titleConfig
        ).setOrigin(0.5);

        this.add.text(
            game.config.width / 2,
            game.config.height / 2,
            "just win lol",
            instructionsConfig
        ).setOrigin(0.5);

        // Define keys
        keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
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
        let creditsConfig = {
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
        if (Phaser.Input.Keyboard.JustDown(keyRight)) {
            //easy mode
            console.log("heyy");
            this.scene.start('MenuScne')
            this.UIsound.play();

        }
        if (Phaser.Input.Keyboard.JustDown(keyLeft)) {

            console.log("heyy");
            this.add.text(
                game.config.width / 2,
                game.config.height / 2 - 50,
                "Press Space to jump and C to slide\n" +
                "to avoid the obstacles. Use Shift\n" +
                "to run forward (but you can't run back).\n" +
                "If you hit the back wall, GG's!",
                instructionsConfig
            ).setOrigin(0.5);
            this.UIsound.play();


            this.add.text(
                game.config.width / 2,
                game.config.height / 2 + 150,
                "Player assets - by erkoudesign on gamedevmarket.net\n" +
                "Cone asset - by EncoderXSolutions on pngtree.com\n" +
                "Sounds - by Letta Corporation on itch.io\n" +
                "Soccerball asset - from Wikipedia",
                creditsConfig
            ).setOrigin(0.5);
        }
    }
}