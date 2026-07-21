import { auth, defineMcp } from "@lovable.dev/mcp-js";
import getMyProfile from "./tools/get-my-profile";
import updateMyProfile from "./tools/update-my-profile";
import getStorefront from "./tools/get-storefront";

const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "vendly-mcp",
  title: "Vendly",
  version: "0.1.0",
  instructions:
    "Tools for the Vendly multi-tenant storefront platform. Use `get_my_profile` and `update_my_profile` to view and edit the signed-in seller's store profile, and `get_storefront` to look up any public storefront by brand slug.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [getMyProfile, updateMyProfile, getStorefront],
});
