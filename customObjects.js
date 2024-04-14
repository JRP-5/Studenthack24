import * as THREE from 'three';

class customObjects {
    constructor(){
        
    }

    static createCylinder( radiusBottom, height, heightSegments, openEnded, thetaStart) {
        const geometry = new THREE.CylinderGeometry(0, radiusBottom, height, 3, heightSegments, openEnded, thetaStart, 2*Math.PI);
        const material = new THREE.MeshBasicMaterial({ color : 0x00ff00 });
        const cylinder = new THREE.Mesh(geometry, material);
        return cylinder; // Return the cylinder mesh for further manipulation if needed
    }
    
    static createTube() {
        const geometry = new THREE.TubeGeometry(Curve, 100, 1, 1, false);
        const material = new THREE.MeshBasicMaterial({color: 0x0000ff });
        const tube = new THREE.Mesh(geometry, material);
        return tube; // Return the tube mesh for further manipulation if needed
    }

    static  getRing(){
         return this.ring;
    }
    

    static createRing(innerRadius, outterRadius, Color) {
        const geometry = new THREE.RingGeometry(innerRadius,outterRadius,300,300,0,2*Math.PI);
        const material = new THREE.MeshBasicMaterial({color: Color });
        const ring = new THREE.Mesh(geometry, material);
        return ring; // Return the tube mesh for further manipulation if needed
    }

    static createRingWithMat(innerRadius, outterRadius) {
        const geometry = new THREE.RingGeometry(innerRadius,outterRadius,300,300,0,2*Math.PI);
        const transMat = new THREE.MeshBasicMaterial({
        color: 0xffFD01,
        });
        const ring = new THREE.Mesh(geometry, transMat);
        return ring; // Return the tube mesh for further manipulation if needed
    }

    static createSphere() {
        const geometry = new THREE.SphereGeometry(60);

        const texture = new THREE.TextureLoader().load('./src/sun.png'); 
        const sun_surface = new THREE.MeshBasicMaterial({ map: texture });

        const sphere = new THREE.Mesh(geometry, sun_surface);

       // Set up continuous rotation
        function rotateSphere() {
            sphere.rotation.y += 0.01; // Adjust rotation speed as needed
            requestAnimationFrame(rotateSphere);
        }
        rotateSphere(); // Start the rotation loop

        return sphere;
    }

}

export { customObjects };

