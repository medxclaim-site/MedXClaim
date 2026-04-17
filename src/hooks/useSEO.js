import { useEffect } from 'react';

/**
 * Hook to manage SEO meta tags for individual pages
 * Usage: useSEO({ title: 'Page Title', description: 'Page description', keywords: 'keyword1, keyword2' })
 */
export const useSEO = ({ title, description, keywords, ogImage, ogType = 'website' }) => {
  useEffect(() => {
    // Update page title
    if (title) {
      document.title = `${title} | MedXClaim`;
    }

    // Update meta description
    if (description) {
      const descMeta = document.querySelector('meta[name="description"]');
      if (descMeta) {
        descMeta.setAttribute('content', description);
      }
    }

    // Update meta keywords
    if (keywords) {
      const keywordsMeta = document.querySelector('meta[name="keywords"]');
      if (keywordsMeta) {
        keywordsMeta.setAttribute('content', `${keywords}, MedXClaim, healthcare billing`);
      }
    }

    // Update Open Graph title
    if (title) {
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute('content', title);
      }
    }

    // Update Open Graph description
    if (description) {
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) {
        ogDesc.setAttribute('content', description);
      }
    }

    // Update Open Graph image
    if (ogImage) {
      const ogImg = document.querySelector('meta[property="og:image"]');
      if (ogImg) {
        ogImg.setAttribute('content', ogImage);
      }
    }

    // Update Open Graph type
    if (ogType) {
      const ogTypeTag = document.querySelector('meta[property="og:type"]');
      if (ogTypeTag) {
        ogTypeTag.setAttribute('content', ogType);
      }
    }

    // Return cleanup (optional)
    return () => {};
  }, [title, description, keywords, ogImage, ogType]);
};

/**
 * Alternative direct function to set title without hook
 */
export const setPageTitle = (title, baseSite = 'MedXClaim') => {
  document.title = `${title} | ${baseSite}`;
};

/**
 * SEO page config presets
 */
export const SEO_PRESETS = {
  home: {
    title: 'Healthcare Billing Support',
    description: 'Premium healthcare billing support for Medicaid, VA, GAMMIS, and Tellus providers. Streamline your claims process with expert MedXClaim assistance.',
    keywords: 'healthcare billing, medicaid billing, VA billing, medical claims, healthcare administration',
    ogType: 'website'
  },
  services: {
    title: 'Billing Support Services',
    description: 'MedXClaim offers Essential, Professional, and Enterprise healthcare billing packages for providers of all sizes.',
    keywords: 'healthcare billing services, medicaid support, claims management, billing solutions',
    ogType: 'website'
  },
  about: {
    title: 'About MedXClaim',
    description: 'Learn about MedXClaim\'s expertise in healthcare billing support for Medicaid, VA, and other specialized workflows.',
    keywords: 'about MedXClaim, healthcare billing company, billing experts',
    ogType: 'website'
  },
  whyChooseUs: {
    title: 'Why Choose MedXClaim',
    description: 'Discover why healthcare providers choose MedXClaim for expert billing support, cost reduction, and streamlined operations.',
    keywords: 'why choose MedXClaim, healthcare billing benefits, claim management',
    ogType: 'website'
  },
  industries: {
    title: 'Healthcare Industries We Serve',
    description: 'MedXClaim serves home health, clinics, medical practices, and healthcare networks with specialized billing support.',
    keywords: 'healthcare industries, home health billing, clinic billing, medical practice billing',
    ogType: 'website'
  },
  faq: {
    title: 'Frequently Asked Questions',
    description: 'Common questions about MedXClaim\'s healthcare billing services, GAMMIS, Tellus, VA billing, and onboarding process.',
    keywords: 'healthcare billing FAQ, medicaid questions, VA billing questions, MedXClaim support',
    ogType: 'website'
  },
  contact: {
    title: 'Contact MedXClaim',
    description: 'Get in touch with MedXClaim for a free consultation on healthcare billing solutions tailored to your needs.',
    keywords: 'contact MedXClaim, healthcare billing support, billing consultation',
    ogType: 'website'
  },
  privacyPolicy: {
    title: 'Privacy Policy',
    description: 'MedXClaim Privacy Policy - Learn how we protect and handle your data.',
    keywords: 'privacy policy, data protection, healthcare data',
    ogType: 'website'
  },
  termsOfService: {
    title: 'Terms of Service',
    description: 'MedXClaim Terms of Service - Review our service terms and conditions.',
    keywords: 'terms of service, service agreement, conditions',
    ogType: 'website'
  }
};
