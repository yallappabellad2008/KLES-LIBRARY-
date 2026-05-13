import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Save, AlertCircle, Upload, Image as ImageIcon, Plus } from 'lucide-react';

interface BookFormProps {
  onClose: () => void;
  onSave: (book: any) => void;
  initialData?: any;
}

export default function BookForm({ onClose, onSave, initialData }: BookFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState(initialData || {
    title: '',
    author: '',
    category: 'Engineering',
    stock: 0,
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1543004218-ee141d0ef1bc?auto=format&fit=crop&q=80&w=400',
    rating: 4.5,
    year: new Date().getFullYear().toString()
  });

  const categories = ['Engineering', 'Physics', 'Management', 'Technology', 'Science', 'Humanities', 'Story', 'Academic', 'Growth', 'Novel', 'General Knowledge'];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white border border-slate-200 w-full max-w-2xl shadow-2xl rounded-3xl overflow-hidden"
      >
        <div className="bg-emerald-600 p-8 flex justify-between items-center text-white">
          <div className="italic">
            <h2 className="text-2xl font-bold tracking-tight">
              {initialData ? 'Update Asset Specs' : 'Add New Academic Book'}
            </h2>
            <p className="text-emerald-100 text-xs font-medium">Clearance Level: Tier-02 Staff Access</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6 italic">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Photo Upload Section */}
            <div className="shrink-0">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1 block mb-3">Asset Visualization</label>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="relative w-40 h-52 bg-slate-100 rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center cursor-pointer hover:border-emerald-600/50 hover:bg-slate-50 transition-all group overflow-hidden shadow-inner"
              >
                {formData.image ? (
                  <>
                    <img src={formData.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Preview" />
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-4 text-center">
                      <Upload className="w-6 h-6 mb-2" />
                      <span className="text-[10px] font-bold uppercase leading-tight">Update Archival Imagery</span>
                    </div>
                  </>
                ) : (
                  <div className="text-center p-4">
                    <ImageIcon className="w-8 h-8 text-slate-300 mx-auto mb-2 group-hover:text-emerald-600 transition-colors" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-tight block">Insert Visual Telemetry</span>
                  </div>
                )}
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-600 rounded-full border-4 border-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Plus className="w-5 h-5 text-white" />
                </div>
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/*" 
                className="hidden" 
              />
            </div>

            <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 col-span-full">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Asset Title</label>
                <input 
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-semibold text-sm outline-none focus:border-emerald-600 focus:bg-white transition-all shadow-sm"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Advanced Fluid Dynamics"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Principal Author</label>
                <input 
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-semibold text-sm outline-none focus:border-emerald-600 focus:bg-white transition-all shadow-sm"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  placeholder="Full Name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Knowledge Sector</label>
                <div className="relative">
                  <select 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-semibold text-sm outline-none focus:border-emerald-600 focus:bg-white transition-all appearance-none shadow-sm"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <Plus className="w-3 h-3 rotate-45" />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Archive Quantity</label>
                <input 
                  type="number"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-semibold text-sm outline-none focus:border-emerald-600 focus:bg-white transition-all shadow-sm"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Release Year</label>
                <input 
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-semibold text-sm outline-none focus:border-emerald-600 focus:bg-white transition-all shadow-sm"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  placeholder="2024"
                />
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 p-4 border-l-4 border-emerald-600 rounded-r-xl flex gap-4 items-center">
            <AlertCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <p className="text-[10px] uppercase font-bold tracking-widest text-emerald-800 leading-relaxed">
              Strict Adherence Notice: New assets will be verified by the system core before deployment to the public catalog. Archival imagery is required for all Tier-02 registrations.
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-6">
            <button 
              type="button" 
              onClick={onClose}
              className="px-8 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-200 transition-all font-mono"
            >
              TERMINATE
            </button>
            <button 
              type="submit"
              className="px-10 py-3 bg-emerald-600 text-white rounded-xl font-bold text-sm shadow-xl shadow-emerald-100 hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 group"
            >
              <Save className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              <span>{initialData ? 'Update Asset' : 'Commit to Archive'}</span>
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
