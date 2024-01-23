import './App.css'
import styled from 'styled-components';
import { Canvas } from '@react-three/fiber';
import { Suspense,useState } from 'react';
import Globe from './components/Globe/Globe';
import Navbar from './components/Navbar/Navbar';

const CanvasContainer=styled.div`
   width:100%;
   height:100%;
`;

const App=()=>{
  
  const [globeCoordinates, setGlobeCoordinates] = useState({ lat: null, lon: null });
  const updateGlobeCoordinates = (lat, lon) => {
    setGlobeCoordinates({ lat, lon });
  };

  return(
    <CanvasContainer>
        <Navbar updateCoordinates={updateGlobeCoordinates}/>
        <Canvas>
           <Suspense fallback={null}>
              <Globe coordinates={globeCoordinates}/>
           </Suspense>
        </Canvas>
    </CanvasContainer>
  );
}

export default App;