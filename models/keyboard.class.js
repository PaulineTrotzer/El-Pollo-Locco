class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    KEYBOARDPRESSED = false;
    D = false;
    stopInput;


    constructor() {
        this.bindKeyPressEvents();
        this.bindBtnPressEvents();
        this.stopInput = false;
    }


    /**
     * this function links the touch and mouse events of the controls (btn-left, btn-right,...) with the corresponding actions (LEFT, RIGHT, ..) of the Keyboard class, 
     * ensuring the actions are only executed if stopInput is not set.
     */
    bindBtnPressEvents() {
        const buttons = [
            { id: 'btn-left', action: 'LEFT' },
            { id: 'btn-right', action: 'RIGHT' },
            { id: 'btn-jump', action: 'SPACE' },
            { id: 'btn-throw', action: 'D' }
        ];
        buttons.forEach(button => {
            const element = document.getElementById(button.id);
            if (element) {
                ['touchstart', 'mousedown'].forEach(event => {
                    element.addEventListener(event, (e) => {
                        e.preventDefault();
                        if (!this.stopInput) {
                            this[button.action] = true;
                        }
                    });
                });
                ['touchend', 'mouseup'].forEach(event => {
                    element.addEventListener(event, (e) => {
                        e.preventDefault();
                        if (!this.stopInput) {
                            this[button.action] = false;
                        }
                    });
                });
            }
        });
    }


    /**
     * This function adds event listeners for keydown and keyup events to the window to update state variables (SPACE, LEFT, UP, etc.) based on the pressed and released keys (space, arrow keys, etc.) if stopInput is not active.
     */
    bindKeyPressEvents() {
        window.addEventListener('keydown', (e) => {
            if (!this.stopInput) {
                if (e.keyCode == 32) {
                    this.SPACE = true;
                }
                if (e.keyCode == 37) {
                    this.LEFT = true;
                }
                if (e.keyCode == 38) {
                    this.UP = true;
                }
                if (e.keyCode == 39) {
                    this.RIGHT = true;
                }
                if (e.keyCode == 40) {
                    this.DOWN = true;
                }
                if (e.keyCode == 68) {
                    this.D = true;
                }
            }
        });

        window.addEventListener('keyup', (e) => {
            if (e.keyCode == 32) {
                this.SPACE = false;
            }
            if (e.keyCode == 37) {
                this.LEFT = false;
            }
            if (e.keyCode == 38) {
                this.UP = false;
            }
            if (e.keyCode == 39) {
                this.RIGHT = false;
            }
            if (e.keyCode == 40) {
                this.DOWN = false;
            }
            if (e.keyCode == 68) {
                this.D = false;
            }
        });
    }

    
    /**
     * this function disables an input-lock (keyboard-action possible) by using a "startCharacter" event.
     */
    letCharacterStart() {
        this.stopInput = false;
        document.dispatchEvent(new CustomEvent('startCharacter'));
    }


    /**
     *  this function enables an input-lock (no keyboard-action possible) by using a "stopCharacter" event.
     */
    letCharacterStop() {
        this.stopInput = true;
        document.dispatchEvent(new CustomEvent('stopCharacter'));
    }

}