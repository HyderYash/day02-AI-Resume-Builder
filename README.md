# AI Resume Builder 🍏

A beautiful, Apple-inspired AI-powered resume builder built with Next.js 14, TypeScript, and Tailwind CSS. Part of the #100Days100Projects challenge.

## ✨ Features

- **AI-Powered Content Generation**
  - Generate professional summaries using OpenAI
  - Create impactful experience bullet points
  - Refine and organize skills lists

- **Complete Resume Builder**
  - Personal information section
  - Professional summary with AI generation
  - Multiple experience entries with AI bullet generation
  - Education section
  - Skills management with tag input
  - Custom sections (certifications, projects, etc.)

- **Live Preview & Export**
  - Real-time resume preview
  - Export to PDF with one click
  - Beautiful, professional layout

- **Data Persistence**
  - Auto-save to LocalStorage
  - Load previous drafts
  - Clear data with confirmation

- **Modern UI/UX**
  - Apple-inspired design
  - Light and dark mode
  - Smooth animations with Framer Motion
  - Fully responsive design
  - Glassmorphism effects

## 🛠️ Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** (with custom Apple theme)
- **Framer Motion** (animations)
- **Lucide React** (icons)
- **OpenAI API** (AI content generation)
- **html2pdf.js** (PDF export)
- **LocalStorage** (data persistence)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- OpenAI API key (optional - works with mock data if not provided)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd ai-resume-builder
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your OpenAI API key (optional):
```
NEXT_PUBLIC_OPENAI_API_KEY=your_api_key_here
```

**Note:** The app works without an API key using mock responses for demonstration purposes.

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📖 Usage

### Building Your Resume

1. **Fill in Personal Information**
   - Enter your name, title, contact details, and social links

2. **Generate Professional Summary**
   - Fill in your basic info and target job title
   - Click "Generate Summary with AI" for an AI-powered summary

3. **Add Experience**
   - Click "Add Experience" to add work history
   - Fill in role, company, dates, and description
   - Use "Generate Bullets" to create AI-powered bullet points

4. **Add Education**
   - Add your educational background
   - Include degree, institution, year, and optional GPA

5. **Add Skills**
   - Type skills and press Enter to add them
   - Use "Refine Skills" to organize and improve your skills list with AI

6. **Custom Sections** (Optional)
   - Add certifications, projects, awards, etc.

### Preview & Export

1. Click "Preview" in the header to see your resume
2. Review the formatted resume
3. Click "Export as PDF" to download your resume

### Data Management

- **Auto-save**: All changes are automatically saved to LocalStorage
- **Clear Data**: Use "Clear All" to remove all data (with confirmation)
- **Load Draft**: Your last saved draft loads automatically when you return

## 🎨 Theme

The app features a beautiful Apple-inspired design with:

- **Light Mode**: Clean, minimal design with soft colors
- **Dark Mode**: Elegant dark theme with proper contrast
- **Smooth Transitions**: All theme changes are animated
- **Glassmorphism**: Modern card effects with backdrop blur

## 🔧 Configuration

### OpenAI API Setup

1. Get your API key from [OpenAI](https://platform.openai.com/api-keys)
2. Add it to `.env.local` as `NEXT_PUBLIC_OPENAI_API_KEY`
3. The app will use real AI generation when the key is present
4. Without a key, the app uses mock responses for demonstration

### Customization

- **Colors**: Edit `tailwind.config.ts` to customize the color palette
- **Fonts**: Modify `app/globals.css` to change typography
- **Layout**: Adjust components in the `components/` directory

## 📁 Project Structure

```
ai-resume-builder/
├── app/
│   ├── api/
│   │   └── generate/
│   │       └── route.ts          # OpenAI API route
│   ├── preview/
│   │   └── page.tsx              # Preview page
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main builder page
├── components/
│   ├── ExperienceForm.tsx        # Experience section
│   ├── PDFExportButton.tsx       # PDF export button
│   ├── PreviewCard.tsx           # Resume preview
│   ├── ResumeForm.tsx            # Main form component
│   ├── SectionCard.tsx           # Reusable card component
│   ├── SkillsInput.tsx           # Skills input with tags
│   ├── ThemeToggle.tsx           # Dark/light mode toggle
│   └── Toast.tsx                 # Toast notifications
├── lib/
│   ├── ai.ts                     # AI generation functions
│   ├── types.ts                  # TypeScript types
│   ├── useLocalStorage.ts        # LocalStorage hook
│   └── utils.ts                  # Utility functions
├── public/                       # Static assets
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add your `NEXT_PUBLIC_OPENAI_API_KEY` in environment variables
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Render

Make sure to set the `NEXT_PUBLIC_OPENAI_API_KEY` environment variable.

## 🤝 Contributing

This is a personal project for #100Days100Projects, but suggestions and improvements are welcome!

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Built as Day 2 of #100Days100Projects
- Inspired by Apple's design language
- Powered by OpenAI for AI content generation

## 📧 Contact

Created by **Yash Sharma** as part of the #100Days100Projects challenge.

---

**Note:** This app stores all data locally in your browser. No data is sent to external servers except for OpenAI API calls when generating content.

