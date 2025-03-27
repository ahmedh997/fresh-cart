import React from 'react';
import RecentProudcts from '../RecentProudcts/RecentProudcts';
import CategorySlider from '../CategorySlider/CategorySlider';
import MainSlider from '../MainSlider/MainSlider';




export default function Home() {
  return (

    <>

      
      <div className='w-[90%] m-auto'>

        <MainSlider />
        <CategorySlider />

        <RecentProudcts />

      </div>
      

    </>

  );
};
