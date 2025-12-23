import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  X, 
  ChevronDown,
  Zap,
  FileText,
  Bot,
  Link as LinkIcon,
  FileCode,
  ArrowRight
} from "lucide-react";

const tools = [
  { name: "Meta Generator", href: "/tools/meta-generator", icon: FileText, color: "text-tool-meta" },
  { name: "Robots.txt Checker", href: "/tools/robots-checker", icon: Bot, color: "text-tool-robots" },
  { name: "Schema Generator", href: "/tools/schema-generator", icon: FileCode, color: "text-tool-schema" },
  { name: "Redirect Checker", href: "/tools/redirect-checker", icon: ArrowRight, color: "text-tool-redirect" },
  { name: "Internal Link Counter", href: "/tools/link-counter", icon: LinkIcon, color: "text-tool-links" },
  { name: "Sitemap Validator", href: "/tools/sitemap-validator", icon: Zap, color: "text-tool-sitemap" },
];

const Navbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-heading font-bold text-xl text-foreground">
              SEO<span className="text-primary">Tools</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Tools Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setToolsOpen(true)}
              onMouseLeave={() => setToolsOpen(false)}
            >
              <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Tools
                <ChevronDown className={`w-4 h-4 transition-transform ${toolsOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {toolsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-1 w-64 bg-card rounded-xl border border-border shadow-xl p-2"
                  >
                    {tools.map((tool) => (
                      <Link
                        key={tool.href}
                        to={tool.href}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                      >
                        <tool.icon className={`w-4 h-4 ${tool.color}`} />
                        {tool.name}
                      </Link>
                    ))}
                    <div className="border-t border-border mt-2 pt-2">
                      <Link
                        to="/tools"
                        className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-primary hover:bg-primary/5 transition-colors"
                      >
                        View All Tools
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link 
              to="/pricing" 
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                isActive('/pricing') ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Pricing
            </Link>
            <Link 
              to="/blog" 
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                isActive('/blog') ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Blog
            </Link>
            <Link 
              to="/api/docs" 
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                isActive('/api/docs') ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              API
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/login">Log in</Link>
            </Button>
            <Button size="sm" asChild>
              <Link to="/pricing">Get Started Free</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden border-t border-border"
            >
              <div className="py-4 space-y-2">
                <div className="px-2 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Tools
                </div>
                {tools.map((tool) => (
                  <Link
                    key={tool.href}
                    to={tool.href}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <tool.icon className={`w-4 h-4 ${tool.color}`} />
                    {tool.name}
                  </Link>
                ))}
                <div className="border-t border-border my-4" />
                <Link
                  to="/pricing"
                  className="block px-4 py-2.5 text-sm font-medium text-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Pricing
                </Link>
                <Link
                  to="/blog"
                  className="block px-4 py-2.5 text-sm font-medium text-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Blog
                </Link>
                <Link
                  to="/api/docs"
                  className="block px-4 py-2.5 text-sm font-medium text-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  API
                </Link>
                <div className="pt-4 px-4 space-y-2">
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/login">Log in</Link>
                  </Button>
                  <Button className="w-full" asChild>
                    <Link to="/pricing">Get Started Free</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Navbar;
