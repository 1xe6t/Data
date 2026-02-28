import React, { useState, useEffect } from 'react';
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
  ChevronDown,
  Eye,
  UserPlus,
  Clock,
  Star,
  MoreVertical,
  Globe,
  Smartphone,
  Monitor,
  Tablet
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    const auth = localStorage.getItem('isLoggedIn');
    if (auth === 'true') setIsLoggedIn(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      setIsLoggedIn(false);
      localStorage.removeItem('isLoggedIn');
      setActiveTab('Dashboard');
    }
  };

  const closeSidebar = () => setIsSidebarOpen(false);

  const handleNavClick = (label: string) => {
    if (label === 'Logout') {
      handleLogout();
    } else {
      setActiveTab(label);
    }
    closeSidebar();
  };

  if (!isLoggedIn) {
    return <LoginView onLogin={handleLogin} theme={theme} toggleTheme={toggleTheme} />;
  }

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Animated Background */}
      <div className="background"></div>
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>

      {/* Mobile Backdrop */}
      <div 
        className={`backdrop lg:hidden ${isSidebarOpen ? 'show' : ''}`} 
        onClick={closeSidebar}
      ></div>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
          <div className="p-6 flex items-center gap-3 border-b border-[var(--glass-border)] mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shadow-red-900/20 text-white">
              G
            </div>
            <span className="text-xl font-semibold bg-gradient-to-r from-[var(--primary-light)] to-[var(--accent)] bg-clip-text text-transparent">
              GlassDash
            </span>
          </div>

          <nav className="px-4 space-y-8">
            <div>
              <p className="px-4 text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-4">Main Menu</p>
              <ul className="space-y-1">
                <NavItem 
                  icon={<LayoutDashboard size={20} />} 
                  label="Dashboard" 
                  active={activeTab === 'Dashboard'} 
                  onClick={() => handleNavClick('Dashboard')} 
                />
                <NavItem 
                  icon={<BarChart3 size={20} />} 
                  label="Analytics" 
                  badge="New" 
                  active={activeTab === 'Analytics'} 
                  onClick={() => handleNavClick('Analytics')} 
                />
                <NavItem 
                  icon={<Users size={20} />} 
                  label="Users" 
                  active={activeTab === 'Users'} 
                  onClick={() => handleNavClick('Users')} 
                />
                <NavItem 
                  icon={<Settings size={20} />} 
                  label="Settings" 
                  active={activeTab === 'Settings'} 
                  onClick={() => handleNavClick('Settings')} 
                />
              </ul>
            </div>

            <div>
              <p className="px-4 text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-4">Account</p>
              <ul className="space-y-1">
                <NavItem 
                  icon={<LogOut size={20} />} 
                  label="Logout" 
                  onClick={() => handleNavClick('Logout')} 
                />
              </ul>
            </div>
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[var(--glass-border)]">
            <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-[var(--glass-hover)] cursor-pointer transition-colors group text-left">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center font-semibold text-white">
                TM
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">TemplateMo</p>
                <p className="text-xs text-[var(--text-muted)]">Administrator</p>
              </div>
              <ChevronDown size={16} className="text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors" />
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="main-content flex-1">
          {/* Navbar */}
          <nav className="flex items-center justify-between mb-8 gap-4">
            <div className="flex flex-col">
              <h1 className="text-xl md:text-2xl font-semibold truncate">
                {activeTab === 'Dashboard' ? 'Dashboard Overview' : activeTab}
              </h1>
              <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] mt-1">
                <span>Dashboard</span>
                <span>/</span>
                <span className="text-[var(--text-secondary)]">{activeTab}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 md:gap-4">
              <div className="relative hidden xl:block">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
                <input 
                  type="text" 
                  placeholder="Search anything..." 
                  className="bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:border-[var(--primary-light)] transition-all w-64"
                />
              </div>
              
              <button 
                type="button"
                className="w-10 h-10 md:w-11 md:h-11 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl flex items-center justify-center relative hover:bg-[var(--glass-hover)] transition-colors cursor-pointer"
              >
                <Bell size={20} className="text-[var(--text-secondary)]" />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[var(--coral)] rounded-full shadow-[0_0_10px_var(--coral)]"></span>
              </button>

              <button 
                type="button"
                onClick={toggleTheme}
                className="w-10 h-10 md:w-11 md:h-11 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl flex items-center justify-center hover:bg-[var(--glass-hover)] transition-colors cursor-pointer"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <button 
                type="button"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden w-10 h-10 md:w-11 md:h-11 bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] rounded-xl flex items-center justify-center shadow-lg shadow-red-900/20 cursor-pointer text-white"
              >
                <Menu size={20} />
              </button>
            </div>
          </nav>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'Dashboard' && <DashboardView />}
              {activeTab === 'Analytics' && <AnalyticsView />}
              {activeTab === 'Users' && <UsersView />}
              {activeTab === 'Settings' && <SettingsView />}
            </motion.div>
          </AnimatePresence>

          <footer className="mt-12 text-center text-sm text-[var(--text-muted)] pb-8">
            <p>Copyright © 2026 Your Company. Designed by <a href="https://templatemo.com" target="_blank" rel="noreferrer" className="text-[var(--emerald-light)] hover:text-[var(--gold)] transition-colors">TemplateMo</a></p>
          </footer>
        </main>
      </div>
    </div>
  );
}

