import React from 'react';

import { Box } from 'rebass';
import { Canvas } from './components/Canvas';
import { ControlBar } from './components/ControlBar';

import './App.css';

function App() {
  return (
    <>
      <Canvas canvasId="canvas-one">
        <Box height="200px" width="100%" sx={{ border: '1px solid black' }}>
          <Box height="50px" width="50px" sx={{ border: '1px solid black' }}>
            Box
          </Box>
          <Box height="50px" width="50px" sx={{ border: '1px solid black' }}>
            Box
          </Box>
          <Box height="50px" width="50px" sx={{ border: '1px solid black' }}>
            Box
          </Box>
        </Box>
      </Canvas>

      <ControlBar>
        <Box>Add Element</Box>
      </ControlBar>
    </>
  );
}

export default App;
