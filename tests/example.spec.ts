import {test, expect} from '@playwright/test'
import {loadHomePage, assertTitle} from '../helpers'

//To show browser execution: npx playwright test --headed

test.skip("Selector Test", async({ page }) => {
    //text
    await page.click("text=some text")

    //CSS Selectors
    await page.click("button") 
    await page.click("#id")
    await page.click(".class")

    //Only visible CSS Selectors
    await page.click(".class:visible") //Playwright feature
    
    //Combinations
    await page.click("#username .first")

    //XPath
    await page.click("//button[text()='some text']")
    });


//Use of fill() instead of type() for filling input fields


test("Working with inputs", async ({ page }) => {
    await page.goto("https://practicetestautomation.com/practice-test-login/");
    await page.fill("#username", "student");
    await page.fill("#password", "test");
    await page.click("#submit");
    const errorMessage = await page.locator("#error");
    await expect(errorMessage).toHaveText('Your password is invalid!')
});


test("Assertions @tagExample", async ({ page }) => { //Putting a tag is done with @
    await page.goto("https://example.com")
    await expect(page).toHaveTitle("Example Domain")
    const h1 = page.locator('h1')
    const h1Text = await h1.innerText();
    const p = page.locator('p')
    //const pText = await p.innerText();
    //console.log('p:', pText);
    await expect(h1).toBeVisible()
    await expect(p).toHaveCount(2) //How many elements the locator references
    await expect(h1).toHaveText("Example Domain") //More precise text assertion
});
//To run this tagged test, in terminal: npx playwright test --grep @tagExample
//To NOT run these tests: npx playwright test --grep-invert @tagExample

test.describe("First test suite", () => { //Test Suite to organize tests
    test("Simple Basic Test", async ({ page }) => {
    await page.goto('https://example.com')
    const pageTitle = await page.locator('h1')
    await expect(pageTitle).toHaveText('Example Domain')
    })

    test("Clicking on element", async({ page }) => {
        await page.goto("https://istqb.org/")
        const button = await page.locator('id=menu-item-39')
        await button.click()
        await expect(page).toHaveURL("https://istqb.org/help/")
    })
})

//--reporter= -> line, list, dot, junit, html


test("Screenshots", async ({ page })=>{
    await page.goto('https://example.com')
    const title = page.locator('h1')
    await title.screenshot({path: 'locator-screenshot.png', })
})

test.describe.parallel("Hooks", () => {
    test.beforeEach(async({page})=>{
        await page.goto('https://example.com')
    })

    test("Screenshot full page", async ({ page })=>{
    await page.screenshot({path: 'full-screenshot.png', fullPage:true})
    })

    test("Screenshot element", async ({ page })=>{
    const title = page.locator('h1')
    await title.screenshot({path: 'locator-screenshot.png'})
    })
})


test("Using custom functions", async ({ page })=>{
    await loadHomePage(page)
    //await page.pause() //Inspector
    await assertTitle(page)
})

//**To add in the CLI: -- --headed