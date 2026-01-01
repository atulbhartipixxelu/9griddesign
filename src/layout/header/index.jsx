import React from 'react';
import Navbar from '../../common/navbar'

import Styles from '../header/index.module.css';

function HeaderCode() {
    return (
        <div className={'Homebannersection'}>
            <div className={Styles.navbar}>
               <Navbar />
            </div>
        </div>
    )
}

export default HeaderCode;