# SharePoint Framework (SPFx) - Getting Started Guide v2 {#top}

## Table of Contents

### Main Sections
1. [Executive Summary](#executive-summary)
2. [Getting Started Steps](#getting-started-steps)
3. [Tools Reference & Detailed Analysis](#tools-reference--detailed-analysis)
4. [Version Compatibility Matrix](#version-compatibility-matrix)
5. [Visual Studio Code Development Stack](#visual-studio-code-development-stack)
6. [Installation Checklist](#installation-checklist)
7. [Quick Start Commands](#quick-start-commands)
8. [Common Issues & Solutions](#common-issues--solutions)
9. [Technical Cheat Sheet](#technical-cheat-sheet)
10. [Glossary of Terms](#glossary-of-terms)
11. [Helpful URLs & Resources](#helpful-urls--resources)

---

## Executive Summary

[↑ Back to Top](#top)

SharePoint Framework (SPFx) is Microsoft's modern client-side development platform for building SharePoint Online and on-premises solutions with TypeScript, React, and web standards.

**Why SPFx v1.22+ (Current Standard)**
- **Heft toolchain**: Faster, simpler builds (replaces Gulp)
- **TypeScript**: Full type safety and better IDE support
- **No external dependencies**: Self-contained web parts
- **Framework agnostic**: Use React, Vue, or vanilla JavaScript

**Critical Understanding: Tool Dependencies**
The confusion about version compatibility stems from a **dependency chain**:
```
SPFx version → requires Node.js version → which bundles npm version → which uses Heft → which manages TypeScript
```
Example: SPFx v1.22 requires Node.js v22 LTS (which includes npm 11), Heft v1.3+, and TypeScript v5.8+.

**Minimum Setup Time**: 20-30 minutes. **Learning Time**: 2-4 weeks for proficiency.

---

## Getting Started Steps

[↑ Back to Top](#top)

### Step 1: Install Node.js (Foundation)

[↑ Back to Top](#getting-started-steps)

- Download **Node.js v22 LTS** (Jod) from [nodejs.org](https://nodejs.org)
- **CRITICAL**: Only LTS versions (even numbers: 18, 20, 22, 24)—never odd versions (21, 23, 25)
- Verify: `node --version` → should show `v22.x.x`
- npm is automatically included: `npm --version` → should show `11.x.x`

### Step 2: Install Yeoman & SPFx Generator

[↑ Back to Top](#getting-started-steps)

```powershell
npm install --global yo @microsoft/generator-sharepoint @rushstack/heft
```

Verify:
- `yo --version` → should show `7.0.x` or higher
- `heft --version` → should show `1.3.x` or higher

### Step 3: Create Your First SPFx Project

[↑ Back to Top](#getting-started-steps)

```powershell
mkdir my-spfx-project
cd my-spfx-project
yo @microsoft/sharepoint
```

Answer prompts:
- **Solution name**: `my-spfx-project`
- **Baseline packages**: Choose `React` (recommended) or `None`
- **Web part name**: `HelloWorld`
- **Allow tenantwide**: `No` (initially)

### Step 4: Trust Development Certificate

[↑ Back to Top](#getting-started-steps)

```powershell
heft trust-dev-cert
```

Required for HTTPS with self-signed cert.

### Step 5: Start Development Server

[↑ Back to Top](#getting-started-steps)

```powershell
heft start
```

Opens workbench at: `https://yourtenant.sharepoint.com/_layouts/workbench.aspx`

---

## Tools Reference & Detailed Analysis

[↑ Back to Top](#top)

### Complete Tools Comparison Table

| Tool | Current Version | Release Date | Download | Purpose |
|---|---|---|---|---|
| **Node.js (LTS)** | 22.x (Jod) | Apr 24, 2024 | [nodejs.org](https://nodejs.org) | JavaScript runtime foundation |
| **npm** | 11.x | Bundled with Node 22 | Included with Node.js | Package manager |
| **Yeoman** | 7.0.1+ | Apr 2024 | [yeoman.io](https://yeoman.io) | Project scaffolding |
| **@microsoft/generator-sharepoint** | 1.23.2 | Oct 2025 | [npmjs.com](https://www.npmjs.com/package/@microsoft/generator-sharepoint) | SPFx project generator |
| **Heft (@rushstack/heft)** | 1.3.2 | Sep 2025 | [rushstack.io](https://rushstack.io/pages/heft/overview/) | Build orchestrator |
| **TypeScript** | 5.8+ | Oct 2024 | Installed per-project | Type-safe JavaScript |
| **Webpack** | 5.x | Auto-configured | Built into Heft | Module bundler |
| **React** | 18.x | Dec 2024 | [react.dev](https://react.dev) | UI framework (optional) |

---

### Detailed Tool Analysis

#### Node.js

[↑ Back to Top](#tools-reference)

| Aspect | Details |
|---|---|
| **Version to Use** | 22.x LTS (Jod) — Apr 24, 2024 → Sep 23, 2026 |
| **What It Is** | JavaScript runtime outside the browser; foundation for all build tools |
| **Download** | [nodejs.org/download](https://nodejs.org/en/download/) |
| **Docs** | [nodejs.org/docs](https://nodejs.org/docs/) |
| **Check Version** | `node --version` |
| **Usage** | `node script.js` or indirectly via npm/Heft |
| **Why Version Matters** | Each major Node.js version has different built-in module APIs that Heft and TypeScript depend on |
| **Pros** | ✅ Stable, mature, large ecosystem; ✅ Fast execution; ✅ Excellent npm integration |
| **Caveats** | ⚠️ **CRITICAL**: Only LTS versions work; ⚠️ Odd versions (21, 23, 25) are Current releases, unsupported after 6 months; ⚠️ Version mismatches cause cryptic build errors; ⚠️ Cannot downgrade after npm install |
| **Sample Problem** | Using Node 20 with SPFx 1.22 → Heft fails with "ENOENT: file not found" because APIs differ |

#### npm (Node Package Manager)

[↑ Back to Top](#tools-reference)

| Aspect | Details |
|---|---|
| **Version to Use** | 11.x (bundled with Node 22) |
| **What It Is** | Package manager for JavaScript—installs, updates, manages project dependencies |
| **Download** | Included with Node.js (no separate install) |
| **Docs** | [docs.npmjs.com](https://docs.npmjs.com/) |
| **Check Version** | `npm --version` |
| **Usage** | `npm install`, `npm run build`, `npm audit` |
| **Registry** | https://registry.npmjs.org (public) or internal mirrors in GCC |
| **Pros** | ✅ Largest package ecosystem; ✅ Security auditing built-in; ✅ Automatic with Node.js; ✅ Local vs global package management |
| **Caveats** | ⚠️ **LOCKED to Node.js version** (cannot upgrade independently); ⚠️ Dependency conflicts can cause version resolution issues; ⚠️ npm audit warnings don't always need immediate action; ⚠️ SPFx v1.22+ intentionally addresses most vulnerabilities |
| **Key Commands** | `npm install` (install deps), `npm update` (upgrade), `npm audit` (security check), `npm audit fix` (auto-fix) |

#### Yeoman

[↑ Back to Top](#tools-reference)

| Aspect | Details |
|---|---|
| **Version to Use** | 7.0.1+ |
| **What It Is** | Project scaffolding tool—generates boilerplate code with best practices |
| **Download** | Via npm: `npm install --global yo` |
| **Docs** | [yeoman.io](https://yeoman.io/authoring/) |
| **Check Version** | `yo --version` |
| **Usage** | `yo @microsoft/sharepoint` (launches SPFx generator) |
| **Generators Available** | 1000+ generators for various frameworks |
| **Pros** | ✅ Creates well-structured, tested boilerplate; ✅ Follows industry best practices; ✅ Interactive prompts guide setup; ✅ Extensible with custom generators |
| **Caveats** | ⚠️ Must run in the directory where you want the project; ⚠️ Cannot be easily uninstalled without affecting other generators; ⚠️ Generator version must be compatible with SPFx version; ⚠️ Older generators may create outdated code |
| **Common Issue** | Running in wrong directory or with incompatible generator version |

#### @microsoft/generator-sharepoint (SPFx Generator)

[↑ Back to Top](#tools-reference)

| Aspect | Details |
|---|---|
| **Version to Use** | 1.23.2 (matches SPFx 1.23.x) |
| **What It Is** | Yeoman generator specifically for SharePoint—creates web parts, extensions, components |
| **Download** | Via npm: `npm install --global @microsoft/generator-sharepoint` |
| **Docs** | [learn.microsoft.com/sharepoint/dev/spfx](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/) |
| **Check Version** | `yo @microsoft/sharepoint --version` |
| **Usage** | `yo @microsoft/sharepoint` → interactive prompts |
| **Project Types** | Web parts, extensions, library components, adaptive card extensions |
| **Frameworks** | React (recommended), Vue, or vanilla JavaScript |
| **Pros** | ✅ Production-ready code with tests; ✅ Includes sample implementations; ✅ Latest SPFx features; ✅ No npm audit vulnerabilities (v1.22+) |
| **Caveats** | ⚠️ Version must match SPFx runtime; ⚠️ Migrating between major versions requires significant refactoring; ⚠️ Gulp-based projects (SPFx <1.22) require full migration to Heft; ⚠️ Custom scaffolding outside generator is complex |
| **Version Sync** | Generator version = SPFx version (both 1.23.x) |

#### Heft (@rushstack/heft)

[↑ Back to Top](#tools-reference)

| Aspect | Details |
|---|---|
| **Version to Use** | 1.3.2+ |
| **What It Is** | Config-driven build orchestrator that manages TypeScript, Webpack, ESLint, Jest, API Extractor |
| **Download** | Via npm: `npm install --global @rushstack/heft` |
| **Docs** | [rushstack.io/pages/heft](https://rushstack.io/pages/heft/overview/) |
| **Check Version** | `heft --version` |
| **Usage** | `heft build`, `heft start`, `heft test`, `heft clean` |
| **Config Files** | `heft.json`, `tsconfig.json`, `.heftrc.json` |
| **Replaces** | Gulp-based builds in SPFx <1.22 |
| **Pros** | ✅ **NEW in SPFx v1.22** (faster, simpler); ✅ Config-based (JSON) instead of code-based; ✅ Consistent across projects; ✅ Built-in optimizations; ✅ Minimal configuration needed |
| **Caveats** | ⚠️ **Breaking change** from Gulp-based approach; ⚠️ Projects using Gulp must migrate completely; ⚠️ Custom Gulp tasks don't transfer; ⚠️ Learning curve if familiar only with Gulp; ⚠️ Some legacy plugins incompatible |
| **Key Commands** | `heft build` (production), `heft start` (dev server), `heft test` (Jest), `heft trust-dev-cert` (certificate) |

#### TypeScript

[↑ Back to Top](#tools-reference)

| Aspect | Details |
|---|---|
| **Version to Use** | 5.8+ (per SPFx version requirements) |
| **What It Is** | Typed superset of JavaScript—adds static type checking and advanced features |
| **Download** | Installed per-project (devDependency in package.json) |
| **Docs** | [typescriptlang.org/docs](https://www.typescriptlang.org/docs/handbook/) |
| **Check Version** | `npx tsc --version` |
| **Usage** | `heft build` compiles TypeScript automatically |
| **Compilation** | TypeScript → JavaScript (types erased at runtime) |
| **Pros** | ✅ Catches type errors at compile time; ✅ Excellent IDE intellisense; ✅ Better maintainability; ✅ Native SPFx support with type definitions |
| **Caveats** | ⚠️ Requires compilation step (vs JavaScript); ⚠️ Version locked to SPFx requirements; ⚠️ Learning curve for JS developers; ⚠️ Source maps needed for debugging |
| **SPFx Integration** | Fully integrated; no additional configuration needed |

#### Webpack

[↑ Back to Top](#tools-reference)

| Aspect | Details |
|---|---|
| **Version to Use** | 5.x (auto-configured by Heft) |
| **What It Is** | Module bundler—packages JavaScript, CSS, assets for distribution |
| **Download** | Handled by Heft (no manual install) |
| **Docs** | [webpack.js.org](https://webpack.js.org/) |
| **Usage** | Configured automatically; rarely needs manual tweaking |
| **Config** | `.heft/config/webpack.config.js` (optional) |
| **Pros** | ✅ Industry standard; ✅ Code splitting and lazy loading; ✅ Asset pipeline; ✅ Production optimizations |
| **Caveats** | ⚠️ Configuration can be complex; ⚠️ SPFx handles most automatically; ⚠️ Custom modifications require expertise |
| **Typical Use** | SPFx projects rarely need to customize Webpack |

---

## Version Compatibility Matrix

[↑ Back to Top](#top)

### SPFx & Tool Versions That Work Together

**CRITICAL**: Only use combinations in the table below. Mismatched versions cause unpredictable failures.

| SPFx | Node.js | npm | Heft | TypeScript | Status | Support Until |
|---|---|---|---|---|---|---|
| **1.23.x** | 22.x (Jod) | 11.x | 1.3.x | 5.8+ | ✅ Current | Oct 2027 |
| **1.22.x** | 22.x (Jod) | 11.x | 1.3.x | 5.8+ | ✅ Current | Oct 2027 |
| 1.21.1 | 20.x (Iron) | 10.x | N/A (Gulp) | 4.9.5 | ⚠️ Legacy | Apr 2026 |
| 1.20.2 | 18.x (Hydrogen) | 9.x | N/A (Gulp) | 4.7.x | ⛔ EOL | Apr 2025 |
| 1.19.0 | 16.x (Gallium) | 8.x | N/A (Gulp) | 4.7.x | ⛔ EOL | Aug 2023 |

### Node.js LTS Release Timeline & Support Windows

| Node Version | Name | Release | EOL Date | Use With SPFx |
|---|---|---|---|---|
| **22.x** | Jod | Apr 24, 2024 | Sep 23, 2026 | ✅ 1.22+, 1.23+ |
| **24.x** | Krypton | May 6, 2025 | Sep 7, 2026 | 🔄 Likely 1.24+ (TBD) |
| 20.x | Iron | Apr 17, 2023 | Mar 24, 2026 | ✅ 1.21.1 |
| 18.x | Hydrogen | Apr 18, 2022 | Mar 27, 2025 | ✅ 1.18-1.20.x |
| 16.x | Gallium | Apr 20, 2021 | Aug 8, 2023 | ✅ 1.15-1.19.x |

**Key Points**:
- **Never use odd-numbered versions** (21, 23, 25, etc.)—these are Current releases with 6-month support
- Check [nodejs.org/releases](https://nodejs.org/en/about/previous-releases/) for exact EOL dates
- Verify Node.js compatibility BEFORE upgrading SPFx

### Why Version Dependencies Matter

[↑ Back to Top](#version-compatibility)

#### The Dependency Chain

```
SPFx 1.22 requires
  ↓
Node.js 22.x (Jod)
  ↓
npm 11.x (bundled)
  ↓
Heft 1.3+ (for build)
  ↓
TypeScript 5.8+ (compiler)
  ↓
Webpack 5.x (bundler)
```

Each tool has APIs that depend on the previous layer. Mixing versions breaks this chain.

#### Real-World Problem Example

```
❌ WRONG COMBINATION:
   SPFx 1.22 + Node.js 20.x (Iron)
   → npm 10.x installed
   → Heft tries to use Node 20 APIs
   → TypeScript compiler fails silently
   → Build error: "ENOENT: no such file or directory"

✅ CORRECT COMBINATION:
   SPFx 1.22 + Node.js 22.x (Jod)
   → npm 11.x installed
   → All APIs align
   → Build succeeds
```

---

## Visual Studio Code Development Stack

[↑ Back to Top](#top)

### Recommended VS Code Extensions for SPFx Development

[↑ Back to Top](#vscode-stack)

| Extension | Purpose | Download | Notes |
|---|---|---|---|
| **SharePoint Framework Toolkit** | SPFx debugging, local testing, web part preview | [m365pnp.viva-connections-toolkit](https://marketplace.visualstudio.com/items?itemName=m365pnp.viva-connections-toolkit) | ⭐ Essential for SPFx |
| **REST Client** | Test APIs directly in VS Code | [humao.rest-client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) | Use `.rest` files |
| **Debugger for Chrome** | Debug in browser | [msjsdiag.debugger-for-chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome) | Browser debugging |
| **ESLint** | Code quality linting | [dbaeumer.vscode-eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) | Catches errors early |
| **Prettier** | Code formatter | [esbenp.prettier-vscode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) | Auto-format on save |
| **TypeScript Vue Plugin** | Vue component support | [Vue.volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) | If using Vue |
| **Thunder Client** | API testing (Postman alternative) | [rangav.vscode-thunder-client](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client) | Lightweight API client |
| **Better Comments** | Highlight special comments | [aaron-bond.better-comments](https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments) | Documentation clarity |

### VS Code Configuration for SPFx

[↑ Back to Top](#vscode-stack)

**Recommended `.vscode/settings.json`:**

```json
{
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "files.exclude": {
    "node_modules": true,
    "lib": true,
    "dist": true,
    ".heft": true
  }
}
```

**Recommended `.vscode/launch.json`:**

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "attach",
      "name": "Attach to Chrome",
      "port": 9222,
      "pathMapping": {
        "/": "${workspaceRoot}/",
        "/dist/": "${workspaceRoot}/lib/"
      }
    }
  ]
}
```

---

## Installation Checklist

[↑ Back to Top](#top)

- [ ] **Node.js v22 LTS** installed from [nodejs.org](https://nodejs.org)
  - [ ] Verify: `node --version` → `v22.x.x`
  - [ ] Verify: `npm --version` → `11.x.x`

- [ ] **Global tools installed** via npm:
  ```powershell
  npm install --global @rushstack/heft yo @microsoft/generator-sharepoint
  ```
  - [ ] Verify: `heft --version`
  - [ ] Verify: `yo --version`

- [ ] **VS Code installed** from [code.visualstudio.com](https://code.visualstudio.com)
  - [ ] Install SharePoint Framework Toolkit extension
  - [ ] Install REST Client extension
  - [ ] Install ESLint extension

- [ ] **Microsoft 365 Developer Tenant**
  - [ ] Sign up at [developer.microsoft.com/microsoft-365/dev-program](https://developer.microsoft.com/en-us/microsoft-365/dev-program)
  - [ ] Note tenant URL: `https://yourtenant.sharepoint.com`

- [ ] **First Project Created**:
  ```powershell
  mkdir my-first-spfx
  cd my-first-spfx
  yo @microsoft/sharepoint
  heft start
  ```

- [ ] **Certificate Trusted**:
  ```powershell
  heft trust-dev-cert
  ```

---

## Quick Start Commands

[↑ Back to Top](#top)

### Installation & Setup

```powershell
# 1. Verify Node.js & npm
node --version
npm --version

# 2. Install global tools
npm install --global @rushstack/heft yo @microsoft/generator-sharepoint

# 3. Verify tools
heft --version
yo --version
```

### Create & Run Project

```powershell
# 4. Create project directory
mkdir my-spfx-project
cd my-spfx-project

# 5. Generate project
yo @microsoft/sharepoint

# 6. Trust certificate
heft trust-dev-cert

# 7. Start dev server
heft start

# Opens: https://yourtenant.sharepoint.com/_layouts/workbench.aspx
```

### Common Development Commands

```powershell
# Development
heft start              # Local dev server with watch
heft build              # Production build
heft test               # Run Jest tests
heft clean              # Remove build artifacts
heft bundle             # Bundle with Webpack

# Troubleshooting
npm install             # Install dependencies
npm cache clean --force # Clear npm cache
npm audit               # Check security vulnerabilities
npm audit fix           # Attempt to fix issues
```

---

## Common Issues & Solutions

[↑ Back to Top](#top)

### Issue: "Cannot find module" or Build Fails

[↑ Back to Top](#common-issues)

**Cause**: Missing or corrupted dependencies

**Solution**:
```powershell
# Clean and reinstall
Remove-Item node_modules -Recurse -Force
Remove-Item package-lock.json
npm install
heft build
```

### Issue: ENOENT or TypeScript Compilation Failed

[↑ Back to Top](#common-issues)

**Cause**: Node.js/npm version mismatch with SPFx

**Solution**:
```powershell
# Check versions
node --version   # Must be v22.x
npm --version    # Must be 11.x

# If wrong versions:
# Uninstall Node.js and reinstall correct version from nodejs.org
```

### Issue: Certificate Trust Error on `heft start`

[↑ Back to Top](#common-issues)

**Cause**: Development certificate not trusted

**Solution**:
```powershell
heft trust-dev-cert
heft start
```

### Issue: npm audit Shows Vulnerabilities

[↑ Back to Top](#common-issues)

**Cause**: Outdated packages (mostly resolved in SPFx v1.22+)

**Solution**:
```powershell
# View details
npm audit

# Fix automatically
npm audit fix

# Or accept as-is (SPFx 1.22+ has minimal vulnerabilities)
```

### Issue: Generator or Tool Not Found

[↑ Back to Top](#common-issues)

**Cause**: Global tools not installed correctly

**Solution**:
```powershell
# Reinstall globally
npm install --global @microsoft/generator-sharepoint@latest
npm install --global @rushstack/heft@latest
npm install --global yo@latest

# Verify
yo --version
heft --version
```

---

## Technical Cheat Sheet

[↑ Back to Top](#top)

### Quick Install (Copy & Paste)

```powershell
# Install Node.js v22 LTS from nodejs.org, then:
npm install --global @rushstack/heft yo @microsoft/generator-sharepoint
```

### One-Liner Project Creation

```powershell
mkdir my-spfx-demo && cd my-spfx-demo && yo @microsoft/sharepoint && heft trust-dev-cert && heft start
```

### Essential Commands

| Command | Purpose |
|---|---|
| `node --version` | Check Node.js (must be v22.x) |
| `npm --version` | Check npm (must be 11.x) |
| `yo @microsoft/sharepoint` | Create new SPFx project |
| `heft start` | Dev server (watch + reload) |
| `heft build` | Production build |
| `heft test` | Run unit tests |
| `heft clean` | Remove build artifacts |
| `heft trust-dev-cert` | Trust HTTPS certificate |
| `npm install` | Install dependencies |
| `npm audit fix` | Fix vulnerabilities |

### Version Check Script

```powershell
Write-Host "Node.js:" $(node --version)
Write-Host "npm:" $(npm --version)
Write-Host "Heft:" $(heft --version)
Write-Host "Yeoman:" $(yo --version)
```

### Rebuild All Dependencies

```powershell
rm -r node_modules
rm package-lock.json
npm install
heft build
```

---

## Glossary of Terms

[↑ Back to Top](#top)

| Term | Definition |
|---|---|
| **SPFx** | SharePoint Framework—Microsoft's modern client-side development platform |
| **Node.js** | JavaScript runtime environment; foundation for all build tools |
| **npm** | Node Package Manager—installs and manages JavaScript packages |
| **Heft** | Config-driven build orchestrator (replaces Gulp in SPFx v1.22+) |
| **Yeoman** | Project scaffolding tool that generates boilerplate code |
| **TypeScript** | Typed superset of JavaScript; compiles to plain JavaScript |
| **Webpack** | Module bundler for JavaScript applications and assets |
| **LTS** | Long-Term Support—stable version with extended support (18, 20, 22, 24) |
| **Current Release** | Non-LTS versions with 6-month support (21, 23, 25)—**never use for SPFx** |
| **EOL** | End of Life—version no longer supported; updates stop |
| **Workbench** | Local SharePoint testing environment for web parts |
| **Web Part** | Reusable, self-contained SharePoint client-side component |
| **Extension** | SPFx customization (command sets, field customizers, app customizers) |
| **Manifest** | JSON file defining component properties and capabilities |
| **Bundle** | Combined, minified JavaScript files ready for distribution |
| **Transpile** | Convert TypeScript to JavaScript during build |
| **Compile** | Convert source code to executable form |
| **Watch Mode** | Automatically rebuild when source files change |
| **Self-Signed Certificate** | Development HTTPS certificate for local testing |
| **Dependency** | External package or tool your project requires |
| **Dev Dependency** | Tool used during development, not included in production |
| **Package.json** | File listing project dependencies and scripts |
| **Global Install** | Install tool available system-wide (`npm install --global`) |
| **Local Install** | Install tool in project folder (default) |
| **Registry** | Repository of npm packages (npmjs.org or internal mirrors) |
| **Version Mismatch** | Using incompatible tool versions; causes build failures |

---

## Helpful URLs & Resources

[↑ Back to Top](#top)

### Official Microsoft Documentation

- **SharePoint Framework Home**: https://learn.microsoft.com/en-us/sharepoint/dev/spfx/
- **SPFx Setup & Configuration**: https://learn.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-development-environment
- **SPFx Web Parts Overview**: https://learn.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/overview-client-side-web-parts
- **Heft Toolchain**: https://rushstack.io/pages/heft/overview/
- **Yeoman**: https://yeoman.io/
- **Node.js**: https://nodejs.org/
- **TypeScript Handbook**: https://www.typescriptlang.org/docs/handbook/
- **npm Registry**: https://www.npmjs.com/

### Learning Paths & Training

- **Microsoft Learn - SPFx Development**: https://learn.microsoft.com/en-us/training/paths/develop-sharepoint-framework/
- **Build Web Parts with React**: https://learn.microsoft.com/en-us/training/modules/sharepoint-spfx-react-web-parts/
- **Create SharePoint Extensions**: https://learn.microsoft.com/en-us/training/modules/sharepoint-spfx-extensions/

### Samples & Code Examples

- **PnP SPFx Samples**: https://github.com/pnp/sp-dev-fx-webparts
- **Microsoft SPFx Samples**: https://github.com/sharepoint/sp-dev-fx-webparts
- **PnP Patterns & Practices**: https://pnp.github.io/
- **PnP JS Library**: https://pnp.github.io/pnpjs/

### Community & Support

- **SharePoint Tech Community**: https://techcommunity.microsoft.com/t5/sharepoint-developer/ct-p/SharePointDeveloper
- **GitHub Issues**: https://github.com/sharepoint/sp-dev-docs/issues
- **GitHub Discussions**: https://github.com/sharepoint/sp-dev-docs/discussions
- **Stack Overflow (SPFx)**: https://stackoverflow.com/questions/tagged/sharepoint-framework
- **Stack Overflow (SharePoint)**: https://stackoverflow.com/questions/tagged/sharepoint
- **YouTube - Microsoft 365 Developer**: https://www.youtube.com/c/Microsoft365Developer

### Downloads & Tools

- **Node.js (LTS)**: https://nodejs.org/en/download/
- **Visual Studio Code**: https://code.visualstudio.com/
- **Visual Studio 2022**: https://visualstudio.microsoft.com/vs/
- **Git**: https://git-scm.com/
- **Postman API Client**: https://www.postman.com/
- **Fiddler HTTP Proxy**: https://www.telerik.com/fiddler

### VS Code Extensions

- **SharePoint Framework Toolkit**: https://marketplace.visualstudio.com/items?itemName=m365pnp.viva-connections-toolkit
- **REST Client**: https://marketplace.visualstudio.com/items?itemName=humao.rest-client
- **ESLint**: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
- **Prettier**: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
- **Debugger for Chrome**: https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome

### M365 Developer Resources

- **Microsoft 365 Developer Program**: https://developer.microsoft.com/en-us/microsoft-365/dev-program
- **Microsoft Graph API**: https://learn.microsoft.com/en-us/graph/
- **Microsoft 365 CLI**: https://pnp.github.io/cli-microsoft365/
- **Power Apps Developer**: https://learn.microsoft.com/en-us/power-apps/developer/

### Troubleshooting & Help

- **Node.js Releases**: https://nodejs.org/en/about/previous-releases/
- **npm Docs**: https://docs.npmjs.com/
- **Microsoft Q&A**: https://learn.microsoft.com/en-us/answers/topics/m365-development.html

---

**Last Updated**: October 1, 2026  
**SPFx Version**: 1.23.x (Current)  
**Node.js LTS**: 22.x (Jod)  
**Document Location**: c:\Davis\vibe\SPFx\Help\SPFx.Startv2.Explain.md
