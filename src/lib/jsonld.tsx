import { siteConfig } from "@/constants/site";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/blugent-logo2.png`,
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.address,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: siteConfig.contact.email,
        telephone: siteConfig.contact.phone,
        contactType: "customer service",
      },
    ],
    // sameAs intentionally omitted: siteConfig.links are placeholder URLs, not
    // verified live social profiles — see AEO/schema task notes.
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    publisher: { "@id": `${siteConfig.url}/#organization` },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.path, siteConfig.url).toString(),
    })),
  };
}

export function articleJsonLd(article: {
  title: string;
  description: string;
  path: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: [new URL(article.image, siteConfig.url).toString()],
    datePublished: article.datePublished,
    dateModified: article.dateModified ?? article.datePublished,
    author: [{ "@type": "Person", name: article.authorName }],
    publisher: { "@id": `${siteConfig.url}/#organization` },
    mainEntityOfPage: new URL(article.path, siteConfig.url).toString(),
  };
}

export function servicesItemListJsonLd(services: { slug: string; name: string; solution: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.name,
        description: service.solution,
        url: `${siteConfig.url}/services#${service.slug}`,
        provider: { "@id": `${siteConfig.url}/#organization` },
      },
    })),
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
