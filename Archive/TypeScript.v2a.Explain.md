# TypeScript Comprehensive Guide for M365 Development v2 {#top}

## Table of Contents

### Main Sections
1. [Executive Summary](#executive-summary)
2. [TypeScript Keywords & Features](#typescript-keywords--features)
   - 2.1 [Type Declaration Keywords](#type-declaration-keywords)
   - 2.2 [Visibility & Scope Keywords](#visibility--scope-keywords)
   - 2.3 [Type Annotation Keywords](#type-annotation-keywords)
   - 2.4 [Advanced Type Keywords](#advanced-type-keywords)
   - 2.5 [Conditional & Generic Keywords](#conditional--generic-keywords)
   - 2.6 [Async & Control Flow Keywords](#async--control-flow-keywords)
3. [TypeScript in M365 Applications](#typescript-in-m365-applications)
   - 3.1 [SharePoint Framework (SPFx)](#sharepoint-framework-spfx)
   - 3.2 [Power Apps Code Components (PCF)](#power-apps-code-components-pcf)
   - 3.3 [Power Automate Cloud Flows](#power-automate-cloud-flows)
   - 3.4 [Microsoft Teams Applications](#microsoft-teams-applications)
   - 3.5 [Office Add-ins](#office-add-ins)
   - 3.6 [Azure Functions & Serverless](#azure-functions--serverless)
   - 3.7 [Microsoft Graph & Dataverse](#microsoft-graph--dataverse)
4. [Getting Started with TypeScript](#getting-started-with-typescript)
5. [GCC Standard Considerations](#gcc-standard-considerations)
6. [Essential Libraries & Packages](#essential-libraries--packages)
7. [GitHub Sample Repositories](#github-sample-repositories)
8. [Technical Cheat Sheet](#technical-cheat-sheet)
9. [Glossary of Terms](#glossary-of-terms)
10. [Helpful URLs & Resources](#helpful-urls--resources)

---

## Executive Summary

[â†‘ Back to Top](#top)

TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. It's the foundation for modern M365 development, providing compile-time type checking, superior IDE support, and better code maintainability.

**Key Facts**:
- **Current Version**: TypeScript 5.8+ (October 2024)
- **Required for**: SPFx v1.22+, all PCF components, Teams projects, Office Add-ins
- **Compilation**: TypeScript â†’ JavaScript (all types erased at runtime)
- **Setup Time**: 15-30 minutes (if Node.js/npm already installed)
- **Learning Curve**: 4-8 hours for fundamentals; 2-4 weeks for proficiency

**Why TypeScript for M365**:
- âœ… Catch errors at compile time, not runtime
- âœ… Self-documenting code through type annotations
- âœ… Excellent IDE intellisense and autocomplete
- âœ… Safe refactoring across large codebases
- âœ… Native support in all Microsoft development tools

**GCC Standard Challenges**: Locked-down environments require internal package registries, proxy authentication (407), and no public internet access. Solutions provided in GCC section.

---

## TypeScript Keywords & Features

[â†‘ Back to Top](#top)

### Type Declaration Keywords

[â†‘ Back to Top](#typescript-keywords--features)

| Keyword | Purpose | Typical Use Cases | Example |
|---|---|---|---|
| `type` | Create type alias for reusable types | Define custom types, union types, object shapes | `type User = { name: string; age: number }` |
| `interface` | Define contract/shape for objects | Class contracts, API responses, object patterns | `interface IUser { name: string; age: number }` |
| `enum` | Named set of constants | Status codes, directions, colors | `enum Status { Active, Inactive, Pending }` |
| `class` | Define object blueprint with behavior | Component classes, service classes, models | `class User { constructor(name: string) { } }` |
| `namespace` | Organize code into logical groups | Prevent naming conflicts, organize large codebases | `namespace Company { export class Emp { } }` |
| `declare` | Ambient type declaration for external libs | Define types for JS libraries without types | `declare var jQuery: any` |

### Visibility & Scope Keywords

[â†‘ Back to Top](#typescript-keywords--features)

| Keyword | Purpose | Typical Use Cases | Example |
|---|---|---|---|
| `public` | Accessible everywhere (default) | Public API methods, visible properties | `public getName(): string { }` |
| `private` | Only accessible within the class | Encapsulation, internal state, helper methods | `private _internalCache: any` |
| `protected` | Accessible in class and subclasses | Base class functionality, inheritance patterns | `protected onInit(): void { }` |
| `static` | Class-level member, shared across instances | Utility methods, constants, factories | `static create(name: string): User { }` |
| `readonly` | Prevent reassignment after initialization | Immutable properties, constants | `readonly id: string` |
| `abstract` | Define interface for subclasses to implement | Force implementation in derived classes | `abstract class Animal { abstract bark(): void }` |

### Type Annotation Keywords

[â†‘ Back to Top](#typescript-keywords--features)

| Keyword | Purpose | Typical Use Cases | Example |
|---|---|---|---|
| `:` (colon) | Add type annotation | Specify variable, parameter, return types | `let name: string = "John"` |
| `as` | Type assertion/cast (unsafe) | Override inferred type, type narrowing | `(value as string).toUpperCase()` |
| `is` | Type predicate for custom narrowing | Create reusable type guards | `function isFish(pet: any): pet is Fish { }` |
| `keyof` | Extract union of object keys | Create type-safe property accessors | `type Keys = keyof MyObject` |
| `typeof` | Get type of value at runtime | Type narrowing, typeof guards | `if (typeof x === 'string') { }` |
| `instanceof` | Check if object is instance of class | Runtime type checking, instanceof guards | `if (obj instanceof Date) { }` |

### Advanced Type Keywords

[â†‘ Back to Top](#typescript-keywords--features)

| Keyword | Purpose | Typical Use Cases | Example |
|---|---|---|---|
| `Partial<T>` | Make all properties optional | Partial updates, patches, optional configs | `type PartialUser = Partial<User>` |
| `Required<T>` | Make all properties required | Force complete objects, validation | `type CompleteUser = Required<Partial<User>>` |
| `Readonly<T>` | Make all properties immutable | Constants, frozen objects, configurations | `type ImmutableUser = Readonly<User>` |
| `Record<K, V>` | Create object with specific keys/values | Lookup tables, maps, dictionaries | `type Status = Record<'active' \| 'inactive', string>` |
| `Pick<T, K>` | Select subset of properties | Extract specific fields, focused types | `type UserPreview = Pick<User, 'name' \| 'email'>` |
| `Omit<T, K>` | Exclude specific properties | Hide sensitive fields, partial types | `type UserDTO = Omit<User, 'password'>` |
| `Extract<T, U>` | Extract types matching condition | Filter union members | `type Strings = Extract<'a' \| 1 \| 'b', string>` |
| `Exclude<T, U>` | Remove types matching condition | Remove union members | `type NonStrings = Exclude<'a' \| 1 \| 'b', string>` |

### Conditional & Generic Keywords

[â†‘ Back to Top](#typescript-keywords--features)

| Keyword | Purpose | Typical Use Cases | Example |
|---|---|---|---|
| `<T>` | Generic type parameter | Reusable functions, arrays, containers | `function id<T>(x: T): T { return x }` |
| `<T extends Type>` | Constrained generic | Limit valid types, ensure base requirements | `<T extends string>` or `<T extends User>` |
| `<T, U>` | Multiple generic parameters | Generic functions with multiple types | `function map<T, U>(arr: T[]): U[] { }` |
| `<T = Default>` | Default generic type | Provide fallback type if not specified | `<T = string>` |
| `extends` (conditional) | Ternary condition for types | Conditional types, type narrowing | `T extends string ? true : false` |
| `infer` | Extract type from conditional | Infer nested types, extract parameters | `infer T extends Type` |
| `never` | Impossible type (bottom type) | Exhaustive checks, unreachable code | `function fail(): never { throw new Error() }` |

### Async & Control Flow Keywords

[â†‘ Back to Top](#typescript-keywords--features)

| Keyword | Purpose | Typical Use Cases | Example |
|---|---|---|---|
| `async` | Mark function as asynchronous | Promise-based functions, async operations | `async function fetchData() { }` |
| `await` | Wait for Promise resolution | Suspend execution, wait for async calls | `const data = await fetchData()` |
| `Promise<T>` | Type for asynchronous operations | API calls, async workflows, futures | `function getData(): Promise<Data> { }` |
| `try`/`catch`/`finally` | Error handling | Exception handling, cleanup, resources | `try { } catch (e) { } finally { }` |
| `throw` | Throw error/exception | Custom errors, error propagation | `throw new Error("Invalid input")` |
| `yield` | Generator function values | Lazy iteration, coroutines, generators | `function* gen() { yield 1; yield 2; }` |
| `if`/`else` | Conditional type narrowing | Type guards, control flow analysis | `if (typeof x === 'string') { x.length }` |
| `switch`/`case` | Discriminated union matching | Type safe pattern matching, exhaustive checks | `switch (shape.kind) { case 'circle': }` |
| `in` | Property existence check | Type narrowing with property checks | `if ('prop' in obj) { }` |

---

## TypeScript in M365 Applications

[â†‘ Back to Top](#top)

### M365 Platform Comparison Table

| Platform | TypeScript Required | Project Type | Build Tool | Deployment | Learning Curve |
|---|---|---|---|---|---|
| **SharePoint Framework (SPFx)** | âœ… Required | Web Parts, Extensions | Heft (v1.22+) | .sppkg file | 2-4 weeks |
| **Power Apps Code Components (PCF)** | âœ… Required | Custom Controls | msbuild | Solution package | 2-3 weeks |
| **Power Automate** | âš ï¸ Optional | Cloud Flow Actions | Node.js | Power Platform | 1-2 weeks |
| **Microsoft Teams** | âœ… Recommended | Bots, Tabs, Extensions | Webpack/Heft | Azure App Service | 2-3 weeks |
| **Office Add-ins** | âœ… Recommended | Excel, Word, Outlook | Webpack | Office Store | 2-4 weeks |
| **Azure Functions** | âœ… Common | Serverless Functions | Node.js | Azure Runtime | 1-2 weeks |
| **Microsoft Graph SDK** | âœ… Implicit | Client Integration | npm packages | npm/nuget | 1 week |
| **Dataverse Extensions** | âœ… Recommended | Plugins, Actions | TypeScript â†’ C# | Plugin Assembly | 3-4 weeks |

---

### SharePoint Framework (SPFx)

[â†‘ Back to Top](#typescript-in-m365-applications)

#### Getting Started with SPFx

```powershell
# Prerequisites: Node.js 22.x LTS, npm 11.x

# Install global tools
npm install --global @rushstack/heft yo @microsoft/generator-sharepoint

# Create project
yo @microsoft/sharepoint

# Answer prompts:
# - Solution name: my-spfx-project
# - Baseline packages: React (recommended)
# - Web part name: HelloWorld

# Start development
heft start
```

#### SPFx Project Structure

```
my-spfx-project/
â”œâ”€â”€ src/
â”‚   â””â”€â”€ webparts/
â”‚       â””â”€â”€ helloWorld/
â”‚           â”œâ”€â”€ HelloWorldWebPart.ts      # Main web part class
â”‚           â”œâ”€â”€ components/
â”‚           â”‚   â”œâ”€â”€ HelloWorld.tsx        # React component
â”‚           â”‚   â””â”€â”€ IHelloWorldProps.ts   # Props interface
â”‚           â””â”€â”€ HelloWorldWebPart.manifest.json
â”œâ”€â”€ config/
â”‚   â”œâ”€â”€ build.json
â”‚   â”œâ”€â”€ package-solution.json
â”‚   â””â”€â”€ serve.json
â”œâ”€â”€ .heft/
â”‚   â””â”€â”€ config/                          # Heft configuration (v1.22+)
â”œâ”€â”€ tsconfig.json
â””â”€â”€ package.json
```

#### Sample SPFx Web Part (React)

```typescript
// HelloWorldWebPart.ts
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { HelloWorld } from './components/HelloWorld';

export interface IHelloWorldWebPartProps {
  description: string;
}

export default class HelloWorldWebPart extends BaseClientSideWebPart<IHelloWorldWebPartProps> {
  protected onInit(): Promise<void> {
    return Promise.resolve();
  }

  public render(): void {
    const element = React.createElement(HelloWorld, {
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
              value: this.properties.description
            })
          ]
        }]
      }]
    };
  }
}
```

#### Key SPFx Classes & Interfaces

| Class/Interface | Purpose | Usage |
|---|---|---|
| `BaseClientSideWebPart<T>` | Base class for web parts | Extend for all web part development |
| `BaseApplicationCustomizer` | Application customizer base | Custom app header/footer |
| `BaseFieldCustomizer<T>` | Field customizer base | Custom field rendering |
| `BaseListViewCommandSet` | Command set base | Custom list commands |
| `IWebPartContext` | Context object | Access to environment, web, lists |

#### Essential SPFx Packages

```json
{
  "dependencies": {
    "@microsoft/sp-core-library": "^1.22.0",
    "@microsoft/sp-webpart-base": "^1.22.0",
    "@microsoft/sp-http": "^1.22.0",
    "@pnp/sp": "^4.x.x",
    "react": "^18.x.x",
    "react-dom": "^18.x.x"
  },
  "devDependencies": {
    "typescript": "^5.8.x",
    "@rushstack/heft": "^1.3.x",
    "@types/react": "^18.x.x",
    "@types/react-dom": "^18.x.x"
  }
}
```

#### SPFx Resources

- **Official Docs**: https://learn.microsoft.com/en-us/sharepoint/dev/spfx/
- **Yeoman Generator**: https://www.npmjs.com/package/@microsoft/generator-sharepoint
- **Samples**: https://github.com/pnp/sp-dev-fx-webparts
- **PnP JS Library**: https://pnp.github.io/pnpjs/

---

### Power Apps Code Components (PCF)

[â†‘ Back to Top](#typescript-in-m365-applications)

#### Getting Started with PCF

```powershell
# Prerequisites: Node.js 16+ LTS, npm 8+, Power Platform CLI, .NET

# Install Power Platform CLI
npm install -g @microsoft/powerapps-cli

# Create PCF project
pac pcf init --namespace "MyCompany" --name "LinearSlider" --template field

# Navigate and build
cd LinearSlider
npm install
npm run build
npm start watch
```

#### PCF Project Structure

```
LinearSlider/
â”œâ”€â”€ LinearSlider/
â”‚   â”œâ”€â”€ index.ts                    # Main component logic
â”‚   â”œâ”€â”€ ControlManifest.Input.xml   # Component metadata
â”‚   â””â”€â”€ css/
â”‚       â””â”€â”€ LinearSlider.css
â”œâ”€â”€ LinearSliderSolution/           # Solution package
â”‚   â””â”€â”€ src/
â”‚       â””â”€â”€ Other/
â”‚           â””â”€â”€ Solution.xml
â”œâ”€â”€ generated/
â”‚   â””â”€â”€ ManifestTypes.d.ts          # Auto-generated types
â”œâ”€â”€ tsconfig.json
â””â”€â”€ package.json
```

#### Sample PCF Component (TypeScript)

```typescript
// index.ts - Power Apps Component Framework
import { IInputs, IOutputs } from "./generated/ManifestTypes";

export class LinearSlider implements ComponentFramework.StandardControl<IInputs, IOutputs> {
  private _container: HTMLDivElement;
  private _context: ComponentFramework.Context<IInputs>;
  private _sliderElement: HTMLInputElement;
  private _value: number = 0;
  private _notifyOutputChanged: () => void;

  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary,
    container: HTMLDivElement
  ): void {
    this._context = context;
    this._notifyOutputChanged = notifyOutputChanged;
    this._container = container;

    // Create slider HTML
    this._sliderElement = document.createElement("input");
    this._sliderElement.type = "range";
    this._sliderElement.min = "0";
    this._sliderElement.max = "100";

    // Handle change events
    this._sliderElement.addEventListener("change", (e) => {
      this._value = parseInt((e.target as HTMLInputElement).value);
      this._notifyOutputChanged();
    });

    this._container.appendChild(this._sliderElement);
  }

  public updateView(context: ComponentFramework.Context<IInputs>): void {
    const value = context.parameters.controlValue.raw;
    if (value !== null && value !== undefined) {
      this._value = value;
      this._sliderElement.value = value.toString();
    }
  }

  public getOutputs(): IOutputs {
    return {
      controlValue: this._value
    };
  }

  public destroy(): void {
    this._sliderElement.removeEventListener("change", () => {});
  }
}
```

#### PCF Manifest Configuration

```xml
<?xml version="1.0" encoding="utf-8" ?>
<manifest>
  <control namespace="MyCompany" 
           constructor="LinearSlider"
           version="1.0.0"
           display-name-key="Linear Slider"
           control-type="standard">
    
    <type-group name="numbers">
      <type>Whole.None</type>
      <type>Currency</type>
      <type>FP</type>
    </type-group>

    <property name="controlValue"
              display-name-key="Value"
              of-type-group="numbers"
              usage="bound"
              required="true" />

    <resources>
      <code path="index.ts" order="1" />
      <css path="css/LinearSlider.css" order="1" />
    </resources>
  </control>
</manifest>
```

#### PCF Lifecycle Methods

| Method | Called When | Purpose |
|---|---|---|
| `init()` | Component loads | Initialize, bind events, set initial values |
| `updateView()` | Data changes or refresh | Update visual representation |
| `getOutputs()` | Framework requests changes | Return new output values |
| `destroy()` | Component unloading | Clean up event listeners, free memory |

#### Essential PCF APIs

| API | Purpose | Example |
|---|---|---|
| `context.parameters` | Access bound field values | `context.parameters.controlValue.raw` |
| `context.webAPI` | Dataverse REST operations | `context.webAPI.retrieveRecord()` |
| `context.navigation` | Navigate or show dialogs | `context.navigation.openAlertDialog()` |
| `context.formatting` | Format values (currency, date) | `context.formatting.formatCurrency()` |
| `context.userSettings` | User information | `context.userSettings.userName` |

#### PCF Resources

- **Official Docs**: https://learn.microsoft.com/en-us/power-apps/developer/component-framework/
- **Samples**: https://github.com/microsoft/PowerApps-Samples/tree/master/component-framework
- **Power Platform CLI**: https://learn.microsoft.com/en-us/power-platform/developer/cli/introduction

---

### Power Automate Cloud Flows

[â†‘ Back to Top](#typescript-in-m365-applications)

Power Automate cloud flows can call TypeScript/JavaScript via Azure Functions or webhooks.

#### Sample Integration

```typescript
// Azure Function triggered by Power Automate
import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const flowData = req.body;
    
    // Process data
    const result = {
        status: "success",
        processedAt: new Date().toISOString(),
        itemCount: flowData.items.length
    };

    context.res = {
        body: result,
        status: 200
    };
};

export default httpTrigger;
```

#### Power Automate + TypeScript Patterns

| Pattern | Use Case | Implementation |
|---|---|---|
| **HTTP Webhook** | Trigger from flow to TypeScript service | HTTP POST to Azure Function |
| **Azure Function** | Serverless processing | TypeScript in Azure Functions runtime |
| **API Connector** | Custom REST API | Express.js TypeScript backend |
| **Custom Connector** | Managed connector | OpenAPI definition + TypeScript backend |

---

### Microsoft Teams Applications

[â†‘ Back to Top](#typescript-in-m365-applications)

#### Types of Teams Apps

| Type | Language | Framework | Purpose |
|---|---|---|---|
| **Bot** | TypeScript | Bot Framework 4 | Conversational interactions |
| **Tab** | React/Vue/TypeScript | SPFx or Webpack | Web page in Teams |
| **Message Extension** | TypeScript | Bot Framework | Search, actions within chat |
| **Connector** | TypeScript | Azure Functions | Post messages to channels |

#### Sample Teams Bot (TypeScript)

```typescript
// bot.ts - Teams bot using Bot Framework
import { ActivityHandler, MessageFactory, TurnContext } from 'botbuilder';

export class TeamsBot extends ActivityHandler {
  constructor() {
    super();

    this.onMessage(async (context: TurnContext, next: () => Promise<void>) => {
      const userMessage = context.activity.text;
      const replyMessage = `Echo: ${userMessage}`;
      
      await context.sendActivity(MessageFactory.text(replyMessage));
      await next();
    });

    this.onMembersAdded(async (context: TurnContext, next: () => Promise<void>) => {
      const membersAdded = context.activity.membersAdded;
      
      for (const member of membersAdded) {
        if (member.id !== context.activity.recipient.id) {
          await context.sendActivity(MessageFactory.text('Welcome to the bot!'));
        }
      }
      
      await next();
    });
  }
}
```

#### Teams Resources

- **Bot Framework**: https://learn.microsoft.com/en-us/azure/bot-service/
- **Teams Dev Docs**: https://learn.microsoft.com/en-us/microsoftteams/platform/
- **Samples**: https://github.com/OfficeDev/Microsoft-Teams-Samples

---

### Office Add-ins

[â†‘ Back to Top](#typescript-in-m365-applications)

#### Getting Started with Office Add-ins

```powershell
# Install Yo Office generator
npm install -g yo @microsoft/generator-office

# Create project
yo @microsoft/generator-office

# Answer prompts for Excel, Word, or Outlook
```

#### Sample Excel Add-in (TypeScript)

```typescript
// taskpane.ts - Excel Add-in
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
      range.format.font.bold = true;
      
      await context.sync();
    });
  } catch (error) {
    console.error(error);
  }
}
```

#### Office Add-in Resources

- **Office Add-ins Dev**: https://learn.microsoft.com/en-us/office/dev/add-ins/
- **Samples**: https://github.com/OfficeDev/Office-Add-in-samples
- **API Reference**: https://learn.microsoft.com/en-us/javascript/api/overview

---

### Azure Functions & Serverless

[â†‘ Back to Top](#typescript-in-m365-applications)

#### Getting Started

```powershell
# Install Azure Functions CLI
npm install -g azure-functions-core-tools@4 --unsafe-perm=true

# Create project
func init MyFunctionApp --typescript
cd MyFunctionApp
func new  # Create new function

# Run locally
func start
```

#### Sample Azure Function (TypeScript)

```typescript
// index.ts - HTTP Trigger
import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    
    const name = (req.query.name || (req.body && req.body.name));

    if (name) {
        context.res = {
            body: `Hello ${name}!`
        };
    } else {
        context.res = {
            status: 400,
            body: "Please provide a name"
        };
    }
};

export default httpTrigger;
```

#### Azure Functions Resources

- **Azure Functions Docs**: https://learn.microsoft.com/en-us/azure/azure-functions/
- **TypeScript Support**: https://learn.microsoft.com/en-us/azure/azure-functions/functions-develop-vs-code
- **Samples**: https://github.com/Azure/azure-functions-samples

---

### Microsoft Graph & Dataverse

[â†‘ Back to Top](#typescript-in-m365-applications)

#### Microsoft Graph TypeScript SDK

```typescript
// Use Microsoft Graph SDK
import { Client } from '@microsoft/microsoft-graph-client';

const graphClient = Client.init({
  authProvider: (done: any) => {
    done(null, accessToken);
  }
});

// Get user
const user = await graphClient.api('/me').get();

// Get user's calendar events
const events = await graphClient.api('/me/calendarview')
  .query({ startDateTime: '2024-01-01', endDateTime: '2024-12-31' })
  .get();
```

#### Microsoft Graph Resources

- **Graph Docs**: https://learn.microsoft.com/en-us/graph/
- **JavaScript SDK**: https://github.com/microsoftgraph/msgraph-sdk-javascript
- **API Reference**: https://learn.microsoft.com/en-us/graph/api/overview

---

## Getting Started with TypeScript

[â†‘ Back to Top](#top)

### Step 1: Install Prerequisites

[â†‘ Back to Top](#getting-started)

```powershell
# Install Node.js v22 LTS from nodejs.org
node --version   # Should show v22.x.x
npm --version    # Should show 11.x.x

# Install TypeScript globally (optional)
npm install --global typescript
tsc --version    # Should show 5.8.x or higher
```

### Step 2: Initialize a TypeScript Project

[â†‘ Back to Top](#getting-started)

```powershell
mkdir my-typescript-project
cd my-typescript-project
npm init -y
npm install --save-dev typescript

# Create tsconfig.json
npx tsc --init
```

### Step 3: Create Your First TypeScript File

[â†‘ Back to Top](#getting-started)

```typescript
// src/main.ts
interface User {
  name: string;
  email: string;
  age: number;
}

function createUser(name: string, email: string, age: number): User {
  return { name, email, age };
}

const user: User = createUser("John Doe", "john@example.com", 30);
console.log(`Created user: ${user.name}`);
```

### Step 4: Compile TypeScript

[â†‘ Back to Top](#getting-started)

```powershell
# Compile TypeScript files
npx tsc

# Watch mode (recompile on file changes)
npx tsc --watch

# Check types without compiling
npx tsc --noEmit
```

---

## GCC Standard Considerations

[â†‘ Back to Top](#top)

### What is GCC Standard?

[â†‘ Back to Top](#gcc-standard)

GCC (Government Community Cloud) Standard is a US government cloud deployment with additional security and network restrictions:
- No public internet access
- 407 proxy authentication on all traffic
- Internal package repositories only
- SSL/TLS certificate inspection
- No external CDN access
- Restricted APIs and services

### npm Registry Configuration for GCC

[â†‘ Back to Top](#gcc-standard)

#### Option 1: Internal npm Mirror

```powershell
# Set npm registry to internal mirror
npm config set registry https://internal-npm-registry.gov/npm

# Set proxy authentication
npm config set proxy http://user:password@proxy.gov:407
npm config set https-proxy http://user:password@proxy.gov:407

# For SSL certificate inspection
npm config set ca /path/to/ca-cert.pem

# Create .npmrc file in project
echo "registry=https://internal-npm-registry.gov/npm" > .npmrc
echo "proxy=http://user:password@proxy.gov:407" >> .npmrc
echo "https-proxy=http://user:password@proxy.gov:407" >> .npmrc
```

#### Option 2: Azure Artifacts

```powershell
# Configure Azure Artifacts
npm config set registry https://feeds.dev.azure.gov/YourOrg/YourProject/_packaging/YourFeed/npm/registry/
npm config set always-auth true
npm config set email noreply@dev.azure.com
npm config set username [ANYTHING]
npm config set password [PERSONAL_ACCESS_TOKEN]
```

#### Option 3: Local Archive Installation

```powershell
# On unrestricted machine:
npm pack typescript

# Transfer file to GCC machine, then:
npm install ./typescript-5.8.0.tgz

# Or from local repository:
npm install ../packages/typescript
```

### Git Configuration for GCC

[â†‘ Back to Top](#gcc-standard)

```powershell
# Configure git proxy
git config --global http.proxy http://user:password@proxy.gov:407
git config --global https.proxy http://user:password@proxy.gov:407

# For internal git server (if available)
git config --global url."https://internal-git.gov".insteadOf "https://github.com"

# Create .gitconfig
[http]
    proxy = http://user:password@proxy.gov:407
[https]
    proxy = http://user:password@proxy.gov:407
```

### Approved TypeScript Packages for GCC

[â†‘ Back to Top](#gcc-standard)

| Package | Purpose | Status |
|---|---|---|
| `typescript` | TypeScript compiler | âœ… Pre-approved |
| `@microsoft/sp-*` | SPFx core libraries | âœ… Pre-approved |
| `@pnp/sp` | SharePoint REST wrapper | âœ… Pre-approved |
| `@pnp/graph` | Microsoft Graph wrapper | âœ… Pre-approved |
| `react` | UI framework | âœ… Pre-approved |
| `react-dom` | React DOM support | âœ… Pre-approved |
| `@fluentui/react` | Fluent UI components | âœ… Pre-approved |
| `axios` | HTTP client | âš ï¸ Requires review |
| `lodash` | Utility functions | âœ… Pre-approved |
| `date-fns` | Date manipulation | âœ… Pre-approved |

### GCC Best Practices

[â†‘ Back to Top](#gcc-standard)

- âœ… Use internal package registries exclusively
- âœ… Pre-download and cache packages when possible
- âœ… Test all external API calls are blocked/unavailable
- âœ… Bundle all dependencies into solution package
- âœ… Use environment-specific configurations
- âœ… Validate certificate chains are trusted
- âœ… Document all third-party dependencies
- âœ… Request package whitelisting for any new dependencies

---

## Essential Libraries & Packages

[â†‘ Back to Top](#top)

### Core TypeScript Development

[â†‘ Back to Top](#essential-libs)

```json
{
  "devDependencies": {
    "typescript": "^5.8.x",
    "@types/node": "^20.x.x",
    "ts-loader": "^9.x.x",
    "webpack": "^5.x.x",
    "webpack-cli": "^5.x.x",
    "webpack-dev-server": "^4.x.x",
    "eslint": "^8.x.x",
    "@typescript-eslint/eslint-plugin": "^6.x.x",
    "@typescript-eslint/parser": "^6.x.x",
    "jest": "^29.x.x",
    "ts-jest": "^29.x.x",
    "@types/jest": "^29.x.x",
    "prettier": "^3.x.x"
  }
}
```

### SharePoint & M365 Development

```json
{
  "dependencies": {
    "@microsoft/sp-core-library": "^1.22.0",
    "@microsoft/sp-webpart-base": "^1.22.0",
    "@microsoft/sp-http": "^1.22.0",
    "@pnp/sp": "^4.x.x",
    "@pnp/graph": "^4.x.x",
    "@pnp/pnpjs": "^4.x.x",
    "@microsoft/microsoft-graph-client": "^3.x.x",
    "@microsoft/microsoft-graph-types": "^0.x.x",
    "office-ui-fabric-react": "^7.x.x",
    "@fluentui/react": "^8.x.x"
  }
}
```

### Utility Libraries

| Package | Purpose | Install |
|---|---|---|
| `lodash` | Utility functions | `npm install lodash @types/lodash` |
| `date-fns` | Date manipulation | `npm install date-fns` |
| `axios` | HTTP client | `npm install axios` |
| `dotenv` | Environment variables | `npm install dotenv` |
| `uuid` | Generate UUIDs | `npm install uuid @types/uuid` |
| `jwt-decode` | Decode JWT tokens | `npm install jwt-decode` |

---

## GitHub Sample Repositories

[â†‘ Back to Top](#top)

### Microsoft Official Samples

[â†‘ Back to Top](#github-samples)

| Repository | Content | URL |
|---|---|---|
| **sp-dev-fx-webparts** | SPFx web parts collection | https://github.com/pnp/sp-dev-fx-webparts |
| **sp-dev-fx-extensions** | SPFx extensions | https://github.com/pnp/sp-dev-fx-extensions |
| **PowerApps-Samples** | PCF and Canvas app samples | https://github.com/microsoft/PowerApps-Samples |
| **Microsoft-Teams-Samples** | Teams bots and tabs | https://github.com/OfficeDev/Microsoft-Teams-Samples |
| **Office-Add-in-samples** | Excel, Word, Outlook add-ins | https://github.com/OfficeDev/Office-Add-in-samples |
| **Azure-Samples** | Azure Functions and services | https://github.com/Azure-Samples |
| **msgraph-sdk-javascript** | Microsoft Graph SDK | https://github.com/microsoftgraph/msgraph-sdk-javascript |

### PnP Community Samples

[â†‘ Back to Top](#github-samples)

| Repository | Content | URL |
|---|---|---|
| **PnP JavaScript Library** | Wrapper for Graph/REST APIs | https://github.com/pnp/pnpjs |
| **PnP SP-Dev-FX Samples** | Real-world SPFx examples | https://github.com/pnp/sp-dev-fx-webparts |
| **CLI for Microsoft 365** | Command-line M365 automation | https://github.com/pnp/cli-microsoft365 |

---

## Technical Cheat Sheet

[â†‘ Back to Top](#top)

### Quick TypeScript Patterns

[â†‘ Back to Top](#technical-cheat-sheet)

```typescript
// Union & Intersection Types
type Status = 'active' | 'inactive' | 'pending';
type Admin = User & { role: 'admin'; permissions: string[] };

// Optional & Nullable
type Config = {
  required: string;
  optional?: string;
  nullable: string | null;
  undefinable: string | undefined;
};

// Readonly
type ReadonlyUser = Readonly<{ id: number; name: string }>;
const user: ReadonlyUser = { id: 1, name: 'John' };
// user.name = 'Jane'; // Error!

// Generic Function
function identity<T>(value: T): T {
  return value;
}
const str = identity<string>("hello");
const num = identity<number>(42);

// Conditional Types
type IsString<T> = T extends string ? true : false;
type A = IsString<"hello">;     // true
type B = IsString<number>;      // false

// Mapped Types
type Readonly<T> = { readonly [K in keyof T]: T[K] };
type Getters<T> = {
  [K in keyof T as `get${Capitalize<K>}`]: () => T[K];
};

// Type Guards
function isFish(pet: Fish | Bird): pet is Fish {
  return 'swim' in pet;
}
```

### Common TypeScript Commands

| Command | Purpose |
|---|---|
| `tsc` | Compile TypeScript files |
| `tsc --watch` | Watch and recompile |
| `tsc --noEmit` | Type check without output |
| `tsc --init` | Create tsconfig.json |
| `npx tsc --version` | Show TypeScript version |
| `npx tsc src/**/*.ts` | Compile specific files |
| `npx tsc --strict` | Enable strict mode |
| `npx tsc --target es2020` | Target specific ES version |

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
    "rootDir": "./src",
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"]
}
```

---

## Glossary of Terms

[â†‘ Back to Top](#top)

| Term | Definition |
|---|---|
| **TypeScript** | Typed superset of JavaScript that compiles to plain JavaScript |
| **Type Annotation** | Syntax to declare what type a variable should have (`:type`) |
| **Interface** | Contract defining the shape of an object; used for type checking |
| **Type Alias** | Named definition for any type using the `type` keyword |
| **Generic** | Template type parameter that works with multiple types (`<T>`) |
| **Union Type** | Type that can be one of several types (`type \| type`) |
| **Intersection Type** | Type combining multiple types with all properties (`type & type`) |
| **Type Guard** | Code pattern that narrows a union type to more specific type |
| **Type Predicate** | Custom function that narrows types (returns `is` type) |
| **Literal Type** | Type for specific value (`type Direction = 'up' \| 'down'`) |
| **Conditional Type** | Type based on condition (`T extends U ? A : B`) |
| **Mapped Type** | Transform properties of existing type (`{ [K in keyof T]: T[K] }`) |
| **Keyof** | Extract all keys from type as union (`keyof User` â†’ `'name' \| 'age'`) |
| **Typeof** | Get type of expression at compile time |
| **Instanceof** | Check if object is instance of class at runtime |
| **Type Assertion** | Manual type cast using `as` keyword (unsafe) |
| **Transpilation** | Convert TypeScript to JavaScript |
| **Compilation** | Convert source code to executable form |
| **Declaration File** | `.d.ts` file containing type definitions |
| **Ambient Declaration** | Type definition without implementation using `declare` |
| **Module** | File that exports types and values for reuse |
| **Namespace** | Logical grouping of code (less common than modules) |
| **Abstract** | Class or method that cannot be instantiated directly |
| **Override** | Redefine parent class method in subclass |
| **Polymorphism** | Objects of different types responding to same interface |
| **Encapsulation** | Hide internal implementation details from outside |
| **Inheritance** | Subclass extends properties/methods from superclass |
| **SPFx** | SharePoint Frameworkâ€”Microsoft's modern SharePoint dev platform |
| **PCF** | Power Apps Component Frameworkâ€”for custom Power Apps controls |
| **Manifest** | XML/JSON file defining component metadata and properties |
| **Bundle** | Packaged and minified code ready for distribution |
| **Package.json** | File listing project dependencies and scripts |
| **GCC Standard** | US Government Community Cloud with locked-down restrictions |
| **Proxy Authentication** | HTTP 407 auth required in GCC environments |

---

## Helpful URLs & Resources

[â†‘ Back to Top](#top)

### Official TypeScript

[â†‘ Back to Top](#helpful-urls)

- **TypeScript Official**: https://www.typescriptlang.org/
- **TypeScript Handbook**: https://www.typescriptlang.org/docs/handbook/
- **TypeScript Playground**: https://www.typescriptlang.org/play

### SharePoint Framework (SPFx)

[â†‘ Back to Top](#helpful-urls)

- **SPFx Home**: https://learn.microsoft.com/en-us/sharepoint/dev/spfx/
- **Setup Guide**: https://learn.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-development-environment
- **Web Parts**: https://learn.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/overview-client-side-web-parts
- **Yeoman Generator**: https://www.npmjs.com/package/@microsoft/generator-sharepoint
- **PnP Samples**: https://github.com/pnp/sp-dev-fx-webparts

### Power Apps & PCF

[â†‘ Back to Top](#helpful-urls)

- **PCF Overview**: https://learn.microsoft.com/en-us/power-apps/developer/component-framework/overview
- **Getting Started**: https://learn.microsoft.com/en-us/power-apps/developer/component-framework/implementing-controls-using-typescript
- **Power Platform CLI**: https://learn.microsoft.com/en-us/power-platform/developer/cli/introduction
- **PCF Samples**: https://github.com/microsoft/PowerApps-Samples/tree/master/component-framework

### Microsoft Teams

[â†‘ Back to Top](#helpful-urls)

- **Teams Platform**: https://learn.microsoft.com/en-us/microsoftteams/platform/
- **Bot Framework**: https://learn.microsoft.com/en-us/azure/bot-service/
- **Teams Samples**: https://github.com/OfficeDev/Microsoft-Teams-Samples

### Office Add-ins

[â†‘ Back to Top](#helpful-urls)

- **Add-ins Home**: https://learn.microsoft.com/en-us/office/dev/add-ins/
- **Excel Add-ins**: https://learn.microsoft.com/en-us/office/dev/add-ins/excel/excel-add-ins-overview
- **Samples**: https://github.com/OfficeDev/Office-Add-in-samples

### Azure & Serverless

[â†‘ Back to Top](#helpful-urls)

- **Azure Functions**: https://learn.microsoft.com/en-us/azure/azure-functions/
- **TypeScript Support**: https://learn.microsoft.com/en-us/azure/azure-functions/functions-develop-vs-code
- **Samples**: https://github.com/Azure-Samples

### Microsoft Graph

[â†‘ Back to Top](#helpful-urls)

- **Graph Home**: https://learn.microsoft.com/en-us/graph/
- **JavaScript SDK**: https://github.com/microsoftgraph/msgraph-sdk-javascript
- **API Reference**: https://learn.microsoft.com/en-us/graph/api/overview

### Learning Paths

[â†‘ Back to Top](#helpful-urls)

- **MS Learn - SPFx**: https://learn.microsoft.com/en-us/training/paths/develop-sharepoint-framework/
- **MS Learn - Power Apps**: https://learn.microsoft.com/en-us/training/paths/power-plat-functional-consultant/
- **MS Learn - Teams**: https://learn.microsoft.com/en-us/training/paths/teams-app-developer-fundamentals/

### Community

[â†‘ Back to Top](#helpful-urls)

- **Microsoft Tech Community**: https://techcommunity.microsoft.com/t5/microsoft-365-developer/
- **PnP Community**: https://pnp.github.io/
- **Stack Overflow - TypeScript**: https://stackoverflow.com/questions/tagged/typescript
- **Stack Overflow - SPFx**: https://stackoverflow.com/questions/tagged/sharepoint-framework
- **GitHub Discussions**: https://github.com/sharepoint/sp-dev-docs/discussions

### Tools & IDEs

[â†‘ Back to Top](#helpful-urls)

- **Visual Studio Code**: https://code.visualstudio.com/
- **Visual Studio 2022**: https://visualstudio.microsoft.com/vs/
- **Node.js**: https://nodejs.org/
- **npm Registry**: https://www.npmjs.com/
- **Git**: https://git-scm.com/
- **Postman**: https://www.postman.com/

---

**Last Updated**: October 1, 2026  
**TypeScript Version**: 5.8+  
**Target Platforms**: SPFx v1.22+, Power Apps, Teams, Office, Azure  
**Document Location**: c:\Davis\vibe\SPFx\Help\TypeScript.v2.Explain.md



