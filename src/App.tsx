import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  BarChart3, 
  Users, 
  Settings, 
  LogOut, 
  Search, 
  Bell, 
  Sun, 
  Moon, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingCart, 
  Activity,
  Menu,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  return (
    <div className="min-h-screen">
      {/* Animated Background */}
      <div className="background"></div>
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
          <div className="p-6 flex items-center gap-3 border-b border-[var(--glass-border)] mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-[var(--emerald)] to-[var(--gold)] rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shadow-emerald-900/20">
              G
            </div>
            <span className="text-xl font-semibold bg-gradient-to-r from-[var(--emerald-light)] to-[var(--gold)] bg-clip-text text-transparent">
              GlassDash
            </span>
          </div>

          <nav className="px-4 space-y-8">
            <div>
              <p className="px-4 text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-4">Main Menu</p>
              <ul className="space-y-1">
                <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active />
                <NavItem icon={<BarChart3 size={20} />} label="Analytics" badge="New" />
                <NavItem icon={<Users size={20} />} label="Users" />
                <NavItem icon={<Settings size={20} />} label="Settings" />
              </ul>
            </div>

            <div>
              <p className="px-4 text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-4">Account</p>
              <ul className="space-y-1">
                <NavItem icon={<LogOut size={20} />} label="Logout" />
              </ul>
            </div>
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[var(--glass-border)]">
            <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-[var(--glass-hover)] cursor-pointer transition-colors">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--emerald)] to-[var(--gold)] flex items-center justify-center font-semibold">
                TM
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">TemplateMo</p>
                <p className="text-xs text-[var(--text-muted)]">Administrator</p>
              </div>
              <ChevronDown size={16} className="text-[var(--text-muted)]" />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="main-content flex-1">
          {/* Navbar */}
          <nav className="flex items-center justify-between mb-8 gap-4">
            <h1 className="text-2xl font-semibold">Dashboard Overview</h1>
            
            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
                <input 
                  type="text" 
                  placeholder="Search anything..." 
                  className="bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:border-[var(--emerald-light)] transition-all w-64"
                />
              </div>
              
              <button className="w-11 h-11 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl flex items-center justify-center relative hover:bg-[var(--glass-hover)] transition-colors">
                <Bell size={20} className="text-[var(--text-secondary)]" />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[var(--coral)] rounded-full shadow-[0_0_10px_var(--coral)]"></span>
              </button>

              <button 
                onClick={toggleTheme}
                className="w-11 h-11 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl flex items-center justify-center hover:bg-[var(--glass-hover)] transition-colors"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden w-11 h-11 bg-gradient-to-br from-[var(--emerald)] to-[var(--gold)] rounded-xl flex items-center justify-center shadow-lg shadow-emerald-900/20"
              >
                <Menu size={20} />
              </button>
            </div>
          </nav>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard 
              title="Total Revenue" 
              value="$84,254" 
              change="+12.5%" 
              positive 
              icon={<DollarSign className="text-[var(--emerald-light)]" />} 
            />
            <StatCard 
              title="Active Users" 
              value="24,521" 
              change="+8.2%" 
              positive 
              icon={<Users className="text-[var(--gold)]" />} 
            />
            <StatCard 
              title="Total Orders" 
              value="8,461" 
              change="-3.1%" 
              icon={<ShoppingCart className="text-[var(--coral)]" />} 
            />
            <StatCard 
              title="Conversion Rate" 
              value="3.24%" 
              change="+2.4%" 
              positive 
              icon={<Activity className="text-[var(--success)]" />} 
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Chart Section */}
            <div className="lg:col-span-2 glass-card">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold">Revenue Analytics</h2>
                  <p className="text-xs text-[var(--text-muted)]">Monthly revenue overview</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-[var(--glass-hover)] border border-[var(--emerald-light)] rounded-lg text-xs">Monthly</button>
                  <button className="px-4 py-2 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg text-xs hover:bg-[var(--glass-hover)]">Weekly</button>
                </div>
              </div>
              
              <div className="h-64 flex items-end justify-between gap-2 pt-4">
                {[40, 60, 35, 55, 75, 50, 65, 58, 72, 52, 68, 85].map((height, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      className={`w-full max-w-[32px] rounded-t-lg relative group ${
                        i % 2 === 0 ? 'bg-gradient-to-t from-emerald-600 to-emerald-400' : 'bg-gradient-to-t from-amber-600 to-amber-400'
                      }`}
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/80 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        ${height}k
                      </div>
                    </motion.div>
                    <span className="text-[10px] text-[var(--text-muted)]">
                      {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity Feed */}
            <div className="glass-card">
              <h2 className="text-lg font-semibold mb-6">Recent Activity</h2>
              <div className="space-y-6">
                <ActivityItem name="John Doe" action="purchased Premium Plan" time="2 mins ago" color="emerald" />
                <ActivityItem name="Anna Smith" action="submitted a support ticket" time="15 mins ago" color="amber" />
                <ActivityItem name="Mike Johnson" action="upgraded subscription" time="1 hour ago" color="coral" />
                <ActivityItem name="Emily White" action="completed onboarding" time="2 hours ago" color="emerald" />
                <ActivityItem name="Robert Brown" action="requested refund" time="3 hours ago" color="amber" />
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className="glass-card">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold">Recent Transactions</h2>
                <p className="text-xs text-[var(--text-muted)]">Latest orders and payments</p>
              </div>
              <button className="px-4 py-2 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg text-xs hover:bg-[var(--glass-hover)]">View All</button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[var(--glass-border)]">
                    <th className="py-4 px-4 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Customer</th>
                    <th className="py-4 px-4 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Product</th>
                    <th className="py-4 px-4 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Status</th>
                    <th className="py-4 px-4 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <TableRow name="John Doe" email="john@example.com" product="Premium Plan" status="Completed" amount="$299.00" />
                  <TableRow name="Anna Smith" email="anna@example.com" product="Enterprise License" status="Processing" amount="$1,499.00" />
                  <TableRow name="Mike Johnson" email="mike@example.com" product="Team Bundle" status="Completed" amount="$599.00" />
                  <TableRow name="Emily White" email="emily@example.com" product="Starter Plan" status="Pending" amount="$49.00" />
                </tbody>
              </table>
            </div>
          </div>

          <footer className="mt-12 text-center text-sm text-[var(--text-muted)] pb-8">
            <p>Copyright © 2026 Your Company. Designed by <a href="https://templatemo.com" target="_blank" rel="noreferrer" className="text-[var(--emerald-light)] hover:text-[var(--gold)] transition-colors">TemplateMo</a></p>
          </footer>
        </main>
      </div>
    </div>
  );
}

function NavItem({ icon, label, active = false, badge = null }: { icon: React.ReactNode, label: string, active?: boolean, badge?: string | null }) {
  return (
    <li>
      <a href="#" className={`flex items-center gap-3.5 px-4 py-3.5 rounded-xl transition-all ${active ? 'bg-[var(--glass-hover)] text-[var(--text-primary)]' : 'text-[var(--text-secondary)] hover:bg-[var(--glass-hover)] hover:text-[var(--text-primary)]'}`}>
        <span className={active ? 'text-[var(--emerald-light)]' : 'opacity-70'}>{icon}</span>
        <span className="text-sm font-medium">{label}</span>
        {badge && (
          <span className="ml-auto bg-gradient-to-r from-[var(--gold)] to-[var(--amber)] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            {badge}
          </span>
        )}
      </a>
    </li>
  );
}

function StatCard({ title, value, change, positive = false, icon }: { title: string, value: string, change: string, positive?: boolean, icon: React.ReactNode }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="glass-card"
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">{title}</p>
          <h3 className="text-3xl font-bold mb-3">{value}</h3>
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${positive ? 'bg-emerald-500/15 text-[var(--success)]' : 'bg-rose-500/15 text-rose-400'}`}>
            <span className="inline-block mr-1">{positive ? <TrendingUp size={12} className="inline" /> : <TrendingDown size={12} className="inline" />}</span>
            {change}
          </span>
        </div>
        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
          {icon}
        </div>
      </div>
    </motion.div>
  );
}

function ActivityItem({ name, action, time, color }: { name: string, action: string, time: string, color: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center font-bold text-sm bg-gradient-to-br ${color === 'emerald' ? 'from-emerald-400 to-emerald-600' : 'from-amber-400 to-amber-600'}`}>
        {name.split(' ').map(n => n[0]).join('')}
      </div>
      <div className="flex-1 min-width-0">
        <p className="text-sm text-[var(--text-secondary)]">
          <span className="font-semibold text-[var(--text-primary)]">{name}</span> {action}
        </p>
        <span className="text-xs text-[var(--text-muted)]">{time}</span>
      </div>
    </div>
  );
}

function TableRow({ name, email, product, status, amount }: { name: string, email: string, product: string, status: string, amount: string }) {
  return (
    <tr className="hover:bg-[var(--glass-hover)] transition-colors">
      <td className="py-4 px-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center font-bold text-xs">
            {name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <p className="text-sm font-medium">{name}</p>
            <p className="text-[11px] text-[var(--text-muted)]">{email}</p>
          </div>
        </div>
      </td>
      <td className="py-4 px-4 text-sm">{product}</td>
      <td className="py-4 px-4">
        <span className={`status-badge ${status.toLowerCase()}`}>
          {status}
        </span>
      </td>
      <td className="py-4 px-4 font-mono font-semibold text-sm">{amount}</td>
    </tr>
  );
}
