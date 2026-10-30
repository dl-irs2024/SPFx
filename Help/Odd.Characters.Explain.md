# Character Encoding Issues: What Happened to Your Arrow {#top}

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [What Happened to Your File](#what-happened-to-your-file)
3. [Character Encoding Fundamentals](#character-encoding-fundamentals)
4. [Double Encoding Explained](#double-encoding-explained)
5. [Common Causes & Scenarios](#common-causes--scenarios)
6. [How It Happens in PowerShell](#how-it-happens-in-powershell)
7. [How It Happens in WPF Applications](#how-it-happens-in-wpf-applications)
8. [Prevention & Solutions](#prevention--solutions)
9. [Technical Reference](#technical-reference)
10. [Quick Reference Guide](#quick-reference-guide)
    - [PowerShell Quick Fixes](#powershell-quick-fixes)
    - [C# / .NET Quick Fixes](#csharp-dotnet-quick-fixes)
    - [IDE Configuration](#ide-configuration)
    - [One-Liner Fixes](#one-liner-fixes)
11. [Unicode, Emoji & UTF-8 Reference](#unicode-emoji--utf8-reference)
    - [ASCII Table (0-127)](#ascii-table-0-127)
    - [Unicode Common Characters with Input Methods](#unicode-common-characters-with-input-methods)
    - [UTF-8 Encoding Breakdown Examples](#utf-8-encoding-breakdown-examples)
    - [Double-Encoded Character Examples](#double-encoded-character-examples)
    - [Emoji Reference with UTF-8 Encoding](#emoji-reference-with-utf8-encoding)
    - [Character Input Methods on Windows](#character-input-methods-on-windows)
    - [Keyboard Layout Method (Compose Key)](#keyboard-layout-method-compose-key)
12. [Summary](#summary)

---

## Executive Summary

[↑ Back to Top](#top)

Your arrow character (↑) became "â†'" due to **double encoding**—a phenomenon where UTF-8 bytes are incorrectly re-interpreted as Latin-1 text and then re-encoded as UTF-8.

**What you're seeing:**
- Original: `↑` (U+2191, UTF-8: `E2 86 91`)
- Corrupted: `â†'` (appears as the "wrong" character)
- Actual bytes: `C3 A2 E2 80 86 E2 80 91` (double-encoded)

**Why it happens:**
1. Original UTF-8 bytes exist correctly in file
2. A tool/process treats UTF-8 bytes as Latin-1 text
3. Those "characters" are re-encoded to UTF-8
4. Result: Gibberish that displays as mojibake

**Common in:** PowerShell file operations, WPF string handling, database imports, version control systems, text editor encoding mismatches.

---

## What Happened to Your File

[↑ Back to Top](#top)

When you used PowerShell commands to modify your markdown file, here's the sequence of events:

### Step 1: Original File State
```
TypeScript.v2.Explain.md contains:
[↑ Back to Top](#top)
Bytes: 5B E2 86 91 20 42 61 63 6B 20 74 6F 20 54 6F 70 5D
         [  ↑           B  a  c  k  ...
```
✅ **Correct**: Single UTF-8 encoding of the arrow character

### Step 2: PowerShell Read Operation
```powershell
$content = Get-Content file.md
```

**What happened internally:**
- PowerShell read the file (encoding detection varies)
- The UTF-8 arrow bytes `E2 86 91` were correctly decoded to the Unicode character U+2191
- The string now contains the correct character in memory

### Step 3: String Replacement
```powershell
$content = $content.Replace("old", "new")
```

✅ **This part was fine** - the string manipulation worked correctly in memory

### Step 4: File Write Operation
```powershell
Set-Content $file $content
# or
[System.IO.File]::WriteAllText($path, $content, [System.Text.Encoding]::UTF8)
```

**Where corruption happened:**
- PowerShell's default encoding assumption or file encoding mismatch
- The character in memory (↑) was written back
- BUT: If the target file had a different encoding detected or if PowerShell switched encoding contexts, it might have:
  1. Treated the character as already-encoded bytes
  2. Re-encoded those bytes as UTF-8
  3. Created the double-encoding

### Step 5: What You See Now
```
[â†' Back to Top](#top)
Actual bytes: 5B C3 A2 E2 80 A0 E2 80 98 20 42 61 63 6B...
              [  â  †  '                B  a  c  k
```

❌ **Double-encoded**: The original UTF-8 bytes were treated as Latin-1 and re-encoded

---

## Character Encoding Fundamentals

[↑ Back to Top](#top)

### Unicode vs. UTF-8

| Concept | Details |
|---------|---------|
| **Unicode** | Abstract character set (U+0000 to U+10FFFF) |
| **UTF-8** | **Variable-length encoding** of Unicode (1-4 bytes per character) |
| **UTF-16** | Fixed 2-4 byte encoding (Windows internal default) |
| **ASCII** | First 128 characters (0x00-0x7F), subset of UTF-8 |
| **Latin-1** | 8-bit encoding (0x00-0xFF), **NOT compatible with UTF-8** |

### Your Arrow Character

```
Character:  ↑ (UP ARROW)
Unicode:    U+2191
UTF-8 bytes: E2 86 91  (3 bytes)
UTF-16:      91 21    (little-endian Windows)
ASCII:       NOT representable (outside 0-127 range)
Latin-1:     NOT representable (outside 0-255 range)
```

### Single vs. Double Encoding

```
SINGLE ENCODING (Correct):
Unicode U+2191 → [UTF-8 Encoder] → Bytes: E2 86 91 → File

DOUBLE ENCODING (What Happened):
Unicode U+2191 → [UTF-8 Encoder #1] → Bytes: E2 86 91
                                           ↓
Bytes E2 86 91 → [Misinterpreted as Latin-1: 3 chars "âˆ'" ]
                                           ↓
Char "â" (U+00E2) + "ˆ" (U+02C6) + "'" (U+2018) 
                                           ↓
[UTF-8 Encoder #2] → Bytes: C3 A2 C2 86 C2 18 → File (WRONG!)
```

---

## Double Encoding Explained

[↑ Back to Top](#top)

### The Mechanism

Double encoding happens when text passes through TWO encoding operations instead of one:

```
Step 1: Convert Unicode → UTF-8 bytes
┌─────────────────────────────────┐
│ Unicode Character (↑, U+2191)   │
└────────────┬────────────────────┘
             ↓
┌─────────────────────────────────┐
│ UTF-8 Encoder                   │
│ U+2191 → E2 86 91               │
└────────────┬────────────────────┘
             ↓
┌─────────────────────────────────┐
│ File contains bytes:            │
│ E2 86 91 (correct!)             │
└─────────────────────────────────┘

⚠️ PROBLEM OCCURS HERE:

Step 2: Process treats bytes as CHARACTERS instead of bytes
┌─────────────────────────────────┐
│ Process reads bytes: E2 86 91    │
│ Interprets as: Latin-1 chars    │
│ Maps to: â (E2) + ˆ (86) + ' (91)
└────────────┬────────────────────┘
             ↓
┌─────────────────────────────────┐
│ UTF-8 Encoder again!            │
│ â → C3 A2                       │
│ ˆ → C2 86                       │
│ ' → C2 91                       │
└────────────┬────────────────────┘
             ↓
┌─────────────────────────────────┐
│ File now contains:              │
│ C3 A2 C2 86 C2 91 (CORRUPTED!)  │
└─────────────────────────────────┘
```

### Your Specific Case

```
Original UTF-8: E2 86 91 (arrow ↑)
                   ↓
[Misinterpreted as text characters in Latin-1]
                   ↓
â (U+00E2) + ˆ (U+02C6) + ' (U+2019)
                   ↓
[Re-encoded as UTF-8]
                   ↓
C3 A2 C2 86 C2 99 (displays as "â†'")
```

---

## Common Causes & Scenarios

[↑ Back to Top](#top)

### Scenario 1: PowerShell File Encoding Mismatch

```powershell
# ❌ PROBLEM: Default encoding varies by system
$content = Get-Content "file.txt"
$content | Set-Content "file.txt"  # Might use different encoding!

# ✅ SOLUTION: Explicitly specify encoding
$content = Get-Content "file.txt" -Encoding UTF8
$content | Set-Content "file.txt" -Encoding UTF8

# ✅ BEST: Use System.IO for full control
$content = [System.IO.File]::ReadAllText("file.txt", [System.Text.Encoding]::UTF8)
[System.IO.File]::WriteAllText("file.txt", $content, [System.Text.Encoding]::UTF8)
```

**Why it happens:**
- PowerShell on Windows defaults to different encodings depending on system locale
- Some cmdlets auto-detect encoding (often incorrectly)
- Pipeline operations might change encoding context

### Scenario 2: Database Import/Export

```sql
-- ❌ PROBLEM: Exporting UTF-8 from MySQL, importing as Latin-1 into MSSQL
SELECT * FROM table INTO OUTFILE 'file.txt' CHARACTER SET utf8mb4;
BULK INSERT table FROM 'file.txt' WITH (CODEPAGE = '1252');  -- Wrong!

-- ✅ SOLUTION: Ensure encoding matches
BULK INSERT table FROM 'file.txt' WITH (CODEPAGE = 'UTF-8');
```

### Scenario 3: Git & Version Control

```bash
# ❌ PROBLEM: Git not configured for UTF-8
git config core.quotepath false  # Show unicode properly
git config i18n.commitencoding utf-8
git config i18n.logoutputencoding utf-8

# ✅ SOLUTION: Configure Git globally
git config --global core.safecrlf true
git config --global core.preloadindex true
git config --global i18n.commitencoding utf-8
git config --global i18n.logoutputencoding utf-8
```

### Scenario 4: Text Editor with Wrong Encoding

| Tool | Issue | Solution |
|------|-------|----------|
| VS Code | Default UTF-8 (good) | Check `Files: Encoding` setting |
| Notepad | Often defaults to ANSI | Explicitly choose UTF-8 |
| Word | Saves as UTF-16 by default | Export as .txt UTF-8 |
| PowerShell ISE | Uses system locale encoding | Specify -Encoding UTF8 |

### Scenario 5: HTTP/Web Communication

```html
<!-- ❌ PROBLEM: HTML declares wrong charset -->
<meta charset="ISO-8859-1">  <!-- But body is UTF-8! -->

<!-- ✅ SOLUTION: Match declaration with actual content -->
<meta charset="UTF-8">
```

---

## How It Happens in PowerShell

[↑ Back to Top](#top)

### The Root Cause

PowerShell has **complex encoding logic** that varies by:
- Windows version
- System locale setting
- File's current encoding
- Command used (Get-Content vs. System.IO)
- Pipeline position

### Common PowerShell Encoding Issues

#### Issue 1: Get-Content Default Encoding

```powershell
# On Windows US English:
$content = Get-Content "file.txt"
# → Uses system encoding (often CP1252 on US systems)
# → If file is UTF-8, might misdetect and re-encode

# On Windows non-English:
$content = Get-Content "file.txt"
# → Uses that language's encoding
# → Almost guaranteed to corrupt UTF-8
```

**Fix:**
```powershell
# Always specify UTF-8 explicitly
$content = Get-Content "file.txt" -Encoding UTF8 -Raw
```

#### Issue 2: Set-Content Encoding Context

```powershell
# ❌ PROBLEM: Encoding context can change in pipeline
Get-Content "source.txt" | Set-Content "dest.txt"
# → Read encoding: System locale
# → Write encoding: System locale (but might differ!)
# → Double encoding if intermediate processing touches non-ASCII

# ✅ SOLUTION: Keep encoding consistent
$content = [System.IO.File]::ReadAllText("source.txt", [Text.Encoding]::UTF8)
[System.IO.File]::WriteAllText("dest.txt", $content, [Text.Encoding]::UTF8)
```

#### Issue 3: String Replacement with Special Characters

```powershell
# ❌ PROBLEM: PowerShell string literals might use wrong encoding
$arrow = "↑"  # Depends on ISE/console code page
$text = $text.Replace($arrow, "new")

# ✅ SOLUTION: Use Unicode escape sequences
$arrow = [char]0x2191  # Unicode up arrow
$text = $text.Replace($arrow, "new")

# ✅ BETTER: Use string literal with proper encoding
$arrow = "`u{2191}"  # PowerShell 6+ Unicode escape
```

#### Issue 4: Out-File Default Encoding

```powershell
# ❌ PROBLEM: Out-File uses Unicode (UTF-16 LE) by default!
$content | Out-File "file.txt"  # Creates UTF-16 LE, not UTF-8!

# ✅ SOLUTION: Explicitly specify encoding
$content | Out-File "file.txt" -Encoding UTF8

# ✅ BEST: Use System.IO instead
[System.IO.File]::WriteAllText("file.txt", $content, [System.Text.Encoding]::UTF8)
```

#### Issue 5: PowerShell Console Encoding

```powershell
# Check current console encoding
[System.Console]::OutputEncoding
[System.Console]::InputEncoding

# ❌ PROBLEM: Might not support UTF-8 properly
# On older Windows: OutputEncoding = System.Text.Encoding+SBCSCodePageEncoding (ANSI)

# ✅ SOLUTION: Set console to UTF-8
[System.Console]::OutputEncoding = [System.Text.Encoding]::UTF8
[System.Console]::InputEncoding = [System.Text.Encoding]::UTF8

# Permanently (add to $PROFILE):
# $OutputEncoding = [System.Text.Encoding]::UTF8
```

### Complete Safe PowerShell Pattern

```powershell
# Safe pattern for file operations with special characters
function Safe-ReadUtf8 {
    param([string]$Path)
    [System.IO.File]::ReadAllText($Path, [System.Text.Encoding]::UTF8)
}

function Safe-WriteUtf8 {
    param([string]$Path, [string]$Content)
    [System.IO.File]::WriteAllText($Path, $Content, [System.Text.Encoding]::UTF8)
}

function Safe-ReplaceInFile {
    param([string]$Path, [string]$OldText, [string]$NewText)
    $content = Safe-ReadUtf8 $Path
    $content = $content.Replace($OldText, $NewText)
    Safe-WriteUtf8 $Path $content
}

# Usage:
$arrow = [char]0x2191
Safe-ReplaceInFile "file.md" "[$arrow Back to Top](#old)" "[$arrow Back to Top](#new)"
```

---

## How It Happens in WPF Applications

[↑ Back to Top](#top)

### WPF Encoding Context

WPF has its own encoding complexities:

#### Issue 1: XAML File Encoding

```xml
<!-- ❌ PROBLEM: XAML defaults to UTF-16 LE -->
<?xml version="1.0" encoding="utf-16"?>
<Window ...>
  <TextBlock Text="↑ Arrow" />  <!-- Works, but uses 2 bytes per char -->
</Window>

<!-- ✅ SOLUTION: Specify UTF-8 -->
<?xml version="1.0" encoding="utf-8"?>
<Window ...>
  <TextBlock Text="↑ Arrow" />  <!-- More efficient -->
</Window>
```

#### Issue 2: C# String Literals in Code-Behind

```csharp
// ❌ PROBLEM: C# source files might be saved as ANSI (Windows-1252)
string arrow = "↑";  // Double-encoded if file is ANSI
string text = text.Replace(arrow, "new");

// ✅ SOLUTION: Unicode escape sequence (always correct)
string arrow = "\u2191";  // Unicode up arrow
string text = text.Replace(arrow, "new");

// ✅ SOLUTION: Ensure C# file is UTF-8
// In Visual Studio: File → Advanced Save Options → UTF-8 with signature
```

#### Issue 3: Loading XAML from Files

```csharp
// ❌ PROBLEM: Default encoding might be wrong
string xaml = File.ReadAllText("MyWindow.xaml");
var window = (Window)XamlReader.Parse(xaml);

// ✅ SOLUTION: Specify UTF-8
string xaml = File.ReadAllText("MyWindow.xaml", Encoding.UTF8);
var window = (Window)XamlReader.Parse(xaml);

// ✅ BEST: Use XamlReader with proper stream
using (var stream = File.OpenRead("MyWindow.xaml"))
{
    var window = (Window)XamlReader.Load(stream);
}
```

#### Issue 4: Binding Text with Special Characters

```csharp
// ❌ PROBLEM: Encoding issues in data binding
public string ArrowText
{
    get { return "↑ Back to Top";  }  // Might be double-encoded
}

// ✅ SOLUTION: Use Unicode escapes in C# code
public string ArrowText
{
    get { return "\u2191 Back to Top"; }  // Always correct
}

// ✅ SOLUTION: If loading from resource file, specify UTF-8
public string ArrowText
{
    get { return Properties.Resources.ArrowText; }  // Ensure .resx is UTF-8
}
```

#### Issue 5: DataGrid/TextBox with Unicode

```csharp
// ❌ PROBLEM: Clipboard operations might not preserve encoding
Clipboard.SetText("↑ Arrow");  // Windows clipboard is complex

// ✅ SOLUTION: Use proper data formats
var data = new DataObject();
data.SetText("↑ Arrow", TextDataFormat.UnicodeText);
Clipboard.SetDataObject(data);

// ✅ For retrieval:
string text = Clipboard.GetText(TextDataFormat.UnicodeText);
```

---

## Prevention & Solutions

[↑ Back to Top](#top)

### Prevention Checklist

- [ ] **Always specify encoding explicitly** (never rely on defaults)
- [ ] **Use UTF-8 everywhere** (most compatible)
- [ ] **In PowerShell, use System.IO for file ops** (most reliable)
- [ ] **In .NET/WPF, use Unicode escapes** for special characters
- [ ] **Check file/project encoding settings** in your IDE
- [ ] **Verify encoding before importing data** from other systems
- [ ] **Test with international characters** (emoji, Chinese, Arabic, etc.)
- [ ] **Use version control** to track encoding issues

### How to Fix Corrupted Files

#### Option 1: PowerShell Fix (Remove Double Encoding)

```powershell
# For single character:
$path = "file.md"
$content = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)

# Replace double-encoded arrow with correct one
$content = $content.Replace("â†'", "↑")  # â†' is the corrupted version

[System.IO.File]::WriteAllText($path, $content, [System.Text.Encoding]::UTF8)
```

#### Option 2: iconv (Linux/Mac)

```bash
# Detect encoding
file -i myfile.txt

# Convert from detected encoding to UTF-8
iconv -f ISO-8859-1 -t UTF-8 myfile.txt > myfile_fixed.txt
```

#### Option 3: VS Code

1. Open file with wrong encoding
2. Click encoding in bottom status bar (e.g., "UTF-8")
3. Select "Reopen with Encoding..."
4. Try "UTF-8 with BOM" or "ISO 8859-1"
5. If content looks correct, save with correct encoding

#### Option 4: Batch Fix in PowerShell

```powershell
# Fix all markdown files in folder
$folder = "C:\Davis\vibe\SPFx\Help"
$pattern = "â†'"  # Search for double-encoded arrow
$replacement = "↑"  # Replace with correct arrow

Get-ChildItem $folder -Filter "*.md" | ForEach-Object {
    $content = [System.IO.File]::ReadAllText($_.FullName, [System.Text.Encoding]::UTF8)
    if ($content -like "*$pattern*") {
        $content = $content.Replace($pattern, $replacement)
        [System.IO.File]::WriteAllText($_.FullName, $content, [System.Text.Encoding]::UTF8)
        Write-Host "Fixed: $($_.Name)"
    }
}
```

---

## Technical Reference

[↑ Back to Top](#top)

### Common Double-Encoded Patterns

| Original | Double-Encoded | Bytes (UTF-8) | Cause |
|----------|---|---|---|
| ↑ (U+2191) | â†' | C3 A2 E2 80 A0 E2 80 98 | Read as Latin-1, re-encoded |
| é (U+00E9) | Ã©  | C3 A9 | Latin-1 C3 + A9 re-encoded |
| ™ (U+2122) | â„¢ | C3 A2 E2 80 A2 | Smart quote issue |
| " (U+201C) | â€œ | C3 A2 E2 80 9C | Windows smart quote |
| • (U+2022) | â€¢ | C3 A2 E2 80 A2 | Bullet point |
| … (U+2026) | â€¦ | C3 A2 E2 80 A6 | Ellipsis |

### Encoding Byte Patterns

```
Character:       ↑
Unicode:         U+2191
UTF-8 (correct): E2 86 91 (3 bytes)
Latin-1 interp:  Not valid (above 255)
```

When UTF-8 bytes treated as separate Latin-1 characters and re-encoded:
- E2 (UTF-8 byte) → Interpreted as Latin-1 character with code 226 (â)
- 86 (UTF-8 byte) → Interpreted as Latin-1 character with code 134 (†)  
- 91 (UTF-8 byte) → Interpreted as Latin-1 character with code 145 (')

Then each character re-encoded to UTF-8:
- â (U+00E2) → C3 A2
- † (U+2020) → E2 80 A0
- ' (U+2019) → E2 80 99

## Quick Reference Guide {#quick-reference-guide}

[↑ Back to Top](#top)

### PowerShell Quick Fixes {#powershell-quick-fixes}

[↑ Back to Top](#quick-reference-guide)

```powershell
# Set default output encoding to UTF-8
$OutputEncoding = [System.Text.Encoding]::UTF8

# Fix a file with double-encoded characters
function Fix-Utf8File {
    param([string]$Path)
    $content = [System.IO.File]::ReadAllText($Path, [System.Text.Encoding]::UTF8)
    $content = $content -replace 'â†\'', '↑'  # Fix arrow
    $content = $content -replace 'â€œ', '"'   # Fix left quote
    $content = $content -replace 'â€\s', '"'  # Fix right quote
    [System.IO.File]::WriteAllText($Path, $content, [System.Text.Encoding]::UTF8)
}

# Read UTF-8 safely
$safe_content = [System.IO.File]::ReadAllText("file.txt", [System.Text.Encoding]::UTF8)

# Write UTF-8 safely
[System.IO.File]::WriteAllText("file.txt", $content, [System.Text.Encoding]::UTF8)

# Unicode character by code point
$arrow = [char]0x2191
```

### C# / .NET Quick Fixes {#csharp-dotnet-quick-fixes}

[↑ Back to Top](#quick-reference-guide)

```csharp
// Set UTF-8 as default
Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);

// Read UTF-8 file
string content = File.ReadAllText("file.txt", Encoding.UTF8);

// Write UTF-8 file
File.WriteAllText("file.txt", content, Encoding.UTF8);

// Unicode character by escape
string arrow = "\u2191";

// Fix double-encoded string
string fixed_text = content
    .Replace("â†'", "↑")
    .Replace("â€œ", "\"")
    .Replace("â€\s", "\"");
```

### IDE Configuration {#ide-configuration}

[↑ Back to Top](#quick-reference-guide)

| IDE | Setting | Value |
|-----|---------|-------|
| VS Code | `Files: Encoding` | `utf8` |
| Visual Studio | Save → Advanced | `UTF-8 with Signature` |
| VS Code Extension | `EditorConfig` | `charset = utf-8` |
| PowerShell ISE | Not recommended | Use VS Code instead |

### One-Liner Fixes {#one-liner-fixes}

[↑ Back to Top](#quick-reference-guide)

```powershell
# Replace double-encoded characters throughout directory
gci -r -include "*.md" | % { 
    $c = [System.IO.File]::ReadAllText($_.FullName, [System.Text.Encoding]::UTF8)
    $c = $c.Replace("â†'", "↑")
    [System.IO.File]::WriteAllText($_.FullName, $c, [System.Text.Encoding]::UTF8)
}
```

---
## Unicode, Emoji & UTF-8 Reference {#unicode-emoji--utf8-reference}

[↑ Back to Top](#top)

### ASCII Table (0-127) {#ascii-table-0-127}

[↑ Back to Top](#unicode-emoji--utf8-reference)

The ASCII table defines the first 128 characters. These are the **only characters** that are identical in all encodings (ASCII, UTF-8, Windows-1252, ISO-8859-1).

| Decimal | Hex | Char | Description | Alt Code | Unicode | Keyboard (Windows) |
|---------|-----|------|-------------|---------|---------|--------------------|
| 0-31 | 0x00-0x1F | *Control* | Control characters (not printable) | N/A | U+0000-U+001F | N/A |
| 32 | 0x20 | Space | Space character | Alt+32 | U+0020 | Spacebar |
| 33 | 0x21 | ! | Exclamation | Alt+33 | U+0021 | Shift+1 |
| 34 | 0x22 | " | Quotation mark | Alt+34 | U+0022 | Shift+' |
| 35 | 0x23 | # | Hash/Pound | Alt+35 | U+0023 | Shift+3 |
| 36 | 0x24 | $ | Dollar | Alt+36 | U+0024 | Shift+4 |
| 37 | 0x25 | % | Percent | Alt+37 | U+0025 | Shift+5 |
| 38 | 0x26 | & | Ampersand | Alt+38 | U+0026 | Shift+7 |
| 39 | 0x27 | ' | Apostrophe | Alt+39 | U+0027 | ' |
| 40 | 0x28 | ( | Left paren | Alt+40 | U+0028 | Shift+9 |
| 41 | 0x29 | ) | Right paren | Alt+41 | U+0029 | Shift+0 |
| 42 | 0x2A | * | Asterisk | Alt+42 | U+002A | Shift+8 |
| 43 | 0x2B | + | Plus | Alt+43 | U+002B | Shift+= |
| 44 | 0x2C | , | Comma | Alt+44 | U+002C | , |
| 45 | 0x2D | - | Hyphen | Alt+45 | U+002D | - |
| 46 | 0x2E | . | Period | Alt+46 | U+002E | . |
| 47 | 0x2F | / | Slash | Alt+47 | U+002F | / |
| 48-57 | 0x30-0x39 | 0-9 | Digits | Alt+48-57 | U+0030-U+0039 | 0-9 keys |
| 58 | 0x3A | : | Colon | Alt+58 | U+003A | Shift+; |
| 59 | 0x3B | ; | Semicolon | Alt+59 | U+003B | ; |
| 60 | 0x3C | < | Less than | Alt+60 | U+003C | Shift+, |
| 61 | 0x3D | = | Equals | Alt+61 | U+003D | = |
| 62 | 0x3E | > | Greater than | Alt+62 | U+003E | Shift+. |
| 63 | 0x3F | ? | Question | Alt+63 | U+003F | Shift+/ |
| 64 | 0x40 | @ | At sign | Alt+64 | U+0040 | Shift+2 |
| 65-90 | 0x41-0x5A | A-Z | Uppercase letters | Alt+65-90 | U+0041-U+005A | A-Z keys |
| 91 | 0x5B | [ | Left bracket | Alt+91 | U+005B | [ |
| 92 | 0x5C | \ | Backslash | Alt+92 | U+005C | \ |
| 93 | 0x5D | ] | Right bracket | Alt+93 | U+005D | ] |
| 94 | 0x5E | ^ | Caret | Alt+94 | U+005E | Shift+6 |
| 95 | 0x5F | _ | Underscore | Alt+95 | U+005F | Shift+- |
| 96 | 0x60 | ` | Backtick | Alt+96 | U+0060 | ` |
| 97-122 | 0x61-0x7A | a-z | Lowercase letters | Alt+97-122 | U+0061-U+007A | a-z keys |
| 123 | 0x7B | { | Left brace | Alt+123 | U+007B | Shift+[ |
| 124 | 0x7C | \| | Pipe | Alt+124 | U+007C | Shift+\ |
| 125 | 0x7D | } | Right brace | Alt+125 | U+007D | Shift+] |
| 126 | 0x7E | ~ | Tilde | Alt+126 | U+007E | Shift+` |
| 127 | 0x7F | DEL | Delete | Alt+127 | U+007F | Delete key |

**Key Point**: All characters 0-127 are identical in ASCII, UTF-8, Windows-1252, and ISO-8859-1. Double encoding issues start with characters 128+.

### Unicode Common Characters with Input Methods {#unicode-common-characters-with-input-methods}

[↑ Back to Top](#unicode-emoji--utf8-reference)

| Character | Unicode | UTF-8 Bytes | Decimal Alt Code | Unicode Escape | C# Escape | HTML Entity | Keyboard Method |
|-----------|---------|-------------|------------------|----------------|-----------|-------------|---|
| **Arrows** | | | | | | | |
| ↑ | U+2191 | E2 86 91 | Alt+24177 | \u2191 | \u2191 | ↑ | Compose ↑ (varies by OS) |
| ↓ | U+2193 | E2 86 93 | Alt+24179 | \u2193 | \u2193 | ↓ | Compose ↓ |
| ← | U+2190 | E2 86 90 | Alt+24176 | \u2190 | \u2190 | ← | Compose ← |
| → | U+2192 | E2 86 92 | Alt+24178 | \u2192 | \u2192 | → | Compose → |
| **Smart Quotes** | | | | | | | |
| " | U+201C | E2 80 9C | Alt+8220 | \u201c | \u201c | " | Alt+0147 (numpad, Unicode input) |
| " | U+201D | E2 80 9D | Alt+8221 | \u201d | \u201d | " | Alt+0148 |
| ' | U+2018 | E2 80 98 | Alt+8216 | \u2018 | \u2018 | ' | Alt+0145 |
| ' | U+2019 | E2 80 99 | Alt+8217 | \u2019 | \u2019 | ' | Alt+0146 |
| **Dashes** | | | | | | | |
| – | U+2013 | E2 80 93 | Alt+8211 | \u2013 | \u2013 | – | Alt+0150 (en-dash) |
| — | U+2014 | E2 80 94 | Alt+8212 | \u2014 | \u2014 | — | Alt+0151 (em-dash) |
| **Math & Symbols** | | | | | | | |
| ™ | U+2122 | E2 84 A2 | Alt+8482 | \u2122 | \u2122 | ™ | Alt+0153 |
| © | U+00A9 | C2 A9 | Alt+0169 | \u00a9 | \u00a9 | © | Alt+0169 |
| ® | U+00AE | C2 AE | Alt+0174 | \u00ae | \u00ae | ® | Alt+0174 |
| • | U+2022 | E2 80 A2 | Alt+8226 | \u2022 | \u2022 | • | Alt+0149 |
| … | U+2026 | E2 80 A6 | Alt+8230 | \u2026 | \u2026 | … | Alt+0133 |
| ° | U+00B0 | C2 B0 | Alt+0176 | \u00b0 | \u00b0 | ° | Alt+0176 |
| × | U+00D7 | C3 97 | Alt+0215 | \u00d7 | \u00d7 | × | Alt+0215 |
| ÷ | U+00F7 | C3 B7 | Alt+0247 | \u00f7 | \u00f7 | ÷ | Alt+0247 |
| ± | U+00B1 | C2 B1 | Alt+0177 | \u00b1 | \u00b1 | ± | Alt+0177 |
| **Accented Characters** | | | | | | | |
| é | U+00E9 | C3 A9 | Alt+0233 | \u00e9 | \u00e9 | é | Alt+0233 |
| à | U+00E0 | C3 A0 | Alt+0224 | \u00e0 | \u00e0 | à | Alt+0224 |
| ñ | U+00F1 | C3 B1 | Alt+0241 | \u00f1 | \u00f1 | ñ | Alt+0241 |
| ü | U+00FC | C3 BC | Alt+0252 | \u00fc | \u00fc | ü | Alt+0252 |

**Note**: Alt codes with "Alt+" prefix (like Alt+24177) are **decimal values** for Unicode input on Windows. Standard Alt codes are 3-4 digits and use the numpad.

### UTF-8 Encoding Breakdown Examples {#utf-8-encoding-breakdown-examples}

[↑ Back to Top](#unicode-emoji--utf8-reference)

Understanding how Unicode characters map to UTF-8 bytes:

| Character | Unicode | UTF-8 Bytes (Hex) | Byte Count | Encoding Pattern | Explanation |
|-----------|---------|-------------------|-----------|------------------|-------------|
| A | U+0041 | 41 | 1 | 0xxxxxxx | ASCII: direct mapping |
| é | U+00E9 | C3 A9 | 2 | 110xxxxx 10xxxxxx | 2-byte UTF-8 (Latin-1 extended) |
| ↑ | U+2191 | E2 86 91 | 3 | 1110xxxx 10xxxxxx 10xxxxxx | 3-byte UTF-8 (symbols/arrows) |
| 😀 | U+1F600 | F0 9F 98 80 | 4 | 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx | 4-byte UTF-8 (emoji) |

**How UTF-8 Works**:
1. **ASCII (0-127)**: 1 byte, starts with 0
2. **128-2047**: 2 bytes, starts with 110, continues with 10
3. **2048-65535**: 3 bytes, starts with 1110, continues with 10
4. **65536+**: 4 bytes, starts with 11110, continues with 10

### Double-Encoded Character Examples {#double-encoded-character-examples}

[↑ Back to Top](#unicode-emoji--utf8-reference)

When UTF-8 bytes are treated as Latin-1 and re-encoded:

| Original | UTF-8 Bytes | Misinterpreted As | Re-encoded As | Result |
|----------|------------|------------------|---------------|--------|
| ↑ (U+2191) | E2 86 91 | â, ˆ, ' | C3 A2 C2 86 C2 91 | â€ (corruption) |
| " (U+201C) | E2 80 9C | â, €, œ | C3 A2 E2 82 AC C5 93 | Mojibake |
| • (U+2022) | E2 80 A2 | â, €, ¢ | C3 A2 E2 82 AC C2 A2 | Mojibake |
| é (U+00E9) | C3 A9 | Ã, © | C3 83 C2 A9 | Ã© (double-encoded) |

**Prevention**: Always use the same encoding for read AND write operations. Never mix UTF-8 reads with Latin-1 writes or vice versa.

### Emoji Reference with UTF-8 Encoding {#emoji-reference-with-utf8-encoding}

[↑ Back to Top](#unicode-emoji--utf8-reference)

Common emoji characters and their encoding:

| Emoji | Unicode | UTF-8 Bytes (Hex) | Unicode Escape | C# String | Windows Alt Code | Category |
|-------|---------|-------------------|----------------|-----------|-----------------|----------|
| 😀 | U+1F600 | F0 9F 98 80 | \U0001F600 | "\ud83d\ude00" | Alt+128512 | Smileys |
| 😂 | U+1F602 | F0 9F 98 82 | \U0001F602 | "\ud83d\ude02" | Alt+128514 | Smileys |
| ❤️ | U+2764 | E2 9D A4 | \u2764 | "\u2764" | Alt+10084 | Symbols |
| ✅ | U+2705 | E2 9C 85 | \u2705 | "\u2705" | Alt+9989 | Symbols |
| ❌ | U+274C | E2 9D 8C | \u274c | "\u274c" | Alt+10060 | Symbols |
| ⚠️ | U+26A0 | E2 9A A0 | \u26a0 | "\u26a0" | Alt+9888 | Symbols |
| ✔️ | U+2714 | E2 9C 94 | \u2714 | "\u2714" | Alt+10004 | Symbols |
| ✓ | U+2713 | E2 9C 93 | \u2713 | "\u2713" | Alt+10003 | Symbols |
| 📁 | U+1F4C1 | F0 9F 93 81 | \U0001F4C1 | "\ud83d\udcc1" | Alt+128193 | Objects |
| 📄 | U+1F4C4 | F0 9F 93 84 | \U0001F4C4 | "\ud83d\udcc4" | Alt+128196 | Objects |
| 💻 | U+1F4BB | F0 9F 92 BB | \U0001F4BB | "\ud83d\udcbb" | Alt+128187 | Objects |
| ⚙️ | U+2699 | E2 9A 99 | \u2699 | "\u2699" | Alt+9881 | Symbols |

**Note**: Emoji are represented as 4-byte UTF-8 sequences (F0 + 3 additional bytes). Some platforms display emoji with variation selectors (additional bytes).

### Character Input Methods on Windows {#character-input-methods-on-windows}

[↑ Back to Top](#unicode-emoji--utf8-reference)

**Method 1: Alt Codes with Numpad**

```
Steps:
1. Hold Alt key
2. Type number on NUMPAD (not number row!)
3. Release Alt
4. Character appears

Examples:
- Alt+0169 = © (copyright)
- Alt+0174 = ® (registered)
- Alt+0233 = é (e acute)
- Alt+0151 = — (em dash)
```

**Limitation**: Only works for codes 0-255 in standard Windows Alt codes (extended ASCII).

**Method 2: Unicode Input (Windows 10+)**

```
In Registry Editor:
HKEY_CURRENT_USER\Control Panel\Input Method
Change "EnableHexNumpad" = 1

Then use:
1. Hold Ctrl+Shift
2. Press U
3. Type Unicode (hex, e.g., 2191 for ↑)
4. Release Shift+Ctrl
5. Character appears (requires special key setup)
```

**Method 3: PowerShell/C# Unicode Escapes**

```powershell
# In PowerShell strings:
$arrow = [char]0x2191          # ↑ arrow
$quote = [char]0x201C         # " smart quote
$emoji = [char]0x1F600        # 😀 (requires surrogate pairs for emoji)

# In C#:
string arrow = "\u2191";      // ↑ arrow
string emoji = "\ud83d\ude00"; // 😀 (surrogate pair)
```

**Method 4: HTML Entity Entry**

```html
<!-- In web/HTML context: -->
&rarr;        → (right arrow)
&larr;        ← (left arrow)
&hearts;      ♥ (heart)
&copy;        © (copyright)
&quot;        " (quote)
&#2191;       ↑ (decimal Unicode)
&#x2191;      ↑ (hex Unicode)
```

**Method 5: VS Code Unicode Input**

```
In VS Code:
1. Ctrl+Shift+P (Command Palette)
2. Type "Insert Unicode"
3. Enter Unicode point (e.g., 2191)
4. Character inserted
```

**Method 6: Office Applications (Word, Excel)**

```
Microsoft Word:
1. Type Unicode + Alt+X
2. Example: 2191 Alt+X produces ↑

Or Insert → Symbol menu
```

### Keyboard Layout Method (Compose Key) {#keyboard-layout-method-compose-key}

[↑ Back to Top](#unicode-emoji--utf8-reference)

On Linux/Mac (not standard Windows), compose key combinations:

| Compose Sequence | Result | Description |
|---|---|---|
| Compose + up | ↑ | Up arrow |
| Compose + down | ↓ | Down arrow |
| Compose + left | ← | Left arrow |
| Compose + right | → | Right arrow |
| Compose + ' + e | é | E with acute |
| Compose + ` + a | à | A with grave |
| Compose + ^ + a | â | A with circumflex |
| Compose + ~ + n | ñ | N with tilde |
| Compose + " + u | ü | U with diaeresis |

**Windows Equivalent**: Windows does not have native Compose key support. Use Alt codes or install third-party tools like WinCompose.

---
## Summary {#summary}

**TL;DR**: Your arrow character became "â†'" because UTF-8 bytes (E2 86 91) were misinterpreted as Latin-1 characters and re-encoded to UTF-8, creating double encoding. This happens frequently in PowerShell (encoding detection issues) and WPF (XAML/C# encoding mismatches). **Always explicitly specify UTF-8 encoding in file operations.**

**Last Updated**: October 1, 2026  
**For**: SPFx Development  
**Applies to**: PowerShell 5.1+, .NET Framework 4.8+, .NET 6+, WPF Applications
