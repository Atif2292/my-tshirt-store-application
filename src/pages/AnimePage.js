import React from 'react';
import animeData from '../animeData';
import ProductGridCategory from './ProductGridCategory';

const AnimePage = () => {
  return <ProductGridCategory title="Anime Merch" data={animeData} />;
};

export default AnimePage;
