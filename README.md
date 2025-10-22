# Playwright Learning

This repository contains examples of different types of tests made with [Playwright](https://playwright.dev/):  
- **Visual Regression Testing**  
- **End-to-End (E2E) Testing**  
- **API Testing**  

Playwright is a powerful end-to-end testing framework for modern web applications, supporting Chromium, Firefox, and WebKit.

---

## Getting Started

1. **Clone repository**
    ```bash
    git clone https://github.com/NicolasARDBE/playwright-automation-learning.git
    ```
2. **Install dependencies**
    ```bash
    npm install
    ```

3. **Run tests**
    ```bash
    npx playwright test
    ```
## Github Actions Workflow
This repository includes two CI workflows powered by **GitHub Actions** and **Docker**:

---

### 🔹 1. Linux Snapshots Visual Tests

- **Purpose**: Updates and commits new **visual regression snapshots**.  
- **Trigger**: Runs **only manually** via `workflow_dispatch`.  
- **How it works**:
  1. Builds a Docker image with Playwright and project dependencies.  
  2. Runs `npx playwright test --update-snapshots` inside the container.  
  3. Commits and pushes the updated snapshots back to the repository.  
- ✅ Ensures all snapshots are generated consistently on **Linux (Ubuntu)**, avoiding OS-specific differences.

---

### 🔹 2. Playwright Tests with Docker

- **Purpose**: Runs the full Playwright test suite.  
- **Triggers**:
  - On every **closed pull request to `main`**.    
  - Can also be launched **manually**.  
- **How it works**:
  1. Builds the same Docker image (shared with the snapshots workflow).  
  2. Executes `npx playwright test` inside the container.  
- ✅ Validates that all tests pass in CI before merging code.

