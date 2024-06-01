class endbossHealthBar extends DrawableObject {
    constructor() {
        super().loadImages(ENDBOSS_HEALTH_BAR);
        this.x = 550;
        this.y = 58;
        this.width = 200;
        this.height = 60;
        this.setHealthPercentage(100);
    }

    setHealthPercentage(percentage) {
        this.percentage = percentage; // => 0 ....5
        let path = ENDBOSS_HEALTH_BAR[this.resolveImageIndex()]
        this.img = this.imageCache[path];
    }


    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else if (this.percentage >= 0) {
            return 0;
        }
    }

}