# Design Document: IDE-Style Portfolio Website

**Date:** 2026-05-17
**Status:** Validated
**Topic:** Recreating a technical portfolio inspired by getviktor.co using an IDE aesthetic.

## 1. Overview
The goal is to build a high-performance, static-generated personal portfolio that mimics a modern Integrated Development Environment (IDE) like VS Code. This provides a familiar, technical interface for developers and recruiters while showcasing the owner's skills as "source code."

## 2. Architecture & Tech Stack
- **Framework:** Astro (for optimal performance and static generation).
- **Styling:** Tailwind CSS (for layout and "IDE Chrome" components).
- **Navigation:** Multi-page routing with **Astro View Transitions**. This allows the "Shell" (Activity Bar, Sidebar, Status Bar) to remain persistent while only the "Editor" content changes.
- **Content Management:** Markdown/MDX for pages, with a central `config.ts` for metadata (name, socials, skills).
- **Syntax Highlighting:** Shiki (built into Astro) to render content blocks with professional code themes.

## 3. Layout & Components
### The "IDE Shell"
- **Activity Bar (Narrow Left):** Fixed icons for navigation categories (Explorer, Search, Socials).
- **Sidebar (Explorer):** A collapsible tree view representing the site's structure as a file system (e.g., `src/pages/about.me`).
- **Tab Bar (Top):** Displays "open files." The current page is highlighted as the active tab.
- **Editor Area (Main):** The content zone where Markdown/JSON/TypeScript representations of the user's bio are displayed.
- **Status Bar (Bottom):** Displays metadata like "Git branch," "Current Language," and "System Uptime."

### Interactive Features
- **Command Palette (`Cmd+K`):** A modal for quick navigation between "files."
- **Breadcrumbs:** Shows the path to the current file (e.g., `src > work > experience.ts`).
- **Git Diff Styling:** Used in the Experience section to show career progression.

## 4. Visual Style
- **Theme:** "Midnight Professional."
- **Background:** Deep charcoal/midnight blue (`#0d1117`).
- **Sidebar:** Slightly darker (`#010409`) for contrast.
- **Accent:** "VS Code Blue" (`#007acc`) or vibrant "Cyber Lime" (`#a7ff00`).
- **Typography:** Monospace fonts (e.g., JetBrains Mono, Fira Code) for that authentic code feel.

## 5. Success Criteria
- [ ] Website is fully static and scores high on Lighthouse.
- [ ] Navigation feels like switching tabs in an IDE.
- [ ] Content is easily customizable via a single config file or Markdown files.
- [ ] Mobile-responsive (Sidebar collapses into a "Hamburger" or bottom sheet).
