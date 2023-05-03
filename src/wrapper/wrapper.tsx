import React from 'react';
import Header from '../layout/Header/Header';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import Footer from '../layout/Footer/Footer';

type WrapperType = {
  children: React.ReactNode;
  isBreadcrumbs?: boolean;
};

const Wrapper: React.FC<WrapperType> = ({ children, isBreadcrumbs }) => {
  return (
    <>
      <Header />
      {isBreadcrumbs && <Breadcrumbs />}
      <div>{children}</div>
      <Footer />
    </>
  );
};

Wrapper.defaultProps = {
  isBreadcrumbs: true,
};

export default Wrapper;
