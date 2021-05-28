class Enemy_Explode extends Phaser.GameObjects.Sprite{
	//classe definindo a explosao do inimigo em jogada(s) de sucesso
	constructor(scene, x,  y, sprite){
		super(scene, x, y, sprite).setOrigin(0.5, 0.5);
		this.anims.play(sprite, true);
		scene.add.existing(this);
	}
	update(){
		this.once('animationcomplete', () => {this.destroy()});
	}
}