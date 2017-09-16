var windowHalfX = window.innerWidth / 2,
windowHalfY = window.innerHeight / 2,
mouseX = 0, 
mouseY = 0,
targetM = 0,
globalmove = -1,
globalpos = 10,
offsets = [],
order = 0,
count,
random = [0,0,0],
local = [0,0,0],
camera, scene, renderer;
init();
animate();

function init() {
	var container = document.getElementById('anim');
	camera = new THREE.PerspectiveCamera( 75, container.offsetWidth / container.offsetHeight, 1, 10000 );
	camera.position.z = 8;
	scene = new THREE.Scene();
	renderer = new THREE.CanvasRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize(container.offsetWidth, container.offsetHeight);
	renderer.setClearColor( 0xf6e60a, 1);
	container.appendChild( renderer.domElement );
	
	var radius = 5;
	var segments = 100;
	var material = new THREE.LineBasicMaterial( { color: 0x000000 } );
	var geometry = new THREE.CircleGeometry( radius, segments );
	var position = [];
	geometry.vertices.shift();
	for (var i = 9; i > 0; i--) {
	  	circle = new THREE.Line(geometry, material);
	  	circle.position.x = (Math.random()-0.5)/1.5;
		circle.position.y = (Math.random()-0.5)/1.5;
		scene.add(circle);
	}
	window.addEventListener( 'resize', onWindowResize, false );	
}


//if I hover over the vertical div, then the circle should do the global big move
$( "div.centered" )
  .mouseenter(function() {
  	if (order == 0){
  		count = 0
  		order = 1
  	}
  })
  .mouseleave(function() {
	if (order == 0){  	
	  	count = 0
	  	order = -1
		for (var l = 8; l >= 0; l--) {
			offsets[l] = [(Math.random()-0.5)/1.5, (Math.random()-0.5)/1.5]
		}
	}
});

function onWindowResize() {
	var container = document.getElementById('anim');
	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;
	camera.aspect = container.offsetWidth / container.offsetHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( container.offsetWidth, container.offsetHeight );
}

//animation of the circles
function animate() {
	//lower framerate
	setTimeout( function() {
        requestAnimationFrame( animate );
    }, 1000 / 26);
	//moving the circles either in by a large or by small random amounts
	if (globalmove !== 0) {
		globalpos += ( targetM -  globalpos) * 0.05;
		if (Math.abs(targetM -  globalpos) < 0.005) {
			globalmove = 0;
		}
	} else {
		for (var k = 2; k >= 0; k--) {	
			if (Math.abs(random[k] - local[k]) < 0.01)
				random[k] = (Math.random()-0.5)*2;
			local[k] += (random[k] - local[k])*0.05;
		}
	}
	//updating the location of each circle
	for (var l = 2; l >= 0; l--) {
		scene.children[l].position.z = globalpos + local[l];
		scene.children[l+3].position.z = globalpos*(l+3) - 0.7 * local[l];
		scene.children[l+6].position.z = globalpos*(l+6) + 0.5 * local[l];
	}


	//centering the circle
	if (order == 1) {
		if (count < 4){
			count++;
			for (var l = 8; l >= 0; l--) {
				scene.children[l].position.x -= scene.children[l].position.x * 0.25;
				scene.children[l].position.y -= scene.children[l].position.y * 0.25;
			}
		} else {
			order = 0;
		}
	} else if (order == -1) {
		if (count < 4){
			count++;
			for (var l = 8; l >= 0; l--) {
				scene.children[l].position.x += offsets[l][0] * 0.25;
				scene.children[l].position.y += offsets[l][1] * 0.25;
			}
		} else {
			order = 0;
		}
	}

	renderer.render( scene, camera );
}


//Color changing header and titles
colors = ['#FFE82C','#F1C40F', '#8DC85E', '#27AE60', '#1ABC9C', '#A6DBD6', '#93AED4', '#00669F', '#9B59B6', '#EB4E32', '#F47B6C', '#FBCBC5', '#AC8B67'];
var items = document.querySelectorAll('.color'),
currentColorIndex = 0,
totalColors = colors.length;

for (var i = 0; i < items.length; i++) {
	items[i].addEventListener('click', function() {
	    currentColorIndex = (currentColorIndex + 1)%totalColors;
	    currentColor = colors[currentColorIndex];
	    renderer.setClearColor( currentColor, 1);
	    $('.color')
	    	.css('background-color', '')
		    .css('background-color', currentColor);
	});
}

//Smooth sroll
var $root = $('html, body');
$('a').click(function() {
    $root.animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top
    }, 500);
    return false;
});