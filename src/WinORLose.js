class WinORLose extends Phaser.Scene{
	constructor(){
		super({ key: "WinORLose" });
	}
	preload(){
		//carregar imagens
		this.load.image('titulo','assets/Titulo.png');
		this.load.image('btBL','assets/Button11.png');
		
		//carregar audio
		this.load.audio("AudVict", "assets/AudVict.ogg");
		this.load.audio("AudLose", "assets/AudLose.ogg");
		this.load.audio("audbtnPress", "assets/btnpress.ogg");
		this.load.audio("audbtnOver", "assets/btnover.ogg");
	}
	create(){
		//definir audio
		this.sfx = {
			AudVict: this.sound.add("AudVict"),
			AudLose: this.sound.add("AudLose"),
			btnOver: this.sound.add("audbtnOver"),
			btnPress: this.sound.add("audbtnPress")
		};
		
		//criacao do titulo e audio definindo o fim de jogo
		var WLt = this.add.image(game.config.width * 0.5, 200, "titulo").setOrigin(0.5,0.5).setScale(2,2);
		if(WL == "VITÓRIA!"){
			var WLtxt = this.add.text(game.config.width * 0.5, 200, WL, {
				fontFamily: 'monospace',
				fontSize: 35,
				fontStyle: 'bold',
				color: '#39FF14'
			}).setOrigin(0.5,0.5);
			this.sfx.AudVict.play();
		}
		else{
			var WLtxt = this.add.text(game.config.width * 0.5, 200, WL, {
				fontFamily: 'monospace',
				fontSize: 35,
				fontStyle: 'bold',
				color: '#ff0000'
			}).setOrigin(0.5,0.5);
			this.sfx.AudLose.play();
		}
		
		//criacao do botao RESTART
		this.btnRestart = this.add.sprite(
			game.config.width * 0.5,
			game.config.height * 0.5,
			"btBL"
		).setOrigin(0.5,0.5).setScale(2,2);
		var txtRestart = this.add.text(game.config.width * 0.5, game.config.height * 0.5, 'MENU PRINCIPAL', {
			fontFamily: 'monospace',
			fontSize: 27,
			fontStyle: 'bold',
			color: '#ffffff'
		}).setOrigin(0.5,0.5);
		
		this.btnRestart.setInteractive();
		
		//comportamento do botao RESTART
		this.btnRestart.on("pointerover", function() {
			this.btnRestart.setScale(2.1,2.1);
			txtRestart.setScale(1.1,1.1);
			this.sfx.btnOver.play();
		}, this);
		this.btnRestart.on("pointerout", function() {
			this.setScale(2,2);
			txtRestart.setScale(1,1);
		});
		this.btnRestart.once("pointerdown", function() {
			this.btnRestart.setScale(2,2);
			txtRestart.setScale(1,1);
			this.sfx.btnPress.play();
			if(this.sfx.AudVict.isPlaying){
				this.sfx.AudVict.stop();
			}
			else{
				this.sfx.AudLose.stop();
			}
		}, this);
		this.btnRestart.once("pointerup", function() {
			this.btnRestart.setScale(2.1,2.1);
			txtRestart.setScale(1.1,1.1);
			this.scene.start("Menu");
		}, this);
	}
	update(){
		
	}
}