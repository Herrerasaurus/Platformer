class End extends Phaser.Scene{
    constructor(){
        super("endScene");
        this.my = {sprite: {}};
    }
    init(data){
        this.count = 0;
        this.my.sprite.clouds = [];
        this.check = data.score;
    }
    
    create(){
        let my = this.my;
        const background = this.add.image(700, 600,'background').setScale(1.5);
        const text = this.add.text(700, 300, 'Game over', { align: 'center'});;
        if(this.check == 0){
            text.setText('Sprinkle Doughnut Collected!');
            text.setFontSize(80);

        }else{
            text.setFontSize(128);

        }

        text.setOrigin(0.5, 0.5);
        text.setFontFamily('Gothic');
        text.setFontStyle('bold');
        text.setColor('#7CB9E8');

        const button = this.add.text(700, 700, 'Play Again', {
            fontFamily: 'Gothic',
            fontSize: '30px',
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
            this.scene.restart(); 
            
            this.scene.start("platformerScene");
        });
    }

    update(){

    }

}