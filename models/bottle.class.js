class Bottle extends DrawableObject {
    y = 355;
    width = 60;
    height = 70;
    id;
    offset = {
        top: 0,
        bottom: 0,
        left: 30,
        right: 20
    };
    animationOfBottles;

    constructor(startX) {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(ANIMATION_BOTTLE);
        this.id = this.generateUniqueId();
        this.x = this.setRandomX(startX);
        this.animateBottles();
    }

    animateBottles() {
      this.animationOfBottles =  setInterval(() => {
            this.playAnimation(ANIMATION_BOTTLE);
        }, 380);
    }
}