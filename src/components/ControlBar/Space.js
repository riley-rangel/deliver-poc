import React, { useReducer, useRef, useEffect } from 'react';
import { Box } from 'rebass';

import { Button } from '../Button';
import { Input } from '../Input';

const SpaceCheckbox = ({ children, label, name, sx, type, ...props }) => {
  const color = {
    margin: '255, 152, 0',
    border: '255, 235, 59',
    padding: '139, 195, 74',
  }[type];

  return (
    <Box
      sx={{
        '> input[type="checkbox"] + label': {
          fontSize: '0px',
        },
        '> input[type="checkbox"] + label::before': {
          display: 'inline-block',
          height: '100%',
          width: '100%',
          content: '""',
          bg: `rgba(${color}, 0.3)`,
          transition: 'background-color 300ms',
        },
        '> input[type="checkbox"]:hover + label::before': {
          bg: `rgba(${color}, 0.5)`,
        },
        '> input[type="checkbox"]:checked + label::before': {
          bg: `rgba(${color}, 1)`,
        },
        '> input[type="checkbox"]:focus + label::before': {
          outline: '-webkit-focus-ring-color auto 5px',
          position: 'relative',
        },
        '> input[type="checkbox"]': {
          position: 'absolute',
          left: '-9999px',
        },
        ...sx,
      }}
    >
      <input type="checkbox" id={name} name={name} {...props} />
      <label htmlFor={name}>{label}</label>
    </Box>
  );
};

const initState = () => ({
  amount: 0,
  properties: {
    'margin-top': false,
    'margin-right': false,
    'margin-bottom': false,
    'margin-left': false,
    'border-top': false,
    'border-right': false,
    'border-bottom': false,
    'border-left': false,
    'padding-top': false,
    'padding-right': false,
    'padding-bottom': false,
    'padding-left': false,
  },
});

/**
 * Function to reduce a new state from a provided action state update.
 */
function selectionReducer(state, action) {
  switch (action.type) {
    case 'select':
      return {
        ...state,
        properties: {
          ...state.properties,
          [action.property]: action.checked,
        },
      };
    case 'add':
      return {
        ...state,
        amount: state.amount + 1,
      };
    case 'subtract':
      return {
        ...state,
        amount: state.amount > 0 ? state.amount - 1 : 0,
      };
    case 'input':
      return {
        ...state,
        amount: Number(action.amount.replace(/\D/g, '')),
      };
    case 'reset':
      return initState();
    default:
      return state;
  }
}

