# SharePoint Framework (SPFx) - Getting Started Guide {#top}

## Table of Contents

### Main Sections
1. [Executive Summary](#executive-summary)
2. [Getting Started Steps](#getting-started-steps)
3. [Development Tools Reference](#development-tools-reference)
4. [Version Compatibility Matrix](#version-compatibility-matrix)
5. [Installation Checklist](#installation-checklist)
6. [Optional Tools](#optional-tools)
7. [Common Issues & Resolution](#common-issues--resolution)
8. [Resources & Learning](#resources--learning)
9. [Technical Cheat Sheet](#technical-cheat-sheet)
10. [Glossary of Terms](#glossary-of-terms)
11. [Helpful URLs & Resources](#helpful-urls--resources)

---

## Executive Summary

[↑ Back to Top](#top)

The **SharePoint Framework (SPFx)** is a modern development platform for building client-side solutions for Microsoft SharePoint Online and on-premises environments.

**Quick Facts:**
- **Current Version**: SPFx v1.23.x (October 2025)
- **Foundation**: Node.js v22.x LTS + npm 11.x
- **Build Tool**: Heft (v1.3+) — replaces older Gulp-based approach
- **Language**: TypeScript (v5.8+) with full type safety
- **Setup Time**: 15-30 minutes for first project
- **Learning Curve**: 2-4 hours to understand basics; 2-4 weeks for proficiency

**Key Steps**: (1) Install Node.js v22 LTS, (2) Install global tools (Heft, Yeoman, SPFx generator), (3) Run `yo @microsoft/sharepoint`, (4) Run `heft start`

**Critical Requirement**: Version matching is essential. Use only Node.js LTS versions (even numbers only: 18, 20, 22, 24). Odd versions cause build failures.

---

## Getting Started Steps

[↑ Back to Top](#top)

### 1. **Understand Your Development Environment**

[↑ Back to Top](#getting-started-steps)
   - Install a modern web browser (Edge, Chrome, or Firefox)
   - Set up a code editor (Visual Studio Code is recommended)

### 2. **Install Node.js (Foundation)**

[↑ Back to Top](#getting-started-steps)
   - **Important**: Install **LTS (Long-Term Support)** versions only
   - Current SPFx v1.22+ requires Node.js v22 LTS ("Jod")
   - Verify installation: `node --version`

### 3. **Install npm (Package Manager)**

[↑ Back to Top](#getting-started-steps)
   - Verify installation: `npm --version`

### 4. **Install Global Development Tools**

[↑ Back to Top](#getting-started-steps)
     ```powershell
     npm install @rushstack/heft yo @microsoft/generator-sharepoint --global
     ```

### 5. **Create Your First Project**

[↑ Back to Top](#getting-started-steps)
     ```powershell
     yo @microsoft/sharepoint
     ```
   - Follow the interactive prompts to scaffold your project

### 6. **Configure Tenant Domain (Optional but Recommended)**

[↑ Back to Top](#getting-started-steps)
   - Format: `yourtenant.sharepoint.com`
   - Used for local testing with the workbench

### 7. **Trust Development Certificate**

[↑ Back to Top](#getting-started-steps)
     ```powershell
     heft trust-dev-cert
     ```
   - Required because SPFx uses HTTPS with a self-signed certificate

### 8. **Start Development**

[↑ Back to Top](#getting-started-steps)
   - Run: `heft start`
   - Opens local workbench at `https://yourtenant.sharepoint.com/_layouts/workbench.aspx`

---

## Development Tools Reference

[↑ Back to Top](#top)

### Core Tools Table

[↑ Back to Top](#development-tools-reference)

| Tool | Latest Version | Release Date | Download & Help | Purpose |
|------|---|---|---|---|
| **Node.js (LTS)** | 22.x (Jod) | Apr 24, 2024 | [nodejs.org](https://nodejs.org) | JavaScript runtime environment. Required for SPFx development. Only use LTS versions. |
| **npm** | 11.x | Bundled with Node.js | [npmjs.com](https://www.npmjs.com) | Node package manager. Installs and manages dependencies. Automatically included with Node.js. |
| **Yeoman** | 7.0.1 | Apr 2024 | [yeoman.io](https://yeoman.io) | Project scaffolding tool. Creates boilerplate SPFx projects with best practices and structure. |
| **@microsoft/generator-sharepoint** | 1.23.2 | Oct 2025 | [npmjs.com/@microsoft/generator-sharepoint](https://www.npmjs.com/package/@microsoft/generator-sharepoint) | SPFx-specific Yeoman generator. Creates SharePoint web parts, extensions, and custom applications. |
| **Heft (@rushstack/heft)** | 1.3.2 | Sep 2025 | [rushstack.io/heft](https://rushstack.io/pages/heft/overview/) | Config-driven build toolchain (replaces gulp in v1.22+). Orchestrates TypeScript, Webpack, ESLint, Jest, and API Extractor. |
| **TypeScript** | 5.8+ | Varies by SPFx version | [typescriptlang.org](https://www.typescriptlang.org) | Strongly-typed JavaScript. Improves code quality and catches errors at compile time. Installed per-project. |
| **Webpack** | 5.x | Bundled with Heft | [webpack.js.org](https://webpack.js.org) | Module bundler. Packages your code and dependencies for distribution. Configured automatically by Heft. |
| **Visual Studio Code** | 1.95+ | Rolling releases | [code.visualstudio.com](https://code.visualstudio.com) | Recommended code editor. Lightweight, extensible, excellent TypeScript support. |

---

### Tool Details: Usage, Samples & Considerations

[↑ Back to Top](#development-tools-reference)

#### **Node.js**

[↑ Back to Top](#tool-details)
- **Sample Command**: 
  ```powershell
  node --version    # Check version
  node script.js    # Run a script
  ```
- **Pros**:
  - Mature, stable ecosystem
  - Excellent package management (npm)
  - Cross-platform support
  - Fast execution
- **Caveats**:
  - **CRITICAL**: Only LTS versions work with SPFx (even versions: 18, 20, 22, 24, etc.)
  - Odd-numbered versions (21, 23, 25) are Current releases and become unsupported after 6 months
  - Version mismatches cause cryptic build errors
  - EOL versions cannot be used for production SPFx development

#### **npm (Node Package Manager)**

[↑ Back to Top](#tool-details)
- **Sample Commands**:
  ```powershell
  npm install                    # Install dependencies from package.json
  npm install package-name       # Add a package
  npm update                     # Update to latest compatible versions
  npm audit                      # Check for security vulnerabilities
  npm run build                  # Run scripts defined in package.json
  ```
- **Pros**:
  - Included with Node.js (no separate install needed)
  - Largest package ecosystem
  - Strong security audit capabilities
  - Local vs. global package management
- **Caveats**:
  - Dependency conflicts can cause version resolution issues
  - Breaking changes in major versions may require project updates
  - npm audit warnings don't always require immediate action
  - SPFx v1.22+ deliberately addresses npm audit vulnerabilities

#### **Yeoman**

[↑ Back to Top](#tool-details)
- **Sample Commands**:
  ```powershell
  yo --generators              # List all available generators
  yo @microsoft/sharepoint     # Launch SPFx generator
  yo doctor                    # Troubleshoot environment issues
  ```
- **Pros**:
  - Creates well-structured boilerplate code
  - Follows industry best practices
  - Interactive prompts guide configuration
  - Extensible through custom generators
- **Caveats**:
  - Must run from the directory where you want the project
  - Accepts defaults cautiously—customize for your needs
  - Generator versions must be compatible with SPFx version
  - Cannot be uninstalled easily without affecting other generators

#### **@microsoft/generator-sharepoint (SPFx Yeoman Generator)**

[↑ Back to Top](#tool-details)
- **Sample Commands**:
  ```powershell
  yo @microsoft/sharepoint     # Interactive project creation
  # Or shorter form:
  yo @microsoft/sharepoint --name "MyWebPart" --framework react
  ```
- **Sample Project Output**:
  - Configurable web parts (React, Vue, or basic HTML)
  - SharePoint extensions (command sets, field customizers)
  - Application customizers
  - Library components
  - Search results web parts
  - Adaptive card extensions
- **Pros**:
  - Generates tested, production-ready structure
  - Includes sample code and documentation
  - Supports multiple frameworks (React, Vue, no framework)
  - Covers latest SPFx features
  - No npm audit vulnerabilities (as of v1.22+)
- **Caveats**:
  - Generator version must match or be compatible with SPFx runtime
  - Migrating between major versions requires significant changes
  - Project structure differs between SPFx versions (v1.22 uses Heft; earlier versions use Gulp)
  - Custom scaffolding outside generator defaults is complex

#### **Heft (Heft - Rush Stack)**

[↑ Back to Top](#tool-details)
- **Sample Commands**:
  ```powershell
  heft build          # Full production build
  heft start          # Start dev server with watch mode
  heft test           # Run Jest tests
  heft bundle         # Bundle with Webpack
  heft trust-dev-cert # Trust self-signed development certificate
  heft clean          # Remove build artifacts
  ```
- **Configuration Files**:
  - `heft.json` — Main Heft configuration
  - `tsconfig.json` — TypeScript configuration
  - `.heftrc.json` — Heft-specific settings
  - `jest.config.js` — Test configuration
  - `webpack.config.js` — Bundle configuration (optional, for custom builds)
- **Pros**:
  - Replaces older Gulp-based toolchain (simpler, faster)
  - Config-based (JSON) instead of code-based (JavaScript)
  - Consistent across all SPFx projects
  - Performance optimizations built-in
  - Integrated TypeScript, ESLint, Webpack, Jest, API Extractor
  - Minimal configuration needed—sensible defaults
- **Caveats**:
  - NEW in SPFx v1.22.0 (December 2025)
  - Projects using Gulp (SPFx v1.0-v1.21.1) must migrate completely
  - Migration from Gulp to Heft is non-trivial—use CLI for Microsoft 365 tool
  - Custom Gulp tasks don't transfer directly
  - Learning curve if you're familiar only with Gulp
  - Some legacy plugins/configurations from Gulp aren't compatible

#### **TypeScript**

[↑ Back to Top](#tool-details)
- **Sample Commands**:
  ```powershell
  heft build        # Compiles TypeScript (runs via Heft)
  tsc --version     # Check TypeScript version
  ```
- **Pros**:
  - Catches type errors at compile time
  - Excellent IDE support and intellisense
  - Better code maintainability
  - Native SPFx support with generated type definitions
- **Caveats**:
  - Requires compilation step (heft build)
  - Version locked to SPFx version requirements
  - Learning curve for JavaScript developers

#### **Webpack**

[↑ Back to Top](#tool-details)
- **Sample Configuration**: `.heft/config/webpack.config.js`
- **Pros**:
  - Industry-standard module bundler
  - Handles code splitting and lazy loading
  - Asset pipeline (images, fonts, styles)
  - Optimizations for production
- **Caveats**:
  - Configuration can be complex
  - SPFx handles most Webpack config automatically
  - Custom modifications require deep understanding

#### **Visual Studio Code**

[↑ Back to Top](#tool-details)
- **Recommended Extensions**:
  - SharePoint Framework Toolkit (m365pnp.viva-connections-toolkit)
  - Microsoft 365 Agents Toolkit
  - REST Client
  - Debugger for Chrome/Edge
  - ESLint
  - Prettier
- **Pros**:
  - Lightweight and fast
  - Excellent TypeScript integration
  - Integrated terminal and debugging
  - Large extension marketplace
  - Free and open-source
- **Caveats**:
  - Needs configuration for optimal experience
  - Extension conflicts can slow editor
  - Requires some learning for advanced features

---

## Version Compatibility Matrix

[↑ Back to Top](#top)

### Supported SPFx & Node.js Combinations

[↑ Back to Top](#version-compatibility-matrix)

**IMPORTANT**: Use only the combinations listed below. Mismatched versions cause unpredictable build failures.

| SPFx Version | Node.js Version | npm Version | Heft Version | TypeScript | Status | Support Until |
|---|---|---|---|---|---|---|
| **1.23.x** | 22.x (LTS Jod) | 11.x | 1.3.x | 5.8+ | ✅ Current | Oct 2027 |
| **1.22.x** | 22.x (LTS Jod) | 11.x | 1.3.x | 5.8+ | ✅ Current | Oct 2027 |
| 1.21.1 | 20.x (LTS Iron) | 10.x | N/A (Gulp) | 4.9.5 | ⚠️ Legacy Gulp | Apr 2026 |
| 1.20.2 | 18.x (LTS Hydrogen) | 9.x | N/A (Gulp) | 4.7.x | ⛔ EOL | Apr 2025 |
| 1.19.0 | 16.x (LTS Gallium) | 8.x | N/A (Gulp) | 4.7.x | ⛔ EOL | Aug 2023 |
| 1.18.2 | 16.x or 18.x | 8.x or 9.x | N/A (Gulp) | 4.7.x | ⛔ EOL | Apr 2023 |

---

### Node.js LTS Release Timeline

[↑ Back to Top](#version-compatibility-matrix)

| Node Version | Name | Released | EOL/End Support | Use With SPFx |
|---|---|---|---|---|
| **22.x** | Jod | Apr 24, 2024 | Sep 23, 2026 | ✅ 1.22+, 1.23+ |
| **24.x** | Krypton | May 6, 2025 | Sep 7, 2026 | 🔄 Likely 1.24+ (TBD) |
| 20.x | Iron | Apr 17, 2023 | Mar 24, 2026 | ✅ 1.21.1 |
| 18.x | Hydrogen | Apr 18, 2022 | Mar 27, 2025 | ✅ 1.18-1.20.x |
| 16.x | Gallium | Apr 20, 2021 | Aug 8, 2023 | ✅ 1.15-1.19.x |
| 14.x | Fermium | Apr 21, 2020 | Feb 16, 2023 | ✅ 1.0-1.13.x |

**Key Points**:
- Only use **even-numbered major versions** (18, 20, 22, 24, etc.)
- **Never** use odd-numbered versions (21, 23, 25, etc.)—these are Current, not LTS
- Check [nodejs.org releases](https://nodejs.org/en/about/previous-releases/) for exact dates
- Before upgrading Node.js, verify SPFx version compatibility first

---

### Dependency Explanation: Why Versions Matter

[↑ Back to Top](#version-compatibility-matrix)

#### **Node.js → npm Binding**

[↑ Back to Top](#why-versions-matter)
```
Node.js v22.x includes npm 11.x
Node.js v20.x includes npm 10.x
Node.js v18.x includes npm 9.x
```
- npm version is **locked to Node.js version**
- You cannot upgrade npm independently
- Installing newer Node.js automatically gets newer npm

#### **SPFx → Node.js Dependency**

[↑ Back to Top](#why-versions-matter)
SPFx requires specific Node.js versions due to:
1. **Built-in module compatibility**: Node.js modules used by Heft/TypeScript compiler
2. **API differences**: Node.js APIs change between major versions
3. **Security patches**: Later Node.js versions have deprecated unsafe APIs
4. **Performance**: SPFx toolchain optimizations target specific Node.js versions

#### **SPFx → Heft → TypeScript Chain**

[↑ Back to Top](#why-versions-matter)
```
SPFx v1.22+ requires Heft for builds
  ↓
Heft v1.3+ controls TypeScript version
  ↓
TypeScript v5.8+ required for SPFx 1.22+
  ↓
Each tool version requires specific Node.js
```

**Example Problem Scenario**:
```
❌ WRONG: SPFx 1.22 + Node.js 20.x
  → Heft tries to load incompatible APIs
  → TypeScript compiler fails silently
  → Build error: "ENOENT: no such file or directory"

✅ CORRECT: SPFx 1.22 + Node.js 22.x
  → All APIs align
  → Build succeeds
```

---

## Installation Checklist

[↑ Back to Top](#top)

- [ ] Install Node.js v22.x LTS from [nodejs.org](https://nodejs.org)
  - [ ] Verify: `node --version` shows `v22.x.x`
  - [ ] Verify: `npm --version` shows `11.x.x`

- [ ] Install global tools:
  ```powershell
  npm install @rushstack/heft yo @microsoft/generator-sharepoint --global
  ```
  - [ ] Verify: `heft --version`
  - [ ] Verify: `yo --version`

- [ ] Install a code editor
  - [ ] [Visual Studio Code](https://code.visualstudio.com) (recommended)
  - [ ] Install SPFx Toolkit extension (optional but helpful)

- [ ] Create a test tenant or use existing
  - [ ] Microsoft 365 developer tenant (free from [developer.microsoft.com](https://developer.microsoft.com/en-us/microsoft-365/dev-program))

- [ ] Create your first project:
  ```powershell
  mkdir my-spfx-project
  cd my-spfx-project
  yo @microsoft/sharepoint
  ```

- [ ] Run development server:
  ```powershell
  heft start
  ```

---

## Optional Tools

[↑ Back to Top](#top)

| Tool | Purpose | Website |
|------|---------|---------|
| **Fiddler** | HTTP/HTTPS traffic debugging | [telerik.com/fiddler](https://www.telerik.com/fiddler) |
| **Postman** | API testing and exploration | [postman.com](https://www.postman.com/) |
| **Windows Terminal** | Enhanced command line | [github.com/microsoft/terminal](https://github.com/microsoft/terminal) |
| **Git** | Source control | [git-scm.com](https://git-scm.com/) |
| **CLI for Microsoft 365** | M365 automation & project upgrades | [pnp.github.io/cli-microsoft365](https://pnp.github.io/cli-microsoft365) |

---

## Common Issues & Resolution

[↑ Back to Top](#top)

### Issue: "npm audit" shows vulnerabilities

[↑ Back to Top](#common-issues--resolution)

**Solution**: As of SPFx v1.22, this is largely resolved. For older versions:
```powershell
# View details
npm audit

# Fix automatically (with caution)
npm audit fix

# Skip audit for now (not recommended for production)
npm install --no-audit
```

### Issue: "Cannot find module" errors during `heft start`

[↑ Back to Top](#common-issues--resolution)

**Cause**: Missing dependencies
```powershell
# Solution
npm install
```

### Issue: "ENOENT" or "TypeScript compilation failed"

[↑ Back to Top](#common-issues--resolution)

**Cause**: Usually Node.js version mismatch
```powershell
# Check versions
node --version    # Should be v22.x
npm --version     # Should be 11.x

# If wrong versions:
# Uninstall Node.js and reinstall correct version from nodejs.org
```

### Issue: Certificate trust error on `heft start`

[↑ Back to Top](#common-issues--resolution)

**Solution**: Trust the development certificate
```powershell
heft trust-dev-cert

# Then restart your dev server
heft start
```

### Issue: "Generator not found" when running `yo @microsoft/sharepoint`

[↑ Back to Top](#common-issues--resolution)

**Solution**: Reinstall the generator globally
```powershell
npm install @microsoft/generator-sharepoint@latest --global
```

---

## Resources & Learning

[↑ Back to Top](#top)

### Official Documentation

[↑ Back to Top](#resources--learning)
- **SPFx Docs**: [learn.microsoft.com/sharepoint/dev/spfx](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/)
- **Heft Docs**: [rushstack.io/pages/heft](https://rushstack.io/pages/heft/overview/)
- **Yeoman Guide**: [yeoman.io](https://yeoman.io/)
- **Node.js Docs**: [nodejs.org/docs](https://nodejs.org/docs/)

### Microsoft Learning Paths

[↑ Back to Top](#resources--learning)
- Build web parts with SPFx
- Create extensions with SPFx
- Build adaptive card extensions

### Community Resources

[↑ Back to Top](#resources--learning)
- **PnP (Patterns & Practices)** SPFx samples: [pnp.github.io/sp-dev-fx-webparts](https://pnp.github.io/sp-dev-fx-webparts/)
- **GitHub Issues**: [github.com/sharepoint/sp-dev-docs/issues](https://github.com/sharepoint/sp-dev-docs/issues)
- **Community Discussions**: [github.com/sharepoint/sp-dev-docs/discussions](https://github.com/sharepoint/sp-dev-docs/discussions)

---

## Summary

**Key Takeaways**:
1. **Version matching is critical** — Use the compatibility matrix to avoid hours of debugging
2. **Node.js LTS only** — Never use odd-numbered or non-LTS versions
3. **Heft is the modern approach** — SPFx v1.22+ (current) uses Heft; older versions use Gulp
4. **Three global tools** — Heft, Yeoman, and SPFx generator are all you need to start
5. **TypeScript gives you superpowers** — The type safety and IDE support justify the learning curve

---

**Last Updated**: October 1, 2026  
**SPFx Version**: 1.23.x (Current)  
**Node.js Version**: 22.x LTS (Jod)

---

## Technical Cheat Sheet

[? Back to Top](#top)

### Quick Commands

`\powershell
node --version              # Check Node.js version (should be v22.x)
npm --version               # Check npm version (should be 11.x)
npm install --global @rushstack/heft yo @microsoft/generator-sharepoint
yo @microsoft/sharepoint    # Create new SPFx project
heft start                  # Start dev server
heft build                  # Production build
heft test                   # Run tests
heft trust-dev-cert         # Trust dev certificate
`\

---

## Glossary of Terms

[? Back to Top](#top)

| Term | Definition |
|---|---|
| **SPFx** | SharePoint Framework - modern client-side development platform |
| **Node.js** | JavaScript runtime environment for tools and processes |
| **npm** | Node Package Manager - package installation and management |
| **Heft** | Config-driven build toolchain (replaces Gulp in v1.22+) |
| **Yeoman** | Project scaffolding and code generation tool |
| **TypeScript** | Typed superset of JavaScript |
| **Webpack** | Module bundler for JavaScript applications |
| **LTS** | Long-Term Support release version |
| **Workbench** | Local SharePoint testing environment |
| **Web Part** | Reusable SharePoint client-side component |
| **Extension** | SharePoint customization (commands, field customizers) |
| **Manifest** | JSON/XML metadata file for components |
| **Bundle** | Compiled and minified output for distribution |
| **Watch Mode** | Continuous compilation as files change |

---

## Helpful URLs & Resources

[? Back to Top](#top)

- **SPFx Docs**: https://learn.microsoft.com/en-us/sharepoint/dev/spfx/
- **Setup Guide**: https://learn.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-development-environment
- **Heft**: https://rushstack.io/pages/heft/overview/
- **Node.js**: https://nodejs.org/
- **TypeScript**: https://www.typescriptlang.org/
- **Microsoft Learn - SPFx**: https://learn.microsoft.com/en-us/training/paths/develop-sharepoint-framework/
- **PnP Samples**: https://github.com/pnp/sp-dev-fx-webparts
- **Tech Community**: https://techcommunity.microsoft.com/t5/sharepoint-developer/
- **Stack Overflow**: https://stackoverflow.com/questions/tagged/sharepoint-framework
- **VS Code**: https://code.visualstudio.com/
- **Git**: https://git-scm.com/
- **Postman**: https://www.postman.com/

---

**Last Updated**: October 1, 2026  
**SPFx Version**: 1.23.x (Current)  
**Node.js Version**: 22.x LTS (Jod)  
**Document Location**: c:\Davis\vibe\SPFx\Help\SPFx.Start.Explain.md
