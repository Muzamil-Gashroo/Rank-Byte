import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileCode, Copy, Check, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type SchemaType = "Article" | "Product" | "FAQ" | "LocalBusiness" | "Organization";

const SchemaGenerator = () => {
  const { toast } = useToast();
  const [schemaType, setSchemaType] = useState<SchemaType>("Article");
  const [copied, setCopied] = useState(false);
  
  // Article fields
  const [articleTitle, setArticleTitle] = useState("");
  const [articleDescription, setArticleDescription] = useState("");
  const [articleAuthor, setArticleAuthor] = useState("");
  const [articleDate, setArticleDate] = useState("");
  const [articleImage, setArticleImage] = useState("");

  // Product fields
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCurrency, setProductCurrency] = useState("USD");
  const [productImage, setProductImage] = useState("");

  // Organization fields
  const [orgName, setOrgName] = useState("");
  const [orgUrl, setOrgUrl] = useState("");
  const [orgLogo, setOrgLogo] = useState("");

  const generateSchema = () => {
    switch (schemaType) {
      case "Article":
        return {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": articleTitle || "Article Title",
          "description": articleDescription || "Article description",
          "author": {
            "@type": "Person",
            "name": articleAuthor || "Author Name"
          },
          "datePublished": articleDate || new Date().toISOString().split('T')[0],
          "image": articleImage || "https://example.com/image.jpg"
        };
      case "Product":
        return {
          "@context": "https://schema.org",
          "@type": "Product",
          "name": productName || "Product Name",
          "description": productDescription || "Product description",
          "image": productImage || "https://example.com/product.jpg",
          "offers": {
            "@type": "Offer",
            "price": productPrice || "0.00",
            "priceCurrency": productCurrency
          }
        };
      case "Organization":
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": orgName || "Organization Name",
          "url": orgUrl || "https://example.com",
          "logo": orgLogo || "https://example.com/logo.png"
        };
      case "FAQ":
        return {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Sample question?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Sample answer to the question."
              }
            }
          ]
        };
      case "LocalBusiness":
        return {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": orgName || "Business Name",
          "url": orgUrl || "https://example.com",
          "telephone": "+1-555-555-5555",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "123 Main St",
            "addressLocality": "City",
            "addressRegion": "State",
            "postalCode": "12345",
            "addressCountry": "US"
          }
        };
      default:
        return {};
    }
  };

  const schemaOutput = JSON.stringify(generateSchema(), null, 2);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(schemaOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({ title: "Copied!", description: "Schema JSON-LD copied to clipboard." });
  };

  const openGoogleTest = () => {
    const encoded = encodeURIComponent(schemaOutput);
    window.open(`https://search.google.com/test/rich-results?code=${encoded}`, "_blank");
  };

  return (
    <>
      <Helmet>
        <title>Schema (JSON-LD) Generator - Free SEO Tool | SEOTools</title>
        <meta 
          name="description" 
          content="Generate structured data markup (JSON-LD) for rich snippets. Support for Article, Product, FAQ, LocalBusiness, and Organization schemas." 
        />
        <link rel="canonical" href="https://seotools.com/tools/schema-generator" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Schema (JSON-LD) Generator",
            "description": "Generate structured data markup for rich snippets",
            "url": "https://seotools.com/tools/schema-generator",
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
                <div className="w-16 h-16 rounded-2xl bg-tool-schema/10 flex items-center justify-center mx-auto mb-6">
                  <FileCode className="w-8 h-8 text-tool-schema" />
                </div>
                <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
                  Schema (JSON-LD) Generator
                </h1>
                <p className="text-lg text-muted-foreground">
                  Create structured data markup to enhance your search appearance with rich snippets.
                </p>
              </motion.div>
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Input Form */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="card-elevated-lg p-6"
                >
                  <div className="mb-6">
                    <Label htmlFor="schemaType">Schema Type</Label>
                    <Select value={schemaType} onValueChange={(v) => setSchemaType(v as SchemaType)}>
                      <SelectTrigger className="mt-1.5">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Article">Article</SelectItem>
                        <SelectItem value="Product">Product</SelectItem>
                        <SelectItem value="Organization">Organization</SelectItem>
                        <SelectItem value="LocalBusiness">Local Business</SelectItem>
                        <SelectItem value="FAQ">FAQ</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Article Fields */}
                  {schemaType === "Article" && (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="articleTitle">Headline</Label>
                        <Input
                          id="articleTitle"
                          placeholder="Article title"
                          value={articleTitle}
                          onChange={(e) => setArticleTitle(e.target.value)}
                          className="mt-1.5"
                        />
                      </div>
                      <div>
                        <Label htmlFor="articleDescription">Description</Label>
                        <Textarea
                          id="articleDescription"
                          placeholder="Brief description"
                          value={articleDescription}
                          onChange={(e) => setArticleDescription(e.target.value)}
                          className="mt-1.5"
                        />
                      </div>
                      <div>
                        <Label htmlFor="articleAuthor">Author Name</Label>
                        <Input
                          id="articleAuthor"
                          placeholder="John Doe"
                          value={articleAuthor}
                          onChange={(e) => setArticleAuthor(e.target.value)}
                          className="mt-1.5"
                        />
                      </div>
                      <div>
                        <Label htmlFor="articleDate">Publish Date</Label>
                        <Input
                          id="articleDate"
                          type="date"
                          value={articleDate}
                          onChange={(e) => setArticleDate(e.target.value)}
                          className="mt-1.5"
                        />
                      </div>
                      <div>
                        <Label htmlFor="articleImage">Image URL</Label>
                        <Input
                          id="articleImage"
                          placeholder="https://example.com/image.jpg"
                          value={articleImage}
                          onChange={(e) => setArticleImage(e.target.value)}
                          className="mt-1.5"
                        />
                      </div>
                    </div>
                  )}

                  {/* Product Fields */}
                  {schemaType === "Product" && (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="productName">Product Name</Label>
                        <Input
                          id="productName"
                          placeholder="Product name"
                          value={productName}
                          onChange={(e) => setProductName(e.target.value)}
                          className="mt-1.5"
                        />
                      </div>
                      <div>
                        <Label htmlFor="productDescription">Description</Label>
                        <Textarea
                          id="productDescription"
                          placeholder="Product description"
                          value={productDescription}
                          onChange={(e) => setProductDescription(e.target.value)}
                          className="mt-1.5"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="productPrice">Price</Label>
                          <Input
                            id="productPrice"
                            placeholder="29.99"
                            value={productPrice}
                            onChange={(e) => setProductPrice(e.target.value)}
                            className="mt-1.5"
                          />
                        </div>
                        <div>
                          <Label htmlFor="productCurrency">Currency</Label>
                          <Select value={productCurrency} onValueChange={setProductCurrency}>
                            <SelectTrigger className="mt-1.5">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="USD">USD</SelectItem>
                              <SelectItem value="EUR">EUR</SelectItem>
                              <SelectItem value="GBP">GBP</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="productImage">Image URL</Label>
                        <Input
                          id="productImage"
                          placeholder="https://example.com/product.jpg"
                          value={productImage}
                          onChange={(e) => setProductImage(e.target.value)}
                          className="mt-1.5"
                        />
                      </div>
                    </div>
                  )}

                  {/* Organization / LocalBusiness Fields */}
                  {(schemaType === "Organization" || schemaType === "LocalBusiness") && (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="orgName">Name</Label>
                        <Input
                          id="orgName"
                          placeholder="Organization name"
                          value={orgName}
                          onChange={(e) => setOrgName(e.target.value)}
                          className="mt-1.5"
                        />
                      </div>
                      <div>
                        <Label htmlFor="orgUrl">Website URL</Label>
                        <Input
                          id="orgUrl"
                          placeholder="https://example.com"
                          value={orgUrl}
                          onChange={(e) => setOrgUrl(e.target.value)}
                          className="mt-1.5"
                        />
                      </div>
                      <div>
                        <Label htmlFor="orgLogo">Logo URL</Label>
                        <Input
                          id="orgLogo"
                          placeholder="https://example.com/logo.png"
                          value={orgLogo}
                          onChange={(e) => setOrgLogo(e.target.value)}
                          className="mt-1.5"
                        />
                      </div>
                    </div>
                  )}

                  {schemaType === "FAQ" && (
                    <div className="p-4 bg-secondary rounded-lg text-sm text-muted-foreground">
                      <p>FAQ schema is generated with sample data. Edit the JSON output directly to add your questions and answers.</p>
                    </div>
                  )}
                </motion.div>

                {/* Output */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="card-elevated-lg p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-heading font-semibold text-foreground">
                      Generated JSON-LD
                    </h3>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={openGoogleTest}>
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Test
                      </Button>
                      <Button variant="outline" size="sm" onClick={copyToClipboard}>
                        {copied ? (
                          <Check className="w-4 h-4 mr-1 text-accent" />
                        ) : (
                          <Copy className="w-4 h-4 mr-1" />
                        )}
                        Copy
                      </Button>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <pre className="p-4 bg-foreground/5 rounded-lg overflow-auto max-h-[400px] text-sm font-mono text-foreground">
                      <code>{schemaOutput}</code>
                    </pre>
                  </div>

                  <div className="mt-6 p-4 bg-primary/5 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2 text-sm">How to use</h4>
                    <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                      <li>Copy the JSON-LD code above</li>
                      <li>Add it inside a <code className="text-primary">&lt;script type="application/ld+json"&gt;</code> tag</li>
                      <li>Place it in your page's <code className="text-primary">&lt;head&gt;</code> section</li>
                      <li>Test with Google's Rich Results Test</li>
                    </ol>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default SchemaGenerator;
