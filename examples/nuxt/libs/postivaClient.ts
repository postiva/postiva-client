import { createClient } from "@postiva/client";

export const postivaClient = createClient({
  apiKey: process.env.VITE_POSTIVA_API_KEY as string,
  workspaceId: process.env.VITE_POSTIVA_WORKSPACE_ID as string,
});
