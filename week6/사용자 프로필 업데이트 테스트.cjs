const puppeteer = require("puppeteer"); // v23.0.0 or later

(async () => {
  // headless 모드 여부를 인자로 받음
  const headless = process.argv[2] !== "non-headless";
  const browser = await puppeteer.launch({ headless });
  const page = await browser.newPage();
  const timeout = 5000;
  page.setDefaultTimeout(timeout);

  {
    const targetPage = page;
    await targetPage.setViewport({
      width: 938,
      height: 735,
    });
  }
  {
    const targetPage = page;
    await targetPage.goto("http://localhost:5175/");
  }
  {
    const targetPage = page;
    await puppeteer.Locator.race([
      targetPage.locator("::-p-aria(수정하기)"),
      targetPage.locator("button"),
      targetPage.locator(
        '::-p-xpath(//*[@id=\\"root\\"]/main/div/form/div[3]/button)'
      ),
      targetPage.locator(":scope >>> button"),
      targetPage.locator("::-p-text(수정하기)"),
    ])
      .setTimeout(timeout)
      .click({
        offset: {
          x: 180,
          y: 32.3984375,
        },
      });
  }
  {
    const targetPage = page;
    await puppeteer.Locator.race([
      targetPage.locator("::-p-aria(사용자 이름)"),
      targetPage.locator("#username"),
      targetPage.locator('::-p-xpath(//*[@id=\\"username\\"])'),
      targetPage.locator(":scope >>> #username"),
      targetPage.locator("::-p-text(홍길동)"),
    ])
      .setTimeout(timeout)
      .click({
        count: 2,
        offset: {
          x: 57,
          y: 24.0859375,
        },
      });
  }
  {
    const targetPage = page;
    await puppeteer.Locator.race([
      targetPage.locator("::-p-aria(사용자 이름)"),
      targetPage.locator("#username"),
      targetPage.locator('::-p-xpath(//*[@id=\\"username\\"])'),
      targetPage.locator(":scope >>> #username"),
      targetPage.locator("::-p-text(홍길동)"),
    ])
      .setTimeout(timeout)
      .fill("김철수");
  }
  {
    const targetPage = page;
    await puppeteer.Locator.race([
      targetPage.locator("::-p-aria(이메일)"),
      targetPage.locator("#email"),
      targetPage.locator('::-p-xpath(//*[@id=\\"email\\"])'),
      targetPage.locator(":scope >>> #email"),
      targetPage.locator("::-p-text(hong@example.com)"),
    ])
      .setTimeout(timeout)
      .click({
        count: 2,
        offset: {
          x: 36,
          y: 25.4921875,
        },
      });
  }
  {
    const targetPage = page;
    await targetPage.keyboard.down("CapsLock");
  }
  {
    const targetPage = page;
    await targetPage.keyboard.up("CapsLock");
  }
  {
    const targetPage = page;
    await puppeteer.Locator.race([
      targetPage.locator("::-p-aria(이메일)"),
      targetPage.locator("#email"),
      targetPage.locator('::-p-xpath(//*[@id=\\"email\\"])'),
      targetPage.locator(":scope >>> #email"),
      targetPage.locator("::-p-text(hong@example.com)"),
    ])
      .setTimeout(timeout)
      .fill("kim@example.com");
  }
  {
    const targetPage = page;
    await puppeteer.Locator.race([
      targetPage.locator("::-p-aria(저장하기)"),
      targetPage.locator("button.css-1ve2qaa"),
      targetPage.locator(
        '::-p-xpath(//*[@id=\\"root\\"]/main/div/form/div[4]/button[1])'
      ),
      targetPage.locator(":scope >>> button.css-1ve2qaa"),
      targetPage.locator("::-p-text(저장하기)"),
    ])
      .setTimeout(timeout)
      .click({
        offset: {
          x: 83,
          y: 19.3046875,
        },
      });
  }

  await browser.close();
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
