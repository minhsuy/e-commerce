import React from 'react';
import { Outlet } from 'react-router-dom';
import TopHeader from '../../components/Header/TopHeader';
import Header from '../../components/Header/Header';
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';

const Public = () => {
    return (
        <>
            <div className='w-full flex flex-col items-center'>
                <TopHeader></TopHeader>
                <Header></Header>
                <Navigation></Navigation>
                <div className='w-main'>
                    <Outlet></Outlet>
                </div>
                <Footer></Footer>
            </div>
        </>
    );
};

export default Public;