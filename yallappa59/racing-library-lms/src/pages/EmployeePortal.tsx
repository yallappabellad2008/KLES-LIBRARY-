import { motion, AnimatePresence } from 'motion/react';
import { Plus, Edit2, Trash2, Search, Library, Loader2, ShieldCheck, Settings, Edit } from 'lucide-react';
import { useState } from 'react';
import BookForm from '../components/books/BookForm';
import { useBooks } from '../lib/useBooks';
import AuthGate from '../components/auth/AuthGate';

export default function EmployeePortal() {
  const [searchTerm, setSearchTerm] = useState('');
  const { books, loading, addBook, updateBook, deleteBook } = useBooks();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<any>(null);

  const filteredBooks = books.filter(b => 
    b.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.author?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSeed = async () => {
    const samples = [
      { title: 'The Feynman Lectures', author: 'Richard Feynman', category: 'Science', stock: 12, status: 'Active', rating: 5.0, image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=400', year: '1963' },
      { title: 'Linear Systems', author: 'B.P. Lathi', category: 'Engineering', stock: 15, status: 'Active', rating: 4.8, image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=400', year: '2017' },
      { title: 'Microelectronics', author: 'Adel Sedra', category: 'Engineering', stock: 10, status: 'Active', rating: 4.9, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=400', year: '2019' },
      { title: 'Fluid Mechanics', author: 'Frank White', category: 'Engineering', stock: 8, status: 'Active', rating: 4.7, image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=400', year: '2015' },
      { title: 'Structural Analysis', author: 'R.C. Hibbeler', category: 'Engineering', stock: 14, status: 'Active', rating: 4.8, image: 'https://images.unsplash.com/photo-1581093458622-0f45307e3bc5?auto=format&fit=crop&q=80&w=400', year: '2020' },
      { title: 'Thermodynamics', author: 'Yunus Cengel', category: 'Engineering', stock: 20, status: 'Active', rating: 4.9, image: 'https://images.unsplash.com/photo-1532187863486-abf9d39d6618?auto=format&fit=crop&q=80&w=400', year: '2018' },
      { title: 'Probability', author: 'Sheldon Ross', category: 'Academic', stock: 25, status: 'Active', rating: 4.8, image: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&q=80&w=400', year: '2018' },
      { title: 'Discrete Math', author: 'Kenneth Rosen', category: 'Academic', stock: 18, status: 'Active', rating: 4.7, image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=400', year: '2011' },
      { title: 'Data Comm', author: 'Behrouz Forouzan', category: 'Technology', stock: 12, status: 'Active', rating: 4.6, image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=400', year: '2012' },
      { title: 'OS Concepts', author: 'Abraham Silberschatz', category: 'Technology', stock: 15, status: 'Active', rating: 4.9, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=400', year: '2018' }
    ];
    
    for (const book of samples) {
      await addBook(book);
    }
    alert('System Archive Updated with new Telemetry Assets.');
  };

  const handleSave = async (bookData: any) => {
    if (editingBook) {
      await updateBook(editingBook.id, bookData);
    } else {
      await addBook(bookData);
    }
    setIsFormOpen(false);
    setEditingBook(null);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to retire this asset?')) {
      await deleteBook(id);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-red-600 animate-spin mx-auto mb-4" />
          <p className="font-bold text-xs uppercase tracking-[0.3em] text-slate-400 italic">Synchronizing Ops Database...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthGate requiredRole="EMPLOYEE">
      <div className="min-h-screen bg-slate-50 pt-12 pb-24">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <div className="italic">
              <div className="flex items-center gap-2 mb-4 text-emerald-600">
                <Library className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-widest">Inventory Management</span>
              </div>
              <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight leading-none mb-2">
                Academic <span className="text-emerald-600">Staff</span> Portal
              </h1>
              <p className="text-slate-500 font-medium">Manage institutional assets and inventory distribution.</p>
              
              <div className="flex flex-wrap gap-3 mt-6">
                <div className="flex items-center gap-2 bg-slate-100 px-4 py-1.5 rounded-full border border-slate-200">
                  <div className="w-2 h-2 bg-slate-400 rounded-full" />
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{books.length} Total Records</span>
                </div>
                <div className="flex items-center gap-2 bg-green-50 px-4 py-1.5 rounded-full border border-green-100">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-bold text-green-600 uppercase tracking-widest">Active Core</span>
                </div>
                <div className="flex items-center gap-2 bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-100">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full" />
                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Tier-02 Access</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-4">
              <button 
                onClick={handleSeed}
                className="bg-white border border-slate-200 text-slate-600 px-6 py-4 rounded-2xl font-bold transition-all flex items-center gap-2 hover:bg-slate-50 shadow-sm"
              >
                Sync Sample Data
              </button>
              <button 
                onClick={() => {
                  setEditingBook(null);
                  setIsFormOpen(true);
                }}
                className="bg-emerald-600 text-white py-4 px-8 rounded-2xl font-bold shadow-xl shadow-emerald-100 hover:brightness-110 active:scale-95 transition-all flex items-center gap-3"
              >
                <Plus className="w-5 h-5" />
                <span>Add New Book</span>
              </button>
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-emerald-600 transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search catalog..." 
                  className="bg-white border border-slate-200 text-slate-900 px-12 py-4 rounded-2xl focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 outline-none w-full md:w-64 transition-all shadow-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="mb-12 italic relative">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-emerald-100">
                  <Plus className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 uppercase tracking-tight">Archival Sequence</h3>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Vertical Telemetry: Latest institutional assets committed to the core</p>
                </div>
              </div>
            </div>

            <div className="relative pl-8 space-y-6">
              {/* Vertical Connector Line */}
              <div className="absolute left-[15px] top-2 bottom-12 w-0.5 bg-slate-200" />
              
              {books.length > 0 ? (
                books.slice(-10).reverse().map((book, index) => (
                  <motion.div 
                    key={book.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative flex items-center gap-6 group"
                  >
                    {/* Step Indicator */}
                    <div className="absolute -left-[25px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-4 border-slate-50 bg-emerald-600 shadow-sm z-10 group-hover:scale-125 transition-transform" />
                    
                    <div className="bg-white border border-slate-200 p-4 rounded-3xl shadow-sm hover:shadow-xl hover:shadow-emerald-100/50 transition-all flex-grow flex items-center gap-6 group cursor-pointer max-w-2xl">
                      <div className="w-16 h-20 rounded-2xl overflow-hidden shadow-md shrink-0">
                        <img src={book.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" referrerPolicy="no-referrer" />
                      </div>
                      
                      <div className="flex-grow min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded-full">{book.category}</span>
                          <span className="text-[9px] font-bold text-slate-400 uppercase">ARCHIVE-IDX: 00{books.length - index}</span>
                        </div>
                        <h4 className="font-bold text-slate-900 text-lg leading-tight uppercase group-hover:text-emerald-600 transition-colors truncate">{book.title}</h4>
                        <div className="flex items-center gap-4 mt-1">
                          <p className="text-[10px] text-slate-500 font-bold uppercase truncate font-mono tracking-tight">PRINCIPAL: {book.author.toUpperCase()}</p>
                          <div className="w-1 h-1 bg-slate-300 rounded-full" />
                          <p className="text-[10px] text-slate-500 font-bold uppercase">{book.year || '2024'}</p>
                        </div>
                      </div>

                      <div className="hidden sm:flex flex-col items-end shrink-0 pr-4">
                        <div className="text-xs font-black text-slate-900 uppercase">{book.stock} UNITS</div>
                        <div className="text-[9px] text-green-600 font-bold uppercase flex items-center gap-1">
                          <div className="w-1 h-1 bg-green-500 rounded-full animate-ping" />
                          Verified
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="py-12 bg-slate-100/50 rounded-[2.5rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 max-w-2xl">
                  <Library className="w-8 h-8 mb-2 opacity-50" />
                  <p className="text-xs font-bold uppercase tracking-widest">No Active Telemetry</p>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 italic">
            <SystemSkillCard 
              label="Inventory Health" 
              title="Resource Scaling" 
              progress="92%" 
              color="bg-green-500" 
              icon={Settings} 
              desc="Optimized allocation of high-demand documentation during peak research cycles."
            />
            <SystemSkillCard 
              label="Knowledge Audit" 
              title="Catalog Integrity" 
              progress="78%" 
              color="bg-emerald-600" 
              icon={Edit} 
              desc="Advanced auditing of intellectual property distribution and archival integrity."
            />
            <SystemSkillCard 
              label="System Security" 
              title="Clearance Protocols" 
              progress="85%" 
              color="bg-blue-600" 
              icon={ShieldCheck} 
              desc="Neural archival protection and biometric sync rate optimization."
            />
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">

            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 text-[10px] font-bold uppercase tracking-widest text-slate-500 border-b border-slate-100 italic">
                <tr>
                  <th className="p-6">Asset Details</th>
                  <th className="p-6">Category</th>
                  <th className="p-6">Inventory Status</th>
                  <th className="p-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 italic">
                <AnimatePresence mode="popLayout">
                  {filteredBooks.map((book) => (
                    <motion.tr 
                      key={book.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="hover:bg-slate-50/50 transition-colors group"
                    >
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <img src={book.image} className="w-10 h-14 object-cover rounded-lg shadow-sm border border-slate-100" alt="" referrerPolicy="no-referrer" />
                          <div>
                            <div className="font-bold text-slate-900 group-hover:text-emerald-600 transition-colors uppercase italic">{book.title}</div>
                            <div className="text-xs text-slate-500">by {book.author}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-6">
                        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg uppercase">{book.category}</span>
                      </td>
                      <td className="p-6">
                        <div className={`flex items-center gap-2 text-xs font-bold uppercase ${book.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${book.status === 'Active' ? 'bg-green-600 animate-pulse' : 'bg-red-600'}`} />
                          {book.status}
                        </div>
                      </td>
                      <td className="p-6">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => {
                              setEditingBook(book);
                              setIsFormOpen(true);
                            }}
                            className="p-3 bg-slate-50 hover:bg-white text-slate-600 hover:text-blue-600 transition-all border border-slate-100 rounded-xl shadow-sm"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDelete(book.id)}
                            className="p-3 bg-slate-50 hover:bg-red-50 text-slate-600 hover:text-red-600 transition-all border border-slate-100 rounded-xl shadow-sm"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
            
            {filteredBooks.length === 0 && (
              <div className="py-24 text-center">
                <Library className="w-16 h-16 text-slate-100 mx-auto mb-4" />
                <p className="text-slate-400 font-medium italic">No telemetry recorded for these parameters</p>
              </div>
            )}
          </div>
        </main>

        <AnimatePresence>
          {isFormOpen && (
            <BookForm 
              onClose={() => setIsFormOpen(false)} 
              onSave={handleSave} 
              initialData={editingBook}
            />
          )}
        </AnimatePresence>
      </div>
    </AuthGate>
  );
}

function SystemSkillCard({ label, title, progress, color, icon: Icon, desc }: any) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="bg-white border border-slate-200 p-6 rounded-3xl relative overflow-hidden group shadow-sm hover:shadow-md transition-all"
    >
      <div className="absolute top-2 right-2 opacity-5 group-hover:opacity-10 transition-opacity">
        <Icon className="w-12 h-12 text-slate-900" />
      </div>
      <span className="block text-slate-400 font-bold text-[10px] uppercase mb-2 tracking-widest">{label}</span>
      <h4 className="text-lg font-bold uppercase italic mb-2 text-slate-900">{title}</h4>
      <div className="h-1 bg-slate-100 rounded-full w-full mb-4 overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: progress }}
          className={`h-full ${color} shadow-[0_0_10px_rgba(255,255,255,0.2)]`}
        ></motion.div>
      </div>
      <p className="text-[10px] text-slate-500 font-bold leading-relaxed">{desc}</p>
    </motion.div>
  );
}

function StatCard({ title, value, icon: Icon, trend }: { title: string, value: string, icon: any, trend: string }) {
  const isPositive = trend.startsWith('+');
  return (
    <div className="bg-white border border-slate-200 p-6 rounded-3xl relative overflow-hidden group shadow-sm hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-4">
        <div className="w-10 h-10 bg-slate-50 border border-slate-100 flex items-center justify-center rounded-2xl">
          <Icon className="w-5 h-5 text-slate-900" />
        </div>
        <div className={`text-[10px] font-bold px-2 py-1 rounded-full border ${isPositive ? 'text-green-600 border-green-200 bg-green-50' : 'text-red-600 border-red-200 bg-red-50'}`}>
          {trend}
        </div>
      </div>
      <h4 className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-1">{title}</h4>
      <div className="text-3xl font-extrabold text-slate-900 tracking-tight italic">{value}</div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}
