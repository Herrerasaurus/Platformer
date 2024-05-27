class Score extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'scoreSceme', active: true });

        
    }
    init(){
        this.score = 0;
        this.lives = 3;
        this.end = 0;
    }

    create ()
    {
        //  Our Text object to display the Score
        const score = this.add.text(200, 10, 'Score: 0', { font: '48px Arial', fill: '#000000' });
        const health = this.add.text(10, 10, 'Lives: 3', { font: '48px Arial', fill: '#000000' });
        const other = this.add.text(600, 400, "", { font: '48px Arial', fill: '#7CB9E8' });
        //  Grab a reference to the Game Scene
        const ourGame = this.scene.get('platformerScene');
        const homeGame = this.scene.get('titleScene');


        //  Listen for events from it
        ourGame.events.on('addScore', function ()
        {
            this.score += 5;
            score.setText(`Score: ${this.score}`);

        }, this);
        ourGame.events.on('addScoreExtra', function ()
        {
            this.score += 10;
            score.setText(`Score: ${this.score}`);

        }, this);
        ourGame.events.on('livesTracker', function ()
        {
            this.lives -= 1;
            health.setText(`Lives: ${this.lives}`);

        }, this);
        ourGame.events.on('restarter', function ()
        {
            this.score = 0;
            this.lives = 3;
            health.setText(`Lives: ${this.lives}`);
            score.setText(`Score: ${this.score}`);
            other.setText("");



        }, this);
        homeGame.events.on('home', function ()
        {
            health.setText("");
            score.setText("");
            other.setText("");

        }, this);
        ourGame.events.on('ender', function ()
        {
            score.setText("");
            health.setText("");
            other.setText(`Score: ${this.score}`);


        }, this);
    }
}