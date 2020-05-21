import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Text, Box } from 'rebass';

import { Button } from './components/Button';
import { Canvas } from './components/Canvas';
import { ControlBar, Space } from './components/ControlBar';
import { useModal } from './components/Modal';

import * as elements from './elements';

import './App.css';

function App() {
  const canvasRef = useRef();
  const [activeEl, setActiveEl] = useState();
  const [selectableEl, setSelectableEl] = useState();
  const [modalActions, Modal] = useModal();

  /**
   * Update active element on click.
   */
  useEffect(() => {
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
  useEffect(() => {
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
  useEffect(() => {
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
  useEffect(() => {
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

  const addNewElement = useCallback(
    (element) => {
      const el = document.createElement(element.defaultType);
      el.appendChild(document.createTextNode(element.label));
      el.setAttribute('data-canvas-element-type', element.name);
      activeEl.appendChild(el);
      setActiveEl(el);
      modalActions.close();
    },
    [activeEl, modalActions]
  );

  /**
   * Remove element implementation. This one will need re-organization beyond POC to accomplish the below.
   * Ideally, would like to abstract this as far away so that it really boils down to what the user is trying to do, and the implementation can be changed as the DOM API changes without affecting the app as a whole.
   */
  const removeActiveElement = useCallback(() => {
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
        <ControlBar orientation="horizontal" sideX="left" sideY="bottom">
          <Button onClick={modalActions.open}>Add Element</Button>
          <Button
            // Prevent users from removing the canvas
            disabled={Boolean(activeEl.getAttribute('data-canvasid'))}
            onClick={removeActiveElement}
          >
            Remove Element
          </Button>
        </ControlBar>
      )}

      {Boolean(activeEl) && (
        <ControlBar orientation="vertical" sideX="right" sideY="top">
          <Space />
        </ControlBar>
      )}

      <Modal>
        <Box>
          <Text mb="1rem">What would you like to add to the page?</Text>

          <Box display="grid" sx={{ gridTemplateColumns: '1fr 1fr' }}>
            <Button
              onClick={() => addNewElement(elements.layout)}
              sx={{ border: '2px solid black' }}
            >
              Layout
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default App;
