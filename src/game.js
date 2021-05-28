var config = {
	//configuracao do jogo
	type: Phaser.AUTO,
	width: 1024,
	height: 600,
	scale:{
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH
	},
	backgroundColor: 0x000000,
	scene: [
		Menu,
		Main,
		WinORLose
	]
};
//definicao das variaveis globais
var grid = 0;
var WL = null;
//criacao do jogo
var game = new Phaser.Game(config)