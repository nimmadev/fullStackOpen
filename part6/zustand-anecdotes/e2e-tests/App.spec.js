import { test, expect } from "@playwright/test";

test.beforeEach(async ({ request }) => {
  const anecdotes = [
    {
      content: "If it hurts, do it more often",
      id: "47145",
      votes: 0,
    },
    {
      content: "Adding manpower to a late software project makes it later!",
      votes: 1,
      id: "21149",
    },
    {
      content:
        "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
      id: "36975",
      votes: 2,
    },
  ];

  const response = await request.get("http://localhost:3030/anecdotes");
  const existing = await response.json();

  for (const anecdote of existing) {
    await request.delete(`http://localhost:3030/anecdotes/${anecdote.id}`);
  }

  for (const anecdote of anecdotes) {
    await request.post("http://localhost:3030/anecdotes", {
      data: anecdote,
    });
  }
});

test("front page open", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Anecdotes")).toBeVisible();
});

test("Anecdotes can be added and show notifictaion", async ({ page }) => {
  await page.goto("/");
  await page.locator('input[name="content"]').fill("this is a test");
  await page.getByRole("button", { name: "create" }).click();
  await expect(page.getByText("new anecdote created")).toBeVisible();
  await expect(page.getByText("this is a test", { exact: true })).toBeVisible();
});
