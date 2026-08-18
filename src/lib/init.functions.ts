import { createServerFn } from "@tanstack/react-start";
import { getBackendConfig } from "./backend-config";
import type { Database } from "@/integrations/supabase/types";

/**
 * Public server function: reads the single `system_initialization` row.
 * No authentication required — the table has a public SELECT policy.
 */
export const readSystemInitialization = createServerFn({ method: "GET" })
  .handler(async () => {
    const config = getBackendConfig();
    if (!config.isConfigured) {
      throw new Error("تنظیمات بک‌اند هنوز پیکربندی نشده است.");
    }

    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient<Database>(
      config.backendUrl,
      config.publicApiKey,
      {
        auth: {
          storage: undefined,
          persistSession: false,
          autoRefreshToken: false,
        },
      },
    );

    const { data, error } = await supabase
      .from("system_initialization")
      .select("is_initialized")
      .maybeSingle();

    if (error) {
      throw new Error(`خطا در خواندن وضعیت راه‌اندازی: ${error.message}`);
    }

    return {
      initialized: Boolean(data?.is_initialized),
      details: { source: config.source },
    };
  });
