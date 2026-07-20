"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactService = void 0;
const supabase_1 = require("../config/supabase");
exports.contactService = {
    async create(input) {
        const { data, error } = await supabase_1.supabase.rpc('create_contact_submission', {
            p_name: input.name,
            p_email: input.email,
            p_phone: input.phone,
            p_message: input.message,
        });
        if (error)
            throw error;
        return data;
    },
    async list() {
        const { data, error } = await supabase_1.supabase.rpc('list_contact_submissions');
        if (error)
            throw error;
        return data || [];
    },
    async getStats() {
        const { data, error } = await supabase_1.supabase.rpc('get_contact_submission_stats');
        if (error)
            throw error;
        return data;
    },
    async updateStatus(id, status, adminToken) {
        const { data, error } = await supabase_1.supabase.rpc('update_contact_submission_status', {
            p_id: id,
            p_status: status,
            p_token: adminToken,
        });
        if (error)
            throw error;
        return Boolean(data);
    },
    async remove(id, adminToken) {
        const { data, error } = await supabase_1.supabase.rpc('delete_contact_submission', {
            p_id: id,
            p_token: adminToken,
        });
        if (error)
            throw error;
        return Boolean(data);
    },
};
//# sourceMappingURL=contactService.js.map