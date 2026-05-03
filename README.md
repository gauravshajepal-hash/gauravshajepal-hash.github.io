# Gaurav Shajepal - Professional Portfolio

## Overview
A professional portfolio website showcasing operations management, quality assurance, and systems biology research experience. Built with pure HTML, CSS, and JavaScript - no frameworks required.

## Features
- 🌐 Fully responsive design (mobile & desktop)
- ⚡ Fast loading (no external dependencies except fonts)
- 🎨 Professional dark theme with blue accent colors
- 📱 Smooth animations and transitions
- 🏢 Operations & production management timeline
- 🔬 Research experience showcase
- 📄 Resume download functionality
- ✉️ Contact form

## File Structure
```
gaurav-portfolio/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # All styling
├── js/
│   └── script.js       # Interactive functionality
├── images/             # (your images here)
├── My_CV.pdf           # Your resume
└── README.md           # This file
```

## How to Deploy on GitHub Pages

### Step 1: Create the Repository
1. Go to: **https://github.com/new**
2. Repository name: **`gauravshajepal-hash.github.io`** (exact match!)
3. Make it **Public**
4. Check "Add README"
5. Click **Create repository**

### Step 2: Upload Files

**Option A - Web Interface (Easiest):**
- Go to your new repository
- Click "Add file" → "Upload files"
- Drag all files from `gaurav-portfolio/` into the upload area
- Click "Commit changes"

**Option B - Terminal:**
```bash
cd /home/gaurav/gaurav-portfolio
git init
git remote add origin https://github.com/gauravshajepal-hash/gauravshajepal-hash.github.io.git
git add .
git commit -m "Initial: Professional portfolio"
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. Go to repository **Settings**
2. Navigate to **Pages** (left sidebar)
3. Under "Source", select:
   - Branch: **main**
   - Folder: **/root**
4. Click **Save**
5. Wait 1-2 minutes
6. Visit: **https://gauravshajepal-hash.github.io**

## Customization

### Update Personal Information
Edit `index.html`:
- **Contact info** (lines 20-22) - Phone, email, location
- **Hero section** (lines 32-48) - Title, description
- **Experience** (lines 87-166) - All timeline items
- **Research** (lines 170-220) - Research experience
- **Education** (lines 230-260) - Academic background
- **Contact form** (lines 430-445) - Update form settings

### Update Content
- **Resume**: Replace `My_CV.pdf` with updated version
- **Projects**: Edit `index.html` sections
- **Skills**: Modify `css/style.css` or add/remove tags
- **Colors**: Change CSS variables in `css/style.css` (lines 3-14)

### Change Theme
Edit `css/style.css`:
```css
:root {
    --bg-primary: #0a0f1a;              /* Background */
    --accent-primary: #1e88e5;           /* Blue accent */
    --accent-secondary: #00bcd4;         /* Teal accent */
}
```

## Sections Included

1. **Hero** - Professional introduction with contact info
2. **Experience** - Operations & quality management timeline
3. **Research** - Systems biology & quantitative analysis
4. **Education** - Academic background
5. **Skills** - Competency categories
6. **Publications** - Research papers & white papers
7. **Contact** - Message form & contact links

## Projects & Achievements Highlighted

### Operations Management
- Gate Gourmet Canada - Operations Supervisor
- Newrest Travel Retail - Production Supervisor
- WeCook - Kitchen Manager & Quality Control

### Research Experience
- Systems Biology - University of Montreal (IRIC)
- Quantitative Analysis - Institut Pasteur
- Microbiology - CNRS
- Mechanobiology - Institut Curie

### Key Skills
- HACCP, GMP/GHP, SOP Compliance
- Python, Image Analysis, Quantitative Methods
- Team Leadership & Cross-functional Coordination
- Workflow Optimization & Production Planning

### Publications
- Developmental Cell (2024) - Co-author
- Operational Viability White Paper

## Browser Support
- Chrome/Edge (latest)
- Firefox (latest)  
- Safari (latest)

## License
Free to use and modify as needed. Good luck with your job search! 🚀
