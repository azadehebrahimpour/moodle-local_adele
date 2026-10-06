import { test, expect } from '@playwright/test';
import { env, loginAs } from '../support/env';

test.describe('ADELE-PW-470-B4 — Student access', () => {

  test('student does not see the Learning Paths navigation entry', async ({ page }) => {
    await loginAs(page, env.studentUsername, env.fixturePassword);

    // loginAs() authenticates via HTTP but does not navigate the browser page.
    // Open a real Moodle page so the absence assertion cannot pass on about:blank.
    await page.goto('/my/');
    await expect(page.locator('body#page-my-index')).toHaveCount(1);

    await expect(
      page.getByRole('link', { name: /^(Lernpfade|Learning Paths)$/i })
    ).toHaveCount(0);
  });

  test('student is denied Learning Paths administration by direct URL', async ({ page }) => {
    await loginAs(page, env.studentUsername, env.fixturePassword);

    await page.goto('/local/adele/index.php#/learningpaths');

    const permissionDialog = page.getByRole('dialog', { name: 'nopermissions' });
    await expect(permissionDialog).toBeVisible();
    await expect(permissionDialog).toContainText(
      /Sorry, but you do not currently have permissions to do that/i
    );
  });

});
