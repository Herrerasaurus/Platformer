class Platformer extends Phaser.Scene {
    graphics;
    curve;
    path;
    
    constructor() {
        super("platformerScene");        
        this.my = {sprite: {}, text:{}};

    }

    init() {
        // variables and settings
        this.ACCELERATION = 200;
        this.DRAG = 700;    // DRAG < ACCELERATION = icy slide
        this.physics.world.gravity.y = 1500;
        this.JUMP_VELOCITY = -750;
        this.PARTICLE_VELOCITY = 50;
        this.SCALE = 2.0;
        this.count = 0;
        this.check = 0;
        this.jump = 0;
        this.myScore;
        this.lives = 3;
        this.check1 = 0;
        this.check2 = 0;
        this.check3 = 0;
        this.check4 = 0;
        this.check5 = 0;
        this.check6 = 0;
        this.events.emit('restarter');


    }

    create() {
        // Create a new tilemap game object which uses 18x18 pixel tiles, and is
        // 45 tiles wide and 25 tiles tall.
        this.map = this.add.tilemap("first", 18, 18, 120, 50);
        this.physics.world.setBounds(0,0, 120*18, 50*18);

        // Add a tileset to the map
        // First parameter: name we gave the tileset in Tiled
        // Second parameter: key for the tilesheet (from this.load.image in Load.js)
        this.tileset = this.map.addTilesetImage("tilemap_packed", "tilemap_tiles");
        this.tileset_2 = this.map.addTilesetImage("tilemap_packed_2", "tilemap_tiles_2");

        this.backtile = this.map.addTilesetImage("backgroundCastles", "back_tiles");

        // Create a layer
        this.bgLayer = this.map.createLayer("Tile Layer 1", this.backtile, 0, 0).setScrollFactor(0.25)

        this.groundLayer = this.map.createLayer("Tile Layer 2", this.tileset, 0, 0);//.setScrollFactor(0.75);
        this.secondLayer = this.map.createLayer("Tile Layer 3", this.tileset, 0, 0);//.setScrollFactor(0.75);
        this.other = this.map.createLayer("Tile Layer 4", this.tileset_2, 0, 0);

        

        // Make it collidable
        this.groundLayer.setCollisionByProperty({
            collides: true
        });


        this.startTarget = this.map.createFromObjects("Object Layer 1", {
            name: "lever",
            key: "tilemap_sheet_2",
            frame: 64
        });
        // Since createFromObjects returns an array of regular Sprites, we need to convert 
        // them into Arcade Physics sprites (STATIC_BODY, so they don't move) 
        this.physics.world.enable(this.startTarget, Phaser.Physics.Arcade.STATIC_BODY);



        // Create a Phaser group out of the array this.coins
        // This will be used for collision detection below.
        this.stargetGroup = this.add.group(this.startTarget);

                

        // set up player avatar
        my.sprite.player = this.physics.add.sprite(120, 400, "platformer_characters", "tile_0000.png");
        my.sprite.player.setCollideWorldBounds(true);
        my.sprite.player.body.checkCollision.up = false;
        my.sprite.player.body.setMaxSpeed(1000);

        // create enemy
        this.path1 = [
            200, 200,
            200, 400
        ]
        this.path2 = [
            500, 50,
            500, 500
        ]
        this.path3 = [
            800, 100,
            800, 400
        ]
        this.path4 = [
            1100, 100,
            1100, 500
        ]
        this.path5 = [
            1400, 200,
            1400, 400
        ]
        this.path6 = [
            1900, 100,
            1900, 300
        ]
        this.curve = new Phaser.Curves.Spline(this.path1);
        my.sprite.enemy1 = this.add.follower(this.curve, 0, 0, "platformer_characters", "tile_0024.png");
        my.sprite.enemy1.anims.play('enemyWalk');
        my.sprite.enemy1.startFollow({
                    duration: 2000,
                    positionOnPath: true,
                    //delay: temp * 900,
                    yoyo: true,
                    repeat: -1
        
        });
        this.curve2 = new Phaser.Curves.Spline(this.path2);
        my.sprite.enemy2 = this.add.follower(this.curve2, 0, 0, "platformer_characters", "tile_0024.png");
        my.sprite.enemy2.anims.play('enemyWalk');
        my.sprite.enemy2.startFollow({
                    duration: 2500,
                    positionOnPath: true,
                    //delay: temp * 900,
                    yoyo: true,
                    repeat: -1
        
        });
        this.curve3 = new Phaser.Curves.Spline(this.path3);
        my.sprite.enemy3 = this.add.follower(this.curve3, 0, 0, "platformer_characters", "tile_0024.png");
        my.sprite.enemy3.anims.play('enemyWalk');
        my.sprite.enemy3.startFollow({
                    duration: 1500,
                    positionOnPath: true,
                    //delay: temp * 900,
                    yoyo: true,
                    repeat: -1
        
        });
        this.curve4 = new Phaser.Curves.Spline(this.path4);
        my.sprite.enemy4 = this.add.follower(this.curve4, 0, 0, "platformer_characters", "tile_0024.png");
        my.sprite.enemy4.anims.play('enemyWalk');
        my.sprite.enemy4.startFollow({
                    duration: 2000,
                    positionOnPath: true,
                    //delay: temp * 900,
                    yoyo: true,
                    repeat: -1
        
        });
        this.curve5 = new Phaser.Curves.Spline(this.path5);
        my.sprite.enemy5 = this.add.follower(this.curve5, 0, 0, "platformer_characters", "tile_0024.png");
        my.sprite.enemy5.anims.play('enemyWalk');
        my.sprite.enemy5.startFollow({
                    duration: 2500,
                    positionOnPath: true,
                    //delay: temp * 900,
                    yoyo: true,
                    repeat: -1
        
        });
        this.curve6 = new Phaser.Curves.Spline(this.path6);
        my.sprite.enemy6 = this.add.follower(this.curve6, 0, 0, "platformer_characters", "tile_0024.png");
        my.sprite.enemy6.anims.play('enemyWalk');
        my.sprite.enemy6.startFollow({
                    duration: 1500,
                    positionOnPath: true,
                    //delay: temp * 900,
                    yoyo: true,
                    repeat: -1
        
        });


        this.graphics = this.add.graphics();
        this.xImages = [];




        // Enable collision handling
        this.physics.add.collider(my.sprite.player, this.groundLayer);


        this.physics.add.overlap(my.sprite.player, this.stargetGroup, (obj1, obj2) => {
            this.sound.play("special", {
                volume: 1   // Can adjust volume using this, goes from 0 to 1
            });
            obj2.destroy(); // remove coin on overlap
            this.start();
        });       

        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();

        this.rKey = this.input.keyboard.addKey('R');

        // debug key listener (assigned to D key)
        this.input.keyboard.on('keydown-D', () => {
            this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true
            this.physics.world.debugGraphic.clear()
        }, this);

        // movement vfx

        my.vfx.walking = this.add.particles(0, 0, "kenny-particles", {
            frame: ['star_04.png', 'star_01.png', 'star_02.png', 'star_03.png'],
            // TODO: Try: add random: true
            scale: {start: 0.01, end: 0.02},
            maxAliveParticles: 30,
            lifespan: 750,
            gravityY: -10,
            alpha: {start: 1, end: 0.01}, 
        });

        my.vfx.walking.stop();
        
        my.vfx.jumping = this.add.particles(0, 0, "kenny-particles", {
            frame: ['smoke_06.png', 'smoke_07.png', 'smoke_08.png', 'smoke_09.png', 'smoke_10.png'],
            random: true,
            scale: {start: 0.03, end: 0.15},
            //maxAliveParticles: 50,
            lifespan: 1000,
            //gravityY: -10,
            alpha: {start: 1, end: 0.1}, 
        });

        my.vfx.jumping.stop();

        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(my.sprite.player, true, 0.25, 0.25); // (target, [,roundPixels][,lerpX][,lerpY])
        this.cameras.main.setDeadzone(50,50);
        this.cameras.main.setZoom(this.SCALE); 
        
        this.physics.world.TILE_BIAS = 24  // increase to prevent sprite tunneling through tiles

    }

    start() {
        // Create a new tilemap game object which uses 18x18 pixel tiles, and is
        // 45 tiles wide and 25 tiles tall.
        this.map = this.add.tilemap("platformer-level-1", 18, 18, 120, 50);
        this.physics.world.setBounds(0,0, 120*18, 50*18);

        // Add a tileset to the map
        // First parameter: name we gave the tileset in Tiled
        // Second parameter: key for the tilesheet (from this.load.image in Load.js)
        this.tileset = this.map.addTilesetImage("tilemap_packed", "tilemap_tiles");
        this.tileset_2 = this.map.addTilesetImage("tilemap_packed_2", "tilemap_tiles_2");

        this.backtile = this.map.addTilesetImage("backgroundCastles", "back_tiles");

        // Create a layer
        this.bgLayer = this.map.createLayer("Background", this.backtile, 0, 0).setScrollFactor(0.25)

        this.groundLayer = this.map.createLayer("Ground-n-Platform", this.tileset, 0, 0);//.setScrollFactor(0.75);
        this.secondLayer = this.map.createLayer("Trees-n-Decoration", this.tileset, 0, 0);//.setScrollFactor(0.75);
        this.other = this.map.createLayer("Tile Layer 4", this.tileset_2, 0, 0);


        

        // Make it collidable
        this.groundLayer.setCollisionByProperty({
            collides: true
        });


        // Find coins in the "Objects" layer in Phaser
        // Look for them by finding objects with the name "coin"
        // Assign the coin texture from the tilemap_sheet sprite sheet
        // Phaser docs:
        // https://newdocs.phaser.io/docs/3.80.0/focus/Phaser.Tilemaps.Tilemap-createFromObjects

        this.plain = this.map.createFromObjects("Objects", {
            name: "plain",
            key: "tilemap_sheet",
            frame: 13
        });


        this.target = this.map.createFromObjects("Objects", {
            name: "target",
            key: "tilemap_sheet",
            frame: 108
        });
            
        // Since createFromObjects returns an array of regular Sprites, we need to convert 
        // them into Arcade Physics sprites (STATIC_BODY, so they don't move) 
        this.physics.world.enable(this.plain, Phaser.Physics.Arcade.STATIC_BODY);
        this.physics.world.enable(this.target, Phaser.Physics.Arcade.STATIC_BODY);



        // Create a Phaser group out of the array this.coins
        // This will be used for collision detection below.
        this.plainGroup = this.add.group(this.plain);
        this.targetGroup = this.add.group(this.target);

                

        // set up player avatar
        //my.sprite.player = this.physics.add.sprite(120, 400, "platformer_characters", "tile_0000.png");
        my.sprite.player.depth = 100;
        my.sprite.enemy1.depth = 100;
        my.sprite.enemy2.depth = 100;
        my.sprite.enemy3.depth = 100;
        my.sprite.enemy4.depth = 100;
        my.sprite.enemy5.depth = 100;
        my.sprite.enemy6.depth = 100;


        //my.sprite.player.setCollideWorldBounds(true);
        //my.sprite.player.body.checkCollision.up = false;
        //my.sprite.player.body.setMaxSpeed(1000);

        // Enable collision handling
        this.physics.add.collider(my.sprite.player, this.groundLayer);

        // Handle collision detection with coins
        this.physics.add.overlap(my.sprite.player, this.plainGroup, (obj1, obj2) => {
            this.sound.play("collecting", {
                volume: 1   // Can adjust volume using this, goes from 0 to 1
            });
            obj2.destroy(); // remove coin on overlap
            this.events.emit('addScore');

        });
        
        this.physics.add.overlap(my.sprite.player, this.targetGroup, (obj1, obj2) => {
            this.sound.play("special", {
                volume: 1   // Can adjust volume using this, goes from 0 to 1
            });
            obj2.destroy(); // remove coin on overlap
            this.events.emit('addScoreExtra');
            this.sprinkle = this.map.createFromObjects("Objects", {
                name: "sprinkle",
                key: "tilemap_sheet",
                frame: 14
            });
            this.physics.world.enable(this.sprinkle, Phaser.Physics.Arcade.STATIC_BODY);
            this.sprinkleGroup = this.add.group(this.sprinkle);


            this.physics.add.overlap(my.sprite.player, this.sprinkleGroup, (obj1, obj2) => {
                this.sound.play("special", {
                    volume: 1   // Can adjust volume using this, goes from 0 to 1
                });
                obj2.destroy(); // remove coin on overlap
                this.endTransition();
            }); 
        }); 
             

    }


    endTransition(){
        this.events.emit('ender');

        this.scene.start("endScene", {score: 0});
    }
    collides(a, b) {
        if (Math.abs(a.x - b.x) > (a.displayWidth/2 + b.displayWidth/2)) return false;
        if (Math.abs(a.y - b.y) > (a.displayHeight/2 + b.displayHeight/2)) return false;
        return true;
    }

    update() {

        
        if(cursors.left.isDown) {
            my.sprite.player.setAccelerationX(-this.ACCELERATION);
            my.sprite.player.resetFlip();
            my.sprite.player.anims.play('walk', true);
            
            my.vfx.walking.startFollow(my.sprite.player, my.sprite.player.displayWidth/2-10, my.sprite.player.displayHeight/2-5, false);

            my.vfx.walking.setParticleSpeed(this.PARTICLE_VELOCITY, 0);

            // Only play smoke effect if touching the ground

            if (my.sprite.player.body.blocked.down) {
                my.vfx.walking.start();
                this.jump = 0;

            }

        } else if(cursors.right.isDown) {
            my.sprite.player.setAccelerationX(this.ACCELERATION);
            my.sprite.player.setFlip(true, false);
            my.sprite.player.anims.play('walk', true);
            // TODO: add particle following code here
            my.vfx.walking.startFollow(my.sprite.player, my.sprite.player.displayWidth/2-15, my.sprite.player.displayHeight/2-5, false);

            my.vfx.walking.setParticleSpeed(-this.PARTICLE_VELOCITY, 0);

            // Only play smoke effect if touching the ground

            if (my.sprite.player.body.blocked.down) {
                my.vfx.walking.start();
                this.jump = 0;

            }

        } else {
            // Set acceleration to 0 and have DRAG take over
            my.sprite.player.setAccelerationX(0);
            my.sprite.player.setDragX(this.DRAG);
            my.sprite.player.anims.play('idle');
            
            my.vfx.walking.stop();
        }

        // player jump
        // note that we need body.blocked rather than body.touching b/c the former applies to tilemap tiles and the latter to the "ground"
        if(!my.sprite.player.body.blocked.down) {
            my.sprite.player.anims.play('jump');
            my.vfx.jumping.stop();            
        }
        if((my.sprite.player.body.blocked.down && Phaser.Input.Keyboard.JustDown(cursors.up)) || (this.jump == 1 && Phaser.Input.Keyboard.JustDown(cursors.up))) {
            this.jump += 1;
            this.sound.play("jump", {
                volume: 1   // Can adjust volume using this, goes from 0 to 1
            });
            
            my.sprite.player.body.setVelocityY(this.JUMP_VELOCITY);
            my.vfx.jumping.startFollow(my.sprite.player, my.sprite.player.displayWidth/2, my.sprite.player.displayHeight/2, false);

            my.vfx.jumping.setParticleSpeed(-this.PARTICLE_VELOCITY, 0);

            // Only play smoke effect if touching the ground

            if (my.sprite.player.body.blocked.down) {

                my.vfx.jumping.start();

            }
        }

        
       


        if(Phaser.Input.Keyboard.JustDown(this.rKey)) {
            this.scene.restart();
        }
        if(my.sprite.player.y >= 860){
            this.ACCELERATION = 0;
            my.sprite.player.setAccelerationX(this.ACCELERATION);
            this.sound.play("impact", {
                volume: 1   // Can adjust volume using this, goes from 0 to 1
            });
            my.sprite.player.x = 120;
            my.sprite.player.y = 400;
            this.check = 1;
            this.lives -=1;
            this.events.emit('livesTracker');
        }
        if(this.check == 1){
            console.log(this.check);
            this.count +=1;
            if(this.count >= 50){
                this.check = 0;
                this.count = 0;
                this.ACCELERATION = 400;
            }
        }
        if(this.lives == 0){
            this.events.emit('ender');

            this.scene.start("endScene", {score: 1});
        }

        //check collisions with enemy
        if(this.collides(my.sprite.enemy1, my.sprite.player) &&  this.check1 == 0){
            this.check1 = 1;
            this.sound.play("impact", {
                volume: 1   // Can adjust volume using this, goes from 0 to 1
            });
            
            my.sprite.enemy1.visible = false;
            my.sprite.enemy1.x = -100;
            my.sprite.enemy1.stopFollow();
            this.lives -=1;
            this.events.emit('livesTracker');
            my.sprite.player.x = 120;
            my.sprite.player.y = 400;
        }
        if(this.collides(my.sprite.enemy2, my.sprite.player) &&  this.check2 == 0){
            this.check2 = 1;
            this.sound.play("impact", {
                volume: 1   // Can adjust volume using this, goes from 0 to 1
            });
            my.sprite.enemy2.visible = false;
            my.sprite.enemy2.x = -100;
            my.sprite.enemy2.stopFollow();
            this.lives -=1;
            this.events.emit('livesTracker');
            my.sprite.player.x = 120;
            my.sprite.player.y = 400;
        }
        if(this.collides(my.sprite.enemy3, my.sprite.player) &&  this.check3 == 0){
            this.check3 = 1;
            this.sound.play("impact", {
                volume: 1   // Can adjust volume using this, goes from 0 to 1
            });
            my.sprite.enemy3.visible = false;
            my.sprite.enemy3.x = -100;
            my.sprite.enemy3.stopFollow();
            this.lives -=1;
            this.events.emit('livesTracker');
            my.sprite.player.x = 120;
            my.sprite.player.y = 400;
        }
        if(this.collides(my.sprite.enemy4, my.sprite.player) &&  this.check4 == 0){
            this.check4 = 1;
            this.sound.play("impact", {
                volume: 1   // Can adjust volume using this, goes from 0 to 1
            });
            my.sprite.enemy4.visible = false;
            my.sprite.enemy4.x = -100;
            my.sprite.enemy4.stopFollow();
            this.lives -=1;
            this.events.emit('livesTracker');
            my.sprite.player.x = 120;
            my.sprite.player.y = 400;
        }
        if(this.collides(my.sprite.enemy5, my.sprite.player) &&  this.check5 == 0){
            this.check5 = 1;
            this.sound.play("impact", {
                volume: 1   // Can adjust volume using this, goes from 0 to 1
            });
            my.sprite.enemy5.visible = false;
            my.sprite.enemy5.x = -100;
            my.sprite.enemy5.stopFollow();
            this.lives -=1;
            this.events.emit('livesTracker');
            my.sprite.player.x = 120;
            my.sprite.player.y = 400;
        }
        if(this.collides(my.sprite.enemy6, my.sprite.player) &&  this.check6 == 0){
            this.check6 = 1;
            this.sound.play("impact", {
                volume: 1   // Can adjust volume using this, goes from 0 to 1
            });
            my.sprite.enemy6.visible = false;
            my.sprite.enemy6.x = -100;
            my.sprite.enemy6.stopFollow();
            this.lives -=1;
            this.events.emit('livesTracker');
            my.sprite.player.x = 120;
            my.sprite.player.y = 400;
        }
    }
}