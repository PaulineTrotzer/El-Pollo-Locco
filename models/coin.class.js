class Coin extends DrawableObject {
    x = 400;
    width = 120;
    height = 100;
    id;
    offset = {
        top: 50,
        bottom: 0,
        left: 30,
        right: 20
    };
    coinPickup_sound = new Audio('audio/coinPickup.mp3');
    offset_displacement_y = 3;
    coinAnimation;



    constructor(startX, startY) {
        super().loadImage('img/8_coin/coin_2.png');
        this.loadImages(ANIMATION_COIN);
        this.id = this.generateUniqueId();
        this.x = this.setRandomX(startX);
        this.y = this.setRandomY(startY);
        this.animateCoins();
    }


    generateUniqueId() {
        return 'coin_' + Math.random().toString(36).substr(2, 9);
    }

    animateCoins() {
       this.coinAnimation =  setInterval(() => {
            this.playAnimation(ANIMATION_COIN);
        }, 380);
    }


    setRandomY(startY) {
        let randomFactor = Math.floor(Math.random() * (5 - 2 + 1)) + 2;
        let randomDisplacement = randomFactor * this.offset_displacement_y + startY;
        this.offset_displacement_y++;
        return randomDisplacement;
    }


    letDisappear(coinArray, coinID) {
        const collidingCoin = this.findCollidingCoin(coinArray, coinID);
        if (collidingCoin !== -1) {
            this.removeFromArray(coinArray, collidingCoin);
        }
    }



    findCollidingCoin(coinArray, coinID) {
        for (let i = 0; i < coinArray.length; i++) {
            if (coinArray[i].id == coinID) {
                console.log('collidingIndex', i);
                return i;
            }
        }
    }


    removeFromArray(coinArray, collidingCoin) {
        if (collidingCoin !== -1) {
            coinArray.splice(collidingCoin, 1);
        }
    }


}
