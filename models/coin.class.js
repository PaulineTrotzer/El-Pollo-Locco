class Coin extends DrawableObject {
    width = 120;
    height = 100;
    id;
    offset = {
        top: 0,
        bottom: 70,
        left: 30,
        right: 20
    };
    coinPickup_sound = new Audio('audio/coinPickup.mp3');
    offset_displacement_y = 3;


    constructor(startX, startY) {
        super().loadImage('img/8_coin/coin_2.png');
        this.loadImages(ANIMATION_COIN);
        this.id = this.generateUniqueId();
        this.x = this.setRandomX(startX);
        this.y = this.setRandomY(startY);
        this.animateCoins();
    }


    /**
     * determines a randomly generated y-coordinate
     * @param {integer} startY 
     * @returns - new y-coordinate
     */
    setRandomY(startY) {
        let randomFactor = Math.floor(Math.random() * (5 - 2 + 1)) + 2;
        let randomDisplacement = randomFactor * this.offset_displacement_y + startY;
        this.offset_displacement_y++;
        return randomDisplacement;
    }


    /**
     * animates one coin
     */
    animateCoins() {
        setInterval(() => this.playAnimation(ANIMATION_COIN), 380);
    }

}
