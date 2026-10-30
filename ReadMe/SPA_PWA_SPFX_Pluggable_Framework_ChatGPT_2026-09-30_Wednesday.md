<a id="top"></a>
# SPA, PWA, SPFx & Pluggable Frameworks — ChatGPT Transcript
[Top](#top)

**Date:** Wednesday, September 30, 2026

**Original ChatGPT link:** Not available in the exported conversation context.

**Summary caption:** Detailed discussion of SPA/PWA architecture, browser-native modular frameworks, SPFx adapters, Teams/Outlook/OneDrive integration, and the SPFx/Node/npm/Heft toolchain.

## Table of Contents
[Top](#top)

- [Executive Summary](#executive-summary)
- [Verbatim Chat Transcript](#verbatim-chat-transcript)
  - [Exchange 1 — SPA fundamentals and Microsoft 365 hosts](#exchange-1--spa-fundamentals-and-microsoft-365-hosts)
  - [Exchange 2 — PWA vs SPA and a no-build plugin framework](#exchange-2--pwa-vs-spa-and-a-no-build-plugin-framework)
  - [Exchange 3 — Existing frameworks, SPFx toolchain, Teams and OneDrive](#exchange-3--existing-frameworks-spfx-toolchain-teams-and-onedrive)
- [Relevant URLs](#relevant-urls)
- [Glossary](#glossary)

## Executive Summary
[Top](#top)

### SPA vs. PWA and the no-build approach
[Top](#top)

- SPA describes the application interaction/navigation model; PWA adds installability, service workers, caching, and offline-oriented capabilities.
- A sophisticated browser application can be built from HTML, CSS, JavaScript ES modules, Web Components, IndexedDB, Cache API, and BroadcastChannel without requiring Node.js or npm on the end-user workstation.
- For a locked-down environment, a practical model is to centralize TypeScript compilation and package tooling in an approved build environment while exposing a plain-JavaScript plugin API to application developers.

### Pluggable architecture
[Top](#top)

- A thin host shell can load plugin manifests and modules dynamically.
- A stable host-context adapter can isolate SharePoint/SPFx, Teams, Outlook, or Power Apps details from reusable application code.
- Reusable UI can be built from Web Components, Lit, Fluent UI Web Components, or a larger microfrontend framework such as single-spa.

### SPFx and Microsoft 365 hosts
[Top](#top)

- SPFx can host reusable web parts and extensions in SharePoint and can surface web parts in Teams.
- SPFx Library Components provide a tenant-deployed shared-code mechanism, while dynamic loading and thin host adapters can keep application logic largely independent of SPFx.
- OneDrive for Business is SharePoint-backed, but its UI is not a general-purpose modern SharePoint page. Integration is better thought of through personal sites, document-library extensions, file pickers, and shared APIs.

### Toolchain and compatibility
[Top](#top)

- Current stable SPFx discussed in the transcript is 1.23.2, with Node 22 and the Heft-based toolchain used for new SPFx projects beginning in the 1.22 generation.
- Yeoman and Gulp are legacy/scaffolding/build-era tools in the SPFx story; newer SPFx work has been moving toward an SPFx CLI and Heft.
- Node, npm, TypeScript, Heft, Webpack, and related build tools are development/build-time dependencies rather than runtime dependencies for deployed users.

## Verbatim Chat Transcript
[Top](#top)

### Exchange 1 — SPA fundamentals and Microsoft 365 hosts
[Top](#top)

#### User Prompt
[Top](#top)

<div style="background-color:#800000;color:#FFFFFF;border:2px solid #5B0000;padding:12px;border-radius:4px;"><strong>Verbatim prompt</strong><br><br>tell me about single page html apps (SPAs). how large can they be? how much data can they hold. what can be persisted? how could I share data between multiple instances of the same SPA? how would I organize reusable graphics. what kind of component framework can there be? are there rich examples of SPAs?<br>How would I invoke an SPA in SharePoint, Outlook, Teams and Power Apps?</div>

#### ChatGPT Response
[Top](#top)

Yes. A **Single Page Application (SPA)** can be anything from a 200 KB standalone HTML utility to an enterprise application with hundreds of screens, reusable components, authentication, databases, APIs, offline caching, and thousands of users.

For the kind of SharePoint administration work you've been describing—site lookup, owners/admins, lock/unlock, deletion requests, workflow monitoring—an SPA is particularly interesting because you can build essentially **one reusable web application** and expose variants of it in **SharePoint and Teams**, while reusing much of the UI/business logic elsewhere.

## 1. What exactly is an SPA?
[Top](#top)

Traditional website:

```text
Browser
   |
   +--> page1.html
   |
   +--> page2.html
   |
   +--> page3.html
```

SPA:

```text
Browser
   |
   +--> index.html
          |
          +-- JavaScript / TypeScript
          +-- CSS
          +-- Components
          +-- Graphics
          +-- Routing
          +-- State management
          |
          +--> /sites
          +--> /sites/123
          +--> /lock
          +--> /delete
          +--> /workflow-status
```

The browser initially loads the application shell. JavaScript then changes what appears on the screen without doing a conventional full-page reload.

React is common, but an SPA doesn't require React. You could build one with plain JavaScript/TypeScript, React, Vue, Angular, Svelte, etc.

Microsoft's current SPFx tooling specifically provides a **React + Fluent UI** starting point and describes it as the recommended starting point for most new SPFx web parts. ([github.com](https://github.com/SharePoint/sp-dev-docs/blob/main/docs/spfx/toolchain/sharepoint-framework-cli.md?utm_source=chatgpt.com))

---

# 2. How large can an SPA be?
[Top](#top)

There isn't really a practical architectural limit comparable to "an HTML file can only be X MB."

A production SPA might contain:

```text
SiteAdmin SPA
│
├── index.html
│
├── app.tsx
│
├── routes/
│   ├── Home.tsx
│   ├── SiteLookup.tsx
│   ├── SiteDetails.tsx
│   ├── LockSite.tsx
│   ├── DeleteSite.tsx
│   └── WorkflowMonitor.tsx
│
├── components/
│   ├── SiteCard.tsx
│   ├── UserPicker.tsx
│   ├── StatusBadge.tsx
│   ├── ConfirmDialog.tsx
│   ├── ErrorPanel.tsx
│   └── DataGrid.tsx
│
├── services/
│   ├── SharePointService.ts
│   ├── GraphService.ts
│   ├── WorkflowService.ts
│   └── StorageService.ts
│
├── models/
│
├── graphics/
│   ├── lock.svg
│   ├── delete.svg
│   └── site.svg
│
└── styles/
```

The **source project** could easily contain hundreds or thousands of files.

The browser doesn't necessarily download everything initially. Modern bundlers can perform **code splitting/lazy loading**:

```text
Initial download

Core application
    700 KB

User clicks "Site Administration"
        |
        +--> download SiteAdmin module
                 180 KB

User clicks "Workflow Monitor"
        |
        +--> download Workflow module
                 220 KB
```

So "SPA" does **not** mean "one enormous HTML file."

---

# 3. How much data can it hold?
[Top](#top)

This requires separating **application memory**, **browser persistence**, and **server-side persistence**.

| Location | Typical use | Shared? | Durable? |
|---|---|---:|---:|
| JavaScript memory | Current screen/state | No | No |
| `sessionStorage` | Current tab session | No | No |
| `localStorage` | Preferences/small cache | No | Usually |
| IndexedDB | Large local structured cache | No | Usually |
| Cache API | Files/API cache | No | Usually |
| SharePoint List | Shared business records | Yes | Yes |
| SharePoint Library | Documents/JSON/assets | Yes | Yes |
| Dataverse | Enterprise relational data | Yes | Yes |
| SQL | Large/complex relational data | Yes | Yes |
| REST/API/backend | Enterprise application data | Yes | Yes |

`localStorage` and `sessionStorage` are intentionally small. MDN currently documents Web Storage as **10 MiB per origin total—5 MiB local + 5 MiB session**. IndexedDB, Cache API and OPFS have much larger, browser-dependent quotas; Chromium browsers such as Edge can theoretically allow an origin a substantial percentage of disk capacity. Browser storage is nevertheless not something I'd use as the authoritative repository for enterprise records. ([developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria?source=post_page-----b01fbb41d14c---------------------------------------&utm_source=chatgpt.com))

Also, browser storage is normally **best effort** and may be evicted under storage pressure unless persistent storage is granted. ([developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria?utm_source=chatgpt.com))

### So an SPA could work with millions of records.
[Top](#top)

But it shouldn't load millions into the browser.

Instead:

```text
                   Millions of records
                         |
                         v
                 SQL / Dataverse /
                 SharePoint / API
                         |
                     query/filter
                         |
                         v
                      50 rows
                         |
                         v
                       SPA
```

For example, SharePoint Online itself supports up to **30 million items in a list**, although its familiar **5,000-item list-view threshold** means the SPA needs properly indexed/filterable queries rather than "download everything." ([learn.microsoft.com](https://learn.microsoft.com/en-us/office365/servicedescriptions/sharepoint-online-service-description/sharepoint-online-limits?utm_source=chatgpt.com))

---

# 4. What can the SPA persist locally?
[Top](#top)

Quite a lot.

Imagine your SharePoint Administration SPA.

### localStorage
[Top](#top)

Good for:

```javascript
{
  "theme": "dark",
  "defaultDepartment": "Operations",
  "pageSize": 50,
  "showDeletedSites": false
}
```

### IndexedDB
[Top](#top)

Much more capable:

```text
SiteCache
├── Sites
├── Owners
├── RecentSearches
├── Requests
└── CachedMetadata
```

It supports structured objects, indexes and transactions.

### Cache API
[Top](#top)

Useful for:

```text
JavaScript
CSS
SVG
icons
reference JSON
API responses
```

This also opens the possibility of **offline-capable/PWA-style applications**.

For your environment, however, I would regard browser persistence primarily as **cache/preferences**, not the system of record.

---

# 5. Sharing data between multiple copies of the SPA
[Top](#top)

This is where the architecture becomes particularly useful.

Suppose Alice opens:

```text
SharePoint
    Site Admin SPA
```

Bob opens:

```text
Teams
    Site Admin SPA
```

Carol opens:

```text
another SharePoint site
    Site Admin SPA
```

All three can use:

```text
                 +------------------+
                 | Shared data/API  |
                 +--------+---------+
                          |
          +---------------+---------------+
          |               |               |
          v               v               v
     SharePoint        Teams          Browser
        SPA              SPA             SPA
```

The shared store could be:

### Option A — SharePoint List
[Top](#top)

Probably your easiest GCC-friendly option for modest administrative applications.

```text
SiteRequests

RequestID
SiteURL
Action
RequestedBy
Status
Submitted
ApprovedBy
Completed
ErrorMessage
```

Every SPA instance reads/writes the same list.

---

### Option B — Dataverse
[Top](#top)

Better when you need:

- relationships
- business rules
- stronger application data model
- Power Apps integration
- solution ALM
- more sophisticated security

But this brings the Power Platform licensing considerations you've been investigating.

---

### Option C — SQL
[Top](#top)

Excellent for substantial datasets.

```text
SPA
 |
 REST API
 |
 SQL Server
```

I generally wouldn't have browser JavaScript directly connect to SQL.

---

### Option D — API layer
[Top](#top)

For a serious administrative SPA, this is the most scalable pattern:

```text
                SPA
                 |
              HTTPS
                 |
        +--------+--------+
        | Application API |
        +--------+--------+
                 |
       +---------+---------+
       |         |         |
       v         v         v
 SharePoint   Graph    Dataverse/SQL
```

The SPA becomes presentation/business UI rather than holding the database itself.

---

# 6. Sharing information between SPA windows
[Top](#top)

There is another interpretation of "multiple instances."

Suppose I have the SPA open in **three Edge tabs**.

There are browser mechanisms such as:

```text
BroadcastChannel
SharedWorker
storage events
IndexedDB
Service Worker
```

For example:

```text
SPA Tab #1 --------+
                   |
SPA Tab #2 ---- BroadcastChannel
                   |
SPA Tab #3 --------+
```

Tab #1 could say:

```text
SITE_UPDATED
SiteId = 12345
Status = Locked
```

and the other tabs immediately refresh.

That's useful, but it is still **same-browser coordination**, not enterprise multi-user synchronization.

For multiple users, use the server/backend.

---

# 7. Reusable graphics
[Top](#top)

I would organize graphics separately from application logic:

```text
src/
   assets/
      icons/
         lock.svg
         unlock.svg
         delete.svg
         owner.svg

      illustrations/
         empty-state.svg
         warning.svg

      images/
         logo.png

      diagrams/
         site-lifecycle.svg
```

But for Microsoft 365 applications, you often won't need to create icons yourself.

Use **Fluent UI**.

That gives you consistent Microsoft-looking:

- buttons
- icons
- dialogs
- menus
- navigation
- command bars
- people pickers
- tables
- cards
- forms
- panels
- progress indicators

---

# 8. Component frameworks
[Top](#top)

This is one of the strongest reasons to use an SPA.

I would seriously consider:

**React + Fluent UI + TypeScript**

for your Microsoft 365 administrative tools.

Architecture:

```text
<App>

   <Header />

   <Navigation />

   <SiteSearch />

   <SiteDetails>

       <OwnerCard />

       <StorageCard />

       <LockStatus />

       <PermissionsGrid />

   </SiteDetails>

   <ActionPanel>

       <LockButton />

       <UnlockButton />

       <DeleteRequestButton />

   </ActionPanel>

   <AuditHistory />

</App>
```

Each piece is reusable.

For example:

```tsx
<SiteStatusBadge status="Locked" />
```

could appear in:

```text
Site search results
Site details
Deletion screen
Workflow screen
Audit screen
```

You fix the component once.

Every place using it changes.

---

# 9. Your own internal component library
[Top](#top)

You can take that much further.

Create something like:

```text
company-ui
│
├── SitePicker
├── PersonPicker
├── ConfirmationDialog
├── AuditPanel
├── ErrorPanel
├── WorkflowStatus
├── RequestHistory
├── AdminAction
├── LoadingPanel
└── PermissionViewer
```

Then different apps import them.

```text
                    company-ui
                         |
          +--------------+-------------+
          |              |             |
          v              v             v
      Site Admin     Workflow App    Audit App
```

This is essentially an **internal application platform**.

---

# 10. SharePoint is particularly well suited to this
[Top](#top)

There are two approaches worth distinguishing.

### Simple externally hosted SPA
[Top](#top)

You could host:

```text
https://apps.company.gov/siteadmin/
```

and surface it appropriately.

But iframe/authentication/CSP/permissions need consideration.

### Better Microsoft 365 approach: SPFx
[Top](#top)

Microsoft positions **SharePoint Framework (SPFx)** as its supported client-side development framework for SharePoint Online. It supports modern web technologies and also extends into Teams/Viva. ([learn.microsoft.com](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/sharepoint-framework-overview?utm_source=chatgpt.com))

Your application becomes:

```text
SPFx
 |
 +-- React
 +-- Fluent UI
 +-- TypeScript
 |
 +-- SharePoint APIs
 +-- Microsoft Graph
 +-- REST APIs
```

And SharePoint even has **Single Part App Pages**, designed to give one SPFx web part/application a full-page, locked-layout experience. ([learn.microsoft.com](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/single-part-app-pages?utm_source=chatgpt.com))

That is remarkably close to what you're describing.

---

# 11. SharePoint → SPA
[Top](#top)

You could have:

```text
SharePoint

Site Administration
------------------------------------------------

 Search: [_________________] [Find]

 Site: https://...
 Owner: Jane Doe
 Storage: 13 GB
 Lock State: Unlock

 [Owners] [Lock] [Delete Request] [Audit]

------------------------------------------------
```

implemented as one SPFx React application.

And it could call SharePoint APIs/Graph rather than sending users through numerous SharePoint administrative screens.

---

# 12. Teams → same application
[Top](#top)

This gets even more interesting.

Microsoft Teams tabs are essentially **webpages hosted inside Teams**, and Microsoft documents tabs as embedded HTML/iframe web experiences. Custom tabs are supported in GCC. ([learn.microsoft.com](https://learn.microsoft.com/microsoftteams/platform/tabs/what-are-tabs?utm_source=chatgpt.com))

SPFx can specifically expose a web part as:

- Teams tab
- Teams personal app
- Teams messaging extension

by configuring its supported hosts. ([learn.microsoft.com](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-expose-webparts-teams?utm_source=chatgpt.com))

So you could potentially have:

```text
                     React application
                            |
                          SPFx
                            |
              +-------------+-------------+
              |                           |
              v                           v
          SharePoint                    Teams
```

rather than maintaining two separate applications.

Microsoft also supports the reverse pattern: Teams tabs can be surfaced as full-page experiences in SharePoint. ([learn.microsoft.com](https://learn.microsoft.com/en-us/microsoftteams/platform/tabs/how-to/tabs-in-sharepoint?utm_source=chatgpt.com))

---

# 13. Outlook → SPA
[Top](#top)

Outlook is different.

You don't simply insert an SPFx web part into Outlook.

Instead you'd normally build an **Outlook Office Add-in**.

An Outlook add-in itself is web technology:

```text
Outlook
   |
   +-- Add-in manifest
   |
   +-- Task Pane
          |
          +-- HTML
          +-- CSS
          +-- JavaScript
          +-- React
```

Microsoft describes Outlook add-ins as web-based solutions whose UI/business logic consists of HTML and JavaScript, working across Outlook web and supported desktop/mobile clients. ([learn.microsoft.com](https://learn.microsoft.com/en-us/office/dev/add-ins/outlook/outlook-add-ins-overview?utm_source=chatgpt.com))

Modern Office add-ins can use either an add-in-only manifest or Microsoft's newer unified Microsoft 365 manifest approach. ([learn.microsoft.com](https://learn.microsoft.com/en-us/office/dev/add-ins/develop/add-in-manifests?utm_source=chatgpt.com))

Therefore you could reuse a large amount of your SPA:

```text
                   shared React code
                         |
          +--------------+-------------+
          |              |             |
       SPFx host      Teams host    Outlook host
          |              |             |
      SharePoint        Teams        Task Pane
```

Not necessarily one deployment package—but potentially **the same components, services, models and graphics**.

---

# 14. Power Apps → SPA
[Top](#top)

This requires another distinction.

I would **not** try to stuff an arbitrary SPA into a Canvas App as if Power Apps were merely an iframe host.

Power Apps' proper pro-code extension technology is the **Power Apps Component Framework (PCF)**.

PCF components can be packaged into Power Platform solutions and used in both model-driven and canvas apps. ([learn.microsoft.com](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/custom-controls-overview?utm_source=chatgpt.com))

Conceptually:

```text
React components
       |
       +----------------------+
       |                      |
       v                      v
    SPFx wrapper           PCF wrapper
       |                      |
 SharePoint/Teams         Power Apps
```

This lets you share considerable React/TypeScript logic.

There are restrictions, however. For example, Microsoft explicitly says PCF components should not rely on `window.localStorage` or `window.sessionStorage` for persistent data, and canvas-PCF has API/authentication limitations. ([learn.microsoft.com](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/limitations?utm_source=chatgpt.com))

Power Apps also has its own reusable **component libraries** for low-code Canvas components. ([learn.microsoft.com](https://learn.microsoft.com/power-apps/maker/canvas-apps/create-component?utm_source=chatgpt.com))

---

# 15. A potentially very useful architecture for your environment
[Top](#top)

Instead of building:

```text
Power App #1
Power App #2
SharePoint Web Part #1
SharePoint Web Part #2
Teams App #1
HTML Utility #1
HTML Utility #2
```

consider:

```text
                 ADMIN APPLICATION PLATFORM

                       TypeScript
                           |
                        React
                           |
                      Fluent UI
                           |
             +-------------+-------------+
             |             |             |
         Components     Services       Models
             |             |             |
             +-------------+-------------+
                           |
            +--------------+---------------+
            |              |               |
            v              v               v
          SPFx            PCF          Office Add-in
            |              |               |
       +----+----+         |               |
       |         |         |               |
 SharePoint    Teams   Power Apps       Outlook
```

Behind all of those:

```text
                       Shared APIs
                           |
       +-------------------+-------------------+
       |                   |                   |
 SharePoint Lists        Graph             Dataverse
       |                                       |
       +---------------- SQL/API --------------+
```

That is considerably more maintainable than implementing the same administrative workflow four times.

---

# 16. And yes—there are *lots* of rich SPA examples
[Top](#top)

For your purposes, one of the most valuable repositories is the **PnP SPFx web parts repository**.

It contains extensive real-world SharePoint Framework examples, including React-based applications using SharePoint data, Graph, PnPjs, Fluent UI and reusable controls. For example, the Birthdays sample demonstrates React + Graph + SharePoint Lists + PnPjs and was updated through SPFx 1.20-era tooling. ([github.com](https://github.com/pnp/sp-dev-fx-webparts/blob/main/samples/react-birthdays/README.md?utm_source=chatgpt.com))

[PnP SPFx web-part samples](https://github.com/pnp/sp-dev-fx-webparts?utm_source=chatgpt.com)

Microsoft also maintains a substantial Teams samples repository. It currently contains Teams SDK examples plus dozens of TeamsJS examples and an archive of more than 100 older examples. ([github.com](https://github.com/OfficeDev/Microsoft-Teams-Samples?utm_source=chatgpt.com))

[Microsoft Teams Samples](https://github.com/OfficeDev/Microsoft-Teams-Samples?utm_source=chatgpt.com)

One warning: samples vary greatly in age. Some older PnP samples target obsolete SPFx/Node versions, so check the sample's compatibility section before treating it as starter code. ([github.com](https://github.com/pnp/sp-dev-fx-webparts/blob/main/samples/react-accordion/README.md?utm_source=chatgpt.com))

---

# 17. For your SharePoint administration use case
[Top](#top)

This is where I think the concept gets especially compelling.

Imagine one **SharePoint Administration SPA**:

```text
╭──────────────────────────────────────────────────────────╮
│  SHAREPOINT ADMINISTRATION                               │
├──────────────────────────────────────────────────────────┤
│ Search site  [________________________________] [Search] │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  Site Overview                                           │
│  ┌──────────────────────┐  ┌──────────────────────┐     │
│  │ Owners               │  │ Storage              │     │
│  │ Jane Doe             │  │ 14.2 GB              │     │
│  │ John Smith           │  │ 71%                  │     │
│  └──────────────────────┘  └──────────────────────┘     │
│                                                          │
│  Status                                                  │
│  URL            Active                                   │
│  Lock State     Unlocked                                 │
│  Created        2023-06-14                               │
│                                                          │
│  [Lock] [Unlock] [Delete Request] [Ownership] [Audit]   │
│                                                          │
├──────────────────────────────────────────────────────────┤
│ Request history                                          │
│                                                          │
│ Date        Action        User            Status          │
│ 9/29        Unlock        Smith           Completed       │
│ 9/22        Lock          Jones           Completed       │
╰──────────────────────────────────────────────────────────╯
```

Then the **same underlying application/component library** could surface as:

| Host | Implementation |
|---|---|
| SharePoint | **SPFx full-page app** |
| Teams | **SPFx Teams tab/personal app** |
| Outlook | Office Add-in task pane using shared React components |
| Power Apps | PCF components using shared TypeScript/React logic |
| Browser | Standalone SPA |
| Mobile browser | Responsive SPA |
| Other internal tools | Same REST/API services |

Microsoft explicitly supports SPFx web parts in Teams, and Canvas apps themselves can also be embedded in SharePoint and Teams. ([learn.microsoft.com](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-expose-webparts-teams?utm_source=chatgpt.com))

For what you've been exploring recently—**site-admin lookup, site lock/unlock, deletion requests, ownership, workflow status/error handling and audit history**—I'd lean toward **SPFx + React + Fluent UI as the primary UI platform**, with SharePoint Lists initially providing shared transactional/configuration data. If the application becomes substantially larger, introduce an API/service layer rather than allowing each UI component to contain its own Graph/SharePoint/Dataverse logic. That would give you a surprisingly capable internal application framework without making Power Apps the only possible front end.

### Exchange 2 — PWA vs SPA and a no-build plugin framework
[Top](#top)

#### User Prompt
[Top](#top)

<div style="background-color:#800000;color:#FFFFFF;border:2px solid #5B0000;padding:12px;border-radius:4px;"><strong>Verbatim prompt</strong><br><br>compare a PWA and SPA or similar. For TypeScript I don&#x27;t have (not allowed) to install Yeoman, and maybe not Node.js or NPM.  Grunt and Heft are likely not allowed.  How can I build on top of one approve TypeScript package and add to that? Make some pluggable framework.</div>

#### ChatGPT Response
[Top](#top)

Yes. The key distinction is that **SPA and PWA are not competing architectures**.

A **SPA describes how the application UI/navigation works**. A **PWA describes additional browser capabilities**—installation, offline caching, service workers, etc. A single application can be both.

| Approach | What it means | Build tooling required? | Offline/local | Installable | Good fit for your restrictions |
|---|---|---:|---:|---:|---|
| Plain HTML/JS app | HTML + CSS + JS modules | No | Some | No | **Excellent** |
| SPA | One-page application with dynamic views | Not necessarily | Yes | No | **Excellent** |
| PWA | Web app + manifest/service worker | Not necessarily | **Yes** | **Yes** | **Good** |
| React SPA | SPA built from React components | Usually | Yes | Optional | Maybe |
| SPFx app | Microsoft 365 application framework | **Yes** | Possible | No | Difficult locally |
| PCF | Power Apps component | **Yes** | Limited | No | Difficult locally |

The important discovery for your situation is:

> **You do not need Node, npm, Yeoman, Heft, Grunt, Webpack, React, or SPFx to build a sophisticated modular SPA.**

Those are primarily **development/build tools**. The browser ultimately executes HTML, CSS and JavaScript.

That gives you another architecture worth considering.

---

# Build a "no-build" pluggable SPA platform
[Top](#top)

If IT will approve **one controlled application/package**, I'd be inclined to make that package your **SPA runtime/shell**, rather than trying to get approval for an entire JavaScript development ecosystem.

Something like:

```text
Enterprise SPA Shell
│
├── index.html
│
├── app.js
├── app.css
│
├── core/
│   ├── router.js
│   ├── plugin-manager.js
│   ├── data-service.js
│   ├── storage.js
│   ├── events.js
│   ├── security.js
│   └── logging.js
│
├── components/
│   ├── button.js
│   ├── dialog.js
│   ├── datagrid.js
│   ├── site-picker.js
│   ├── person-picker.js
│   └── status-card.js
│
├── plugins/
│   ├── site-info/
│   ├── site-owners/
│   ├── lock-site/
│   ├── unlock-site/
│   ├── deletion-request/
│   └── flow-monitor/
│
├── assets/
│   ├── icons/
│   ├── images/
│   └── svg/
│
└── config/
    ├── app.json
    └── plugins.json
```

**No npm packages in each application.**

**No `node_modules`.**

**No build process.**

**No Yeoman.**

**No Heft.**

The browser itself is effectively your runtime.

---

## 1. Make the shell extremely small
[Top](#top)

For example:

```html
<!DOCTYPE html>

<html>
<head>
    <meta charset="utf-8">
    <title>Admin Toolkit</title>

    <link rel="stylesheet" href="./app.css">
</head>

<body>

    <header id="header"></header>

    <nav id="navigation"></nav>

    <main id="workspace"></main>

    <script type="module" src="./app.js"></script>

</body>
</html>
```

Then:

```javascript
import { PluginManager } from "./core/plugin-manager.js";
import { Router } from "./core/router.js";
import { DataService } from "./core/data-service.js";

const plugins = new PluginManager();

await plugins.load("./config/plugins.json");

const router = new Router(plugins);

router.start();
```

Modern browsers understand ES modules natively.

That eliminates a surprising amount of tooling.

---

# 2. Make functionality plug-ins
[Top](#top)

This is where I think your idea becomes powerful.

`plugins.json`:

```json
{
  "plugins": [
    {
      "id": "site-info",
      "title": "Site Information",
      "module": "../plugins/site-info/index.js",
      "route": "/site"
    },
    {
      "id": "site-owners",
      "title": "Site Owners",
      "module": "../plugins/site-owners/index.js",
      "route": "/owners"
    },
    {
      "id": "lock-site",
      "title": "Lock Site",
      "module": "../plugins/lock-site/index.js",
      "route": "/lock"
    }
  ]
}
```

Your framework dynamically loads them:

```javascript
const module = await import(plugin.module);

await module.initialize(context);
```

Now adding functionality doesn't mean rewriting the SPA.

You add:

```text
/plugins/my-new-plugin/
```

and register it.

---

# 3. Define a tiny plug-in contract
[Top](#top)

For example, every plug-in exports:

```javascript
export const manifest = {
    id: "site-owners",
    title: "Site Owners",
    version: "1.0"
};

export async function initialize(context) {
}

export async function render(container, context) {
}

export async function dispose() {
}
```

Your shell doesn't care what the plug-in actually does.

It just knows:

```text
Load
  ↓
Initialize
  ↓
Render
  ↓
Dispose
```

That's effectively your own miniature application framework.

---

# 4. Give every plug-in a standard context
[Top](#top)

This is particularly important.

Don't let each plug-in independently figure out SharePoint authentication, logging, caching, configuration, etc.

Give it:

```javascript
context = {

    user: ...,

    site: ...,

    services: {
        sharePoint: ...,
        graph: ...,
        storage: ...,
        logging: ...
    },

    ui: {
        dialog: ...,
        notification: ...,
        spinner: ...
    },

    events: ...
}
```

A plug-in could then say:

```javascript
const owners =
    await context.services.sharePoint.getSiteOwners(siteUrl);
```

rather than implementing HTTP/authentication repeatedly.

---

# 5. Build an event bus
[Top](#top)

Now the plug-ins don't have to know about each other.

For example:

```javascript
context.events.publish(
    "site:selected",
    {
        url: siteUrl
    }
);
```

Other components subscribe:

```javascript
context.events.subscribe(
    "site:selected",
    refreshSiteInformation
);
```

You get:

```text
                 Event Bus

                    │
       ┌────────────┼────────────┐
       │            │            │
       ▼            ▼            ▼

 Site Information  Owners     Lock Status

       │            │            │
       └────────────┼────────────┘
                    │
                    ▼
              Audit History
```

That's a genuine component architecture without React.

---

# 6. You can even make Web Components your UI framework
[Top](#top)

This is probably the browser technology I'd investigate most seriously under your restrictions.

Modern browsers have native **Web Components**.

You could define:

```html
<site-picker></site-picker>

<site-summary></site-summary>

<site-owners></site-owners>

<site-lock-status></site-lock-status>

<request-history></request-history>
```

And implement:

```javascript
class SiteStatus extends HTMLElement {

    connectedCallback() {

        this.innerHTML = `
            <div class="status-card">
                Site Status
            </div>
        `;
    }
}

customElements.define(
    "site-status",
    SiteStatus
);
```

No React.

No Vue.

No Angular.

No npm.

No compilation.

The **browser itself supplies your component model**.

---

# 7. Web Components + ES Modules is particularly attractive here
[Top](#top)

You essentially get:

```text
                Browser Platform

       ┌─────────────────────────────┐
       │                             │
       │ HTML                        │
       │ CSS                         │
       │ JavaScript ES Modules       │
       │ Web Components              │
       │ Custom Elements             │
       │ Shadow DOM                  │
       │ Fetch                       │
       │ IndexedDB                   │
       │ Service Workers             │
       │ Cache API                   │
       │ BroadcastChannel            │
       │                             │
       └─────────────────────────────┘

                 NO Node required
                 NO npm required
                 NO bundler required
```

You can build quite a lot with that.

---

# 8. Where TypeScript fits
[Top](#top)

Here's the complication.

Browsers **do not execute TypeScript directly**.

Eventually:

```text
TypeScript

    ↓ compile

JavaScript

    ↓

Edge
```

Normally:

```text
.ts
 ↓
tsc
 ↓
.js
```

And Microsoft's normal TypeScript installation path is npm/npx. Microsoft also documents Visual Studio/MSBuild options using the `Microsoft.TypeScript.MSBuild` NuGet package. ([typescriptlang.org](https://www.typescriptlang.org/download/?utm_source=chatgpt.com))

### Therefore I'd challenge one assumption.
[Top](#top)

If IT allows **one approved TypeScript environment/package**, don't make every SPA responsible for compiling itself.

Create:

```text
Approved TypeScript Build Environment
              │
              │
              ▼
        Shared Framework
              │
       ┌──────┼──────┐
       │      │      │
       ▼      ▼      ▼
    Plugin A Plugin B Plugin C
              │
              ▼
         compiled JS
```

Only the controlled build environment needs the compiler.

Users/developers consume the resulting JavaScript.

---

# 9. An even more locked-down model
[Top](#top)

You could have IT/your development group maintain:

```text
EnterpriseWebFramework/
```

containing:

```text
enterprise-web.js
enterprise-web.css
types/
templates/
components/
```

Individual applications become tiny.

For example:

```text
SiteLockApp/

index.html
app.js
config.json
```

instead of:

```text
SiteLockApp/

node_modules/
    40,000 files

package.json
package-lock.json
webpack.config
heft.json
tsconfig.json
eslint.config
...
```

That's an enormous governance difference.

---

# 10. You could use JavaScript instead of TypeScript at the leaf level
[Top](#top)

This is another option I would strongly consider.

Build the **core framework in TypeScript**, but allow plugins to be plain JavaScript.

For example:

```text
Approved Framework
      │
      ├── compiled from TypeScript
      │
      ▼
enterprise-web.js

          +

Application plugins
      │
      ├── site-info.js
      ├── site-lock.js
      └── owners.js
```

That gives you TypeScript's value in the complicated shared infrastructure without requiring every developer to have a TypeScript toolchain.

---

# 11. You can retain type checking without TypeScript source
[Top](#top)

There is a useful middle ground:

**JavaScript + JSDoc typing.**

Example:

```javascript
/**
 * @typedef {Object} SiteInfo
 * @property {string} url
 * @property {string} title
 * @property {string} lockState
 */

/**
 * @param {SiteInfo} site
 */
function displaySite(site) {

    console.log(site.title);
}
```

VS Code understands a substantial amount of this.

And you can use:

```javascript
// @ts-check
```

at the top.

So your source stays:

```text
.js
```

and the browser runs it directly, while VS Code can still provide useful type checking/intellisense.

For a locked-down workstation, that's an attractive compromise.

---

# 12. SPA versus PWA for this framework
[Top](#top)

I'd actually make **PWA capability optional**.

Start with:

```text
SPA Core
│
├── Router
├── Components
├── Plugins
├── Data
├── Events
└── Storage
```

Then optionally add:

```text
PWA Layer
│
├── manifest.webmanifest
├── service-worker.js
├── cache strategy
├── offline assets
└── install metadata
```

Architecture:

```text
              Your SPA Framework

                     │
        ┌────────────┼────────────┐
        │            │            │
    Components     Plugins       Data
        │            │            │
        └────────────┼────────────┘
                     │
                  SPA Core
                     │
                     ▼
             Optional PWA Layer
                     │
          ┌──────────┼──────────┐
          │          │          │
       Offline     Cache     Installable
```

So every PWA can use your SPA architecture, while not every SPA needs to become a PWA.

---

# 13. PWA probably isn't the first thing I'd solve
[Top](#top)

For administrative tools dealing with:

- SharePoint
- Graph
- Power Automate
- site locking
- site deletion
- ownership
- permissions

offline operation isn't particularly valuable.

You cannot actually lock a SharePoint site while disconnected.

So I would prioritize:

**SPA + Web Components + ES modules + plug-in architecture**

before PWA.

Later, PWA capabilities could provide:

```text
cached UI
cached reference information
draft requests
recent searches
offline documentation
```

But administrative actions would remain online.

---

# 14. Important SharePoint caveat
[Top](#top)

This architecture solves your **application development problem**, but it doesn't magically make it an SPFx package.

Current Microsoft documentation is quite explicit that SPFx's standard toolchain uses **Node, npm, TypeScript and related tooling**. ([learn.microsoft.com](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/sharepoint-framework-overview?utm_source=chatgpt.com))

And Microsoft changed the standard SPFx toolchain recently:

```text
SPFx <= 1.21
    Gulp

SPFx >= 1.22
    Heft + Webpack
```

([learn.microsoft.com](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/toolchain/sharepoint-framework-toolchain-rushstack-heft?utm_source=chatgpt.com))

Current SPFx 1.23.2 supports Node 22 and TypeScript through 5.8, while React remains 17.0.1. ([learn.microsoft.com](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/compatibility?utm_source=chatgpt.com))

So I would **not attempt to manually reproduce the SPFx build system** without Node/npm.

That would create more maintenance and security problems than it solves.

---

# 15. But there's an interesting organizational workaround
[Top](#top)

Have **one approved SPFx project**.

This may be exactly what you were getting at.

Instead of:

```text
App 1 → SPFx project
App 2 → SPFx project
App 3 → SPFx project
App 4 → SPFx project
App 5 → SPFx project
```

use:

```text
               APPROVED SPFx HOST
                     │
                     │
               SPA Application
                     │
              Plugin Manager
                     │
      ┌──────────────┼──────────────┐
      │              │              │
      ▼              ▼              ▼

 Site Admin      Flow Monitor    Site Search

      │              │              │
      ▼              ▼              ▼

   Plugin          Plugin          Plugin
```

The SPFx project becomes essentially a **host/container**.

You don't continually create new SPFx projects.

---

# 16. This resembles the "rig" idea Microsoft itself is moving toward
[Top](#top)

Interestingly, Microsoft's newer Heft architecture emphasizes reusable configurations called **rigs**, so projects inherit standardized build configuration instead of every project reinventing it. ([learn.microsoft.com](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/toolchain/sharepoint-framework-toolchain-rushstack-heft?utm_source=chatgpt.com))

Microsoft's SPFx roadmap also describes work on an **open-source SPFx CLI** intended to replace the Yeoman generator, including the ability to provide organization-specific templates. ([learn.microsoft.com](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/roadmap?utm_source=chatgpt.com))

That doesn't eliminate Node/npm for you, but philosophically it points in the same direction:

> **Standardize the complicated tooling once and build applications on top of the approved baseline.**

---

# 17. I'd separate your platform into three layers
[Top](#top)

This would be my proposed architecture:

```text
╔══════════════════════════════════════════════════════╗
║                 APPLICATION LAYER                    ║
║                                                      ║
║ Site Admin │ Workflow │ Audit │ Search │ Requests   ║
║                                                      ║
║              Plain JS plug-ins                      ║
╚══════════════════════════╤═══════════════════════════╝
                           │
                           ▼
╔══════════════════════════════════════════════════════╗
║                 FRAMEWORK LAYER                      ║
║                                                      ║
║ Router                                               ║
║ Plugin Manager                                       ║
║ Event Bus                                            ║
║ Components                                           ║
║ SharePoint Service                                   ║
║ Graph Service                                        ║
║ Storage                                              ║
║ Logging                                              ║
║ Error Handling                                       ║
║ Security                                             ║
║                                                      ║
║       TypeScript → approved compiled JavaScript      ║
╚══════════════════════════╤═══════════════════════════╝
                           │
                           ▼
╔══════════════════════════════════════════════════════╗
║                    HOST LAYER                        ║
║                                                      ║
║ Browser │ SharePoint │ Teams │ Outlook │ Power Apps ║
║                                                      ║
║ SPFx       Teams       Office       PCF wrappers     ║
║ wrapper     host       Add-in                       ║
╚══════════════════════════════════════════════════════╝
```

The **host adapters** are the only pieces that need the specialized Microsoft toolchains.

The majority of your code does not.

---

## The strongest option under your restrictions
[Top](#top)

I would investigate establishing **one IT-approved "Web Application SDK" repository/package** containing the TypeScript-built core, but exposing a plain-JavaScript/Web-Components plugin API.

Then your day-to-day application development could potentially require only:

**VS Code + Edge + HTML + CSS + JavaScript + JSON.**

No Yeoman. No Grunt/Gulp. No developer-level npm dependency sprawl. No separate framework installation per app.

When you eventually need deployment into SharePoint/Teams, an approved build machine or CI/CD pipeline could build the **thin SPFx host**. That is cleaner than trying to bypass Microsoft's SPFx build requirements—the current SPFx platform explicitly assumes Node/npm and, from 1.22 onward, Heft. ([learn.microsoft.com](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/toolchain/sharepoint-framework-toolchain-rushstack-heft?utm_source=chatgpt.com))

This could also fit very well with your earlier goal of having reusable SharePoint administrative functions: **Site Picker, Owner Lookup, Lock/Unlock, Delete Request, Workflow Status, Audit History, Error Panel and Logging** become plug-ins/components rather than separate apps.

### Exchange 3 — Existing frameworks, SPFx toolchain, Teams and OneDrive
[Top](#top)

#### User Prompt
[Top](#top)

<div style="background-color:#800000;color:#FFFFFF;border:2px solid #5B0000;padding:12px;border-radius:4px;"><strong>Verbatim prompt</strong><br><br>are there frameworks already that I could make few changes or write an adapter that talks to an SPFx package?<br>Aren&#x27;t Microsoft Teams and New Outlook PWAs?<br>show a detailed summary of all tools mentioned including Heft, yeoman, npm, SPFx versions, what can work with Teams. Show compatible versions, release dates, key features and notes (including Compatibility issues).<br>Also does SPFx work with OneDrive. how would the UI manfest?</div>

#### ChatGPT Response
[Top](#top)

Yes. There are already frameworks that get you much closer to what you want, and you do **not** necessarily need to make your own plugin system from scratch.

The most promising pattern for your constraints is:

```text
                  Approved SPFx Package
                         │
                  thin SPFx adapter
                         │
        ┌────────────────┴────────────────┐
        │                                 │
  shared runtime/framework          host/context API
        │                                 │
        └────────────────┬────────────────┘
                         │
                pluggable components
                         │
          ┌──────────────┼──────────────┐
          │              │              │
      Site Admin      Workflow       Audit
       module          module         module
```

SPFx itself is explicitly framework-agnostic: Microsoft says you can use React, Angular, Vue, Knockout, Handlebars, or another JavaScript framework. It also supports loading existing JavaScript libraries and dynamically loading code. ([learn.microsoft.com](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/sharepoint-framework-overview?utm_source=chatgpt.com))

For your restricted workstation, I would look particularly hard at **Web Components/Lit** rather than building a conventional React/npm application.

---

# 1. Existing frameworks that could sit behind a thin SPFx adapter
[Top](#top)

There are several levels of complexity.

| Framework / approach | What it gives you | Needs Node locally? | Natural SPFx fit | My view for your situation |
|---|---|---:|---:|---|
| Native Web Components | Browser-native components | No | Excellent | **Best baseline** |
| Lit | Small Web Components framework | Not inherently | Excellent | **Very strong choice** |
| Fluent UI Web Components | Microsoft-styled Web Components | Can consume prebuilt files | Excellent | **Very interesting** |
| single-spa | Microfrontend orchestration | Usually build tooling somewhere | Good | Good for much larger platform |
| ES modules + import maps | Plugin/module loading | No | Excellent | **Excellent** |
| SPFx Library Component | Shared SPFx library deployed once | Build pipeline required | Native | **Excellent SPFx-side abstraction** |
| React | UI framework | Normally yes | Native/common SPFx choice | Harder under your restrictions |
| Webpack Module Federation | Cross-bundle modules | Yes | Possible | Probably too much tooling |

## Lit is especially interesting
[Top](#top)

Lit describes itself as being based on standard browser Web Components. Components can be written in JavaScript or TypeScript and run in modern browsers without a Lit-specific compiler. A production pipeline can still bundle/minify them centrally, but **your development model need not revolve around a huge toolchain**. ([lit.dev](https://lit.dev/docs/tools/overview/?utm_source=chatgpt.com))

Conceptually:

```javascript
export class SiteSummary extends LitElement {
    render() {
        return html`
            <site-card>
                ${this.site.title}
            </site-card>
        `;
    }
}
```

And the SPFx part becomes mostly:

```text
SPFx lifecycle
    |
    +-- obtain SharePoint context
    +-- obtain authentication
    +-- create adapter
    +-- mount Web Component
```

That separation is exactly what you were describing.

---

# 2. Microsoft Fluent Web Components could give you your reusable UI layer
[Top](#top)

Microsoft has **Fluent UI Web Components**, based on Web Components and the Fluent design system.

Microsoft explicitly describes them as usable:

- without another framework,
- with React,
- with Vue,
- with Blazor,
- through npm,
- or via distributable/CDN resources. ([learn.microsoft.com](https://learn.microsoft.com/en-us/fluent-ui/web-components/?utm_source=chatgpt.com))

That could give you things resembling Microsoft's UI without making React your architectural dependency.

Conceptually:

```html
<fluent-button>
    Lock Site
</fluent-button>

<fluent-text-field>
    Site URL
</fluent-text-field>

<fluent-dialog>
    Confirm site lock?
</fluent-dialog>
```

Your own library could then be:

```text
/company-components/

    company-site-picker.js
    company-person-picker.js
    company-status-badge.js
    company-audit-grid.js
    company-confirm-dialog.js
```

Those components know essentially nothing about SPFx.

---

# 3. Then create ONE SPFx adapter
[Top](#top)

I think this is the architectural idea you are reaching for.

For example:

```typescript
export interface IHostContext {
    getCurrentUser(): Promise<UserInfo>;

    getCurrentSite(): Promise<SiteInfo>;

    fetchSharePoint(url: string): Promise<Response>;

    fetchGraph(url: string): Promise<Response>;

    notify(message: string): void;

    log(message: string): void;
}
```

Your SPFx adapter implements it:

```text
SpfxHostAdapter

    getCurrentUser()
          ↓
    this.context.pageContext

    fetchSharePoint()
          ↓
    this.context.spHttpClient

    fetchGraph()
          ↓
    this.context.msGraphClientFactory

    notify()
          ↓
    SPFx / Fluent UI
```

Your plugins don't know that SPFx exists.

They only know:

```javascript
host.getCurrentSite()

host.fetchGraph(...)

host.notify(...)
```

Then you could eventually implement another adapter:

```text
TeamsHostAdapter

OutlookHostAdapter

StandaloneWebHostAdapter

PowerAppsHostAdapter
```

That is much more reusable.

---

# 4. SPFx already has something similar: Library Components
[Top](#top)

This may be particularly relevant to your "one approved package" idea.

An **SPFx Library Component** is an independently versioned shared library deployed through the SharePoint App Catalog. Other SPFx components can reference it, and the SPFx runtime loads it before the consuming component. Microsoft says it is specifically intended for **shared code used across multiple SPFx components**. ([learn.microsoft.com](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/library-component-overview?utm_source=chatgpt.com))

So you could build:

```text
App Catalog

    EnterpriseFramework.sppkg
            │
            │
       SPFx Library
            │
   ┌────────┼────────┐
   │        │        │
 Auth     Graph     UI
   │        │        │
 Logging  SharePoint Events
```

Then separate SPFx applications consume it.

One limitation is important: Microsoft currently permits only **one version of a particular library component in the tenant at a time**. ([learn.microsoft.com](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/library-component-overview?utm_source=chatgpt.com))

For controlled enterprise deployments, that can actually be useful rather than harmful—it enforces a common runtime—but it requires careful backwards compatibility.

---

# 5. Or go one step further: SPFx shell + dynamically loaded plugins
[Top](#top)

SPFx supports dynamically loading third-party components and splitting code into separately loaded packages. ([learn.microsoft.com](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/dynamic-loading?utm_source=chatgpt.com))

That suggests:

```text
AdminShell.sppkg
       │
       ▼
   SPFx Host
       │
       ▼
 plugin-manager.js
       │
       ├──── SiteInfo.js
       ├──── SiteOwners.js
       ├──── LockSite.js
       ├──── UnlockSite.js
       ├──── DeleteRequest.js
       └──── WorkflowMonitor.js
```

Your SPPKG barely changes.

You might update:

```text
plugins.json
```

and deploy another approved JS module rather than produce another giant SPFx application.

That has security/governance implications, so I would make plugin locations an **allow-list**, not permit arbitrary script URLs.

SPFx can host its JavaScript in SharePoint libraries or Microsoft 365 CDN rather than requiring a separate web server. ([learn.microsoft.com](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/extensions/guidance/migrate-jslink-to-spfx-extensions?utm_source=chatgpt.com))

---

# 6. single-spa is the "industrial" version of this idea
[Top](#top)

Another framework worth knowing about is **single-spa**.

It is designed specifically for **microfrontends**.

Its model is essentially:

```text
Root application

        │
        ├── Sites application
        ├── Workflow application
        ├── Audit application
        ├── Search application
        └── Requests application
```

It mounts and unmounts individual applications based on routes. The library is framework-agnostic. ([single-spa.js.org](https://single-spa.js.org/docs/microfrontends-concept/?utm_source=chatgpt.com))

single-spa strongly favors browser ES modules plus **import maps**. ([single-spa.js.org](https://single-spa.js.org/docs/recommended-setup/?utm_source=chatgpt.com))

Example:

```html
<script type="importmap">
{
    "imports": {
        "@company/core":
            "/framework/core.js",

        "@company/site-admin":
            "/plugins/site-admin.js",

        "@company/audit":
            "/plugins/audit.js"
    }
}
</script>
```

Then:

```javascript
import { SiteAdmin } from "@company/site-admin";
```

This is extremely close to the pluggable framework you're describing.

However, for your environment I'd initially choose:

> **Native ES modules + Web Components + your small adapter interface**

rather than introducing single-spa immediately.

single-spa becomes worthwhile if your system grows into several independently developed applications.

---

# 7. Teams: yes, but distinguish Teams web/PWA from Teams desktop
[Top](#top)

You asked an important question:

> Aren't Microsoft Teams and New Outlook PWAs?

### Teams on the web — yes, it can be installed as a PWA.
[Top](#top)

Microsoft explicitly documents that **Teams on the web can be installed as a PWA** through Edge or Chrome. It remains a website running inside the browser sandbox. ([learn.microsoft.com](https://learn.microsoft.com/en-us/microsoftteams/teams-progressive-web-apps?utm_source=chatgpt.com))

So:

```text
Teams Web
    |
    +-- Edge / Chrome
            |
            +-- Install site as app
                    |
                    +-- Teams PWA
```

### But the current Teams desktop application is not simply "the Teams PWA."
[Top](#top)

That's an important distinction.

Teams tabs themselves are web applications. Microsoft describes tabs as **client-aware webpages embedded using an iframe**. The same tab model works across Teams, Outlook and Microsoft 365 hosts. ([learn.microsoft.com](https://learn.microsoft.com/microsoftteams/platform/tabs/what-are-tabs?utm_source=chatgpt.com))

So your SPA fits naturally inside Teams:

```text
Teams
   |
   +-- Tab
         |
         +-- iframe
               |
               +-- your SPA
```

And custom Teams tabs are available in **GCC**, GCC High and DoD according to Microsoft's current documentation. ([learn.microsoft.com](https://learn.microsoft.com/microsoftteams/platform/tabs/what-are-tabs?utm_source=chatgpt.com))

That is particularly relevant for your environment.

---

# 8. New Outlook is not accurately described as "just a PWA"
[Top](#top)

This needs a more nuanced answer.

### Outlook on the web can be installed as a PWA.
[Top](#top)

Microsoft explicitly supports installing Outlook on the web through Edge or Chrome as a Progressive Web App. ([support.microsoft.com](https://support.microsoft.com/en-us/outlook/use-the-web-version-of-outlook-like-a-desktop-app?utm_source=chatgpt.com))

However:

### New Outlook for Windows is a packaged native Windows application using WebView2.
[Top](#top)

Microsoft describes New Outlook as:

```text
New Outlook
      │
      ├── Native Windows Integration Component
      │
      └── WebView2
              │
              └── Outlook web experience
```

It is packaged as a Windows application and receives native integration that a normal web app doesn't have. ([learn.microsoft.com](https://learn.microsoft.com/microsoft-365-apps/outlook/overview-new-outlook-windows?utm_source=chatgpt.com))

So:

| Product | PWA? |
|---|---|
| Teams web installed via Edge | **Yes** |
| Teams desktop | No—not simply a PWA |
| Outlook on the web installed via Edge | **Yes** |
| New Outlook for Windows | **No—not technically just a PWA**; WebView2 + native Windows integration |
| Your proposed app | Could be SPA, PWA, or both |

New Outlook's architecture is actually further evidence that **web technology + a thin host adapter** is a very effective Microsoft architecture.

---

# 9. Current SPFx compatibility picture — September 30, 2026
[Top](#top)

There is a slight documentation mismatch right now worth pointing out.

Microsoft's roadmap discusses SPFx **1.24/1.25**, but the current production compatibility/release documentation still identifies **1.23.2** as the latest clearly documented stable release, while **1.24 remains preview**. SPFx 1.24 beta.3 was released August 27, 2026 and adds preview React 18 support. ([learn.microsoft.com](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/release-1.24.0?utm_source=chatgpt.com))

Therefore I would treat **1.23.2 as the production baseline until Microsoft publishes a stable 1.24/1.25 release page and updates its compatibility table**.

## Major SPFx generations
[Top](#top)

| SPFx | Release | Node | TypeScript | React | Build system | Important notes |
|---|---|---|---|---|---|---|
| 1.18.x | 2023–24 | 16/18 | 4.5/4.7 | 17.0.1 | Gulp/Webpack | Older baseline |
| 1.19 | 2024 | 18 | 4.5/4.7 | 17.0.1 | Gulp/Webpack | Legacy toolchain |
| 1.20 | 2024 | 18 | 4.5/4.7 | 17.0.1 | Gulp/Webpack | Legacy |
| 1.21 | Apr 23 2025 | 22 | 5.3 | 17.0.1 | Gulp/Webpack | Last generation before Heft |
| 1.21.1 | May 3 2025 | 22 | 5.3 | 17.0.1 | Gulp/Webpack | CSS/packaging fixes |
| **1.22.0** | **Dec 10 2025** | **22** | **2.9–5.8** | **17.0.1** | **Heft/Webpack** | Major toolchain change |
| 1.22.2 | Jan 28 2026 | 22 | 2.9–5.8 | 17.0.1 | Heft | Security fixes |
| 1.23.0 | May 13 2026 | 22 | 2.9–5.8 | 17.0.1 | Heft | SPFx CLI preview |
| **1.23.2** | **Jun 30 2026** | **22** | **2.9–5.8** | **17.0.1** | **Heft** | Current clearly documented stable baseline |
| 1.24 preview | beta Jul/Aug 2026 | TBD/current docs | newer TS range | **React 18 preview** | Heft | **Do not treat as production yet** |

Microsoft's compatibility table provides the Node/TypeScript/React mappings above and specifically tells developers to use the exact supported React version. ([learn.microsoft.com](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/compatibility?utm_source=chatgpt.com))

SPFx 1.23.1 deserves a special warning: Microsoft delisted it because of regressions; 1.23.2 replaced it. ([learn.microsoft.com](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/release-1.23.2?utm_source=chatgpt.com))

---

# 10. Detailed tool summary
[Top](#top)

Here's how all the pieces fit.

| Tool | Current/relevant version | First/relevant date | Role | Needed at runtime? | Compatibility/issues |
|---|---:|---|---|---:|---|
| **SPFx** | 1.23.2 stable documented | Jun 30 2026 | Microsoft 365 UI/extensibility framework | Yes, Microsoft-hosted runtime | Node 22; React 17.0.1; TS ≤5.8 |
| **SPFx 1.24 preview** | beta.3 | Aug 27 2026 | Next SPFx generation | Preview only | React 18 preview |
| **Node.js** | SPFx uses **22** | Node 22 Apr 24 2024 | Executes build tools | No | Do not substitute Node 24/26 just because newer |
| **npm** | Comes with Node | ongoing | Package manager | No | Often corporate proxy/security pain point |
| **npx** | Part of npm distribution | ongoing | Executes npm packages | No | Same proxy/package approval concerns |
| **TypeScript** | SPFx supports through **5.8** | TS 5.8 Feb 28 2025 | Typed JS compilation | No | Browser doesn't execute TS |
| **React** | SPFx stable: **17.0.1** | older | UI component framework | Yes if used | Must pin exact version for SPFx |
| **React 18** | SPFx 1.24 preview | 2026 preview | Modern React | Yes | Not production SPFx baseline yet |
| **Yeoman / `yo`** | current npm package 7.0.1 | current release ~2026 | Project scaffolding | No | Being replaced in SPFx direction |
| **SPFx Yeoman generator** | tied to SPFx generation | legacy/current | Creates project structure | No | Requires npm/Node |
| **SPFx CLI** | preview around 1.23; roadmap says GA in later 2026 | 2026 | Replacement for Yeoman generator | No | Newer model; roadmap evolving |
| **Gulp** | SPFx ≤1.21.1 | legacy | Build task orchestrator | No | Legacy SPFx path |
| **Heft** | SPFx ≥1.22 | Dec 2025 onward | Build/task orchestrator | No | Requires Node/npm |
| **Webpack** | used beneath SPFx tooling | ongoing | Bundling | No | Heft did **not** eliminate Webpack |
| **Lit** | current Web Components framework | current | Lightweight reusable UI/components | Yes as JS library | Minimal tool requirements |
| **Fluent UI Web Components** | current | current | Microsoft Fluent-styled Web Components | Yes | Good cross-framework boundary |
| **single-spa** | 6.x docs | current | Microfrontend orchestration | Yes | Often more infrastructure than you need |
| **Import maps** | browser standard | modern Edge | Maps module names → URLs | Browser feature | Excellent for plugin architecture |
| **SPFx Library Component** | supported | current | Shared tenant-side SPFx code | SPFx runtime | Only one version per library component in tenant |
| **Teams JS SDK** | current | current | Detect/interact with Teams host | Yes in Teams | Useful if same UI spans M365 hosts |
| **Service Worker** | browser standard | mature | PWA offline/cache | Browser | Usually unnecessary for online admin operations |
| **Web App Manifest** | browser standard | mature | PWA installation metadata | Browser | Not SPFx manifest |

Heft itself is a Microsoft/RushStack toolchain orchestrator. The current npm package is in the **1.2.x** line; it coordinates TypeScript, ESLint, Jest, Webpack, API Extractor and related tasks. ([npmjs.com](https://www.npmjs.com/package/%40rushstack/heft?utm_source=chatgpt.com))

Node 22 was released April 24, 2024, entered LTS later that year, and remains Microsoft's supported Node generation for current stable SPFx even though newer Node generations now exist. ([github.com](https://github.com/nodejs/Release?utm_source=chatgpt.com))

That last point matters in your environment:

> **"Latest Node" is not the same thing as "correct Node for SPFx."**

---

# 11. Why Microsoft moved from Gulp to Heft
[Top](#top)

Historically:

```text
SPFx 1.0 - 1.21.1

npm
 |
 Gulp
 |
 Webpack
 |
 TypeScript
```

Starting with 1.22:

```text
SPFx 1.22+

npm
 |
 Heft
 |
 +-- TypeScript
 +-- Webpack
 +-- linting
 +-- testing
 +-- assets
 +-- packaging hooks
```

Microsoft says SPFx 1.22 moved new projects to Heft; Webpack remains the underlying bundling technology. ([learn.microsoft.com](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/release-1.22.0?utm_source=chatgpt.com))

This is important for your approval discussion:

**Heft is not something that runs on users' computers after deployment.**

Neither are:

```text
Node
npm
Yeoman
Gulp
TypeScript compiler
Webpack
```

They are essentially **factory machinery**.

The delivered product is JavaScript/CSS/assets packaged through SPPKG.

That can sometimes make an IT approval argument easier.

---

# 12. What works with Teams?
[Top](#top)

SPFx has unusually good Teams integration.

A single SPFx web part can declare:

```json
"supportedHosts": [
    "SharePointWebPart",
    "TeamsTab",
    "TeamsPersonalApp"
]
```

Microsoft supports SPFx web parts as:

| Teams surface | SPFx support |
|---|---:|
| Channel tab | Yes |
| Group tab | Yes |
| Personal app | Yes |
| Messaging extension | Yes, SPFx 1.11+ |
| SharePoint page | Yes |
| Teams meeting application | Yes |
| Viva Connections | Yes, via SPFx capabilities |

([learn.microsoft.com](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-expose-webparts-teams?utm_source=chatgpt.com))

That gives you the very attractive model:

```text
                    One component

                         │
            ┌────────────┼────────────┐
            │            │            │
       SharePoint      Teams       Viva
         page            tab
```

And Microsoft handles much of the host plumbing.

---

# 13. Teams can also host an ordinary SPA
[Top](#top)

You don't even strictly need SPFx for every Teams app.

A Teams tab is fundamentally a webpage in an iframe. ([learn.microsoft.com](https://learn.microsoft.com/microsoftteams/platform/tabs/what-are-tabs?utm_source=chatgpt.com))

Therefore:

```text
Teams

  Personal App
      │
      └── https://internal-app/siteadmin/

  Channel Tab
      │
      └── https://internal-app/siteadmin/?team=...
```

Your application uses the Teams JS SDK to discover context.

This provides another architecture:

```text
                      Your SPA

                         │
              ┌──────────┴───────────┐
              │                      │
         SPFx Adapter           Teams Adapter
              │                      │
        SharePoint page          Teams tab
```

You don't necessarily have to make Teams consume the SPFx version.

---

# 14. Does SPFx work with OneDrive?
[Top](#top)

### Yes—but there is a nuance.
[Top](#top)

OneDrive for Business is deeply connected to SharePoint technology, and Microsoft's OneDrive developer documentation explicitly points developers toward SPFx for integrating solutions with SharePoint/OneDrive scenarios. ([learn.microsoft.com](https://learn.microsoft.com/en-us/onedrive/developer/?view=odsp-graph-online&utm_source=chatgpt.com))

However, that doesn't mean:

> "Every SPFx Web Part can simply be dropped onto the standard OneDrive Files page."

The OneDrive user interface isn't a general-purpose SharePoint modern page with an **Add web part** button.

There are different extension concepts.

---

# 15. How an SPFx-related UI could manifest around OneDrive
[Top](#top)

Think in terms of **surface**, not just "OneDrive".

### A. User's OneDrive-hosted SharePoint page
[Top](#top)

A user's OneDrive for Business is backed by a personal SharePoint site.

SPFx solutions can be made available to personal sites, assuming tenant deployment/configuration permits that. Microsoft describes approved SPFx client-side solutions as usable on self-service team, group and personal sites. ([learn.microsoft.com](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/sharepoint-framework-overview?utm_source=chatgpt.com))

Conceptually:

```text
User OneDrive / personal site

        custom page

     ┌──────────────────────┐
     │ Your SPFx web part   │
     │                      │
     │ Recent files         │
     │ Large files          │
     │ Sharing status       │
     └──────────────────────┘
```

---

# 16. Document-library command UI
[Top](#top)

This is probably the most useful manifestation for an admin tool.

SPFx **ListView Command Sets** extend list/document-library toolbars and menus.

Microsoft describes SPFx extensions as capable of adding commands to toolbars and extending modern document library experiences. ([learn.microsoft.com](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/extensions/overview-extensions?utm_source=chatgpt.com))

You might get something like:

```text
OneDrive / Documents

 Name                Modified       Shared

 report.docx         Yesterday       Yes
 finance.xlsx        Today           No
 notes.pdf           Today           Yes

 ----------------------------------------------------------
 [ New ] [ Upload ] [ Share ] [...] [ Company Tools ]
                                      ^
                                      |
                               SPFx command
```

Clicking **Company Tools** could open:

```text
┌──────────────────────────────────────┐
│ File Administration                  │
├──────────────────────────────────────┤
│ File: finance.xlsx                   │
│ Owner: Davis                         │
│ Size: 620 MB                         │
│ Sharing: Internal                    │
│                                      │
│ [Review permissions]                 │
│ [Generate report]                    │
│ [Flag large file]                    │
└──────────────────────────────────────┘
```

Whether a particular extension surface appears identically in the dedicated OneDrive UX versus a SharePoint library requires testing—the products share infrastructure but don't expose every extensibility point identically.

---

# 17. File Picker is another OneDrive integration
[Top](#top)

If your SPA needs users to choose files from:

```text
OneDrive
SharePoint
Teams-backed libraries
```

Microsoft has a **OneDrive/SharePoint File Picker** intended specifically for embedding into applications. ([learn.microsoft.com](https://learn.microsoft.com/en-us/onedrive/developer/?view=odsp-graph-online&utm_source=chatgpt.com))

Then:

```text
Your SPA
   |
   +-- [Choose File]
          |
          v
   Microsoft File Picker
          |
      +---+---+
      |       |
   OneDrive SharePoint
```

That might be more useful than trying to embed your SPA into OneDrive itself.

---

# 18. SPFx also communicates very nicely between components
[Top](#top)

You asked earlier about multiple instances.

SPFx has **Dynamic Data**, specifically designed for SPFx components to publish and consume information between each other. Microsoft calls this its recommended pattern for data sharing between SPFx web parts/extensions. ([learn.microsoft.com](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/dynamic-data?utm_source=chatgpt.com))

Example:

```text
Site Picker
    |
    | selectedSite
    v
SPFx Dynamic Data
    |
    +----------+-----------+-----------+
    |          |           |           |
 Owners     Storage     Lock State    Audit
```

That lets you have multiple independently developed pieces without a giant monolithic SPA.

---

# 19. A more practical architecture for your restrictions
[Top](#top)

Given that you may **not be allowed Node, npm, Yeoman or Heft**, I would not design your workstation as the SPFx factory.

Instead:

```text
YOUR WORKSTATION
─────────────────────────────────────

VS Code
HTML
CSS
JavaScript
possibly TypeScript source
Web Components
Lit
JSON plugin manifests

         │
         │ Git
         ▼


APPROVED BUILD ENVIRONMENT
─────────────────────────────────────

Node 22
npm
SPFx 1.23.2
Heft
Webpack
TypeScript
SPFx CLI / generator

         │

         ▼

       .sppkg


MICROSOFT 365
─────────────────────────────────────

Tenant App Catalog

         │
         ├──────── SharePoint
         ├──────── Teams
         ├──────── Personal sites
         └──────── shared SPFx libraries
```

You would almost never interact with Node/npm yourself.

---

# 20. And I would make the SPFx code extremely thin
[Top](#top)

Something like:

```text
/company-platform
      │
      ├── components/
      ├── services/
      ├── plugins/
      └── graphics/

            ↓

    standard JavaScript


/spfx-host
      │
      └── adapter.ts

            ↓

          SPPKG
```

SPFx adapter responsibilities:

```text
✓ Current user
✓ SharePoint context
✓ Graph token/client
✓ SPHttpClient
✓ Teams context
✓ theme
✓ lifecycle
✓ logging
```

Your application responsibilities:

```text
✓ screens
✓ navigation
✓ components
✓ site admin logic
✓ workflow UI
✓ graphics
✓ plugin registration
```

That keeps roughly **90% of your application independent of SPFx**.

---

## The architecture I'd prototype first
[Top](#top)

I would use:

```text
                Enterprise Web Runtime

                       ES Modules
                           +
                    Web Components
                           +
                         Lit
                           +
              Fluent Web Components
                           +
                     Plugin Manifest

                           │
              ┌────────────┴────────────┐
              │                         │
        SpfxHostAdapter          WebHostAdapter
              │                         │
           SPFx                   standalone SPA
              │
      ┌───────┼────────┐
      │       │        │
SharePoint  Teams   OneDrive-
                   related surfaces
```

and leave **single-spa** available as a future evolution if the plugin collection becomes a genuine microfrontend platform.

Most importantly, I would **not let your plugin code depend directly on `this.context` from SPFx**. Put that behind an adapter from day one. That is the decision that makes the same code reusable later in Teams, a standalone SPA, Outlook-hosted web UI, or eventually a PCF wrapper.

Microsoft's own direction toward shared SPFx Library Components, dynamic loading, a newer SPFx CLI, and reusable/company-specific project templates is broadly compatible with this architecture. ([learn.microsoft.com](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/library-component-overview?utm_source=chatgpt.com))

## Relevant URLs
[Top](#top)

- <u>https://...</u>
- <u>https://apps.company.gov/siteadmin/</u>
- <u>https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria?source=post_page-----b01fbb41d14c---------------------------------------&utm_source=chatgpt.com</u>
- <u>https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria?utm_source=chatgpt.com</u>
- <u>https://github.com/OfficeDev/Microsoft-Teams-Samples?utm_source=chatgpt.com</u>
- <u>https://github.com/SharePoint/sp-dev-docs/blob/main/docs/spfx/toolchain/sharepoint-framework-cli.md?utm_source=chatgpt.com</u>
- <u>https://github.com/nodejs/Release?utm_source=chatgpt.com</u>
- <u>https://github.com/pnp/sp-dev-fx-webparts/blob/main/samples/react-accordion/README.md?utm_source=chatgpt.com</u>
- <u>https://github.com/pnp/sp-dev-fx-webparts/blob/main/samples/react-birthdays/README.md?utm_source=chatgpt.com</u>
- <u>https://github.com/pnp/sp-dev-fx-webparts?utm_source=chatgpt.com</u>
- <u>https://internal-app/siteadmin/</u>
- <u>https://internal-app/siteadmin/?team=...</u>
- <u>https://learn.microsoft.com/en-us/fluent-ui/web-components/?utm_source=chatgpt.com</u>
- <u>https://learn.microsoft.com/en-us/microsoftteams/platform/tabs/how-to/tabs-in-sharepoint?utm_source=chatgpt.com</u>
- <u>https://learn.microsoft.com/en-us/microsoftteams/teams-progressive-web-apps?utm_source=chatgpt.com</u>
- <u>https://learn.microsoft.com/en-us/office/dev/add-ins/develop/add-in-manifests?utm_source=chatgpt.com</u>
- <u>https://learn.microsoft.com/en-us/office/dev/add-ins/outlook/outlook-add-ins-overview?utm_source=chatgpt.com</u>
- <u>https://learn.microsoft.com/en-us/office365/servicedescriptions/sharepoint-online-service-description/sharepoint-online-limits?utm_source=chatgpt.com</u>
- <u>https://learn.microsoft.com/en-us/onedrive/developer/?view=odsp-graph-online&utm_source=chatgpt.com</u>
- <u>https://learn.microsoft.com/en-us/power-apps/developer/component-framework/custom-controls-overview?utm_source=chatgpt.com</u>
- <u>https://learn.microsoft.com/en-us/power-apps/developer/component-framework/limitations?utm_source=chatgpt.com</u>
- <u>https://learn.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-expose-webparts-teams?utm_source=chatgpt.com</u>
- <u>https://learn.microsoft.com/en-us/sharepoint/dev/spfx/compatibility?utm_source=chatgpt.com</u>
- <u>https://learn.microsoft.com/en-us/sharepoint/dev/spfx/dynamic-data?utm_source=chatgpt.com</u>
- <u>https://learn.microsoft.com/en-us/sharepoint/dev/spfx/dynamic-loading?utm_source=chatgpt.com</u>
- <u>https://learn.microsoft.com/en-us/sharepoint/dev/spfx/extensions/guidance/migrate-jslink-to-spfx-extensions?utm_source=chatgpt.com</u>
- <u>https://learn.microsoft.com/en-us/sharepoint/dev/spfx/extensions/overview-extensions?utm_source=chatgpt.com</u>
- <u>https://learn.microsoft.com/en-us/sharepoint/dev/spfx/library-component-overview?utm_source=chatgpt.com</u>
- <u>https://learn.microsoft.com/en-us/sharepoint/dev/spfx/release-1.22.0?utm_source=chatgpt.com</u>
- <u>https://learn.microsoft.com/en-us/sharepoint/dev/spfx/release-1.23.2?utm_source=chatgpt.com</u>
- <u>https://learn.microsoft.com/en-us/sharepoint/dev/spfx/release-1.24.0?utm_source=chatgpt.com</u>
- <u>https://learn.microsoft.com/en-us/sharepoint/dev/spfx/roadmap?utm_source=chatgpt.com</u>
- <u>https://learn.microsoft.com/en-us/sharepoint/dev/spfx/sharepoint-framework-overview?utm_source=chatgpt.com</u>
- <u>https://learn.microsoft.com/en-us/sharepoint/dev/spfx/toolchain/sharepoint-framework-toolchain-rushstack-heft?utm_source=chatgpt.com</u>
- <u>https://learn.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/single-part-app-pages?utm_source=chatgpt.com</u>
- <u>https://learn.microsoft.com/microsoft-365-apps/outlook/overview-new-outlook-windows?utm_source=chatgpt.com</u>
- <u>https://learn.microsoft.com/microsoftteams/platform/tabs/what-are-tabs?utm_source=chatgpt.com</u>
- <u>https://learn.microsoft.com/power-apps/maker/canvas-apps/create-component?utm_source=chatgpt.com</u>
- <u>https://lit.dev/docs/tools/overview/?utm_source=chatgpt.com</u>
- <u>https://single-spa.js.org/docs/microfrontends-concept/?utm_source=chatgpt.com</u>
- <u>https://single-spa.js.org/docs/recommended-setup/?utm_source=chatgpt.com</u>
- <u>https://support.microsoft.com/en-us/outlook/use-the-web-version-of-outlook-like-a-desktop-app?utm_source=chatgpt.com</u>
- <u>https://www.npmjs.com/package/%40rushstack/heft?utm_source=chatgpt.com</u>
- <u>https://www.typescriptlang.org/download/?utm_source=chatgpt.com</u>

## Glossary
[Top](#top)

- **SPA:** Single Page Application; a web application that updates views dynamically without traditional full-page navigation.
- **PWA:** Progressive Web App; a web application enhanced with installability, manifest metadata, service workers, caching, and related browser capabilities.
- **SPFx:** SharePoint Framework; Microsoft’s client-side extensibility framework for SharePoint and related Microsoft 365 surfaces.
- **SPPKG:** SharePoint solution package format used to deploy SPFx solutions to an App Catalog.
- **Heft:** RushStack build orchestrator used by newer SPFx projects to coordinate TypeScript, Webpack, linting, testing, packaging, and related tasks.
- **Yeoman:** Scaffolding framework historically used with the SPFx Yeoman generator to create project structures.
- **npm:** Node Package Manager; package manager and script runner distributed with Node.js.
- **Node.js:** JavaScript runtime commonly used to execute SPFx build tooling.
- **Web Components:** Browser standards including Custom Elements, Shadow DOM, and related APIs for reusable UI components.
- **Lit:** A lightweight library for authoring Web Components.
- **Fluent UI:** Microsoft design system and UI component family.
- **single-spa:** A microfrontend orchestration framework for composing independently deployed front-end applications.
- **Import map:** Browser mechanism that maps module specifiers to JavaScript module URLs.
- **PCF:** Power Apps Component Framework; pro-code component model for Power Apps.
- **WebView2:** Microsoft Edge-based embedded web runtime used by Windows applications such as new Outlook.
- **Dynamic Data:** SPFx mechanism for publishing and consuming data between SPFx components.
