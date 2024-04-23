import { GameScene } from "@/scenes/GameScene";
import { RuleCard } from "./RuleCard";
import { Music } from "./Music";

export class DJ extends Phaser.GameObjects.Container {
	public scene: GameScene;

	private volume: number;

	private drums: Music;
	private bass: Music;
	private battery: Music;
	private chip: Music;
	private chords: Music;
	private riff: Music;
	private melody: Music;

	constructor(scene: GameScene) {
		super(scene, 0, 0);
		scene.add.existing(this);
		this.scene = scene;

		this.volume = 0.5;

		this.drums = new Music(scene, "track_drums", { volume: 0 });
		this.bass = new Music(scene, "track_bass", { volume: 0 });
		this.battery = new Music(scene, "track_battery", { volume: 0 });
		this.chip = new Music(scene, "track_chip", { volume: 0 });
		this.chords = new Music(scene, "track_chords", { volume: 0 });
		this.riff = new Music(scene, "track_riff", { volume: 0 });
		this.melody = new Music(scene, "track_melody", { volume: 0 });

		this.drums.play();
		this.bass.play();
		this.battery.play();
		this.chip.play();
		this.chords.play();
		this.riff.play();
		this.melody.play();

		this.drums.setVolume(this.volume);
		this.chip.setVolume(this.volume);

		// Sync loops
		this.drums.on("loop", this.sync, this);
		this.scene.addEvent(500, this.sync, this);
	}

	update(time: number, delta: number) {
		this.drums.update();
		this.bass.update();
		this.battery.update();
		this.chip.update();
		this.chords.update();
		this.riff.update();
		this.melody.update();
	}

	setMoodStartLevel() {
		this.toggle(this.bass, true);
	}

	setMoodPlanning() {
		this.toggle(this.chords, false);
		this.toggle(this.chip, true);
		this.toggle(this.riff, true);
	}

	setMoodMovement() {
		this.toggle(this.chords, true);
		this.toggle(this.chip, true);
		this.toggle(this.riff, false);

		// this.toggle(this.bass, true);
	}

	setMoodPower(power: number) {
		if (power > 0) {
			let factor = 1 - (power - 1) / 9;
			this.battery.setVolume(factor * this.volume);
		} else {
			this.battery.setVolume(0);
		}
		this.toggle(this.drums, power > 0);
	}

	toggle(track: Music, active: boolean) {
		this.scene.tweens.addCounter({
			from: track.volume,
			to: active ? this.volume : 0,
			duration: 350,
			ease: Phaser.Math.Easing.Sine.InOut,
			onUpdate: (tween, target, key, current: number) => {
				track.setVolume(current);
			},
		});
	}

	sync() {
		let seek = this.drums.seek;
		this.bass.setSeek(seek);
		this.battery.setSeek(seek);
		this.chip.setSeek(seek);
		this.chords.setSeek(seek);
		this.riff.setSeek(seek);
		this.melody.setSeek(seek);
	}

	get barTime(): number {
		return this.drums.barTime;
	}
}
