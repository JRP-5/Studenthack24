import * as THREE from 'three';
import { log } from 'three/examples/jsm/nodes/Nodes.js';


export class Planet {
    constructor(name, radius, orbitDistance, orbitTime){
        let color = new THREE.Color(0xffffff);
        this.name = name;
        this.orbitDistance = orbitDistance;
        this.orbitTime = orbitTime;
        this.pos = new THREE.Vector3(orbitDistance, 0, 0);
        this.radius = radius;
        this.importantInfo = "text file";
        
        //create the sphere of the planet
        this.geometry = new THREE.SphereGeometry(5); 
        const material = new THREE.MeshBasicMaterial( { color: color.setHex(Math.random() * 0xffffff) } ); 

        const texture = new THREE.TextureLoader().load('./src/' +name+ '.jpg' ); 
        const surface = new THREE.MeshBasicMaterial( { map:texture } );

        this.sphere = new THREE.Mesh( this.geometry, surface ); 
        this.sphere.position.set(orbitDistance, 0, 0);
        
        // Create the orbit
        
          
    } 
    

    getSphere() {
        return this.sphere;
    }

    /**
     * 
     * @param {Array of all planets} planets 
     */
     static updatePositions(planets, pivot, timePasses){
        let time = timePasses
        time += 1;

        //let timePasses = timePasses;
        for (let i =0; i<planets.length; i++){
            let plan = planets[i];
            pivot.add(plan.sphere);
            let angle = (time*2*Math.PI)/(plan.orbitTime*24*60);
            // let dist = plan.orbitDistance*1000;
            // let orbitSpeed = plan.orbitTime/(2*Math.PI*24*60*60);
            // let velocity = dist*orbitSpeed;
            
            // let F = (velocity**2)/dist;
            
            // let ac = dist*(orbitSpeed**2);
            // let at = orbitSpeed**2/dist;
            // let angle = Math.atan(ac/at);
            let x = (plan.orbitDistance)*Math.cos(angle);
            let y = (plan.orbitDistance)*Math.sin(angle);

            //plan.sphere.rotateOnAxis(0.1);
            plan.sphere.position.set(x,y,0);
        }
        
    }
}