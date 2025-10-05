# 🚀 Modern Portfolio Website

A stunning, fully responsive portfolio website built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. Features a modern design with dark/light theme support, animated components, and interactive elements.

![Portfolio Preview](https://img.shields.io/badge/Status-Live-success?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4+-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🎨 Design & UI
- **Modern Glass-morphism Design** - Beautiful frosted glass effects
- **Dark/Light Theme Support** - Seamless theme switching with system preference detection
- **Responsive Layout** - Optimized for all device sizes (mobile, tablet, desktop)
- **Custom Animations** - Smooth Framer Motion animations throughout
- **Interactive Elements** - Hover effects, micro-interactions, and transitions

### 🌟 Interactive Components
- **Custom Cursor** - Animated cursor with hover effects (desktop only)
- **Particle Background** - Dynamic animated particles with theme-aware colors
- **Floating Icons** - Technology icons floating in the background
- **Typewriter Effect** - Animated typing effect in hero section
- **Scroll Animations** - Elements animate on scroll with Intersection Observer
- **Smooth Scrolling** - Buttery smooth navigation between sections

### 📊 Dynamic Content
- **Animated Counters** - Stats that count up when scrolled into view
- **Project Showcases** - Interactive project cards with detailed information
- **Skills Visualization** - Organized skill categories with hover effects
- **Experience Timeline** - Professional experience with detailed descriptions

### 🚀 Performance & SEO
- **Server-Side Rendering** - Fast initial page loads with Next.js SSR
- **SEO Optimized** - Meta tags, OpenGraph, and Twitter cards
- **Accessibility** - WCAG compliant with proper ARIA labels
- **Fast Loading** - Optimized images and code splitting

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | Next.js 15, React 19 |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS 4, PostCSS |
| **Animations** | Framer Motion |
| **Icons** | Lucide React |
| **Theme** | Next Themes |
| **Package Manager** | Bun |
| **Deployment** | Vercel (recommended) |

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ or Bun
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   # Using Bun (recommended)
   bun install
   
   # Or using npm
   npm install
   
   # Or using yarn
   yarn install
   ```

3. **Start development server**
   ```bash
   bun run dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
portfolio/
├── public/                 # Static assets
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── globals.css    # Global styles
│   │   ├── layout.tsx     # Root layout
│   │   ├── page.tsx       # Main portfolio page
│   │   ├── loading.tsx    # Loading UI
│   │   └── not-found.tsx  # 404 page
│   ├── components/        # Reusable components
│   │   ├── CustomCursor.tsx
│   │   ├── FloatingIcons.tsx
│   │   ├── Loading.tsx
│   │   ├── ParticleBackground.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── ScrollToTop.tsx
│   │   ├── StatsCounter.tsx
│   │   └── TypewriterEffect.tsx
│   └── lib/
│       └── utils.ts       # Utility functions
├── .gitignore
├── bun.lock
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── README.md
└── tsconfig.json
```

## 🎨 Customization

### Personal Information
Update the personal information in `src/app/page.tsx`:

```typescript
// Hero Section
const personalInfo = {
  name: "Your Name",
  title: "Your Title",
  email: "your.email@example.com",
  phone: "+1234567890",
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourusername"
};
```

### Theme Colors
Customize colors in `src/app/globals.css`:

```css
:root {
  --primary-color: #3b82f6;  /* Blue */
  --secondary-color: #8b5cf6; /* Purple */
  /* Add your custom colors */
}
```

### Projects
Update your projects in the projects section:

```typescript
const projects = [
  {
    title: "Project Name",
    description: "Project description",
    technologies: ["React", "Node.js"],
    liveLink: "https://your-project.com",
    githubLink: "https://github.com/yourusername/project"
  }
];
```

## 📱 Responsive Design

The portfolio is fully responsive and tested on:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: 1024px+
- **Large Screens**: 1440px+

## 🌙 Theme Support

- **Light Theme**: Clean, professional appearance
- **Dark Theme**: Modern, developer-friendly dark mode
- **System Theme**: Automatically matches user's system preference
- **Smooth Transitions**: Animated theme switching

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with one click

### Netlify
1. Build the project: `bun run build`
2. Deploy the `out` folder to Netlify

### Other Platforms
The portfolio works on any platform that supports Node.js:
- AWS Amplify
- Firebase Hosting
- Railway
- Render

## 📈 Performance

- **Lighthouse Score**: 95+ across all metrics
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## 🔧 Scripts

```bash
# Development
bun run dev          # Start development server

# Production
bun run build        # Build for production
bun run start        # Start production server

# Code Quality
bun run lint         # Run ESLint
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Mohit Maurya**
- 🌐 Website: [mohitmaurya.dev](https://mohitmaurya.dev)
- 📧 Email: mohitmaurya78871@gmail.com
- 💼 LinkedIn: [mohit-maurya-9a13a222a](https://www.linkedin.com/in/mohit-maurya-9a13a222a/)
- 🐙 GitHub: [Ken-1219](https://github.com/Ken-1219)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Lucide React](https://lucide.dev/) for beautiful icons
- [Vercel](https://vercel.com/) for seamless deployment

---

⭐ **Star this repository if you found it helpful!**

---

### 🔗 Links
- [Live Demo](https://your-portfolio-url.com)
- [GitHub Repository](https://github.com/yourusername/portfolio)
- [Issues](https://github.com/yourusername/portfolio/issues)
- [Discussions](https://github.com/yourusername/portfolio/discussions)