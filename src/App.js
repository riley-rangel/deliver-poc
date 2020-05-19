import React from 'react';

import { Box } from 'rebass';
import { Canvas } from './components/Canvas';
import { ControlBar } from './components/ControlBar';

import './App.css';

function App() {
  const [activeEl, setActiveEl] = React.useState();

  const addElementToActive = React.useCallback(() => {
    console.log(activeEl);
    if (activeEl) {
      const el = document.createElement('div');
      el.appendChild(document.createTextNode('New Element Added!'));
      activeEl.appendChild(el);
    }
  }, [activeEl]);

  const removeActiveElement = React.useCallback(() => {
    setActiveEl(undefined);
    activeEl.parentElement.removeChild(activeEl);
  }, [activeEl]);

  return (
    <>
      <Canvas
        canvasId="canvas-one"
        activeElement={activeEl}
        onSelectElement={setActiveEl}
      >
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

      {Boolean(activeEl) && (
        <ControlBar>
          <Box onClick={addElementToActive}>Add Element</Box>
          <Box onClick={removeActiveElement}>Remove Element</Box>
        </ControlBar>
      )}
    </>
  );
}

export default App;
