# AI Resume Builder 🍏

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-14.2.5-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.7-38bdf8?style=for-the-badge&logo=tailwind-css)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--3.5-green?style=for-the-badge&logo=openai)

**A beautiful, Apple-inspired AI-powered resume builder with glassmorphism design**

Built with Next.js 14, TypeScript, and Tailwind CSS | Day 2 of #100Days100Projects

[Live Demo](#) • [Documentation](#features) • [Report Bug](#) • [Request Feature](#)

</div>

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Usage Guide](#-usage-guide)
- [Project Structure](#-project-structure)
- [API Reference](#-api-reference)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 🤖 AI-Powered Content Generation
- **Smart Summary Generation**: Generate professional summaries using OpenAI GPT-3.5
- **Experience Bullet Points**: AI-powered bullet point generation for work experience
- **Skills Refinement**: Automatically organize and refine your skills list
- **Mock Mode**: Works offline with intelligent mock responses when API key is not set

### 📝 Complete Resume Builder
- **Personal Information**: Name, title, contact details, LinkedIn, GitHub, location
- **Professional Summary**: Rich text editor with AI generation
- **Work Experience**: 
  - Multiple experience entries
  - Date formatting (auto-formats to "MMM YYYY")
  - Current position toggle
  - AI-generated bullet points
- **Education**: Degree, institution, year, GPA
- **Skills Management**:
  - Smart tag input with autocomplete
  - Quick-add buttons for common skills
  - Multiple skills at once (comma-separated)
  - AI-powered skills refinement
- **Custom Sections**: Add certifications, projects, awards, or any custom section

### 📊 Dashboard & Analytics
- **Progress Indicator**: Real-time completion percentage (0-100%)
- **Quality Score**: AI-powered resume quality assessment
- **Resume Validator**: Validates required fields and provides recommendations
- **Smart Suggestions**: Actionable tips to improve your resume

### 💾 Data Management
- **Auto-Save**: Automatic LocalStorage persistence (debounced)
- **Import/Export JSON**: Backup and restore your resume data
- **Duplicate Resume**: Create multiple versions easily
- **Clear Data**: Safe data clearing with confirmation modal

### 🎨 Modern UI/UX
- **Glassmorphism Design**: Beautiful translucent cards with backdrop blur
- **Apple-Inspired Theme**: Clean, minimal design with soft colors
- **Dark Mode**: Elegant dark theme with smooth transitions
- **Responsive Design**: Perfect on desktop, tablet, and mobile
- **Smooth Animations**: Framer Motion powered transitions
- **Gradient Accents**: Beautiful gradient buttons and text
- **Floating Orbs**: Animated background elements

### 📄 Preview & Export
- **Live Preview**: Real-time formatted resume preview
- **PDF Export**: One-click PDF download with high quality
- **Print View**: Optimized print styles
- **Copy to Clipboard**: Copy formatted resume text
- **Professional Layout**: Clean, ATS-friendly resume format

### 🔧 Smart Formatting
- **Date Formatting**: Auto-formats dates to "MMM YYYY" format
- **Phone Formatting**: Formats to (XXX) XXX-XXXX
- **URL Formatting**: Auto-adds https:// to URLs
- **Year Extraction**: Smart year formatting for education

---

## 🛠️ Tech Stack

### Core
- **Next.js 14.2.5** - React framework with App Router
- **TypeScript 5.5.3** - Type-safe development
- **React 18.3.1** - UI library
- **Tailwind CSS 3.4.7** - Utility-first CSS framework

### UI & Animations
- **Framer Motion 11.3.0** - Smooth animations and transitions
- **Lucide React 0.427.0** - Beautiful icon library
- **clsx & tailwind-merge** - Conditional styling utilities

### AI & Export
- **OpenAI API** - GPT-3.5 for content generation
- **html2pdf.js 0.10.2** - PDF generation
- **html2canvas 1.4.1** - Canvas rendering
- **jsPDF 2.5.1** - PDF creation

### Data Persistence
- **LocalStorage** - Client-side data storage
- **Custom Hooks** - React hooks for data management

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.0 or higher
- **npm**, **yarn**, or **pnpm** package manager
- **OpenAI API Key** (optional - app works with mock data)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/HyderYash/ai-resume-builder.git
   cd ai-resume-builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key_here
   ```
   
   > **Note**: The app works perfectly without an API key using intelligent mock responses for demonstration purposes.

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📖 Usage Guide

### Building Your Resume

#### 1. Personal Information
- Fill in your **name**, **professional title**, **email**, **phone**, and **location**
- Add your **LinkedIn** and **GitHub** profiles (optional but recommended)
- Enter your **target job title** for better AI generation

#### 2. Professional Summary
- Write a brief summary manually, or
- Click **"Generate Summary with AI"** to create a professional summary
- The AI uses your personal info and target job title for context

#### 3. Work Experience
- Click **"Add Experience"** to add work history
- Fill in:
  - **Job Title** and **Company**
  - **Start Date** and **End Date** (or mark as current)
  - **Description** of your role
- Click **"Generate Bullets"** to create AI-powered bullet points
- Dates auto-format to "MMM YYYY" (e.g., "Jan 2020")

#### 4. Education
- Add your educational background
- Include **degree**, **institution**, **year**, and optional **GPA**
- Add multiple education entries if needed

#### 5. Skills
- **Type and press Enter** to add skills
- **Add multiple at once**: Separate with commas (e.g., "React, Node.js, MongoDB")
- **Quick-add buttons**: Click common skills when starting
- **Autocomplete**: Get suggestions as you type
- **Refine with AI**: Click "Refine Skills" to organize and improve your list

#### 6. Custom Sections
- Add **certifications**, **projects**, **awards**, or any custom section
- Each section can have multiple items

### Dashboard Features

#### Progress Indicator
- View your **completion percentage** (0-100%)
- See your **quality score** (0-100)
- Get **personalized suggestions** to improve your resume

#### Resume Actions
- **Export JSON**: Download your resume data for backup
- **Import JSON**: Load a previously exported resume
- **Duplicate**: Create a copy to edit separately

#### Resume Validator
- **Real-time validation** of required fields
- **Error messages** for missing information
- **Recommendations** for improvement

### Preview & Export

1. Click **"Preview"** in the header to see your formatted resume
2. Review the professional layout
3. Use the action buttons:
   - **Copy Text**: Copy formatted resume to clipboard
   - **Print**: Print-optimized view
   - **Export PDF**: Download as PDF

### Data Management

- **Auto-Save**: All changes save automatically to LocalStorage (debounced by 500ms)
- **Manual Save**: Export as JSON for backup
- **Load Draft**: Your last saved draft loads automatically
- **Clear All**: Remove all data with confirmation

---

## 📁 Project Structure

```
ai-resume-builder/
├── app/
│   ├── api/
│   │   └── generate/
│   │       └── route.ts          # OpenAI API route handler
│   ├── preview/
│   │   └── page.tsx              # Resume preview page
│   ├── globals.css               # Global styles & glassmorphism
│   ├── print.css                 # Print-optimized styles
│   ├── layout.tsx                # Root layout with metadata
│   └── page.tsx                  # Main builder page
├── components/
│   ├── CopyResumeButton.tsx      # Copy resume text to clipboard
│   ├── ExperienceForm.tsx        # Work experience form
│   ├── Footer.tsx                # Footer with social links
│   ├── PDFExportButton.tsx       # PDF export functionality
│   ├── PreviewCard.tsx           # Resume preview component
│   ├── ProgressIndicator.tsx    # Progress & quality score
│   ├── ResumeActions.tsx         # Import/Export/Duplicate
│   ├── ResumeForm.tsx            # Main form component
│   ├── ResumeValidator.tsx       # Validation & recommendations
│   ├── SectionCard.tsx          # Reusable card component
│   ├── SkillsInput.tsx           # Skills input with autocomplete
│   ├── ThemeToggle.tsx           # Dark/light mode toggle
│   └── Toast.tsx                 # Toast notifications
├── lib/
│   ├── ai.ts                     # OpenAI API integration
│   ├── format.ts                 # Date, phone, URL formatting
│   ├── resumeUtils.ts            # Progress, validation, quality
│   ├── types.ts                  # TypeScript interfaces
│   ├── useLocalStorage.ts        # LocalStorage hook
│   └── utils.ts                  # Utility functions
├── public/                       # Static assets
├── .gitignore
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## 🔌 API Reference

### OpenAI API Integration

The app uses OpenAI's GPT-3.5-turbo model for content generation.

#### Endpoints

**POST** `/api/generate`

Generate AI content for your resume.

**Request Body:**
```json
{
  "type": "summary" | "bullets" | "skills",
  "data": ResumeData | Experience | string[]
}
```

**Response:**
```json
{
  "result": string | string[],
  "error": string | null
}
```

#### Types

- **summary**: Generates professional summary
- **bullets**: Generates experience bullet points
- **skills**: Refines and organizes skills list

#### Environment Variables

```env
NEXT_PUBLIC_OPENAI_API_KEY=your_api_key_here
```

> **Note**: Without an API key, the app uses intelligent mock responses for demonstration.

---

## 🎨 Customization

### Theme Colors

Edit `tailwind.config.ts` to customize colors:

```typescript
colors: {
  "light-bg": "#F5F5F7",
  "light-accent": "#007AFF",
  "dark-bg": "#000000",
  "dark-accent": "#0A84FF",
  // ... more colors
}
```

### Fonts

Modify `app/globals.css` to change typography:

```css
font-family: 'Inter', 'SF Pro Display', system-ui, sans-serif;
```

### Glassmorphism

Adjust glass effects in `app/globals.css`:

```css
.glass-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(16px) saturate(180%);
}
```

---

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import repository on [Vercel](https://vercel.com)
3. Add `NEXT_PUBLIC_OPENAI_API_KEY` in environment variables
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Other Platforms

The app can be deployed to any platform supporting Next.js:

- **Netlify**: Connect GitHub repo, add env vars, deploy
- **AWS Amplify**: Import repo, configure build settings
- **Railway**: One-click deploy from GitHub
- **Render**: Connect repo, set environment variables

### Environment Variables

Make sure to set `NEXT_PUBLIC_OPENAI_API_KEY` in your deployment platform's environment variables.

---

## 🧪 Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Code Structure

- **Components**: Reusable UI components in `components/`
- **Utilities**: Helper functions in `lib/`
- **Types**: TypeScript interfaces in `lib/types.ts`
- **Styles**: Global styles in `app/globals.css`

---

## 🤝 Contributing

Contributions are welcome! This is a personal project for #100Days100Projects, but suggestions and improvements are appreciated.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- Built as **Day 2** of [#100Days100Projects](https://github.com/HyderYash/100Days100Projects)
- Inspired by **Apple's design language**
- Powered by **OpenAI** for AI content generation
- Icons by [Lucide](https://lucide.dev)
- Fonts: [Inter](https://rsms.me/inter/) & SF Pro Display

---

## 👨‍💻 Author

**Yash Sharma**

- GitHub: [@HyderYash](https://github.com/HyderYash)
- LinkedIn: [yashsh21](https://www.linkedin.com/in/yashsh21/)
- Email: yashsharma.karate@gmail.com

---

## ⚠️ Privacy & Security

- **100% Client-Side**: All data is stored locally in your browser
- **No Backend**: No server-side data storage
- **OpenAI API**: Only sends data to OpenAI when generating content (if API key is set)
- **LocalStorage**: All resume data is stored in browser's LocalStorage
- **No Tracking**: No analytics or tracking scripts

---

## 🎯 Roadmap

- [ ] Multiple resume templates
- [ ] Resume versioning/history
- [ ] ATS (Applicant Tracking System) checker
- [ ] Resume sharing via URL
- [ ] Cover letter generator
- [ ] Resume analytics dashboard
- [ ] Export to DOCX format
- [ ] Multi-language support

---

## 📊 Project Stats

- **Lines of Code**: ~3000+
- **Components**: 15+
- **Features**: 20+
- **Dependencies**: 12
- **Build Time**: ~30s

---

<div align="center">

**Made with ❤️ by [Yash Sharma](https://github.com/HyderYash)**

⭐ Star this repo if you find it helpful!

[⬆ Back to Top](#ai-resume-builder-)

</div>
