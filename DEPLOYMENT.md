# 🚀 Portfolio Deployment Guide

This guide provides step-by-step instructions for deploying your modern portfolio website to various hosting platforms.

## 📋 Prerequisites

Before deploying, ensure you have:

- ✅ Node.js 18+ or Bun installed
- ✅ Git repository set up
- ✅ Project builds successfully locally (`bun run build`)
- ✅ All environment variables configured (if any)

## 🔧 Pre-Deployment Checklist

1. **Test Local Build**
   ```bash
   bun run build
   bun run start
   ```

2. **Update Personal Information**
   - Edit contact details in `src/app/page.tsx`
   - Update social media links
   - Replace project links with your own

3. **SEO Optimization**
   - Update metadata in `src/app/layout.tsx`
   - Add your domain to OpenGraph URLs
   - Create a sitemap if needed

4. **Performance Check**
   ```bash
   # Install Lighthouse CLI (optional)
   npm install -g lighthouse
   lighthouse http://localhost:3000 --output=html
   ```

## 🌐 Deployment Platforms

### 1. Vercel (Recommended) ⭐

Vercel is the creator of Next.js and provides the best integration.

#### Automatic Deployment

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign up with your GitHub account
   - Click "New Project"
   - Import your portfolio repository
   - Vercel will auto-detect Next.js settings

3. **Configure Settings**
   - **Framework Preset**: Next.js
   - **Build Command**: `bun run build` (or leave default)
   - **Output Directory**: Leave empty
   - **Install Command**: `bun install` (or leave default)

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Your site will be live at `your-project.vercel.app`

#### Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts and deploy
vercel --prod
```

#### Custom Domain on Vercel

1. Go to your project dashboard
2. Click "Domains" tab
3. Add your custom domain
4. Update DNS records as instructed
5. SSL certificate will be auto-generated

---

### 2. Netlify

#### Git-based Deployment

1. **Connect Repository**
   - Visit [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository

2. **Build Settings**
   ```
   Build command: npm run build
   Publish directory: out
   ```

3. **Next.js Configuration**
   
   Update `next.config.ts`:
   ```typescript
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     output: 'export',
     trailingSlash: true,
     images: {
       unoptimized: true
     }
   }
   
   module.exports = nextConfig
   ```

4. **Deploy**
   - Click "Deploy site"
   - Site will be live at a random Netlify URL

#### Manual Deployment

```bash
# Build the project
bun run build

# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy

# Production deployment
netlify deploy --prod
```

---

### 3. GitHub Pages

1. **Update next.config.ts**
   ```typescript
   const nextConfig = {
     output: 'export',
     basePath: '/your-repo-name',
     assetPrefix: '/your-repo-name/',
     trailingSlash: true,
     images: {
       unoptimized: true
     }
   }
   ```

2. **Create GitHub Action**
   
   Create `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy to GitHub Pages
   
   on:
     push:
       branches: [ main ]
   
   jobs:
     deploy:
       runs-on: ubuntu-latest
       
       steps:
       - name: Checkout
         uses: actions/checkout@v3
         
       - name: Setup Bun
         uses: oven-sh/setup-bun@v1
         
       - name: Install dependencies
         run: bun install
         
       - name: Build
         run: bun run build
         
       - name: Deploy to GitHub Pages
         uses: peaceiris/actions-gh-pages@v3
         with:
           github_token: ${{ secrets.GITHUB_TOKEN }}
           publish_dir: ./out
   ```

3. **Enable GitHub Pages**
   - Go to repository Settings
   - Scroll to Pages section
   - Source: Deploy from a branch
   - Branch: gh-pages
   - Folder: / (root)

---

### 4. AWS Amplify

1. **Connect Repository**
   - Open AWS Amplify Console
   - Click "New app" → "Host web app"
   - Connect your GitHub repository

2. **Build Settings**
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm ci
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```

3. **Deploy**
   - Review settings and deploy
   - AWS will provide a URL

---

### 5. Railway

