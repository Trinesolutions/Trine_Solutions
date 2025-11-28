import { Helmet } from 'react-helmet-async';

/**
 * SEO Component for Trine Solutions
 * Provides comprehensive SEO meta tags for each page
 */

const SITE_URL = 'https://trinesolutions.com';
const DEFAULT_IMAGE = `${SITE_URL}/trine_logo.png`;
const COMPANY_NAME = 'Trine Solutions';

// Default SEO configuration
const defaultSEO = {
  title: 'Trine Solutions – Digital Transformation, Cloud, Cybersecurity, IT Consulting',
  description: 'Trine Solutions provides enterprise-grade digital transformation, cybersecurity, cloud services, AI solutions, DevOps, and IT consulting. Partner with industry experts for sustainable business growth.',
  keywords: 'Digital Transformation, Cybersecurity, Cloud Solutions, AI Solutions, IT Consulting, Enterprise IT, DevOps, Risk Management, Compliance, Software Development, Cloud Migration, Data Analytics',
};

const SEO = ({
  title = defaultSEO.title,
  description = defaultSEO.description,
  keywords = defaultSEO.keywords,
  canonicalUrl,
  ogType = 'website',
  ogImage = DEFAULT_IMAGE,
  ogImageAlt = 'Trine Solutions - Enterprise IT Consulting',
  noIndex = false,
  structuredData,
  breadcrumbs,
  article,
}) => {
  // Generate full title with brand suffix if not default
  const fullTitle = title === defaultSEO.title 
    ? title 
    : `${title} | ${COMPANY_NAME}`;

  // Determine canonical URL more consistently
  const getCanonicalUrl = () => {
    if (canonicalUrl) return canonicalUrl;
    if (typeof window !== 'undefined') {
      // Extract only the origin and pathname to avoid query params and fragments
      const { origin, pathname } = window.location;
      // Remove trailing slash for consistency (except for root)
      const normalizedPath = pathname === '/' ? pathname : pathname.replace(/\/$/, '');
      return `${origin}${normalizedPath}`;
    }
    return SITE_URL;
  };

  const canonical = getCanonicalUrl();

  // Generate breadcrumb structured data
  const generateBreadcrumbsSchema = () => {
    if (!breadcrumbs || breadcrumbs.length === 0) return null;
    
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    };
  };

  // Generate article structured data
  const generateArticleSchema = () => {
    if (!article) return null;
    
    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: article.description || description,
      image: article.image || ogImage,
      author: {
        '@type': 'Person',
        name: article.author || 'Trine Solutions Team',
      },
      publisher: {
        '@type': 'Organization',
        name: COMPANY_NAME,
        logo: {
          '@type': 'ImageObject',
          url: DEFAULT_IMAGE,
        },
      },
      datePublished: article.publishedDate,
      dateModified: article.modifiedDate || article.publishedDate,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': canonical,
      },
    };
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Robots */}
      <meta 
        name="robots" 
        content={noIndex ? 'noindex, nofollow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'} 
      />
      <meta 
        name="googlebot" 
        content={noIndex ? 'noindex, nofollow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'} 
      />
      
      {/* Canonical */}
      <link rel="canonical" href={canonical} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={ogImageAlt} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={COMPANY_NAME} />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:site" content="@trinesolutions" />
      
      {/* Additional Meta */}
      <meta name="author" content={COMPANY_NAME} />
      <meta name="publisher" content={COMPANY_NAME} />
      <meta name="geo.region" content="US-WA" />
      <meta name="geo.placename" content="Bellevue" />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
      
      {/* Breadcrumbs Schema */}
      {breadcrumbs && (
        <script type="application/ld+json">
          {JSON.stringify(generateBreadcrumbsSchema())}
        </script>
      )}
      
      {/* Article Schema */}
      {article && (
        <script type="application/ld+json">
          {JSON.stringify(generateArticleSchema())}
        </script>
      )}
    </Helmet>
  );
};

