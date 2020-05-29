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
  const [activeKey, setActiveKey] = useState(0);
  const [modalActions, Modal] = useModal();

  const selectableClient = selectableEl && selectableEl.getBoundingClientRect();
  const activeClient = activeEl && activeEl.getBoundingClientRect();
  const activeStyles = activeEl && window.getComputedStyle(activeEl);
  const overlayDim = {
    mt: activeStyles && activeStyles.getPropertyValue('margin-top'),
    mr: activeStyles && activeStyles.getPropertyValue('margin-right'),
    mb: activeStyles && activeStyles.getPropertyValue('margin-bottom'),
    ml: activeStyles && activeStyles.getPropertyValue('margin-left'),
    bt: activeStyles && activeStyles.getPropertyValue('border-top-width'),
    br: activeStyles && activeStyles.getPropertyValue('border-right-width'),
    bb: activeStyles && activeStyles.getPropertyValue('border-bottom-width'),
    bl: activeStyles && activeStyles.getPropertyValue('border-left-width'),
    pt: activeStyles && activeStyles.getPropertyValue('padding-top'),
    pr: activeStyles && activeStyles.getPropertyValue('padding-right'),
    pb: activeStyles && activeStyles.getPropertyValue('padding-bottom'),
    pl: activeStyles && activeStyles.getPropertyValue('padding-left'),
  };

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

  const updateStyles = (properties, value) => {
    properties.forEach((property) => {
      activeEl.style[property] = `${value}px`;
    });
  };

  return (
    <>
      <Text sx={{ position: 'fixed', bottom: 0, right: 0 }}>
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
        <ControlBar orientation="vertical" sideX="right" sideY="top">
          <Space
            onChange={({ properties, value }) => {
              updateStyles(properties, value);
            }}
          />
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

      {selectableEl && (
        <Box
          sx={{
            position: 'absolute',
            top: `${selectableClient.top + window.scrollY}px`,
            left: `${selectableClient.left + window.scrollX}px`,
            borderStyle: 'solid',
            borderWidth: '2px',
            borderColor: 'green',
            height: `${selectableClient.height}px`,
            width: `${selectableClient.width}px`,
            pointerEvents: 'none',
            opacity: 0.3,
          }}
        />
      )}

      {activeEl && (
        <Box
          key={`element-key-${activeKey}`}
          sx={{
            position: 'absolute',
            top: `calc(${activeClient.top + window.scrollY}px - ${
              overlayDim.mt
            })`,
            left: `calc(${activeClient.left + window.scrollX}px - ${
              overlayDim.ml
            })`,
            height: `calc(${activeClient.height}px + ${overlayDim.mt} + ${overlayDim.mb})`,
            width: `calc(${activeClient.width}px + ${overlayDim.ml} + ${overlayDim.mr})`,
            borderTopWidth: overlayDim.mt,
            borderRightWidth: overlayDim.mr,
            borderBottomWidth: overlayDim.mb,
            borderLeftWidth: overlayDim.ml,
            borderStyle: 'solid',
            borderColor: 'orange',
            pointerEvents: 'none',
            opacity: 0.3,
          }}
        >
          <Box
            height="100%"
            sx={{
              borderTopWidth: overlayDim.bt,
              borderRightWidth: overlayDim.br,
              borderBottomWidth: overlayDim.bb,
              borderLeftWidth: overlayDim.bl,
              borderStyle: 'solid',
              borderColor: 'yellow',
            }}
          >
            <Box
              height="100%"
              sx={{
                borderTopWidth: overlayDim.pt,
                borderRightWidth: overlayDim.pr,
                borderBottomWidth: overlayDim.pb,
                borderLeftWidth: overlayDim.pl,
                borderStyle: 'solid',
                borderColor: 'green',
              }}
            >
              <Box height="100%" bg="dodgerblue" />
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}

export default App;
