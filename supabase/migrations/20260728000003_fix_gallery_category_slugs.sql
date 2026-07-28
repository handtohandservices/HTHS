-- Fix existing gallery items with wrong slugs due to frontend category mapping mismatch
UPDATE gallery_items SET category_slug = 'security' WHERE category_slug = 'private-security';
UPDATE gallery_items SET category_slug = 'housekeeping' WHERE category_slug = 'housekeeping-facilities';
UPDATE gallery_items SET category_slug = 'events' WHERE category_slug = 'events-cultural';
UPDATE gallery_items SET category_slug = 'training' WHERE category_slug = 'skill-ai-training';
UPDATE gallery_items SET category_slug = 'logistics' WHERE category_slug = 'logistics-supplies';
