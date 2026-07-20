"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.employerService = void 0;
const supabase_1 = require("../config/supabase");
exports.employerService = {
    async create(input) {
        const { data, error } = await supabase_1.supabase.rpc('create_employer_request', {
            p_company_name: input.company_name,
            p_contact_person: input.contact_person,
            p_email: input.email,
            p_phone: input.phone,
            p_services: input.services_requested,
            p_number_of_personnel: input.number_of_personnel,
            p_duration: input.duration,
            p_location: input.location,
            p_message: input.message,
        });
        if (error)
            throw error;
        return data;
    },
    async list() {
        const { data, error } = await supabase_1.supabase.rpc('list_employer_requests');
        if (error)
            throw error;
        return data || [];
    },
    async getStats() {
        const { data, error } = await supabase_1.supabase.rpc('get_employer_request_stats');
        if (error)
            throw error;
        return data;
    },
    async updateStatus(id, status, adminToken) {
        const { data, error } = await supabase_1.supabase.rpc('update_employer_request_status', {
            p_id: id,
            p_status: status,
            p_token: adminToken,
        });
        if (error)
            throw error;
        return Boolean(data);
    },
    async remove(id, adminToken) {
        const { data, error } = await supabase_1.supabase.rpc('delete_employer_request', {
            p_id: id,
            p_token: adminToken,
        });
        if (error)
            throw error;
        return Boolean(data);
    },
};
//# sourceMappingURL=employerService.js.map