// Pre-defined SEO configurations for each page
export const pageSEO = {
  home: {
    title: 'Trine Solutions – Digital Transformation, Cloud, Cybersecurity, IT Consulting',
    description: 'Trine Solutions delivers enterprise-grade digital transformation, cybersecurity, cloud computing, and AI solutions. Transform your business with expert IT consulting and innovative technology services.',
    keywords: 'Digital Transformation, Cybersecurity Solutions, Cloud Computing, AI Solutions, IT Consulting, Enterprise Technology, DevOps, Machine Learning, Business Innovation, Tech Consulting',
  },
  about: {
    title: 'About Us – Our Story & Mission',
    description: 'Learn about Trine Solutions – a global leader in enterprise technology consulting. Discover our vision, mission, values, and the expert team driving digital transformation for businesses worldwide.',
    keywords: 'About Trine Solutions, IT Consulting Company, Enterprise Technology Partner, Digital Transformation Experts, Technology Consulting Team, Company History, IT Services Provider',
  },
  services: {
    title: 'IT Services & Solutions – Enterprise Technology',
    description: 'Explore Trine Solutions comprehensive IT services: Digital Transformation, Cloud Solutions, AI/ML, Cybersecurity, and Custom Software Development. Enterprise-grade solutions for your business.',
    keywords: 'IT Services, Enterprise Solutions, Digital Transformation Services, Cloud Migration, Cybersecurity Services, AI Solutions, Custom Software Development, DevOps Services',
  },
  digitalTransformation: {
    title: 'Digital Transformation Services – Modernize Your Business',
    description: 'Accelerate your digital transformation journey with Trine Solutions. We help enterprises modernize operations, enhance customer experiences, and drive innovation with cutting-edge technology.',
    keywords: 'Digital Transformation, Business Modernization, Digital Strategy, Enterprise Digitization, Process Automation, Legacy Modernization, Digital Innovation, Business Transformation',
  },
  cloudSolutions: {
    title: 'Cloud Solutions – AWS, Azure, GCP Migration & Management',
    description: 'Expert cloud solutions from Trine Solutions. Seamless AWS, Azure, and Google Cloud migration, infrastructure optimization, and 24/7 managed cloud services for enterprise scalability.',
    keywords: 'Cloud Solutions, AWS Migration, Azure Services, Google Cloud Platform, Cloud Infrastructure, Cloud Security, Cloud Optimization, Hybrid Cloud, Multi-Cloud Strategy',
  },
  aiMl: {
    title: 'AI & Machine Learning Solutions – Intelligent Automation',
    description: 'Leverage AI and Machine Learning with Trine Solutions. Implement intelligent automation, predictive analytics, natural language processing, and computer vision for competitive advantage.',
    keywords: 'AI Solutions, Machine Learning, Artificial Intelligence, Predictive Analytics, NLP, Computer Vision, Deep Learning, AI Consulting, ML Implementation, Intelligent Automation',
  },
  cybersecurity: {
    title: 'Cybersecurity Solutions – Enterprise Security & Compliance',
    description: 'Comprehensive cybersecurity services from Trine Solutions. Protect your business with threat detection, security assessments, compliance management, and 24/7 security monitoring.',
    keywords: 'Cybersecurity Services, Enterprise Security, Threat Detection, Security Assessment, Compliance Management, SOC 2, HIPAA Compliance, Data Protection, Security Monitoring',
  },
  industries: {
    title: 'Industries We Serve – Sector-Specific Solutions',
    description: 'Industry-specific technology solutions from Trine Solutions. Tailored digital transformation for Healthcare, Finance, Telecommunications, Manufacturing, Retail, and Education sectors.',
    keywords: 'Healthcare IT, Financial Services Technology, Telecom Solutions, Manufacturing Tech, Retail Technology, EdTech Solutions, Industry Digital Transformation, Sector Solutions',
  },
  careers: {
    title: 'Careers – Join Our Team of Innovators',
    description: 'Build your career at Trine Solutions. Explore exciting opportunities in technology consulting, software development, cloud engineering, cybersecurity, and AI. Join our innovative team.',
    keywords: 'IT Careers, Technology Jobs, Software Developer Jobs, Cloud Engineer Positions, Cybersecurity Careers, AI Jobs, Tech Consulting Careers, Join Trine Solutions',
  },
  contact: {
    title: 'Contact Us – Get in Touch for IT Solutions',
    description: 'Contact Trine Solutions for enterprise IT consulting, digital transformation, and technology solutions. Schedule a consultation with our experts. Located in Bellevue, WA.',
    keywords: 'Contact Trine Solutions, IT Consulting Contact, Technology Solutions Inquiry, Schedule Consultation, Bellevue IT Services, Enterprise Technology Contact',
  },
  blog: {
    title: 'Blog & Insights – Technology News & Trends',
    description: 'Stay updated with Trine Solutions blog. Expert insights on digital transformation, cybersecurity, cloud computing, AI trends, and enterprise technology best practices.',
    keywords: 'IT Blog, Technology Insights, Digital Transformation Trends, Cybersecurity News, Cloud Computing Blog, AI Trends, Enterprise Tech Blog, IT Best Practices',
  },
  faq: {
    title: 'FAQ – Frequently Asked Questions',
    description: 'Find answers to frequently asked questions about Trine Solutions services, pricing, support, and technology solutions. Get the information you need quickly.',
    keywords: 'Trine Solutions FAQ, IT Services Questions, Technology Consulting FAQ, Service Pricing, Support Questions, Enterprise IT FAQ',
  },
  privacy: {
    title: 'Privacy Policy – Data Protection & Security',
    description: 'Trine Solutions privacy policy outlines how we collect, use, and protect your personal data. Our commitment to data security and compliance.',
    keywords: 'Privacy Policy, Data Protection, GDPR Compliance, Data Security, Personal Information Protection',
  },
  terms: {
    title: 'Terms of Service – Legal Agreement',
    description: 'Trine Solutions terms of service. Review our legal terms, conditions, and agreements for using our IT consulting and technology services.',
    keywords: 'Terms of Service, Legal Terms, Service Agreement, IT Consulting Terms, Technology Services Agreement',
  },
  portfolio: {
    title: 'Portfolio – Our Work & Success Stories',
    description: 'Explore Trine Solutions portfolio of successful digital transformation projects. See how we have helped enterprises across industries achieve their technology goals.',
    keywords: 'IT Portfolio, Case Studies, Success Stories, Digital Transformation Projects, Enterprise Solutions Portfolio, Technology Implementation',
  },
  caseStudies: {
    title: 'Case Studies – Client Success Stories',
    description: 'Discover how Trine Solutions has transformed businesses through digital innovation. Real client case studies showcasing measurable results and ROI.',
    keywords: 'IT Case Studies, Client Success Stories, Digital Transformation Results, Enterprise Technology ROI, Business Transformation Examples',
  },
  insights: {
    title: 'Insights – Expert Analysis & Whitepapers',
    description: 'Access expert analysis, whitepapers, and research from Trine Solutions. Deep dive into technology trends, best practices, and industry insights.',
    keywords: 'Technology Insights, IT Whitepapers, Industry Analysis, Tech Research, Best Practices, Expert Analysis, Technology Reports',
  },
};

