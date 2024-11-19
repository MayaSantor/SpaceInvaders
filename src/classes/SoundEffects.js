class SoundEffects {
    constructor() {
        this.shootSounds = [
            new Audio("src/assets/audios/src_assets_audios_shoot.mp3"),
            new Audio("src/assets/audios/src_assets_audios_shoot.mp3"),
            new Audio("src/assets/audios/src_assets_audios_shoot.mp3"),
            new Audio("src/assets/audios/src_assets_audios_shoot.mp3"),
            new Audio("src/assets/audios/src_assets_audios_shoot.mp3"),
        ]       

        this.hitSounds = [
            new Audio("src/assets/audios/src_assets_audios_hit.mp3"),
            new Audio("src/assets/audios/src_assets_audios_hit.mp3"),
            new Audio("src/assets/audios/src_assets_audios_hit.mp3"),
            new Audio("src/assets/audios/src_assets_audios_hit.mp3"),
            new Audio("src/assets/audios/src_assets_audios_hit.mp3"),
        ]         

        this.explosionSounds = new Audio("src/assets/audios/src_assets_audios_explosion.mp3")
        this.nextLevelSounds = new Audio("src/assets/audios/src_assets_audios_next_level.mp3")

        this.currentShootSound = 0
        this.currentHitSound = 0

        this.adjustVolumes()
    }

    playShootSound () {
        this.shootSounds [this.currentHitSound].currentTime = 0
        this.shootSounds [this.currentHitSound].play()
        this.currentShootSound = (this.currentShootSound + 1) % this.shootSounds.length
    }

    playHitSound () {
        this.hitSounds [this.hitSounds].currentTime = 0
        this.hitSounds [this.currentHitSound].play()
        this.currentHitSound = (this.currentHitSound + 1) % this.currentHitSound.length
    }

    playExplosionSound () {
        this.explosionSounds.play()
    }

    playNextLevelSound () {
        this.nextLevelSounds.play()
    }

    adjustVolumes () {
        this.hitSounds.forEach(sound => (sound.volume = 0.2))
        this.shootSounds.forEach(sound => (sound.volume = 0.5))
        this.explosionSounds.volume = 0.2
        this.nextLevelSounds.volume = 0.4
    }
}

export default SoundEffects