class BottleBar extends DrawableObject {

    constructor() {
        super();
        this.loadImages(IMAGES_BOTTLE);
        this.x = 35;
        this.y = 105;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    }


    /**
     * Receives the current value of the number of bottles, and displays the corresponding image via image cache.
     * @param {number} percentage - amount of Bottles as percentag
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = IMAGES_BOTTLE[this.resolveImageIndex()]
        this.img = this.imageCache[path];
    }


    /**
     * this function determines the index of an image based on the current percentage
     * @returns - index of array (IMAGES_BOTTLE)
     */
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