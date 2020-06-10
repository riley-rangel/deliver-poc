import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Text, Box } from 'rebass';

import { Button } from './components/Button';
import { Canvas } from './components/Canvas';
import { Collapse } from './components/Collapse';
import { ControlBar, Space, Height } from './components/ControlBar';
import {
  ActiveIndicator,
  SelectableIndicator,
} from './components/ElementIndicators';
import { useModal } from './components/Modal';

import * as elements from './elements';

import './App.css';
import Group from './components/ControlBar/Group';

function App() {
  const canvasRef = useRef();
  const [activeEl, setActiveEl] = useState();
  const [selectableEl, setSelectableEl] = useState();
  const [activeKey, setActiveKey] = useState(0);
  const [modalActions, Modal] = useModal();

  /**
   * Identify selectable element.
   */
  useEffect(() => {
    if (selectableEl) {
      selectableEl.setAttribute('data-selectable', true);
    }

    return () => {
      if (selectableEl) {
        selectableEl.removeAttribute('data-selectable');
      }
    };
  }, [selectableEl]);

  /**
   * Identify active element.
   */
  useEffect(() => {
    if (activeEl) {
      activeEl.setAttribute('data-active', true);
    }

    return () => {
      if (activeEl) {
        activeEl.removeAttribute('data-active');
      }
    };
  }, [activeEl]);

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

    const updateSelectableEl = ({ clientX, clientY }) => {
      let closestElToMouse = document.elementFromPoint(clientX, clientY);

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
   * Force active element indicator to re-render using react key change on attr update.
   */
  useEffect(() => {
    if (activeEl) {
      const observer = new MutationObserver(() => {
        activeKey === 0 ? setActiveKey(1) : setActiveKey(0);
      });

      observer.observe(activeEl, { attributes: true });

      return () => {
        observer.disconnect();
      };
    }
  }, [activeKey, activeEl]);

  /**
   * Applies style properties to provided element.
   */
  const updateStyles = useCallback((element, properties) => {
    Object.keys(properties).forEach((property) => {
      const newValue = properties[property];
      element.style[property] = newValue;
    });
  }, []);

  /**
   * Add a new child element to provided element.
   */
  const addNewElement = useCallback(
    (element) => {
      const el = document.createElement(element.defaultType);
      el.appendChild(document.createTextNode(element.label));
      el.setAttribute('data-canvas-element-type', element.name);
      updateStyles(el, element.defaultStyles);
      activeEl.appendChild(el);
      setActiveEl(el);
      modalActions.close();
    },
    [activeEl, modalActions, updateStyles]
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
      <Text
        bg="black"
        p={1}
        color="white"
        sx={{ position: 'fixed', bottom: 0, right: 0 }}
      >
        {process.env.REACT_APP_VERSION}
      </Text>

      <Canvas
        ref={canvasRef}
        canvasId="canvas-one"
        hasActiveElement={Boolean(activeEl)}
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

      {Boolean(activeEl) && !activeEl.getAttribute('data-canvasid') && (
        <ControlBar
          orientation="vertical"
          sideX="right"
          sideY="top"
          width="200px"
        >
          <Box m="-2px">
            <Collapse label="Dimensions" orientation="vertical">
              <Group label="Height / Width">
                <Height />
              </Group>

              <Group label="Space">
                <Space
                  onChange={(properties) => {
                    updateStyles(activeEl, properties);
                  }}
                />
              </Group>
            </Collapse>
          </Box>
        </ControlBar>
      )}

      <Modal>
        <Box>
          <Text mb="1rem">What would you like to add to the page?</Text>

          <Box display="grid" sx={{ gridTemplateColumns: '1fr 1fr' }}>
            <Button bordered onClick={() => addNewElement(elements.layout)}>
              Layout
            </Button>
          </Box>
        </Box>
      </Modal>

      {selectableEl && (
        <SelectableIndicator
          clientRect={selectableEl.getBoundingClientRect()}
        />
      )}

      {activeEl && (
        <ActiveIndicator
          key={`element-key-${activeKey}`}
          clientRect={activeEl.getBoundingClientRect()}
          computedStyles={getComputedStyle(activeEl)}
        />
      )}
    </>
  );
}

export default App;
