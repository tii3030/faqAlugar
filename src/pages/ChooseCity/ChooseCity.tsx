import React from 'react';
import uuid from 'react-uuid';
import { GrLocation } from 'react-icons/gr';
import { FiChevronRight } from 'react-icons/fi';
import { cities } from '../../mocks/cities';
import { TypeCities } from '../../types/cities';
import { useModal } from '../../context/ModalContext';

const ChooseCity: React.FC = () => {
  const { openModal, closeModal, handleCity, isOpen } = useModal();
  const handleModal = (city: string) => {
    if (!isOpen) {
      openModal();
    }
    if (isOpen) {
      closeModal();
      handleCity(city);
    }
  };

  return (
    <div className={isOpen ? 'Backdrop' : 'Backdrop-Close'}>
      <div className="Choose-City">
        <div className="Container-Choose-City">
          <section className="Sections-Choose-City">
            <div className="Section-Title">
              <h1>Selecione a sua cidade</h1>
              <GrLocation size={38} />
            </div>
            <div className="Section-Cities">
              {cities.map((line: TypeCities) => (
                <div
                  className="Redirect-Button-City"
                  onClick={() => handleModal(line.id)}
                  onKeyDown={() => null}
                  aria-hidden="true"
                  key={uuid()}
                >
                  <div className="D-Flex">
                    <span>{line.city}</span>
                  </div>
                  <div className="Circle-Button">
                    <FiChevronRight color="white" size={30} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ChooseCity;
