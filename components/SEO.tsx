import React from 'react';
import { Helmet } from 'react-helmet-async';
import { COMPANY_INFO } from '../constants';

interface SEOProps {
    title: string;
    description?: string;
    image?: string;
    url?: string;
    type?: 'website' | 'article';
}

const SEO: React.FC<SEOProps> = ({
    title,
    description = "Matrículas Abertas! O Educandário Sodré oferece Educação Infantil, Fundamental e Médio em Águas Claras. Bolsas pelo Educa Mais Brasil e Quero Bolsa.",
    image = "https://picsum.photos/1200/630?random=1",
    url = "https://educandariosodre.com.br",
    type = 'website'
}) => {
    const siteTitle = `${title} | ${COMPANY_INFO.name}`;

    // Structured Data (JSON-LD) for Local Business / School
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "School",
        "name": COMPANY_INFO.name,
        "image": image,
        "@id": url,
        "url": url,
        "telephone": COMPANY_INFO.phone,
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Estrada do Matadouro",
            "addressLocality": "Águas Claras",
            "addressRegion": "BA",
            "addressCountry": "BR"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": -12.9315277,
            "longitude": -38.4552097
        },
        "sameAs": [
            COMPANY_INFO.social.instagram,
            COMPANY_INFO.social.facebook
        ]
    };

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{siteTitle}</title>
            <meta name="description" content={description} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={siteTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={url} />
            <meta property="twitter:title" content={siteTitle} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={image} />

            {/* Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(jsonLd)}
            </script>
        </Helmet>
    );
};

export default SEO;
