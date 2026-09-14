import { expect, test } from "@playwright/test";

test("自己紹介をたどり、最初からやり直せる", async ({ page }) => {
  const response = await page.goto("/");
  expect(response?.headers()["content-security-policy"]).toContain("frame-ancestors 'none'");
  await expect(page.getByRole("link", { name: "GitHub" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Contact" })).toBeVisible();
  await page.getByRole("button", { name: "何を作る人？" }).click();
  await expect(page.getByText(/課題を観察して/)).toBeVisible();
  await page.getByRole("button", { name: "最初から見る" }).click();
  await expect(page.getByText("どこから話しましょう？")).toBeVisible();
});

test("プロジェクトを検索して詳細へ移動できる", async ({ page }) => {
  await page.goto("/projects");
  await page.getByRole("searchbox").fill("Godot");
  await expect(page.getByRole("link", { name: /Rubblenomics/ })).toBeVisible();
  await page.getByRole("link", { name: /Rubblenomics/ }).click();
  await expect(page.getByRole("heading", { name: "Rubblenomics" })).toBeVisible();
});

test("学習ログを開ける", async ({ page }) => {
  await page.goto("/logs");
  const firstLog = page.locator("main a[href^='/logs/']").first();
  await expect(firstLog).toBeVisible();
  await firstLog.click();
  await expect(page.locator("article h1")).toBeVisible();
});

test("不明なURLからトップへ戻れる", async ({ page }) => {
  await page.goto("/missing-note");
  await expect(page.getByRole("heading", { name: "この記録は見つかりません。" })).toBeVisible();
  await page.getByRole("link", { name: "トップへ戻る" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText("考えたことと");
});
