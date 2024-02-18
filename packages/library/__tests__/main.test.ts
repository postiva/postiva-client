import { greeter } from "../src/main.js";

test('greeter', async () => {
  const greeting = await greeter('Postiva');
  expect(greeting).toBe('Hello, Postiva');
});