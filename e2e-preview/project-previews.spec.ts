import { expect, test } from '@playwright/test';

test('FINDE preview filters the static catalog', async ({ page }) => {
  await page.goto('/projects/finde/preview');
  const preview = page.frameLocator('iframe');

  await expect(preview.getByRole('heading', { name: /まだ知らない/ })).toBeVisible();
  await preview.getByLabel('店舗・エリア・ブランドを検索').fill('大阪');
  await expect(preview.getByRole('heading', { name: 'OSAKA EDIT' })).toBeVisible();
  await expect(preview.getByRole('heading', { name: 'TOKYO ARCHIVE' })).toHaveCount(0);
});

test('House Review preview filters and updates an evaluation', async ({ page }) => {
  await page.goto('/projects/house-review/preview');
  const preview = page.frameLocator('iframe');

  await preview.getByLabel('物件種別').selectOption('land');
  await expect(preview.getByRole('heading', { name: '小金井の角地' }).first()).toBeVisible();
  const rating = preview.getByLabel('夫の評価').first();
  await rating.selectOption('best');
  await expect(rating).toHaveValue('best');
});

test('Invoice demo keeps edits across create and preview routes', async ({ page }) => {
  await page.goto('/projects/invoice-generator/preview');
  const preview = page.frameLocator('iframe');
  const companyName = preview.getByLabel('会社名').first();

  await expect(companyName).toHaveValue('株式会社サンプルスタジオ');
  await companyName.fill('プレビュー編集株式会社');
  await preview.getByRole('button', { name: 'プレビューへ' }).click();
  await expect(preview.getByText('プレビュー編集株式会社')).toBeVisible();
  await preview.getByRole('button', { name: '編集に戻る' }).click();
  await expect(preview.getByLabel('会社名').first()).toHaveValue('プレビュー編集株式会社');
  await preview.getByRole('button', { name: 'プレビューへ' }).click();
  const downloadPromise = page.waitForEvent('download');
  await preview.getByRole('button', { name: 'PDFをダウンロード' }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toMatch(/^invoice_.*\.pdf$/);
});

test('CodeGarden runs the currently edited node graph', async ({ page }) => {
  await page.goto('/projects/code-garden/preview');
  const preview = page.frameLocator('iframe');

  await preview.getByRole('button', { name: '＋ テキスト' }).click();
  await expect(preview.getByText('6', { exact: true })).toBeVisible();
  await preview.getByRole('button', { name: 'アプリを実行' }).click();
  await expect(preview.getByRole('heading', { name: '追加したtext' })).toBeVisible();
  await preview.getByPlaceholder('やることを入力...').fill('プレビューを確認');
  await preview.getByRole('button', { name: '追加', exact: true }).click();
  await expect(preview.getByText('プレビューを確認')).toBeVisible();
});
