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

}

export { customObjects };

