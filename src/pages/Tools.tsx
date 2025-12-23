import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { 
  FileText, 
  Bot, 
  FileCode, 
  ArrowRight, 
  Link as LinkIcon,
  Zap,
  ArrowRightLeft
} from "lucide-react";

const tools = [
  {
    name: "Meta Title & Description Generator",
    description: "Generate SEO-optimized meta titles and descriptions with AI assistance. Perfect for improving click-through rates in search results.",
    icon: FileText,
    href: "/tools/meta-generator",
    color: "bg-tool-meta/10 text-tool-meta",
    borderColor: "border-tool-meta/20 hover:border-tool-meta/40",
    features: ["AI-powered suggestions", "Character count validation", "SERP preview"],
  },
  {
    name: "Robots.txt Checker",
    description: "Validate and analyze your robots.txt file. Identify crawling issues before they impact your search rankings.",
    icon: Bot,
    href: "/tools/robots-checker",
    color: "bg-tool-robots/10 text-tool-robots",
    borderColor: "border-tool-robots/20 hover:border-tool-robots/40",
    features: ["Syntax validation", "Directive analysis", "Bot testing"],
  },
  {
    name: "Schema (JSON-LD) Generator",
    description: "Create structured data markup for rich snippets. Support for Article, Product, FAQ, LocalBusiness, and more.",
    icon: FileCode,
    href: "/tools/schema-generator",
    color: "bg-tool-schema/10 text-tool-schema",
    borderColor: "border-tool-schema/20 hover:border-tool-schema/40",
    features: ["Multiple schema types", "Valid JSON-LD output", "Google testing link"],
  },
  {
    name: "Redirect / Status Code Checker",
    description: "Check HTTP status codes and trace redirect chains. Debug 301, 302, 404, and 500 errors with detailed hop information.",
    icon: ArrowRightLeft,
    href: "/tools/redirect-checker",
    color: "bg-tool-redirect/10 text-tool-redirect",
    borderColor: "border-tool-redirect/20 hover:border-tool-redirect/40",
    features: ["Redirect chain trace", "Response headers", "SSL verification"],
  },
  {
    name: "Internal Link Counter",
    description: "Analyze internal linking structure. Identify orphan pages and optimize link equity distribution across your site.",
    icon: LinkIcon,
    href: "/tools/link-counter",
    color: "bg-tool-links/10 text-tool-links",
    borderColor: "border-tool-links/20 hover:border-tool-links/40",
    features: ["Link extraction", "Anchor text analysis", "Follow/nofollow detection"],
  },
  {
    name: "Sitemap.xml Validator",
    description: "Validate your XML sitemap format and check for errors. Ensure search engines can properly crawl all your content.",
    icon: Zap,
    href: "/tools/sitemap-validator",
    color: "bg-tool-sitemap/10 text-tool-sitemap",
    borderColor: "border-tool-sitemap/20 hover:border-tool-sitemap/40",
    features: ["XML validation", "URL extraction", "Priority & frequency check"],
  },
];

const ToolsPage = () => {
  return (
    <>
      <Helmet>
        <title>Free SEO Tools - Meta Generator, Schema Builder & More | SEOTools</title>
        <meta 
          name="description" 
          content="Access our complete suite of free SEO tools. Generate meta tags, validate robots.txt, create schema markup, check redirects, and more." 
        />
        <link rel="canonical" href="https://seotools.com/tools" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Free SEO Tools",
            "description": "Complete suite of free SEO tools for marketers and developers",
            "url": "https://seotools.com/tools",
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": tools.map((tool, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "name": tool.name,
                "url": `https://seotools.com${tool.href}`
              }))
            }
          })}
        </script>
      </Helmet>
      
      <Layout>
        <section className="py-20 lg:py-28 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                  SEO Toolkit
                </span>
                <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-4">
                  Free SEO Tools
                </h1>
                <p className="text-lg text-muted-foreground">
                  Professional-grade tools to analyze, optimize, and monitor your website's SEO health. 
                  No signup required.
                </p>
              </motion.div>
            </div>

            {/* Tools Grid */}
            <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {tools.map((tool, index) => (
                <motion.div
                  key={tool.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    to={tool.href}
                    className={`group block h-full card-elevated-lg p-6 border-2 ${tool.borderColor} transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-14 h-14 rounded-xl ${tool.color} flex items-center justify-center flex-shrink-0`}>
                        <tool.icon className="w-7 h-7" />
                      </div>
                      <div className="flex-1">
                        <h2 className="font-heading text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {tool.name}
                        </h2>
                        <p className="text-sm text-muted-foreground mb-4">
                          {tool.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {tool.features.map((feature) => (
                            <span 
                              key={feature}
                              className="text-xs px-2 py-1 rounded-full bg-secondary text-muted-foreground"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-1 text-sm font-medium text-primary">
                          <span>Use this tool</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default ToolsPage;
