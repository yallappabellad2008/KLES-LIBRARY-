import { motion, AnimatePresence } from 'motion/react';
import { Search, Book, Star, ExternalLink, Loader2, X, Library, MapPin, Calendar, CheckCircle2, BookOpen } from 'lucide-react';
import { useState } from 'react';
import { useBooks } from '../lib/useBooks';
import AuthGate from '../components/auth/AuthGate';

export default function UserPortal() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const { books, loading } = useBooks();

  const filteredBooks = books.filter(b => 
    b.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-red-600 animate-spin mx-auto mb-4" />
          <p className="text-slate-500 font-semibold italic">Accessing Knowledge Archive...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthGate requiredRole="STUDENT">
      <div className="min-h-screen bg-slate-50 pt-12 pb-24">
        {/* Search Header */}
        <section className="mb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-emerald-100/50">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 mb-4 text-emerald-600">
                  <Library className="w-5 h-5" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">Library Search System</span>
                </div>
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-8 uppercase italic">
                  Student <span className="text-emerald-600">Resource</span> Center
                </h1>
                <div className="relative group">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
                    <Search className="w-5 h-5 text-slate-300 group-focus-within:text-emerald-600 transition-colors" />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Search by title, author, or category..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-slate-50/50 border-2 border-slate-100 rounded-2xl focus:border-emerald-500 focus:bg-white outline-none py-4 pl-14 pr-6 text-slate-900 placeholder:text-slate-400 transition-all shadow-inner font-medium italic"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Catalog Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredBooks.length === 0 ? (
            <div className="text-center py-24 bg-white border-2 border-dashed border-slate-200 rounded-3xl">
              <Book className="w-16 h-16 text-slate-200 mx-auto mb-6" />
              <p className="text-slate-500 font-medium italic">No resources found matching your search</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredBooks.map((book, index) => (
                <div key={book.id}>
                  <BookCard book={book} index={index} onClick={() => setSelectedBook(book)} />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Detail Modal */}
        <AnimatePresence>
          {selectedBook && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedBook(null)}
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              ></motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative bg-white w-full max-w-4xl overflow-hidden shadow-2xl rounded-3xl flex flex-col md:flex-row"
              >
                <div className="relative w-full md:w-96 h-80 md:h-auto bg-slate-100 overflow-hidden shrink-0">
                  <img src={selectedBook.image} className="w-full h-full object-cover" alt={selectedBook.title} referrerPolicy="no-referrer" />
                </div>

                <div className="p-8 md:p-12 flex-1 relative flex flex-col">
                  <button onClick={() => setSelectedBook(null)} className="absolute top-6 right-6 text-slate-300 hover:text-slate-900 transition-colors bg-slate-50 p-2 rounded-full">
                    <X className="w-5 h-5" />
                  </button>
                  
                  <div className="flex-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 rounded-full text-red-600 text-[10px] font-bold uppercase tracking-widest mb-6">
                      <Star className="w-3 h-3 fill-current" />
                      Highly Rated Resource
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
                      {selectedBook.title}
                    </h2>
                    <p className="text-xl text-slate-500 font-medium italic mb-8 italic">by {selectedBook.author}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 italic">Category</p>
                        <p className="font-bold text-slate-900">{selectedBook.category}</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 italic">Location</p>
                        <p className="font-bold text-slate-900">Floor 2, Sec C</p>
                      </div>
                    </div>

                    <div className="space-y-3 mb-8">
                      <div className="flex items-center gap-3 text-slate-600 text-sm italic font-medium">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        Currently available in library stack
                      </div>
                      <div className="flex items-center gap-3 text-slate-600 text-sm italic font-medium">
                        <Calendar className="w-4 h-4 text-blue-500" />
                        Published in {selectedBook.year || '2024'}
                      </div>
                    </div>
                  </div>

                  <button className="w-full py-4 bg-red-600 text-white rounded-xl font-bold uppercase tracking-widest shadow-xl shadow-red-100 hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 italic">
                    <BookOpen className="w-5 h-5" />
                    Request Resource
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </AuthGate>
  );
}

function BookCard({ book, index, onClick }: { book: any, index: number, onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={onClick}
      className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group shadow-sm flex flex-col h-full"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img src={book.image} alt={book.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" referrerPolicy="no-referrer" />
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur-md text-slate-900 border border-slate-100 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm">
            {book.category}
          </span>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-slate-900 group-hover:text-red-600 transition-colors leading-tight mb-1 truncate italic">
            {book.title}
          </h3>
          <p className="text-slate-500 text-xs italic font-medium">by {book.author}</p>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-4 italic">
          <div className="flex items-center gap-1.5 font-bold text-slate-900">
            <Star className="w-4 h-4 text-red-600 fill-red-600" />
            <span className="text-sm">{book.rating}</span>
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-red-600 transition-colors">Details</p>
        </div>
      </div>
    </motion.div>
  );
}
