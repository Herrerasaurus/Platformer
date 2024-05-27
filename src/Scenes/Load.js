class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        this.load.setPath("./assets/");
        this.load.bitmapFont('gothic', 'https://labs.phaser.io/assets/fonts/bitmap/gothic.png', 'https://labs.phaser.io/assets/fonts/bitmap/gothic.xml');

        // Load characters spritesheet
        this.load.atlas("platformer_characters", "tilemap-characters-packed.png", "tilemap-characters-packed.json");

        // Load tilemap information
        this.load.image("tilemap_tiles", "tilemap_packed.png");                         // Packed tilemap
        this.load.image("tilemap_tiles_2", "tilemap_packed_2.png");                         // Packed tilemap
        this.load.image("back_tiles", "backgroundCastles.png");                         // Packed tilemap

        this.load.tilemapTiledJSON("platformer-level-1", "platformer-level-1.tmj");   // Tilemap in JSON
        this.load.tilemapTiledJSON("first", "untitled.tmj");

        // Load the tilemap as a spritesheet
        this.load.spritesheet("tilemap_sheet", "tilemap_packed.png", {
            frameWidth: 18,
            frameHeight: 18
        });
        this.load.spritesheet("tilemap_sheet_2", "tilemap_packed_2.png", {
            frameWidth: 18,
            frameHeight: 18
        });

        this.load.audio("special", "confirmation_002.ogg");
        this.load.audio("collecting", "confirmation_003.ogg");
        this.load.audio("impact", "switch_004.ogg");
        this.load.audio("jump", "phaseJump5.ogg");
        this.load.image("background", "backgroundCastles.png");



        // Oooh, fancy. A multi atlas is a texture atlas which has the textures spread
        // across multiple png files, so as to keep their size small for use with
        // lower resource devices (like mobile phones).
        // kenny-particles.json internally has a list of the png files
        // The multiatlas was created using TexturePacker and the Kenny
        // Particle Pack asset pack.
        this.load.multiatlas("kenny-particles", "kenny-particles.json");
    }

    create() {
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNames('platformer_characters', {
                prefix: "tile_",
                start: 0,
                end: 1,
                suffix: ".png",
                zeroPad: 4
            }),
            frameRate: 15,
            repeat: -1
        });

        this.anims.create({
            key: 'idle',
            defaultTextureKey: "platformer_characters",
            frames: [
                { frame: "tile_0000.png" }
            ],
            repeat: -1
        });

        this.anims.create({
            key: 'jump',
            defaultTextureKey: "platformer_characters",
            frames: [
                { frame: "tile_0001.png" }
            ],
        });

        this.anims.create({
            key: 'enemyWalk',
            defaultTextureKey: "platformer_characters",
            frames: [
                {frame: "tile_0024.png"},
                {frame: "tile_0025.png"},
                {frame:  "tile_0026.png"}
            ],
            repeat:-1,
            duration: 500
        });

         // ...and pass to the next Scene
         this.scene.start("titleScene");
    }

    // Never get here since a new scene is started in create()
    update() {
    }
}