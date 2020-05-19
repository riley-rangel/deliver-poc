import React from 'react';

import { Box } from 'rebass';
import { Canvas } from './components/Canvas';
import { Control, ControlBar } from './components/ControlBar';

import './App.css';

function App() {
  const canvasRef = React.useRef();
  const [activeEl, setActiveEl] = React.useState();
  const [selectableEl, setSelectableEl] = React.useState();

  /**
   * Update active element on click.
   */
  React.useEffect(() => {
    const { current: canvas } = canvasRef;

    const updateActiveEl = () => {
      setActiveEl(selectableEl);
    };

    canvas.addEventListener('click', updateActiveEl);

    return () => {
      canvas.removeEventListener('click', updateActiveEl);
    };
  }, [selectableEl]);

  /**
   * Updates the state of the current selectable element.
   */
  React.useEffect(() => {
    const { current: canvas } = canvasRef;

    const updateSelectableEl = ({ pageX, pageY }) => {
      let closestElToMouse = document.elementFromPoint(pageX, pageY);

      if (selectableEl !== closestElToMouse) {
        setSelectableEl(closestElToMouse);
      }
    };

    canvas.addEventListener('mousemove', updateSelectableEl);

    return () => {
      canvas.removeEventListener('mousemove', updateSelectableEl);
    };
  }, [selectableEl]);

  /**
   * Removes the selectable element when user leaves the canvas.
   */
  React.useEffect(() => {
    const { current: canvas } = canvasRef;

    const removeSelectableEl = () => {
      setSelectableEl(undefined);
    };

    canvas.addEventListener('mouseleave', removeSelectableEl);

    return () => {
      canvas.removeEventListener('mouseleave', removeSelectableEl);
    };
  }, []);

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
        ref={canvasRef}
        canvasId="canvas-one"
        activeEl={activeEl}
        selectableEl={selectableEl}
      />

      {Boolean(activeEl) && (
        <ControlBar>
          <Control onClick={addElementToActive}>Add Element</Control>
          <Control
            // Prevent users from removing the canvas
            disabled={Boolean(activeEl.getAttribute('data-canvasid'))}
            onClick={removeActiveElement}
          >
            Remove Element
          </Control>
        </ControlBar>
      )}
    </>
  );
}

export default App;
