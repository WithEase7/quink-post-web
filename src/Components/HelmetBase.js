import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Head from "next/head";

const HelmetBase = ({ title, description, keywords, link }) => {
    return (
        <>
            <Helmet>
                <title>{title}</title>
                <link rel="canonical" href={`https://www.quinkpost.com${link}`} />
                <meta
                    name="description"
                    content={
                        description ? description : title
                    }
                />
                {console.log(keywords?.join(), "<<<<<<key")}
                <meta name="keywords" content={keywords?.join()} />
            </Helmet>

        </>
    );
};
export default HelmetBase;
