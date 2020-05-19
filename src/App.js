import React from 'react';

import { Box, Button } from 'rebass';
import { Canvas } from './components/Canvas';
import { ControlBar } from './components/ControlBar';

import './App.css';

function App() {
  const [activeEl, setActiveEl] = React.useState();

  const addElementToActive = React.useCallback(() => {
    if (activeEl) {
      const el = document.createElement('div');
      el.appendChild(document.createTextNode('New Element Added!'));
      activeEl.appendChild(el);
    }
  }, [activeEl]);

  const removeActiveElement = React.useCallback(() => {
    activeEl.parentElement.removeChild(activeEl);
    setActiveEl(undefined);
  }, [activeEl]);

  return (
    <>
      <Canvas
        canvasId="canvas-one"
        activeElement={activeEl}
        onSelectElement={setActiveEl}
      >
        <Box width="100%" sx={{ border: '1px solid black' }}>
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
          <Button
            display="flex"
            color="black"
            alignItems="center"
            height="100%"
            p="1rem"
            onClick={addElementToActive}
            sx={{
              cursor: 'pointer',
              borderRadius: 0,
              ':hover': {
                bg: 'black',
                color: 'white',
                transition: 'background-color 300ms, color 300ms',
              },
            }}
          >
            Add Element
          </Button>
          <Button
            display="flex"
            color="black"
            alignItems="center"
            height="100%"
            p="1rem"
            onClick={removeActiveElement}
            sx={{
              cursor: 'pointer',
              borderRadius: 0,
              ':hover': {
                bg: 'black',
                color: 'white',
                transition: 'background-color 300ms, color 300ms',
              },
            }}
          >
            Remove Element
          </Button>
        </ControlBar>
      )}
    </>
  );
}

export default App;
