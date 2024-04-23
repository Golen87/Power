import { BaseScene } from "@/scenes/BaseScene";
import { Player } from "@/components/Player";
import { UI } from "@/components/UI";
import { DJ } from "@/components/DJ";
import { Grid } from "@/components/Grid";
import { Deck } from "@/components/Deck";
import { Color } from "@/assets/colors";
import { Level, level1, level2 } from "@/components/levels";

export class GameScene extends BaseScene {
	private background: Phaser.GameObjects.Image;
	private grid: Grid;
	private player: Player;
	private deck: Deck;
	private ui: UI;
	private dj: DJ;

	constructor() {
		super({ key: "GameScene" });
	}

	create(): void {
		this.fade(false, 200, 0x000000);
		this.cameras.main.setBackgroundColor(Color.Slate100);

		// this.background = this.add.image(0, 0, "background");
		// this.background.setOrigin(0);
		// this.fitToScreen(this.background);

		this.grid = new Grid(this, this.CX, 400, 480);
		this.player = new Player(this);
		this.deck = new Deck(this);
		this.ui = new UI(this);
		this.dj = new DJ(this);

		this.deck.setDepth(2000);
		this.deck.on("newRound", this.newRound, this);
		this.deck.on("action", this.performAction, this);

		this.startLevel(level2);
	}

	update(time: number, delta: number) {
		this.grid.update(time, delta);
		this.player.update(time, delta);
		this.deck.update(time, delta);
		this.dj.update(time, delta);
		this.ui.update(time, delta);

		this.ui.setBatteryBlink(this.dj.barTime, this.player.power);
	}

	startLevel(level: Level) {
		this.grid.startLevel(level);

		const cx = level.player.x;
		const cy = level.player.y;
		this.player.setCell(cx, cy);
		this.grid.clean(cx, cy);

		let pos = this.grid.getPosition(cx, cy);
		this.player.setPosition(pos.x, pos.y);

		let size = (this.grid.cellWidth + this.grid.cellHeight) / 2;
		this.player.setCellSize(size);

		this.player.angle = level.player.angle;

		this.deck.startLevel(level);

		this.player.setPower(level.power);
		this.ui.setPower(this.player.power);

		this.dj.setMoodStartLevel();
	}

	performAction(action: string) {
		let { dx, dy } = this.player.getFacing();

		switch (action) {
			case "move_forward":
			case "move_forward_2":
			case "move_forward_3":
				let nextX = this.player.cell.x + dx;
				let nextY = this.player.cell.y + dy;
				if (this.grid.isAvailable(nextX, nextY)) {
					this.player.cell.x = nextX;
					this.player.cell.y = nextY;
					this.player.move(
						this.player.x + dx * this.grid.cellWidth,
						this.player.y + dy * this.grid.cellHeight,
						true
					);

					this.addEvent(500, () => {
						this.grid.clean(nextX, nextY);
					});
				} else {
					this.deck.failMove();
					this.player.bump(
						this.player.x + 0.25 * dx * this.grid.cellWidth,
						this.player.y + 0.25 * dy * this.grid.cellHeight,
						true
					);
				}
				break;

			case "move_backward":
				dx *= -1;
				dy *= -1;
				let prevX = this.player.cell.x + dx;
				let prevY = this.player.cell.y + dy;
				if (this.grid.isAvailable(prevX, prevY)) {
					this.player.cell.x = prevX;
					this.player.cell.y = prevY;
					this.player.move(
						this.player.x + dx * this.grid.cellWidth,
						this.player.y + dy * this.grid.cellHeight,
						false
					);

					this.addEvent(500, () => {
						this.grid.clean(prevX, prevY);
					});
				} else {
					this.deck.failMove();
					this.player.bump(
						this.player.x + 0.25 * dx * this.grid.cellWidth,
						this.player.y + 0.25 * dy * this.grid.cellHeight,
						false
					);
				}
				break;

			case "turn_left":
				this.player.rotate(-90);
				break;

			case "turn_right":
				this.player.rotate(90);
				break;

			case "turn_around":
				this.player.rotate(180);
				break;
		}

		this.dj.setMoodMovement();
	}

	newRound() {
		this.player.drain();
		this.ui.setPower(this.player.power);

		this.dj.setMoodPlanning();
		this.dj.setMoodPower(this.player.power);
	}
}