function DashboardView() {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        <StatCard title="Total Revenue" value="$84,254" change="+12.5%" positive icon={<DollarSign className="text-[var(--primary-light)]" />} />
        <StatCard title="Active Users" value="24,521" change="+8.2%" positive icon={<Users className="text-[var(--accent)]" />} />
        <StatCard title="Total Orders" value="8,461" change="-3.1%" icon={<ShoppingCart className="text-[var(--coral)]" />} />
        <StatCard title="Conversion Rate" value="3.24%" change="+2.4%" positive icon={<Activity className="text-[var(--success)]" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 glass-card">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <div>
              <h2 className="text-lg font-semibold">Revenue Analytics</h2>
              <p className="text-xs text-[var(--text-muted)]">Monthly revenue overview</p>
            </div>
            <div className="flex gap-2">
              <button type="button" className="flex-1 sm:flex-none px-4 py-2 bg-[var(--glass-hover)] border border-[var(--primary-light)] rounded-lg text-xs cursor-pointer">Monthly</button>
              <button type="button" className="flex-1 sm:flex-none px-4 py-2 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg text-xs hover:bg-[var(--glass-hover)] cursor-pointer">Weekly</button>
            </div>
          </div>
          <div className="h-64 flex items-end justify-between gap-1 md:gap-2 pt-4 overflow-x-auto pb-2">
            {[40, 60, 35, 55, 75, 50, 65, 58, 72, 52, 68, 85].map((height, i) => (
              <div key={i} className="flex-1 min-w-[20px] flex flex-col items-center gap-2">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  className={`w-full max-w-[32px] rounded-t-lg relative group cursor-pointer ${i % 2 === 0 ? 'bg-gradient-to-t from-red-600 to-red-400' : 'bg-gradient-to-t from-rose-600 to-rose-400'}`}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/80 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">${height}k</div>
                </motion.div>
                <span className="text-[10px] text-[var(--text-muted)]">{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="glass-card">
          <h2 className="text-lg font-semibold mb-6">Recent Activity</h2>
          <div className="space-y-6">
            <ActivityItem name="John Doe" action="purchased Premium Plan" time="2 mins ago" color="primary" />
            <ActivityItem name="Anna Smith" action="submitted a support ticket" time="15 mins ago" color="accent" />
            <ActivityItem name="Mike Johnson" action="upgraded subscription" time="1 hour ago" color="coral" />
            <ActivityItem name="Emily White" action="completed onboarding" time="2 hours ago" color="primary" />
            <ActivityItem name="Robert Brown" action="requested refund" time="3 hours ago" color="accent" />
          </div>
        </div>
      </div>

      <div className="glass-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <div>
            <h2 className="text-lg font-semibold">Recent Transactions</h2>
            <p className="text-xs text-[var(--text-muted)]">Latest orders and payments</p>
          </div>
          <button type="button" className="w-full sm:w-auto px-4 py-2 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg text-xs hover:bg-[var(--glass-hover)] cursor-pointer">View All</button>
        </div>
        <div className="overflow-x-auto -mx-4 px-4">
          <table className="w-full text-left border-collapse min-w-[600px]">
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
    </>
  );
}

function AnalyticsView() {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        <StatCard title="Page Views" value="1,284,521" change="+24.5%" positive icon={<Eye className="text-[var(--primary-light)]" />} />
        <StatCard title="Unique Visitors" value="452,892" change="+18.3%" positive icon={<Users className="text-[var(--accent)]" />} />
        <StatCard title="Bounce Rate" value="32.8%" change="+5.2%" icon={<TrendingUp className="text-[var(--coral)]" />} />
        <StatCard title="Avg. Session" value="4:32" change="+12.1%" positive icon={<Clock className="text-[var(--success)]" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 glass-card">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <div>
              <h2 className="text-lg font-semibold">Traffic Overview</h2>
              <p className="text-xs text-[var(--text-muted)]">Daily visitors and page views</p>
            </div>
            <div className="flex gap-2">
              <button type="button" className="px-4 py-2 bg-[var(--glass-hover)] border border-[var(--primary-light)] rounded-lg text-xs cursor-pointer">30 Days</button>
              <button type="button" className="px-4 py-2 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg text-xs hover:bg-[var(--glass-hover)] cursor-pointer">90 Days</button>
            </div>
          </div>
          <div className="h-64 flex items-end justify-between gap-1 pt-4 overflow-x-auto">
            {Array.from({ length: 30 }).map((_, i) => (
              <div key={i} className="flex-1 min-w-[8px] flex flex-col items-center gap-2">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${Math.floor(Math.random() * 60) + 30}%` }}
                  className="w-full bg-gradient-to-t from-red-600/50 to-red-400 rounded-t-sm"
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-[10px] text-[var(--text-muted)]">
            <span>Day 1</span>
            <span>Day 15</span>
            <span>Day 30</span>
          </div>
        </div>

        <div className="glass-card">
          <h2 className="text-lg font-semibold mb-6">Devices</h2>
          <div className="space-y-6">
            <DeviceStat icon={<Smartphone size={18} />} label="Mobile" value="55%" color="primary" />
            <DeviceStat icon={<Monitor size={18} />} label="Desktop" value="35%" color="accent" />
            <DeviceStat icon={<Tablet size={18} />} label="Tablet" value="10%" color="coral" />
          </div>
          <div className="mt-8 pt-8 border-t border-[var(--glass-border)]">
            <h3 className="text-sm font-semibold mb-4">Top Countries</h3>
            <div className="space-y-4">
              <CountryStat label="🇺🇸 United States" value="38%" />
              <CountryStat label="🇬🇧 United Kingdom" value="18%" />
              <CountryStat label="🇩🇪 Germany" value="12%" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function UsersView() {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        <StatCard title="Total Users" value="24,521" change="+8.2%" positive icon={<Users className="text-[var(--primary-light)]" />} />
        <StatCard title="Active Now" value="1,234" change="+12.5%" positive icon={<Activity className="text-[var(--accent)]" />} />
        <StatCard title="New Today" value="156" change="-3.1%" icon={<UserPlus className="text-[var(--coral)]" />} />
        <StatCard title="Premium Users" value="4,892" change="+18.7%" positive icon={<Star className="text-[var(--success)]" />} />
      </div>

      <div className="glass-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <div>
            <h2 className="text-lg font-semibold">All Users</h2>
            <p className="text-xs text-[var(--text-muted)]">Manage your user base</p>
          </div>
          <div className="flex gap-2">
            <button type="button" className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg text-xs cursor-pointer flex items-center gap-2">
              <UserPlus size={14} /> Add User
            </button>
            <button type="button" className="px-4 py-2 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg text-xs hover:bg-[var(--glass-hover)] cursor-pointer">Export</button>
          </div>
        </div>
        <div className="overflow-x-auto -mx-4 px-4">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-[var(--glass-border)]">
                <th className="py-4 px-4 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">User</th>
                <th className="py-4 px-4 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Role</th>
                <th className="py-4 px-4 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Status</th>
                <th className="py-4 px-4 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Joined</th>
                <th className="py-4 px-4 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <UserRow name="John Doe" email="john@example.com" role="Administrator" status="Active" joined="Jan 15, 2024" />
              <UserRow name="Anna Smith" email="anna@example.com" role="Editor" status="Active" joined="Feb 22, 2024" />
              <UserRow name="Mike Johnson" email="mike@example.com" role="User" status="Away" joined="Mar 10, 2024" />
              <UserRow name="Emily White" email="emily@example.com" role="Moderator" status="Active" joined="Apr 5, 2024" />
              <UserRow name="Robert Brown" email="robert@example.com" role="User" status="Offline" joined="May 18, 2024" />
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function SettingsView() {
  return (
    <div className="glass-card p-12 flex flex-col items-center justify-center text-center">
      <div className="w-20 h-20 bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-red-900/20">
        <Settings size={40} className="text-white" />
      </div>
      <h2 className="text-2xl font-bold mb-2">Settings Page</h2>
      <p className="text-[var(--text-muted)] max-w-md">
        Configure your profile, security, and application preferences.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 w-full max-w-2xl">
        <div className="p-6 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-2xl text-left">
          <h3 className="font-semibold mb-2">Profile Settings</h3>
          <p className="text-xs text-[var(--text-muted)]">Update your personal information and avatar.</p>
        </div>
        <div className="p-6 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-2xl text-left">
          <h3 className="font-semibold mb-2">Security</h3>
          <p className="text-xs text-[var(--text-muted)]">Manage passwords and two-factor authentication.</p>
        </div>
      </div>
    </div>
  );
}

function NavItem({ icon, label, active = false, badge = null, onClick }: { icon: React.ReactNode, label: string, active?: boolean, badge?: string | null, onClick?: () => void }) {
  return (
    <li>
      <button 
        type="button"
        onClick={onClick}
        className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl transition-all cursor-pointer ${active ? 'bg-[var(--glass-hover)] text-[var(--text-primary)]' : 'text-[var(--text-secondary)] hover:bg-[var(--glass-hover)] hover:text-[var(--text-primary)]'}`}
      >
        <span className={active ? 'text-[var(--primary-light)]' : 'opacity-70'}>{icon}</span>
        <span className="text-sm font-medium">{label}</span>
        {badge && (
          <span className="ml-auto bg-gradient-to-r from-[var(--accent)] to-[var(--neon-red)] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            {badge}
          </span>
        )}
      </button>
    </li>
  );
}

function StatCard({ title, value, change, positive = false, icon }: { title: string, value: string, change: string, positive?: boolean, icon: React.ReactNode }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="glass-card cursor-pointer"
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">{title}</p>
          <h3 className="text-2xl md:text-3xl font-bold mb-3">{value}</h3>
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${positive ? 'bg-emerald-500/15 text-[var(--success)]' : 'bg-rose-500/15 text-rose-400'}`}>
            <span className="inline-block mr-1">{positive ? <TrendingUp size={12} className="inline" /> : <TrendingDown size={12} className="inline" />}</span>
            {change}
          </span>
        </div>
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/5 flex items-center justify-center">
          {icon}
        </div>
      </div>
    </motion.div>
  );
}

function ActivityItem({ name, action, time, color }: { name: string, action: string, time: string, color: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center font-bold text-sm bg-gradient-to-br text-white ${color === 'primary' ? 'from-red-400 to-red-600' : color === 'accent' ? 'from-rose-400 to-rose-600' : 'from-rose-400 to-rose-600'}`}>
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
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center font-bold text-xs text-white">
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

function UserRow({ name, email, role, status, joined }: { name: string, email: string, role: string, status: string, joined: string }) {
  return (
    <tr className="hover:bg-[var(--glass-hover)] transition-colors">
      <td className="py-4 px-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center font-bold text-xs text-white">
            {name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <p className="text-sm font-medium">{name}</p>
            <p className="text-[11px] text-[var(--text-muted)]">{email}</p>
          </div>
        </div>
      </td>
      <td className="py-4 px-4 text-sm">{role}</td>
      <td className="py-4 px-4">
        <span className={`status-badge ${status.toLowerCase()}`}>
          {status}
        </span>
      </td>
      <td className="py-4 px-4 text-sm text-[var(--text-muted)]">{joined}</td>
      <td className="py-4 px-4">
        <button type="button" className="p-2 hover:bg-[var(--glass-hover)] rounded-lg transition-colors cursor-pointer">
          <MoreVertical size={16} />
        </button>
      </td>
    </tr>
  );
}

function DeviceStat({ icon, label, value, color }: { icon: React.ReactNode, label: string, value: string, color: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className={`w-10 h-10 rounded-xl bg-[var(--glass-bg)] flex items-center justify-center ${color === 'primary' ? 'text-[var(--primary-light)]' : color === 'accent' ? 'text-[var(--accent)]' : 'text-[var(--coral)]'}`}>
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium">{label}</span>
          <span className="text-sm font-semibold">{value}</span>
        </div>
        <div className="h-1.5 w-full bg-[var(--glass-bg)] rounded-full overflow-hidden">
          <div className={`h-full rounded-full ${color === 'primary' ? 'bg-[var(--primary)]' : color === 'accent' ? 'bg-[var(--accent)]' : 'bg-[var(--coral)]'}`} style={{ width: value }} />
        </div>
      </div>
    </div>
  );
}

function LoginView({ onLogin, theme, toggleTheme }: { onLogin: (e: React.FormEvent) => void, theme: string, toggleTheme: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="background"></div>
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card w-full max-w-md p-8 md:p-10 relative z-10"
      >
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shadow-red-900/20 text-white">
              G
            </div>
            <span className="text-xl font-semibold bg-gradient-to-r from-[var(--primary-light)] to-[var(--accent)] bg-clip-text text-transparent">
              GlassDash
            </span>
          </div>
          <button 
            type="button"
            onClick={toggleTheme}
            className="w-10 h-10 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl flex items-center justify-center hover:bg-[var(--glass-hover)] transition-colors cursor-pointer"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
          <p className="text-sm text-[var(--text-muted)]">Please enter your details to sign in.</p>
        </div>

        <form onSubmit={onLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">Email Address</label>
            <input 
              type="email" 
              required
              defaultValue="admin@glassdash.com"
              className="w-full bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[var(--primary-light)] transition-all"
              placeholder="name@company.com"
            />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Password</label>
              <a href="#" className="text-xs text-[var(--primary-light)] hover:text-[var(--accent)] transition-colors">Forgot password?</a>
            </div>
            <input 
              type="password" 
              required
              defaultValue="password"
              className="w-full bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-[var(--primary-light)] transition-all"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" id="remember" className="rounded border-[var(--glass-border)] bg-[var(--glass-bg)] text-[var(--primary)]" />
            <label htmlFor="remember" className="text-xs text-[var(--text-secondary)]">Remember for 30 days</label>
          </div>

          <button 
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white rounded-xl font-semibold shadow-lg shadow-red-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-[var(--glass-border)] text-center">
          <p className="text-xs text-[var(--text-muted)]">
            Don't have an account? <a href="#" className="text-[var(--primary-light)] font-semibold hover:text-[var(--accent)] transition-colors">Sign up for free</a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

function CountryStat({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm">{label}</span>
      <span className="text-sm font-semibold">{value}</span>
    </div>
  );
}
