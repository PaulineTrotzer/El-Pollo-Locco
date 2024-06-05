class endbossHealthBar extends DrawableObject {
    constructor() {
       
        super().loadImages(ENDBOSS_HEALTH_BAR);
        this.x = 550;
        this.y = 58;
        this.width = 200;
        this.height = 60;
        this.setHealthPercentage(100);
    }


     /**
      * Receives the current value of health points, and displays the corresponding image via image cache.
      * @param {number} percentage - amount of health points as percentage
      */
    setHealthPercentage(percentage) {
        this.percentage = percentage; // => 0 ....5
        let path = ENDBOSS_HEALTH_BAR[this.resolveImageIndex()]
        this.img = this.imageCache[path];
    }



    /**
     * this function determines the index of an image based on the current percentage
     * @returns - index of array (ENDBOSS_HEALTH_BAR)
     */
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