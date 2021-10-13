import React from "react";
import { Helmet } from "react-helmet";

const HelmetBase = ({
  title,
  description,
  keywords,
  link,
  structuredJSON,
  usernameSchema,
  imageSchema,
  authorSchema,
}) => {
  const passSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.quinkpost.com${link}`,
    },
    headline: `${title}`,
    description: `${description}`,
    image: `${imageSchema}`,
    author: {
      "@type": "Person",
      name: `${usernameSchema}`,
      url: `${authorSchema}`,
    },
    publisher: {
      "@type": "Organization",
      name: "Quink Post",
      logo: {
        "@type": "ImageObject",
        url: "https://res.cloudinary.com/quink-post/image/upload/f_auto/v1622377752/q82qkyisdx5ykv0vlazs.png",
      },
    },
    datePublished: "",
    dateModified: "",
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <link rel="canonical" href={`https://www.quinkpost.com${link}`} />
        <meta name="description" content={description ? description : title} />
        {console.log(keywords?.join(), "<<<<<<key")}
        <meta name="keywords" content={keywords?.join()} />
        <script className="structured-data-list" type="application/ld+json">
          {structuredJSON}
        </script>
        <script type="application/ld+json">{JSON.stringify(passSchema)}</script>
      </Helmet>
    </>
  );
};
export default HelmetBase;
