"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeService = void 0;
const supabase_1 = require("../config/supabase");
exports.employeeService = {
    async create(input) {
        const { data, error } = await supabase_1.supabase.rpc('create_employee_application', {
            p_full_name: input.full_name,
            p_email: input.email,
            p_phone: input.phone,
            p_position: input.position_applied_for,
            p_experience_years: input.experience_years,
            p_message: input.message,
            p_resume_url: input.resume_url,
            p_resume_public_id: input.resume_public_id,
        });
        if (error)
            throw error;
        return data;
    },
    async list() {
        const { data, error } = await supabase_1.supabase.rpc('list_employee_applications');
        if (error)
            throw error;
        return data || [];
    },
    async getStats() {
        const { data, error } = await supabase_1.supabase.rpc('get_employee_application_stats');
        if (error)
            throw error;
        return data;
    },
    async updateStatus(id, status, adminToken) {
        const { data, error } = await supabase_1.supabase.rpc('update_employee_application_status', {
            p_id: id,
            p_status: status,
            p_token: adminToken,
        });
        if (error)
            throw error;
        return Boolean(data);
    },
    async remove(id, adminToken) {
        const { data, error } = await supabase_1.supabase.rpc('delete_employee_application', {
            p_id: id,
            p_token: adminToken,
        });
        if (error)
            throw error;
        return Boolean(data);
    },
};
//# sourceMappingURL=employeeService.js.map