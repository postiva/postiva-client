import { createClient } from "../src/index.js";

test('create client get contents', async () => {
  const client = await createClient('x4losqfnsfui1w6phtphtx3o', "test");

  const contents = await client.getContents();

  if (contents.length === 0) {
    throw new Error("Contents not found");
  }

  expect(contents.length).toBeGreaterThan(0);
});