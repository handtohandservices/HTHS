import { supabase } from '../config/supabase';
import { GalleryItem } from '../types';

export const galleryService = {
  async list(): Promise<GalleryItem[]> {
    const { data, error } = await supabase.rpc('list_gallery_items');
    if (error) throw error;
    return (data as GalleryItem[]) || [];
  },

  async create(
    input: {
      title: string;
      category: string;
      category_slug: string;
      src: string;
      alt: string;
      location: string;
      image_public_id: string | null;
    },
    adminToken: string
  ): Promise<string> {
    const { data, error } = await supabase.rpc('create_gallery_item', {
      p_title: input.title,
      p_category: input.category,
      p_category_slug: input.category_slug,
      p_src: input.src,
      p_alt: input.alt,
      p_location: input.location,
      p_image_public_id: input.image_public_id,
      p_token: adminToken,
    });
    if (error) throw error;
    return data as string;
  },

  async update(
    id: string,
    input: {
      title: string;
      category: string;
      category_slug: string;
      src: string;
      alt: string;
      location: string;
      image_public_id: string | null;
    },
    adminToken: string
  ): Promise<boolean> {
    const { data, error } = await supabase.rpc('update_gallery_item', {
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
    if (error) throw error;
    return Boolean(data);
  },

  async remove(id: string, adminToken: string): Promise<boolean> {
    const { data, error } = await supabase.rpc('delete_gallery_item', {
      p_id: id,
      p_token: adminToken,
    });
    if (error) throw error;
    return Boolean(data);
  },
};
