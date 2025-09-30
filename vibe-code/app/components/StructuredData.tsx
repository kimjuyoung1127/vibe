'use client';

type Breadcrumb = {
  name: string;
  url: string;
};

type StructuredDataType = {
  type: 'Organization' | 'WebSite' | 'WebPage' | 'Article' | 'BreadcrumbList' | 'ProfilePage' | 'Project' | 'ToolReview';
  data: any;
};

interface StructuredDataProps {
  data: StructuredDataType;
}

const StructuredData: React.FC<StructuredDataProps> = ({ data }) => {
  let structuredData = {};

  switch (data.type) {
    case 'Organization':
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        ...data.data,
      };
      break;
    case 'WebSite':
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        ...data.data,
      };
      break;
    case 'WebPage':
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        ...data.data,
      };
      break;
    case 'Article':
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        ...data.data,
      };
      break;
    case 'BreadcrumbList':
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: data.data.breadcrumbs.map((breadcrumb: Breadcrumb, index: number) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: breadcrumb.name,
          item: breadcrumb.url,
        })),
      };
      break;
    case 'Project':
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork', // Using CreativeWork as a base type for projects
        ...data.data,
      };
      break;
    case 'ToolReview':
      structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Review',
        ...data.data,
      };
      break;
    default:
      structuredData = {
        '@context': 'https://schema.org',
        ...data.data,
      };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

export default StructuredData;