const Space = ({ onChange }) => {
  const [state, dispatch] = useReducer(selectionReducer, initState());
  const prevAmount = useRef(null);

  const handleChecked = ({ target }) => {
    dispatch({
      type: 'select',
      checked: target.checked,
      property: target.getAttribute('data-canvas-css-prop'),
    });
  };

  /**
   * Watches value and invoke onChange when needed.
   * */
  useEffect(() => {
    const { amount, properties } = state;

    if (amount !== prevAmount.current) {
      const keys = Object.keys(properties).filter(
        (key) => properties[key] === true
      );
      if (keys.length) {
        onChange({ properties: keys, value: amount });
      }
    }

    prevAmount.current = amount;
  }, [state, onChange]);

  return (
    <Box display="flex" width="100%" sx={{ flexDirection: 'column' }}>
      {/* aspect-ratio styles */}
      <Box sx={{ position: 'relative', width: '100%', pt: '100%' }}>
        <Box
          sx={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}
        >
          <Box
            sx={{
              height: '100%',
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gridTemplateRows: 'repeat(7, 1fr)',
              border: '1px solid black',
            }}
          >
            <SpaceCheckbox
              checked={state.properties['margin-top']}
              label="Margin Top"
              name="marginTop"
              data-canvas-css-prop="margin-top"
              onChange={handleChecked}
              type="margin"
              sx={{
                gridColumn: '1 / 8',
                gridRow: '1',
                bg: 'white',
              }}
            />
            <SpaceCheckbox
              checked={state.properties['margin-right']}
              label="Margin Right"
              name="marginRight"
              data-canvas-css-prop="margin-right"
              onChange={handleChecked}
              type="margin"
              sx={{
                gridColumn: '7',
                gridRow: '2 / 7',
                bg: 'white',
              }}
            />
            <SpaceCheckbox
              checked={state.properties['margin-bottom']}
              label="Margin Bottom"
              name="marginBottom"
              data-canvas-css-prop="margin-bottom"
              onChange={handleChecked}
              type="margin"
              sx={{
                gridColumn: '1 / 8',
                gridRow: '7',
                bg: 'white',
              }}
            />
            <SpaceCheckbox
              checked={state.properties['margin-left']}
              label="Margin Left"
              name="marginLeft"
              data-canvas-css-prop="margin-left"
              onChange={handleChecked}
              type="margin"
              sx={{
                bg: 'white',
                gridColumn: '1',
                gridRow: '2 / 7',
              }}
            />
            <SpaceCheckbox
              checked={state.properties['border-top']}
              label="Border Top"
              name="borderTop"
              data-canvas-css-prop="border-top"
              onChange={handleChecked}
              type="border"
              sx={{
                gridColumn: '2 / 7',
                gridRow: '2',
                bg: 'white',
              }}
            />
            <SpaceCheckbox
              checked={state.properties['border-right']}
              label="Border Right"
              name="borderRight"
              data-canvas-css-prop="border-right"
              onChange={handleChecked}
              type="border"
              sx={{
                gridColumn: '6',
                gridRow: '3 / 6',
                bg: 'white',
              }}
            />
            <SpaceCheckbox
              checked={state.properties['border-bottom']}
              label="Border Bottom"
              name="borderBottom"
              data-canvas-css-prop="border-bottom"
              onChange={handleChecked}
              type="border"
              sx={{
                gridColumn: '2 / 7',
                gridRow: '6',
                bg: 'white',
              }}
            />
            <SpaceCheckbox
              checked={state.properties['border-left']}
              label="Border Left"
              name="borderLeft"
              data-canvas-css-prop="border-left"
              onChange={handleChecked}
              type="border"
              sx={{
                gridColumn: '2',
                gridRow: '3 / 6',
                bg: 'white',
              }}
            />
            <SpaceCheckbox
              checked={state.properties['padding-top']}
              label="Padding Top"
              name="paddingTop"
              data-canvas-css-prop="padding-top"
              onChange={handleChecked}
              type="padding"
              sx={{
                gridColumn: '3 / 6',
                gridRow: '3',
                bg: 'white',
              }}
            />
            <SpaceCheckbox
              checked={state.properties['padding-right']}
              label="Padding Right"
              name="paddingRight"
              data-canvas-css-prop="padding-right"
              onChange={handleChecked}
              type="padding"
              sx={{
                gridColumn: '5',
                gridRow: '4',
                bg: 'white',
              }}
            />
            <SpaceCheckbox
              checked={state.properties['padding-bottom']}
              label="Padding Bottom"
              name="paddingBottom"
              data-canvas-css-prop="padding-bottom"
              onChange={handleChecked}
              type="padding"
              sx={{
                gridColumn: '3 / 6',
                gridRow: '5',
                bg: 'white',
              }}
            />
            <SpaceCheckbox
              checked={state.properties['padding-left']}
              label="Padding Left"
              name="paddingLeft"
              data-canvas-css-prop="padding-left"
              onChange={handleChecked}
              type="padding"
              sx={{
                gridColumn: '3',
                gridRow: '4',
                bg: 'white',
              }}
            />

            <Button
              onClick={() => dispatch({ type: 'reset' })}
              p={0}
              sx={{
                gridColumn: '4',
                gridRow: '4',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontFamily: 'system-ui',
                borderRadius: 0,
                bg: 'lightgray',
                color: 'black',
              }}
            >
              X
            </Button>
          </Box>
        </Box>
      </Box>

      <Box display="flex" sx={{ border: '1px solid black' }}>
        <Button
          fullWidth
          minWidth="40px"
          onClick={() => {
            dispatch({ type: 'subtract' });
          }}
          sx={{ flex: 1 }}
        >
          -
        </Button>

        <Input
          id="spacing"
          label="Spacing"
          onChange={({ target }) => {
            dispatch({ type: 'input', amount: target.value });
          }}
          placeholder="eg. 16"
          value={state.amount}
        />

        <Button
          fullWidth
          minWidth="40px"
          onClick={() => {
            dispatch({ type: 'add' });
          }}
          sx={{ flex: 1 }}
        >
          +
        </Button>
      </Box>
    </Box>
  );
};

export default React.memo(Space);
