class Cloud extends MovableObject {
    y = 50;
    height = 250;
    width = 500;
    x;
    speed;
    cloudInterval;

    constructor(x, speed) {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = x;
        this.speed = speed;
        this.animate();
    }

    /**
     * animates the movement of a cloud
     */
    animate() {
        setInterval(() => this.moveLeft(), 100);
    }

}