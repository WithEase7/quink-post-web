import React, { useState } from "react";
import { Helmet } from "react-helmet";
const HelmetBase = ({ title, description, keywords, link }) => {


    return (<>
        <div>

            <Helmet>

                <title>{title}</title>
                <link rel="canonical" href={`https://www.quinkpost.com/${link}`} />
                <meta
                    name="description"
                    content={description}
                />
                <meta
                    name="keywords"
                    content={keywords?.join()}
                />
            
            </Helmet>
        </div>
    </>)
}
export default HelmetBase