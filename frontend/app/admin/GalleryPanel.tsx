'use client';

import { useState, useEffect, useCallback } from 'react';
import { api, ApiRequestError, GalleryItem } from '@/lib/api';
import {
  Plus,
  Trash2,
  Image as ImageIcon,
  Loader2,
  X,
  MapPin,
  Tag,
  Search,
  ZoomIn,
  ChevronLeft,
  ChevronRight,
  Pencil,
} from 'lucide-react';
import { StatCard } from './_shared';

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center px-4">
      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        <ImageIcon className="text-gray-400" size={28} />
      </div>
      <h3 className="font-bold text-[#0d1b3e] mb-1">Nothing here yet</h3>
      <p className="text-sm text-gray-500 max-w-sm">{message}</p>
    </div>
  );
}

const categoryMap: Record<string, string> = {
  'Private Security': 'security',
  'Housekeeping & Facilities': 'housekeeping',
  'Events & Cultural': 'events',
  'Skill & AI Training': 'training',
  'Women Empowerment': 'women-empowerment',
  'Logistics & Supplies': 'logistics',
};

export default function GalleryPanel() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [activeModalIndex, setActiveModalIndex] = useState<number | null>(null);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Private Security');
  const [customCategory, setCustomCategory] = useState('');
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [location, setLocation] = useState('');
  const [alt, setAlt] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const closeModal = () => {
    setIsOpen(false);
    setEditingItem(null);
    setTitle('');
    setCategory('Private Security');
    setCustomCategory('');
    setIsCustomCategory(false);
    setLocation('');
    setAlt('');
    setFile(null);
  };

  const load = useCallback(async () => {
    setFetching(true);
    setError(null);
    try {
      const data = await api.listGallery();
      setItems(data || []);
    } catch (err) {
      setError(
        err instanceof ApiRequestError && err.code !== 'network'
          ? err.message
          : 'Failed to load gallery items.'
      );
    } finally {
      setFetching(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const startEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setTitle(item.title);
    setCategory(item.category);
    setLocation(item.location);
    setAlt(item.alt || '');
    setCustomCategory('');
    setIsCustomCategory(false);
    setFile(null);
    setIsOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem && !file) {
      alert('Please select an image to upload.');
      return;
    }

    const finalCategory = isCustomCategory ? customCategory.trim() : category;
    if (!finalCategory) {
      alert('Please specify a category.');
      return;
    }
    const slug = categoryMap[finalCategory] || finalCategory.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', finalCategory);
    formData.append('category_slug', slug);
    formData.append('location', location);
    formData.append('alt', alt || title);
    if (file) {
      formData.append('image', file);
    }

    try {
      if (editingItem) {
        await api.updateGalleryItem(editingItem.id, formData);
      } else {
        await api.createGalleryItem(formData);
      }
      closeModal();
      // Reload
      await load();
    } catch (err) {
      console.error('Submit error details:', err);
      let errorMsg = editingItem ? 'Failed to update gallery item.' : 'Failed to upload gallery item.';
      if (err instanceof ApiRequestError) {
        errorMsg = `${errorMsg} (${err.message})`;
      } else if (err instanceof Error) {
        errorMsg = `${errorMsg} (${err.message})`;
      }
      setError(errorMsg);
    } finally {
      setUploading(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm('Are you sure you want to delete this gallery item? This cannot be undone.')) return;
    setActionLoading(id);
    try {
      await api.deleteGalleryItem(id);
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setError(
        err instanceof ApiRequestError && err.code !== 'network'
          ? err.message
          : 'Failed to delete gallery item.'
      );
    } finally {
      setActionLoading(null);
    }
  };

  const defaultCategoriesObj = [
    { name: 'Private Security', slug: 'security' },
    { name: 'Housekeeping & Facilities', slug: 'housekeeping' },
    { name: 'Events & Cultural', slug: 'events' },
    { name: 'Skill & AI Training', slug: 'training' },
    { name: 'Women Empowerment', slug: 'women-empowerment' },
    { name: 'Logistics & Supplies', slug: 'logistics' },
  ];
  const uniqueCategories = Array.from(
    new Set([
      ...defaultCategoriesObj.map((c) => c.name),
      ...items.map((it) => it.category).filter(Boolean),
    ])
  );
  const filterCategories = Array.from(
    new Map([
      ...defaultCategoriesObj.map((c) => [c.slug, c.name]),
      ...items.map((item) => [item.category_slug, item.category]),
    ]).entries()
  ).map(([slug, name]) => ({ name, slug }));

  const filtered = items.filter((item) => {
    const matchesFilter = selectedFilter === 'all' || item.category_slug === selectedFilter;
    const q = search.trim().toLowerCase();
    const matchesSearch =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.location.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeModalIndex === null) return;
    setActiveModalIndex((prev) =>
      prev! > 0 ? prev! - 1 : filtered.length - 1
    );
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeModalIndex === null) return;
    setActiveModalIndex((prev) =>
      prev! < filtered.length - 1 ? prev! + 1 : 0
    );
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeModalIndex === null) return;
      if (e.key === 'Escape') setActiveModalIndex(null);
      if (e.key === 'ArrowLeft') {
        setActiveModalIndex((prev) =>
          prev! > 0 ? prev! - 1 : filtered.length - 1
        );
      }
      if (e.key === 'ArrowRight') {
        setActiveModalIndex((prev) =>
          prev! < filtered.length - 1 ? prev! + 1 : 0
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalIndex, filtered?.length]);

  return (
    <>
      {error && (
        <div className="mb-5 text-red-700 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Images" value={items.length} color="navy" />
        <StatCard
          label="Private Security"
          value={items.filter((item) => item.category_slug === 'security').length}
          color="amber"
        />
        <StatCard
          label="Housekeeping"
          value={items.filter((item) => item.category_slug === 'housekeeping').length}
          color="blue"
        />
        <StatCard
          label="Logistics & Supplies"
          value={items.filter((item) => item.category_slug === 'logistics').length}
          color="gray"
        />
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-6 flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search gallery..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition text-sm"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto shrink-0 justify-end">
          <select
            value={selectedFilter}
            onChange={(e) => {
              if (e.target.value === '__custom__') {
                setIsCustomCategory(true);
                setCategory('__custom__');
                setIsOpen(true);
              } else {
                setSelectedFilter(e.target.value);
              }
            }}
            className="w-full md:w-auto px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm outline-none focus:border-amber-500"
          >
            <option value="all">All Categories</option>
            {filterCategories.map((cat) => (
              <option key={cat.slug} value={cat.slug}>
                {cat.name}
              </option>
            ))}
            <option
              value="__custom__"
              className="font-bold text-amber-600 bg-amber-50"
              style={{ fontWeight: 'bold', color: '#d97706', backgroundColor: '#fef3c7' }}
            >
              ✨ + Add Custom Category...
            </option>
          </select>

          <button
            onClick={() => setIsOpen(true)}
            className="btn-gold inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold shadow-md bg-[#0d1b3e] text-amber-400 hover:bg-[#122452] transition-colors w-full md:w-auto"
          >
            <Plus size={16} /> Add Image
          </button>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 overflow-hidden">
        {fetching ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="text-amber-500 animate-spin" size={28} />
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState message={items.length === 0 ? 'No images uploaded yet.' : 'No images match your filters.'} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((item, index) => (
              <div
                key={item.id}
                onClick={() => setActiveModalIndex(index)}
                className="group relative rounded-xl overflow-hidden border border-gray-200 bg-slate-950 aspect-[4/3] flex flex-col shadow-sm cursor-pointer hover:shadow-lg transition-all"
              >
                {/* Image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80" />

                {/* Badges */}
                <span className="absolute top-2.5 left-2.5 bg-amber-500 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  {item.category}
                </span>

                {/* Info Text */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white pointer-events-none">
                  <div className="min-w-0 pr-2">
                    <h4 className="font-bold text-xs line-clamp-1 drop-shadow-md">{item.title}</h4>
                    <div className="flex items-center gap-1 mt-0.5 text-[10px] text-gray-300">
                      <MapPin size={10} className="text-amber-400 shrink-0" />
                      <span className="truncate">{item.location}</span>
                    </div>
                  </div>
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/90 text-white flex items-center justify-center shadow backdrop-blur-sm group-hover:scale-110 transition-all opacity-0 group-hover:opacity-100">
                    <ZoomIn size={12} />
                  </span>
                </div>

                {/* Actions overlay */}
                <div className="absolute top-2.5 right-2.5 flex gap-1.5 z-10 shadow-sm">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      startEdit(item);
                    }}
                    className="p-2 rounded-lg bg-amber-500/90 text-white hover:bg-amber-600 transition-colors"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      remove(item.id);
                    }}
                    disabled={actionLoading === item.id}
                    className="p-2 rounded-lg bg-red-600/90 text-white hover:bg-red-700 transition-colors disabled:opacity-50"
                  >
                    {actionLoading === item.id ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <Trash2 size={14} />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center sm:p-4">
          <div className="bg-white max-w-lg w-full h-full sm:h-auto sm:max-h-[90vh] sm:rounded-2xl overflow-hidden shadow-2xl border-t sm:border border-gray-200 flex flex-col">
            <div className="px-6 py-4 bg-[#0d1b3e] text-white flex items-center justify-between border-b border-white/10 shrink-0">
              <h3 className="font-bold text-base sm:text-lg flex items-center gap-2">
                <ImageIcon size={20} className="text-amber-400" /> {editingItem ? 'Edit Gallery Item' : 'Add Gallery Item'}
              </h3>
              <button
                onClick={closeModal}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
              {editingItem && (
                <div className="mb-4">
                  <span className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                    Current Image
                  </span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={editingItem.src}
                    alt={editingItem.alt || 'Current image'}
                    className="w-32 h-20 object-cover rounded-lg border border-gray-200 shadow-sm"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  {editingItem ? 'Replace Image File (Optional)' : 'Image File *'}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="w-full text-sm border border-gray-200 rounded-lg p-2 bg-gray-50 focus:outline-none"
                  required={!editingItem}
                />
              </div>

              {file && (
                <div className="mt-2 mb-4">
                  <span className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                    {editingItem ? 'New Image Preview' : 'Selected Image Preview'}
                  </span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={URL.createObjectURL(file)}
                    alt="New preview"
                    className="w-32 h-20 object-cover rounded-lg border border-amber-500 shadow-sm"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Title *
                </label>
                <input
                  type="text"
                  placeholder="e.g. PSARA Verified Security Guards Deployment"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full text-sm border border-gray-200 rounded-lg p-2.5 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value);
                      setIsCustomCategory(e.target.value === '__custom__');
                    }}
                    className="w-full text-sm border border-gray-200 rounded-lg p-2.5 focus:border-amber-500 outline-none"
                    required
                  >
                    {uniqueCategories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                    <option
                      value="__custom__"
                      className="font-bold text-amber-600 bg-amber-50"
                      style={{ fontWeight: 'bold', color: '#d97706', backgroundColor: '#fef3c7' }}
                    >
                      ✨ + Add Custom Category...
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Location *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Corporate Tower, South Delhi"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full text-sm border border-gray-200 rounded-lg p-2.5 focus:border-amber-500 outline-none"
                    required
                  />
                </div>
              </div>

              {isCustomCategory && (
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Custom Category Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Special Events"
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    className="w-full text-sm border border-gray-200 rounded-lg p-2.5 focus:border-amber-500 outline-none"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Alt text / Image Description
                </label>
                <input
                  type="text"
                  placeholder="e.g. Security guards standing in formation"
                  value={alt}
                  onChange={(e) => setAlt(e.target.value)}
                  className="w-full text-sm border border-gray-200 rounded-lg p-2.5 focus:border-amber-500 outline-none"
                />
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-4 py-2 bg-[#0d1b3e] text-white font-semibold rounded-lg text-sm hover:bg-[#122452] transition-colors flex items-center gap-1.5 disabled:opacity-50"
                >
                  {uploading ? (
                    <>
                      <Loader2 size={14} className="animate-spin" /> {editingItem ? 'Saving...' : 'Uploading...'}
                    </>
                  ) : (
                    editingItem ? 'Save Changes' : 'Upload & Save'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Lightbox Modal */}
      {activeModalIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveModalIndex(null)}
        >
          {/* Modal Container */}
          <div
            className="relative max-w-5xl w-full bg-[#0d1b3e] rounded-3xl overflow-hidden shadow-2xl border border-amber-500/30"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Box */}
            <div className="relative aspect-[16/10] bg-black flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={filtered[activeModalIndex].src}
                alt={filtered[activeModalIndex].alt}
                className="w-full h-full object-contain"
              />

              {/* Left Arrow Button */}
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 text-white hover:bg-amber-500 flex items-center justify-center transition-colors border border-white/20"
                aria-label="Previous photo"
              >
                <ChevronLeft size={22} />
              </button>

              {/* Right Arrow Button */}
              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 text-white hover:bg-amber-500 flex items-center justify-center transition-colors border border-white/20"
                aria-label="Next photo"
              >
                <ChevronRight size={22} />
              </button>

              {/* Close Button */}
              <button
                onClick={() => setActiveModalIndex(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white hover:bg-red-500 flex items-center justify-center transition-colors border border-white/20"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Bottom Bar */}
            <div className="p-5 sm:p-6 bg-[#0d1b3e] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/10">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-amber-500 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                    {filtered[activeModalIndex].category}
                  </span>
                  <span className="text-gray-400 text-xs">
                    Photo {activeModalIndex + 1} of {filtered.length}
                  </span>
                </div>
                <h3 className="font-bold text-white text-base sm:text-lg">
                  {filtered[activeModalIndex].title}
                </h3>
                <p className="text-xs text-amber-400 mt-0.5">
                  Location: {filtered[activeModalIndex].location}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
