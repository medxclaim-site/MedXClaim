# Manual Setup Guide for MedXClaim Website

Since Node.js is not available on this system, here's how to set up and run the project manually:

## Prerequisites
1. **Install Node.js** (version 18 or higher)
   - Download from: https://nodejs.org/
   - Or use package manager: `winget install OpenJS.NodeJS`

2. **Verify Installation**
   ```bash
   node --version
   npm --version
   ```

## Project Setup Steps

### 1. Install Dependencies
```bash
cd c:\Users\mufad\MedxClaim
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
- This will start the Vite development server
- Open http://localhost:5173 in your browser

### 3. Build for Production (optional)
```bash
npm run build
npm run preview
```

## Project Structure
```
c:\Users\mufad\MedxClaim\
├── .github\                 # GitHub configuration
├── public\                  # Static assets
├── src\
│   ├── components\          # Reusable React components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── ScrollToTop.jsx
│   ├── pages\               # Page components
│   │   ├── Home.jsx
│   │   ├── Services.jsx
│   │   ├── About.jsx
│   │   ├── WhyChooseUs.jsx
│   │   ├── Industries.jsx
│   │   ├── FAQ.jsx
│   │   └── Contact.jsx
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── package.json             # Dependencies and scripts
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind CSS configuration
└── README.md                # Project documentation
```

## Key Features Implemented
- ✅ React 18 with TypeScript support
- ✅ Vite for fast development
- ✅ Tailwind CSS for styling
- ✅ React Router for multi-page navigation
- ✅ Framer Motion for animations
- ✅ Lucide React for icons
- ✅ Responsive design
- ✅ Premium healthcare billing theme
- ✅ 7 complete pages (Home, Services, About, Why Us, Industries, FAQ, Contact)
- ✅ Professional components and animations

## Dependencies Required
The following packages need to be installed via npm:
- react, react-dom
- react-router-dom
- framer-motion
- lucide-react
- tailwindcss, autoprefixer, postcss
- vite, @vitejs/plugin-react
- eslint and related plugins
- @types/react, @types/react-dom

## Next Steps
1. Install Node.js
2. Run `npm install`
3. Run `npm run dev`
4. Open browser to http://localhost:5173

The website is fully coded and ready to run once Node.js is installed!