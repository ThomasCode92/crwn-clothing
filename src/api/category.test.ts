import { getCategories } from "./category";

it("should return an array of categories", async function () {
  const categories = await getCategories();
  expect(categories).toBeInstanceOf(Array);
  expect(categories.length).toBeGreaterThan(0);
});
