# TypeScript Comprehensive Guide for M365 Development {#top}

## Executive Summary

This comprehensive guide covers TypeScript (v5.8+) development across Microsoft 365 applications, with emphasis on SharePoint Framework (SPFx) and Power Apps Code Components (PCF). Designed for government GCC Standard environments with proxy authentication constraints.

**Key Points:**
- TypeScript provides compile-time type checking for JavaScript
- SPFx v1.22+ uses Heft-based toolchain (faster, simpler than Gulp)
- Power Apps PCF enables custom component creation with TypeScript
- GCC Standard requires internal package registries and proxy configuration
- All code examples use current best practices (2026 standards)

**Audience:** Developers with JavaScript knowledge, new to TypeScript and M365 development

**Time to Learn:** 2-4 hours for fundamentals; 1-2 weeks for complete proficiency

---

## Table of Contents

### Main Sections
1. [TypeScript Fundamentals](#typescript-fundamentals)
2. [TypeScript Keywords & Features](#typescript-keywords--features)
   - 2.1 [Basic Type Keywords](#basic-type-keywords)
   - 2.2 [Generic Keywords](#generic-keywords)
   - 2.3 [Control Flow Keywords](#control-flow-keywords)
   - 2.4 [Advanced Type Keywords](#advanced-type-keywords)
3. [Type System Overview](#type-system-overview)
   - 3.1 [Basic Types](#basic-types)
   - 3.2 [Advanced Types](#advanced-types)
   - 3.3 [Type Guards](#type-guards)
4. [TypeScript in M365 Applications](#typescript-in-m365-applications)
5. [Detailed M365 Application Guides](#detailed-m365-application-guides)
   - 5.1 [SharePoint Framework (SPFx)](#1-sharepoint-framework-spfx)
   - 5.2 [Power Apps Code Components (PCF)](#2-power-apps-code-components-pcf)
   - 5.3 [Other M365 Applications](#3-other-m365-typescript-applications)
6. [Getting Started Guide](#getting-started-guide)
   - 6.1 [Step-by-Step Setup](#step-by-step-setup)
7. [GCC Standard Considerations](#gcc-standard-considerations)
8. [Common Libraries & Resources](#common-libraries--resources)
9. [Technical Cheat Sheet](#technical-cheat-sheet)
10. [Glossary of Terms](#glossary-of-terms)
11. [Helpful URLs & Resources](#helpful-urls--resources)

---

## TypeScript Fundamentals {#typescript-fundamentals}

[↑ Back to Top](#top)

**What is TypeScript?**
- Superset of JavaScript that adds static type checking
- Compiles to plain JavaScript (all types erased at runtime)
- Provides excellent IDE support and error catching
- Maintains JavaScript compatibility

**Key Benefits:**
- ✅ Catch errors at compile time, not runtime
- ✅ Self-documenting code through type annotations
- ✅ Superior intellisense and autocomplete
- ✅ Safe refactoring across large codebases
- ✅ Better performance through type-based optimizations

---

## TypeScript Keywords & Features {#typescript-keywords--features}

[↑ Back to Top](#top)

### Basic Type Keywords {#basic-type-keywords}

[↑ Back to Top](#typescript-keywords--features)

| Keyword | Purpose | Example | Usage |
|---------|---------|---------|-------|
| `type` | Create a type alias | `type User = { name: string }` | Define reusable type | 
| `interface` | Define object shape | `interface IUser { name: string }` | Contract/structure definition |
| `enum` | Named set of constants | `enum Color { Red, Green, Blue }` | Named value sets |
| `class` | Object-oriented class | `class User { name: string }` | OOP patterns, component classes |
| `namespace` | Organize code scope | `namespace Company { }` | Module organization (less common in modern TS) |
| `module` | Legacy namespace | `module Company { }` | Deprecated—use ES6 modules |
| `declare` | Ambient type declaration | `declare var jQuery: any` | Define types for external libraries |
| `abstract` | Abstract class/method | `abstract class Animal { }` | Force implementation in subclasses |
| `readonly` | Prevent reassignment | `readonly id: string` | Immutable properties |
| `static` | Class-level member | `static create()` | Shared across all instances |
| `private` | Encapsulation | `private _value` | Hide from outside access |
| `protected` | Inheritance only | `protected method()` | Visible to subclasses only |
| `public` | Default visibility | `public method()` | Accessible everywhere (default) |
| `as` | Type assertion/cast | `value as string` | Force type casting (unsafe) |
| `is` | Type predicate | `(x): x is Type` | Custom type narrowing |
| `keyof` | Extract object keys | `keyof MyObject` | Get literal union of keys |
| `typeof` | Get type of value | `typeof variable` | Runtime type checking |
| `instanceof` | Check class instance | `obj instanceof Class` | Runtime class checking |
| `extends` | Inheritance/constraints | `class A extends B` | OOP inheritance |
| `implements` | Implement interface | `class A implements I` | Contract implementation |
| `infer` | Conditional type inference | `infer T extends Type` | Extract types in conditionals |
| `never` | Impossible type | `function fail(): never` | Unreachable code, exhaustive checks |
| `void` | No return value | `function log(): void` | Functions with no return |
| `any` | Disable type checking | `let x: any` | Escape hatch (avoid when possible) |
| `unknown` | Safe unknown type | `let x: unknown` | Type-safe version of `any` |
| `null` / `undefined` | Null types | `value: string \| null` | Null value types |

### Generic Keywords {#generic-keywords}

[↑ Back to Top](#typescript-keywords--features)

| Keyword | Purpose | Example | Usage |
|---------|---------|---------|-------|
| `<T>` | Generic type parameter | `function id<T>(x: T): T` | Reusable generic functions |
| `<T extends Type>` | Constrained generic | `<T extends string>` | Limit what types can be used |
| `<T, U>` | Multiple generics | `function map<T, U>()` | Multiple type parameters |
| `<T = Default>` | Default generic | `<T = string>` | Default type if not specified |

### Control Flow Keywords {#control-flow-keywords}

[↑ Back to Top](#typescript-keywords--features)

| Keyword | Purpose | Example | Usage |
|---------|---------|---------|-------|
| `if` / `else` | Conditional type narrowing | `if (typeof x === 'string')` | Type guards |
| `switch` / `case` | Discriminated union | `switch (shape.kind)` | Pattern matching on unions |
| `in` | Property check | `if ('prop' in obj)` | Type narrowing with property check |
| `throw` | Throw error | `throw new Error()` | Error handling |
| `try` / `catch` / `finally` | Error handling | `try { } catch (e) { }` | Exception handling |
| `await` / `async` | Asynchronous operations | `async function fetch()` | Promise handling |
| `yield` / `function*` | Generator functions | `function* gen()` | Lazy iteration |

### Advanced Type Keywords {#advanced-type-keywords}

[↑ Back to Top](#typescript-keywords--features)

| Keyword | Purpose | Example | Usage |
|---------|---------|---------|-------|
| `Partial<T>` | Make all props optional | `Partial<User>` | Partial type modification |
| `Required<T>` | Make all props required | `Required<Partial<User>>` | Force required properties |
| `Readonly<T>` | Make all props readonly | `Readonly<User>` | Immutable version |
| `Record<K, V>` | Object with keys K, values V | `Record<'a' \| 'b', string>` | Create object type |
| `Pick<T, K>` | Select subset of properties | `Pick<User, 'name'>` | Cherry-pick properties |
| `Omit<T, K>` | Remove properties | `Omit<User, 'password'>` | Exclude properties |
| `Extract<T, U>` | Extract matching types | `Extract<A \| B, B>` | Get union member |
| `Exclude<T, U>` | Remove matching types | `Exclude<A \| B, B>` | Remove union member |

---

## Type System Overview {#type-system-overview}

[↑ Back to Top](#top)

### Basic Types {#basic-types}

[↑ Back to Top](#type-system-overview)

```typescript
// Primitives
let str: string = "hello";
let num: number = 42;
let bool: boolean = true;
let sym: symbol = Symbol('id');
let big: bigint = 100n;
let nul: null = null;
let und: undefined = undefined;

// Union types (multiple types)
let value: string | number = "hello"; // Can be string OR number

// Intersection types (combine types)
type Admin = User & { adminLevel: number };

// Literal types (specific values)
let direction: "up" | "down" | "left" | "right" = "up";

// Arrays
let arr: string[] = ["a", "b"]; // Alternative: Array<string>
let tuple: [string, number] = ["hello", 42];

// Objects
let obj: { name: string; age: number } = { name: "John", age: 30 };

// Functions
type Callback = (x: number) => void;
let fn: (x: string) => string = (x) => x.toUpperCase();

// Generics (parameterized types)
function identity<T>(x: T): T { return x; }
```

### Advanced Types {#advanced-types}

[↑ Back to Top](#type-system-overview)

```typescript
// Conditional types (ternary for types)
type IsString<T> = T extends string ? true : false;
type A = IsString<"hello">; // true
type B = IsString<number>;  // false

// Mapped types (transform existing types)
type ReadOnly<T> = { readonly [K in keyof T]: T[K] };

// Template literal types (construct string types)
type Path = `/${string}`;
let route: Path = "/home";

// Discriminated unions (switch on type)
type Shape = 
  | { kind: "circle"; radius: number }
  | { kind: "square"; sideLength: number };

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle": return Math.PI * shape.radius ** 2;
    case "square": return shape.sideLength ** 2;
  }
}
```

### Type Guards {#type-guards}

[↑ Back to Top](#type-system-overview)

```typescript
// typeof guard
if (typeof x === "string") { x.toUpperCase(); }

// instanceof guard
if (obj instanceof Date) { obj.getTime(); }

// Truthiness guard
if (value) { /* value is truthy */ }

// Equality guard
if (x === y) { /* x and y are same type */ }

// Custom type guard (type predicate)
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}
```

---

## TypeScript in M365 Applications {#typescript-in-m365-applications}

[↑ Back to Top](#top)

### Overview Table {#m365-overview}

| M365 Application | TypeScript Use | Project Type | Key Files | Deployment |
|---|---|---|---|---|
| **SharePoint Framework (SPFx)** | ✅ Required | Web Parts, Extensions, Library | `.ts`, `webpart.json`, package.json | SPFx solution (.sppkg) |
| **Power Apps Code Components (PCF)** | ✅ Required | Custom controls, field components | `index.ts`, `ControlManifest.Input.xml` | Solution package (.zip) |
| **Power Automate Connectors** | ✅ Optional | Custom connector logic | Connector definitions (JSON/YAML) | Power Automate |
| **Microsoft Teams Bots** | ✅ Recommended | Bot Framework | `bot.ts`, adapters | Azure Bot Service |
| **Teams Tabs** | ✅ Common | React/Vue tabs | React `.tsx`, Vue `.ts` | Manifest + web app |
| **Office Add-ins** | ✅ Recommended | Excel, Word, Outlook | `taskpane.ts`, manifest | Office store |
| **Azure Functions** | ✅ Common | Serverless functions | `index.ts`, `function.json` | Azure |
| **Microsoft Graph SDK** | ✅ Implicit | Client-side M365 integration | GraphQL queries, SDK types | npm libraries |
| **Dataverse Extensions** | ✅ Recommended | Plugins, actions | TypeScript → JavaScript | Plugin assembly |

---

## Detailed M365 Application Guides {#detailed-m365-application-guides}

[↑ Back to Top](#top)

### 1. SharePoint Framework (SPFx) {#1-sharepoint-framework-spfx}

[↑ Back to Top](#detailed-m365-application-guides)

#### Overview
Modern client-side development platform for SharePoint Online and on-premises. Build web parts, extensions, and library components using TypeScript.

#### Setup & Installation

```powershell
# Prerequisites installed via SPFx.Start.Explain.md
# Ensure Node.js 22.x LTS, npm 11.x, Heft, Yeoman, SPFx generator

# Create SPFx project
yo @microsoft/sharepoint

# During prompt, select:
# - Solution name: "my-solution"
# - Baseline packages: Choose framework (React, Vue, or None)
# - Web part name: "HelloWorld"

# Navigate and build
cd my-solution
npm install  # If not done by generator
heft build   # Build the solution

# Start dev server
heft start   # Opens https://yourtenant.sharepoint.com/_layouts/workbench.aspx
```

#### Project Structure

```
my-solution/
├── src/
│   └── webparts/
│       └── helloWorld/
│           ├── HelloWorldWebPart.ts       # Main web part class
│           ├── HelloWorld.module.scss     # Styling
│           ├── components/
│           │   ├── HelloWorld.tsx         # React component
│           │   └── HelloWorld.module.scss # Component styles
│           ├── loc/
│           │   └── en-us.js              # Localization strings
│           └── HelloWorldWebPart.manifest.json # Web part manifest
├── config/
│   ├── build.json                        # Build config
│   ├── deploy-azure-storage.json         # CDN config
│   ├── package-solution.json              # Solution packaging
│   └── serve.json                         # Dev server config
├── gulpfile.js                           # Legacy (SPFx v1.21 and earlier)
├── .heft/
│   └── config/                           # Heft configuration (SPFx v1.22+)
├── tsconfig.json                         # TypeScript config
├── package.json                          # Dependencies
└── pnpjs.config.json                     # PnP JS config (optional)
```

#### Sample Web Part Code

```typescript
// HelloWorldWebPart.ts
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import styles from './HelloWorld.module.scss';
import { HelloWorld } from './components/HelloWorld';
import { IHelloWorldProps } from './components/IHelloWorldProps';

export interface IHelloWorldWebPartProps {
  description: string;
}

export default class HelloWorldWebPart extends BaseClientSideWebPart<IHelloWorldWebPartProps> {
  protected onInit(): Promise<void> {
    // Initialize web part
    return Promise.resolve();
  }

  public render(): void {
    const element: React.ReactElement<IHelloWorldProps> = React.createElement(HelloWorld, {
      description: this.properties.description,
      context: this.context
    });

    ReactDom.render(element, this.domElement);
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [{
        header: { description: 'Configuration' },
        groups: [{
          groupName: 'Settings',
          groupFields: [
            PropertyPaneTextField('description', {
              label: 'Description',
              value: this.properties.description,
              onPropertyChange: (value) => this.onPropertyChange('description', value)
            })
          ]
        }]
      }]
    };
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }
}
```

#### Key Classes & Interfaces

| Class/Interface | Purpose |
|---|---|
| `BaseClientSideWebPart<T>` | Base class for all web parts |
| `BaseApplicationCustomizer` | Base for app customizers |
| `BaseFieldCustomizer<T>` | Base for field customizers |
| `BaseListViewCommandSet` | Base for command sets |
| `IWebPartContext` | Context object with environment info |
| `sp.web.lists` | PnP JS API for lists |
| `sp.site.rootWeb` | Root web reference |

#### Tools & Resources

| Tool | Purpose | URL | Notes |
|---|---|---|---|
| **SPFx Yeoman Generator** | Project scaffolding | npm: `@microsoft/generator-sharepoint` | `yo @microsoft/sharepoint` |
| **Heft** | Build toolchain | [rushstack.io/heft](https://rushstack.io/pages/heft/overview/) | Replaces Gulp in v1.22+ |
| **SPFx Toolkit (VS Code)** | Development assistant | [m365pnp.viva-connections-toolkit](https://marketplace.visualstudio.com/items?itemName=m365pnp.viva-connections-toolkit) | Enhanced debugging & scaffolding |
| **PnP JS Library** | Microsoft Graph & REST wrapper | [pnp.github.io/pnpjs](https://pnp.github.io/pnpjs/) | Simplified API access |
| **FAST Components** | Fluent design system | [microsoft.github.io/fast](https://www.microsoft.com/design/fluent) | UI components for SPFx |
| **Office UI Fabric** | Legacy UI library | [uifabric.io](https://uifabric.io) | Fluent design v7 (deprecated) |

#### Common NPM Packages

```json
{
  "dependencies": {
    "@microsoft/sp-core-library": "^1.22.0",
    "@microsoft/sp-webpart-base": "^1.22.0",
    "@microsoft/sp-http": "^1.22.0",
    "@pnp/sp": "^4.x.x",
    "@pnp/pnpjs": "^4.x.x",
    "react": "^18.x.x",
    "react-dom": "^18.x.x"
  },
  "devDependencies": {
    "@microsoft/sp-tslint-rules": "^1.22.0",
    "typescript": "^5.8.x"
  }
}
```

#### Getting Started Sample

**GitHub Samples:** [github.com/microsoft/SharePoint](https://github.com/microsoft/sharepoint/sp-dev-fx-webparts)

---

### 2. Power Apps Code Components (PCF) {#2-power-apps-code-components-pcf}

[↑ Back to Top](#detailed-m365-application-guides)

#### Overview
Create reusable, custom controls (component framework) for Power Apps using TypeScript. Used in model-driven apps, canvas apps, and portals.

#### Setup & Installation

```powershell
# Prerequisites
# Node.js 16+ LTS, npm 8+, .NET Build Tools, Power Platform CLI

# Install Power Platform CLI
npm install -g @microsoft/powerapps-cli

# Create component project
pac pcf init --namespace "MyCompany" --name "LinearSlider" --template field --run-npm-install

# Project opens with npm install already running
# Navigate to project folder
cd LinearSlider

# Build component
npm run build

# Start debug harness
npm start watch
```

#### Project Structure

```
LinearSlider/
├── LinearSlider/
│   ├── index.ts                      # Main component logic
│   ├── ControlManifest.Input.xml    # Component metadata/manifest
│   └── css/
│       └── LinearSlider.css          # Component styling
├── LinearSliderSolution/             # Solution package folder
│   ├── src/
│   │   └── Other/
│   │       └── Solution.xml
│   └── LinearSliderSolution.cdsproj  # Solution project file
├── generated/
│   ├── ManifestTypes.d.ts           # Auto-generated type definitions
│   └── ManifestDesignTypes.d.ts
├── out/
│   └── controls/
│       └── LinearSlider/
│           ├── bundle.js             # Bundled component
│           └── ControlManifest.xml   # Compiled manifest
├── tsconfig.json
├── package.json
└── .eslintrc.json
```

#### Sample Component Code

```typescript
// index.ts - Power Apps PCF Component
import { IInputs, IOutputs } from "./generated/ManifestTypes";

export class LinearSlider implements ComponentFramework.StandardControl<IInputs, IOutputs> {
  private _container: HTMLDivElement;
  private _context: ComponentFramework.Context<IInputs>;
  private _sliderElement: HTMLInputElement;
  private _labelElement: HTMLLabelElement;
  private _value: number = 0;
  private _notifyOutputChanged: () => void;

  constructor() {}

  /**
   * init - Initialize control instance
   */
  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary,
    container: HTMLDivElement
  ): void {
    this._context = context;
    this._notifyOutputChanged = notifyOutputChanged;
    this._container = container;

    // Create slider HTML element
    this._sliderElement = document.createElement("input");
    this._sliderElement.type = "range";
    this._sliderElement.min = "0";
    this._sliderElement.max = "100";
    this._sliderElement.className = "slider";

    // Create label for display
    this._labelElement = document.createElement("label");
    this._labelElement.className = "slider-label";

    // Handle slider change
    this._sliderElement.addEventListener("change", (e) => {
      this._value = parseInt((e.target as HTMLInputElement).value);
      this._labelElement.textContent = this._value.toString();
      this._notifyOutputChanged();
    });

    // Get initial value from context
    const boundValue = context.parameters.controlValue;
    if (boundValue.raw !== null && boundValue.raw !== undefined) {
      this._value = boundValue.raw;
      this._sliderElement.value = this._value.toString();
    }

    this._labelElement.textContent = this._value.toString();

    // Append to container
    this._container.appendChild(this._sliderElement);
    this._container.appendChild(this._labelElement);
  }

  /**
   * updateView - Called when data changes
   */
  public updateView(context: ComponentFramework.Context<IInputs>): void {
    const value = context.parameters.controlValue.raw;
    if (value !== null && value !== undefined) {
      this._value = value;
      this._sliderElement.value = value.toString();
      this._labelElement.textContent = value.toString();
    }
  }

  /**
   * getOutputs - Return changed values
   */
  public getOutputs(): IOutputs {
    return {
      controlValue: this._value
    };
  }

  /**
   * destroy - Cleanup
   */
  public destroy(): void {
    this._sliderElement.removeEventListener("change", () => {});
  }
}
```

#### Manifest Configuration

```xml
<?xml version="1.0" encoding="utf-8" ?>
<manifest>
  <control namespace="MyCompany" 
           constructor="LinearSlider"
           version="1.0.0"
           display-name-key="Linear Slider"
           description-key="Interactive slider component"
           control-type="standard">
    
    <!-- Define property types -->
    <type-group name="numbers">
      <type>Whole.None</type>
      <type>Currency</type>
      <type>FP</type>
      <type>Decimal</type>
    </type-group>

    <!-- Define component properties -->
    <property name="controlValue"
              display-name-key="Value"
              description-key="Current slider value"
              of-type-group="numbers"
              usage="bound"
              required="true" />

    <!-- Resource references -->
    <resources>
      <code path="index.ts" order="1" />
      <css path="css/LinearSlider.css" order="1" />
    </resources>

    <!-- External service usage (affects licensing) -->
    <external-service-usage enabled="false">
    </external-service-usage>
  </control>
</manifest>
```

#### PCF Lifecycle Methods

| Method | Called When | Purpose |
|---|---|---|
| `init()` | Component loads | Initialize control, bind events, set initial values |
| `updateView()` | Data changes or refresh | Update visual representation of data |
| `getOutputs()` | Framework requests changes | Return new output values to be saved |
| `destroy()` | Component unloading | Clean up event listeners, free memory |

#### Key APIs

```typescript
// Get environment info
this._context.userSettings.userName
this._context.organizationSettings.organizationId
this._context.organizationSettings.uniqueName

// Web API calls
this._context.webAPI.retrieveRecord("account", recordId, "?$select=name,telephone1")

// Dialogs
this._context.navigation.openAlertDialog({ text: "Hello" })
this._context.navigation.openConfirmDialog({ title: "Confirm?" })

// Formatting
this._context.formatting.formatCurrency(value)
this._context.formatting.formatDateAsFilterStringInUTC(date)

// Theming (Fluent design)
this._context.fluentDesignLanguage.getTheme()
```

#### Tools & Resources

| Tool | Purpose | URL |
|---|---|---|
| **Power Apps Component Framework** | Official PCF guide | [learn.microsoft.com/power-apps/developer/component-framework](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/) |
| **PCF Samples** | Ready-to-use samples | [github.com/microsoft/PowerApps-Samples/component-framework](https://github.com/microsoft/PowerApps-Samples/tree/master/component-framework) |
| **Power Platform CLI** | Command-line tools | `pac pcf init`, `pac solution init` |
| **VSCode Extension** | Power Platform Tools | [marketplace.visualstudio.com](https://marketplace.visualstudio.com/items?itemName=microsoft-IsvExpTools.powerplatform-vscode-tools) |

#### Deployment Process

```powershell
# 1. Build component
npm run build

# 2. Create solution project (in component folder)
mkdir ComponentSolution
cd ComponentSolution
pac solution init --publisher-name "MyCompany" --publisher-prefix "myco"

# 3. Add component to solution
pac solution add-reference --path ..\..\LinearSlider.pcfproj

# 4. Build solution
msbuild /t:restore
msbuild /t:rebuild /restore /p:Configuration=Release
msbuild

# 5. Solution zip created in bin\Release\ComponentSolution.zip
# 6. Import into Power Apps via make.powerapps.com
```

---

### 3. Other M365 TypeScript Applications {#3-other-m365-typescript-applications}

[↑ Back to Top](#detailed-m365-application-guides)

#### Microsoft Teams Bots

```typescript
// bot.ts - Teams bot using Bot Framework
import { ActivityHandler, MessageFactory } from 'botbuilder';

export class TeamsBot extends ActivityHandler {
  constructor(private conversationState) {
    super();

    this.onMessage(async (context, next) => {
      const userMessage = context.activity.text;
      const replyMessage = `Echo: ${userMessage}`;
      await context.sendActivity(MessageFactory.text(replyMessage));
      await next();
    });

    this.onConversationUpdate(async (context, next) => {
      if (context.activity.membersAdded[0].id !== context.activity.recipient.id) {
        await context.sendActivity(MessageFactory.text('Welcome to the bot!'));
      }
      await next();
    });
  }
}
```

#### Office Add-ins (Excel)

```typescript
// Excel add-in task pane script
Office.onReady(() => {
  if (Excel.run) {
    document.getElementById("run").onclick = runExcelAddIn;
  }
});

async function runExcelAddIn() {
  try {
    await Excel.run(async (context) => {
      const sheet = context.workbook.worksheets.getItem("Sheet1");
      const range = sheet.getRange("A1:B2");
      range.format.fill.color = "yellow";
      await context.sync();
    });
  } catch (error) {
    console.error(error);
  }
}
```

#### Azure Functions (Serverless)

```typescript
// index.ts - Azure Functions HTTP trigger
import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const name = (req.query.name || (req.body && req.body.name));

    if (name) {
        context.res = {
            body: "Hello " + name
        };
    } else {
        context.res = {
            status: 400,
            body: "Please pass a name"
        };
    }
};

export default httpTrigger;
```

---

## Getting Started Guide {#getting-started-guide}

[↑ Back to Top](#top)

### Step-by-Step Setup {#step-by-step-setup}

#### 1. Install Prerequisites

```powershell
# Install Node.js v22 LTS from nodejs.org
node --version   # Should show v22.x.x
npm --version    # Should show 11.x.x

# Install global tools
npm install -g @rushstack/heft yo @microsoft/generator-sharepoint @microsoft/powerapps-cli

# Verify installations
heft --version
yo --version
pac --version
```

#### 2. Configure IDE (Visual Studio Code)

```powershell
# Open VS Code
code .

# Install Extensions
# - SPFx Toolkit (m365pnp.viva-connections-toolkit)
# - TypeScript Vue Plugin (Vue.volar)
# - REST Client (humao.rest-client)
# - Prettier (esbenp.prettier-vscode)
# - ESLint (dbaeumer.vscode-eslint)
```

#### 3. Create Your First Project

```powershell
# SPFx Web Part
mkdir MyFirstProject
cd MyFirstProject
yo @microsoft/sharepoint
# Follow prompts...

# Or PCF Component
pac pcf init --namespace "MyCompany" --name "MyComponent" --template field

# Build and test
npm install
npm run build
npm start  # or 'heft start' for SPFx
```

#### 4. Common Development Tasks

```powershell
# SPFx tasks
heft build              # Production build
heft start              # Dev server with watch
heft test               # Run Jest tests
heft trust-dev-cert     # Trust dev certificate

# PCF tasks
npm run build           # Build component
npm start watch         # Debug harness
npm run build -- --buildMode production  # Production build

# TypeScript compilation
tsc --version
tsc --noEmit            # Check types without emitting
tsc --outDir ./dist     # Compile with output dir
```

---

## GCC Standard Considerations {#gcc-standard-considerations}

[↑ Back to Top](#top)

### What is GCC Standard? {#what-is-gcc}

GCC (Government Community Cloud) Standard is a U.S. government cloud deployment of Microsoft 365. It has additional security, compliance, and network restrictions compared to commercial M365.

#### Key Constraints

| Constraint | Impact | Workaround |
|---|---|---|
| **No Public Internet Access** | NPM packages from public npm registry blocked | Use internal package repository/mirror |
| **407 Proxy Authentication** | Network proxy requires authentication | Configure npm proxy, git proxy |
| **Restricted External APIs** | Cannot call external services directly | Use internal API gateways, approved connectors |
| **No CDN** | Cannot use external CDNs | Self-host assets, bundle everything |
| **Restricted Package Versions** | Some npm packages may be restricted | Use approved package list/whitelist |
| **SSL/TLS Certificate Inspection** | Network inspects HTTPS traffic | Configure npm cafile, git certs |
| **No GitHub Public** | Cannot download from github.com directly | Use internal git mirror/repository |

### Network & Proxy Configuration

#### Configure npm for Proxy

```powershell
# Set npm registry to internal mirror (if available)
npm config set registry https://internal-npm-registry.gov

# Set proxy authentication
npm config set proxy http://user:password@proxy.gov:407
npm config set https-proxy http://user:password@proxy.gov:407
npm config set strict-ssl false  # ONLY if using internal SSL inspection

# Verify configuration
npm config list

# Alternative: Create .npmrc file in project root
echo "registry=https://internal-npm-registry.gov" > .npmrc
echo "proxy=http://user:password@proxy.gov:407" >> .npmrc
echo "https-proxy=http://user:password@proxy.gov:407" >> .npmrc
echo "strict-ssl=false" >> .npmrc
```

#### Configure Git for Proxy

```powershell
# Configure git proxy
git config --global http.proxy http://user:password@proxy.gov:407
git config --global https.proxy http://user:password@proxy.gov:407
git config --global http.sslVerify false  # ONLY if necessary

# Or create .gitconfig
[http]
    proxy = http://user:password@proxy.gov:407
    sslVerify = false
[https]
    proxy = http://user:password@proxy.gov:407
```

#### Install from Local Archive

```powershell
# Download package tarball on unrestricted machine
npm pack package-name@version

# Transfer to GCC machine
# Install locally
npm install ./package-name-version.tgz

# Or from local directory
npm install ../packages/mypackage
```

#### Use Internal Package Repository

```powershell
# If your organization has Artifactory, Nexus, or ProGet
npm config set registry https://artifactory.gov/artifactory/api/npm/npm-repo/

# For ProGet (common in government)
npm config set registry https://proget.gov/npm/

# For Azure Artifacts
npm config set registry https://feeds.dev.azure.gov/YourOrg/YourProject/_packaging/YourFeed/npm/registry/
npm config set always-auth true
npm config set email noreply@dev.azure.com
npm config set username [ANYTHING]
npm config set password [PAT_TOKEN]
```

### Module Resolution & Bundling

#### SPFx in GCC

```typescript
// 1. Pre-bundle external dependencies
// In SPFx projects, most packages are already bundled

// 2. Use PnP JS for SharePoint (already included)
import { sp } from "@pnp/sp";
import { graph } from "@pnp/graph";

// 3. Avoid dynamic imports from external sources
// DON'T DO THIS in GCC:
const module = await import("https://cdn.example.com/lib.js");

// DO THIS instead:
import { myLibrary } from "@local/myLibrary";
```

#### PCF in GCC

```typescript
// 1. Bundle all dependencies in component
// In PCF manifest, declare external service usage

// 2. Use relative imports only
import { utilities } from "../utils/utilities";

// 3. Avoid external API calls without whitelist
// DON'T:
const response = await fetch("https://external-api.com/data");

// DO: Use Dataverse Web API only
const result = await this._context.webAPI.retrieveRecord("account", id);
```

### Approved Libraries for GCC

| Library | Purpose | Notes |
|---|---|---|
| **@pnp/sp** | SharePoint REST API wrapper | Bundled, no external calls |
| **@pnp/graph** | Microsoft Graph API (internal) | Uses internal endpoint |
| **@microsoft/sp-*** | SPFx framework packages | Official Microsoft, pre-approved |
| **react** | UI framework | Pre-approved version |
| **typescript** | TypeScript compiler | Dev dependency only |
| **@types/\*** | Type definitions | Type-only, dev dependency |
| **office-ui-fabric-react** | UI components | Official Microsoft |
| **@fluentui/react** | Fluent UI components | Official Microsoft, preferred |

### Testing in GCC Environment

```typescript
// Unit test example for GCC
import { describe, it, expect } from "@jest/globals";
import { myFunction } from "../src/myFunction";

describe("GCC Compatible Tests", () => {
  it("should work in restricted environment", () => {
    const result = myFunction("test");
    expect(result).toBe("test");
  });

  // Avoid network-based tests
  it("should NOT make external API calls", async () => {
    // Mock external calls
    const mockData = { id: 1, name: "Test" };
    expect(mockData).toBeDefined();
  });
});
```

### Deployment Considerations for GCC

```powershell
# 1. All bundles must be self-contained
# Verify no external CDN references:
grep -r "cdn.jsdelivr\|unpkg\|cdnjs" ./dist

# 2. Check certificate chains
# Ensure all internal certificates are trusted

# 3. Package and upload through approved channels
# Use Power Platform Admin Center or SharePoint admin site
# (Never push direct to public repositories)

# 4. Enable audit logging
# All M365 governance applies in GCC

# 5. Use environment-specific config
# Production (GCC) vs. Dev (internal test tenant)
```

### Common GCC Setup Script

```powershell
# setup-gcc.ps1 - One-time GCC environment setup

# Set npm registry
npm config set registry https://internal-registry.gov/npm

# Configure proxy
$proxy = "http://user:password@proxy.gov:407"
npm config set proxy $proxy
npm config set https-proxy $proxy
npm config set strict-ssl false

# Configure git
git config --global http.proxy $proxy
git config --global https.proxy $proxy

# Install SPFx globally (from internal registry)
npm install -g @rushstack/heft yo @microsoft/generator-sharepoint

# Create sample project (uses internal packages)
yo @microsoft/sharepoint --skip-install

echo "GCC environment configured successfully!"
```

---

## Common Libraries & Resources {#common-libraries--resources}

[↑ Back to Top](#top)

### Essential NPM Packages {#essential-npm-packages}

```json
{
  "dependencies": {
    "@microsoft/sp-core-library": "^1.22.0",
    "@microsoft/sp-webpart-base": "^1.22.0",
    "@pnp/sp": "^4.x.x",
    "@pnp/graph": "^4.x.x",
    "react": "^18.x.x",
    "react-dom": "^18.x.x",
    "@fluentui/react": "^8.x.x",
    "axios": "^1.x.x",
    "date-fns": "^3.x.x"
  },
  "devDependencies": {
    "typescript": "^5.8.x",
    "@types/react": "^18.x.x",
    "@types/react-dom": "^18.x.x",
    "eslint": "^8.x.x",
    "jest": "^29.x.x",
    "@rushstack/heft": "^1.3.x"
  }
}
```

### Official Microsoft Learning Resources

| Resource | Topic | URL |
|---|---|---|
| **Microsoft Learn** | SPFx training path | [learn.microsoft.com/training/paths/develop-sharepoint](https://learn.microsoft.com/en-us/training/paths/develop-sharepoint-framework/) |
| **Power Apps Developer** | PCF development | [learn.microsoft.com/power-apps/developer/component-framework](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/) |
| **TypeScript Handbook** | Language reference | [typescriptlang.org/docs/handbook](https://www.typescriptlang.org/docs/handbook/) |
| **Microsoft Graph Docs** | Graph API | [learn.microsoft.com/graph](https://learn.microsoft.com/en-us/graph/) |

### GitHub Sample Repositories

| Repository | Content | URL |
|---|---|---|
| **SharePoint Samples** | SPFx web parts, extensions | [github.com/pnp/sp-dev-fx-webparts](https://github.com/pnp/sp-dev-fx-webparts) |
| **Power Apps Samples** | PCF components, apps | [github.com/microsoft/PowerApps-Samples](https://github.com/microsoft/PowerApps-Samples) |
| **Microsoft Teams Samples** | Bots, tabs, extensions | [github.com/OfficeDev/Microsoft-Teams-Samples](https://github.com/OfficeDev/Microsoft-Teams-Samples) |
| **Office Add-ins** | Excel, Word, Outlook | [github.com/OfficeDev/Office-Add-in-samples](https://github.com/OfficeDev/Office-Add-in-samples) |

### Community Resources

- **Microsoft Tech Community** — [techcommunity.microsoft.com/t5/microsoft-365-developer/ct-p/microsoft-365-developer](https://techcommunity.microsoft.com/t5/microsoft-365-developer/ct-p/microsoft-365-developer)
- **PnP Community** — [pnp.github.io](https://pnp.github.io) (Patterns & Practices)
- **Stack Overflow** — `[sharepoint]`, `[power-apps]`, `[typescript]` tags
- **YouTube** — Microsoft 365 Developer channel

### Development Tools Comparison

| Tool | SPFx | PCF | Cost | Notes |
|---|---|---|---|---|
| **Visual Studio Code** | ✅ | ✅ | Free | Recommended for all |
| **Visual Studio 2022** | ✅ | ✅ | Free (Community) | Full IDE, debugging |
| **VS Code Extensions** | ✅ | ✅ | Free | SPFx Toolkit, Power Platform Tools |
| **REST Client** | ✅ | Partial | Free | Test APIs directly in VS Code |
| **Postman** | ✅ | ✅ | Free/Paid | API testing |
| **Azure Storage Explorer** | Optional | Optional | Free | Manage CDN/storage |

---

## Summary & Best Practices {#summary--best-practices}

[↑ Back to Top](#top)

### TypeScript Best Practices {#ts-best-practices}

1. **Enable Strict Mode** — Use `"strict": true` in `tsconfig.json`
2. **Use Type Guards** — Always narrow types in conditionals
3. **Avoid `any`** — Use `unknown` if truly untyped
4. **Leverage Generics** — Write reusable, type-safe code
5. **Document Types** — Add JSDoc comments to public APIs

### M365 Development Best Practices {#m365-best-practices}

1. **SPFx**: Always use PnP JS for SharePoint APIs
2. **PCF**: Implement all lifecycle methods properly
3. **Security**: Never hardcode credentials or API keys
4. **Testing**: Write unit tests for all business logic
5. **Versioning**: Bump version on every release
6. **Localization**: Use `loc` files for all UI strings

### GCC Compliance Checklist {#gcc-checklist}

- [ ] All npm packages sourced from internal registry
- [ ] Proxy authentication configured for npm and git
- [ ] No external CDN references in code
- [ ] All external APIs replaced with internal equivalents
- [ ] SSL certificates trusted (if needed)
- [ ] Build outputs scanned for external URLs
- [ ] Deployment through approved channels only
- [ ] Security review completed before go-live

---

---

## Technical Cheat Sheet {#technical-cheat-sheet}

[↑ Back to Top](#top)

### TypeScript Compiler Commands

```powershell
# Compile TypeScript files
tsc                                    # Compile project
tsc --noEmit                          # Type check without output
tsc --outDir ./dist                   # Specify output directory
tsc --strict                          # Enable strict mode
tsc --watch                           # Watch mode
tsc --init                            # Create tsconfig.json
tsc --version                         # Show version
```

### Common Type Patterns

```typescript
// Union & Intersection
type Status = 'active' | 'inactive';
type Admin = User & { role: 'admin' };

// Optional & Required
type Config = { required: string; optional?: string };

// Readonly Properties
type Immutable = Readonly<{ id: number; name: string }>;

// Extract & Exclude
type OnlyStrings = Extract<'a' | 1 | 'b', string>; // 'a' | 'b'
type NoStrings = Exclude<'a' | 1 | 'b', string>;   // 1

// Conditional Types
type IsArray<T> = T extends any[] ? true : false;

// Mapped Types
type Getters<T> = { [K in keyof T as `get${Capitalize<K>}`]: () => T[K] };
```

### SPFx Quick Commands

```powershell
# Project Creation & Build
yo @microsoft/sharepoint                # Create SPFx project
heft build                              # Production build
heft start                              # Dev server
heft test                               # Run tests
heft trust-dev-cert                     # Trust certificate
npm run bundle                          # Bundle solution
npm run package-solution                # Create .sppkg file

# Debugging
Hold F12 in browser                     # Open dev tools in workbench
```

### PCF Quick Commands

```powershell
# Project Creation & Build
pac pcf init --namespace "Co" --name "Control" --template field
npm run build                           # Build component
npm start watch                         # Debug harness
msbuild /t:restore                      # Restore solution
msbuild                                 # Build solution package

# Deployment
pac auth create                         # Authenticate
pac auth list                           # List auth profiles
```

### tsconfig.json Essential Settings

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "react",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "./dist",
    "rootDir": "./src"
  }
}
```

### npm Proxy Configuration (GCC)

```powershell
npm config set registry https://internal-registry.gov/npm
npm config set proxy http://user:pass@proxy.gov:407
npm config set https-proxy http://user:pass@proxy.gov:407
npm config set strict-ssl false

# Or via .npmrc file
echo "registry=https://internal-registry.gov/npm" > .npmrc
echo "proxy=http://user:pass@proxy.gov:407" >> .npmrc
```

---

## Glossary of Terms {#glossary-of-terms}

[↑ Back to Top](#top)

| Term | Definition | Example |
|---|---|---|
| **Type** | A description of what values are valid for a variable | `string`, `number`, `User` |
| **Interface** | A contract defining the shape of an object | `interface IUser { name: string }` |
| **Generic** | A reusable type parameterized by other types | `Array<T>`, `function id<T>(x: T)` |
| **Union** | A type that can be one of multiple types | `string \| number` |
| **Intersection** | Combination of multiple types with all properties | `User & Admin` |
| **Type Guard** | Code pattern that narrows a union type | `if (typeof x === 'string')` |
| **Type Assertion** | Manual type casting (unsafe) | `value as string` |
| **Type Predicate** | Custom function that narrows types | `(x): x is Fish =>` |
| **Ambient Declaration** | Type definition for external code | `declare var jQuery: any` |
| **Inference** | TypeScript automatically determines a type | `let x = "hello"` → `x: string` |
| **Literal Type** | A type for a specific value | `type Direction = 'up' \| 'down'` |
| **Conditional Type** | Type that depends on another type | `T extends string ? true : false` |
| **Mapped Type** | Transform properties of existing type | `{ [K in keyof T]: T[K] }` |
| **Key of** | Extract all keys from a type as union | `keyof User` → `'name' \| 'age'` |
| **Index Signature** | Define object with dynamic keys | `{ [key: string]: any }` |
| **Method Overloading** | Multiple function signatures | `function log(x: string)`, `log(x: number)` |
| **Variance** | How type relationships work with inheritance | Covariance, contravariance, invariance |
| **Covariance** | Subtypes can be used where supertypes expected | ✅ Safe for read-only |
| **Contravariance** | Supertypes can be used where subtypes expected | ✅ Safe for parameters |
| **Invariance** | Type must match exactly | ✅ Safe for mutable properties |
| **SPFX** | SharePoint Framework - client-side dev platform | Building web parts, extensions |
| **PCF** | Power Apps Component Framework - custom controls | Creating reusable controls |
| **Heft** | Modern build toolchain for SPFx v1.22+ | Faster, simpler than Gulp |
| **Yeoman** | Project scaffolding tool | `yo @microsoft/sharepoint` |
| **Manifest** | XML file describing component metadata | `ControlManifest.Input.xml`, `.json` |
| **Bundle** | Combined/minified output file | `bundle.js` from Webpack |
| **Transpilation** | Converting TypeScript to JavaScript | Removes types, compiles features |
| **Narrowing** | Refining a type to be more specific | From `string \| number` to `string` |
| **Exhaustiveness Check** | Ensuring all union cases handled | `never` type in switch default |
| **GCC Standard** | US Government Community Cloud | Restricted network, internal registries |
| **Proxy Authentication** | HTTP 407 authentication for network access | Required in GCC environments |
| **Web API** | Dataverse REST interface for M365 data | `context.webAPI.retrieveRecord()` |
| **PnP JS** | SharePoint Patterns & Practices library | Wrapper for Graph & REST APIs |

---

## Helpful URLs & Resources {#helpful-urls--resources}

[↑ Back to Top](#top)

### Official Microsoft Documentation

- **TypeScript Official**: https://www.typescriptlang.org/
- **TypeScript Handbook**: https://www.typescriptlang.org/docs/handbook/
- **TypeScript Playground**: https://www.typescriptlang.org/play
- **SharePoint Dev**: https://learn.microsoft.com/en-us/sharepoint/dev/
- **SPFx Overview**: https://learn.microsoft.com/en-us/sharepoint/dev/spfx/sharepoint-framework-overview
- **SPFx Setup**: https://learn.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-development-environment
- **Power Apps Developer**: https://learn.microsoft.com/en-us/power-apps/developer/
- **PCF Overview**: https://learn.microsoft.com/en-us/power-apps/developer/component-framework/overview
- **PCF Getting Started**: https://learn.microsoft.com/en-us/power-apps/developer/component-framework/implementing-controls-using-typescript
- **Microsoft Graph**: https://learn.microsoft.com/en-us/graph/
- **Dataverse Web API**: https://learn.microsoft.com/en-us/power-apps/developer/data-platform/webapi/overview

### Learning Paths & Training

- **SPFx Learning Path**: https://learn.microsoft.com/en-us/training/paths/develop-sharepoint-framework/
- **Power Apps Training**: https://learn.microsoft.com/en-us/training/modules/create-power-app-power-platform/
- **Teams Development**: https://learn.microsoft.com/en-us/microsoftteams/platform/

### Sample Repositories

- **SharePoint Samples**: https://github.com/pnp/sp-dev-fx-webparts
- **Power Apps Samples**: https://github.com/microsoft/PowerApps-Samples
- **Microsoft Teams Samples**: https://github.com/OfficeDev/Microsoft-Teams-Samples
- **Office Add-ins**: https://github.com/OfficeDev/Office-Add-in-samples
- **PnP JS Examples**: https://github.com/pnp/pnpjs

### Community & Support

- **Microsoft Tech Community**: https://techcommunity.microsoft.com/t5/microsoft-365-developer/
- **PnP Community**: https://pnp.github.io
- **Stack Overflow (TypeScript)**: https://stackoverflow.com/questions/tagged/typescript
- **Stack Overflow (SharePoint)**: https://stackoverflow.com/questions/tagged/sharepoint
- **Stack Overflow (Power Apps)**: https://stackoverflow.com/questions/tagged/power-apps

### Development Tools

- **Visual Studio Code**: https://code.visualstudio.com
- **Visual Studio 2022**: https://visualstudio.microsoft.com/vs/
- **Node.js LTS**: https://nodejs.org/
- **Heft Toolchain**: https://rushstack.io/pages/heft/overview/
- **Yeoman**: https://yeoman.io/
- **PnP JS Library**: https://pnp.github.io/pnpjs/
- **Power Platform CLI**: https://learn.microsoft.com/en-us/power-platform/developer/cli/introduction

### VS Code Extensions

- **SPFx Toolkit**: https://marketplace.visualstudio.com/items?itemName=m365pnp.viva-connections-toolkit
- **Power Platform Tools**: https://marketplace.visualstudio.com/items?itemName=microsoft-IsvExpTools.powerplatform-vscode-tools
- **TypeScript Vue Plugin**: https://marketplace.visualstudio.com/items?itemName=Vue.volar
- **ESLint**: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
- **Prettier**: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
- **REST Client**: https://marketplace.visualstudio.com/items?itemName=humao.rest-client

---

**Last Updated:** October 1, 2026  
**TypeScript Version:** 5.8+  
**SPFx Version:** 1.22+ (Heft-based)  
**Power Apps PCF:** Latest (2024)  
**Document Location:** c:\\Davis\\vibe\\SPFx\\TypeScript.Explain.md
