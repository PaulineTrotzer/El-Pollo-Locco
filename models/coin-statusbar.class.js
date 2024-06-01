class CoinBar extends DrawableObject {
    percentage;
    
    constructor() {
        super();
        this.loadImages(IMAGES_COIN);
        this.x = 35;
        this.y = 50;
        this.width = 200;
        this.height = 60;
        this.setCoinPercentage(0);
    }


    setCoinPercentage(percentage) {
        this.percentage = percentage; // => 0 ....5
        let path = IMAGES_COIN[this.resolveImageIndex()]
        this.img = this.imageCache[path];
    }

    
    resolveImageIndex() {
        if (this.percentage == 0) {
            return 0;
        } else if (this.percentage < 20) {
            return 1;
        } else if (this.percentage < 40) {
            return 2;
        } else if (this.percentage < 60) {
            return 3;
        } else if (this.percentage < 80) {
            return 4;
        } else if (this.percentage <= 100) {
            return 5;
        }
    }
}
