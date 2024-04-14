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
        this.geometry = new THREE.SphereGeometry(radius); 
        const material = new THREE.MeshBasicMaterial( { color: color.setHex(Math.random() * 0xffffff) } ); 
        this.sphere = new THREE.Mesh( this.geometry, material ); 
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
        //let timePasses = timePasses;
        for (let i =0; i<planets.length; i++){
            let plan = planets[i];
            pivot.add(plan.sphere);
            // let dist = plan.orbitDistance*1000;
            // let orbitSpeed = plan.orbitTime/(2*Math.PI*24*60*60);
            // let velocity = dist*orbitSpeed;
            
            // let F = (velocity**2)/dist;
            
            // let ac = dist*(orbitSpeed**2);
            // let at = orbitSpeed**2/dist;
            // let angle = Math.atan(ac/at);
            let x = plan.orbitDistance*Math.cos((this.timePasses*2*Math.PI)/plan.orbitTime);
            let y = plan.orbitDistance*Math.sin((this.timePasses*2*Math.PI)/plan.orbitTime);

            plan.sphere.rotateOnAxis(0.1);
            console.log("help me");
            
            plan.sphere.position.set(x, y, 0);
        }
        
    }
}