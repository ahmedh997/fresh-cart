import React from 'react';
import RecentProudcts from '../RecentProudcts/RecentProudcts';
import CategorySlider from '../CategorySlider/CategorySlider';
import MainSlider from '../MainSlider/MainSlider';




export default function Home() {
  return (

    <>

      
      <div className='w-[95%] m-auto'>

        <MainSlider />
        <CategorySlider />


      </div>
      <div className="text m-6 p-3 text-left">
        <h1 className='mb-4'>Shop popular products</h1>
      </div>
      
        <RecentProudcts />  

    </>

  );
};
