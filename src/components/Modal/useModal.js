import React, { useState, useMemo, useCallback } from 'react';

import Modal from './Modal';

const useModal = ({ isInitiallyOpen = false } = {}) => {
  const [isOpen, setOpen] = useState(isInitiallyOpen);

  const actions = useMemo(
    () => ({
      open: () => {
        setOpen(true);
      },
      close: () => {
        setOpen(false);
      },
    }),
    []
  );

  const ConnectedModal = useCallback(
    (props) => isOpen && <Modal onClose={actions.close} {...props} />,
    [isOpen, actions.close]
  );

  return [actions, ConnectedModal];
};

export default useModal;
