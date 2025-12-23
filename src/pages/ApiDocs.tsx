import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Code2, Copy, Check, ExternalLink, Key, Zap } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const endpoints = [
  {
    method: "POST",
    path: "/api/tools/meta-title",
    description: "Generate SEO-optimized meta titles and descriptions",
    params: [
      { name: "title", type: "string", required: true, description: "Page title or topic" },
      { name: "description", type: "string", required: false, description: "Page description (optional)" },
      { name: "keywords", type: "string[]", required: false, description: "Target keywords" },
    ],
  },
  {
    method: "POST",
    path: "/api/tools/schema",
    description: "Generate JSON-LD structured data",
    params: [
      { name: "type", type: "string", required: true, description: "Schema type (Article, Product, etc.)" },
      { name: "data", type: "object", required: true, description: "Schema-specific data" },
    ],
  },
  {
    method: "POST",
    path: "/api/tools/redirect-check",
    description: "Check URL redirects and status codes",
    params: [
      { name: "url", type: "string", required: true, description: "URL to check" },
      { name: "follow_redirects", type: "boolean", required: false, description: "Follow redirect chain" },
    ],
  },
  {
    method: "POST",
    path: "/api/tools/sitemap-validate",
    description: "Validate XML sitemap format",
    params: [
      { name: "url", type: "string", required: true, description: "Sitemap URL or raw XML content" },
    ],
  },
  {
    method: "GET",
    path: "/api/blog/list",
    description: "List all blog posts with pagination",
    params: [
      { name: "page", type: "number", required: false, description: "Page number (default: 1)" },
      { name: "limit", type: "number", required: false, description: "Items per page (default: 10)" },
    ],
  },
  {
    method: "GET",
    path: "/api/blog/:slug",
    description: "Get a single blog post by slug",
    params: [
      { name: "slug", type: "string", required: true, description: "Blog post slug" },
    ],
  },
];

const ApiDocs = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState<string | null>(null);

  const sampleCode = `fetch('https://api.seotools.com/tools/meta-title', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    title: 'Best Coffee Shops in NYC',
    keywords: ['coffee', 'NYC', 'cafes']
  })
})`;

  const copyCode = async () => {
    await navigator.clipboard.writeText(sampleCode);
    setCopied("code");
    setTimeout(() => setCopied(null), 2000);
    toast({ title: "Copied!", description: "Code copied to clipboard." });
  };

  return (
    <>
      <Helmet>
        <title>API Documentation - SEOTools REST API</title>
        <meta 
          name="description" 
          content="Integrate SEOTools into your workflow with our REST API. Documentation for meta generation, schema creation, redirect checking, and more." 
        />
        <link rel="canonical" href="https://seotools.com/api/docs" />
      </Helmet>
      
      <Layout>
        <section className="py-12 lg:py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="max-w-3xl mx-auto mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Code2 className="w-8 h-8 text-primary" />
                </div>
                <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
                  API Documentation
                </h1>
                <p className="text-lg text-muted-foreground">
                  Integrate our SEO tools into your workflow with our REST API.
                </p>
              </motion.div>
            </div>

            <div className="max-w-5xl mx-auto">
              {/* Quick Start */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="card-elevated-lg p-6 mb-8"
              >
                <h2 className="font-heading text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  Quick Start
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <Key className="w-4 h-4" />
                      Authentication
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      All API requests require an API key. Include it in the Authorization header:
                    </p>
                    <code className="block p-3 bg-foreground/5 rounded-lg text-sm font-mono">
                      Authorization: Bearer YOUR_API_KEY
                    </code>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Base URL</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      All API endpoints are relative to:
                    </p>
                    <code className="block p-3 bg-foreground/5 rounded-lg text-sm font-mono">
                      https://api.seotools.com
                    </code>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-foreground">Example Request</h3>
                    <Button variant="ghost" size="sm" onClick={copyCode}>
                      {copied === "code" ? (
                        <Check className="w-4 h-4 mr-1 text-accent" />
                      ) : (
                        <Copy className="w-4 h-4 mr-1" />
                      )}
                      Copy
                    </Button>
                  </div>
                  <pre className="p-4 bg-foreground/5 rounded-lg overflow-auto text-sm font-mono">
                    <code>{sampleCode}</code>
                  </pre>
                </div>
              </motion.div>

              {/* Endpoints */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="font-heading text-xl font-semibold text-foreground mb-6">
                  API Endpoints
                </h2>
                
                <div className="space-y-4">
                  {endpoints.map((endpoint, index) => (
                    <div
                      key={endpoint.path}
                      className="card-elevated p-5 border border-border"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                          endpoint.method === "GET" 
                            ? "bg-accent/10 text-accent" 
                            : "bg-primary/10 text-primary"
                        }`}>
                          {endpoint.method}
                        </span>
                        <code className="font-mono text-sm text-foreground">
                          {endpoint.path}
                        </code>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-4">
                        {endpoint.description}
                      </p>
                      
                      {endpoint.params.length > 0 && (
                        <div>
                          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                            Parameters
                          </h4>
                          <div className="space-y-2">
                            {endpoint.params.map((param) => (
                              <div
                                key={param.name}
                                className="flex items-start gap-3 text-sm p-2 bg-secondary/50 rounded"
                              >
                                <code className="font-mono text-primary">{param.name}</code>
                                <span className="text-muted-foreground text-xs">
                                  {param.type}
                                  {param.required && <span className="text-destructive ml-1">*</span>}
                                </span>
                                <span className="text-muted-foreground flex-1">
                                  {param.description}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Get API Key CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-12 text-center"
              >
                <div className="card-elevated-lg p-8 bg-gradient-to-br from-primary/5 to-accent/5">
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                    Ready to integrate?
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Get your API key and start building with SEOTools.
                  </p>
                  <Button size="lg" asChild>
                    <a href="/pricing">
                      Get API Access
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default ApiDocs;
