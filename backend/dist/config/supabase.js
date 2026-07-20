"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabase = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const env_1 = require("./env");
// The backend uses the anon key + SECURITY DEFINER RPC functions.
// All privileged operations (admin auth, submission management) are performed
// through Postgres functions that validate admin sessions internally, so no
// service role key is needed. This keeps the backend's Supabase access scoped
// to the least privilege possible.
exports.supabase = (0, supabase_js_1.createClient)(env_1.config.supabaseUrl, env_1.config.supabaseAnonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
});
//# sourceMappingURL=supabase.js.map