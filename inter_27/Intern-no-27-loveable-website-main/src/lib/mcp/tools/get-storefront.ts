import { createClient } from "@supabase/supabase-js";
import { defineTool, type ToolContext } from "@lovable.dev/mcp-js";
import { z } from "zod";

function clientFor(ctx: ToolContext) {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!, {
    global: { headers: { Authorization: `Bearer ${ctx.getToken()}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export default defineTool({
  name: "get_storefront",
  title: "Get storefront by brand slug",
  description: "Look up a public Vendly storefront by its brand slug (store name, bio, avatar).",
  inputSchema: {
    brand_slug: z.string().trim().min(1).max(60),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: true },
  handler: async ({ brand_slug }, ctx) => {
    const { data, error } = await clientFor(ctx)
      .from("profiles")
      .select("store_name, brand_slug, bio, avatar_url")
      .eq("brand_slug", brand_slug)
      .maybeSingle();
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    if (!data) return { content: [{ type: "text", text: `No storefront found for slug "${brand_slug}"` }] };
    return {
      content: [{ type: "text", text: JSON.stringify(data) }],
      structuredContent: { storefront: data },
    };
  },
});
