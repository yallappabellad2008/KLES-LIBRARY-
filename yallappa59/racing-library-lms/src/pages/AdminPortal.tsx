import { motion } from 'motion/react';
import { ShieldCheck, Activity, Users, Database, Zap, AlertTriangle, TrendingUp, ChevronRight } from 'lucide-react';
import AuthGate from '../components/auth/AuthGate';

export default function AdminPortal() {
  return (
    <AuthGate requiredRole="ADMIN">
      <div className="min-h-screen bg-slate-50 pt-12 pb-24">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12 italic">
            <div className="flex items-center gap-2 mb-4 text-emerald-600">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-widest">System Administration</span>
            </div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight leading-none mb-2">
              Core <span className="text-emerald-600">Mainframe</span> Control
            </h1>
            <p className="text-slate-500 font-medium">
              Institutional oversight, security protocols, and system integrity monitoring.
            </p>
          </div>

          {/* Grid Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <CoreStat icon={Users} label="Active Users" value="1,284" trend="+12" status="optimal" />
            <CoreStat icon={Database} label="Storage" value="842.5 GB" trend="Syncing" status="syncing" />
            <CoreStat icon={Zap} label="System Load" value="44%" trend="-2%" status="optimal" />
            <CoreStat icon={ShieldCheck} label="Security Status" value="Healthy" trend="Stable" status="locked" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 italic">
            {/* System Logs */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                <div className="bg-slate-50 p-6 border-b border-slate-100 flex justify-between items-center">
                  <h3 className="font-bold uppercase text-xs tracking-widest flex items-center gap-2 text-slate-900">
                    <Activity className="w-4 h-4 text-emerald-600" />
                    Live System Telemetry
                  </h3>
                  <span className="text-[10px] font-bold text-slate-400">system_audit.log</span>
                </div>
                <div className="p-6 space-y-4">
                  {[
                    { time: '14:22:04', event: 'Asset ID_4492 Authorized for Checkout', level: 'info' },
                    { time: '14:21:58', event: 'Biometric Handshake Protocol Successful', level: 'success' },
                    { time: '14:20:12', event: 'Encryption Key Rotation Cycle Complete', level: 'info' },
                    { time: '14:18:45', event: 'Access Attempt - Vector: South_Gate', level: 'warning' },
                    { time: '14:15:30', event: 'Neural Archive Indexing Reached 98%', level: 'success' },
                  ].map((log, i) => (
                    <div key={i} className="flex gap-4 text-xs items-start border-b border-slate-50 pb-3 last:border-0">
                      <span className="text-slate-300 font-medium whitespace-nowrap">{log.time}</span>
                      <span className={`font-semibold ${
                        log.level === 'warning' ? 'text-red-600' : 
                        log.level === 'success' ? 'text-emerald-600' : 'text-blue-600'
                      }`}>
                        [{log.level.toUpperCase()}] {log.event}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-slate-200 p-8 rounded-3xl group shadow-sm hover:shadow-md transition-all cursor-pointer">
                  <div className="flex justify-between items-center mb-4">
                    <TrendingUp className="w-5 h-5 text-emerald-600" />
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 transition-all" />
                  </div>
                  <h4 className="font-bold uppercase text-lg mb-1">Growth Vectors</h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Analyze institutional adaptation</p>
                </div>
                <div className="bg-white border border-slate-200 p-8 rounded-3xl group shadow-sm hover:shadow-md transition-all cursor-pointer">
                  <div className="flex justify-between items-center mb-4">
                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-red-600 transition-all" />
                  </div>
                  <h4 className="font-bold uppercase text-lg mb-1">Security Audit</h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Review historical threat vectors</p>
                </div>
              </div>
            </div>

            {/* Side Modules */}
            <div className="space-y-6">
              <div className="bg-slate-900 text-white p-8 rounded-3xl relative overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                  <Database className="w-24 h-24" />
                </div>
                <h3 className="text-2xl font-bold mb-6 italic">Database <span className="text-emerald-500">Clusters</span></h3>
                <div className="space-y-6">
                  {['Academic', 'Archival', 'Faculty', 'Financial'].map((sector) => (
                    <div key={sector}>
                      <div className="flex justify-between text-[10px] font-bold uppercase mb-2">
                        <span className="text-slate-400">{sector}</span>
                        <span className="text-emerald-500">88%</span>
                      </div>
                      <div className="h-1 bg-slate-800 rounded-full w-full overflow-hidden">
                        <div className="h-full bg-emerald-600 shadow-[0_0_8px_rgba(16,185,129,0.5)] w-[88%]"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-emerald-600 p-8 rounded-3xl group cursor-pointer hover:brightness-110 transition-all shadow-xl shadow-emerald-200">
                <h3 className="text-2xl font-bold mb-2 text-white italic">Initiate Core Sync</h3>
                <p className="text-white/80 text-xs font-medium leading-relaxed italic">Synchronize all institutional endpoints with the master archive. Requires Level 01 authorization.</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </AuthGate>
  );
}

function CoreStat({ icon: Icon, label, value, trend, status }: any) {
  return (
    <div className="bg-white border border-slate-200 p-6 rounded-3xl relative overflow-hidden shadow-sm hover:shadow-md transition-all italic">
      <div className="flex justify-between items-start mb-6">
        <div className="p-3 bg-slate-50 rounded-2xl text-slate-900 border border-slate-100">
          <Icon className="w-5 h-5" />
        </div>
        <div className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full border ${
          status === 'optimal' ? 'text-green-600 border-green-200 bg-green-50' : 
          status === 'syncing' ? 'text-blue-600 border-blue-200 bg-blue-50' :
          'text-red-600 border-red-200 bg-red-50'
        }`}>
          {trend}
        </div>
      </div>
      <div className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-1">{label}</div>
      <div className="text-3xl font-extrabold text-slate-900 tracking-tight">{value}</div>
      
      <div className={`absolute bottom-0 left-0 h-1 w-full opacity-40 ${
        status === 'optimal' ? 'bg-emerald-500' : 
        status === 'syncing' ? 'bg-blue-600 animate-pulse' :
        'bg-red-600'
      }`}></div>
    </div>
  );
}
