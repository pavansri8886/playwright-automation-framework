# CancerCenter Playwright Automation

This project automates a cancer care and pathology workflow application used to review patient data, work with slide images, run diagnostic algorithms, and generate clinical reports.

## Why this project exists

Cancer care platforms involve highly sensitive workflows where users interact with patient files, medical algorithms, and report generation. These workflows must be reliable because errors in login, document access, algorithm execution, or report generation can directly affect clinical review and decision-making.

Automation is needed to ensure these critical journeys work consistently and to reduce the risk of manual testing errors, slow regression checks, and release issues.

## Scope

- Login flow
- File search and selection
- Slide viewer navigation
- Algorithm execution
- Report creation with patient data
- PDF generation workflow

## Framework architecture

- Playwright Test
- TypeScript
- Page Object Model
- Locator repository
- JSON-based test data
- Shared base fixture for test-level behavior

## Project structure

```text
.
├── fixtures/
│   └── baseTest.ts
├── objectRepository/
│   ├── algorithmLocators.ts
│   ├── fileListLocators.ts
│   ├── loginLocators.ts
│   ├── reportGenLocators.ts
│   └── slideViewerLocators.ts
├── pages/
│   ├── algorithmPanel.ts
│   ├── fileListPage.ts
│   ├── loginPage.ts
│   ├── reportGenPage.ts
│   └── slideViewerPage.ts
├── test-data/
│   ├── t1_run_algorithm_histo.json
│   └── t2_generate_iccr_document.json
├── tests/
│   ├── t1_run_algorithm_histo.spec.ts
│   └── t2_generate_iccr_document.spec.ts
├── playwright.config.ts
├── package.json
├── tsconfig.json
└── .env
```

## Validation

```bash
npx playwright test
```
