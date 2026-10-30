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

[↑ Back to Top](#top)

TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. It's the foundation for modern M365 development, providing compile-time type checking, superior IDE support, and better code maintainability.

**Key Facts**:
- **Current Version**: TypeScript 5.8+ (October 2024)
- **Required for**: SPFx v1.22+, all PCF components, Teams projects, Office Add-ins
- **Compilation**: TypeScript → JavaScript (all types erased at runtime)
- **Setup Time**: 15-30 minutes (if Node.js/npm already installed)
- **Learning Curve**: 4-8 hours for fundamentals; 2-4 weeks for proficiency

**Why TypeScript for M365**:
- ✅ Catch errors at compile time, not runtime
- ✅ Self-documenting code through type annotations
- ✅ Excellent IDE intellisense and autocomplete
- ✅ Safe refactoring across large codebases
- ✅ Native support in all Microsoft development tools

**GCC Standard Challenges**: Locked-down environments require internal package registries, proxy authentication (407), and no public internet access. Solutions provided in GCC section.

---

## TypeScript Keywords & Features

[↑ Back to Top](#top)

### Type Declaration Keywords

[↑ Back to Top](#typescript-keywords--features)

| Keyword | Purpose | Typical Use Cases | Example |
|---|---|---|---|
| `type` | Create type alias for reusable types | Define custom types, union types, object shapes | `type User = { name: string; age: number }` |
| `interface` | Define contract/shape for objects | Class contracts, API responses, object patterns | `interface IUser { name: string; age: number }` |
| `enum` | Named set of constants | Status codes, directions, colors | `enum Status { Active, Inactive, Pending }` |
| `class` | Define object blueprint with behavior | Component classes, service classes, models | `class User { constructor(name: string) { } }` |
| `namespace` | Organize code into logical groups | Prevent naming conflicts, organize large codebases | `namespace Company { export class Emp { } }` |
| `declare` | Ambient type declaration for external libs | Define types for JS libraries without types | `declare var jQuery: any` |

### Visibility & Scope Keywords

[↑ Back to Top](#typescript-keywords--features)

| Keyword | Purpose | Typical Use Cases | Example |
|---|---|---|---|
| `public` | Accessible everywhere (default) | Public API methods, visible properties | `public getName(): string { }` |
| `private` | Only accessible within the class | Encapsulation, internal state, helper methods | `private _internalCache: any` |
| `protected` | Accessible in class and subclasses | Base class functionality, inheritance patterns | `protected onInit(): void { }` |
| `static` | Class-level member, shared across instances | Utility methods, constants, factories | `static create(name: string): User { }` |
| `readonly` | Prevent reassignment after initialization | Immutable properties, constants | `readonly id: string` |
| `abstract` | Define interface for subclasses to implement | Force implementation in derived classes | `abstract class Animal { abstract bark(): void }` |

### Type Annotation Keywords

[↑ Back to Top](#typescript-keywords--features)

| Keyword | Purpose | Typical Use Cases | Example |
|---|---|---|---|
| `:` (colon) | Add type annotation | Specify variable, parameter, return types | `let name: string = "John"` |
| `as` | Type assertion/cast (unsafe) | Override inferred type, type narrowing | `(value as string).toUpperCase()` |
| `is` | Type predicate for custom narrowing | Create reusable type guards | `function isFish(pet: any): pet is Fish { }` |
| `keyof` | Extract union of object keys | Create type-safe property accessors | `type Keys = keyof MyObject` |
| `typeof` | Get type of value at runtime | Type narrowing, typeof guards | `if (typeof x === 'string') { }` |
| `instanceof` | Check if object is instance of class | Runtime type checking, instanceof guards | `if (obj instanceof Date) { }` |

### Advanced Type Keywords

[↑ Back to Top](#typescript-keywords--features)

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

[↑ Back to Top](#typescript-keywords--features)

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

[↑ Back to Top](#typescript-keywords--features)

| Keyword | Purpose | Typical Use Cases | Example |
|---|---|---|---|
| `async` | Mark function as asynchronous | Define promise-returning functions | `async function fetchData(): Promise<Data> { }` |
| `await` | Wait for promise resolution | Get result from async operation | `const result = await fetchData()` |
| `Promise<T>` | Type for async operation result | Promises, callbacks, async chains | `Promise<User[]>` |
| `try/catch/finally` | Error handling blocks | Handle exceptions gracefully | `try { } catch (e) { } finally { }` |
| `throw` | Throw an error | Signal exceptional conditions | `throw new Error("Invalid input")` |
| `yield` | Generate values in sequence | Generator functions, lazy evaluation | `function* gen() { yield 1; yield 2; }` |
| Control Flow | if/else, switch, for, while | Standard control structures | Standard JavaScript patterns |

---

## TypeScript in M365 Applications

[↑ Back to Top](#top)

### M365 Platform Comparison Table

[↑ Back to Top](#typescript-in-m365-applications)

| Platform | Runtime | Package Manager | Build Tool | Hosting | Key NPM Packages |
|----------|---------|---|---|---|---|
| **SPFx** | Node.js v22 | npm 11.x | Heft 1.3+ | SharePoint Online | @microsoft/sp-webpart-base, @microsoft/sp-core-library |
| **PCF** | Node.js v22 | npm 11.x | Heft 1.3+ | Canvas/Model Apps | @microsoft/pcf-scripts, @microsoft/pcf-start |
| **Teams** | Node.js v22 | npm 11.x | Heft 1.3+ | Azure/Teams Org | @microsoft/teams-js, botbuilder |
| **Office Add-in** | Node.js v22 | npm 11.x | Webpack | Office App | office-js, @microsoft/office-js-helpers |
| **Azure Functions** | Node.js v22 | npm 11.x | Azure CLI | Azure | azure-functions-core-tools |
| **Power Automate** | N/A | npm 11.x | Custom | Cloud Flow | @microsoft/microsoft-graph-client |
| **Graph SDK** | Node.js v22 | npm 11.x | npm | Anywhere | @microsoft/microsoft-graph-client, @azure/identity |

---

## SharePoint Framework (SPFx)

[↑ Back to Top](#typescript-in-m365-applications)

### Getting Started with SPFx

[↑ Back to Top](#sharepoint-framework-spfx)

1. **Install Node.js v22 LTS** (includes npm 11.x)
2. **Install Heft & Yeoman**:
   ```bash
   npm install --global @rushstack/heft yo @microsoft/generator-sharepoint
   ```
3. **Create project**: `yo @microsoft/sharepoint`
4. **Start dev server**: `heft start`
5. **Access workbench**: https://[tenant].sharepoint.com/sites/[site]/_layouts/15/workbench.aspx

### SPFx Project Structure

[↑ Back to Top](#sharepoint-framework-spfx)

```
my-spfx-project/
├── src/
│   ├── webparts/
│   │   └── myWebPart/
│   │       ├── MyWebPart.ts
│   │       ├── MyWebPart.module.scss
│   │       └── MyWebPartWebPart.manifest.json
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

### Sample SPFx Web Part (React)

[↑ Back to Top](#sharepoint-framework-spfx)

```typescript
import * as React from 'react';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-property-pane';

export interface IMyWebPartProps {
  title: string;
  description: string;
}

export default class MyWebPartWebPart extends BaseClientSideWebPart<IMyWebPartProps> {
  protected onInit(): Promise<void> {
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

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: { description: 'Web Part Properties' },
          groups: [
            {
              groupName: 'Settings',
              groupFields: [
                PropertyPaneTextField('title', { label: 'Title' }),
                PropertyPaneTextField('description', { label: 'Description' })
              ]
            }
          ]
        }
      ]
    };
  }

  protected onDispose(): void {
    super.onDispose();
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0.0');
  }
}

interface IMyWebPartProps {
  title: string;
  description: string;
}

const MyWebPart: React.FC<IMyWebPartProps> = (props) => {
  return (
    <div>
      <h2>{props.title}</h2>
      <p>{props.description}</p>
    </div>
  );
};
```

### Key SPFx Classes & Interfaces

[↑ Back to Top](#sharepoint-framework-spfx)

| Class/Interface | Purpose | Usage |
|---|---|---|
| `BaseClientSideWebPart<P>` | Base class for web parts | Extend this for all web parts |
| `IWebPartData` | Web part manifest data | Define web part metadata |
| `IPropertyPaneConfiguration` | Property pane structure | Configure property panels |
| `SPHttpClient` | HTTP client for SharePoint | Make REST API calls |
| `sp.web` | Web context access | Access current web properties |

### Essential SPFx Packages

[↑ Back to Top](#sharepoint-framework-spfx)

- **@microsoft/sp-webpart-base** - Base classes for web parts
- **@microsoft/sp-core-library** - Core utilities and services
- **@microsoft/sp-property-pane** - Property pane controls
- **@microsoft/sp-http** - HTTP client
- **@microsoft/sp-application-base** - Application context
- **@pnp/sp** - PnP JavaScript library (recommended)
- **react** - React library (v16-17 compatible)
- **@fluentui/react** - Fluent UI components

### SPFx Resources

[↑ Back to Top](#sharepoint-framework-spfx)

- Official Docs: https://learn.microsoft.com/en-us/sharepoint/dev/spfx/
- Setup Guide: https://learn.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-development-environment
- PnP Samples: https://github.com/pnp/sp-dev-fx-webparts
- Training: https://learn.microsoft.com/en-us/training/paths/develop-sharepoint-framework/

---

## Power Apps Code Components (PCF)

[↑ Back to Top](#typescript-in-m365-applications)

### Getting Started with PCF

[↑ Back to Top](#power-apps-code-components-pcf)

1. **Install Node.js v22 LTS**
2. **Install Power Apps CLI**: `npm install --global @microsoft/pac`
3. **Authenticate**: `pac auth create -u [url]`
4. **Create project**: `pac pcf init -n MyComponent -pp MyComponentNamespace`
5. **Install dependencies**: `npm install`
6. **Build**: `npm run build`
7. **Deploy**: `pac pcf push --pp [publisher-prefix]`

### PCF Project Structure

[↑ Back to Top](#power-apps-code-components-pcf)

```
MyComponent/
├── index.ts
├── ControlManifest.Input.xml
├── css/
│   └── MyComponent.css
├── config/
│   └── strings/
│       └── MyComponent.1033.resx
├── generated/
│   └── ManifestTypes.d.ts
└── package.json
```

### Sample PCF Component (TypeScript)

[↑ Back to Top](#power-apps-code-components-pcf)

```typescript
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { ILinearSliderOptions } from "./LinearSlider";

export class LinearSlider implements ComponentFramework.StandardControl<IInputs, IOutputs> {
  private container: HTMLDivElement;
  private sliderElement: HTMLInputElement;
  private context: ComponentFramework.Context<IInputs>;
  private notifyOutputChanged: () => void;

  public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement): void {
    this.context = context;
    this.notifyOutputChanged = notifyOutputChanged;
    this.container = container;

    // Create slider input
    this.sliderElement = document.createElement("input");
    this.sliderElement.type = "range";
    this.sliderElement.min = context.parameters.minValue.raw?.toString() || "0";
    this.sliderElement.max = context.parameters.maxValue.raw?.toString() || "100";
    this.sliderElement.value = context.parameters.value.raw?.toString() || "50";

    this.sliderElement.addEventListener("change", () => {
      this.notifyOutputChanged();
    });

    this.container.appendChild(this.sliderElement);
  }

  public updateView(context: ComponentFramework.Context<IInputs>): void {
    this.sliderElement.value = context.parameters.value.raw?.toString() || "50";
  }

  public getOutputs(): IOutputs {
    return {
      value: parseInt(this.sliderElement.value, 10)
    };
  }

  public destroy(): void {
    // Cleanup
  }
}
```

### PCF Manifest Configuration

[↑ Back to Top](#power-apps-code-components-pcf)

```xml
<?xml version="1.0" encoding="utf-8" ?>
<manifest>
  <control namespace="MyComponentNamespace" constructor="LinearSlider" version="1.0.0" display-name-key="Linear Slider">
    <property name="value" display-name-key="Value" of-type="Whole.None" usage="bound" required="false" />
    <property name="minValue" display-name-key="Min Value" of-type="Whole.None" usage="input" required="false" />
    <property name="maxValue" display-name-key="Max Value" of-type="Whole.None" usage="input" required="false" />
    <resources>
      <code path="index.ts" order="1" />
      <css path="css/LinearSlider.css" order="1" />
    </resources>
  </control>
</manifest>
```

### PCF Lifecycle Methods

[↑ Back to Top](#power-apps-code-components-pcf)

| Method | Called When | Purpose |
|--------|---|---|
| `init()` | Component loads | Initialize component, create DOM |
| `updateView()` | Input values change | Update UI with new values |
| `getOutputs()` | Component value changes | Return updated property values |
| `destroy()` | Component unloads | Cleanup resources |

### Essential PCF APIs

[↑ Back to Top](#power-apps-code-components-pcf)

- **ComponentFramework.Context** - Access control parameters and methods
- **ComponentFramework.DataSet** - Access data records
- **ComponentFramework.Factory** - Create popup dialogs, etc
- **ComponentFramework.Utility** - Utility functions

### PCF Resources

[↑ Back to Top](#power-apps-code-components-pcf)

- Code Components Guide: https://learn.microsoft.com/en-us/power-apps/developer/component-framework/overview
- Component Framework API: https://learn.microsoft.com/en-us/power-apps/developer/component-framework/reference/
- Samples: https://github.com/microsoft/PowerApps-Samples/tree/master/component-framework

---

## Power Automate Cloud Flows

[↑ Back to Top](#typescript-in-m365-applications)

### Sample Integration

[↑ Back to Top](#power-automate-cloud-flows)

Use TypeScript with Azure Functions triggered by Power Automate:

```typescript
// Azure Function called from Power Automate flow
import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const items = req.body.items;
    
    const processedItems = items.map((item: any) => ({
        id: item.id,
        name: item.name.toUpperCase(),
        processed: true,
        timestamp: new Date().toISOString()
    }));

    context.res = {
        body: processedItems,
        status: 200
    };
};

export default httpTrigger;
```

### Power Automate + TypeScript Patterns

[↑ Back to Top](#power-automate-cloud-flows)

| Pattern | Description | Usage |
|---------|---|---|
| **Azure Function Trigger** | Call TypeScript from flow | Data transformation, complex logic |
| **HTTP Trigger** | Webhook from flow | Real-time processing |
| **Timer Trigger** | Scheduled execution | Batch jobs, cleanup tasks |
| **HTTP Response** | Return data to flow | Pass results back to Power Automate |

---

## Microsoft Teams Applications

[↑ Back to Top](#typescript-in-m365-applications)

### Types of Teams Apps

[↑ Back to Top](#microsoft-teams-applications)

| Type | Technology | Use Case | Key NPM Package |
|------|---|---|---|
| **Teams Bot** | Bot Framework SDK | Conversational AI | botbuilder |
| **Teams Tab** | React/SPFx | Embedded web app | @microsoft/teams-js |
| **Message Extension** | Bot Framework | Search/compose | botbuilder |
| **Connector** | Webhooks | Notifications | (Custom) |

### Sample Teams Bot (TypeScript)

[↑ Back to Top](#microsoft-teams-applications)

```typescript
import { 
    CloudAdapter, 
    ConfigurationBotFrameworkAuthentication,
    ActivityHandler,
    MessageFactory,
    TurnContext 
} from 'botbuilder';

export class TeamsBot extends ActivityHandler {
    constructor() {
        super();

        this.onMessage(async (context, next) => {
            const replyText = `Echo: ${context.activity.text}`;
            await context.sendActivity(MessageFactory.text(replyText));
            await next();
        });

        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            for (let member of membersAdded) {
                if (member.id !== context.activity.recipient.id) {
                    await context.sendActivity(
                        MessageFactory.text(`Welcome to Teams Bot!`)
                    );
                }
            }
            await next();
        });
    }

    protected async onTeamsVerificationInvoke(context: TurnContext): Promise<any> {
        return { status: 200, body: context.activity.value.challenge };
    }
}
```

### Teams Resources

[↑ Back to Top](#microsoft-teams-applications)

- Teams App Development: https://learn.microsoft.com/en-us/microsoftteams/platform/
- Bot Framework: https://dev.botframework.com/
- Teams JavaScript SDK: https://github.com/OfficeDev/microsoft-teams-library-js

---

## Office Add-ins

[↑ Back to Top](#typescript-in-m365-applications)

### Getting Started with Office Add-ins

[↑ Back to Top](#office-add-ins)

1. **Install Yeoman generator**: `npm install --global yo generator-office`
2. **Create project**: `yo office`
3. **Install dependencies**: `npm install`
4. **Start dev server**: `npm start`
5. **Sideload in Office**: Upload manifest to Office app

### Sample Excel Add-in (TypeScript)

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
            // Get the active worksheet
            const sheet = context.workbook.worksheets.getActiveWorksheet();
            
            // Get cell A1 and set value
            const cell = sheet.getRange("A1");
            cell.values = [["Hello from TypeScript!"]];
            
            // Format the cell
            cell.format.font.size = 14;
            cell.format.font.bold = true;

            await context.sync();
        });
    } catch (error) {
        console.error(error);
    }
}
```

### Office Add-in Resources

[↑ Back to Top](#office-add-ins)

- Office Add-ins Guide: https://learn.microsoft.com/en-us/office/dev/add-ins/
- Office JavaScript API: https://learn.microsoft.com/en-us/javascript/api/overview/office
- Samples: https://github.com/OfficeDev/Office-Add-in-samples

---

## Azure Functions & Serverless

[↑ Back to Top](#typescript-in-m365-applications)

### Getting Started

[↑ Back to Top](#azure-functions--serverless)

1. **Install Azure Functions CLI**: `npm install --global azure-functions-core-tools@4`
2. **Create project**: `func init MyFunctionApp --typescript`
3. **Create function**: `func new --name MyFunction --template "HTTP trigger"`
4. **Run locally**: `func start`
5. **Deploy**: `func azure functionapp publish [app-name]`

### Sample Azure Function (TypeScript)

[↑ Back to Top](#azure-functions--serverless)

```typescript
import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { Client } from "@microsoft/microsoft-graph-client";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    try {
        const client = Client.init({
            authProvider: async (done) => {
                // Authentication handled by Managed Identity
                const token = await getToken();
                done(null, token);
            }
        });

        // Get users from Microsoft Graph
        const users = await client.api("/users").get();

        context.res = {
            status: 200,
            body: users.value
        };
    } catch (error) {
        context.res = {
            status: 500,
            body: { error: error.message }
        };
    }
};

async function getToken(): Promise<string> {
    // Use Managed Identity or other auth mechanism
    return "";
}

export default httpTrigger;
```

### Azure Functions Resources

[↑ Back to Top](#azure-functions--serverless)

- Azure Functions Guide: https://learn.microsoft.com/en-us/azure/azure-functions/
- Node.js Developer Guide: https://learn.microsoft.com/en-us/azure/azure-functions/functions-reference-node
- Bindings: https://learn.microsoft.com/en-us/azure/azure-functions/functions-triggers-bindings

---

## Microsoft Graph & Dataverse

[↑ Back to Top](#typescript-in-m365-applications)

### Microsoft Graph TypeScript SDK

[↑ Back to Top](#microsoft-graph--dataverse)

```typescript
import { Client } from "@microsoft/microsoft-graph-client";
import { TokenCredential } from "@azure/identity";

// Initialize Graph Client
const client = Client.init({
    authProvider: async (done) => {
        // Get token from your auth provider
        const token = await getAccessToken();
        done(null, token);
    }
});

// Get current user
const user = await client.api("/me").get();
console.log(`Hello, ${user.displayName}!`);

// Get user's calendar events
const events = await client.api("/me/events").get();
console.log(events.value);

// Create a task
const task = await client.api("/me/todo/lists/tasks/tasks").post({
    title: "Complete TypeScript guide",
    importance: "high"
});
```

### Microsoft Graph Resources

[↑ Back to Top](#microsoft-graph--dataverse)

- Microsoft Graph Docs: https://learn.microsoft.com/en-us/graph/
- TypeScript SDK: https://github.com/microsoftgraph/msgraph-sdk-javascript
- API Explorer: https://developer.microsoft.com/en-us/graph/graph-explorer

---

## Getting Started with TypeScript

[↑ Back to Top](#top)

### Step 1: Install Prerequisites

[↑ Back to Top](#getting-started-with-typescript)

```powershell
# Install Node.js v22 LTS from nodejs.org
node --version   # Should show v22.x.x
npm --version    # Should show 11.x.x

# Install TypeScript globally (optional)
npm install --global typescript
tsc --version    # Should show 5.8.x or higher
```

### Step 2: Initialize a TypeScript Project

[↑ Back to Top](#getting-started-with-typescript)

```powershell
mkdir my-typescript-project
cd my-typescript-project
npm init -y
npm install --save-dev typescript

# Create tsconfig.json
npx tsc --init
```

### Step 3: Create Your First TypeScript File

[↑ Back to Top](#getting-started-with-typescript)

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

[↑ Back to Top](#getting-started-with-typescript)

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

[↑ Back to Top](#top)

### What is GCC Standard?

[↑ Back to Top](#gcc-standard-considerations)

GCC (Government Community Cloud) Standard is a secure, isolated cloud environment for US government agencies with strict compliance requirements:

- **407 Proxy Authentication** required for all external connections
- **No public internet access** - internal registries only
- **SSL/TLS inspection** for all traffic
- **Restricted APIs** - some Graph endpoints unavailable
- **Approved packages only** - whitelist-based dependency management

### npm Registry Configuration for GCC

[↑ Back to Top](#gcc-standard-considerations)

#### Option 1: Internal npm Mirror

[↑ Back to Top](#gcc-standard-considerations)

```powershell
# Configure npm for internal registry
npm config set registry https://internal-npm-mirror.agency.gov/npm/
npm config set strict-ssl true
npm config set ca-file C:\certs\internal-ca.crt

# Configure proxy if needed
npm config set proxy http://[proxy]:407
npm config set https-proxy http://[proxy]:407
npm config set proxy-auth username:password
```

#### Option 2: Azure Artifacts

[↑ Back to Top](#gcc-standard-considerations)

```powershell
# Install credential provider
iex "& { $(irm https://aka.ms/install-artifacts-credprovider.ps1) } -AddNetfx"

# Configure npm to use Azure Artifacts
npm config set registry https://[org].pkgs.visualstudio.com/[project]/_packaging/[feed]/npm/registry/
npm config set always-auth true
```

#### Option 3: Local Archive Installation

[↑ Back to Top](#gcc-standard-considerations)

```powershell
# Create offline package archive
npm ci --offline

# Install from local archive
npm install --cache-max=0 --prefer-offline --no-audit

# Manually add packages from approved list
npm install --save typescript@5.8.2  # From local registry
```

### Git Configuration for GCC

[↑ Back to Top](#gcc-standard-considerations)

```powershell
# Configure Git for proxy
git config --global http.proxy http://[proxy]:407
git config --global https.proxy http://[proxy]:407
git config --global http.proxy-auth-type basic
git config --global http.proxyAuthMethod basic

# Use internal Git server if available
git config --global url."https://internal-git-server/".insteadOf "https://github.com/"

# Disable SSL verification only if using internal CA (not recommended)
git config --global http.sslVerify true
git config --global http.sslCAInfo "C:\certs\internal-ca.crt"
```

### Approved TypeScript Packages for GCC

[↑ Back to Top](#gcc-standard-considerations)

| Package | Version | Status | Notes |
|---------|---------|--------|-------|
| `typescript` | 5.8+ | ✅ Approved | Core language |
| `@microsoft/sp-*` | 1.22-1.23 | ✅ Approved | SPFx packages |
| `@pnp/sp` | v3+ | ✅ Approved | PnP library |
| `react` | v16-18 | ✅ Approved | UI framework |
| `@fluentui/react` | v8+ | ✅ Approved | UI components |
| `axios` | v1+ | ✅ Approved | HTTP client |
| `lodash` | v4+ | ✅ Approved | Utility library |
| `date-fns` | v2+ | ✅ Approved | Date library |

### GCC Best Practices

[↑ Back to Top](#gcc-standard-considerations)

1. **Always use approved packages** - check with security team
2. **Audit dependencies** - `npm audit` before deployment
3. **Use exact versions** - pin versions in package-lock.json
4. **Monitor supply chain** - use Software Composition Analysis (SCA)
5. **Implement code scanning** - catch security issues early
6. **Use Managed Identity** - for Azure resource auth
7. **Encrypt sensitive data** - at rest and in transit
8. **Document approvals** - keep records of package approvals

---

## Essential Libraries & Packages

[↑ Back to Top](#top)

### Core TypeScript Development

[↑ Back to Top](#essential-libraries--packages)

```json
{
  "devDependencies": {
    "typescript": "^5.8.0",
    "@types/node": "^20.0.0",
    "ts-node": "^10.9.0",
    "tsc-alias": "^1.8.0",
    "typescript-eslint": "^7.0.0"
  }
}
```

### SharePoint & M365 Development

[↑ Back to Top](#essential-libraries--packages)

```json
{
  "devDependencies": {
    "@microsoft/sp-webpart-base": "^1.23.0",
    "@microsoft/sp-core-library": "^1.23.0",
    "@microsoft/sp-property-pane": "^1.23.0",
    "@microsoft/sp-http": "^1.23.0",
    "@pnp/sp": "^3.20.0",
    "@pnp/graph": "^3.20.0"
  }
}
```

### Utility Libraries

[↑ Back to Top](#essential-libraries--packages)

```json
{
  "dependencies": {
    "lodash": "^4.17.21",
    "axios": "^1.6.0",
    "date-fns": "^2.30.0",
    "uuid": "^9.0.0",
    "dotenv": "^16.3.0"
  }
}
```

---

## GitHub Sample Repositories

[↑ Back to Top](#top)

### Microsoft Official Samples

[↑ Back to Top](#github-sample-repositories)

- SPFx Samples: https://github.com/pnp/sp-dev-fx-webparts
- Power Apps Samples: https://github.com/microsoft/PowerApps-Samples
- Teams Samples: https://github.com/OfficeDev/TeamsFx-Samples
- Office Add-in Samples: https://github.com/OfficeDev/Office-Add-in-samples
- Graph SDK Samples: https://github.com/microsoftgraph/msgraph-sdk-javascript-core

### PnP Community Samples

[↑ Back to Top](#github-sample-repositories)

- PnP SP Dev: https://github.com/pnp/sp-dev-fx-webparts
- PnP PnPJS: https://github.com/pnp/pnpjs
- PnP Modern Search: https://github.com/microsoft-search/pnp-modern-search

---

## Technical Cheat Sheet

[↑ Back to Top](#top)

### Quick TypeScript Patterns

[↑ Back to Top](#technical-cheat-sheet)

```typescript
// Union Types
type Status = 'active' | 'inactive' | 'pending';

// Intersection Types
type Named = { name: string };
type Aged = { age: number };
type Person = Named & Aged;

// Generics
function first<T>(arr: T[]): T { return arr[0]; }

// Type Guards
function isString(value: unknown): value is string {
  return typeof value === 'string';
}

// Conditional Types
type IsString<T> = T extends string ? true : false;

// Mapped Types
type Readonly<T> = { readonly [K in keyof T]: T[K] };

// Utility Types
type PartialUser = Partial<User>;
type ReadonlyUser = Readonly<User>;
type UserWithoutPassword = Omit<User, 'password'>;
```

### Common TypeScript Commands

[↑ Back to Top](#technical-cheat-sheet)

```powershell
# Initialize new TypeScript project
npx tsc --init

# Compile all TypeScript files
npx tsc

# Compile and watch for changes
npx tsc --watch

# Check types without generating JavaScript
npx tsc --noEmit

# Strict mode (recommended)
npx tsc --strict

# Build with source maps (for debugging)
npx tsc --sourceMap

# List all compiler options
npx tsc --help
```

### tsconfig.json Essential Settings

[↑ Back to Top](#technical-cheat-sheet)

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
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
| **TypeScript** | Typed superset of JavaScript that compiles to plain JavaScript |
| **Type Annotation** | Explicit declaration of variable type using `:` syntax |
| **Interface** | Contract defining object shape and properties |
| **Generic** | Reusable type that works with multiple data types |
| **Union Type** | Type that can be one of several types (using `\|` operator) |
| **Intersection Type** | Type combining multiple types (using `&` operator) |
| **Type Guard** | Function that narrows type in conditional blocks |
| **Conditional Type** | Type that depends on another type condition |
| **Mapped Type** | Type created by transforming properties of another type |
| **Utility Type** | Built-in generic type for common transformations |
| **Literal Type** | Type matching specific string, number, or boolean value |
| **Never Type** | Type with no values, used for impossible conditions |
| **Any Type** | Escape hatch that disables type checking (avoid) |
| **Type Inference** | Automatic type detection without explicit annotation |
| **Type Assertion** | Telling compiler what type a value is (unsafe) |
| **Namespace** | Logical grouping of code to avoid naming conflicts |
| **Module** | File with imports/exports for code organization |
| **Decorator** | Metadata annotation that modifies class/method behavior |
| **Enum** | Set of named constants with numeric or string values |
| **Abstract Class** | Class that cannot be instantiated, only extended |
| **Readonly** | Property that cannot be modified after initialization |
| **Async** | Function returning Promise, allowing await usage |
| **Promise** | Object representing eventual completion of async operation |
| **Type Definition** | `.d.ts` file describing types for JavaScript library |
| **tsconfig.json** | Configuration file for TypeScript compiler settings |
| **SPFx** | SharePoint Framework - Microsoft's modern development platform |
| **PCF** | Power Apps Code Components - reusable controls |
| **GCC** | Government Community Cloud - secure government environment |
| **Node.js** | JavaScript runtime for server-side execution |
| **npm** | Node Package Manager for dependency management |
| **Heft** | Modern build toolchain replacing older build systems |

---

## Helpful URLs & Resources

[↑ Back to Top](#top)

### Official TypeScript

[↑ Back to Top](#helpful-urls--resources)

- TypeScript Handbook: https://www.typescriptlang.org/docs/
- TypeScript Playground: https://www.typescriptlang.org/play
- TypeScript Release Notes: https://www.typescriptlang.org/docs/handbook/release-notes/
- TypeScript GitHub: https://github.com/microsoft/TypeScript

### SharePoint Framework (SPFx)

[↑ Back to Top](#helpful-urls--resources)

- SPFx Overview: https://learn.microsoft.com/en-us/sharepoint/dev/spfx/
- SPFx Setup Guide: https://learn.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-development-environment
- SPFx Training: https://learn.microsoft.com/en-us/training/paths/develop-sharepoint-framework/
- Heft Build Tool: https://rushstack.io/pages/heft/overview/

### Power Apps & PCF

[↑ Back to Top](#helpful-urls--resources)

- Power Apps Docs: https://learn.microsoft.com/en-us/power-apps/
- PCF Development: https://learn.microsoft.com/en-us/power-apps/developer/component-framework/
- PCF Samples: https://github.com/microsoft/PowerApps-Samples

### Microsoft Teams

[↑ Back to Top](#helpful-urls--resources)

- Teams Developer Guide: https://learn.microsoft.com/en-us/microsoftteams/platform/
- Bot Framework: https://dev.botframework.com/
- Teams JavaScript SDK: https://github.com/OfficeDev/microsoft-teams-library-js

### Office Add-ins

[↑ Back to Top](#helpful-urls--resources)

- Office Add-ins: https://learn.microsoft.com/en-us/office/dev/add-ins/
- Office JavaScript API: https://learn.microsoft.com/en-us/javascript/api/overview/office
- Add-in Samples: https://github.com/OfficeDev/Office-Add-in-samples

### Azure & Serverless

[↑ Back to Top](#helpful-urls--resources)

- Azure Functions: https://learn.microsoft.com/en-us/azure/azure-functions/
- Azure Node.js Dev: https://learn.microsoft.com/en-us/azure/azure-functions/functions-reference-node
- Azure CLI: https://learn.microsoft.com/en-us/cli/azure/

### Microsoft Graph

[↑ Back to Top](#helpful-urls--resources)

- Graph Overview: https://learn.microsoft.com/en-us/graph/
- Graph API Reference: https://learn.microsoft.com/en-us/graph/api/overview
- Graph Explorer: https://developer.microsoft.com/en-us/graph/graph-explorer
- TypeScript SDK: https://github.com/microsoftgraph/msgraph-sdk-javascript

### Learning Paths

[↑ Back to Top](#helpful-urls--resources)

- Microsoft Learn: https://learn.microsoft.com/en-us/
- LinkedIn Learning: https://www.linkedin.com/learning/
- Pluralsight: https://www.pluralsight.com/

### Community

[↑ Back to Top](#helpful-urls--resources)

- Stack Overflow: https://stackoverflow.com/questions/tagged/typescript
- Dev.to: https://dev.to/t/typescript
- Reddit: https://reddit.com/r/typescript
- GitHub Discussions: https://github.com/microsoft/TypeScript/discussions

### Tools & IDEs

[↑ Back to Top](#helpful-urls--resources)

- Visual Studio Code: https://code.visualstudio.com/
- Visual Studio 2022: https://visualstudio.microsoft.com/
- Node.js: https://nodejs.org/
- npm: https://www.npmjs.com/

---

**Last Updated**: October 1, 2026  
**TypeScript Version**: 5.8+  
**For**: M365 Development (SPFx, PCF, Teams, Office Add-ins, Azure Functions)  
**Environment**: GCC Standard Compatible
