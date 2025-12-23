import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, Tag } from "lucide-react";

const blogPosts = [
  {
    slug: "complete-guide-meta-tags-seo",
    title: "The Complete Guide to Meta Tags for SEO in 2024",
    excerpt: "Learn how to write effective meta titles and descriptions that improve click-through rates and rankings. Includes best practices and examples.",
    date: "2024-01-15",
    category: "SEO Basics",
    readTime: "8 min read",
  },
  {
    slug: "robots-txt-best-practices",
    title: "Robots.txt Best Practices: Control How Search Engines Crawl Your Site",
    excerpt: "Master the robots.txt file with our comprehensive guide. Learn about directives, common mistakes, and how to optimize for better crawling.",
    date: "2024-01-10",
    category: "Technical SEO",
    readTime: "6 min read",
  },
  {
    slug: "structured-data-rich-snippets",
    title: "Structured Data & Rich Snippets: A Developer's Guide",
    excerpt: "Implement JSON-LD structured data to enhance your search results. Covers Article, Product, FAQ, and Organization schemas.",
    date: "2024-01-05",
    category: "Technical SEO",
    readTime: "10 min read",
  },
  {
    slug: "internal-linking-strategies",
    title: "Internal Linking Strategies That Actually Work",
    excerpt: "Discover how to build an effective internal linking structure that distributes link equity and improves user navigation.",
    date: "2023-12-28",
    category: "On-Page SEO",
    readTime: "7 min read",
  },
  {
    slug: "redirect-chain-seo-impact",
    title: "How Redirect Chains Impact Your SEO (And How to Fix Them)",
    excerpt: "Learn about redirect chains, their SEO impact, and step-by-step instructions to identify and fix them on your website.",
    date: "2023-12-20",
    category: "Technical SEO",
    readTime: "5 min read",
  },
  {
    slug: "xml-sitemap-optimization",
    title: "XML Sitemap Optimization: Ensure Every Page Gets Indexed",
    excerpt: "Everything you need to know about XML sitemaps. From creation to submission, optimize your sitemap for maximum indexation.",
    date: "2023-12-15",
    category: "Technical SEO",
    readTime: "6 min read",
  },
];

const Blog = () => {
  return (
    <>
      <Helmet>
        <title>SEO Blog - Tips, Guides & Best Practices | SEOTools</title>
        <meta 
          name="description" 
          content="Expert SEO guides, tutorials, and best practices. Learn about meta tags, structured data, technical SEO, and more from our blog." 
        />
        <link rel="canonical" href="https://seotools.com/blog" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "SEOTools Blog",
            "description": "Expert SEO guides and tutorials",
            "url": "https://seotools.com/blog",
            "blogPost": blogPosts.map(post => ({
              "@type": "BlogPosting",
              "headline": post.title,
              "description": post.excerpt,
              "datePublished": post.date,
              "url": `https://seotools.com/blog/${post.slug}`
            }))
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
                  Blog
                </span>
                <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-4">
                  SEO Insights & Guides
                </h1>
                <p className="text-lg text-muted-foreground">
                  Expert tips, tutorials, and best practices to improve your search rankings.
                </p>
              </motion.div>
            </div>

            {/* Blog Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {blogPosts.map((post, index) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <Link
                    to={`/blog/${post.slug}`}
                    className="block h-full card-elevated-lg p-6 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  >
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                      <span className="px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                        {post.category}
                      </span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    
                    <h2 className="font-heading text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Calendar className="w-3.5 h-3.5" />
                        <time dateTime={post.date}>
                          {new Date(post.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </time>
                      </div>
                      <span className="flex items-center gap-1 text-sm font-medium text-primary">
                        Read more
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>

            {/* Load More */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="text-center mt-12"
            >
              <Button variant="outline" size="lg">
                Load More Articles
              </Button>
            </motion.div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Blog;
