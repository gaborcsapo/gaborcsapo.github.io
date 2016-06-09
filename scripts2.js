var windowHalfX = window.innerWidth / 2,
windowHalfY = window.innerHeight / 2,
mouseX = 0, 
mouseY = 0,
targetM = 0,
globalmove = -1,
globalpos = 10,
random = [0,0,0],
local = [0,0,0],
camera, scene, renderer;
init();
animate();

function init() {
	var container = document.getElementById('animation');
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
$( "div.vertical" )
  .mouseenter(function() {
    globalmove = 1;
    targetM = 0.5;
  })
  .mouseleave(function() {
    globalmove = -1;
    targetM = 0;
});

function onWindowResize() {
	var container = document.getElementById('animation');
	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;
	camera.aspect = container.offsetWidth / container.offsetHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( container.offsetWidth, container.offsetHeight );
}

function animate() {
	//framerate setting
	setTimeout( function() {
        requestAnimationFrame( animate );
    }, 1000 / 26);
	//moving the circles either in by a lot or by small random amounts
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

	renderer.render( scene, camera );
}


//Color changing header
colors = ['#f6e60a', '#2ecc71', '#1abc9c', '#3498db',  '#9b59b6', '#27ae60', '#f1c40f', '#e67e22', '#e74c3c', '#4ed486', '#dc3d66', '#A88FA2', '#a2c5bf', '#e8846b', '#72BDC2'];
header = document.querySelectorAll('header')[0],
currentColorIndex = 0,
totalColors = colors.length;

header.addEventListener('click', function() {
    currentColorIndex = (currentColorIndex == totalColors - 1) ? 0 : currentColorIndex + 1;
    currentColor = colors[currentColorIndex];
    renderer.setClearColor( currentColor, 1);
    $('.yellow')
    	.css('background-color', '')
	    .css('background-color', currentColor);
});