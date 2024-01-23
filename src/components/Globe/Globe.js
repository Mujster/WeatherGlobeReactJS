import React, { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { OrbitControls , Stars } from "@react-three/drei";
import * as THREE from 'three';
import EarthDayMap from '../assets/textures/8k_earth_daymap.jpg';
import EarthNormalMap from '../assets/textures/8k_earth_normal_map.jpg';
import EarthCloudsMap from '../assets/textures/8k_earth_clouds.jpg';
import EarthSpecularMap from '../assets/textures/8k_earth_specular_map.jpg';


const Globe=({coordinates})=>{
    const[colorMap,normalMap,specularMap,cloudsMap]=useLoader(TextureLoader,[EarthDayMap,EarthNormalMap,EarthSpecularMap,EarthCloudsMap]); 
    const EarthRef=useRef();
    const CloudRef=useRef();
    const ControlRef=useRef();
       useFrame(({clock,camera})=>{
        const elapsedTime=clock.getElapsedTime();
        // EarthRef.current.rotation.y=elapsedTime/100;
        CloudRef.current.rotation.y=elapsedTime/80;
        if (coordinates && coordinates.lat !== null && coordinates.lon !== null) {
            const { lat, lon } = coordinates;
            const radius = 1;
            const phi = THREE.MathUtils.degToRad(90 - lat);
            const theta = THREE.MathUtils.degToRad(360 - lon);

            const targetPosition = new THREE.Vector3(
                radius * Math.sin(phi) * Math.cos(theta)-0.07,
                radius * Math.cos(phi),
                radius * Math.sin(phi) * Math.sin(theta)
            ).multiplyScalar(1.2);

            console.log(lat);
            console.log(lon);
            console.log(targetPosition);

            const targetQuaternion = new THREE.Quaternion().setFromUnitVectors(
                new THREE.Vector3(0, 0, 1),
                targetPosition.clone().normalize()
            );
            camera.position.lerp(targetPosition, 0.05);
            camera.quaternion.slerp(targetQuaternion, 0.05);
            ControlRef.current.update();
        }
    });

    return(
        <>
            <ambientLight intensity={2}/>
           <pointLight color="#f6f3ea" position={[2,0,2]} intensity={10.2}/>
           <Stars radius={300} depth={60} count={15000} factor={5} saturation={0} fade={true}/>
           <mesh ref={CloudRef}>
               <sphereGeometry args={[1.005,100,100]}/>
               <meshPhongMaterial 
                   map={cloudsMap} 
                   opacity={0.4} 
                   depthWrite={true} 
                   transparent={true} 
                   side={THREE.DoubleSide}
                />
           </mesh>
           <mesh ref={EarthRef}> 
              <sphereGeometry args={[1,100,100]}/>
              <meshPhongMaterial specularMap={specularMap} />
              <meshStandardMaterial map={colorMap} normalMap={normalMap} metalness={0.4} roughness={0.5}/>
              <OrbitControls ref={ControlRef}
                 enableZoom={true} 
                 enablePan={true} 
                 enableRotate={true} 
                 zoomSpeed={0.6} 
                 panSpeed={0.5} 
                 rotateSpeed={0.4}
                 minDistance={1.25}
                 maxDistance={5}
               />
           </mesh>
        </>
    );
};

export default Globe;
