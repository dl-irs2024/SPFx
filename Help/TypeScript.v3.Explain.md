# TypeScript v3: Complete M365 Developer Guide {#top}

## Table of Contents

### Main Sections
1. [Executive Summary](#executive-summary)
2. [TypeScript Keywords & Language Features](#typescript-keywords--language-features)
   - 2.1 [Type Declaration Keywords](#type-declaration-keywords)
   - 2.2 [Type Annotation & Assertion Keywords](#type-annotation--assertion-keywords)
   - 2.3 [Advanced Type Keywords](#advanced-type-keywords)
   - 2.4 [Function & Control Flow Keywords](#function--control-flow-keywords)
   - 2.5 [Class & OOP Keywords](#class--oop-keywords)
   - 2.6 [Module & Namespace Keywords](#module--namespace-keywords)
3. [TypeScript in M365 Platforms](#typescript-in-m365-platforms)
   - 3.1 [SharePoint Framework (SPFx)](#sharepoint-framework-spfx)
   - 3.2 [Power Apps Code Components (PCF)](#power-apps-code-components-pcf)
   - 3.3 [Power Apps Canvas Apps](#power-apps-canvas-apps)
   - 3.4 [Microsoft Teams Applications](#microsoft-teams-applications)
   - 3.5 [Office Add-ins](#office-add-ins)
   - 3.6 [Azure Functions & Dataverse](#azure-functions--dataverse)
4. [Getting Started Guide](#getting-started-guide)
5. [GCC Standard Considerations](#gcc-standard-considerations)
6. [Essential Libraries & Packages](#essential-libraries--packages)
7. [GitHub Repositories](#github-repositories)
8. [Technical Cheat Sheet](#technical-cheat-sheet)
9. [Glossary of Terms](#glossary-of-terms)
10. [Helpful URLs & Resources](#helpful-urls--resources)

---

## Executive Summary {#executive-summary}

[↑ Back to Top](#top)

TypeScript is the modern standard for enterprise M365 development, providing type safety, excellent IDE support, and compile-time error detection. This guide covers all TypeScript features, M365 platform integration, and GCC Standard compatibility for secure government cloud development.

**Key Statistics**:
- **Current Version**: TypeScript 5.8+ (October 2024)
- **Required for**: SPFx v1.22+, all PCF components, Teams projects
- **Setup Time**: 15-30 minutes with Node.js v22.x
- **Learning Curve**: 4-8 hours for basics, 2-4 weeks for proficiency
- **M365 Platforms Covered**: 6 major platforms with examples

**Why This Guide**:
- ✅ Complete keyword reference with real-world examples
- ✅ M365 platform setup with step-by-step instructions
- ✅ GCC Standard networking (407 proxy, internal registries)
- ✅ Production-ready code samples
- ✅ Complete resource list and GitHub repositories

---

## TypeScript Keywords & Language Features {#typescript-keywords--language-features}

[↑ Back to Top](#top)

Comprehensive reference of all TypeScript keywords organized by category with typical use cases and examples.

### Type Declaration Keywords {#type-declaration-keywords}

[↑ Back to Top](#typescript-keywords--language-features)

| Keyword | Purpose | Typical Use Cases | Real-World Example |
|---------|---------|-------------------|-------------------|
| `type` | Create reusable type alias | Union types, object shapes, function signatures | `type ApiResponse = { data: T; status: 'success' \| 'error' }` |
| `interface` | Define object contract | Class implementation, API contracts | `interface IUser { name: string; email: string; getId(): number }` |
| `enum` | Named set of constants | Status codes, directions, permissions | `enum UserRole { Admin = 'admin', User = 'user', Guest = 'guest' }` |
| `class` | Define objects with behavior | Component classes, services, models | `class User { constructor(name: string) { } getName(): string { } }` |
| `namespace` | Logical code organization | Prevent naming conflicts, organize large apps | `namespace Company { export class Employee { } }` |
| `declare` | Ambient type declaration | External JS libraries without types | `declare var jQuery: JQueryStatic` |
| `module` | Old export syntax (avoid) | Legacy code, CommonJS modules | `module Company { export class Emp { } }` |

### Type Annotation & Assertion Keywords {#type-annotation--assertion-keywords}

[↑ Back to Top](#typescript-keywords--language-features)

| Keyword | Purpose | Typical Use Cases | Real-World Example |
|---------|---------|-------------------|-------------------|
| `:` (colon) | Type annotation | Variables, parameters, return types | `let user: User; const greet = (name: string): void => { }` |
| `as` | Type assertion (unsafe cast) | Override inferred type, DOM manipulation | `const elem = document.getElementById('btn') as HTMLButtonElement` |
| `is` | Type predicate function | Custom type guards, narrowing unions | `function isUser(obj: any): obj is User { return obj.name !== undefined }` |
| `?:` | Optional property/parameter | Nullable fields, optional function args | `interface Config { debug?: boolean; timeout?: number }` |
| `!` (exclamation) | Non-null assertion | Tell compiler value isn't null/undefined | `const value = getValue()!; // Skip null check` |
| `as const` | Const assertion | Literal types, read-only tuples | `const status = 'active' as const; // type is 'active', not string` |

### Advanced Type Keywords {#advanced-type-keywords}

[↑ Back to Top](#typescript-keywords--language-features)

| Keyword | Purpose | Typical Use Cases | Real-World Example |
|---------|---------|-------------------|-------------------|
| `keyof` | Extract object property keys | Type-safe property access, pick fields | `type UserKeys = keyof User; // 'name' \| 'email' \| 'id'` |
| `typeof` | Get type of value/variable | Runtime type checking, typeof guards | `if (typeof value === 'string') { }` |
| `instanceof` | Check class instance | Runtime type narrowing | `if (error instanceof ValidationError) { }` |
| `in` | Check property existence | Type guards for discriminated unions | `if ('name' in obj) { /* obj has name */ }` |
| `Partial<T>` | Make all properties optional | Partial updates, patches, form data | `type UpdateUser = Partial<User>; // All fields optional` |
| `Required<T>` | Make all properties required | Enforce complete objects, validation | `type CompleteUser = Required<Partial<User>>;` |
| `Readonly<T>` | Make all properties immutable | Constants, frozen configs, tuples | `type ImmutableUser = Readonly<User>;` |
| `Record<K, V>` | Create key-value mapping type | Lookup tables, dictionaries, enums | `type Permissions = Record<'read' \| 'write' \| 'delete', boolean>;` |
| `Pick<T, K>` | Select specific properties | Extract subset, focused DTOs | `type UserPreview = Pick<User, 'name' \| 'email'>;` |
| `Omit<T, K>` | Exclude specific properties | Hide sensitive fields, security | `type UserDTO = Omit<User, 'password' \| 'ssn'>;` |
| `Extract<T, U>` | Extract matching types | Filter union members | `type Strings = Extract<'a' \| 1 \| 'b', string>; // 'a' \| 'b'` |
| `Exclude<T, U>` | Remove matching types | Exclude union members | `type NonStrings = Exclude<'a' \| 1 \| 'b', string>; // 1` |
| `Parameters<T>` | Get function parameter types | Reflect on function signatures | `type GetParams = Parameters<(a: string, b: number) => void>; // [string, number]` |
| `ReturnType<T>` | Get function return type | Extract return types from signatures | `type GetReturn = ReturnType<() => User>; // User` |
| `Awaited<T>` | Get Promise resolved type | Unwrap async types | `type UserData = Awaited<Promise<User>>; // User` |

### Function & Control Flow Keywords {#function--control-flow-keywords}

[↑ Back to Top](#typescript-keywords--language-features)

| Keyword | Purpose | Typical Use Cases | Real-World Example |
|---------|---------|-------------------|-------------------|
| `function` | Define function | Named functions, declarations | `function processUser(user: User): void { }` |
| `async` | Mark function as asynchronous | Promise-returning functions | `async function fetchData(): Promise<Data> { }` |
| `await` | Wait for promise resolution | Get async operation result | `const result = await service.getData();` |
| `Promise<T>` | Async operation type | Promises, callbacks, chains | `function delayedGreet(): Promise<string> { }` |
| `try/catch/finally` | Error handling | Exception management | `try { } catch (e: Error) { } finally { cleanup() }` |
| `throw` | Throw exception | Signal errors | `throw new Error("Invalid input");` |
| `yield` | Generator value | Generator functions | `function* numbers() { yield 1; yield 2; }` |
| `if/else` | Conditional logic | Type narrowing, control flow | `if (value instanceof Error) { }` |
| `switch/case` | Multi-way branching | Exhaustive checks, type guards | `switch (status) { case 'active': ... }` |
| `for/while` | Loop structures | Iteration, array processing | `for (const item of items) { }` |
| `return` | Return from function | Exit function, return value | `return result satisfies User;` |

### Class & OOP Keywords {#class--oop-keywords}

[↑ Back to Top](#typescript-keywords--language-features)

| Keyword | Purpose | Typical Use Cases | Real-World Example |
|---------|---------|-------------------|-------------------|
| `public` | Publicly accessible (default) | API methods, visible properties | `public getName(): string { return this.name; }` |
| `private` | Private to class only | Encapsulation, internal state | `private _cache: Map<string, Data>;` |
| `protected` | Accessible in subclasses | Base class functionality, inheritance | `protected onInit(): void { }` |
| `readonly` | Cannot be reassigned | Immutable properties, constants | `readonly id: string = uuid();` |
| `static` | Class-level member | Shared across instances, factories | `static create(name: string): User { }` |
| `abstract` | Abstract class/method | Force implementation in subclasses | `abstract class Animal { abstract bark(): void; }` |
| `extends` | Inherit from class | Class inheritance, mixins | `class Admin extends User { }` |
| `implements` | Implement interface | Contract enforcement | `class UserService implements IUserService { }` |
| `constructor` | Class constructor | Initialize objects | `constructor(public name: string) { }` |
| `get/set` | Property accessors | Computed properties, validation | `get email(): string { return this._email; }` |
| `super` | Parent class reference | Call parent methods, constructors | `super.init(); super.onDispose();` |

### Module & Namespace Keywords {#module--namespace-keywords}

[↑ Back to Top](#typescript-keywords--language-features)

| Keyword | Purpose | Typical Use Cases | Real-World Example |
|---------|---------|-------------------|-------------------|
| `import` | Import modules/types | Load dependencies, types | `import { User } from './types'; import type { Config } from './config';` |
| `export` | Export modules/types | Public API, re-exports | `export class Service { }; export type UserId = number;` |
| `from` | Module path specifier | Specify import source | `import Service from './service.js';` |
| `as` | Rename imports/exports | Avoid naming conflicts | `import { Service as UserService } from './service';` |
| `default` | Default export | Primary module export | `export default class User { }` |
| `namespace` | Code organization (legacy) | Organize large codebases | `namespace Auth { export class Manager { } }` |
| `type` | Type-only import (TS 5.0+) | Import only types, reduce bundle | `import type { User } from './types';` |

---

## TypeScript in M365 Platforms {#typescript-in-m365-platforms}

[↑ Back to Top](#top)

Complete guide to TypeScript implementation across Microsoft 365 platforms with setup instructions, tools, and examples.

### SharePoint Framework (SPFx)

[↑ Back to Top](#typescript-in-m365-platforms)

#### Overview

[↑ Back to Top](#sharepoint-framework-spfx)

SharePoint Framework is Microsoft's modern client-side development platform for building SharePoint Online solutions with TypeScript, React, and web standards.

**Technology Stack**:
- **Language**: TypeScript 5.8+
- **Runtime**: Node.js v22.x LTS
- **Package Manager**: npm 11.x
- **Build Tool**: Heft v1.3+
- **Module Bundler**: Webpack 5.x
- **Framework**: React 16-18 or vanilla TypeScript

#### Getting Started - SPFx

[↑ Back to Top](#sharepoint-framework-spfx)

**Step 1: Install Prerequisites**
```powershell
# Install Node.js v22 LTS
node --version    # v22.x.x
npm --version     # 11.x.x

# Install global tools
npm install --global @rushstack/heft yo @microsoft/generator-sharepoint

# Install TypeScript globally (optional)
npm install --global typescript
tsc --version     # 5.8.x or higher
```

**Step 2: Create SPFx Project**
```powershell
mkdir my-spfx-project
cd my-spfx-project

# Generate project
yo @microsoft/sharepoint

# Answer prompts:
# - Solution name: my-spfx-solution
# - Baseline packages version: Use latest
# - Framework: React (recommended)
# - Features: Web part
```

**Step 3: Install Dependencies**
```powershell
npm install
npm install --save-dev typescript@5.8.x
```

**Step 4: Start Development Server**
```powershell
heft start

# Navigate to:
# https://[tenant].sharepoint.com/sites/[site]/_layouts/15/workbench.aspx
```

**Step 5: Build & Package**
```powershell
# Development build
heft build

# Production build
heft build --production

# Package solution
npm run package-solution
```

#### SPFx Project Structure

[↑ Back to Top](#sharepoint-framework-spfx)

```
my-spfx-solution/
├── sharepoint/
│   └── assets/
│       └── elements.xml
├── src/
│   ├── webparts/
│   │   └── myWebPart/
│   │       ├── MyWebPartWebPart.ts
│   │       ├── MyWebPartWebPart.manifest.json
│   │       ├── components/
│   │       │   ├── MyWebPart.tsx
│   │       │   └── MyWebPart.module.scss
│   │       └── loc/
│   │           └── en-us.js
│   └── index.ts
├── config/
│   ├── config.json
│   ├── copy-assets.json
│   ├── deploy-azure-storage.json
│   ├── package-solution.json
│   └── serve.json
├── heft.json
├── tsconfig.json
├── package.json
└── README.md
```

#### SPFx Code Example - React Web Part

[↑ Back to Top](#sharepoint-framework-spfx)

```typescript
import * as React from 'react';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { Version } from '@microsoft/sp-core-library';
import * as ReactDOM from 'react-dom';
import MyWebPart from './components/MyWebPart';

export interface IMyWebPartProps {
  title: string;
  description: string;
}

export default class MyWebPartWebPart extends BaseClientSideWebPart<IMyWebPartProps> {
  protected onInit(): Promise<void> {
    console.log('Web part initialized');
    return super.onInit();
  }

  public render(): void {
    const element: React.ReactElement<IMyWebPartProps> = React.createElement(
      MyWebPart,
      {
        title: this.properties.title,
        description: this.properties.description
      }
    );

    this.domElement.innerHTML = '';
    const root = ReactDOM.createRoot(this.domElement);
    root.render(element);
  }

  protected onDispose(): void {
    super.onDispose();
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: { description: 'Web Part Settings' },
          groups: [
            {
              groupName: 'Display Settings',
              groupFields: [
                PropertyPaneTextField('title', {
                  label: 'Web Part Title'
                }),
                PropertyPaneTextField('description', {
                  label: 'Description'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
```

#### SPFx Essential Packages

[↑ Back to Top](#sharepoint-framework-spfx)

| Package | Version | Purpose | Usage |
|---------|---------|---------|-------|
| `@microsoft/sp-webpart-base` | 1.22+ | Web part base class | Extend for all web parts |
| `@microsoft/sp-core-library` | 1.22+ | Core utilities, Version | Application utilities |
| `@microsoft/sp-property-pane` | 1.22+ | Property pane controls | Configuration UI |
| `@microsoft/sp-http` | 1.22+ | SPHttpClient for REST | SharePoint API calls |
| `@pnp/sp` | v3+ | PnP JavaScript library | Modern SharePoint API |
| `@pnp/graph` | v3+ | Microsoft Graph SDK | Graph API calls |
| `react` | 17-18 | UI framework | Component development |
| `@fluentui/react` | v8+ | Fluent UI components | Professional UI |

#### SPFx Useful URLs

[↑ Back to Top](#sharepoint-framework-spfx)

- Official Docs: https://learn.microsoft.com/en-us/sharepoint/dev/spfx/
- Setup Guide: https://learn.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-development-environment
- Heft Build Tool: https://rushstack.io/pages/heft/overview/
- PnP Samples: https://github.com/pnp/sp-dev-fx-webparts
- Training: https://learn.microsoft.com/en-us/training/paths/develop-sharepoint-framework/

---

### Power Apps Code Components (PCF)

[↑ Back to Top](#typescript-in-m365-platforms)

#### Overview

[↑ Back to Top](#power-apps-code-components-pcf)

Power Apps Code Components (PCF) let you build custom controls for Canvas Apps and Model-driven Apps using TypeScript and modern web standards.

**Technology Stack**:
- **Language**: TypeScript 5.8+
- **Runtime**: Node.js v22.x
- **Package Manager**: npm 11.x
- **Build Tool**: Heft 1.3+
- **CLI Tool**: Power Apps CLI (pac)

#### Getting Started - PCF

[↑ Back to Top](#power-apps-code-components-pcf)

**Step 1: Install Prerequisites**
```powershell
# Install Node.js v22
node --version    # v22.x.x

# Install Power Apps CLI
npm install --global @microsoft/pac
pac --version

# Verify installation
npm list --global @microsoft/pac
```

**Step 2: Authenticate to Power Apps**
```powershell
# Create authentication profile
pac auth create --url https://[org].crm.dynamics.com

# Verify authentication
pac auth whoami
```

**Step 3: Create PCF Project**
```powershell
mkdir MyCustomControl
cd MyCustomControl

# Initialize PCF project
pac pcf init --namespace MyCompany --name LinearSlider --template field

# Install dependencies
npm install
npm install --save-dev typescript@5.8.x
```

**Step 4: Build Component**
```powershell
# Development build
npm run build

# Production build (minified)
npm run build -- --production

# Watch mode
npm run start
```

**Step 5: Test Locally**
```powershell
# Start test harness
npm start

# Browser opens to: http://localhost:3000/test-harness
```

**Step 6: Deploy Component**
```powershell
# Generate solution package
npm run build -- --production

# Create data verse solution
pac solution init --publisher-name MyPublisher --publisher-prefix mycomp

# Add component to solution
pac solution add-reference --path .

# Create zip
pac solution pack --solution-name MySolution

# Upload and publish in Power Apps
```

#### PCF Component Structure

[↑ Back to Top](#power-apps-code-components-pcf)

```
MyCustomControl/
├── index.ts
├── ControlManifest.Input.xml
├── css/
│   └── LinearSlider.css
├── generated/
│   └── ManifestTypes.d.ts
├── config/
│   └── strings/
│       └── MyCustomControl.1033.resx
├── test-harness/
│   ├── index.html
│   └── index.ts
├── package.json
└── tsconfig.json
```

#### PCF Code Example - Linear Slider

[↑ Back to Top](#power-apps-code-components-pcf)

```typescript
import { IInputs, IOutputs } from './generated/ManifestTypes';

export class LinearSlider implements ComponentFramework.StandardControl<IInputs, IOutputs> {
  private container: HTMLDivElement;
  private sliderElement: HTMLInputElement;
  private context: ComponentFramework.Context<IInputs>;
  private notifyOutputChanged: () => void;
  private currentValue: number = 50;

  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary,
    container: HTMLDivElement
  ): void {
    this.context = context;
    this.notifyOutputChanged = notifyOutputChanged;
    this.container = container;

    // Create slider input
    this.sliderElement = document.createElement('input');
    this.sliderElement.type = 'range';
    this.sliderElement.min = context.parameters.minValue.raw?.toString() || '0';
    this.sliderElement.max = context.parameters.maxValue.raw?.toString() || '100';
    this.sliderElement.value = context.parameters.value.raw?.toString() || '50';
    this.sliderElement.className = 'ts-slider';

    // Event listeners
    this.sliderElement.addEventListener('input', () => {
      this.currentValue = parseInt(this.sliderElement.value, 10);
      this.notifyOutputChanged();
    });

    this.container.appendChild(this.sliderElement);
  }

  public updateView(context: ComponentFramework.Context<IInputs>): void {
    this.sliderElement.value = context.parameters.value.raw?.toString() || '50';
  }

  public getOutputs(): IOutputs {
    return {
      value: this.currentValue
    };
  }

  public destroy(): void {
    this.sliderElement?.removeEventListener('input', () => {});
  }
}
```

#### PCF Manifest Example

[↑ Back to Top](#power-apps-code-components-pcf)

```xml
<?xml version="1.0" encoding="utf-8" ?>
<manifest>
  <control namespace="MyCompany" constructor="LinearSlider" version="1.0.0" display-name-key="Linear Slider Control">
    <property 
      name="value" 
      display-name-key="Value" 
      of-type="Whole.None" 
      usage="bound" 
      required="true" />
    
    <property 
      name="minValue" 
      display-name-key="Minimum Value" 
      of-type="Whole.None" 
      usage="input" 
      required="false" />
    
    <property 
      name="maxValue" 
      display-name-key="Maximum Value" 
      of-type="Whole.None" 
      usage="input" 
      required="false" />

    <resources>
      <code path="index.ts" order="1" />
      <css path="css/LinearSlider.css" order="1" />
    </resources>
  </control>
</manifest>
```

#### PCF Essential Packages

[↑ Back to Top](#power-apps-code-components-pcf)

| Package | Version | Purpose |
|---------|---------|---------|
| `pcf-scripts` | 1.22+ | PCF build scripts |
| `pcf-start` | 1.22+ | PCF dev server |
| `@types/node` | 18+ | Node.js type definitions |
| `typescript` | 5.8+ | TypeScript compiler |

#### PCF Useful URLs

[↑ Back to Top](#power-apps-code-components-pcf)

- PCF Framework: https://learn.microsoft.com/en-us/power-apps/developer/component-framework/overview
- API Reference: https://learn.microsoft.com/en-us/power-apps/developer/component-framework/reference/
- Samples: https://github.com/microsoft/PowerApps-Samples/tree/master/component-framework
- Canvas Apps: https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/

---

### Power Apps Canvas Apps

[↑ Back to Top](#typescript-in-m365-platforms)

#### Overview

[↑ Back to Top](#power-apps-canvas-apps)

TypeScript is used in Canvas Apps primarily through:
- Power Apps Code Components (PCF) for custom controls
- Power Automate flows triggered by canvas apps
- Azure Functions called from canvas apps

#### Getting Started - Canvas Apps with TypeScript

[↑ Back to Top](#power-apps-canvas-apps)

**Approach 1: Use Power Apps Code Components**
1. Build PCF component (see PCF section above)
2. Deploy to data verse
3. Add to canvas app
4. Configure properties in app designer

**Approach 2: Integrate with Azure Functions**
```typescript
// Azure Function triggered from Power Apps
import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const canvasAppData = req.body;
    
    // Process data
    const processedData = {
        id: canvasAppData.id,
        name: canvasAppData.name.toUpperCase(),
        processed: true,
        timestamp: new Date().toISOString()
    };

    context.res = {
        body: processedData,
        status: 200
    };
};

export default httpTrigger;
```

#### Canvas Apps Useful URLs

[↑ Back to Top](#power-apps-canvas-apps)

- Canvas Apps Docs: https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/
- Power Automate: https://learn.microsoft.com/en-us/power-automate/
- Azure Functions Integration: https://learn.microsoft.com/en-us/azure/azure-functions/

---

### Microsoft Teams Applications

[↑ Back to Top](#typescript-in-m365-platforms)

#### Overview

[↑ Back to Top](#microsoft-teams-applications)

TypeScript enables building:
- **Teams Bots**: Conversational AI and automation
- **Teams Tabs**: Web-based experiences in Teams
- **Message Extensions**: Search and compose actions
- **Webhooks**: Incoming and outgoing integrations

#### Getting Started - Teams Bot

[↑ Back to Top](#microsoft-teams-applications)

```powershell
# Install Bot Framework CLI
npm install --global @microsoft/botbuilder

# Create bot project
npx @microsoft/generator-teams

# Install dependencies
npm install

# Start bot locally
npm start
```

#### Teams Bot Code Example

[↑ Back to Top](#microsoft-teams-applications)

```typescript
import { 
    CloudAdapter, 
    ConfigurationBotFrameworkAuthentication,
    ActivityHandler,
    MessageFactory,
    TurnContext,
    ConversationState,
    UserState
} from 'botbuilder';

export class TeamsBot extends ActivityHandler {
    private conversationState: ConversationState;
    private userState: UserState;

    constructor(conversationState: ConversationState, userState: UserState) {
        super();
        this.conversationState = conversationState;
        this.userState = userState;

        // Handle incoming messages
        this.onMessage(async (context, next) => {
            const userMessage = context.activity.text;
            const replyText = `Echo: ${userMessage}`;
            
            await context.sendActivity(MessageFactory.text(replyText));
            await next();
        });

        // Handle members added
        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            for (const member of membersAdded) {
                if (member.id !== context.activity.recipient.id) {
                    await context.sendActivity(
                        MessageFactory.text('Welcome to Teams Bot!')
                    );
                }
            }
            await next();
        });
    }

    protected async onTeamsVerificationInvoke(context: TurnContext): Promise<any> {
        const challenge = context.activity.value.challenge;
        return { status: 200, body: challenge };
    }
}
```

#### Teams Applications Useful URLs

[↑ Back to Top](#microsoft-teams-applications)

- Teams Development: https://learn.microsoft.com/en-us/microsoftteams/platform/
- Bot Framework: https://dev.botframework.com/
- Teams JavaScript SDK: https://github.com/OfficeDev/microsoft-teams-library-js
- Teams Samples: https://github.com/OfficeDev/TeamsFx-Samples

---

### Office Add-ins

[↑ Back to Top](#typescript-in-m365-platforms)

#### Overview

[↑ Back to Top](#office-add-ins)

Office Add-ins extend Excel, Word, Outlook, and PowerPoint with TypeScript-based solutions.

#### Getting Started - Excel Add-in

[↑ Back to Top](#office-add-ins)

```powershell
# Install Yeoman generator
npm install --global yo generator-office

# Create project
yo office

# Follow prompts for Excel add-in

# Install dependencies
npm install

# Start dev server
npm start
```

#### Excel Add-in Code Example

[↑ Back to Top](#office-add-ins)

```typescript
Office.onReady((reason) => {
    if (reason === Office.initialize.Reason.Succeeded) {
        document.getElementById("run").onclick = run;
    }
});

async function run() {
    try {
        await Excel.run(async (context) => {
            const sheet = context.workbook.worksheets.getActiveWorksheet();
            
            // Add data to cells
            const range = sheet.getRange("A1:C3");
            range.values = [
                ["Product", "Quantity", "Price"],
                ["Laptop", 5, 1000],
                ["Monitor", 10, 300]
            ];

            // Format header row
            const headerRow = sheet.getRange("A1:C1");
            headerRow.format.font.bold = true;
            headerRow.format.fill.color = "4472C4";
            headerRow.format.font.color = "FFFFFF";

            await context.sync();
        });
    } catch (error) {
        console.error(error);
    }
}
```

#### Office Add-ins Useful URLs

[↑ Back to Top](#office-add-ins)

- Add-ins Guide: https://learn.microsoft.com/en-us/office/dev/add-ins/
- Office JavaScript API: https://learn.microsoft.com/en-us/javascript/api/overview/office
- Samples: https://github.com/OfficeDev/Office-Add-in-samples

---

### Azure Functions & Dataverse

[↑ Back to Top](#typescript-in-m365-platforms)

#### Overview

[↑ Back to Top](#azure-functions--dataverse)

Use TypeScript with Azure Functions to:
- Process data from Dataverse
- Integrate with M365 services
- Handle webhooks and events
- Build serverless workflows

#### Getting Started - Azure Functions

[↑ Back to Top](#azure-functions--dataverse)

```powershell
# Install Azure Functions CLI
npm install --global azure-functions-core-tools@4

# Create project
func init MyFunctionApp --typescript

# Create HTTP triggered function
func new --name MyFunction --template "HTTP trigger"

# Install dependencies
npm install

# Start locally
func start

# Deploy to Azure
func azure functionapp publish [app-name]
```

#### Dataverse Integration Example

[↑ Back to Top](#azure-functions--dataverse)

```typescript
import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { Client } from "@microsoft/microsoft-graph-client";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    try {
        // Get Dataverse records via Graph API
        const client = Client.init({
            authProvider: async (done) => {
                const token = await getAccessToken();
                done(null, token);
            }
        });

        // Query Dataverse (using Graph API)
        const records = await client.api("/me/extensions").get();

        context.res = {
            status: 200,
            body: {
                message: "Data processed successfully",
                recordCount: records.value?.length || 0,
                timestamp: new Date().toISOString()
            }
        };
    } catch (error) {
        context.res = {
            status: 500,
            body: { error: (error as Error).message }
        };
    }
};

async function getAccessToken(): Promise<string> {
    // Implementation depends on authentication method
    // Use Managed Identity for Azure-hosted functions
    return "token";
}

export default httpTrigger;
```

#### Azure Functions Useful URLs

[↑ Back to Top](#azure-functions--dataverse)

- Functions Guide: https://learn.microsoft.com/en-us/azure/azure-functions/
- Node.js Developer Guide: https://learn.microsoft.com/en-us/azure/azure-functions/functions-reference-node
- Dataverse Integration: https://learn.microsoft.com/en-us/power-apps/developer/data-platform/

---

## Getting Started Guide {#getting-started-guide}

[↑ Back to Top](#top)

### Prerequisites

[↑ Back to Top](#getting-started-guide)

✅ **Required**:
- Node.js v22 LTS (includes npm 11.x)
- Visual Studio Code or Visual Studio 2022
- TypeScript 5.8+

✅ **For GCC Standard**:
- Approved network proxy (407 authentication)
- Internal npm registry access
- Git configured for internal servers

### Development Environment Setup

[↑ Back to Top](#getting-started-guide)

**Step 1: Install Node.js v22**
```powershell
# Download from https://nodejs.org
# Verify installation
node --version    # Should be v22.x.x
npm --version     # Should be 11.x.x
```

**Step 2: Install Visual Studio Code Extensions**
```
- TypeScript (built-in)
- ES7+ React/Redux/React-Native snippets
- Prettier Code Formatter
- ESLint
- Rest Client
```

**Step 3: Configure Git (GCC Standard)**
```powershell
git config --global user.name "Your Name"
git config --global user.email "your.email@agency.gov"
git config --global http.proxy http://[proxy]:407
git config --global https.proxy http://[proxy]:407
```

**Step 4: Configure npm (GCC Standard)**
```powershell
npm config set registry https://internal-npm-mirror.agency.gov/npm/
npm config set strict-ssl true
npm config set proxy http://[proxy]:407
npm config set https-proxy http://[proxy]:407
```

---

## GCC Standard Considerations {#gcc-standard-considerations}

[↑ Back to Top](#top)

### What is GCC Standard?

[↑ Back to Top](#gcc-standard-considerations)

Government Community Cloud Standard is a secure US government cloud environment with:
- **407 Proxy Authentication** for all external connections
- **No direct internet access** - internal registries only
- **SSL/TLS inspection** on all traffic
- **Restricted API access** to approved services
- **Whitelist-based package management**

### Networking Configuration

[↑ Back to Top](#gcc-standard-considerations)

#### npm Configuration

[↑ Back to Top](#gcc-standard-considerations)

```powershell
# Set internal npm registry
npm config set registry https://internal-npm-mirror.agency.gov/npm/

# Configure proxy authentication
npm config set proxy http://[username]:[password]@[proxy]:407
npm config set https-proxy http://[username]:[password]@[proxy]:407

# Configure SSL
npm config set strict-ssl true
npm config set ca-file C:\certs\internal-ca.crt

# Install with audit disabled for speed
npm install --no-audit
```

#### Git Configuration

[↑ Back to Top](#gcc-standard-considerations)

```powershell
# Configure proxy
git config --global http.proxy http://[proxy]:407
git config --global https.proxy http://[proxy]:407
git config --global http.proxyAuthMethod basic

# Use internal Git server
git config --global url."https://internal-git-server.agency.gov/".insteadOf "https://github.com/"

# SSL verification with internal CA
git config --global http.sslVerify true
git config --global http.sslCAInfo "C:\certs\internal-ca.crt"
```

#### PowerShell Configuration for GCC

[↑ Back to Top](#gcc-standard-considerations)

```powershell
# Set proxy for all PowerShell operations
$proxy = New-Object System.Net.WebProxy("http://[proxy]:407")
$proxy.UseDefaultCredentials = $true
[System.Net.ServicePointManager]::DefaultWebProxy = $proxy

# For .NET operations
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.SecurityProtocolType]::Tls12

# Verify connectivity
Invoke-WebRequest -Uri "https://internal-npm-mirror.agency.gov" -UseDefaultCredentials
```

### Approved Packages for GCC

[↑ Back to Top](#gcc-standard-considerations)

| Package | Version | Status | GCC Notes |
|---------|---------|--------|-----------|
| `typescript` | 5.8+ | ✅ Pre-approved | Core language |
| `@microsoft/sp-*` | 1.22+ | ✅ Pre-approved | SPFx packages |
| `@pnp/sp` | v3+ | ✅ Pre-approved | PnP library |
| `react` | 17-18 | ✅ Pre-approved | UI framework |
| `@fluentui/react` | v8+ | ✅ Pre-approved | UI components |
| `axios` | v1+ | ✅ Pre-approved | HTTP client |
| `lodash` | v4+ | ✅ Pre-approved | Utility library |
| `date-fns` | v2+ | ✅ Pre-approved | Date library |

### GCC Best Practices

[↑ Back to Top](#gcc-standard-considerations)

1. **Use pinned versions** in package.json (no `^` or `~`)
2. **Request package approval** before new dependencies
3. **Audit dependencies** with `npm audit --production`
4. **Use Managed Identity** for Azure authentication
5. **Encrypt secrets** with Azure Key Vault
6. **Monitor supply chain** for vulnerabilities
7. **Document all approvals** for compliance

---

## Essential Libraries & Packages {#essential-libraries--packages}

[↑ Back to Top](#top)

### Core TypeScript

[↑ Back to Top](#essential-libraries--packages)

```json
{
  "devDependencies": {
    "typescript": "5.8.2",
    "@types/node": "20.10.0",
    "ts-node": "10.9.1"
  }
}
```

### SharePoint & M365

[↑ Back to Top](#essential-libraries--packages)

```json
{
  "dependencies": {
    "@microsoft/sp-webpart-base": "1.23.0",
    "@microsoft/sp-core-library": "1.23.0",
    "@pnp/sp": "3.20.0",
    "@pnp/graph": "3.20.0",
    "@microsoft/microsoft-graph-client": "3.0.7"
  }
}
```

### UI & Utilities

[↑ Back to Top](#essential-libraries--packages)

```json
{
  "dependencies": {
    "react": "18.2.0",
    "@fluentui/react": "8.115.0",
    "lodash": "4.17.21",
    "axios": "1.6.2",
    "date-fns": "2.30.0"
  }
}
```

---

## GitHub Repositories {#github-repositories}

[↑ Back to Top](#top)

### Official Microsoft Repositories

[↑ Back to Top](#github-repositories)

| Repository | Type | URL |
|---|---|---|
| SP Dev FX WebParts | SPFx Samples | https://github.com/pnp/sp-dev-fx-webparts |
| PowerApps Samples | PCF Components | https://github.com/microsoft/PowerApps-Samples |
| Teams Samples | Teams Apps | https://github.com/OfficeDev/TeamsFx-Samples |
| Office Add-in Samples | Office Add-ins | https://github.com/OfficeDev/Office-Add-in-samples |
| Microsoft Graph SDK | Graph API | https://github.com/microsoftgraph/msgraph-sdk-javascript |

### PnP Community Repositories

[↑ Back to Top](#github-repositories)

- PnP JS Library: https://github.com/pnp/pnpjs
- PnP Modern Search: https://github.com/microsoft-search/pnp-modern-search
- PnP Generator: https://github.com/pnp/generator-pnp

---

## Technical Cheat Sheet {#technical-cheat-sheet}

[↑ Back to Top](#top)

### TypeScript Patterns

[↑ Back to Top](#technical-cheat-sheet)

```typescript
// Union Types
type Status = 'active' | 'inactive' | 'pending';

// Intersection
type Admin = User & { isAdmin: true };

// Generics
function first<T>(arr: T[]): T { return arr[0]; }

// Type Guard
function isUser(obj: any): obj is User { 
  return obj.name !== undefined; 
}

// Conditional Types
type IsString<T> = T extends string ? true : false;

// Mapped Types
type Readonly<T> = { readonly [K in keyof T]: T[K] };

// Utility Types
type Partial<T> = { [K in keyof T]?: T[K] };
type Pick<T, K> = { [P in K]: T[P] };
type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
```

### Common Commands

[↑ Back to Top](#technical-cheat-sheet)

```powershell
# TypeScript compilation
tsc                                    # Compile all
tsc --watch                           # Watch mode
tsc --strict                          # Strict mode
tsc --noEmit                          # Check only

# npm commands
npm init -y                           # New project
npm install                           # Install deps
npm install --global [package]        # Global install
npm audit                             # Check security
npm run build                         # Run script
npm publish                           # Publish to registry

# Node.js version management
nvm list                              # List versions
nvm install 22.0.0                    # Install v22
nvm use 22.0.0                        # Switch version
```

### tsconfig.json Essentials

[↑ Back to Top](#technical-cheat-sheet)

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM"],
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
  "exclude": ["node_modules", "dist"]
}
```

---

## Glossary of Terms {#glossary-of-terms}

[↑ Back to Top](#top)

| Term | Definition |
|------|-----------|
| **TypeScript** | Typed superset of JavaScript with compile-time type checking |
| **Type Annotation** | Explicit type declaration (e.g., `let x: string`) |
| **Interface** | Contract defining object structure and behavior |
| **Generic** | Reusable type that works with multiple data types |
| **Union Type** | Type that can be one of several types (`\|` operator) |
| **Intersection** | Combination of multiple types (`&` operator) |
| **Type Guard** | Function that narrows type in conditionals |
| **Literal Type** | Type matching specific string/number/boolean value |
| **Never Type** | Type with no possible values (impossible type) |
| **Any Type** | Disable type checking (avoid in production) |
| **SPFx** | SharePoint Framework - Microsoft's client-side development platform |
| **PCF** | Power Apps Code Components - custom controls for Power Apps |
| **Canvas App** | Power Apps built with drag-and-drop visual editor |
| **Dataverse** | Microsoft's unified data platform (formerly Common Data Service) |
| **GCC** | Government Community Cloud - secure US government environment |
| **Node.js** | JavaScript runtime for server-side execution |
| **npm** | Node Package Manager - dependency management |
| **Heft** | Modern build tool orchestrating TypeScript, Webpack, testing |
| **Webpack** | Module bundler for JavaScript applications |
| **Proxy (407)** | HTTP proxy requiring authentication in GCC environments |
| **Manifest** | JSON/XML file defining component metadata |
| **Async** | Asynchronous function returning Promise |
| **Promise** | Object representing eventual async operation completion |
| **Decorator** | Metadata annotation modifying class/method behavior |
| **Enum** | Named set of constants |
| **Abstract** | Cannot be instantiated directly, only extended |
| **Readonly** | Property cannot be reassigned after initialization |

---

## Helpful URLs & Resources {#helpful-urls--resources}

[↑ Back to Top](#top)

### Official TypeScript

[↑ Back to Top](#helpful-urls--resources)

- TypeScript Handbook: https://www.typescriptlang.org/docs/
- TypeScript Playground: https://www.typescriptlang.org/play
- Release Notes: https://www.typescriptlang.org/docs/handbook/release-notes/
- GitHub: https://github.com/microsoft/TypeScript

### SharePoint Framework

[↑ Back to Top](#helpful-urls--resources)

- SPFx Overview: https://learn.microsoft.com/en-us/sharepoint/dev/spfx/
- Setup Guide: https://learn.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-development-environment
- Web Part Tutorial: https://learn.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/
- PnP Library: https://pnp.github.io/pnpjs/

### Power Apps & PCF

[↑ Back to Top](#helpful-urls--resources)

- Power Apps Docs: https://learn.microsoft.com/en-us/power-apps/
- PCF Development: https://learn.microsoft.com/en-us/power-apps/developer/component-framework/
- Dataverse: https://learn.microsoft.com/en-us/power-apps/developer/data-platform/

### Microsoft Teams

[↑ Back to Top](#helpful-urls--resources)

- Teams Platform: https://learn.microsoft.com/en-us/microsoftteams/platform/
- Bot Framework: https://dev.botframework.com/
- Teams JS SDK: https://github.com/OfficeDev/microsoft-teams-library-js

### Office Add-ins

[↑ Back to Top](#helpful-urls--resources)

- Add-ins Guide: https://learn.microsoft.com/en-us/office/dev/add-ins/
- Office JS API: https://learn.microsoft.com/en-us/javascript/api/overview/office
- Samples: https://github.com/OfficeDev/Office-Add-in-samples

### Azure & Cloud

[↑ Back to Top](#helpful-urls--resources)

- Azure Functions: https://learn.microsoft.com/en-us/azure/azure-functions/
- Microsoft Graph: https://learn.microsoft.com/en-us/graph/
- Graph Explorer: https://developer.microsoft.com/en-us/graph/graph-explorer

### Learning & Community

[↑ Back to Top](#helpful-urls--resources)

- Microsoft Learn: https://learn.microsoft.com/en-us/
- Stack Overflow TypeScript: https://stackoverflow.com/questions/tagged/typescript
- Dev.to: https://dev.to/t/typescript
- Reddit: https://reddit.com/r/typescript

### Tools

[↑ Back to Top](#helpful-urls--resources)

- VS Code: https://code.visualstudio.com/
- Node.js: https://nodejs.org/
- npm Registry: https://www.npmjs.com/
- GitHub: https://github.com/

---

**Last Updated**: October 1, 2026  
**TypeScript Version**: 5.8+  
**Node.js Version**: 22.x LTS  
**For**: M365 Development in GCC Standard Environments  
**Platforms Covered**: SPFx, PCF, Canvas Apps, Teams, Office Add-ins, Azure Functions
