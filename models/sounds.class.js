class Sounds {

    constructor() {
        this.allSounds = [
            this.background_music = new Audio('audio/background-music.mp3'),
            this.letsPlay_sound = new Audio('audio/lets-go.mp3'),
            this.bottlePickup_sound = new Audio('audio/bottle-click.mp3'),
            this.snoring_sound = new Audio('audio/male-snore.mp3'),
            this.walking_sound = new Audio('audio/oneStep.mp3'),
            this.jumping_sound = new Audio('audio/jump.mp3'),
            this.isHurt_sound = new Audio('audio/male-hurt.mp3'),
            this.characterKilled = new Audio('audio/character-killed.mp3'),
            this.playerLost = new Audio('audio/you-lost.mp3'),
            this.bigChickKilled = new Audio('audio/big-Chicken-dies.mp3'),
            this.coinPickup_sound = new Audio('audio/coinPickup.mp3'),
            this.introScreaming = new Audio('audio/endboss-screaming.mp3'),
            this.flappingWings = new Audio('audio/wing-flappings.mp3'),
            this.endbossCrying = new Audio('audio/endboss-scream.mp3'),
            this.endbosswasKilled = new Audio('audio/killed-endboss.mp3'),
            this.playerWins = new Audio('audio/you-win.mp3'),
            this.lilChickKilled = new Audio('audio/chicken-dies.mp3')
        ];
        this.settingSoundQuality();
    }


    /**
     *  plays a sound if the variable audioMute is not active; otherwise the sound is paused.
     * @param {audioElement} sound 
     */
    playSound(sound) {
        if (!audioMute) {
            sound.play();
        } else {
            sound.pause();
        }
    }


    /**
     * adjusts some presets to improve audio quality
     */
    settingSoundQuality() {
        this.background_music.loop = true;
        this.setVolume(this.background_music, 0.1);
        this.setVolume(this.jumping_sound, 0.25);
        this.backgroundMusicRate(this.background_music, 1.1);
    }


    /**
     * adjusts the volume for the audio element
     * @param {audioElement} sound 
     * @param {float} percent 
     */
    setVolume(sound, percent) {
        if (sound) {
            sound.volume = percent;
        }
    }


    /**
     * changes the playback speed of an audio sound
     * @param {audioElement} sound 
     * @param {float} num 
     */
    backgroundMusicRate(sound, num) {
        if (sound) {
            sound.playbackRate = num;
        }
    }
}


