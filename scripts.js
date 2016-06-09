var mouseX = 0, mouseY = 0,
windowHalfX = window.innerWidth / 2,
windowHalfY = window.innerHeight / 2,
SEPARATION = 200,
AMOUNTX = 10,
AMOUNTY = 10,
camera, scene, renderer;
var targetRotation = 0;
var targetRotationOnMouseDown = 0;
var mouseXOnMouseDown = 0;



init();
animate();
function init() {
	var container, separation = 100, amountX = 50, amountY = 50,
	particles, particle;
	container = document.getElementById('animation');
	camera = new THREE.PerspectiveCamera( 75, container.offsetWidth / container.offsetHeight, 1, 10000 );
	camera.position.z = 100;
	camera.position.y = -300;
	scene = new THREE.Scene();
	renderer = new THREE.CanvasRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize(container.offsetWidth, container.offsetHeight);
	renderer.setClearColor( 0xffffff, 1);
	container.appendChild( renderer.domElement );

	// particles
	var PI2 = Math.PI * 2;
	var material = new THREE.SpriteCanvasMaterial( {
		color: 0x000000,
		program: function ( context ) {
			context.beginPath();
			context.arc( 0, 0, 0, 0, PI2, true );
			context.fill();
		}
	} );
	var geometry = new THREE.Geometry();
	for ( var i = 0; i < 100; i ++ ) {
		particle = new THREE.Sprite( material );
		particle.position.x = Math.random() * 2 - 1;
		particle.position.y = Math.random() * 2 - 1;
		particle.position.z = Math.random() * 2 - 1;
		particle.position.normalize();
		particle.position.multiplyScalar( Math.random() * 10 + 450 );
		particle.scale.x = particle.scale.y = 10;
		scene.add( particle );
		geometry.vertices.push( particle.position );
	}
	// lines
	var line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.5 } ) );
	scene.add( line );
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );	
	window.addEventListener( 'resize', onWindowResize, false );
}
function onWindowResize() {
	container = document.getElementById('animation');
	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;
	camera.aspect = container.offsetWidth / container.offsetHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( container.offsetWidth, container.offsetHeight );
}

function onDocumentMouseMove( event ) {
	mouseX = event.clientX - windowHalfX;
	targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.02;
}

function animate() {
	requestAnimationFrame( animate );
	render();
}

function render() {
	scene.rotation.y += ( targetRotation - 15*scene.rotation.y ) * 0.001;
	renderer.render( scene, camera );
}