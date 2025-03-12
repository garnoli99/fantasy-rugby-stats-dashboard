import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { 
  LineChart, 
  BarChart, 
  Users, 
  Award, 
  User, 
  Home,
  Menu,
  X 
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  // Detect scroll for header styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Dashboard', icon: Home, href: '/' },
    { name: 'Player Stats', icon: User, href: '/players' },
    { name: 'Team Compare', icon: Users, href: '/teams' },
    { name: 'Points Trends', icon: LineChart, href: '/points' },
    { name: 'Cost Analysis', icon: BarChart, href: '/costs' },
    { name: 'Leaderboard', icon: Award, href: '/leaderboard' },
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-200 ease-in-out",
        scrolled 
          ? "bg-background/85 backdrop-blur-md border-b py-3" 
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-2"
          >
            <div className="h-8 w-8 rounded-md bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
              6N
            </div>
            <h1 className="text-xl font-semibold">Fantasy Rugby Stats</h1>
          </motion.div>

          {isMobile ? (
            <>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md hover:bg-muted/80 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X size={24} />
                ) : (
                  <Menu size={24} />
                )}
              </button>

              {/* Mobile Menu */}
              {mobileMenuOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b shadow-lg"
                >
                  <nav className="container py-4">
                    <ul className="space-y-2">
                      {menuItems.map((item) => (
                        <li key={item.name}>
                          <a 
                            href={item.href} 
                            className="flex items-center space-x-3 p-3 rounded-md hover:bg-muted/70 transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <item.icon size={18} />
                            <span>{item.name}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </motion.div>
              )}
            </>
          ) : (
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="hidden md:block"
            >
              <ul className="flex items-center space-x-1">
                {menuItems.map((item, index) => (
                  <motion.li 
                    key={item.name}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                  >
                    <a 
                      href={item.href} 
                      className={cn(
                        "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                        item.href === '/' 
                          ? "bg-primary/10 text-primary" 
                          : "hover:bg-muted/80"
                      )}
                    >
                      <item.icon size={16} className="mr-2" />
                      {item.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
