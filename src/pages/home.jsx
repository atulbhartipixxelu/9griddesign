import React from 'react';
import BannerSlider from '@components/Home-Data/BannerSlider';
import AboutSection from '@components/Home-Data/AboutSection';
import OurKey from '@components/Home-Data/OurKeySection';
import InstagramGallery from '@components/Home-Data/InstagramGallery';
function Home() {

    return (
        <div className={'HomePageSection'}>
            <BannerSlider />
            <AboutSection />
            <OurKey />
            <InstagramGallery />
        </div>
    )
}

export default Home;
