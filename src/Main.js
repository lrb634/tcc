class Main extends Phaser.Scene{
	constructor() {
		super({ key: "Main" });
	}
	preload(){
		//carregar inimigos
		this.load.image('sprenemy1','assets/sprenemy1.png');
		this.load.image('sprenemy2','assets/sprenemy2.png');
		this.load.image('sprenemy3','assets/sprenemy3.png');
		this.load.spritesheet('explosion', 'assets/explosion.png',{ 
			frameWidth: 256,
			frameHeight: 256
		});
	
		//carregar botoes
		this.load.image('btW','assets/Button02.png');
		this.load.image('btF','assets/Button03.png');
		this.load.image('btG','assets/Button06.png');
		this.load.image('btR','assets/Button05.png');
		this.load.image('btS','assets/Button04.png');
		this.load.image('display','assets/display.png');
		this.load.image('painel','assets/Painel.png');
		this.load.image('painelp','assets/PainelPrincipal.png');
		this.load.image('painelL','assets/PainelLado.png');
		this.load.image('titulo','assets/Titulo.png');
		this.load.image('diceArea','assets/Button07.png');
		this.load.image('btStart','assets/Button16.png');
		this.load.image('btStartS','assets/Button15.png');
		this.load.image('btBL','assets/Button11.png');
		
		//carregar audio
		this.load.audio("audexplode", "assets/explosion.ogg");
		this.load.audio("audbtnPress", "assets/btnpress.ogg");
		this.load.audio("audbtnOver", "assets/btnover.ogg");
		this.load.audio("auddiceSel", "assets/btnselect.ogg");
		this.load.audio("auddiceNSel", "assets/btnunselect.ogg");
		this.load.audio("audAmb", "assets/AudAmb.ogg");
		this.load.audio("sndErro", "assets/sndErro.ogg");
	}
	create(){
		//cria animacao
		this.anims.create({
			key: 'explosion', 
			frames: this.anims.generateFrameNumbers('explosion'), 
			frameRate: 50,
			repeat: 0 
		});
		//definir audio
		this.sfx = {
			ambiance: this.sound.add("audAmb", {volume: 0.1}),
			Erro: this.sound.add("sndErro"),
			explode: this.sound.add("audexplode"),
			btnOver: this.sound.add("audbtnOver"),
			btnPress: this.sound.add("audbtnPress"),
			Select: this.sound.add("auddiceSel"),
			Unselect: this.sound.add("auddiceNSel"),
		};
		this.sfx.ambiance.loop = true;
		this.sfx.ambiance.play();
		
		//definicao da quantidade de inimigos, suas posicoes e valor maximo
		var originX = 0;
		var originY = 0;
		var teto = grid * grid;
		if (grid == 4){originX = 204; originY = 167.5;}
		else if (grid == 5){originX = 172; originY = 135.5;}
		else if (grid == 6){originX = 140; originY = 103.5;}
		else if (grid == 7){originX = 110; originY = 70;}
		
		var vidas = 5;
		
		//definir HUD
		this.add.image(704, 300, "painel").setOrigin(0.5,0.5).setScale(0.8,1.4);
		this.add.image(300, 267, "painelp").setOrigin(0.5,0.5).setScale(0.6,1);
		this.add.image(910, 270, "painelL").setOrigin(0.5,0.5).setScale(1,1.5);
		this.add.image(910, 26, "titulo").setOrigin(0.5,0.5).setScale(0.82,1);
		this.add.image(300, 550, "btBL").setOrigin(0.5,0.5).setScale(2,2);
		this.add.text(910, 26, 'JOGADAS', {
			fontFamily: 'monospace',
			fontSize: 14,
			fontStyle: 'bold',
			color: '#ffffff'
		}).setOrigin(0.5,0.5);
		this.add.text(300, 15, 'RADAR', {
			fontFamily: 'monospace',
			fontSize: 14,
			fontStyle: 'bold',
			color: '#ffffff'
		}).setOrigin(0.5,0.5);
		var vidastxt = this.add.text(300, 550, 'VIDAS: ' + vidas, {
			fontFamily: 'monospace',
			fontSize: 37.5,
			fontStyle: 'bold',
			color: '#ffffff'
		}).setOrigin(0.5,0.5);
		
		//criacao das variaveis de controle dos dados
		var a1val = 0;
		var a2val = 0;
		var a3val = 0;
		var a1txt = null;
		var a2txt = null;
		var a3txt = null;
		
		//criacao das conexoes entre os dados e operacoes
		this.add.image(690, 397, "btBL").setOrigin(0.5,0.5).setAngle(32).setScale(1,0.5);
		this.add.image(660, 420, "btBL").setOrigin(0.5,0.5).setAngle(90).setScale(1,0.5);
		this.add.image(690, 520, "btBL").setOrigin(0.5,0.5).setAngle(-32).setScale(1,0.5);
		this.add.image(660, 500, "btBL").setOrigin(0.5,0.5).setAngle(90).setScale(1,0.5);
		this.add.image(760, 440, "btBL").setOrigin(0.5,0.5).setAngle(32).setScale(1,0.5);
		this.add.image(760, 477, "btBL").setOrigin(0.5,0.5).setAngle(-32).setScale(1,0.5);
		
		var conex11 = this.add.image(690, 397, "btBL").setOrigin(0.5,0.5).setAngle(32).setScale(1,0.5).setTintFill(0x39FF14).setAlpha(0.5);
		conex11.visible = false;
		var conex12 = this.add.image(660, 420, "btBL").setOrigin(0.5,0.5).setAngle(90).setScale(1,0.5).setTintFill(0x39FF14).setAlpha(0.5);
		conex12.visible = false;
		var conex21 = this.add.image(690, 520, "btBL").setOrigin(0.5,0.5).setAngle(-32).setScale(1,0.5).setTintFill(0x39FF14).setAlpha(0.5);
		conex21.visible = false;
		var conex22 = this.add.image(660, 500, "btBL").setOrigin(0.5,0.5).setAngle(90).setScale(1,0.5).setTintFill(0x39FF14).setAlpha(0.5);
		conex22.visible = false;
		var conex31 = this.add.image(760, 440, "btBL").setOrigin(0.5,0.5).setAngle(32).setScale(1,0.5).setTintFill(0x39FF14).setAlpha(0.5);
		conex31.visible = false;
		var conex32 = this.add.image(760, 477, "btBL").setOrigin(0.5,0.5).setAngle(-32).setScale(1,0.5).setTintFill(0x39FF14).setAlpha(0.5);
		conex32.visible = false;
		
		//criacao dos textos para melhor entendimento
		var diceA1txt = this.add.text(810, 380, "1o dado", {
			fontFamily: 'monospace',
			fontSize: 17.5,
			fontStyle: 'bold',
			color: '#ffffff'
		}).setOrigin(0.5,0.5);
		diceA1txt.visible = false;
		var diceA2txt = this.add.text(560, 458, "2o dado", {
			fontFamily: 'monospace',
			fontSize: 17.5,
			fontStyle: 'bold',
			color: '#ffffff'
		}).setOrigin(0.5,0.5);
		diceA2txt.visible = false;
		var diceA3txt = this.add.text(810, 535, "3o dado", {
			fontFamily: 'monospace',
			fontSize: 17.5,
			fontStyle: 'bold',
			color: '#ffffff'
		}).setOrigin(0.5,0.5);
		diceA3txt.visible = false;
		var oper1txt = this.add.text(660, 340, 'Operação', {
			fontFamily: 'monospace',
			fontSize: 17.5,
			fontStyle: 'bold',
			color: '#ffffff'
		}).setOrigin(0.5,0.5);
		oper1txt.visible = false;
		var oper2txt = this.add.text(660, 577, 'Operação', {
			fontFamily: 'monospace',
			fontSize: 17.5,
			fontStyle: 'bold',
			color: '#ffffff'
		}).setOrigin(0.5,0.5);
		oper2txt.visible = false;
		var oper3txt = this.add.text(865, 458, 'Operação', {
			fontFamily: 'monospace',
			fontSize: 17.5,
			fontStyle: 'bold',
			color: '#ffffff'
		}).setOrigin(0.5,0.5);
		oper3txt.visible = false;
		
		//criacao dos botoes
		this.btnStart = this.add.sprite(
			700,
			315,
			"btStart"
		).setOrigin(0.5,0.5).setScale(0.75,1);
		this.add.text(700, 315, 'ROLAR DADOS', {
			fontFamily: 'monospace',
			fontSize: 17.5,
			fontStyle: 'bold',
			color: '#ffffff'
		}).setOrigin(0.5,0.5);
		
		this.diceA1 = this.add.sprite(
			730,
			410,
			"diceArea"
		).setOrigin(0.5,0.5).setScale(0.75,0.75);
		var a1sel = this.add.image(730, 410, "diceArea").setOrigin(0.5,0.5).setScale(0.75,0.75).setTintFill(0x39FF14).setAlpha(0.5);
		a1sel.visible = false;
		
		this.diceA2 = this.add.sprite(
			650,
			458,
			"diceArea"
		).setOrigin(0.5,0.5).setScale(0.75,0.75);
		var a2sel = this.add.image(650, 458, "diceArea").setOrigin(0.5,0.5).setScale(0.75,0.75).setTintFill(0x39FF14).setAlpha(0.5);
		a2sel.visible = false;
	
		this.diceA3 = this.add.sprite(
			730,
			505,
			"diceArea"
		).setOrigin(0.5,0.5).setScale(0.75,0.75);
		var a3sel = this.add.image(730, 505, "diceArea").setOrigin(0.5,0.5).setScale(0.75,0.75).setTintFill(0x39FF14).setAlpha(0.5);
		a3sel.visible = false;
		
		this.oper1 = this.add.sprite(
			660,
			380,
			"diceArea"
		).setOrigin(0.5,0.5).setScale(0.4,0.4);
		var txtopadd1 = this.add.text(660, 378, '+', {
			fontFamily: 'monospace',
			fontSize: 37.5,
			fontStyle: 'bold',
			color: '#ffffff'
		}).setOrigin(0.5,0.5);
		var txtopmul1 = this.add.text(660, 378, '×', {
			fontFamily: 'monospace',
			fontSize: 37.5,
			fontStyle: 'bold',
			color: '#ffffff'
		}).setOrigin(0.5,0.5);
		var txtopdiv1 = this.add.text(660, 378, '÷', {
			fontFamily: 'monospace',
			fontSize: 37.5,
			fontStyle: 'bold',
			color: '#ffffff'
		}).setOrigin(0.5,0.5);
		var txtopsub1 = this.add.text(660, 378, '-', {
			fontFamily: 'monospace',
			fontSize: 37.5,
			fontStyle: 'bold',
			color: '#ffffff'
		}).setOrigin(0.5,0.5);
		txtopmul1.visible = false;
		txtopadd1.visible = false;
		txtopdiv1.visible = false;
		txtopsub1.visible = false;
		
		this.oper2 = this.add.sprite(
			660,
			537,
			"diceArea"
		).setOrigin(0.5,0.5).setScale(0.4,0.4);
		var txtopadd2 = this.add.text(660, 536, '+', {
			fontFamily: 'monospace',
			fontSize: 37.5,
			fontStyle: 'bold',
			color: '#ffffff'
		}).setOrigin(0.5,0.5);
		var txtopmul2 = this.add.text(660, 536, '×', {
			fontFamily: 'monospace',
			fontSize: 37.5,
			fontStyle: 'bold',
			color: '#ffffff'
		}).setOrigin(0.5,0.5);
		var txtopdiv2 = this.add.text(660, 536, '÷', {
			fontFamily: 'monospace',
			fontSize: 37.5,
			fontStyle: 'bold',
			color: '#ffffff'
		}).setOrigin(0.5,0.5);
		var txtopsub2 = this.add.text(660, 536, '-', {
			fontFamily: 'monospace',
			fontSize: 37.5,
			fontStyle: 'bold',
			color: '#ffffff'
		}).setOrigin(0.5,0.5);
		txtopmul2.visible = false;
		txtopadd2.visible = false;
		txtopdiv2.visible = false;
		txtopsub2.visible = false;
		
		this.oper3 = this.add.sprite(
			790,
			458,
			"diceArea"
		).setOrigin(0.5,0.5).setScale(0.4,0.4);
		var txtopadd3 = this.add.text(790, 457, '+', {
			fontFamily: 'monospace',
			fontSize: 37.5,
			fontStyle: 'bold',
			color: '#ffffff'
		}).setOrigin(0.5,0.5);
		var txtopmul3 = this.add.text(790, 457, '×', {
			fontFamily: 'monospace',
			fontSize: 37.5,
			fontStyle: 'bold',
			color: '#ffffff'
		}).setOrigin(0.5,0.5);
		var txtopdiv3 = this.add.text(790, 457, '÷', {
			fontFamily: 'monospace',
			fontSize: 37.5,
			fontStyle: 'bold',
			color: '#ffffff'
		}).setOrigin(0.5,0.5);
		var txtopsub3 = this.add.text(790, 457, '-', {
			fontFamily: 'monospace',
			fontSize: 37.5,
			fontStyle: 'bold',
			color: '#ffffff'
		}).setOrigin(0.5,0.5);
		txtopmul3.visible = false;
		txtopadd3.visible = false;
		txtopdiv3.visible = false;
		txtopsub3.visible = false;
		
		this.btnClear = this.add.sprite(
			652,
			254,
			"btF"
		).setOrigin(0.5,0.5).setScale(0.75,0.75);
		this.add.text(652, 254, 'C', {
			fontFamily: 'monospace',
			fontSize: 37.5,
			fontStyle: 'bold',
			color: '#ffffff'
		}).setOrigin(0.5,0.5);
		
		this.btnOK = this.add.sprite(
			748,
			254,
			"btF"
		).setOrigin(0.5,0.5).setScale(0.75,0.75);
		this.add.text(748, 254, 'OK', {
			fontFamily: 'monospace',
			fontSize: 37.5,
			fontStyle: 'bold',
			color: '#ffffff'
		}).setOrigin(0.5,0.5);
		
		this.btnZero = this.add.sprite(
			700,
			254,
			"btF"
		).setOrigin(0.5,0.5).setScale(0.75,0.75);
		this.add.text(700, 254, '0', {
			fontFamily: 'monospace',
			fontSize: 37.5,
			fontStyle: 'bold',
			color: '#ffffff'
		}).setOrigin(0.5,0.5);
		
		this.btnOne = this.add.sprite(
			652,
			206,
			"btF"
		).setOrigin(0.5,0.5).setScale(0.75,0.75);
		this.add.text(652, 206, '1', {
			fontFamily: 'monospace',
			fontSize: 37.5,
			fontStyle: 'bold',
			color: '#ffffff'
		}).setOrigin(0.5,0.5);
		
		this.btnTwo = this.add.sprite(
			700,
			206,
			"btF"
		).setOrigin(0.5,0.5).setScale(0.75,0.75);
		this.add.text(700, 206, '2', {
			fontFamily: 'monospace',
			fontSize: 37.5,
			fontStyle: 'bold',
			color: '#ffffff'
		}).setOrigin(0.5,0.5);
		
		this.btnThree = this.add.sprite(
			748,
			206,
			"btF"
		).setOrigin(0.5,0.5).setScale(0.75,0.75);
		this.add.text(748, 206, '3', {
			fontFamily: 'monospace',
			fontSize: 37.5,
			fontStyle: 'bold',
			color: '#ffffff'
		}).setOrigin(0.5,0.5);
		
		this.btnFour = this.add.sprite(
			652,
			158,
			"btF"
		).setOrigin(0.5,0.5).setScale(0.75,0.75);
		this.add.text(652, 158, '4', {
			fontFamily: 'monospace',
			fontSize: 37.5,
			fontStyle: 'bold',
			color: '#ffffff'
		}).setOrigin(0.5,0.5);
		
		this.btnFive = this.add.sprite(
			700,
			158,
			"btF"
		).setOrigin(0.5,0.5).setScale(0.75,0.75);
		this.add.text(700, 158, '5', {
			fontFamily: 'monospace',
			fontSize: 37.5,
			fontStyle: 'bold',
			color: '#ffffff'
		}).setOrigin(0.5,0.5);
		
		this.btnSix = this.add.sprite(
			748,
			158,
			"btF"
		).setOrigin(0.5,0.5).setScale(0.75,0.75);
		this.add.text(748, 158, '6', {
			fontFamily: 'monospace',
			fontSize: 37.5,
			fontStyle: 'bold',
			color: '#ffffff'
		}).setOrigin(0.5,0.5);
		
		this.btnSeven = this.add.sprite(
			652,
			110,
			"btF"
		).setOrigin(0.5,0.5).setScale(0.75,0.75);
		this.add.text(652, 110, '7', {
			fontFamily: 'monospace',
			fontSize: 37.5,
			fontStyle: 'bold',
			color: '#ffffff'
		}).setOrigin(0.5,0.5);
		
		this.btnEight = this.add.sprite(
			700,
			110,
			"btF"
		).setOrigin(0.5,0.5).setScale(0.75,0.75);
		this.add.text(700, 110, '8', {
			fontFamily: 'monospace',
			fontSize: 37.5,
			fontStyle: 'bold',
			color: '#ffffff'
		}).setOrigin(0.5,0.5);
		
		this.btnNine = this.add.sprite(
			748,
			110,
			"btF"
		).setOrigin(0.5,0.5).setScale(0.75,0.75);
		this.add.text(748, 110, '9', {
			fontFamily: 'monospace',
			fontSize: 37.5,
			fontStyle: 'bold',
			color: '#ffffff'
		}).setOrigin(0.5,0.5);
		
		this.btnStart.setInteractive();
		
		//definicao das variaves de controle
		var dspl = [0, 0, 0, 0, 0];
		var numclick = 0;
		var numdsp = [null, null, null, null, null];
		var numdsp_tot = null;
		var acerto = null;
		var jogada = true;
		var cntJogada = 0;
		var opercontrol1 = 0;
		var opercontrol2 = 0;
		var opercontrol3 = 0;
		var tot = 0;
		var listjogX = 0;
		var listjogY = 0;
		var enemy_explode = null;
		var hit = null;
		this.Group_Enemy_Explode = this.add.group({runChildUpdate:true});	
		
		var d = this.add.image(704, 55, "display").setOrigin(0.5,0.5).setScale(1.3,1.3);
		
		//comportamento dos botoes
		this.btnZero.on("pointerover", function() {
			if (jogada){this.btnZero.setTexture("btR");}
			else{this.btnZero.setTexture("btS");}
			this.sfx.btnOver.play();
		}, this);
		this.btnZero.on("pointerout", function() {
			this.setTexture("btF");
		});
		this.btnZero.on("pointerdown", function() {
			if (jogada){this.btnZero.setTexture("btR");}
			else{
				this.sfx.btnPress.play();
				if (numclick < 5){this.btnZero.setTexture("btW");}
				else {this.btnZero.setTexture("btR");}
			}
		}, this);
		this.btnZero.on("pointerup", function() {
			if (jogada){this.btnZero.setTexture("btR");}
			else{
				this.btnZero.setTexture("btF");
				if (numclick < 5){
					numdsp[numclick] = this.add.text(640+numclick*30, 55, '0', {
						fontFamily: 'monospace',
						fontSize: 50,
						fontStyle: 'bold',
						color: '#ffffff'
					}).setOrigin(0.5,0.5);
					dspl[numclick] = 0;
					numclick++;
				}
			}
		}, this);
		
		this.btnOne.on("pointerover", function() {
			if (jogada){this.btnOne.setTexture("btR");}
			else{this.btnOne.setTexture("btS");}
			this.sfx.btnOver.play();
		}, this);
		this.btnOne.on("pointerout", function() {
			this.setTexture("btF");
		});
		this.btnOne.on("pointerdown", function() {
			if (jogada){this.btnOne.setTexture("btR");}
			else{
				this.sfx.btnPress.play();
				if (numclick < 5){this.btnOne.setTexture("btW");}
				else {this.btnOne.setTexture("btR");}
			}
		}, this);
		this.btnOne.on("pointerup", function() {
			if (jogada){this.btnOne.setTexture("btR");}
			else{
				this.btnOne.setTexture("btF");
				if (numclick < 5){
					numdsp[numclick] = this.add.text(640+numclick*30, 55, '1', {
						fontFamily: 'monospace',
						fontSize: 50,
						fontStyle: 'bold',
						color: '#ffffff'
					}).setOrigin(0.5,0.5);
					dspl[numclick] = 1;
					numclick++;
				}
			}
		}, this);
		
		this.btnTwo.on("pointerover", function() {
			if (jogada){this.btnTwo.setTexture("btR");}
			else{this.btnTwo.setTexture("btS");}
			this.sfx.btnOver.play();
		}, this);
		this.btnTwo.on("pointerout", function() {
			this.setTexture("btF");
		});
		this.btnTwo.on("pointerdown", function() {
			if (jogada){this.btnTwo.setTexture("btR");}
			else{
				this.sfx.btnPress.play();
				if (numclick < 5){this.btnTwo.setTexture("btW");}
				else {this.btnTwo.setTexture("btR");}
			}
		}, this);
		this.btnTwo.on("pointerup", function() {
			if (jogada){this.btnTwo.setTexture("btR");}
			else{
				this.btnTwo.setTexture("btF");
				if (numclick < 5){
					numdsp[numclick] = this.add.text(640+numclick*30, 55, '2', {
						fontFamily: 'monospace',
						fontSize: 50,
						fontStyle: 'bold',
						color: '#ffffff'
					}).setOrigin(0.5,0.5);
					dspl[numclick] = 2;
					numclick++;
				}
			}
		}, this);
		
		this.btnThree.on("pointerover", function() {
			if (jogada){this.btnThree.setTexture("btR");}
			else{this.btnThree.setTexture("btS");}
			this.sfx.btnOver.play();
		}, this);
		this.btnThree.on("pointerout", function() {
			this.setTexture("btF");
		});
		this.btnThree.on("pointerdown", function() {
			if (jogada){this.btnThree.setTexture("btR");}
			else{
				this.sfx.btnPress.play();
				if (numclick < 5){this.btnThree.setTexture("btW");}
				else {this.btnThree.setTexture("btR");}
			}
		}, this);
		this.btnThree.on("pointerup", function() {
			if (jogada){this.btnThree.setTexture("btR");}
			else{
				this.btnThree.setTexture("btF");
				if (numclick < 5){
					numdsp[numclick] = this.add.text(640+numclick*30, 55, '3', {
						fontFamily: 'monospace',
						fontSize: 50,
						fontStyle: 'bold',
						color: '#ffffff'
					}).setOrigin(0.5,0.5);
					dspl[numclick] = 3;
					numclick++;
				}
			}
		}, this);
		
		this.btnFour.on("pointerover", function() {
			if (jogada){this.btnFour.setTexture("btR");}
			else{this.btnFour.setTexture("btS");}
			this.sfx.btnOver.play();
		}, this);
		this.btnFour.on("pointerout", function() {
			this.setTexture("btF");
		});
		this.btnFour.on("pointerdown", function() {
			if (jogada){this.btnFour.setTexture("btR");}
			else{
				this.sfx.btnPress.play();
				if (numclick < 5){this.btnFour.setTexture("btW");}
				else {this.btnFour.setTexture("btR");}
			}
		}, this);
		this.btnFour.on("pointerup", function() {
			if (jogada){this.btnFour.setTexture("btR");}
			else{
				this.btnFour.setTexture("btF");
				if (numclick < 5){
					numdsp[numclick] = this.add.text(640+numclick*30, 55, '4', {
						fontFamily: 'monospace',
						fontSize: 50,
						fontStyle: 'bold',
						color: '#ffffff'
					}).setOrigin(0.5,0.5);
					dspl[numclick] = 4;
					numclick++;
				}
			}
		}, this);
		
		this.btnFive.on("pointerover", function() {
			if (jogada){this.btnFive.setTexture("btR");}
			else{this.btnFive.setTexture("btS");}
			this.sfx.btnOver.play();
		}, this);
		this.btnFive.on("pointerout", function() {
			this.setTexture("btF");
		});
		this.btnFive.on("pointerdown", function() {
			if (jogada){this.btnFive.setTexture("btR");}
			else{
				this.sfx.btnPress.play();
				if (numclick < 5){this.btnFive.setTexture("btW");}
				else {this.btnFive.setTexture("btR");}
			}
		}, this);
		this.btnFive.on("pointerup", function() {
			if (jogada){this.btnFive.setTexture("btR");}
			else{
				this.btnFive.setTexture("btF");
				if (numclick < 5){
					numdsp[numclick] = this.add.text(640+numclick*30, 55, '5', {
						fontFamily: 'monospace',
						fontSize: 50,
						fontStyle: 'bold',
						color: '#ffffff'
					}).setOrigin(0.5,0.5);
					dspl[numclick] = 5;
					numclick++;
				}
			}
		}, this);
		
		this.btnSix.on("pointerover", function() {
			if (jogada){this.btnSix.setTexture("btR");}
			else{this.btnSix.setTexture("btS");}
			this.sfx.btnOver.play();
		}, this);
		this.btnSix.on("pointerout", function() {
			this.setTexture("btF");
		});
		this.btnSix.on("pointerdown", function() {
			if (jogada){this.btnSix.setTexture("btR");}
			else{
				this.sfx.btnPress.play();
				if (numclick < 5){this.btnSix.setTexture("btW");}
				else {this.btnSix.setTexture("btR");}
			}
		}, this);
		this.btnSix.on("pointerup", function() {
			if (jogada){this.btnSix.setTexture("btR");}
			else{
				this.btnSix.setTexture("btF");
				if (numclick < 5){
					numdsp[numclick] = this.add.text(640+numclick*30, 55, '6', {
						fontFamily: 'monospace',
						fontSize: 50,
						fontStyle: 'bold',
						color: '#ffffff'
					}).setOrigin(0.5,0.5);
					dspl[numclick] = 6;
					numclick++;
				}
			}
		}, this);
		
		this.btnSeven.on("pointerover", function() {
			if (jogada){this.btnSeven.setTexture("btR");}
			else{this.btnSeven.setTexture("btS");}
			this.sfx.btnOver.play();
		}, this);
		this.btnSeven.on("pointerout", function() {
			this.setTexture("btF");
		});
		this.btnSeven.on("pointerdown", function() {
			if (jogada){this.btnSeven.setTexture("btR");}
			else{
				this.sfx.btnPress.play();
				if (numclick < 5){this.btnSeven.setTexture("btW");}
				else {this.btnSeven.setTexture("btR");}
			}
		}, this);
		this.btnSeven.on("pointerup", function() {
			if (jogada){this.btnSeven.setTexture("btR");}
			else{
				this.btnSeven.setTexture("btF");
				if (numclick < 5){
					numdsp[numclick] = this.add.text(640+numclick*30, 55, '7', {
						fontFamily: 'monospace',
						fontSize: 50,
						fontStyle: 'bold',
						color: '#ffffff'
					}).setOrigin(0.5,0.5);
					dspl[numclick] = 7;
					numclick++;
				}
			}
		}, this);
		
		this.btnEight.on("pointerover", function() {
			if (jogada){this.btnEight.setTexture("btR");}
			else{this.btnEight.setTexture("btS");}
			this.sfx.btnOver.play();
		}, this);
		this.btnEight.on("pointerout", function() {
			this.setTexture("btF");
		});
		this.btnEight.on("pointerdown", function() {
			if (jogada){this.btnEight.setTexture("btR");}
			else{
				this.sfx.btnPress.play();
				if (numclick < 5){this.btnEight.setTexture("btW");}
				else {this.btnEight.setTexture("btR");}
			}
		}, this);
		this.btnEight.on("pointerup", function() {
			if (jogada){this.btnEight.setTexture("btR");}
			else{
				this.btnEight.setTexture("btF");
				if (numclick < 5){
					numdsp[numclick] = this.add.text(640+numclick*30, 55, '8', {
						fontFamily: 'monospace',
						fontSize: 50,
						fontStyle: 'bold',
						color: '#ffffff'
					}).setOrigin(0.5,0.5);
					dspl[numclick] = 8;
					numclick++;
				}
			}
		}, this);
		
		this.btnNine.on("pointerover", function() {
			if (jogada){this.btnNine.setTexture("btR");}
			else {this.btnNine.setTexture("btS");}
			this.sfx.btnOver.play();
		}, this);
		this.btnNine.on("pointerout", function() {
			this.setTexture("btF");
		});
		this.btnNine.on("pointerdown", function() {
			if (jogada){this.btnNine.setTexture("btR");}
			else{
				this.sfx.btnPress.play();
				if (numclick < 5){this.btnNine.setTexture("btW");}
				else {this.btnNine.setTexture("btR");}
			}
		}, this);
		this.btnNine.on("pointerup", function() {
			if (jogada){this.btnNine.setTexture("btR");}
			else{
				this.btnNine.setTexture("btF");
				if (numclick < 5){
					numdsp[numclick] = this.add.text(640+numclick*30, 55, '9', {
						fontFamily: 'monospace',
						fontSize: 50,
						fontStyle: 'bold',
						color: '#ffffff'
					}).setOrigin(0.5,0.5);
					dspl[numclick] = 9;
					numclick++;
				}
			}
		}, this);
		
		this.diceA1.on("pointerover", function() {
			if(jogada == false){
				this.diceA1.setScale(0.85,0.85);
				a1txt.setScale(1.1,1.1);
				diceA1txt.visible = true;
				this.sfx.btnOver.play();
			}
		}, this);
		this.diceA1.on("pointerout", function() {
			if(jogada == false){
				this.setScale(0.75,0.75);
				a1txt.setScale(1,1);
				diceA1txt.visible = false;
			}
		});
		this.diceA1.on("pointerdown", function() {
			if(jogada == false){
				this.diceA1.setScale(0.75,0.75);
				a1txt.setScale(1,1);
				diceA1txt.visible = true;
				this.sfx.btnPress.play();
			}
		}, this);
		this.diceA1.on("pointerup", function() {
			if(jogada == false){
				this.diceA1.setScale(0.85,0.85);
				a1txt.setScale(1.1,1.1);
				diceA1txt.visible = true;
				if (a1sel.visible){
					this.sfx.Unselect.play();
					a1sel.visible = false;
					conex11.visible = false;
					conex12.visible = false;
					conex31.visible = false;
					conex32.visible = false;
				}
				else {
					a1sel.visible = true;
					this.sfx.Select.play();
					if(a1sel.visible && a2sel.visible && a3sel.visible){
						conex11.visible = true;
						conex12.visible = true;
						conex21.visible = true;
						conex22.visible = true;
						conex31.visible = false;
						conex32.visible = false;
					}
					else if(a1sel.visible && a2sel.visible){
						conex11.visible = true;
						conex12.visible = true;
					}
					else if(a1sel.visible && a3sel.visible){
						conex31.visible = true;
						conex32.visible = true;
					}
				}
			}
		}, this);
		
		this.diceA2.on("pointerover", function() {
			if(jogada == false){
				this.diceA2.setScale(0.85,0.85);
				a2txt.setScale(1.1,1.1);
				diceA2txt.visible = true;
				this.sfx.btnOver.play();
			}
		}, this);
		this.diceA2.on("pointerout", function() {
			if(jogada == false){
				this.setScale(0.75,0.75);
				a2txt.setScale(1,1);
				diceA2txt.visible = false;
			}
		});
		this.diceA2.on("pointerdown", function() {
			if(jogada == false){
				this.diceA2.setScale(0.75,0.75);
				a2txt.setScale(1,1);
				diceA2txt.visible = true;
				this.sfx.btnPress.play();
			}
		}, this);
		this.diceA2.on("pointerup", function() {
			if(jogada == false){
				this.diceA2.setScale(0.85,0.85);
				a2txt.setScale(1.1,1.1);
				diceA2txt.visible = true;
				if (a2sel.visible){
					this.sfx.Unselect.play();
					a2sel.visible = false;
					conex11.visible = false;
					conex12.visible = false;
					conex21.visible = false;
					conex22.visible = false;
					if(a1sel.visible && a3sel.visible){
						conex31.visible = true;
						conex32.visible = true
					}
				}
				else {
					a2sel.visible = true;
					this.sfx.Select.play();
					if(a1sel.visible && a2sel.visible && a3sel.visible){
						conex11.visible = true;
						conex12.visible = true;
						conex21.visible = true;
						conex22.visible = true;
						conex31.visible = false;
						conex32.visible = false;
					}
					else if(a1sel.visible && a2sel.visible){
						conex11.visible = true;
						conex12.visible = true;
					}
					else if(a2sel.visible && a3sel.visible){
						conex21.visible = true;
						conex22.visible = true;
					}
				}
			}
		}, this);
		
		this.diceA3.on("pointerover", function() {
			if(jogada == false){
				this.diceA3.setScale(0.85,0.85);
				a3txt.setScale(1.1,1.1);
				diceA3txt.visible = true;
				this.sfx.btnOver.play();
			}
		}, this);
		this.diceA3.on("pointerout", function() {
			if(jogada == false){
				this.setScale(0.75,0.75);
				a3txt.setScale(1,1);
				diceA3txt.visible = false;
			}
		});
		this.diceA3.on("pointerdown", function() {
			if(jogada == false){
				this.diceA3.setScale(0.75,0.75);
				a3txt.setScale(1,1);
				diceA3txt.visible = true;
				this.sfx.btnPress.play();
			}
		}, this);
		this.diceA3.on("pointerup", function() {
			if(jogada == false){
				this.diceA3.setScale(0.85,0.85);
				a3txt.setScale(1.1,1.1);
				diceA3txt.visible = true;
				if (a3sel.visible){
					this.sfx.Unselect.play();
					a3sel.visible = false;
					conex31.visible = false;
					conex32.visible = false;
					conex21.visible = false;
					conex22.visible = false;
				}
				else {
					a3sel.visible = true;
					this.sfx.Select.play();
					if(a1sel.visible && a2sel.visible && a3sel.visible){
						conex11.visible = true;
						conex12.visible = true;
						conex21.visible = true;
						conex22.visible = true;
						conex31.visible = false;
						conex32.visible = false;
					}
					else if(a3sel.visible && a2sel.visible){
						conex21.visible = true;
						conex22.visible = true;
					}
					else if(a1sel.visible && a3sel.visible){
						conex31.visible = true;
						conex32.visible = true;
					}
				}
			}
		}, this);
		
		
		this.oper1.on("pointerover", function() {
			if(jogada == false){
				this.oper1.setScale(0.5,0.5);
				txtopadd1.setScale(1.1,1.1);
				txtopmul1.setScale(1.1,1.1);
				txtopdiv1.setScale(1.1,1.1);
				txtopsub1.setScale(1.1,1.1);
				oper1txt.visible = true;
				this.sfx.btnOver.play();
			}
		}, this);
		this.oper1.on("pointerout", function() {
			if(jogada == false){
				this.setScale(0.4,0.4);
				txtopadd1.setScale(1,1);
				txtopmul1.setScale(1,1);
				txtopdiv1.setScale(1,1);
				txtopsub1.setScale(1,1);
				oper1txt.visible = false;
			}
		});
		this.oper1.on("pointerdown", function() {
			if(jogada == false){
				this.oper1.setScale(0.4,0.4);
				txtopadd1.setScale(1,1);
				txtopmul1.setScale(1,1);
				txtopdiv1.setScale(1,1);
				txtopsub1.setScale(1,1);
				oper1txt.visible = true;
				this.sfx.btnPress.play();
			}
		}, this);
		this.oper1.on("pointerup", function() {
			if(jogada == false){
				this.oper1.setScale(0.5,0.5);
				txtopadd1.setScale(1.1,1.1);
				txtopmul1.setScale(1.1,1.1);
				txtopdiv1.setScale(1.1,1.1);
				txtopsub1.setScale(1.1,1.1);
				oper1txt.visible = true;
				opercontrol1++;
				if(opercontrol1 > 4){
					opercontrol1 = 1;
				}
				if(opercontrol1 == 1){
					txtopadd1.visible = true;
					txtopmul1.visible = false;
					txtopdiv1.visible = false;
					txtopsub1.visible = false;
				}
				if(opercontrol1 == 2){
					txtopadd1.visible = false;
					txtopmul1.visible = true;
					txtopdiv1.visible = false;
					txtopsub1.visible = false;
				}
				if(opercontrol1 == 3){
					txtopadd1.visible = false;
					txtopmul1.visible = false;
					txtopdiv1.visible = true;
					txtopsub1.visible = false;
				}
				if(opercontrol1 == 4){
					txtopadd1.visible = false;
					txtopmul1.visible = false;
					txtopdiv1.visible = false;
					txtopsub1.visible = true;
				}
			}
		}, this);
		
		this.oper2.on("pointerover", function() {
			if(jogada == false){
				this.oper2.setScale(0.5,0.5);
				txtopadd2.setScale(1.1,1.1);
				txtopmul2.setScale(1.1,1.1);
				txtopdiv2.setScale(1.1,1.1);
				txtopsub2.setScale(1.1,1.1);
				oper2txt.visible = true;
				this.sfx.btnOver.play();
			}
		}, this);
		this.oper2.on("pointerout", function() {
			if(jogada == false){
				this.setScale(0.4,0.4);
				txtopadd2.setScale(1,1);
				txtopmul2.setScale(1,1);
				txtopdiv2.setScale(1,1);
				txtopsub2.setScale(1,1);
				oper2txt.visible = false;
			}
		});
		this.oper2.on("pointerdown", function() {
			if(jogada == false){
				this.oper2.setScale(0.4,0.4);
				txtopadd2.setScale(1,1);
				txtopmul2.setScale(1,1);
				txtopdiv2.setScale(1,1);
				txtopsub2.setScale(1,1);
				oper2txt.visible = true;
				this.sfx.btnPress.play();
			}
		}, this);
		this.oper2.on("pointerup", function() {
			if(jogada == false){
				this.oper2.setScale(0.5,0.5);
				txtopadd2.setScale(1.1,1.1);
				txtopmul2.setScale(1.1,1.1);
				txtopdiv2.setScale(1.1,1.1);
				txtopsub2.setScale(1.1,1.1);
				oper2txt.visible = true;
				opercontrol2++
				if(opercontrol2 > 4){
					opercontrol2 = 1;
				}
				if(opercontrol2 == 1){
					txtopadd2.visible = true;
					txtopmul2.visible = false;
					txtopdiv2.visible = false;
					txtopsub2.visible = false;
				}
				if(opercontrol2 == 2){
					txtopadd2.visible = false;
					txtopmul2.visible = true;
					txtopdiv2.visible = false;
					txtopsub2.visible = false;
				}
				if(opercontrol2 == 3){
					txtopadd2.visible = false;
					txtopmul2.visible = false;
					txtopdiv2.visible = true;
					txtopsub2.visible = false;
				}
				if(opercontrol2 == 4){
					txtopadd2.visible = false;
					txtopmul2.visible = false;
					txtopdiv2.visible = false;
					txtopsub2.visible = true;
				}
			}
		}, this);
		
		this.oper3.on("pointerover", function() {
			if(jogada == false){
				this.oper3.setScale(0.5,0.5);
				txtopadd3.setScale(1.1,1.1);
				txtopmul3.setScale(1.1,1.1);
				txtopdiv3.setScale(1.1,1.1);
				txtopsub3.setScale(1.1,1.1);
				oper3txt.visible = true;
				this.sfx.btnOver.play();
			}
		}, this);
		this.oper3.on("pointerout", function() {
			if(jogada == false){
				this.setScale(0.4,0.4);
				txtopadd3.setScale(1,1);
				txtopmul3.setScale(1,1);
				txtopdiv3.setScale(1,1);
				txtopsub3.setScale(1,1);
				oper3txt.visible = false;
			}
		});
		this.oper3.on("pointerdown", function() {
			if(jogada == false){
				this.oper3.setScale(0.4,0.4);
				txtopadd3.setScale(1,1);
				txtopmul3.setScale(1,1);
				txtopdiv3.setScale(1,1);
				txtopsub3.setScale(1,1);
				oper3txt.visible = true;
				this.sfx.btnPress.play();
			}
		}, this);
		this.oper3.on("pointerup", function() {
			if(jogada == false){
				this.oper3.setScale(0.5,0.5);
				txtopadd3.setScale(1.1,1.1);
				txtopmul3.setScale(1.1,1.1);
				txtopdiv3.setScale(1.1,1.1);
				txtopsub3.setScale(1.1,1.1);
				oper3txt.visible = true;
				opercontrol3++;
				if(opercontrol3 > 4){
					opercontrol3 = 1;
				}
				if(opercontrol3 == 1){
					txtopadd3.visible = true;
					txtopmul3.visible = false;
					txtopdiv3.visible = false;
					txtopsub3.visible = false;
				}
				if(opercontrol3 == 2){
					txtopadd3.visible = false;
					txtopmul3.visible = true;
					txtopdiv3.visible = false;
					txtopsub3.visible = false;
				}
				if(opercontrol3 == 3){
					txtopadd3.visible = false;
					txtopmul3.visible = false;
					txtopdiv3.visible = true;
					txtopsub3.visible = false;
				}
				if(opercontrol3 == 4){
					txtopadd3.visible = false;
					txtopmul3.visible = false;
					txtopdiv3.visible = false;
					txtopsub3.visible = true;
				}
			}
		}, this);
		
		this.btnClear.on("pointerover", function() {
			if (jogada){this.btnClear.setTexture("btR");}
			else {this.btnClear.setTexture("btS");}
			this.sfx.btnOver.play();
		}, this);
		this.btnClear.on("pointerout", function() {
			this.setTexture("btF");
		});
		this.btnClear.on("pointerdown", function() {
			if (jogada){this.btnClear.setTexture("btR");}
			else {
				this.sfx.btnPress.play();
				this.btnClear.setTexture("btW");
			}
		}, this);
		this.btnClear.on("pointerup", function() {
			if (jogada){this.btnClear.setTexture("btR");}
			else {
				this.btnClear.setTexture("btF");
				if(numclick >= 0 && jogada == false){
					if (numdsp[0]){numdsp[0].destroy();}
					if (numdsp[1]){numdsp[1].destroy();}
					if (numdsp[2]){numdsp[2].destroy();}
					if (numdsp[3]){numdsp[3].destroy();}
					if (numdsp[4]){numdsp[4].destroy();}
					dspl[0] = 0;
					dspl[1] = 0;
					dspl[2] = 0;
					dspl[3] = 0;
					dspl[4] = 0;
					numclick = 0;
					tot = 0;
					numdsp_tot = 0;
				}
			}
		}, this);
		
		this.btnOK.on("pointerover", function() {
			if (jogada){this.btnOK.setTexture("btR");}
			else {this.btnOK.setTexture("btS");}
			this.sfx.btnOver.play();
		}, this);
		this.btnOK.on("pointerout", function() {
			this.setTexture("btF");
		});
		this.btnOK.on("pointerdown", function() {
			if (jogada){this.btnOK.setTexture("btR");}
			else {
				this.sfx.btnPress.play();
				this.btnOK.setTexture("btW");
			}
		}, this);
		this.btnOK.on("pointerup", function(event) {
			if (jogada){this.btnOK.setTexture("btR");}
			else {
				this.btnOK.setTexture("btF");
				if (cntIni > 0 && jogada == false && numclick > 0){
					if(a1sel.visible && a2sel.visible && a3sel.visible){
						if(txtopmul1.visible && txtopmul2.visible){
							tot = a1val * a2val * a3val;
						}
						if(txtopmul1.visible && txtopdiv2.visible){
							tot = Phaser.Math.FloorTo((a1val * a2val / a3val), 0, 10);
						}
						if(txtopmul1.visible && txtopadd2.visible){
							tot = a1val * a2val + a3val;
						}
						if(txtopmul1.visible && txtopsub2.visible){
							tot = Phaser.Math.Difference(a1val * a2val, a3val);
						}
						if(txtopdiv1.visible && txtopdiv2.visible){
							tot = Phaser.Math.FloorTo(((a1val / a2val) / a3val), 0, 10);
						}
						if(txtopdiv1.visible && txtopmul2.visible){
							tot = Phaser.Math.FloorTo((a1val / a2val), 0, 10) * a3val;
						}
						if(txtopdiv1.visible && txtopadd2.visible){
							tot = Phaser.Math.FloorTo((a1val / a2val), 0, 10) + a3val;
						}
						if(txtopdiv1.visible && txtopsub2.visible){
							tot = Phaser.Math.Difference(Phaser.Math.FloorTo((a1val / a2val), 0, 10), a3val);
						}
						if(txtopadd1.visible && txtopmul2.visible){
							tot = a2val * a3val + a1val;
						}
						if(txtopadd1.visible && txtopdiv2.visible){
							tot = Phaser.Math.FloorTo(a2val / a3val, 0, 10) + a1val;
						}
						if(txtopadd1.visible && txtopadd2.visible){
							tot = a1val + a2val + a3val;
						}
						if(txtopadd1.visible && txtopsub2.visible){
							tot = Phaser.Math.Difference(a1val + a2val, a3val);
						}
						if(txtopsub1.visible && txtopmul2.visible){
							tot = Phaser.Math.Difference(a2val * a3val,a1val);
						}
						if(txtopsub1.visible && txtopdiv2.visible){
							tot = Phaser.Math.Difference(Phaser.Math.FloorTo(a2val / a3val, 0, 10),a1val);
						}
						if(txtopsub1.visible && txtopadd2.visible){
							tot = Phaser.Math.Difference(a1val,a2val) + a3val;
						}
						if(txtopsub1.visible && txtopsub2.visible){
							tot = Phaser.Math.Difference(Phaser.Math.Difference(a1val,a2val),a3val);
						}
					}
					if(a1sel.visible && a2sel.visible && a3sel.visible == false){
						if(txtopmul1.visible){tot = a1val * a2val;}
						if(txtopdiv1.visible){tot = Phaser.Math.FloorTo(a1val / a2val, 0, 10);}
						if(txtopadd1.visible){tot = a1val + a2val;}
						if(txtopsub1.visible){tot = Phaser.Math.Difference(a1val,a2val);}
					}
					if(a2sel.visible && a3sel.visible && a1sel.visible == false){
						if(txtopmul2.visible){tot = a2val * a3val;}
						if(txtopdiv2.visible){tot = Phaser.Math.FloorTo(a2val / a3val, 0, 10);}
						if(txtopadd2.visible){tot = a2val + a3val;}
						if(txtopsub2.visible){tot = Phaser.Math.Difference(a2val,a3val);}
					}
					if(a1sel.visible && a3sel.visible && a2sel.visible == false){
						if(txtopmul3.visible){tot = a1val * a3val;}
						if(txtopdiv3.visible){tot = Phaser.Math.FloorTo(a1val / a3val, 0, 10);}
						if(txtopadd3.visible){tot = a1val + a3val;}
						if(txtopsub3.visible){tot = Phaser.Math.Difference(a1val,a3val);}
					}
					if(numclick == 1){numdsp_tot = dspl[0];}
					else if(numclick == 2){numdsp_tot = dspl[0] * 10 + dspl[1];}
					else if(numclick == 3){numdsp_tot = dspl[0] * 100 + dspl[1] * 10 + dspl[2];}
					else if(numclick == 4){numdsp_tot = dspl[0] * 1000 + dspl[1] * 100 + dspl[2] * 10 + dspl[3];}
					else if(numclick == 5){numdsp_tot = dspl[0] * 10000 + dspl[1] * 1000 + dspl[2] * 100 + dspl[3] * 10 + dspl[4];}
					if(numdsp_tot == tot){
						for(i=0;i<grid;i++){
							for (j=0;j<grid;j++){
								if (numdsp_tot == eneval[i][j]){
									eneval[i][j] = null;
									enespr[i][j].destroy();
									acerto = true;
									cntIni--;
									this.Group_Enemy_Explode.add(
										enemy_explode = new Enemy_Explode(this, originX+64*i, originY+64*j, 'explosion')
									);
									this.sfx.explode.play();
									vidas++;
								}
							}
						}
						if (numdsp[0]){numdsp[0].destroy();}
						if (numdsp[1]){numdsp[1].destroy();}
						if (numdsp[2]){numdsp[2].destroy();}
						if (numdsp[3]){numdsp[3].destroy();}
						if (numdsp[4]){numdsp[4].destroy();}
						dspl[0] = 0;
						dspl[1] = 0;
						dspl[2] = 0;
						dspl[3] = 0;
						dspl[4] = 0;
						numclick = 0;
						
						if(acerto){
							d.setTintFill(0x39FF14);
							d.setAlpha(0.5);
							hit = this.add.text(704, 55, 'ACERTOU', {
								fontFamily: 'monospace',
								fontSize: 50,
								fontStyle: 'bold',
								color: '#39FF14'
							}).setOrigin(0.5,0.5);
							this.add.text(860+25*listjogX, 55+20*listjogY, numdsp_tot, {
								fontFamily: 'monospace',
								fontSize: 20,
								fontStyle: 'bold',
								color: '#39FF14'
							}).setOrigin(0.5,0.5);
							if (cntJogada == 20 || cntJogada == 41 || cntJogada == 62 || cntJogada == 83){
								listjogY = 0;
								listjogX++;
							}
							else{
								listjogY++;
							}
						}
						else{
							vidas--;
							d.setTintFill(0xFF0000);
							d.setAlpha(0.5);
							hit = this.add.text(704, 55, 'ERROU', {
								fontFamily: 'monospace',
								fontSize: 50,
								fontStyle: 'bold',
								color: '#FF0000'
							}).setOrigin(0.5,0.5);
							this.add.text(860+25*listjogX, 55+20*listjogY, numdsp_tot, {
								fontFamily: 'monospace',
								fontSize: 20,
								fontStyle: 'bold',
								color: '#FF0000'
							}).setOrigin(0.5,0.5);
							if (cntJogada == 20 || cntJogada == 41 || cntJogada == 62 || cntJogada == 83){
								listjogY = 0;
								listjogX++;
							}
							else{
								listjogY++;
							}
							this.sfx.Erro.play();
						}
						vidastxt.setText('VIDAS: ' + vidas);
						if(cntIni == 0){
							WL = "VITÓRIA!"
							this.sfx.ambiance.stop();
							this.scene.start("WinORLose");
						}
						else if(vidas == 0){
							WL = "DERROTA!"
							this.sfx.ambiance.stop();
							this.scene.start("WinORLose");
						}
						else{
							this.time.addEvent({
								delay: 1000,
								callback:function(){
									acerto = null;
									numdsp_tot = 0;
									d.destroy();
									d = null;
									if(hit){
										hit.destroy();
										hit = null;
									}
									d = this.add.image(704, 55, "display").setOrigin(0.5,0.5).setScale(1.3,1.3);
									jogada = true;
									a1txt.destroy();
									a1txt = null;
									a2txt.destroy();
									a2txt = null;
									a3txt.destroy();
									a3txt = null;
									a1val = 0;
									a2val = 0;
									a3val = 0;
									conex11.visible = false;
									conex12.visible = false;
									conex21.visible = false;
									conex22.visible = false;
									conex31.visible = false;
									conex32.visible = false;
									a1sel.visible = false;
									a2sel.visible = false;
									a3sel.visible = false;
									cntJogada++;
								},
								callbackScope: this,
								loop: false
							});
						}
					}
				}
			}	
		}, this);
		
		//criacao das variaveis dos inimigos
		var enespr = [
			[null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null]
		];
		var eneval = [
			[null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null],
			[null, null, null, null, null, null, null]
		];
		
		var k = null;
		var sprite = '';
		var cntIni = -1;
		var i = 0;
		var j = 0;
		
		//definicao do botao de ROLAR DADOS e criacao dos inimigos em suas posicoes
		this.btnStart.on("pointerover", function() {
			if(jogada){
				this.btnStart.setTexture("btStartS");
				this.sfx.btnOver.play();
			}
		}, this);
		this.btnStart.on("pointerout", function() {
			this.setTexture("btStart");
		});
		this.btnStart.on("pointerdown", function() {
			if(jogada){
				this.sfx.btnPress.play();
				this.btnStart.setTexture("btStartS");
			}
		}, this);
		this.btnStart.on("pointerup", function() {
			if (jogada){
				this.btnStart.setTexture("btStart");
				jogada = false;
				a1val = Phaser.Math.Between(1,6);
				a1txt = this.add.text(730, 410, a1val, {
					fontFamily: 'monospace',
					fontSize: 50,
					fontStyle: 'bold',
					color: '#ffffff'
				}).setOrigin(0.5,0.5);
				a2val = Phaser.Math.Between(1,6);
				a2txt = this.add.text(650, 458, a2val, {
					fontFamily: 'monospace',
					fontSize: 50,
					fontStyle: 'bold',
					color: '#ffffff'
				}).setOrigin(0.5,0.5);
				a3val = Phaser.Math.Between(1,6);
				a3txt = this.add.text(730, 505, a3val, {
					fontFamily: 'monospace',
					fontSize: 50,
					fontStyle: 'bold',
					color: '#ffffff'
				}).setOrigin(0.5,0.5);
			}
			if (cntIni == -1){
				cntIni++;
				this.btnZero.setInteractive();
				this.btnOne.setInteractive();
				this.btnTwo.setInteractive();
				this.btnThree.setInteractive();
				this.btnFour.setInteractive();
				this.btnFive.setInteractive();
				this.btnSix.setInteractive();
				this.btnSeven.setInteractive();
				this.btnEight.setInteractive();
				this.btnNine.setInteractive();
				this.btnClear.setInteractive();
				this.btnOK.setInteractive();
				this.diceA1.setInteractive();
				this.diceA2.setInteractive();
				this.diceA3.setInteractive();
				this.oper1.setInteractive();
				this.oper2.setInteractive();
				this.oper3.setInteractive();
				for (i=0;i<grid;i++){
					for (j=0;j<grid;j++){
						k = Phaser.Math.Between(0,2);
						if(k==0){sprite = 'sprenemy1';}
						if(k==1){sprite = 'sprenemy2';}
						if(k==2){sprite = 'sprenemy3';}
						enespr[i][j] = new Enemy(this, originX+64*i, originY+64*j, sprite);
						eneval[i][j] = Phaser.Math.Between(0,teto);
						sprite = '';
						cntIni++;
					}
				}
			}
		}, this);
	}
	update(){
		
	}
}