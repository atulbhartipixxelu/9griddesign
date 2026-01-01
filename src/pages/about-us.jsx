import React from 'react';
import AboutBanner from '@components/About-Data/AboutBanner';
// import LeadershipBanner from '@components/About-Data/Leadership';
import TeamSection from '@components/About-Data/TeamSection';
import ClientSection from '@components/About-Data/clients';
function AboutUs() {

    return (
        <div className={'HomePageSection'}>
            <AboutBanner />
            {/* <LeadershipBanner /> */}
            <TeamSection />
            <ClientSection />
        </div>
    )
}

export default AboutUs;
