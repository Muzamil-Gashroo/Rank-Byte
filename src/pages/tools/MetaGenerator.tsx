import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileText, Copy, Check, RefreshCw, Sparkles, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const MetaGenerator = () => {
  const { toast } = useToast();
  const [pageTitle, setPageTitle] = useState("");
  const [pageDescription, setPageDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [generatedTitle, setGeneratedTitle] = useState("");
  const [generatedDescription, setGeneratedDescription] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const titleLength = generatedTitle.length;
  const descriptionLength = generatedDescription.length;
  
  const titleStatus = titleLength === 0 ? "empty" : titleLength <= 60 ? "good" : "warning";
  const descriptionStatus = descriptionLength === 0 ? "empty" : descriptionLength <= 160 ? "good" : "warning";

  const generateMeta = () => {
    if (!pageTitle.trim()) {
      toast({
        title: "Page title required",
        description: "Please enter a page title to generate meta tags.",
        variant: "destructive",
      });
      return;
    }

    // Simple generation logic (in real app, this would use AI)
    const cleanTitle = pageTitle.trim();
    const cleanDescription = pageDescription.trim();
    const keywordList = keywords.split(",").map(k => k.trim()).filter(Boolean);

    // Generate title
    let title = cleanTitle;
    if (title.length > 60) {
      title = title.substring(0, 57) + "...";
    } else if (title.length < 30 && keywordList.length > 0) {
      title = `${title} | ${keywordList[0]}`;
    }
    
    // Generate description
    let description = cleanDescription || `Learn about ${cleanTitle.toLowerCase()}. ${keywordList.length > 0 ? `Discover ${keywordList.slice(0, 2).join(", ")} and more.` : ""}`;
    if (description.length > 160) {
      description = description.substring(0, 157) + "...";
    }

    setGeneratedTitle(title);
    setGeneratedDescription(description);

    toast({
      title: "Meta tags generated!",
      description: "Your SEO-optimized meta tags are ready.",
    });
  };

  const copyToClipboard = async (text: string, type: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
    toast({
      title: "Copied!",
      description: `${type} copied to clipboard.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good": return "text-accent";
      case "warning": return "text-tool-redirect";
      default: return "text-muted-foreground";
    }
  };

  return (
    <>
      <Helmet>
        <title>Meta Title & Description Generator - Free SEO Tool | SEOTools</title>
        <meta 
          name="description" 
          content="Generate SEO-optimized meta titles and descriptions for your web pages. Free tool with character count validation and SERP preview." 
        />
        <link rel="canonical" href="https://seotools.com/tools/meta-generator" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Meta Title & Description Generator",
            "description": "Generate SEO-optimized meta titles and descriptions",
            "url": "https://seotools.com/tools/meta-generator",
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
                <div className="w-16 h-16 rounded-2xl bg-tool-meta/10 flex items-center justify-center mx-auto mb-6">
                  <FileText className="w-8 h-8 text-tool-meta" />
                </div>
                <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
                  Meta Title & Description Generator
                </h1>
                <p className="text-lg text-muted-foreground">
                  Create SEO-optimized meta tags that improve your click-through rates in search results.
                </p>
              </motion.div>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Input Form */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="card-elevated-lg p-6"
                >
                  <h2 className="font-heading text-lg font-semibold text-foreground mb-6">
                    Page Information
                  </h2>
                  
                  <div className="space-y-5">
                    <div>
                      <Label htmlFor="pageTitle">Page Title *</Label>
                      <Input
                        id="pageTitle"
                        placeholder="e.g., Best Coffee Shops in New York"
                        value={pageTitle}
                        onChange={(e) => setPageTitle(e.target.value)}
                        className="mt-1.5"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="pageDescription">Page Description</Label>
                      <Textarea
                        id="pageDescription"
                        placeholder="Briefly describe what this page is about..."
                        value={pageDescription}
                        onChange={(e) => setPageDescription(e.target.value)}
                        className="mt-1.5 min-h-[100px]"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="keywords">Target Keywords</Label>
                      <Input
                        id="keywords"
                        placeholder="coffee shops, NYC, best cafes"
                        value={keywords}
                        onChange={(e) => setKeywords(e.target.value)}
                        className="mt-1.5"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Separate keywords with commas
                      </p>
                    </div>

                    <Button onClick={generateMeta} className="w-full" size="lg">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Meta Tags
                    </Button>
                  </div>
                </motion.div>

                {/* Output */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="space-y-6"
                >
                  {/* Generated Title */}
                  <div className="card-elevated-lg p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-heading font-semibold text-foreground">Meta Title</h3>
                      <span className={`text-sm ${getStatusColor(titleStatus)}`}>
                        {titleLength}/60 characters
                      </span>
                    </div>
                    <div className="relative">
                      <div className="p-4 bg-secondary rounded-lg min-h-[60px]">
                        {generatedTitle ? (
                          <p className="text-foreground">{generatedTitle}</p>
                        ) : (
                          <p className="text-muted-foreground italic">Your meta title will appear here...</p>
                        )}
                      </div>
                      {generatedTitle && (
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="absolute top-2 right-2"
                          onClick={() => copyToClipboard(generatedTitle, "Title")}
                        >
                          {copied === "Title" ? (
                            <Check className="w-4 h-4 text-accent" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      )}
                    </div>
                    {titleStatus === "warning" && (
                      <div className="flex items-center gap-2 mt-2 text-sm text-tool-redirect">
                        <AlertCircle className="w-4 h-4" />
                        <span>Title exceeds recommended 60 characters</span>
                      </div>
                    )}
                  </div>

                  {/* Generated Description */}
                  <div className="card-elevated-lg p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-heading font-semibold text-foreground">Meta Description</h3>
                      <span className={`text-sm ${getStatusColor(descriptionStatus)}`}>
                        {descriptionLength}/160 characters
                      </span>
                    </div>
                    <div className="relative">
                      <div className="p-4 bg-secondary rounded-lg min-h-[80px]">
                        {generatedDescription ? (
                          <p className="text-foreground">{generatedDescription}</p>
                        ) : (
                          <p className="text-muted-foreground italic">Your meta description will appear here...</p>
                        )}
                      </div>
                      {generatedDescription && (
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="absolute top-2 right-2"
                          onClick={() => copyToClipboard(generatedDescription, "Description")}
                        >
                          {copied === "Description" ? (
                            <Check className="w-4 h-4 text-accent" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      )}
                    </div>
                    {descriptionStatus === "warning" && (
                      <div className="flex items-center gap-2 mt-2 text-sm text-tool-redirect">
                        <AlertCircle className="w-4 h-4" />
                        <span>Description exceeds recommended 160 characters</span>
                      </div>
                    )}
                  </div>

                  {/* SERP Preview */}
                  {(generatedTitle || generatedDescription) && (
                    <div className="card-elevated-lg p-6">
                      <h3 className="font-heading font-semibold text-foreground mb-4">
                        SERP Preview
                      </h3>
                      <div className="p-4 bg-background border border-border rounded-lg">
                        <p className="text-primary text-lg hover:underline cursor-pointer leading-tight">
                          {generatedTitle || "Your page title"}
                        </p>
                        <p className="text-sm text-accent mt-1">
                          https://yoursite.com/page-url
                        </p>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {generatedDescription || "Your meta description will appear here..."}
                        </p>
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

export default MetaGenerator;
