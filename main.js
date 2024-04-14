import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { PlayerControls} from './PlayerControls.js';
import {customObjects} from './customObjects.js';
import {Planet} from './Planet.js';
import {
	Vector3
} from 'three';

//Player score
var score = 0;

const renderer = new THREE.WebGLRenderer({antialias: true});
const rotationSpeed = 0.1; 
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
scene.add(camera);
// const renderer = new THREE.WebGLRenderer({});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const cube = new PlayerControls(camera, renderer.domElement);
cube.movementSpeed = 10000;

scene.add(cube.shape);

// const Earth = new Planet("Earth", 40, 40, 100);
// const sphere = Earth.getSphere();
// scene.add(sphere);


cube.domElement = renderer.domElement;

function keyDown(e){
	cube.keydown(e);
}
var pivot = new THREE.Group();
pivot.position.set(0,0,0);
scene.add( pivot );
var timePasses = 1;
function keyUP(e){
	cube.keyup(e);
	if(e.code == "Space"){		
		for(let i = 0; i < 50; i++){
			timePasses = timePasses + 1;
		console.log("Time passed" + timePasses)
		Planet.updatePositions(planets, pivot, timePasses);
		}
	}
}

document.addEventListener( 'keydown', keyDown );
document.addEventListener( 'keyup', keyUP );


// const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// const cube = new THREE.Mesh( geometry, material );

// scene.add( cube.getShape() );

//Adding directional lights
var directionalLight = new THREE.DirectionalLight(0xffffff, 100);
directionalLight.position.set(0,0,0);
directionalLight.castShadow = true;
scene.add(directionalLight);

function createPlanets(){
	let planets = ["mercury", "venus", "earth", "mars", "jupiter", "saturn", "uranus", "neptune", "pluto"];
	let plans = [];
	let diameters = [4879, 12104, 12756, 6792, 142984, 120536, 51118, 49528, 2376];
	//diameters = [10] * 9
	let rotationSpeed = [0.25,0.01,0.1,0.105,0.25,0.05,0.075,0.7,0.03]
	let orbitDistances = [57.9, 108.2, 149.6, 228.0, 778.5, 1432.0, 2867, 4515.0, 5906.4];
	let orbitTimes = [88, 224.7, 365.2, 687, 4331, 10747, 30589, 59800, 90560];

	for (let i = 0; i < planets.length; i++){
		let planet = new Planet(planets[i], 3*getDiameter(diameters[i]/2), 60*Math.log(orbitDistances[i]/5), rotationSpeed[i],
		getDiameter(orbitTimes[i])
		);
		plans.push(planet);
	}
	return plans;
	//let mercury = new Planet("Mercury", getDiameter(4879/2));
};

var planets = createPlanets();
const addToScene = (plan) => scene.add(plan.getSphere());
planets.every(addToScene);
// for(let planet in planets){

// 	scene.add(planet.getSphere());
// }

function createOrbitPath(){
	let orbitDistances = [57.9, 108.2, 149.6, 228.0, 778.5, 1432.0, 2867, 4515.0, 5906.4];
	let orbitPath = [];
	for (let i = 0; i < planets.length; i++){
		let path = customObjects.createRing(60*Math.log(orbitDistances[i]/5),60*Math.log(orbitDistances[i]/5) + 0.2, 0xFFFFFFF
		);
		orbitPath.push(path);
	}

	return orbitPath
}

var paths = createOrbitPath();
const addPath = (path) => scene.add(path);
paths.every(addPath);


camera.position.z = 100;

var sun = customObjects.createSphere();
scene.add(sun)


var golden_ring = customObjects.createRingWithMat(195,215);
scene.add(golden_ring)

function animate() {
    requestAnimationFrame( animate );
	
	// Planet.updatePositions(planets);
	
	cube.updateMovementVector();
	renderer.render( scene, camera );
	timePasses ++;
	Planet.updatePositions(planets, pivot, timePasses);
	
	camera.translateX(cube.shape.position.x-camera.position.x);
	camera.translateY(cube.shape.position.y-camera.position.y);

	// cube.updateRotation();

};


function getDiameter(realD){
	return Math.log10(realD)/Math.log10(100);
};

// stars
const radius = 10;
const r = radius, starsGeometry = [ new THREE.BufferGeometry(), new THREE.BufferGeometry() ];
const vertices1 = [];
const vertices2 = [];
const vertex = new THREE.Vector3();
for ( let i = 0; i < 250; i ++ ) {
	vertex.x = Math.random() * 2 - 1;
	vertex.y = Math.random() * 2 - 1;
	vertex.z = Math.random() * 2 - 1;
	vertex.multiplyScalar( r );
	vertices1.push( vertex.x, vertex.y, vertex.z );
}
for ( let i = 0; i < 1500; i ++ ) {
	vertex.x = Math.random() * 2 - 1;
	vertex.y = Math.random() * 2 - 1;
	vertex.z = Math.random() * 2 - 1;
	vertex.multiplyScalar( r );
	vertices2.push( vertex.x, vertex.y, vertex.z );
}
starsGeometry[ 0 ].setAttribute( 'position', new THREE.Float32BufferAttribute( vertices1, 3 ) );
starsGeometry[ 1 ].setAttribute( 'position', new THREE.Float32BufferAttribute( vertices2, 3 ) );
const starsMaterials = [
	new THREE.PointsMaterial( { color: 0x9c9c9c, size: 2, sizeAttenuation: false } ),
	new THREE.PointsMaterial( { color: 0x9c9c9c, size: 1, sizeAttenuation: false } ),
	new THREE.PointsMaterial( { color: 0x7c7c7c, size: 2, sizeAttenuation: false } ),
	new THREE.PointsMaterial( { color: 0x838383, size: 1, sizeAttenuation: false } ),
	new THREE.PointsMaterial( { color: 0x5a5a5a, size: 2, sizeAttenuation: false } ),
	new THREE.PointsMaterial( { color: 0x5a5a5a, size: 1, sizeAttenuation: false } )
];
for ( let i = 10; i < 30; i ++ ) {
	const stars = new THREE.Points( starsGeometry[ i % 2 ], starsMaterials[ i % 6 ] );
	stars.rotation.x = Math.random() * 6;
	stars.rotation.y = Math.random() * 6;
	stars.rotation.z = Math.random() * 6;
	stars.scale.setScalar( i * 10 );
	stars.matrixAutoUpdate = false;
	stars.updateMatrix();
	scene.add( stars );
}

// Define a function in main.js
function myFunction() {
    // Construct the full URL of the HTML file
    const url = `${window.location.origin}/${"question_name.html"}`;

    // Open the HTML file in the current window
    window.location.href = url;
}

// Get a reference to the "Temp" link
const MercuryEvent = document.getElementById('Mercury_link');
MercuryEvent.addEventListener('click', function(event) {
    myFunction();
});

// Define a function to handle link clicks
function handlePlanetLinkClick(planetName) {
    // Construct the full URL of the HTML file corresponding to the planet
    const url = `${window.location.origin}/${planetName.toLowerCase()}_details.html`;

    // Open the HTML file in the current window
    window.location.href = url;
}

// Get references to each planet link and add event listeners
const planetLinks = document.querySelectorAll('.planet-link');
planetLinks.forEach(link => {
    const planetName = link.textContent.trim(); // Extract the planet name from the link text
    link.addEventListener('click', () => handlePlanetLinkClick(planetName));
});

animate();