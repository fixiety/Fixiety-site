import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter } from 'lucide-react';

function Footer() {
  return (
    <footer className="border-t border-border/40 bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-xl font-semibold tracking-tight">Fixiety</span>
            <p className="text-sm text-muted-foreground">Not just bikes. Identity.</p>
          </div>

          <div className="flex items-center gap-8">
            <Link
              to="/privacy"
              className="text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
            >
              Terms of Service
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/_fixiety_/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors duration-300 hover:text-foreground"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors duration-300 hover:text-foreground"
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/40 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Fixiety. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;