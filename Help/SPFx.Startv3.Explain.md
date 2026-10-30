# SharePoint Framework (SPFx) v3: Complete Getting Started Guide {#top}

## Table of Contents

### Main Sections
1. [Executive Summary](#executive-summary)
2. [Understanding the Dependency Problem](#understanding-the-dependency-problem)
   - 2.1 [Why Version Compatibility Matters](#why-version-compatibility-matters)
   - 2.2 [The SPFx Dependency Chain](#the-spfx-dependency-chain)
3. [Getting Started Steps](#getting-started-steps)
   - 3.1 [Prerequisites](#prerequisites)
   - 3.2 [Step 1: Install Node.js](#step-1-install-nodejs)
   - 3.3 [Step 2: Verify Installations](#step-2-verify-installations)
   - 3.4 [Step 3: Install Global Tools](#step-3-install-global-tools)
   - 3.5 [Step 4: Create Your First Project](#step-4-create-your-first-project)
   - 3.6 [Step 5: Start Development Server](#step-5-start-development-server)
4. [Tools Reference & Analysis](#tools-reference--analysis)
   - 4.1 [Detailed Tool Comparison](#detailed-tool-comparison)
   - 4.2 [Tool Details & Usage](#tool-details--usage)
5. [Version Compatibility Matrix](#version-compatibility-matrix)
   - 5.1 [SPFx & Tool Versions That Work Together](#spfx--tool-versions-that-work-together)
   - 5.2 [Common Version Mismatch Scenarios](#common-version-mismatch-scenarios)
6. [Visual Studio Code Development Stack](#visual-studio-code-development-stack)
   - 6.1 [Recommended Extensions](#recommended-extensions)
   - 6.2 [VS Code Settings](#vs-code-settings)
7. [Installation Checklist](#installation-checklist)
8. [Quick Start Commands](#quick-start-commands)
9. [Troubleshooting Common Issues](#troubleshooting-common-issues)
10. [Technical Cheat Sheet](#technical-cheat-sheet)
11. [Glossary of Terms](#glossary-of-terms)
12. [Helpful URLs & Resources](#helpful-urls--resources)

---

## Executive Summary

[↑ Back to Top](#top)

SharePoint Framework (SPFx) v1.22-1.23 is Microsoft's modern client-side development platform for SharePoint Online. This guide explains how to set up a complete development environment, focusing on **version compatibility** which is the #1 cause of setup issues.

**Key Facts**:
- **SPFx Latest**: v1.23.x (October 2025)
- **Node.js Required**: v22.x LTS (Jod release)
- **npm Bundled**: 11.x with Node.js v22
- **Build Tool**: Heft 1.3.x (replaces older Gulp)
- **TypeScript**: 5.8+
- **Setup Time**: 20-30 minutes
- **Most Common Problem**: Version mismatches between Node.js, npm, Heft, and SPFx

**Why Versions Matter So Much**:
SPFx v1.22+ introduced Heft as the build tool and requires specific versions of Node.js and npm. Using wrong versions results in build failures, TypeScript errors, or mysterious webpack issues.

---

## Understanding the Dependency Problem

[↑ Back to Top](#top)

### Why Version Compatibility Matters

[↑ Back to Top](#understanding-the-dependency-problem)

The SPFx dependency chain is **strict and unforgiving**. Each version of SPFx requires specific versions of:
- Node.js (runtime)
- npm (package manager)
- Heft (build orchestrator)
- TypeScript (language compiler)
- Webpack (bundler)

If any one version is wrong, your project will fail to build.

**Real-World Examples**:

```
❌ SCENARIO 1: SPFx 1.22 + Node.js 20.x
   Error: "node-gyp rebuild failed"
   Why: SPFx 1.22 requires Node.js 22.x, not 20.x
   Fix: Install Node.js 22.x

❌ SCENARIO 2: SPFx 1.22 + Heft 1.1.x
   Error: "Cannot find module '@rushstack/heft-webpack5-plugin'"
   Why: SPFx 1.22 requires Heft 1.3.x minimum
   Fix: npm install @rushstack/heft@1.3.2 --save-dev

✅ SCENARIO 3: SPFx 1.22 + Node.js 22.x + npm 11.x + Heft 1.3.x
   Result: Project builds successfully!
```

### The SPFx Dependency Chain

[↑ Back to Top](#understanding-the-dependency-problem)

```
SPFx Version 1.22-1.23
        ↓
   Requires Node.js v22.x LTS
        ↓
   Which bundles npm 11.x (cannot be upgraded separately!)
        ↓
   Which requires Heft 1.3.x minimum
        ↓
   Which requires TypeScript 5.8+
        ↓
   Which requires Webpack 5.x
        ↓
   Which outputs ES2020 JavaScript
```

**Key Insight**: npm version is tied to Node.js version. If you install Node.js 22, you automatically get npm 11. You cannot upgrade npm independently—it comes with Node.js.

---

## Getting Started Steps

[↑ Back to Top](#top)

### Prerequisites

[↑ Back to Top](#getting-started-steps)

Before starting, ensure you have:
- Windows 10/11, macOS, or Linux
- Administrator access to install software
- Internet connection (for npm downloads)
- ~500MB disk space for Node.js, tools, and project

### Step 1: Install Node.js

[↑ Back to Top](#getting-started-steps)

**Download and Install**:
1. Visit https://nodejs.org/
2. Download **Node.js v22.x LTS** (labeled "Jod" or "Long Term Support")
3. Run installer, accept defaults
4. **Restart your terminal** (important!)

**Verify Installation**:
```powershell
# Open new PowerShell window
node --version      # Should show: v22.x.x
npm --version       # Should show: 11.x.x
```

⚠️ **Critical**: If `npm --version` shows something other than 11.x, you installed the wrong Node.js version.

### Step 2: Verify Installations

[↑ Back to Top](#getting-started-steps)

```powershell
# Check Node.js location
where node            # Shows: C:\Program Files\nodejs\node.exe

# Check npm location
where npm             # Shows: C:\Program Files\nodejs\npm.cmd

# Check npm registry (for GCC standard users)
npm config get registry

# List globally installed packages
npm list --global --depth=0
```

### Step 3: Install Global Tools

[↑ Back to Top](#getting-started-steps)

```powershell
# Install Yeoman (project scaffolding)
npm install --global yo

# Install SPFx generator
npm install --global @microsoft/generator-sharepoint

# Install Heft (build tool) - OPTIONAL, usually local
npm install --global @rushstack/heft

# Verify installations
yo --version
```

### Step 4: Create Your First Project

[↑ Back to Top](#getting-started-steps)

```powershell
# Create project directory
mkdir my-spfx-project
cd my-spfx-project

# Generate SPFx project with Yeoman
yo @microsoft/sharepoint

# Follow prompts:
# Solution name: my-spfx-solution
# Baseline packages version: (select latest)
# Which framework: React (recommended)
# Features: Web part
# Framework: Select your framework

# Scaffold process completes
# Project structure created with package.json
```

### Step 5: Start Development Server

[↑ Back to Top](#getting-started-steps)

```powershell
# Navigate to project directory
cd my-spfx-solution

# Install local dependencies
npm install

# Start development server
heft start

# Browser should open to:
# https://localhost:4321/temp/manifests.js

# Navigate to SharePoint workbench:
# https://[tenant].sharepoint.com/sites/[site]/_layouts/15/workbench.aspx
```

---

## Tools Reference & Analysis

[↑ Back to Top](#top)

### Detailed Tool Comparison

[↑ Back to Top](#tools-reference--analysis)

| Tool | Current Version | Release Date | Type | Role in SPFx |
|------|---|---|---|---|
| **Node.js** | 22.0.0 LTS | 2024-04-24 | Runtime | JavaScript runtime environment |
| **npm** | 11.0.0 | 2024-10-02 | Package Manager | Dependency management (bundled with Node.js) |
| **Yeoman** | 7.0.1 | 2023-11-15 | Scaffolding | Project generation and templates |
| **@microsoft/generator-sharepoint** | 1.23.2 | 2024-10-15 | Generator | SPFx project scaffolding |
| **Heft** | 1.3.2 | 2024-09-20 | Build Tool | Build orchestration (replaces Gulp) |
| **TypeScript** | 5.8.0 | 2024-10-17 | Language | Language compiler and type checker |
| **Webpack** | 5.95.0 | 2024-08-15 | Bundler | Module bundling and optimization |
| **React** | 18.2.0 | 2024-03-22 | Framework | UI component framework (optional) |

### Tool Details & Usage

[↑ Back to Top](#tools-reference--analysis)

#### Node.js v22 LTS

[↑ Back to Top](#tool-details--usage)

| Property | Details |
|----------|---------|
| **Current Version** | 22.0.0 (Jod) |
| **Release Date** | April 24, 2024 |
| **Download URL** | https://nodejs.org/ |
| **Docs** | https://nodejs.org/docs/latest-v22.x/api/ |
| **GitHub** | https://github.com/nodejs/node/releases/tag/v22.0.0 |
| **Usage** | `node script.js`, `npm install`, `npx` |
| **Typical Command** | `node --version` → v22.x.x |
| **Samples** | https://github.com/nodejs/examples |
| **Pros** | ✅ LTS support until April 2027, ✅ Built-in npm 11.x, ✅ ES2020 support |
| **Caveats** | ⚠️ Requires 64-bit OS, ⚠️ ~500MB disk space, ⚠️ Admin rights to install |
| **Why SPFx Needs It** | Heft and TypeScript compiler require recent Node.js for performance |

#### npm 11.x

[↑ Back to Top](#tool-details--usage)

| Property | Details |
|----------|---------|
| **Current Version** | 11.0.0 |
| **Release Date** | October 2, 2024 |
| **Comes With** | Node.js v22.x (cannot upgrade separately) |
| **Docs** | https://docs.npmjs.com/ |
| **GitHub** | https://github.com/npm/cli |
| **Usage** | `npm install`, `npm run build`, `npm publish` |
| **Typical Command** | `npm install --save react` |
| **Samples** | https://www.npmjs.com/ (package registry) |
| **Pros** | ✅ Fast dependency resolution, ✅ Workspaces support, ✅ Built-in package auditing |
| **Caveats** | ⚠️ Tied to Node.js version, ⚠️ Cannot install old versions, ⚠️ Breaking changes in major versions |
| **Why SPFx Needs It** | Manages @microsoft/sp-* packages and all dependencies |

#### Yeoman 7.0.1

[↑ Back to Top](#tool-details--usage)

| Property | Details |
|----------|---------|
| **Current Version** | 7.0.1 |
| **Release Date** | November 15, 2023 |
| **Installation** | `npm install --global yo` |
| **Docs** | https://yeoman.io/ |
| **GitHub** | https://github.com/yeoman/yeoman |
| **Usage** | `yo @microsoft/sharepoint` |
| **Typical Command** | `yo [generator-name]` |
| **Samples** | https://github.com/yeoman/generator-webapp |
| **Pros** | ✅ Interactive scaffolding, ✅ Customizable templates, ✅ Modular architecture |
| **Caveats** | ⚠️ Requires Node.js, ⚠️ Can be slow with large projects, ⚠️ Interactive prompts |
| **Why SPFx Needs It** | Creates the initial project structure and configuration |

#### @microsoft/generator-sharepoint 1.23.2

[↑ Back to Top](#tool-details--usage)

| Property | Details |
|----------|---------|
| **Current Version** | 1.23.2 |
| **Release Date** | October 15, 2024 |
| **Installation** | `npm install --global @microsoft/generator-sharepoint` |
| **Docs** | https://learn.microsoft.com/en-us/sharepoint/dev/spfx/ |
| **GitHub** | https://github.com/pnp/generator-sharepoint |
| **Usage** | `yo @microsoft/sharepoint` |
| **Typical Command** | Interactive prompt answers 8 questions |
| **Samples** | https://github.com/pnp/sp-dev-fx-webparts |
| **Pros** | ✅ Official Microsoft template, ✅ Includes Heft config, ✅ React/TypeScript setup |
| **Caveats** | ⚠️ Large initial download (~200MB), ⚠️ Creates many boilerplate files, ⚠️ Opinionated structure |
| **Why SPFx Needs It** | Scaffolds SPFx-specific configuration and boilerplate |

#### Heft 1.3.2

[↑ Back to Top](#tool-details--usage)

| Property | Details |
|----------|---------|
| **Current Version** | 1.3.2 |
| **Release Date** | September 20, 2024 |
| **Installation** | Local: `npm install --save-dev @rushstack/heft` |
| **Docs** | https://rushstack.io/pages/heft/overview/ |
| **GitHub** | https://github.com/microsoft/rushstack/tree/main/apps/heft |
| **Usage** | `heft build`, `heft start`, `heft test` |
| **Typical Commands** | `heft start` (dev), `heft build` (production), `heft test` (tests) |
| **Samples** | https://github.com/microsoft/rushstack/tree/main/apps/heft/samples |
| **Pros** | ✅ Config-driven (JSON-based), ✅ Fast builds, ✅ Orchestrates TypeScript/Webpack/Jest |
| **Caveats** | ⚠️ Replaces older Gulp workflow, ⚠️ Strict config requirements, ⚠️ Steep learning curve |
| **Why SPFx Needs It** | Heft 1.3+ is the modern build system for SPFx v1.22+ projects |

#### TypeScript 5.8.0

[↑ Back to Top](#tool-details--usage)

| Property | Details |
|----------|---------|
| **Current Version** | 5.8.0 |
| **Release Date** | October 17, 2024 |
| **Installation** | `npm install --save-dev typescript` (local) or `npm install --global typescript` |
| **Docs** | https://www.typescriptlang.org/docs/ |
| **GitHub** | https://github.com/microsoft/TypeScript |
| **Usage** | `tsc`, `tsc --watch`, `tsc --noEmit` |
| **Typical Commands** | `tsc app.ts` (compile), `tsc --watch` (watch mode) |
| **Samples** | https://www.typescriptlang.org/play |
| **Pros** | ✅ Full type safety, ✅ Excellent IDE support, ✅ Compile-time error detection |
| **Caveats** | ⚠️ Requires compilation step, ⚠️ Adds build time, ⚠️ Learning curve for JS developers |
| **Why SPFx Needs It** | SPFx and all M365 tools require TypeScript for type safety |

#### Webpack 5.95.0

[↑ Back to Top](#tool-details--usage)

| Property | Details |
|----------|---------|
| **Current Version** | 5.95.0 |
| **Release Date** | August 15, 2024 |
| **Installation** | Via Heft (automatic, not direct) |
| **Docs** | https://webpack.js.org/concepts/ |
| **GitHub** | https://github.com/webpack/webpack |
| **Usage** | Configured in `webpack.config.js` (Heft manages it) |
| **Typical Command** | Usually run via `heft build` |
| **Samples** | https://github.com/webpack/webpack/tree/main/examples |
| **Pros** | ✅ Advanced bundling, ✅ Tree-shaking, ✅ Code splitting, ✅ Plugin ecosystem |
| **Caveats** | ⚠️ Complex configuration, ⚠️ Large bundle size possible, ⚠️ Requires optimization knowledge |
| **Why SPFx Needs It** | Heft orchestrates Webpack for code bundling and optimization |

---

## Version Compatibility Matrix

[↑ Back to Top](#top)

### SPFx & Tool Versions That Work Together

[↑ Back to Top](#version-compatibility-matrix)

This table shows **confirmed working combinations**. Use these exact versions to avoid build failures.

| SPFx | Node.js | npm | Heft | TypeScript | Webpack | Status | Notes |
|------|---------|-----|------|-----------|---------|--------|-------|
| **1.23.2** | 22.x | 11.x | 1.3.2 | 5.8+ | 5.95+ | ✅ Current | Latest stable combination |
| **1.23.0** | 22.x | 11.x | 1.3.x | 5.8+ | 5.90+ | ✅ Working | Slightly older but stable |
| **1.22.2** | 22.x | 11.x | 1.3.x | 5.8+ | 5.85+ | ✅ Working | Still supported |
| 1.21.x | 20.x | 10.x | 1.1.x | 5.5+ | 5.75+ | ⚠️ Legacy | Older, not recommended |
| 1.20.x | 18.x | 9.x | 0.45.x | 4.9+ | 5.70+ | ❌ Old | No longer supported |

**Key Rules**:
- ✅ Use **Node.js 22.x** with **SPFx 1.22+** (this is required)
- ✅ npm 11.x comes **automatically** with Node.js 22.x
- ✅ Heft 1.3.x is **minimum** for SPFx 1.22+
- ✅ TypeScript 5.8+ is **required** for SPFx 1.22+

### Common Version Mismatch Scenarios

[↑ Back to Top](#version-compatibility-matrix)

| Scenario | Symptoms | Root Cause | Solution |
|----------|----------|-----------|----------|
| **Old Node.js** | `npm ERR! node-gyp rebuild failed` | Using Node.js 20.x with SPFx 1.22 | Uninstall Node.js 20, install Node.js 22.x LTS |
| **Wrong npm** | `npm ERR! gyp ERR! gyp info spawning` | npm 10.x (old) trying to build native modules | Automatically fixed when you install Node.js 22.x |
| **Old Heft** | `Cannot find module '@rushstack/heft-webpack5-plugin'` | Heft 1.1.x or 1.2.x with SPFx 1.22 | `npm install @rushstack/heft@1.3.2 --save-dev` |
| **Old TypeScript** | `Type 'any' is not assignable to type 'string'` | TypeScript 4.9.x with SPFx 1.22 | `npm install typescript@5.8.0 --save-dev` |
| **Mixed Versions** | `Webpack version mismatch` in console | Different webpack versions in node_modules | Delete `node_modules` and `package-lock.json`, run `npm install` |

**When in doubt, run:**
```powershell
node --version    # Check Node.js (should be 22.x)
npm --version     # Check npm (should be 11.x)
npm list          # View all installed versions
```

---

## Visual Studio Code Development Stack

[↑ Back to Top](#top)

### Recommended Extensions

[↑ Back to Top](#visual-studio-code-development-stack)

| Extension | Author | Purpose | Marketplace URL |
|-----------|--------|---------|---|
| **TypeScript** | Microsoft | Language support (built-in) | Built-in |
| **ES7+ React/Redux/React-Native snippets** | dsznajder | Code snippets | https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets |
| **ESLint** | Microsoft | Linting and code quality | https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint |
| **Prettier** | Prettier | Code formatting | https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode |
| **REST Client** | Humao | Test REST APIs | https://marketplace.visualstudio.com/items?itemName=humao.rest-client |
| **Debug for Chrome** | Microsoft | Browser debugging | https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome |
| **Peacock** | John Papa | Color workspace tabs | https://marketplace.visualstudio.com/items?itemName=johnpapa.vscode-peacock |
| **Thunder Client** | Rangav | API testing (alternative to REST Client) | https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client |

### VS Code Settings

[↑ Back to Top](#visual-studio-code-development-stack)

**Create `.vscode/settings.json` in your project:**

```json
{
  // Editor settings
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  "editor.trimAutoWhitespace": true,

  // TypeScript settings
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "typescript.checkJs": false,

  // File settings
  "files.exclude": {
    "node_modules": true,
    "dist": true,
    "*.orig": true
  },
  "files.watcherExclude": {
    "node_modules": true,
    "dist": true
  },

  // Search settings
  "search.exclude": {
    "node_modules": true,
    "dist": true,
    ".git": true
  }
}
```

---

## Installation Checklist

[↑ Back to Top](#top)

[↑ Back to Top](#installation-checklist)

- [ ] Node.js v22.x LTS installed and in PATH
- [ ] npm 11.x verified (`npm --version`)
- [ ] Yeoman 7.0+ installed globally (`npm install --global yo`)
- [ ] SPFx generator installed (`npm install --global @microsoft/generator-sharepoint`)
- [ ] Visual Studio Code installed with extensions
- [ ] Project directory created
- [ ] SPFx project scaffolded with Yeoman
- [ ] `npm install` completed successfully
- [ ] `heft start` runs without errors
- [ ] Workbench accessible at `https://localhost:4321`
- [ ] SharePoint site workbench accessible at `https://[tenant].sharepoint.com/sites/[site]/_layouts/15/workbench.aspx`

---

## Quick Start Commands

[↑ Back to Top](#top)

### Create New Project (Copy & Paste)

[↑ Back to Top](#quick-start-commands)

```powershell
# One-liner project creation
mkdir my-spfx-project; cd my-spfx-project; yo @microsoft/sharepoint
```

### Interactive Project Creation

[↑ Back to Top](#quick-start-commands)

```powershell
# Step-by-step creation
mkdir my-spfx-project
cd my-spfx-project
yo @microsoft/sharepoint

# Answer prompts:
# ? Do you want to allow the tenant admin the choice of allowing the... (Y/n): Y
# ? Which type of client-side component to create?: WebPart
# ? Which framework would you like to use?: React
# ? Would you like to use SPFx extensions?: n
# ? What is your Web part name?: MyWebPart
```

### Development Commands

[↑ Back to Top](#quick-start-commands)

```powershell
# Install dependencies
npm install

# Start development server
heft start

# Build for production
heft build

# Package solution
npm run package-solution

# Run tests
npm test

# Check code quality
npm run lint
```

### Version Check Commands

[↑ Back to Top](#quick-start-commands)

```powershell
# Verify all versions
node --version          # v22.x.x
npm --version           # 11.x.x
yo --version            # 7.x.x or higher

# Check installed packages
npm list --global --depth=0

# Update SPFx packages
npm update @microsoft/sp-webpart-base
```

---

## Troubleshooting Common Issues

[↑ Back to Top](#top)

### Issue: "node-gyp rebuild failed"

[↑ Back to Top](#troubleshooting-common-issues)

**Cause**: Wrong Node.js version (usually Node.js 20.x or 18.x)

**Solution**:
```powershell
# Check current version
node --version

# If not v22.x:
# 1. Uninstall current Node.js
# 2. Download Node.js v22 LTS from https://nodejs.org/
# 3. Install and restart terminal
# 4. Verify: node --version (should show v22.x.x)
```

### Issue: "Cannot find module @rushstack/heft"

[↑ Back to Top](#troubleshooting-common-issues)

**Cause**: Heft not installed or wrong version

**Solution**:
```powershell
# Install or update Heft
npm install @rushstack/heft@1.3.2 --save-dev

# Or reinstall all dependencies
rm -r node_modules package-lock.json
npm install
```

### Issue: "TypeScript compilation failed"

[↑ Back to Top](#troubleshooting-common-issues)

**Cause**: TypeScript version mismatch or configuration issue

**Solution**:
```powershell
# Update TypeScript
npm install typescript@5.8.0 --save-dev

# Clean rebuild
npm run build -- --clean

# Check tsconfig.json is present and valid
Get-Content tsconfig.json | ConvertFrom-Json
```

### Issue: "npm ERR! code ERESOLVE"

[↑ Back to Top](#troubleshooting-common-issues)

**Cause**: Dependency resolution conflict

**Solution**:
```powershell
# Option 1: Force resolution
npm install --legacy-peer-deps

# Option 2: Clean install
rm -r node_modules package-lock.json
npm install

# Option 3: Use npm 11's built-in resolver
npm install --omit=optional
```

---

## Technical Cheat Sheet

[↑ Back to Top](#top)

### Quick Install Script

[↑ Back to Top](#technical-cheat-sheet)

```powershell
# Copy and paste this entire block into PowerShell

# Install global tools
npm install --global yo @microsoft/generator-sharepoint

# Create project
$projectName = "my-spfx-project"
mkdir $projectName
cd $projectName

# Scaffold with Yeoman (interactive)
yo @microsoft/sharepoint

# Install dependencies
npm install

# Start dev server
heft start
```

### One-Liner Project Creation

[↑ Back to Top](#technical-cheat-sheet)

```powershell
mkdir my-spfx; cd my-spfx; yo @microsoft/sharepoint; npm install; heft start
```

### Essential npm Commands

[↑ Back to Top](#technical-cheat-sheet)

```powershell
npm install                    # Install all dependencies
npm install --save react       # Add package to dependencies
npm install --save-dev typescript  # Add to dev dependencies
npm update                     # Update all packages
npm list                       # Show installed versions
npm list --global              # Show global installations
npm audit                      # Check for vulnerabilities
npm run build                  # Run build script
npm start                      # Start dev server
npm test                       # Run tests
```

### Essential Heft Commands

[↑ Back to Top](#technical-cheat-sheet)

```powershell
heft start                     # Development server (watch mode)
heft build                     # Production build
heft build --production        # Minified production build
heft clean                     # Clean build artifacts
heft test                      # Run test suite
heft --help                    # Show all commands
```

### Package.json Key Properties

[↑ Back to Top](#technical-cheat-sheet)

```json
{
  "name": "my-spfx-solution",
  "version": "1.0.0",
  "private": true,
  "engines": {
    "node": ">=22.0.0",
    "npm": ">=11.0.0"
  },
  "dependencies": {
    "@microsoft/sp-webpart-base": "1.23.2",
    "react": "18.2.0"
  },
  "devDependencies": {
    "@microsoft/generator-sharepoint": "1.23.2",
    "@rushstack/heft": "1.3.2",
    "typescript": "5.8.0"
  },
  "scripts": {
    "build": "heft build",
    "start": "heft start",
    "package-solution": "heft build && npm run bundle",
    "test": "heft test"
  }
}
```

### Tsconfig.json Essential Settings

[↑ Back to Top](#technical-cheat-sheet)

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "react",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "sourceMap": true,
    "moduleResolution": "node"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.spec.ts"]
}
```

---

## Glossary of Terms

[↑ Back to Top](#top)

| Term | Definition |
|------|-----------|
| **SPFx** | SharePoint Framework - Microsoft's client-side development platform |
| **Node.js** | JavaScript runtime environment for server-side code execution |
| **npm** | Node Package Manager - manages JavaScript dependencies and projects |
| **Heft** | Config-driven build tool orchestrating TypeScript, Webpack, Jest |
| **Yeoman** | Project scaffolding and boilerplate code generator |
| **Generator** | Yeoman template that creates project structure |
| **TypeScript** | Typed superset of JavaScript compiled to plain JavaScript |
| **Webpack** | Module bundler combining multiple JavaScript files into optimized output |
| **React** | JavaScript library for building user interfaces with components |
| **Web Part** | Reusable SharePoint component that displays content |
| **Extension** | SharePoint customization (application customizer, field customizer, etc.) |
| **Manifest** | JSON/XML metadata file describing component properties |
| **Bundle** | Compiled and minified JavaScript output for deployment |
| **Watch Mode** | Automatic recompilation when source files change |
| **Dev Server** | Local server for testing during development (`localhost:4321`) |
| **Workbench** | Local testing environment for web parts and extensions |
| **LTS** | Long-Term Support release version with extended support period |
| **Version Lock** | Locking to specific versions to ensure compatibility |
| **Dependency** | External package required by a project |
| **DevDependency** | Package only needed during development, not in production |
| **Peer Dependency** | Package that must also be installed by the consuming project |
| **Dependency Conflict** | When two packages require incompatible versions |
| **Tree-shaking** | Webpack feature removing unused code to reduce bundle size |
| **Code Splitting** | Breaking large bundles into smaller chunks loaded on demand |
| **Transpile** | Convert TypeScript/modern JavaScript to older JavaScript versions |
| **Polyfill** | Code adding missing features to older browser/runtime environments |
| **CLI** | Command-Line Interface for interacting with tools |
| **PowerShell** | Windows command-line shell and scripting language |
| **Path** | Full location of file or directory on the system |
| **Global Installation** | Package available system-wide vs. project-specific |
| **Package.json** | Configuration file defining project metadata and dependencies |
| **Package-lock.json** | Lock file ensuring exact dependency versions across installations |
| **Node_modules** | Directory containing all installed packages and dependencies |
| **Dist/Build** | Output directory with compiled JavaScript ready for deployment |

---

## Helpful URLs & Resources

[↑ Back to Top](#top)

### Official Documentation

[↑ Back to Top](#helpful-urls--resources)

- SPFx Official Docs: https://learn.microsoft.com/en-us/sharepoint/dev/spfx/
- SPFx Setup Guide: https://learn.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-development-environment
- SPFx Web Parts: https://learn.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/
- SPFx Extensions: https://learn.microsoft.com/en-us/sharepoint/dev/spfx/extensions/overview-extensions

### Tools & Downloads

[↑ Back to Top](#helpful-urls--resources)

- Node.js Download: https://nodejs.org/
- npm Documentation: https://docs.npmjs.com/
- Yeoman: https://yeoman.io/
- Heft Build Tool: https://rushstack.io/pages/heft/overview/
- TypeScript: https://www.typescriptlang.org/
- Visual Studio Code: https://code.visualstudio.com/

### Learning & Training

[↑ Back to Top](#helpful-urls--resources)

- Microsoft Learn SPFx Path: https://learn.microsoft.com/en-us/training/paths/develop-sharepoint-framework/
- SPFx Tutorial: https://learn.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/build-a-hello-world-web-part
- PnP Training: https://pnp.github.io/
- TypeScript Handbook: https://www.typescriptlang.org/docs/handbook/

### Community & Samples

[↑ Back to Top](#helpful-urls--resources)

- PnP SP Dev WebParts: https://github.com/pnp/sp-dev-fx-webparts
- PnP JS Library: https://github.com/pnp/pnpjs
- Microsoft SPFx Samples: https://github.com/microsoft/SharePoint-Samples
- Stack Overflow [sharepoint-framework]: https://stackoverflow.com/questions/tagged/sharepoint-framework
- SPFx Tech Community: https://techcommunity.microsoft.com/t5/sharepoint-developer/

### Version Information

[↑ Back to Top](#helpful-urls--resources)

- Node.js LTS Releases: https://nodejs.org/about/releases/
- npm Release Notes: https://github.com/npm/cli/releases
- SPFx Release Notes: https://learn.microsoft.com/en-us/sharepoint/dev/spfx/release-notes/
- TypeScript Releases: https://github.com/microsoft/TypeScript/releases

### Troubleshooting

[↑ Back to Top](#helpful-urls--resources)

- SPFx Issues: https://github.com/microsoft/sharepoint-dev-docs/issues
- npm Troubleshooting: https://docs.npmjs.com/cli/v11/using-npm/troubleshooting
- Node.js Issues: https://github.com/nodejs/node/issues
- Stack Overflow: https://stackoverflow.com/questions/tagged/sharepoint-framework+typescript

---

**Last Updated**: October 1, 2026  
**SPFx Version**: 1.23.x (Current)  
**Node.js Version**: 22.x LTS (Jod)  
**npm Version**: 11.x  
**Heft Version**: 1.3.x  
**TypeScript Version**: 5.8+  
**Document Location**: c:\Davis\vibe\SPFx\Help\SPFx.Startv3.Explain.md
