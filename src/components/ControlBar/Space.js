import React, { useReducer } from 'react';
import { Box } from 'rebass';

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

/**
 * @typedef {{
 *  type: 'margin-top' | 'margin-right' | 'margin-bottom' | 'margin-left' | 'border-top' | 'border-right' | 'border-bottom' | 'border-left' | 'padding-top' | 'padding-right' | 'padding-bottom' | 'padding-left';
 *  checked: boolean;
 * }} SelectionAction
 *
 * @typedef {{
 *  marginTop: boolean;
 *  marginRight: boolean;
 *  marginBottom: boolean;
 *  marginLeft: boolean;
 *  borderTop: boolean;
 *  borderRight: boolean;
 *  borderBottom: boolean;
 *  borderLeft: boolean;
 *  paddingTop: boolean;
 *  paddingRight: boolean;
 *  paddingBottom: boolean;
 *  paddingLeft: boolean;
 * }} SelectionState
 */

const initState = () => ({
  marginTop: false,
  marginRight: false,
  marginBottom: false,
  marginLeft: false,
  borderTop: false,
  borderRight: false,
  borderBottom: false,
  borderLeft: false,
  paddingTop: false,
  paddingRight: false,
  paddingBottom: false,
  paddingLeft: false,
});

/**
 * Function to reduce a new state from a provided action state update.
 *
 * @param {SelectionState} state
 * @param {SelectionAction} action
 */
function selectionReducer(state, action) {
  switch (action.type) {
    case 'margin-top':
      return {
        ...state,
        marginTop: action.checked,
      };
    case 'margin-right':
      return {
        ...state,
        marginRight: action.checked,
      };
    case 'margin-bottom':
      return {
        ...state,
        marginBottom: action.checked,
      };
    case 'margin-left':
      return {
        ...state,
        marginLeft: action.checked,
      };
    case 'border-top':
      return {
        ...state,
        borderTop: action.checked,
      };
    case 'border-right':
      return {
        ...state,
        borderRight: action.checked,
      };
    case 'border-bottom':
      return {
        ...state,
        borderBottom: action.checked,
      };
    case 'border-left':
      return {
        ...state,
        borderLeft: action.checked,
      };
    case 'padding-top':
      return {
        ...state,
        paddingTop: action.checked,
      };
    case 'padding-right':
      return {
        ...state,
        paddingRight: action.checked,
      };
    case 'padding-bottom':
      return {
        ...state,
        paddingBottom: action.checked,
      };
    case 'padding-left':
      return {
        ...state,
        paddingLeft: action.checked,
      };
    case 'reset':
      return initState();
    default:
      return state;
  }
}

const Space = () => {
  const [state, dispatch] = useReducer(selectionReducer, initState());

  const handleChecked = ({ target }) => {
    dispatch({
      checked: target.checked,
      type: target.getAttribute('data-canvas-css-prop'),
    });
  };

  // const handleValueChange = ({ target }) => {

  // };

  return (
    <Box>
      <Box
        minHeight="200px"
        minWidth="200px"
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gridTemplateRows: 'repeat(7, 1fr)',
          gridGap: '1px',
          bg: 'black',
        }}
      >
        <SpaceCheckbox
          checked={state.marginTop}
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
          checked={state.marginRight}
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
          checked={state.marginBottom}
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
          checked={state.marginLeft}
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
          checked={state.borderTop}
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
          checked={state.borderRight}
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
          checked={state.borderBottom}
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
          checked={state.borderLeft}
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
          checked={state.paddingTop}
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
          checked={state.paddingRight}
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
          checked={state.paddingBottom}
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
          checked={state.paddingLeft}
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

      {/* <Box>
        <Box>-</Box>
        <input type="text" onChange={} />
        <Box>+</Box>
      </Box> */}
    </Box>
  );
};

export default React.memo(Space);
