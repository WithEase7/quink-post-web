import React from 'react'
import Comingsoon from './comingsoon'
import Navbar from './navbar'
import HelmetBase from './HelmetBase'
function Magzinepage() {
    return (
        <div>
            <HelmetBase title="Quink Post - Magazines" link="/magazines" />
            <Navbar />
            <Comingsoon />
        </div>
    )
}

export default Magzinepage
