import { motion } from "framer-motion";
import { Zap, Lock, Globe, BarChart3, Code2, Sparkles } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "All tools run instantly with no loading times. Get results in milliseconds, not seconds.",
  },
  {
    icon: Lock,
    title: "Privacy First",
    description: "Your data stays private. We don't store URLs, content, or analysis results on our servers.",
  },
  {
    icon: Globe,
    title: "No Signup Required",
    description: "Use all basic tools without creating an account. Pro features available for power users.",
  },
  {
    icon: BarChart3,
    title: "Detailed Reports",
    description: "Get comprehensive insights with actionable recommendations to improve your SEO.",
  },
  {
    icon: Code2,
    title: "API Access",
    description: "Integrate our tools into your workflow with our well-documented REST API.",
  },
  {
    icon: Sparkles,
    title: "AI-Powered",
    description: "Some tools leverage AI to provide smarter suggestions and automated optimization.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">
              Why Choose Us
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-4">
              Built for SEO Professionals
            </h2>
            <p className="text-lg text-muted-foreground">
              We've designed every tool with simplicity and power in mind.
            </p>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
