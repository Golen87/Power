import { Image, SpriteSheet, Audio } from "./util";
import { image, sound, music, loadFont, spritesheet } from "./util";

/* Images */
const images: Image[] = [
	// Titlescreen
	image("titlescreen/sky", "title_sky"),
	image("titlescreen/background", "title_background"),
	image("titlescreen/foreground", "title_foreground"),
	image("titlescreen/character", "title_character"),

	// Robot
	image("robot/eyes_shock", "robot_eyes_shock"),
	image("robot/wheels_1", "robot_wheels_1"),
	image("robot/eyes_up", "robot_eyes_up"),
	image("robot/eyes_right", "robot_eyes_right"),
	image("robot/eyes_closed", "robot_eyes_closed"),
	image("robot/wheels_2", "robot_wheels_2"),
	image("robot/eyes_forward", "robot_eyes_forward"),
	image("robot/eyes_left", "robot_eyes_left"),
	image("robot/eyes_error", "robot_eyes_error"),
	image("robot/eyes_low", "robot_eyes_low"),
	image("robot/eyes_down", "robot_eyes_down"),
	image("robot/head", "robot_head"),

	// Room
	image("room/outside", "outside"),
	image("room/floor", "floor"),
	image("room/decoration/sink", "deco_sink"),
	image("room/decoration/plant", "deco_plant"),
	image("room/decoration/box", "deco_box"),
	image("room/walls", "walls"),
	image("room/walls2", "walls2"),

	// Cards
	image("cards/card", "card"),
	image("cards/rule", "rule"),
	image("cards/move_forward", "move_forward"),
	image("cards/turn_around", "turn_around"),
	image("cards/turn_left", "turn_left"),
	image("cards/move_forward_2", "move_forward_2"),
	image("cards/turn_right", "turn_right"),
	image("cards/rule_turn_left", "rule_turn_left"),
	image("cards/move_forward_3", "move_forward_3"),
	image("cards/move_backward", "move_backward"),

	// UI
	image("ui/battery", "battery"),
	image("ui/battery_power", "battery_power"),
];

/* Spritesheets */
const spritesheets: SpriteSheet[] = [];

/* Audios */
const audios: Audio[] = [
	music("bass_melody", "track_bass_melody"),
	music("battery", "track_battery"),
	music("chip", "track_chip"),
	music("chords", "track_chords"),
	music("drums", "track_drums"),
	music("riff", "track_riff"),

	music("title", "m_main_menu"),
	music("first", "m_first"),
	sound("tree/rustle", "t_rustle", 0.5),
];

/* Fonts */
await loadFont("DynaPuff-Medium", "Game Font");

export { images, spritesheets, audios };
