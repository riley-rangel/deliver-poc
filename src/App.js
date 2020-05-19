import React from 'react';

import { Canvas } from './components/Canvas';
import { Control, ControlBar } from './components/ControlBar';

import './App.css';
import { Text } from 'rebass';

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

  /**
   * Persists user content for the duration of the session.
   */
  React.useEffect(() => {
    const { current: canvas } = canvasRef;
    const sessionKey = 'canvas-session-content';
    const content = window.sessionStorage.getItem(sessionKey);

    if (content) {
      // re-hydrate canvas
      canvas.innerHTML = content;

      // Sync active element state with re-hydrated canvas
      // Not a fan of having this up here - need to re-evaluate
      const savedActiveEl = canvas.querySelector('[data-active]');
      if (savedActiveEl) {
        setActiveEl(savedActiveEl);
      }
    }

    const observer = new MutationObserver(() => {
      window.sessionStorage.setItem(sessionKey, canvas.innerHTML);
    });

    observer.observe(canvas, {
      attributes: true,
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  /**
   * Add element implementation.
   * Ideally, would like to abstract this as far away so that it really boils down to what the user is trying to do, and the implementation can be changed as the DOM API changes without affecting the app as a whole.
   */
  const addElementToActive = React.useCallback(() => {
    if (activeEl) {
      const el = document.createElement('div');
      el.appendChild(document.createTextNode('New Element Added!'));
      activeEl.appendChild(el);
    }
  }, [activeEl]);

  /**
   * Remove element implementation. This one will need re-organization beyond POC to accomplish the below.
   * Ideally, would like to abstract this as far away so that it really boils down to what the user is trying to do, and the implementation can be changed as the DOM API changes without affecting the app as a whole.
   */
  const removeActiveElement = React.useCallback(() => {
    const { nextSibling, previousSibling, parentElement } = activeEl;
    const findFirstElement = (...args) =>
      args.find((i) => i instanceof Element);
    setActiveEl(findFirstElement(nextSibling, previousSibling, parentElement));
    activeEl.parentElement.removeChild(activeEl);
  }, [activeEl]);

  return (
    <>
      <Text sx={{ position: 'fixed', bottom: 0, right: 0 }}>
        {process.env.REACT_APP_VERSION}
      </Text>

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
