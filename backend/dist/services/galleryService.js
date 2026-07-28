"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.galleryService = void 0;
const supabase_1 = require("../config/supabase");
exports.galleryService = {
    async list() {
        const { data, error } = await supabase_1.supabase.rpc('list_gallery_items');
        if (error)
            throw error;
        return data || [];
    },
    async create(input, adminToken) {
        const { data, error } = await supabase_1.supabase.rpc('create_gallery_item', {
            p_title: input.title,
            p_category: input.category,
            p_category_slug: input.category_slug,
            p_src: input.src,
            p_alt: input.alt,
            p_location: input.location,
            p_image_public_id: input.image_public_id,
            p_token: adminToken,
        });
        if (error)
            throw error;
        return data;
    },
    async update(id, input, adminToken) {
        const { data, error } = await supabase_1.supabase.rpc('update_gallery_item', {
            p_id: id,
            p_title: input.title,
            p_category: input.category,
            p_category_slug: input.category_slug,
            p_src: input.src,
            p_alt: input.alt,
            p_location: input.location,
            p_image_public_id: input.image_public_id,
            p_token: adminToken,
        });
        if (error)
            throw error;
        return Boolean(data);
    },
    async remove(id, adminToken) {
        const { data, error } = await supabase_1.supabase.rpc('delete_gallery_item', {
            p_id: id,
            p_token: adminToken,
        });
        if (error)
            throw error;
        return Boolean(data);
    },
};
//# sourceMappingURL=galleryService.js.map