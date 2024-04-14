import {
	EventDispatcher,
	Quaternion,
	Vector3
} from 'three';
import * as THREE from 'three';
import { customObjects } from './customObjects';


const _changeEvent = { type: 'change' };

export class PlayerControls extends EventDispatcher {

	constructor( object, domElement ) {

		super();

		this.object = object;
		this.domElement = domElement;

		// API

		// Set to false to disable this control
		this.enabled = true;

		this.movementSpeed = 1.0;

		this.dragToLook = false;
		this.autoForward = false;

		// disable default target object behavior

		// internals

		const scope = this;

		const EPS = 0.000001;

		const lastQuaternion = new Quaternion();
		const lastPosition = new Vector3();

		this.tmpQuaternion = new Quaternion();

		this.status = 0;
		this.rotation = new THREE.Euler(0,0,1)
		var moveState = { up: 0.0, down: 0.0, left: 0.0, right: 0.0};

		// Code for displaying character
			// is a cube for now
		
		this.shape = customObjects.createCylinder(2 ,2 ,3 ,false, 0);
		

		var moveMult=1;

		
		this.updateMovementVector = function ( event ){
			this.shape.position.x+=((moveState.right + moveState.left)*moveMult);
			this.shape.position.y+=((moveState.up + moveState.down)*moveMult);
		};

		
		this.updateRotation = function (event){
			let goingDirectrion = Math.cos((moveState.up + moveState.down)/(moveState.right + moveState.left));
			let currentirection = Math.cos((this.shape.rotation.y)/(this.shape.rotation.x))
			// this.shape.rotateOnWorldAxis(new Vector3(0,0,1), goingDirectrion-currentirection);
		};


		this.keydown = function ( event ) {

			if ( event.altKey || this.enabled === false ) {

				return;

			}
			
			switch ( event.code ) {

				case 'ShiftLeft':
				case 'ShiftRight': moveMult = 3; break;

				case 'KeyW': moveState.up = 1.0; break;
				case 'KeyS': moveState.down = -1.0; break;

				case 'KeyA': moveState.left = -1.0; break;
				case 'KeyD': moveState.right = 1.0; break;


			}

		};

		this.keyup = function ( event ) {

			if ( this.enabled === false ) return;

			switch ( event.code ) {

				case 'ShiftLeft':
				case 'ShiftRight': moveMult = 1; break;

				case 'KeyW': moveState.up = 0.0; break;
				case 'KeyS': moveState.down = 0.0; break;

				case 'KeyA': moveState.left = 0.0; break;
				case 'KeyD': moveState.right = 0.0; break;

			}
		};
		

		this.contextMenu = function ( event ) {

			if ( this.enabled === false ) return;

			event.preventDefault();

		};

		this.goingDirectrion = function (event ) {
			return new Vector3((moveState.right + moveState.left),(moveState.up + moveState.down),0).normalize();
		}

		

		this.update = function ( delta ) {

			if ( this.enabled === false ) return;

			const moveMult = delta * scope.movementSpeed;
			const rotMult = delta * scope.rollSpeed;

			scope.object.translateX( scope.moveVector.x * moveMult );
			scope.object.translateY( scope.moveVector.y * moveMult );
			scope.object.translateZ( scope.moveVector.z * moveMult );

			
			if (
				lastPosition.distanceToSquared( scope.object.position ) > EPS ||
				8 * ( 1 - lastQuaternion.dot( scope.object.quaternion ) ) > EPS
			) {

				scope.dispatchEvent( _changeEvent );
				lastQuaternion.copy( scope.object.quaternion );
				lastPosition.copy( scope.object.position );

			}

		}
		
	}}