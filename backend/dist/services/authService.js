"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const supabase_1 = require("../config/supabase");
function pickSession(row) {
    if (!row || !row.admin_id || !row.email || !row.token)
        return null;
    return {
        admin_id: row.admin_id,
        email: row.email,
        token: row.token,
        expires_at: row.expires_at || '',
    };
}
exports.authService = {
    async signUp(email, password) {
        const { data, error } = await supabase_1.supabase.rpc('admin_create', {
            p_email: email,
            p_password: password,
        });
        if (error)
            throw error;
        const row = Array.isArray(data) ? data[0] : data;
        const session = pickSession(row);
        if (!session) {
            throw new Error('An admin account with this email already exists.');
        }
        return session;
    },
    async signIn(email, password) {
        const { data, error } = await supabase_1.supabase.rpc('admin_sign_in', {
            p_email: email,
            p_password: password,
        });
        if (error)
            throw error;
        const row = Array.isArray(data) ? data[0] : data;
        const session = pickSession(row);
        if (!session) {
            throw new Error('Invalid email or password.');
        }
        return session;
    },
    async signOut(token) {
        await supabase_1.supabase.rpc('admin_sign_out', { p_token: token });
    },
    async verifySession(token) {
        const { data, error } = await supabase_1.supabase.rpc('admin_verify_session', {
            p_token: token,
        });
        if (error || !data)
            return null;
        const row = Array.isArray(data) ? data[0] : data;
        if (!row?.admin_id)
            return null;
        return { admin_id: row.admin_id, email: row.email };
    },
};
//# sourceMappingURL=authService.js.map