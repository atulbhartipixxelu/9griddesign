import React from 'react';
import BannerSlider from '@components/Gallery-Data/GalleryContentSection';
import GalleryImages from '@components/Gallery-Data/GalleryImages';
function Home() {

    return (
        <div className={'HomePageSection'}>
            <BannerSlider />
            <GalleryImages />
        </div>
    )
}

export default Home;
