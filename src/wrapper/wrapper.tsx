import React from 'react';
import Header from '../layout/Header/Header';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import Footer from '../layout/Footer/Footer';

type WrapperType = {
  children: React.ReactNode;
};

const Wrapper: React.FC<WrapperType> = ({ children }) => {
  return (
    <>
      <Header />
      <Breadcrumbs />
      <div>{children}</div>
      <Footer />
    </>
  );
};

export default Wrapper;
