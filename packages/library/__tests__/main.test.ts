import { createClient } from "../src/index.js";

test("create client get contents", async () => {
  const client = await createClient({
    apiKey: "test",
    workspaceId: "test",
  });

  const contents = await client.contents.getContents();

  if (contents.data.length === 0) {
    throw new Error("Contents not found");
  }

  expect(contents.data.length).toBeGreaterThan(0);
});
