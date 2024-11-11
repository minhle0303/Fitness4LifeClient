import React from 'react';
import MainHeader from '../main/MainHeader';
import { Outlet } from 'react-router-dom';
import Footer from '../main/Footer';
import '../../assets/css/styles.css'
import '../../assets/css/font-awesome.min.css'
import '../../assets/css/animate.min.css'
import '../../assets/css/bootstrap.min.css'
import HeroBanner from '../main/HerroBanner';
import Service from '../main/Service';
import About from '../main/About';
import OurTeam from '../main/OurTeam';
import Portfolio from '../main/Portfolio';
import PricingSection from '../main/PricingSection';
import Contact from '../main/Contact';

function MainLayout(props) {
    return (
        <div id='home'> 
        <MainHeader />
        
        <HeroBanner/>
        <Service/>
        <About/>
        <OurTeam/>
        <Portfolio/>
        <PricingSection/>
        <Contact/>
        <main>
          <Outlet /> {/* Các trang con của website */}
        </main>
        <Footer/>

      </div>
    );
}

export default MainLayout;