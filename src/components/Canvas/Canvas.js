import React from 'react';

import { Box } from 'rebass';

/**
 * Component which dictates the visual representation of a user's interaction with elements inside of the document.
 */
const Canvas = ({
  activeElement,
  children,
  canvasId = 'canvas',
  onSelectElement,
}) => {
  const canvasRef = React.useRef(null);
  const [selectableEl, setSelectableEl] = React.useState();

  React.useEffect(() => {
    const canvas = canvasRef.current;

    const updateActiveEl = () => {
      onSelectElement(selectableEl);
    };

    canvas.addEventListener('click', updateActiveEl);

    return () => {
      canvas.removeEventListener('click', updateActiveEl);
    };
  }, [selectableEl, onSelectElement]);

  /**
   * Updates the state of the current selectable element.
   */
  React.useEffect(() => {
    const canvas = canvasRef.current;

    const updateSelectableEl = ({ pageX, pageY }) => {
      const closestElToMouse = document.elementFromPoint(pageX, pageY);

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
    const canvas = canvasRef.current;

    const removeSelectableEl = () => {
      setSelectableEl(undefined);
    };

    canvas.addEventListener('mouseleave', removeSelectableEl);

    return () => {
      canvas.removeEventListener('mouseleave', removeSelectableEl);
    };
  }, []);

  /**
   * Show user which element is selectable.
   */
  React.useEffect(() => {
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
   * Show user which element is active.
   */
  React.useEffect(() => {
    if (activeElement) {
      activeElement.setAttribute('data-active', true);
    }

    return () => {
      if (activeElement) {
        activeElement.removeAttribute('data-active');
      }
    };
  }, [activeElement]);

  return (
    <Box
      data-canvasid={canvasId}
      ref={canvasRef}
      sx={{
        '*[data-selectable]:not([data-active])': {
          outline: 'solid lightgreen',
        },
        '*[data-active]': {
          outline: 'solid orange',
        },
      }}
    >
      {children}
    </Box>
  );
};

export default Canvas;
