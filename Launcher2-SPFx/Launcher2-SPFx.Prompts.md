

1:35 AM 10/30/2026

2:15 AM 10/30/2026 start plan

3:19 AM 10/30/2026 laptop restarte 304a stopped session restart and new folder

3:55 AM 10/30/2026 global connect

4:03 AM 10/30/2026 using INCOMPLETE. moved that folder and resubmit prompt again.

...



In C:\\Davis\\vibe\\SPFx\\Launcher2-SPFx folder

create new SPFx project and use

LauncherSPFx\\ARCHITECTURE\_OVERVIEW.md

as a reference.

Create a similar SPFx project with pluggable architecture, except these different requirements for each plug-in.



Requirements for the SPFx Host package (app).

The SPFx host package (app) that has the pluggable architecture - can be built once, needs minimal configuration.

1. Each additional plug-in or SPA or Modern web part should not need any rebuilding.
2. Minimal or zero configuration should be used - that is, each plug-in should be self-discovering, if possible.
3. There should be minimal dependencies - and all should be documented.
4. Any new SPFx update should not require a rebuild.
5. SharePoint Lists should be accessible.
6. Power Platform connectors should be accessible.
7. Dataverse should be accessible.
8. If possible, administration like Entra and Power Platform and SharePoint should be accessible.
9. If possible, use the Edge or browser user context. This means if I have elevated account, I should be able to see M365 Admin above (Entra, Power Platform or at very least SharePoint Lists and Users.
10. Interfaces above should be well-documented.
11. The package will be built on another system and deployed to cloud.









Requirements for each plug-in, which should be a Single Page Web app. Modern web parts can be supported. let me know if that needs to be a separate sub-folder.

1. JavaScript should be used as I will not have "tsc" TypeScript compiler - \*AFTER\* the SPFx Package is deployed.
2. Each plug-in or SPA should be self-discovering, easy to add and load right away - no restart of anything in cloud or browser needed.
3. Modern browsers will be used- no more than 2-3 years old.
4. Main browser will be Edge, but Firefox and Chrome can be used - those may be few months older - maybe even a year.
5. Each new plug-in or SPA should not need any server package rebuild.
6. Each SPA especially - should be able to be tested outside the whole framework, but if connections to SharePoint Lists and M365 are needed there can be a mode or another version - this should be documented how to create an SPA that fits into the Launcher2 above.
7. JavaScript test tools should be available.
8. Can assume the latest JavaScript / ECMAScript and that should be stated in a new getting started.
9. Should be able to persist settings.
10. If possible, should be able to share settings with other plug-ins or plug-in SPAs





New Documents (at least) should be created.

SPFx.GettingStarted.md - shows how to build the host SPFx package - step-by-step and any anomalies like version dependencies.

PlugIns.GettingStarted.md - shows how to create a plug-in that works with SharePoint Lists, users. And should work with Microsoft cloud.

SPAs.GettingStarted.md - a plug-in that is specifically an SPA Single Page App.

A new architecture document in Markdown format.



END Plan







