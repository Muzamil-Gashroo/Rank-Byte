import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import ToolsGrid from "@/components/home/ToolsGrid";
import FeaturesSection from "@/components/home/FeaturesSection";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>SEOTools - Free SEO Tools Suite for Marketers & Developers</title>
        <meta 
          name="description" 
          content="Free, powerful SEO tools including meta tag generator, robots.txt checker, schema generator, and more. No signup required. Built for SEO professionals." 
        />
        <meta name="keywords" content="SEO tools, meta generator, schema generator, robots.txt checker, free SEO" />
        <link rel="canonical" href="https://seotools.com" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="SEOTools - Free SEO Tools Suite" />
        <meta property="og:description" content="Free, powerful SEO tools including meta tag generator, robots.txt checker, schema generator, and more." />
        <meta property="og:url" content="https://seotools.com" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SEOTools - Free SEO Tools Suite" />
        <meta name="twitter:description" content="Free, powerful SEO tools for marketers and developers." />
        
        {/* Schema.org JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "SEOTools",
            "url": "https://seotools.com",
            "description": "Free, powerful SEO tools suite for marketers and developers",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://seotools.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
      </Helmet>
      
      <Layout>
        <HeroSection />
        <ToolsGrid />
        <FeaturesSection />
        <CTASection />
      </Layout>
    </>
  );
};

export default Index;
