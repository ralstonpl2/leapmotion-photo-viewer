

function concatData(id, data){
	return id + ": " + data + "<br>";
}

function getFingerName(fingerType) {
	switch(fingerType){
		case 0:
			return 'Thumb';
		break;

		case 1:
			return 'Index';
		break;

		case 2:
			return 'Middle';
		break;

		case 3:
			return 'Ring';
		break;

		case 4: 
			return 'Pinky';
		break;
	}
}

function concatJointPosition(id, position){
	return id + ": " + position[0] + ", " + position[1] + ", " + position[2] + "<br>";
}



//var output = document.getElementById("output");
//var frameString = "", handString = "", fingerString = "";
//var hand, finger;


var options = { enableGestures: true };

var photos = [];

//leap.loop iterates over frame data and prints out hand and finger data.
//It uses the browser's requestAnimationFrame

Leap.loop(function(frame) {

  frame.hands.forEach(function(hand, index) {
    
    var photo = ( photos[index] || (photos[index] = new Photo()) );    
    photo.setTransform(hand.screenPosition(), hand.roll());
    
  });
  
}).use('screenPosition', {scale: 0.25});

var images = ["images/YunnanBlindMan.jpg", "images/YangshouWoman.jpg"]

var Photo = function(index) {
  var photo = this;
  var img = document.createElement('img');
  img.src = images[index];
  img.style.position = 'absolute';
  img.onload = function () {
    photo.setTransform([window.innerWidth/2,window.innerHeight/2], 0);
    document.body.appendChild(img);
  }
  
  photo.setTransform = function(position, rotation) {

    img.style.left = position[0] - img.width  / 2 + 'px';
    img.style.top  = position[1] - img.height / 2 + 'px';

	img.style.transform = 'rotate(' + -rotation + 'rad)';
	
    img.style.webkitTransform = img.style.MozTransform = img.style.msTransform =
    img.style.OTransform = img.style.transform;

  };

};

photos[0] = new Photo(0);
photos[1] = new Photo(1);

/*

Leap.loopController.setBackground(true);

// Main leap loop
Leap.loop(options, function(frame){
	frameString = concatData('frame_id', frame.id);
	frameString += concatData("num_hands", frame.hands.length);
	frameString += concatData("num_fingers", frame.fingers.length);
	frameString += "<br>";



	for(var i = 0, len = frame.hands.length; i < len; i++){
		hand = frame.hands[i];
		handString = concatData("hand_type", hand.type);
		handString += concatData("confidence", hand.confidence);
		handString += concatData("pinch_strength", hand.pinchStrength);
		handString += concatData("grab_strength", hand.grabStrength);
		
		handString += '<br>';

		fingerString = concatJointPosition("finger_pinky_dip", hand.pinky.dipPosition);
		for(var j = 0, len2 = hand.fingers.length; j < len2; j++){
			finger = hand.fingers[j];
			fingerString += concatData("finger_type", finger.type) + " (" + getFingerName(finger.type) + ") <br>";
			fingerString += concatJointPosition("finger_dip", finger.dipPosition);
			fingerString += concatJointPosition("finger_pip", finger.pipPosition);
			fingerString += concatJointPosition("finger_mcp", finger.mcpPosition);
			fingerString += "<br>";
		}

		frameString += handString;
		frameString += fingerString;
	}

	output.innerHTML = frameString;

});
*/
