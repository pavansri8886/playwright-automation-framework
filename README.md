Good context. With `persistentContext` the download handling is slightly different because you need to listen on the context rather than the page, and the download directory is usually set when you launch the context.

Here is the updated utility:

```typescript
import { BrowserContext } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import * as AdmZip from 'adm-zip';

export async function downloadAndVerifyZipContent(
  context: BrowserContext,
  triggerDownload: () => Promise<void>,
  downloadDir: string
): Promise<{ success: boolean; content: string }> {

  const page = context.pages()[0];

  // Listen for download on context level
  const [download] = await Promise.all([
    context.waitForEvent('download'),
    triggerDownload()
  ]);

  // With persistentContext the file lands in the downloadDir you set at launch
  // Wait for it to finish
  const suggestedName = download.suggestedFilename();
  const downloadPath = path.join(downloadDir, suggestedName);
  await download.saveAs(downloadPath);

  // Verify zip exists
  if (!fs.existsSync(downloadPath)) {
    throw new Error(`Download failed — file not found at ${downloadPath}`);
  }

  // Extract
  const extractPath = path.join(downloadDir, 'extracted');
  fs.mkdirSync(extractPath, { recursive: true });

  const zip = new AdmZip(downloadPath);
  zip.extractAllTo(extractPath, true);

  // Get date-wise folders sorted
  const folders = fs.readdirSync(extractPath)
    .filter(item => fs.statSync(path.join(extractPath, item)).isDirectory())
    .sort();

  if (folders.length === 0) {
    throw new Error('No folders found inside the zip');
  }

  // Take first folder
  const firstFolderPath = path.join(extractPath, folders[0]);

  // Get files inside
  const files = fs.readdirSync(firstFolderPath)
    .filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.txt', '.csv', '.log', '.json'].includes(ext);
    });

  if (files.length === 0) {
    throw new Error(`No readable files found in folder: ${folders[0]}`);
  }

  // Read first file and check not empty
  const filePath = path.join(firstFolderPath, files[0]);
  const content = fs.readFileSync(filePath, 'utf-8').trim();

  if (!content) {
    throw new Error(`File is empty: ${files[0]}`);
  }

  // Cleanup extracted folder after verification
  fs.rmSync(extractPath, { recursive: true, force: true });

  return { success: true, content };
}
```

**How to launch with persistentContext and private mode:**

```typescript
const context = await chromium.launchPersistentContext('', {
  headless: false,
  args: ['--incognito'],
  acceptDownloads: true,
  downloadsPath: './downloads'
});

const page = context.pages()[0];
```

**Usage:**

```typescript
const result = await downloadAndVerifyZipContent(
  context,
  async () => await page.click('#download-button'),
  './downloads'
);

expect(result.success).toBe(true);
expect(result.content).not.toBe('');
```

**Key differences from the previous version:**

- `context.waitForEvent('download')` instead of `page.waitForEvent` — needed for persistentContext
- `downloadsPath` passed explicitly since persistentContext manages its own download directory
- Cleanup after verification so extracted files do not pile up between test runs

What file types are inside the date folders? I can tighten the filter.
