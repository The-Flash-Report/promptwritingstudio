# PromptWritingStudio Brand Style Guide

## 🎨 Color Palette

### Primary Colors
```css
/* Primary Brand Color - Yellow */
--color-primary: #FFDE59        /* Use for: Primary CTAs, highlights, brand elements */
--color-primary-dark: #E5C84F   /* Use for: Hover states on primary elements */

/* Secondary Brand Color - Black */
--color-secondary: #1A1A1A      /* Use for: Headers, important text, dark themes */
```

### Neutral Palette
```css
/* Grays - Main text and UI elements */
--color-rich-black: #1A1A1A     /* Headers, important text */
--color-dark-gray: #333333      /* Body text, secondary content */
--color-medium-gray: #666666    /* Supporting text, captions */
--color-light-gray: #E5E5E5     /* Borders, dividers, subtle elements */

/* Backgrounds */
--color-off-white: #F9F9F9      /* Page backgrounds, sections */
--color-pure-white: #FFFFFF     /* Cards, modals, content areas */
--color-black: #000000          /* Pure black for high contrast */
```

### UI States & Feedback
```css
/* Use grayscale variations for all UI states */
--color-success: #333333        /* Success messages, completed states */
--color-warning: #666666        /* Warnings, caution states */
--color-info: #333333           /* Information, neutral feedback */
--color-error: #1A1A1A          /* Errors, destructive actions */
```

---

## 🚫 Colors to AVOID

**❌ DO NOT USE:**
- Blue colors (`#0066CC`, `#3B82F6`, `bg-blue-*` classes)
- Green colors (`#10B981`, `#059669`, `bg-green-*` classes)  
- Red colors (`#EF4444`, `#DC2626`, `bg-red-*` classes)
- Purple colors (`#8B5CF6`, `#7C3AED`, `bg-purple-*` classes)

**✅ INSTEAD USE:**
- Primary yellow for positive actions
- Gray variations for neutral states
- Black/white for high contrast

---

## 🎯 Component Color Guidelines

### Buttons & CTAs

#### Primary Actions (Course enrollment, main features)
```css
/* Primary CTA - Yellow */
.btn-primary {
  background: #FFDE59;
  color: #1A1A1A;
  &:hover { background: #E5C84F; }
}
```
**Examples:** "Join Now", "Get Started", "Take Quiz", "Calculate Now"

#### Secondary Actions (Learn more, additional info)
```css
/* Secondary CTA - Outline */
.btn-secondary {
  border: 2px solid #1A1A1A;
  color: #1A1A1A;
  background: transparent;
  &:hover { background: #1A1A1A; color: #FFFFFF; }
}
```
**Examples:** "Learn More", "See Examples", "View Details"

#### Tertiary Actions (Subtle actions)
```css
/* Tertiary CTA - Gray */
.btn-tertiary {
  background: #F9F9F9;
  color: #333333;
  border: 1px solid #E5E5E5;
  &:hover { background: #E5E5E5; }
}
```
**Examples:** "Cancel", "Skip", "Back"

### Information Displays

#### Highlights & Important Info
```css
/* Yellow background for key information */
.info-highlight {
  background: rgba(255, 222, 89, 0.1); /* #FFDE59 with 10% opacity */
  border: 1px solid rgba(255, 222, 89, 0.3);
  color: #1A1A1A;
}
```

#### Subtle Information
```css
/* Gray background for secondary info */
.info-subtle {
  background: #F9F9F9;
  border: 1px solid #E5E5E5;
  color: #333333;
}
```

#### Progress & Status
```css
/* Progress bars - Use yellow */
.progress-bar {
  background: #E5E5E5; /* Track */
  .progress-fill { background: #FFDE59; }
}

/* Status indicators */
.status-active { background: #FFDE59; color: #1A1A1A; }
.status-inactive { background: #F9F9F9; color: #666666; }
.status-completed { background: #333333; color: #FFFFFF; }
```

---

## 📐 Layout & Spacing

### Section Backgrounds
```css
/* Alternating section backgrounds */
.section-white { background: #FFFFFF; }
.section-gray { background: #F9F9F9; }

/* Hero/Featured sections */
.section-gradient {
  background: linear-gradient(135deg, #1A1A1A 0%, #000000 100%);
  color: #FFFFFF;
}
```

### Cards & Containers
```css
/* Standard card */
.card {
  background: #FFFFFF;
  border: 1px solid #E5E5E5;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

/* Featured card */
.card-featured {
  background: #FFFFFF;
  border: 2px solid #FFDE59;
  box-shadow: 0 4px 12px rgba(255, 222, 89, 0.15);
  border-radius: 8px;
}
```

