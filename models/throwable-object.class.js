class ThrowableObject extends MovableObject {
    speedY = 30;
    flyingBottleInterval;
    isSplashingInterval;
    currentImageIndex = 0;
    offset = {
        top: 80,
        bottom: 80,
        left: 60,
        right: 60
    };
    id;


    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png')
        this.loadImages(BOTTLE_ROTATING);
        this.loadImages(BOTTLE_SPLASH);
        this.x = x;
        this.y = y;
        this.width = 60;
        this.height = 70;
        this.id = this.generateUniqueId();
        this.applyGravity();
        this.throw();
    }



    throw() {
        this.flyingBottleInterval =
            setInterval(() => {
                this.moveBottleForward();
                this.playAnimation(BOTTLE_ROTATING)
            }, 50);
    }


    AnimationisOver() {
        return !this.currentImage % BOTTLE_SPLASH.length;
    }


    isSplashing() {
        this.isSplashingInterval = setInterval(() => {
            this.playAnimation(BOTTLE_SPLASH);
            this.currentImageIndex++;
            if (this.AnimationisOver()) {
                this.stopFlyingBottle();
            }
        }, 48);
    }


    stopFlyingBottle() {
        clearInterval(this.flyingBottleInterval);
    }


    moveBottleForward() {
        this.x += 20;
        if (this.isOnTheGround()) {
            this.bottleOnGroundSplash();
        }
    }


    bottleOnGroundSplash() {
        this.stopGravity();
        this.stopFlyingBottle();
        this.isSplashing();
    }





}
