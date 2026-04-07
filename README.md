# MedXClaim - Premium Healthcare Billing Website

A modern, responsive healthcare billing support website built with cutting-edge technologies for a professional user experience.

## 🎯 Overview

MedXClaim is a premium healthcare billing website designed to provide clear, engaging information about healthcare billing services. It features smooth animations, responsive design, and a professional appearance suitable for a healthcare business.

## ✨ Features

- **Multi-page Application**: Home, Services, Industries, About, FAQ, Contact, and Why Choose Us pages
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Smooth Animations**: Framer Motion animations throughout for enhanced UX
- **Modern Icons**: Lucide React icons for professional UI elements
- **Fast Development**: Vite for lightning-fast hot module replacement
- **Type-Safe**: Built with React best practices
- **Path Aliases**: Cleaner imports with `@` prefixes

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.2.0 | UI library |
| Vite | 4.4.5 | Build tool & dev server |
| Tailwind CSS | 3.3.3 | Utility-first styling |
| Framer Motion | 10.12.16 | Advanced animations |
| Lucide React | 0.294.0 | Icon library |
| React Router DOM | 6.8.0 | Client-side routing |
| ESLint | 8.45.0 | Code quality |

## 📁 Project Structure

```
src/
├── components/              # Reusable React components
│   ├── Navbar.jsx          # Navigation header
│   ├── Footer.jsx          # Footer component
│   └── ScrollToTop.jsx     # Scroll to top utility
├── pages/                  # Page components for routing
│   ├── Home.jsx            # Landing page
│   ├── Services.jsx        # Services page
│   ├── About.jsx           # About page
│   ├── WhyChooseUs.jsx     # Why Choose Us page
│   ├── Industries.jsx      # Industries page
│   ├── FAQ.jsx             # FAQ page
│   └── Contact.jsx         # Contact page
├── hooks/                  # Custom React hooks
│   └── useForm.js          # Form state management hook
├── utils/                  # Utility functions
│   ├── validation.js       # Form validation utilities
│   ├── constants.js        # App-wide constants
│   └── animations.js       # Framer Motion animation presets
├── App.jsx                 # Main app component with routing
├── main.jsx                # React entry point
└── index.css               # Global styles and Tailwind directives

public/                     # Static assets
├── favicon.svg
index.html                  # HTML entry point
package.json               # Project dependencies
vite.config.js             # Vite configuration
tailwind.config.js         # Tailwind CSS configuration
postcss.config.js          # PostCSS configuration
jsconfig.json              # JavaScript path aliases
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Open in browser**: Navigate to [http://localhost:5173](http://localhost:5173)

## 📦 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |

## 🎨 Customization

### Path Aliases
Use these convenient path aliases for cleaner imports:
- `@` → `src/`
- `@components` → `src/components/`
- `@pages` → `src/pages/`
- `@utils` → `src/utils/`
- `@hooks` → `src/hooks/`

Example:
```javascript
// Instead of: import Navbar from '../../../components/Navbar.jsx'
import Navbar from '@components/Navbar.jsx'
```

### Tailwind CSS
Custom configurations and utilities are defined in `tailwind.config.js`:
- Custom animations (`fade-in`, `slide-up`)
- Font family settings (Inter)
- Extended color palette

### Styling Components
Global component styles are in `src/index.css`:
- `.btn-primary` - Primary button styles
- Smooth scroll behavior
- Gradient backgrounds

## 🎬 Animations

Framer Motion animation presets are available in `@utils/animations.js`:
- `fadeIn` - Fade-in effect
- `slideUp` - Slide up from bottom
- `slideInLeft` - Slide from left
- `slideInRight` - Slide from right
- `scaleIn` - Scale-in effect
- `containerVariants` - Staggered children animation
- `itemVariants` - Child item animation

Example usage:
```javascript
import { motion } from 'framer-motion';
import { slideUp } from '@utils/animations';

<motion.div variants={slideUp} initial="hidden" animate="visible">
  Content here
</motion.div>
```

## 🔧 Utility Functions

### Validation Utils (`@utils/validation.js`)
- `validateEmail(email)` - Email validation
- `validatePhone(phone)` - Phone number validation
- `formatPhone(phone)` - Format phone to (XXX) XXX-XXXX
- `formatCurrency(amount)` - Format to USD currency
- `sanitizeInput(input)` - Sanitize user input

### Constants (`@utils/constants.js`)
- `COMPANY_NAME` - Company name
- `COMPANY_EMAIL` - Contact email
- `COMPANY_PHONE` - Contact phone
- `NAVIGATION_LINKS` - Menu items
- `ANIMATION_DURATION` - Animation timing presets
- `BREAKPOINTS` - Responsive breakpoints

### Custom Hooks

#### useForm
Form state management hook with validation:
```javascript
const { 
  values, 
  errors, 
  touched, 
  isSubmitting,
  handleChange, 
  handleBlur, 
  handleSubmit,
  setFieldError,
  resetForm 
} = useForm(initialValues, onSubmit);
```

## 🎯 Design System

### Colors
- Primary: Blue/Teal gradient
- Background: Dark slate gradients
- Text: White/Light for contrast

### Typography
- Font: Inter (system-ui fallback)
- Responsive sizing via Tailwind

### Spacing
- Uses Tailwind's 4px base unit
- Consistent padding/margins across components

## 📱 Responsive Design

The project uses Tailwind CSS's responsive prefixes:
- `sm:` (640px)
- `md:` (768px)
- `lg:` (1024px)
- `xl:` (1280px)
- `2xl:` (1536px)

## 🧪 Development Tips

1. **Component Layout**: Each page component demonstrates different animation techniques
2. **Icons**: Browse available icons at [lucide.dev](https://lucide.dev)
3. **Colors**: Customize in `tailwind.config.js`
4. **Animations**: Add new motion variants in `@utils/animations.js`
5. **Form Handling**: Use `useForm` hook for consistent form state

## 📋 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 Code Style

- ESLint configured for code quality
- React Hooks best practices
- Functional components only
- Proper prop drilling and component composition

## 🤝 Contributing Guidelines

1. Use path aliases instead of relative imports
2. Follow the existing component structure
3. Use Tailwind CSS for styling (avoid inline styles)
4. Add animations using Framer Motion for consistent UX
5. Run `npm run lint` before committing

## 📄 License

This project is proprietary software for MedXClaim.

## 📞 Support

For questions or issues, contact: support@medxclaim.com

---

Built with ❤️ for healthcare professionals