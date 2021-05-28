class Enemy extends Phaser.GameObjects.Sprite{
	//classe definindo o(s) inimigo(s)
	constructor(scene, x, y, sprite){
		super(scene, x, y, sprite).setOrigin(0.5,0.5);
		scene.add.existing(this);
	}
	update(){
		
	}
}