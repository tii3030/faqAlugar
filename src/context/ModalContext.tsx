import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

type ModalContextType = {
  isOpen: boolean;
  isSelected: boolean;
  city: string;
  openModal: () => void;
  closeModal: () => void;
  handleCity: (city: string) => void;
};

type ModalProviderProps = {
  children: React.ReactNode;
};

const initialState = {
  isOpen: false,
  isSelected: false,
  city: '',
  openModal: () => {},
  closeModal: () => {},
  handleCity: () => {},
};

const ModalContext = React.createContext<ModalContextType>(initialState);
const useModal = (): ModalContextType => useContext(ModalContext);
const ModalConsumer = ModalContext.Consumer;

const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isSelected, setIsSelected] = useState(false);
  const [city, setCity] = useState('');

  const closeModal = () => {
    setIsOpen(() => false);
  };

  const openModal = () => {
    setIsOpen(() => true);
  };

  const handleCity = (cityParam: string) => {
    setCity(cityParam);
    setIsSelected(() => true);
  };

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        isSelected,
        city,
        openModal,
        closeModal,
        handleCity,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

ModalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { ModalContext, ModalProvider, ModalConsumer, useModal };
