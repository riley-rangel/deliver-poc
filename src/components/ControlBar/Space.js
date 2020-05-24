import React, { useReducer, useRef, useEffect } from 'react';
import { Box, Button } from 'rebass';

const SpaceCheckbox = ({ children, label, name, sx, type, ...props }) => {
  const color = {
    margin: 'orange',
    border: 'yellow',
    padding: 'green',
  }[type];

  return (
    <Box
      sx={{
        '> input[type="checkbox"] + label': {
          fontSize: '0px',
        },
        '> input[type="checkbox"] + label:after': {
          display: 'inline-block',
          height: '100%',
          width: '100%',
          content: '""',
          bg: color,
          opacity: 0.3,
        },
        '> input[type="checkbox"]:checked + label:after': {
          opacity: 1,
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
    case 'change':
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
      type: 'change',
      checked: target.checked,
      property: target.getAttribute('data-canvas-css-prop'),
    });
  };

  /** Watches value and invoke onChange when needed. */
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
    <Box display="flex">
      <Box
        minHeight="200px"
        minWidth="200px"
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gridTemplateRows: 'repeat(7, 1fr)',
          gridGap: '1px',
          bg: 'black',
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

        <Box
          onClick={() => dispatch({ type: 'reset' })}
          sx={{
            gridColumn: '4',
            gridRow: '4',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: 'system-ui',
            bg: 'lightgray',
          }}
        >
          X
        </Box>
      </Box>

      <Box display="flex">
        <Box margin="auto">
          <Button
            color="black"
            onClick={() => {
              dispatch({ type: 'subtract' });
            }}
          >
            -
          </Button>
          <input
            type="text"
            onChange={({ target }) => {
              dispatch({ type: 'input', amount: target.value });
            }}
            value={state.amount}
          />
          <Button
            color="black"
            onClick={() => {
              dispatch({ type: 'add' });
            }}
          >
            +
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default React.memo(Space);
