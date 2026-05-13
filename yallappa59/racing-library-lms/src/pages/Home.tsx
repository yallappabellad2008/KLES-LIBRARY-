import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Star, GraduationCap, Users, Shield, Plus } from 'lucide-react';

export default function Home() {
  const features = [
    { label: 'Total Books', value: '5,000+', icon: BookOpen, color: 'text-red-600' },
    { label: 'Active Learners', value: '2,500', icon: GraduationCap, color: 'text-blue-600' },
    { label: 'Asset Management', value: 'Add Books', icon: Plus, color: 'text-green-600', link: '/employee' },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden bg-emerald-50/40 border-b border-emerald-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100/50 border border-emerald-200 rounded-full text-emerald-700 text-xs font-bold uppercase tracking-wider mb-6">
                <Star className="w-3 h-3 fill-current" />
                Institutional Excellence Since 1990
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
                Modern Knowledge <span className="text-emerald-600 underline decoration-4 underline-offset-8">Infrastructure.</span>
              </h1>
              <p className="text-xl text-slate-600 mb-10 max-w-xl leading-relaxed">
                Empowering students and faculty with high-fidelity academic resources, seamless inventory tracking, and institutional-grade archival systems.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link to="/user" className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold uppercase tracking-widest shadow-xl shadow-emerald-100 hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 italic">
                  Access Library <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/employee" className="px-8 py-3 rounded-xl border border-emerald-200 text-emerald-700 font-bold uppercase tracking-widest hover:bg-emerald-50 transition-all italic">
                  Add Books
                </Link>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="absolute inset-0 bg-emerald-600/5 blur-3xl rounded-full"></div>
              <img 
                src="https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=600" 
                className="relative rounded-2xl shadow-2xl border border-white/20 transform rotate-2 hover:rotate-0 transition-transform duration-700"
                alt="Library Interface"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-b border-slate-100 italic">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <Link 
                key={i} 
                to={feature.link || '#'} 
                className={`flex items-center gap-4 p-6 bg-white border border-slate-100 rounded-xl shadow-sm italic transition-all ${feature.link ? 'cursor-pointer hover:shadow-md hover:border-red-600/30' : 'hover:shadow-md'}`}
              >
                <div className={`p-3 rounded-lg bg-slate-50 ${feature.color}`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">{feature.value}</p>
                  <p className="text-sm text-slate-500 font-medium">{feature.label}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="italic">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Academic Collections</h2>
              <p className="text-slate-500">Curated resources for every engineering discipline.</p>
            </div>
            <Link to="/user" className="text-red-600 font-bold flex items-center gap-2 hover:underline italic">
              View All Books <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeaturedBookCard 
              title="Introduction to Algorithms" 
              author="Thomas H. Cormen" 
              category="Technology" 
              image="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=400"
            />
            <FeaturedBookCard 
              title="A Brief History of Time" 
              author="Stephen Hawking" 
              category="Science" 
              image="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=400"
            />
            <FeaturedBookCard 
              title="The Design of Everyday Things" 
              author="Don Norman" 
              category="Engineering" 
              image="https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=400"
            />
            <FeaturedBookCard 
              title="Atomic Habits" 
              author="James Clear" 
              category="Growth" 
              image="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400"
            />
          </div>
        </div>
      </section>

      {/* Portal Cards */}
      <section className="py-24 bg-slate-50 italic">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <PortalCard 
              title="Student Library" 
              description="Browse the full catalog, check availability, and request academic assets." 
              link="/user" 
              icon={GraduationCap}
              color="text-red-600"
            />
            <PortalCard 
              title="Add Books" 
              description="Manage inventory, register new academic assets, and update terminal data." 
              link="/employee" 
              icon={Users}
              color="text-blue-600"
            />
            <PortalCard 
              title="System Control" 
              description="Administrative audits, user management, and core architecture config." 
              link="/admin" 
              icon={Shield}
              color="text-slate-800"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeaturedBookCard({ title, author, category, image }: { title: string, author: string, category: string, image: string }) {
  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="bg-white border border-slate-100 p-3 rounded-2xl shadow-sm hover:shadow-xl transition-all"
    >
      <img src={image} className="w-full aspect-[3/4] object-cover rounded-xl mb-4" alt={title} />
      <div className="px-1">
        <span className="text-[10px] font-bold text-red-600 uppercase tracking-widest block mb-1">{category}</span>
        <h3 className="font-bold text-slate-900 truncate mb-1">{title}</h3>
        <p className="text-xs text-slate-500">{author}</p>
      </div>
    </motion.div>
  );
}

function PortalCard({ title, description, link, icon: Icon, color }: { title: string, description: string, link: string, icon: any, color: string }) {
  return (
    <Link to={link} className="group p-8 bg-white border border-slate-200 rounded-2xl hover:border-red-600/50 transition-all shadow-sm hover:shadow-lg">
      <div className={`p-4 rounded-xl bg-slate-50 ${color} w-fit mb-6 group-hover:scale-110 transition-transform`}>
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-sm text-slate-600 mb-8 leading-relaxed italic">{description}</p>
      <div className="flex items-center gap-2 text-sm font-bold text-red-600">
        Enter Portal <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}