// Structured data schemas
export const structuredDataSchemas = {
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: COMPANY_NAME,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: DEFAULT_IMAGE,
      width: 512,
      height: 512,
    },
    sameAs: [
      'https://www.linkedin.com/company/trinesolutions/',
      'https://twitter.com/trinesolutions',
    ],
    description: 'Trine Solutions provides enterprise-grade digital transformation, cybersecurity, cloud services, AI solutions, DevOps, and IT consulting.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '14042 NE 8th Street, #201C',
      addressLocality: 'Bellevue',
      addressRegion: 'WA',
      postalCode: '98007',
      addressCountry: 'US',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+1-425-202-5165',
        contactType: 'customer service',
        availableLanguage: ['English'],
        areaServed: 'US',
      },
      {
        '@type': 'ContactPoint',
        telephone: '+1-425-202-5165',
        contactType: 'sales',
        availableLanguage: ['English'],
        areaServed: 'Worldwide',
      },
    ],
    areaServed: 'Worldwide',
    serviceType: [
      'Digital Transformation',
      'Cybersecurity',
      'Cloud Computing',
      'DevOps',
      'AI Solutions',
      'IT Consulting',
      'Risk Management',
      'Compliance',
    ],
  },
  
  website: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: COMPANY_NAME,
    url: SITE_URL,
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  },
  
  services: [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: 'Digital Transformation',
      provider: {
        '@type': 'Organization',
        name: COMPANY_NAME,
      },
      description: 'Comprehensive digital transformation services including legacy modernization, process automation, and enterprise digitization.',
      areaServed: 'Worldwide',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Digital Transformation Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Enterprise Digital Strategy',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Legacy System Modernization',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Process Automation',
            },
          },
        ],
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: 'Cloud Solutions',
      provider: {
        '@type': 'Organization',
        name: COMPANY_NAME,
      },
      description: 'Enterprise cloud solutions including AWS, Azure, and Google Cloud migration, optimization, and managed services.',
      areaServed: 'Worldwide',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: 'Cybersecurity',
      provider: {
        '@type': 'Organization',
        name: COMPANY_NAME,
      },
      description: 'Comprehensive cybersecurity services including threat detection, security assessments, compliance management, and 24/7 monitoring.',
      areaServed: 'Worldwide',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: 'AI & Machine Learning',
      provider: {
        '@type': 'Organization',
        name: COMPANY_NAME,
      },
      description: 'AI and machine learning solutions including predictive analytics, natural language processing, and intelligent automation.',
      areaServed: 'Worldwide',
    },
  ],
  
  localBusiness: {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#localbusiness`,
    name: COMPANY_NAME,
    image: DEFAULT_IMAGE,
    url: SITE_URL,
    telephone: '+1-425-202-5165',
    email: 'trine@trinesolutions.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '14042 NE 8th Street, #201C',
      addressLocality: 'Bellevue',
      addressRegion: 'WA',
      postalCode: '98007',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 47.6205,
      longitude: -122.1851,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '10:00',
        closes: '14:00',
      },
    ],
    priceRange: '$$$$',
    serviceType: [
      'Digital Transformation Consulting',
      'Cybersecurity Services',
      'Cloud Computing Solutions',
      'AI & Machine Learning',
      'IT Consulting',
      'Enterprise Technology Services',
    ],
  },
  
  faqPage: (faqs) => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }),
};

export default SEO;
