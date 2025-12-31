# 🚀 Next-Level DevOps Portfolio

A production-ready, enterprise-grade portfolio built with **Next.js 15**, **React**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

## ✨ Features

- ✅ **8 Real DevOps Projects** from your experience
- ✅ **Interactive Architecture Viewer** with zoom, pan, and download
- ✅ **Advanced Filtering System** (Search + Multi-tag filters)
- ✅ **Smooth Animations** powered by Framer Motion
- ✅ **Dark/Light Mode** with seamless transitions
- ✅ **Fully Responsive** design
- ✅ **TypeScript** for type safety
- ✅ **Production-Ready** code structure

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI**: React 18, Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom CSS Variables

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🎯 Project Structure

```
c:\dora-metrics/
├── app/
│   ├── layout.tsx          # Root layout with fonts & metadata
│   ├── page.tsx             # Main portfolio page
│   └── globals.css          # Global styles & Tailwind
├── components/
│   ├── ProjectCard.tsx      # Individual project card
│   ├── ProjectModal.tsx     # Architecture viewer modal
│   └── Filters.tsx          # Search & filter controls
├── data/
│   └── projects.ts          # Project database (SOURCE OF TRUTH)
├── public/
│   └── assets/
│       └── img/
│           └── archi/       # 📸 ADD YOUR ARCHITECTURE IMAGES HERE
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
└── next.config.mjs          # Next.js configuration
```

## 📸 Adding Architecture Images

1. Place your architecture diagrams in: `public/assets/img/archi/`
2. Update the `architectureImg` field in `data/projects.ts`

Example filenames:
- `mission-devops.png`
- `ansible-aws.png`
- `azure-hub-spoke.png`
- `migration-azure.png`
- `k8s-pfe.png`
- `chatbot-rag.png`
- `infra-m365.png`
- `deploy-win.png`

## 🎨 Customization

### Update Projects
Edit `data/projects.ts` to modify project information.

### Change Theme Colors
Edit `tailwind.config.ts` and `app/globals.css`.

### Modify Filters
Update the `FILTER_OPTIONS` array in `components/Filters.tsx`.

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Docker
```bash
# Build
docker build -t devops-portfolio .

# Run
docker run -p 3000:3000 devops-portfolio
```

### Static Export
```bash
# Add to next.config.mjs:
# output: 'export'

npm run build
# Deploy the 'out' folder to any static host
```

## 🎯 Key Features Explained

### 1. **Project Modal**
- Full-screen architecture viewer
- Zoom in/out (1x to 4x)
- Pan with mouse drag
- Download button
- ESC key to close
- Impact metrics & tech stack display

### 2. **Filtering System**
- Real-time search across titles, tech, and categories
- Multi-tag filtering (DevOps, Cloud Azure, Cloud AWS, etc.)
- Animated transitions when filtering
- "Clear All" functionality

### 3. **Responsive Design**
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly interactions

### 4. **Performance**
- Optimized with React.useMemo for filtering
- Framer Motion layout animations
- Lazy loading ready
- Image optimization (Next.js Image component ready)

## 📝 Environment Variables

Create a `.env.local` file (optional):

```env
NEXT_PUBLIC_GITHUB_URL=https://github.com/hamzahssaini
NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com/in/your-profile
```

## 🐛 Troubleshooting

### Module Resolution Errors
If you see "Cannot find module '@/...'" errors:
1. Ensure `tsconfig.json` has the correct paths configuration
2. Restart your IDE/editor
3. Run `npm install` again

### Tailwind Not Working
1. Check `tailwind.config.ts` content paths
2. Ensure `globals.css` imports Tailwind directives
3. Restart dev server

### Images Not Loading
1. Verify images are in `public/assets/img/archi/`
2. Check file paths in `data/projects.ts`
3. Use relative paths starting with `/assets/...`

## 📊 Project Data Structure

Each project in `data/projects.ts` follows this structure:

```typescript
{
  id: string;              // Unique identifier
  title: string;           // Project name
  location: string;        // City, Country
  date: string;            // Date or period
  problem: string;         // Business/technical challenge
  solution: string;        // Your approach & technologies
  impact: string[];        // Measurable results (include +X%, -Y%)
  tech: string[];          // Technologies used
  category: string[];      // Filter categories
  architectureImg?: string; // Path to diagram
}
```

## 🎓 Best Practices Implemented

- ✅ **Semantic HTML** for accessibility
- ✅ **ARIA labels** for screen readers
- ✅ **Keyboard navigation** support
- ✅ **Type-safe** with TypeScript
- ✅ **Component-based** architecture
- ✅ **Responsive** design patterns
- ✅ **Performance** optimizations
- ✅ **SEO-friendly** metadata

## 📄 License

This portfolio template is open source. Feel free to use it for your own portfolio!

## 🤝 Contributing

This is a personal portfolio, but suggestions are welcome via GitHub issues.

---

**Built with ❤️ for DevOps Engineers**

GitHub: [@hamzahssaini](https://github.com/hamzahssaini)
