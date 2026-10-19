import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// Cache incremental via assets estáticos: sem custo e sem R2/KV. Revisar quando houver ISR real.
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
});
