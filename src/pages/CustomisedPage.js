import React from 'react';
import customisedData from '../customisedData';
import ProductGridCategory from './ProductGridCategory';

const CustomisedPage = () => {
  return <ProductGridCategory title="Customised Tees" data={customisedData} />;
};

export default CustomisedPage;