---

## 🔤 Typography Scale

### Font Families
```css
--font-primary: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
```

### Text Colors
```css
/* Headers */
.text-heading { color: #1A1A1A; }

/* Body text */
.text-body { color: #333333; }

/* Supporting text */
.text-muted { color: #666666; }

/* Light text (on dark backgrounds) */
.text-light { color: #FFFFFF; }

/* Links */
.text-link { color: #333333; text-decoration: underline; }
.text-link:hover { color: #1A1A1A; }
```

---

## ⚡ Implementation Examples

### ✅ CORRECT Usage

```jsx
{/* Primary CTA */}
<button className="bg-[#FFDE59] text-[#1A1A1A] px-8 py-3 rounded-lg font-bold hover:bg-[#E5C84F] transition">
  Join Now
</button>

{/* Information Box */}
<div className="bg-[#F9F9F9] border border-[#E5E5E5] p-6 rounded-lg">
  <h3 className="text-[#1A1A1A] font-bold mb-2">Important Information</h3>
  <p className="text-[#333333]">This is properly styled content.</p>
</div>

{/* Progress Bar */}
<div className="bg-[#E5E5E5] rounded-full h-3">
  <div className="bg-[#FFDE59] h-3 rounded-full" style={{width: '75%'}}></div>
</div>
```

### ❌ INCORRECT Usage

```jsx
{/* Wrong - Using blue colors */}
<button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition">
  Join Now
</button>

{/* Wrong - Blue information box */}
<div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
  <h3 className="text-blue-800 font-bold mb-2">Information</h3>
  <p className="text-blue-700">This breaks brand consistency.</p>
</div>

{/* Wrong - Blue progress */}
<div className="bg-gray-200 rounded-full h-3">
  <div className="bg-blue-600 h-3 rounded-full" style={{width: '75%'}}></div>
</div>
```

---

## 🎨 Social Media Colors

When integrating with social platforms, use the platform's official colors only for their icons:

```jsx
{/* Social sharing - Use platform colors for icons only */}
<a href="..." className="bg-[#F9F9F9] text-[#333333] px-4 py-2 rounded-lg hover:bg-[#E5E5E5] transition">
  <TwitterIcon className="text-[#1DA1F2]" /> {/* Twitter blue for icon only */}
  Share on Twitter
</a>
```

---

## 📱 Component-Specific Guidelines

### Calculators
- **Primary Action:** Yellow button for "Calculate" 
- **Results Background:** Light gray (`#F9F9F9`)
- **Input Focus:** Yellow border (`#FFDE59`)
- **Progress:** Yellow fill on gray track

### Quiz Interface  
- **Selected Options:** Yellow background (`rgba(255, 222, 89, 0.1)`) with yellow border
- **Correct Answers:** Dark green text on light gray background
- **Incorrect Answers:** Dark text on light gray background
- **Progress Bar:** Yellow fill

### Navigation
- **Active Links:** Yellow background or underline
- **Hover States:** Gray background (`#F9F9F9`)
- **Dropdowns:** White background with gray borders

### Forms
- **Input Borders:** Light gray (`#E5E5E5`)
- **Focus State:** Yellow border (`#FFDE59`)
- **Error State:** Dark gray border with error text
- **Success State:** Yellow accent

---

## 🔍 Brand Color Usage Checklist

Before implementing any component, verify:

- [ ] No blue colors used (`bg-blue-*`, `text-blue-*`, `border-blue-*`)
- [ ] Primary actions use yellow (`#FFDE59`)
- [ ] Secondary actions use gray or outline styles
- [ ] Information boxes use gray backgrounds (`#F9F9F9`)
- [ ] Progress indicators use yellow fill
- [ ] Text follows the color hierarchy (black → dark gray → medium gray)
- [ ] Hover states darken the base color appropriately

---

## 🚀 Quick Reference

### Most Common Classes
```css
/* Backgrounds */
bg-[#FFDE59]     /* Primary yellow */
bg-[#F9F9F9]     /* Light gray */
bg-[#FFFFFF]     /* White */
bg-[#1A1A1A]     /* Dark */

/* Text */
text-[#1A1A1A]   /* Headers */
text-[#333333]   /* Body */
text-[#666666]   /* Muted */

/* Borders */
border-[#E5E5E5] /* Light gray */
border-[#FFDE59] /* Yellow accent */

/* Hover States */
hover:bg-[#E5C84F]   /* Primary hover */
hover:bg-[#E5E5E5]   /* Gray hover */
```

---

**Last Updated:** January 2025  
**Version:** 1.0  
**Status:** ✅ Active - All components must follow this guide 