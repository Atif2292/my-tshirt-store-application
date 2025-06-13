import React from 'react';
import oversizedData from '../oversizedData';
import ProductGridCategory from './ProductGridCategory';

const OversizedPage = () => {
  return <ProductGridCategory title="Oversized Tees" data={oversizedData} />;
};

export default OversizedPage;
