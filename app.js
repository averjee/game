
//Lock Picker game developed by Alnoor Verjee using Pixi JS and Tween Max
//Intro Animation was created using CSS3 Keyframe Animations in styles.css

var app = new PIXI.Application();
document.body.appendChild(app.view);

// create a background
var background = PIXI.Sprite.fromImage('images/background.png');
background.width = app.screen.width;
background.height = app.screen.height;

// add background to stage
app.stage.addChild(background);

var textureLogo = PIXI.Texture.fromImage('images/logo.png');
var logo = new PIXI.Sprite(textureLogo);
logo.scale.set(0.6, 0.6);
logo.anchor.set(-0.55, -0.1);
app.stage.addChild(logo);

// font loader
PIXI.loader
		.add('message_simple-export', 'fonts/message_simple-export.xml')
        .load(onFontsLoaded);

var prizeText;
var prizes = ['£3', '£10', '£1,000'];
var randomPrize = prizes[Math.floor(Math.random()*prizes.length)];

var shufflingText;

function onFontsLoaded() {
	console.log(randomPrize);
	prizeText = new PIXI.extras.BitmapText(randomPrize, { font: '24px message_simple-export'});
    prizeText.alpha = 0;
    shufflingText = new PIXI.extras.BitmapText("SHUFFLING...", { font: '24px message_simple-export'});
    shufflingText.anchor.set(-1.3, -23.2);
    app.stage.addChild(shufflingText);
    pickText = new PIXI.extras.BitmapText("PICK A SAFE", { font: '24px message_simple-export'});
    pickText.anchor.set(-1.25, -19);
    pickText.alpha = 0;
    app.stage.addChild(pickText);
}

// creating textures
var textureSafe = PIXI.Texture.fromImage('images/box.png');
var textureDoor = PIXI.Texture.fromImage('images/box_door.png');
var textureShadow = PIXI.Texture.fromImage('images/box_padlock_shadow.png');
var textureLock = PIXI.Texture.fromImage('images/box_padlock.png');
var textureWin = PIXI.Texture.fromImage('images/pep_0.png');
var textureButtonOn = PIXI.Texture.fromImage('images/buttonOn.png');
var textureButtonOver = PIXI.Texture.fromImage('images/buttonOver.png');
var textureContinue = PIXI.Texture.fromImage('images/cta_textContinue.png');

var win = new PIXI.Sprite(textureWin);
win.anchor.set(-1.6, -7.5);
win.scale.set(0.75, 0.75);
win.alpha = 0;
app.stage.addChild(win);

var button = new PIXI.Sprite(textureButtonOn);
button.anchor.set(-1.15, -5.23);
button.alpha = 0;
button.interactive = true;
button.buttonMode = true;
button.scale.set(0.75, 0.75);
app.stage.addChild(button);


var continueText = new PIXI.Sprite(textureContinue);
continueText.anchor.set(-1.82, -12.7);
continueText.alpha = 0;
continueText.scale.set(0.75, 0.75);
app.stage.addChild(continueText);

var safes = [];
var doors = [];
var shadows = [];
var locks = [];

var safePositions = [
	90, 202,
	290, 202,
	490, 202
];

for (var i = 0; i < 3; i++) {
	
	var safe1Clicked;
	var safe2Clicked;
	var safe3Clicked;

	var safe = new PIXI.Sprite(textureSafe);
	safe.x = safePositions[i*2];
    safe.y = safePositions[i*2 + 1];
    safe.scale.set(0.75, 0.75);

    var door = new PIXI.Sprite(textureDoor);
    door.x = safe.x + 30;
	door.y = safe.y + 32;
    door.scale.set(0.75, 0.75);

    var shadow = new PIXI.Sprite(textureShadow);
    shadow.x = safe.x + 70;
	shadow.y = safe.y + 72;
    shadow.scale.set(0.75, 0.75);

    var lock = new PIXI.Sprite(textureLock);
    lock.x = safe.x + 85;
	lock.y = safe.y + 62;
    lock.scale.set(0.75, 0.75);
    
    //create arrays
    safes.push(safe);
    doors.push(door);
    shadows.push(shadow);
    locks.push(lock); 

    doors[i].interactive = true;
	doors[i].buttonMode = true;

	doors[i].on('pointerdown', function(i){

		//console.log(i.data.global.x);
		
		//if x value lies between certain ranges then we can clear the shadow and lock as well as the door
		if (i.data.global.x > 127 && i.data.global.x < 270) {
			
			doors[0].alpha = 0;
			shadows[0].alpha = 0;
			locks[0].alpha = 0;

			safe1Clicked = true;

			if (safe1Clicked == true && safe2Clicked == true && safe3Clicked == true) {
				setPrize(1);
			}

		} else if (i.data.global.x > 340 && i.data.global.x < 460) {
			
			doors[1].alpha = 0;
			shadows[1].alpha = 0;
			locks[1].alpha = 0;

			safe2Clicked = true;

			if (safe1Clicked == true && safe2Clicked == true && safe3Clicked == true) {
				setPrize(2);
			}

		} else {
			
			doors[2].alpha = 0;
			shadows[2].alpha = 0;
			locks[2].alpha = 0;

			safe3Clicked = true;

			if (safe1Clicked == true && safe2Clicked == true && safe3Clicked == true) {
				setPrize(3);
			}
		}

		function setPrize(n){	
			
			var margin = 200*(n-1);
			
			if (randomPrize == "£3") {
				prizeText.x = 175 + margin;	
			} else if (randomPrize == "£10") {
				prizeText.x = 165 + margin;
			} else {
				prizeText.x = 138 + margin;	
			}
			prizeText.y = 285;
			prizeText.alpha = 1;
			pickText.alpha = 0;
			win.alpha = 1;

			//win prize animation
			TweenMax.to(prizeText, 1, {y:0, repeat:1, yoyo:true});

			setTimeout(function(){
				win.alpha = 0;
				button.alpha = 1;
				continueText.alpha = 1;

				button.on('pointerover', function(){
					this.texture = textureButtonOver;
				});

				button.on('pointerout', function(){
					this.texture = textureButtonOn;
				});

				button.on('pointerdown', function(){
					this.texture = textureButtonOn;
					location.reload();
				});
				
			}, 3000);

		}

	});

}

// adding elements to stage once shuffling intro has finished
setTimeout(function(){
	app.stage.addChild(safes[0]);
	app.stage.addChild(safes[1]);
	app.stage.addChild(safes[2]); 
	
	app.stage.addChild(doors[0]);
	app.stage.addChild(doors[1]);
	app.stage.addChild(doors[2]);
	
	app.stage.addChild(shadows[0]);
	app.stage.addChild(shadows[1]);
	app.stage.addChild(shadows[2]);
	
	app.stage.addChild(locks[0]);
	app.stage.addChild(locks[1]);
	app.stage.addChild(locks[2]);

	app.stage.addChild(prizeText);
	shufflingText.alpha = 0;
	pickText.alpha = 1;
}, 6000);






