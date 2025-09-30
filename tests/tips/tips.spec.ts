import { test, expect } from '@playwright/test'
import { getRandomNumber, generateRandomString } from '../../utils/data-helpers'

test.describe.only('Tips and Tricks', () => {

    test.only('TestInfo Object', async ({ page }, testInfo) => {
        await page.goto('https://example.com')
        console.log(testInfo)
        let randomNum = await getRandomNumber(1, 1000)
        let randomString = await generateRandomString(10)
        console.log(randomNum)
        console.log(randomString)
        console.log(testInfo.title)
    })

    test('Test skip browser', async ({ page, browserName }) => {
        test.skip(browserName === 'chromium', 'Skipping test in Chromium')
        await page.goto('https://example.com')
        console.log(browserName)
    })

    test('Fix me annotation', async ({ page, browserName }) => {
        test.fixme(browserName === 'chromium', 'Test is not stable, needs to be fixed')
        await page.goto('https://example.com')
    })
    //For retries: Add flag retries: e.g: npx playwright test --config=playwright.config.ts --project=Chromium --retries=2


    const people = ['Nico', 'Ana', 'Sergiu', 'Alina', 'Gabi']
    for (const person of people) {
        test(`Hello ${person}`, async ({ page }) => {
            await page.goto('https://example.com')
        })
    }

    test('Mouse movement', async ({ page }) => {
        await page.goto('https://example.com')
        await page.mouse.move(0, 0)
        await page.mouse.down()
        await page.mouse.move(0, 100)
        await page.mouse.up()
    })

    //Multiple page tabs
    test('Multiple tabs', async ({ browser }) => {
        const context = await browser.newContext()
        const page1 = await context.newPage()
        const page2 = await context.newPage()
        const page3 = await context.newPage()
        
        await page1.goto('https://example.com')
        await page2.goto('https://example.com')
        await page3.goto('https://example.com')

        await page1.waitForTimeout(2000)
    })
    //Remember headed mode !!!

    //For opening an emulator in terminal: npx playwright open --device="iPhone 11" wikipedia.org

    //Create PDF File: npx playwright pdf https://example.com example.pdf

    //Generate customized screenshots: npx playwright screenshot --device="iPhone 11" --color-scheme=dark --wait-for-timeout=3000 facebook.com example-facebook-iphone11.png

    //Change timezone and language: npx playwright open --timezone="Europe/Paris" --lang="fr-FR" --geolocation=48.8566,2.3522 wikipedia.org
    
})
