import { test, expect } from '@playwright/test';

const BASE = 'http://localhost:4173/DAFONow3/#';

test.describe('DAFONow V3 UI Validation', () => {

  test('Dashboard loads with welcome message and stat cards', async ({ page }) => {
    await page.goto(`${BASE}/`);
    await expect(page.locator('h1')).toContainText('Good morning');
    const stats = page.locator('.stat-card');
    await expect(stats).toHaveCount(4);
  });

  test('Sidebar navigation links work', async ({ page }) => {
    await page.goto(`${BASE}/`);
    // Navigate to Orders
    await page.click('a[href="#/orders"]');
    await expect(page.locator('h1')).toContainText('Orders');
    // Navigate to Patients
    await page.click('a[href="#/patients"]');
    await expect(page.locator('h1')).toContainText('Patients');
    // Navigate to Drafts
    await page.click('a[href="#/drafts"]');
    await expect(page.locator('h1')).toContainText('Drafts');
    // Navigate to Tracking
    await page.click('a[href="#/tracking"]');
    await expect(page.locator('h1')).toContainText('Tracking');
    // Navigate to Help
    await page.click('a[href="#/help"]');
    await expect(page.locator('h1')).toContainText('Help');
    // Navigate back to Dashboard
    await page.click('a[href="#/"]');
    await expect(page.locator('h1')).toContainText('Good morning');
  });

  test('Orders page shows table and filters', async ({ page }) => {
    await page.goto(`${BASE}/orders`);
    await expect(page.locator('.data-table')).toBeVisible();
    await expect(page.locator('.filter-pill')).toHaveCount(6);
    // Click a filter
    await page.click('.filter-pill:nth-child(3)');
    await expect(page.locator('.filter-pill:nth-child(3)')).toHaveClass(/active/);
  });

  test('Order detail page shows tracking timeline', async ({ page }) => {
    await page.goto(`${BASE}/orders/ORD-2401`);
    await expect(page.locator('h1')).toContainText('ORD-2401');
    await expect(page.locator('.tracking-timeline-vertical')).toBeVisible();
    await expect(page.locator('.status-badge')).toBeVisible();
  });

  test('Patient detail page shows profile and order history', async ({ page }) => {
    await page.goto(`${BASE}/patients/P-1001`);
    await expect(page.locator('.patient-profile-name')).toContainText('Emma Thompson');
    await expect(page.locator('.data-table')).toBeVisible();
  });

  test('Drafts page shows draft cards with progress circles', async ({ page }) => {
    await page.goto(`${BASE}/drafts`);
    await expect(page.locator('.draft-card')).toHaveCount(3);
    await expect(page.locator('.draft-progress-circle')).toHaveCount(3);
  });

  test('Drafts page discard modal works', async ({ page }) => {
    await page.goto(`${BASE}/drafts`);
    // Click first discard button
    await page.click('.draft-card:first-child .btn-ghost');
    await expect(page.locator('.modal')).toBeVisible();
    await expect(page.locator('.modal')).toContainText('Discard Draft');
    // Cancel
    await page.click('.modal .btn-ghost');
    await expect(page.locator('.modal')).not.toBeVisible();
  });

  test('Tracking page has active and delivered tabs', async ({ page }) => {
    await page.goto(`${BASE}/tracking`);
    await expect(page.locator('.tab')).toHaveCount(2);
    // Switch to delivered tab
    await page.click('.tab:nth-child(2)');
    await expect(page.locator('.tab:nth-child(2)')).toHaveClass(/active/);
  });

  test('New Order wizard progresses through steps', async ({ page }) => {
    await page.goto(`${BASE}/orders/new`);
    await expect(page.locator('h1')).toContainText('New Order');

    // Step 1: Select patient
    await page.selectOption('.form-select', 'P-1001');
    await page.click('.btn-primary:has-text("Next")');

    // Step 2: Select product
    await page.click('.product-option:first-child');
    await page.click('.btn-primary:has-text("Next")');

    // Step 3: Customize - should see Save Draft button
    await expect(page.locator('button:has-text("Save Draft")')).toBeVisible();
    await expect(page.locator('button:has-text("Discard Draft")')).toBeVisible();

    await page.selectOption('.form-select:nth-of-type(1)', 'Bilateral');
    await page.locator('.form-select').nth(1).selectOption({ index: 1 });
    await page.locator('.form-select').nth(2).selectOption({ index: 1 });
    await page.click('.btn-primary:has-text("Next")');

    // Step 4: Review
    await expect(page.locator('.review-section')).toHaveCount(3);
    await page.click('.btn-primary:has-text("Next")');

    // Step 5: Submit
    await page.click('.btn-primary:has-text("Submit Order")');
    await expect(page.locator('.success-screen')).toBeVisible();
    await expect(page.locator('h2')).toContainText('Order Submitted');
  });

  test('Global search opens via click and finds results', async ({ page }) => {
    await page.goto(`${BASE}/`);
    // Click search bar in header to open global search
    await page.locator('.header-search').click();
    await expect(page.locator('.global-search')).toBeVisible();
    // Type a search
    await page.fill('.global-search input', 'Emma');
    await expect(page.locator('text="Emma Thompson"').first()).toBeVisible();
  });

  test('Help page shows contact cards and FAQ accordion', async ({ page }) => {
    await page.goto(`${BASE}/help`);
    await expect(page.locator('.help-contact-card')).toHaveCount(3);
    await expect(page.locator('.faq-item')).toHaveCount(6);
    // Open first FAQ
    await page.click('.faq-question:first-child');
    await expect(page.locator('.faq-answer')).toBeVisible();
  });

  test('Awareness strip shows draft count', async ({ page }) => {
    await page.goto(`${BASE}/`);
    await expect(page.locator('.awareness-strip')).toBeVisible();
    await expect(page.locator('.awareness-strip')).toContainText('draft');
  });

  test('Status badges have correct classes', async ({ page }) => {
    await page.goto(`${BASE}/orders`);
    await expect(page.locator('.status-submitted')).toHaveCount(2);
    await expect(page.locator('.status-manufacturing')).toHaveCount(2);
    await expect(page.locator('.status-shipped')).toHaveCount(1);
    await expect(page.locator('.status-delivered')).toHaveCount(2);
    await expect(page.locator('.status-review')).toHaveCount(1);
  });

  test('Font weights are correct', async ({ page }) => {
    await page.goto(`${BASE}/`);
    const h1 = page.locator('h1');
    await expect(h1).toHaveCSS('font-weight', '700');
  });
});
