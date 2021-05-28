class Menu extends Phaser.Scene{
	constructor() {
		super({ key: "Menu" });
	}
	preload(){
		//carregar imagens
		this.load.image('btBL','assets/Button11.png');
		this.load.image('btB','assets/Button09.png');
		//carregar audio
		this.load.audio("audbtnPress", "assets/btnpress.ogg");
		this.load.audio("audbtnOver", "assets/btnover.ogg");
		this.load.audio("MenuAud", "assets/MenuAud.mp3");
	}
	create(){
		//definir audio
		this.sfx = {
			MenuAud: this.sound.add("MenuAud"),
			btnOver: this.sound.add("audbtnOver"),
			btnPress: this.sound.add("audbtnPress")
		};
		this.sfx.MenuAud.loop = true;
		this.sfx.MenuAud.play();
		
		this.title = this.add.text(game.config.width * 0.5, 200, "ARMADA", {
			fontFamily: 'monospace',
			fontSize: 100,
			fontStyle: 'bold',
			color: '#ffffff'
		}).setOrigin(0.5,0.5);
		
		//criar botoes
		this.btnStart = this.add.sprite(
			game.config.width * 0.5,
			game.config.height * 0.5,
			"btBL"
		).setOrigin(0.5,0.5).setScale(2,2);
		var txtStart = this.add.text(game.config.width * 0.5, game.config.height * 0.5, 'JOGAR', {
			fontFamily: 'monospace',
			fontSize: 35,
			fontStyle: 'bold',
			color: '#ffffff'
		}).setOrigin(0.5,0.5);
		
		var txtGrid = this.add.text(game.config.width * 0.5, game.config.height * 0.5 + 50, 'Numero de inimigos\n(Tamanho do tabuleiro)', {
			fontFamily: 'monospace',
			fontSize: 26,
			fontStyle: 'bold',
			color: '#ffffff',
			align: 'center'
		}).setOrigin(0.5,0.5);
		txtGrid.visible = false;
		
		this.btnGrid4 = this.add.sprite(
			288,
			420,
			"btB"
		).setOrigin(0.5,0.5).setScale(1.5,1.5);
		var txtGrid4 = this.add.text(288, 420, '16\n(4x4)', {
			fontFamily: 'monospace',
			fontSize: 26,
			fontStyle: 'bold',
			color: '#ffffff',
			align: 'center'
		}).setOrigin(0.5,0.5);
		this.btnGrid4.visible = false;
		txtGrid4.visible = false;
		
		this.btnGrid5 = this.add.sprite(
			438,
			420,
			"btB"
		).setOrigin(0.5,0.5).setScale(1.5,1.5);
		var txtGrid5 = this.add.text(438, 420, '25\n(5x5)', {
			fontFamily: 'monospace',
			fontSize: 26,
			fontStyle: 'bold',
			color: '#ffffff',
			align: 'center'
		}).setOrigin(0.5,0.5);
		this.btnGrid5.visible = false;
		txtGrid5.visible = false;
		
		this.btnGrid6 = this.add.sprite(
			588,
			420,
			"btB"
		).setOrigin(0.5,0.5).setScale(1.5,1.5);
		var txtGrid6 = this.add.text(588, 420, '36\n(6x6)', {
			fontFamily: 'monospace',
			fontSize: 26,
			fontStyle: 'bold',
			color: '#ffffff',
			align: 'center'
		}).setOrigin(0.5,0.5);
		this.btnGrid6.visible = false;
		txtGrid6.visible = false;
		
		this.btnGrid7 = this.add.sprite(
			738,
			420,
			"btB"
		).setOrigin(0.5,0.5).setScale(1.5,1.5);
		var txtGrid7 = this.add.text(738, 420, '49\n(7x7)', {
			fontFamily: 'monospace',
			fontSize: 26,
			fontStyle: 'bold',
			color: '#ffffff',
			align: 'center'
		}).setOrigin(0.5,0.5);
		this.btnGrid7.visible = false;
		txtGrid7.visible = false;
		
		this.btnStart.setInteractive();
		
		//comportamento dos botoes
		this.btnStart.on("pointerover", function() {
			this.btnStart.setScale(2.1,2.1);
			txtStart.setScale(1.1,1.1);
			this.sfx.btnOver.play();
		}, this);
		this.btnStart.on("pointerout", function() {
			this.setScale(2,2);
			txtStart.setScale(1,1);
		});
		this.btnStart.once("pointerdown", function() {
			this.btnStart.setScale(2,2);
			txtStart.setScale(1,1);
			this.sfx.btnPress.play();
		}, this);
		this.btnStart.once("pointerup", function() {
			this.btnStart.setScale(2.1,2.1);
			txtStart.setScale(1.1,1.1);
			this.btnGrid4.setInteractive();
			this.btnGrid5.setInteractive();
			this.btnGrid6.setInteractive();
			this.btnGrid7.setInteractive();
			this.btnGrid4.visible = true;
			this.btnGrid5.visible = true;
			this.btnGrid6.visible = true;
			this.btnGrid7.visible = true;
			txtGrid.visible = true;
			txtGrid4.visible = true;
			txtGrid5.visible = true;
			txtGrid6.visible = true;
			txtGrid7.visible = true;
		}, this);
		
		this.btnGrid4.on("pointerover", function() {
			this.btnGrid4.setScale(1.6,1.6);
			txtGrid4.setScale(1.1,1.1);
			this.sfx.btnOver.play();
		}, this);
		this.btnGrid4.on("pointerout", function() {
			this.setScale(1.5,1.5);
			txtGrid4.setScale(1,1);
		});
		this.btnGrid4.once("pointerdown", function() {
			this.btnGrid4.setScale(1.5,1.5);
			txtGrid4.setScale(1,1);
			this.sfx.btnPress.play();
		}, this);
		this.btnGrid4.once("pointerup", function() {
			this.btnGrid4.setScale(1.6,1.6);
			txtGrid4.setScale(1.1,1.1);
			grid = 4;
			this.sfx.MenuAud.stop();
			this.scene.start("Main");
		}, this);
		
		this.btnGrid5.on("pointerover", function() {
			this.btnGrid5.setScale(1.6,1.6);
			txtGrid5.setScale(1.1,1.1);
			this.sfx.btnOver.play();
		}, this);
		this.btnGrid5.on("pointerout", function() {
			this.setScale(1.5,1.5);
			txtGrid5.setScale(1,1);
		});
		this.btnGrid5.once("pointerdown", function() {
			this.btnGrid5.setScale(1.5,1.5);
			txtGrid5.setScale(1,1);
			this.sfx.btnPress.play();
		}, this);
		this.btnGrid5.once("pointerup", function() {
			this.btnGrid5.setScale(1.6,1.6);
			txtGrid5.setScale(1.1,1.1);
			grid = 5;
			this.sfx.MenuAud.stop();
			this.scene.start("Main");
		}, this);
		
		this.btnGrid6.on("pointerover", function() {
			this.btnGrid6.setScale(1.6,1.6);
			txtGrid6.setScale(1.1,1.1);
			this.sfx.btnOver.play();
		}, this);
		this.btnGrid6.on("pointerout", function() {
			this.setScale(1.5,1.5);
			txtGrid6.setScale(1,1);
		});
		this.btnGrid6.once("pointerdown", function() {
			this.btnGrid6.setScale(1.5,1.5);
			txtGrid6.setScale(1,1);
			this.sfx.btnPress.play();
		}, this);
		this.btnGrid6.once("pointerup", function() {
			this.btnGrid6.setScale(1.6,1.6);
			txtGrid6.setScale(1.1,1.1);
			grid = 6;
			this.sfx.MenuAud.stop();
			this.scene.start("Main");
		}, this);
		
		this.btnGrid7.on("pointerover", function() {
			this.btnGrid7.setScale(1.6,1.6);
			txtGrid7.setScale(1.1,1.1);
			this.sfx.btnOver.play();
		}, this);
		this.btnGrid7.on("pointerout", function() {
			this.setScale(1.5,1.5);
			txtGrid7.setScale(1,1);
		});
		this.btnGrid7.once("pointerdown", function() {
			this.btnGrid7.setScale(1.5,1.5);
			txtGrid7.setScale(1,1);
			this.sfx.btnPress.play();
		}, this);
		this.btnGrid7.once("pointerup", function() {
			this.btnGrid7.setScale(1.6,1.6);
			txtGrid7.setScale(1.1,1.1);
			grid = 7;
			this.sfx.MenuAud.stop();
			this.scene.start("Main");
		}, this);
	}
	update(){
		
	}
}