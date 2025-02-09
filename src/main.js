let config = {
    type: Phaser.AUTO,
    //16:9 aspect ratio
    width: 1280,
    height: 720,
    scale: {
        mode: Phaser.Scale.FIT, // Make sure that the game scales to fit the screen
        autoCenter: Phaser.Scale.CENTER_BOTH, // center the game on the screen
    },
    scene: [Menu, Instructions, Play],
    input: {
        keyboard: true,
    },
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
        }
    },
};

// Reserve keybinds
let keyJump, keyLeft, keyRight, keySlide, keySprint;

// Create the game instance
let game = new Phaser.Game(config);

// Set border sizes using
let borderUISize = game.config.height / 20;
let borderPadding = borderUISize / 3;



