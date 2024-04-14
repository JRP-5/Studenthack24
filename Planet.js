import * as THREE from 'three';
import { log } from 'three/examples/jsm/nodes/Nodes.js';

export class Planet {
    constructor(name, radius, orbitDistance, rotationSpeed, orbitTime){
        this.name = name;
        this.orbitDistance = orbitDistance;
        this.orbitTime = orbitTime;
        this.radius = radius;
        this.rotationSpeed = rotationSpeed;
        this.importantInfo = "text file";
        
        // Create the sphere of the planet
        const geometry = new THREE.SphereGeometry(radius);
        const texture = new THREE.TextureLoader().load('./src/' + name + '.jpg');
        const surface = new THREE.MeshBasicMaterial({ map: texture });
        this.sphere = new THREE.Mesh(geometry, surface);
        this.sphere.position.set(orbitDistance, 0, 0);
    } 

    getSphere() {
        return this.sphere;
    }

    static updatePositions(planets, timePasses){
        let time = timePasses + 1; // Increment time

        for (let i = 0; i < planets.length; i++){
            let planet = planets[i];
            

            // Calculate angle based on time and orbit time
            let angle = (time * 2 * Math.PI) / (planet.orbitTime * 24 * 60);

            // Calculate x and y coordinates in a circular fashion
            let x = planet.orbitDistance * Math.cos(angle);
            let y = planet.orbitDistance * Math.sin(angle);

            // Set position relative to the origin (0, 0, 0)
            planet.sphere.position.set(x, y, 0);

            // Update rotation
            planet.sphere.rotation.y -= planet.rotationSpeed;
        }
    }
    static getCollision(planets, playerPos){
        for (let i = 0; i < planets.length; i++){
            let planet = planets[i];
            if (playerPos.distanceTo(planet.sphere.position)<10){
                return planet;
            }
        }
        return null;
    };
}
