class Title extends Phaser.Scene {
    constructor(){
        super("titleScene");
        this.my = {sprite: {}};


    }

    init(){
        this.count = 0;
        this.events.emit('home');

    }

    create(){
        let my = this.my;
        const background = this.add.image(700, 600,'background').setScale(1.5);

        
        const text = this.add.text(700, 300, 'Cakewalk Canyon', { align: 'center'});
        text.setOrigin(0.5, 0.5);
        //text.setResolution(window.devicePixelRatio);
        text.setFontFamily('Gothic');
        text.setFontStyle('bold');
        text.setFontSize(100);
        text.setColor('#7CB9E8');

        text.preFX.setPadding(32);

        const button = this.add.text(700, 500, 'Play Game', {
            fontFamily: 'Gothic',
            fontSize: '50px',
            color: '#F0F8FF',
            align: 'center',
            backgroundColor: '#7CB9E8'
        }).setPadding(32).setOrigin(0.5);

        button.setInteractive({ useHandCursor: true });

        button.on('pointerover', () => {
            button.setBackgroundColor('#00308F');
        });

        button.on('pointerout', () => {
            button.setBackgroundColor('#7CB9E8');
        });

        button.on('pointerdown', () => {            
            this.scene.start("platformerScene");
        });


    }

    update(){
        let my = this.my;
        
        //movement for screen background
        

    }
}