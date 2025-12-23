import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Bot, Check, AlertCircle, Info, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DirectiveResult {
  type: "allow" | "disallow" | "sitemap" | "crawl-delay" | "user-agent" | "comment" | "error";
  line: number;
  content: string;
  message?: string;
}

const RobotsChecker = () => {
  const { toast } = useToast();
  const [robotsTxt, setRobotsTxt] = useState("");
  const [results, setResults] = useState<DirectiveResult[]>([]);
  const [analyzed, setAnalyzed] = useState(false);
  const [copied, setCopied] = useState(false);

  const sampleRobotsTxt = `# Robots.txt for example.com
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /private/
Disallow: /api/

User-agent: Googlebot
Allow: /
Crawl-delay: 10

Sitemap: https://example.com/sitemap.xml`;

  const analyzeRobotsTxt = () => {
    if (!robotsTxt.trim()) {
      toast({
        title: "Content required",
        description: "Please enter your robots.txt content to analyze.",
        variant: "destructive",
      });
      return;
    }

    const lines = robotsTxt.split("\n");
    const parsedResults: DirectiveResult[] = [];

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      const lineNumber = index + 1;

      if (!trimmedLine) return;

      if (trimmedLine.startsWith("#")) {
        parsedResults.push({
          type: "comment",
          line: lineNumber,
          content: trimmedLine,
        });
      } else if (trimmedLine.toLowerCase().startsWith("user-agent:")) {
        parsedResults.push({
          type: "user-agent",
          line: lineNumber,
          content: trimmedLine,
          message: `Defines rules for: ${trimmedLine.split(":")[1]?.trim() || "unknown"}`,
        });
      } else if (trimmedLine.toLowerCase().startsWith("allow:")) {
        parsedResults.push({
          type: "allow",
          line: lineNumber,
          content: trimmedLine,
          message: `Allows crawling of: ${trimmedLine.split(":")[1]?.trim() || "/"}`,
        });
      } else if (trimmedLine.toLowerCase().startsWith("disallow:")) {
        const path = trimmedLine.split(":")[1]?.trim();
        parsedResults.push({
          type: "disallow",
          line: lineNumber,
          content: trimmedLine,
          message: path ? `Blocks crawling of: ${path}` : "Empty disallow (allows all)",
        });
      } else if (trimmedLine.toLowerCase().startsWith("sitemap:")) {
        parsedResults.push({
          type: "sitemap",
          line: lineNumber,
          content: trimmedLine,
          message: `References sitemap at: ${trimmedLine.split(":").slice(1).join(":").trim()}`,
        });
      } else if (trimmedLine.toLowerCase().startsWith("crawl-delay:")) {
        const delay = trimmedLine.split(":")[1]?.trim();
        parsedResults.push({
          type: "crawl-delay",
          line: lineNumber,
          content: trimmedLine,
          message: `Sets crawl delay to ${delay} seconds`,
        });
      } else {
        parsedResults.push({
          type: "error",
          line: lineNumber,
          content: trimmedLine,
          message: "Unknown or invalid directive",
        });
      }
    });

    setResults(parsedResults);
    setAnalyzed(true);

    const errors = parsedResults.filter(r => r.type === "error");
    if (errors.length > 0) {
      toast({
        title: "Analysis complete with warnings",
        description: `Found ${errors.length} potential issue(s) in your robots.txt`,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Analysis complete",
        description: "Your robots.txt appears to be valid!",
      });
    }
  };

  const loadSample = () => {
    setRobotsTxt(sampleRobotsTxt);
    setAnalyzed(false);
    setResults([]);
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(robotsTxt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({ title: "Copied!", description: "Content copied to clipboard." });
  };

  const getIcon = (type: DirectiveResult["type"]) => {
    switch (type) {
      case "allow": return <Check className="w-4 h-4 text-accent" />;
      case "disallow": return <AlertCircle className="w-4 h-4 text-tool-redirect" />;
      case "error": return <AlertCircle className="w-4 h-4 text-destructive" />;
      default: return <Info className="w-4 h-4 text-primary" />;
    }
  };

  const getTypeColor = (type: DirectiveResult["type"]) => {
    switch (type) {
      case "allow": return "bg-accent/10 text-accent border-accent/20";
      case "disallow": return "bg-tool-redirect/10 text-tool-redirect border-tool-redirect/20";
      case "error": return "bg-destructive/10 text-destructive border-destructive/20";
      case "sitemap": return "bg-tool-sitemap/10 text-tool-sitemap border-tool-sitemap/20";
      case "user-agent": return "bg-primary/10 text-primary border-primary/20";
      default: return "bg-secondary text-muted-foreground border-border";
    }
  };

  return (
    <>
      <Helmet>
        <title>Robots.txt Checker & Validator - Free SEO Tool | SEOTools</title>
        <meta 
          name="description" 
          content="Validate and analyze your robots.txt file. Check for syntax errors, identify crawling directives, and ensure search engines can properly access your site." 
        />
        <link rel="canonical" href="https://seotools.com/tools/robots-checker" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Robots.txt Checker",
            "description": "Validate and analyze robots.txt files",
            "url": "https://seotools.com/tools/robots-checker",
            "applicationCategory": "SEO Tool",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })}
        </script>
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
                <div className="w-16 h-16 rounded-2xl bg-tool-robots/10 flex items-center justify-center mx-auto mb-6">
                  <Bot className="w-8 h-8 text-tool-robots" />
                </div>
                <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
                  Robots.txt Checker
                </h1>
                <p className="text-lg text-muted-foreground">
                  Validate your robots.txt file and identify potential crawling issues.
                </p>
              </motion.div>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Input */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="card-elevated-lg p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <Label htmlFor="robotsTxt">Robots.txt Content</Label>
                    <Button variant="ghost" size="sm" onClick={loadSample}>
                      Load Sample
                    </Button>
                  </div>
                  <div className="relative">
                    <Textarea
                      id="robotsTxt"
                      placeholder="Paste your robots.txt content here..."
                      value={robotsTxt}
                      onChange={(e) => {
                        setRobotsTxt(e.target.value);
                        setAnalyzed(false);
                      }}
                      className="min-h-[300px] font-mono text-sm"
                    />
                    {robotsTxt && (
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="absolute top-2 right-2"
                        onClick={copyToClipboard}
                      >
                        {copied ? (
                          <Check className="w-4 h-4 text-accent" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    )}
                  </div>
                  <Button onClick={analyzeRobotsTxt} className="w-full mt-4" size="lg">
                    Analyze Robots.txt
                  </Button>
                </motion.div>

                {/* Results */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="card-elevated-lg p-6"
                >
                  <h3 className="font-heading font-semibold text-foreground mb-4">
                    Analysis Results
                  </h3>
                  
                  {!analyzed ? (
                    <div className="flex flex-col items-center justify-center h-[300px] text-center">
                      <Bot className="w-12 h-12 text-muted-foreground/30 mb-4" />
                      <p className="text-muted-foreground">
                        Paste your robots.txt content and click analyze to see results.
                      </p>
                    </div>
                  ) : results.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-[300px] text-center">
                      <AlertCircle className="w-12 h-12 text-muted-foreground/30 mb-4" />
                      <p className="text-muted-foreground">No directives found.</p>
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-[400px] overflow-y-auto">
                      {results.map((result, index) => (
                        <div
                          key={index}
                          className={`p-3 rounded-lg border ${getTypeColor(result.type)}`}
                        >
                          <div className="flex items-start gap-2">
                            {getIcon(result.type)}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-medium uppercase">
                                  Line {result.line}
                                </span>
                                <span className="text-xs px-1.5 py-0.5 rounded bg-background/50">
                                  {result.type}
                                </span>
                              </div>
                              <code className="text-sm font-mono block mt-1 truncate">
                                {result.content}
                              </code>
                              {result.message && (
                                <p className="text-xs mt-1 opacity-80">
                                  {result.message}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Summary */}
                  {analyzed && results.length > 0 && (
                    <div className="mt-6 pt-4 border-t border-border">
                      <h4 className="text-sm font-semibold text-foreground mb-3">Summary</h4>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-accent" />
                          <span>Allow: {results.filter(r => r.type === "allow").length}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-tool-redirect" />
                          <span>Disallow: {results.filter(r => r.type === "disallow").length}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-tool-sitemap" />
                          <span>Sitemaps: {results.filter(r => r.type === "sitemap").length}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-destructive" />
                          <span>Errors: {results.filter(r => r.type === "error").length}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default RobotsChecker;
