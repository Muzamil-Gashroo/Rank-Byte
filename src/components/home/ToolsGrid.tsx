import { motion } from "framer-motion";
import { Link } from "react-router-dom";
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
    description: "Generate SEO-optimized meta titles and descriptions with AI assistance. Perfect for improving click-through rates.",
    icon: FileText,
    href: "/tools/meta-generator",
    color: "bg-tool-meta/10 text-tool-meta",
    borderColor: "border-tool-meta/20 hover:border-tool-meta/40",
  },
  {
    name: "Robots.txt Checker",
    description: "Validate and analyze your robots.txt file. Identify crawling issues before they impact your rankings.",
    icon: Bot,
    href: "/tools/robots-checker",
    color: "bg-tool-robots/10 text-tool-robots",
    borderColor: "border-tool-robots/20 hover:border-tool-robots/40",
  },
  {
    name: "Schema (JSON-LD) Generator",
    description: "Create structured data markup for rich snippets. Support for Article, Product, FAQ, and more.",
    icon: FileCode,
    href: "/tools/schema-generator",
    color: "bg-tool-schema/10 text-tool-schema",
    borderColor: "border-tool-schema/20 hover:border-tool-schema/40",
  },
  {
    name: "Redirect / Status Code Checker",
    description: "Check HTTP status codes and trace redirect chains. Debug 301, 302, 404, and 500 errors easily.",
    icon: ArrowRightLeft,
    href: "/tools/redirect-checker",
    color: "bg-tool-redirect/10 text-tool-redirect",
    borderColor: "border-tool-redirect/20 hover:border-tool-redirect/40",
  },
  {
    name: "Internal Link Counter",
    description: "Analyze internal linking structure. Identify orphan pages and optimize link equity distribution.",
    icon: LinkIcon,
    href: "/tools/link-counter",
    color: "bg-tool-links/10 text-tool-links",
    borderColor: "border-tool-links/20 hover:border-tool-links/40",
  },
  {
    name: "Sitemap.xml Validator",
    description: "Validate your XML sitemap format and check for errors. Ensure search engines can crawl your content.",
    icon: Zap,
    href: "/tools/sitemap-validator",
    color: "bg-tool-sitemap/10 text-tool-sitemap",
    borderColor: "border-tool-sitemap/20 hover:border-tool-sitemap/40",
  },
];

const ToolsGrid = () => {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">
              SEO Toolkit
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-4">
              Everything You Need for SEO
            </h2>
            <p className="text-lg text-muted-foreground">
              Professional-grade tools to analyze, optimize, and monitor your website's SEO health.
            </p>
          </motion.div>
        </div>

        {/* Tools Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                to={tool.href}
                className={`group block h-full card-elevated-lg p-6 border-2 ${tool.borderColor} transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
              >
                <div className={`w-12 h-12 rounded-xl ${tool.color} flex items-center justify-center mb-4`}>
                  <tool.icon className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {tool.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {tool.description}
                </p>
                <div className="flex items-center gap-1 text-sm font-medium text-primary">
                  <span>Try it free</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link
            to="/tools"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
          >
            View all tools
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ToolsGrid;
