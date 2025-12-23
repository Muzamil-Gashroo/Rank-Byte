import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Check, X, Zap, Crown, Building2 } from "lucide-react";

const plans = [
  {
    name: "Free",
    description: "Perfect for occasional use",
    price: "$0",
    period: "forever",
    icon: Zap,
    features: [
      { text: "All basic tools", included: true },
      { text: "5 analyses per day", included: true },
      { text: "Standard processing speed", included: true },
      { text: "Community support", included: true },
      { text: "API access", included: false },
      { text: "Bulk processing", included: false },
      { text: "Priority support", included: false },
      { text: "Custom integrations", included: false },
    ],
    cta: "Get Started",
    href: "/tools",
    popular: false,
  },
  {
    name: "Pro",
    description: "For SEO professionals",
    price: "$19",
    period: "/month",
    icon: Crown,
    features: [
      { text: "All basic tools", included: true },
      { text: "Unlimited analyses", included: true },
      { text: "Priority processing", included: true },
      { text: "Email support", included: true },
      { text: "Full API access", included: true },
      { text: "Bulk processing (100/batch)", included: true },
      { text: "Priority support", included: false },
      { text: "Custom integrations", included: false },
    ],
    cta: "Start Free Trial",
    href: "/signup?plan=pro",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "For agencies & teams",
    price: "Custom",
    period: "",
    icon: Building2,
    features: [
      { text: "All basic tools", included: true },
      { text: "Unlimited analyses", included: true },
      { text: "Fastest processing", included: true },
      { text: "Dedicated support", included: true },
      { text: "Full API access", included: true },
      { text: "Unlimited bulk processing", included: true },
      { text: "24/7 priority support", included: true },
      { text: "Custom integrations", included: true },
    ],
    cta: "Contact Sales",
    href: "/contact",
    popular: false,
  },
];

const Pricing = () => {
  return (
    <>
      <Helmet>
        <title>Pricing - SEOTools | Free & Pro Plans</title>
        <meta 
          name="description" 
          content="Choose the perfect SEO tools plan for your needs. Start free with basic features or upgrade to Pro for unlimited analyses and API access." 
        />
        <link rel="canonical" href="https://seotools.com/pricing" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "SEOTools Pricing",
            "description": "Choose the perfect SEO tools plan for your needs",
            "url": "https://seotools.com/pricing"
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
                  Pricing
                </span>
                <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-4">
                  Simple, Transparent Pricing
                </h1>
                <p className="text-lg text-muted-foreground">
                  Start free and upgrade when you need more power. No hidden fees.
                </p>
              </motion.div>
            </div>

            {/* Pricing Cards */}
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative card-elevated-lg p-8 ${
                    plan.popular ? 'border-2 border-primary shadow-glow' : 'border border-border'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm font-semibold rounded-full">
                      Most Popular
                    </div>
                  )}
                  
                  <div className="text-center mb-8">
                    <div className={`w-12 h-12 rounded-xl ${plan.popular ? 'bg-primary/10' : 'bg-secondary'} flex items-center justify-center mx-auto mb-4`}>
                      <plan.icon className={`w-6 h-6 ${plan.popular ? 'text-primary' : 'text-foreground'}`} />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-foreground mb-1">
                      {plan.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {plan.description}
                    </p>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="font-heading text-4xl font-bold text-foreground">
                        {plan.price}
                      </span>
                      <span className="text-muted-foreground">{plan.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature.text} className="flex items-center gap-3">
                        {feature.included ? (
                          <Check className="w-5 h-5 text-accent flex-shrink-0" />
                        ) : (
                          <X className="w-5 h-5 text-muted-foreground/50 flex-shrink-0" />
                        )}
                        <span className={feature.included ? 'text-foreground' : 'text-muted-foreground'}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    variant={plan.popular ? "hero" : "outline"} 
                    className="w-full" 
                    size="lg"
                    asChild
                  >
                    <Link to={plan.href}>{plan.cta}</Link>
                  </Button>
                </motion.div>
              ))}
            </div>

            {/* FAQ Teaser */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center mt-16"
            >
              <p className="text-muted-foreground">
                Have questions?{" "}
                <Link to="/contact" className="text-primary font-medium hover:underline">
                  Contact us
                </Link>
                {" "}or check our{" "}
                <Link to="/faq" className="text-primary font-medium hover:underline">
                  FAQ
                </Link>
              </p>
            </motion.div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Pricing;
