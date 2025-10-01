import { test, expect } from '@playwright/test';

test.describe('Visual Regression Tests', () => {
    test('Full page snapshot', async ({ page }) => {
        await page.goto('https://www.example.com');
        expect(await page.screenshot()).toMatchSnapshot('example-com.png', {
            maxDiffPixelRatio: 0.1,
        });
    });

    test('Element snapshot', async ({ page }) => {
        await page.goto('https://www.example.com');
        const element = await page.$('h1'); //En este caso no se espera a que el elemento exista para la continuidad del test. Puede ser null
        expect(await element?.screenshot()).toMatchSnapshot('example-com-h1.png', {
            maxDiffPixelRatio: 0.1,
        });
    });
});

//Para actualizar las imágenes: npx playwright test --config=visual.config.ts --project=chromium --update-snapshots o eliminar directorio snapshots