1. **Connect Repository**
   - Visit [railway.app](https://railway.app)
   - Click "Start a New Project"
   - Connect GitHub repository

2. **Configuration**
   - Railway auto-detects Next.js
   - No additional configuration needed

3. **Custom Domain**
   - Go to project settings
   - Add custom domain in "Domains" section

## 🎯 Performance Optimization

### Image Optimization

1. **Optimize Images**
   ```bash
   # Install image optimization tools
   npm install -g imagemin-cli imagemin-webp
   
   # Optimize images
   imagemin public/**/*.{jpg,png} --out-dir=public/optimized --plugin=webp
   ```

2. **Use Next.js Image Component**
   ```tsx
   import Image from 'next/image'
   
   <Image
     src="/your-image.jpg"
     alt="Description"
     width={800}
     height={600}
     priority={true} // For above-the-fold images
   />
   ```

### Bundle Analysis

```bash
# Install bundle analyzer
npm install --save-dev @next/bundle-analyzer

# Update next.config.ts
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)

# Analyze bundle
ANALYZE=true npm run build
```

## 🔧 Environment Variables

### For Vercel
1. Go to project settings
2. Click "Environment Variables"
3. Add variables:
   ```
   NEXT_PUBLIC_SITE_URL=https://yourdomain.com
   ```

### For Netlify
1. Site settings → Environment variables
2. Add variables in key-value format

### For Local Development
Create `.env.local`:
```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 🌍 Custom Domain Setup

### DNS Configuration

1. **For Vercel**
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   
   Type: A
   Name: @
   Value: 76.76.19.61
   ```

2. **For Netlify**
   ```
   Type: CNAME
   Name: www
   Value: your-site.netlify.app
   
   Type: A
   Name: @
   Value: 75.2.60.5
   ```

### SSL Certificate
- Most platforms auto-generate SSL certificates
- Verify HTTPS is working after DNS propagation

## 🐛 Troubleshooting

### Common Build Issues

1. **Node Version Mismatch**
   ```bash
   # Check Node version
   node --version
   
   # Use specific version
   nvm use 18
   ```

2. **Dependency Issues**
   ```bash
   # Clear cache and reinstall
   rm -rf node_modules bun.lockb
   bun install
   ```

3. **TypeScript Errors**
   ```bash
   # Check types
   bun run build
   
   # Fix type issues in components
   ```

### Deployment Issues

1. **Build Failing**
   - Check build logs for specific errors
   - Ensure all dependencies are in `package.json`
   - Verify Node version compatibility

2. **404 Errors**
   - Check routing configuration
   - Ensure `trailingSlash` setting is correct
   - Verify `basePath` for subdirectory deployments

3. **Styling Issues**
   - Ensure Tailwind CSS is properly configured
   - Check PostCSS configuration
   - Verify CSS imports

4. **Image Loading Problems**
   - Use Next.js Image component
   - Set `images.unoptimized: true` for static export
   - Check image paths and formats

### Performance Issues

1. **Slow Loading**
   - Enable image optimization
   - Check bundle size with analyzer
   - Implement lazy loading

2. **Hydration Errors**
   - Ensure server and client render the same content
   - Check for `useEffect` dependencies
   - Use `suppressHydrationWarning` sparingly

## 📊 Monitoring & Analytics

### Add Analytics

1. **Google Analytics**
   ```tsx
   // Add to layout.tsx
   import { GoogleAnalytics } from '@next/third-parties/google'
   
   export default function RootLayout() {
     return (
       <html>
         <body>
           {children}
           <GoogleAnalytics gaId="GA_MEASUREMENT_ID" />
         </body>
       </html>
     )
   }
   ```

2. **Vercel Analytics**
   ```bash
   npm install @vercel/analytics
   ```
   
   ```tsx
   import { Analytics } from '@vercel/analytics/react'
   
   export default function RootLayout() {
     return (
       <html>
         <body>
           {children}
           <Analytics />
         </body>
       </html>
     )
   }
   ```

### Performance Monitoring

1. **Web Vitals**
   ```tsx
   // pages/_app.tsx or layout.tsx
   export function reportWebVitals(metric) {
     console.log(metric)
   }
   ```

2. **Error Tracking**
   ```bash
   npm install @sentry/nextjs
   ```

## 🔄 Continuous Deployment

### Automatic Deployment Workflow

1. **Branch Protection**
   - Require pull request reviews
   - Require status checks to pass

2. **Preview Deployments**
   - Most platforms create preview URLs for PRs
   - Test changes before merging to main

3. **Production Deployment**
   - Only deploy from main/master branch
   - Use semantic versioning for releases

### Rollback Strategy

1. **Vercel**
   - Use deployment history to rollback
   - Click "Promote to Production" on previous deployment

2. **Git-based Rollback**
   ```bash
   git revert HEAD
   git push origin main
   ```

## 📞 Support Resources

- **Next.js Documentation**: https://nextjs.org/docs
- **Vercel Support**: https://vercel.com/support
- **Netlify Support**: https://docs.netlify.com
- **GitHub Pages**: https://pages.github.com
- **Community Forums**: https://github.com/vercel/next.js/discussions

---

🎉 **Congratulations!** Your portfolio is now live and accessible to the world. Remember to keep your content updated and monitor performance regularly.

For questions or issues, please refer to the platform-specific documentation or community forums.