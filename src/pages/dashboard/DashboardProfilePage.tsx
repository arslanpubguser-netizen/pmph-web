import { DashboardLayout } from './DashboardPage';

export default function DashboardProfilePage() {
  return (
    <DashboardLayout title="My Profile">
      <div className="card p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-primary to-blue-electric flex items-center justify-center text-2xl font-bold text-bg-base">P</div>
          <div>
            <h2 className="font-display font-bold text-xl text-white">ProGamerPK</h2>
            <p className="text-sm text-text-muted">player@pmph.pk</p>
          </div>
        </div>

        <form className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-text-muted uppercase tracking-wider mb-1.5 block">Username</label>
              <input type="text" defaultValue="ProGamerPK" className="w-full bg-bg-base border border-border rounded-lg px-4 h-11 text-sm text-white outline-none focus:border-primary/40 transition-colors" />
            </div>
            <div>
              <label className="text-xs text-text-muted uppercase tracking-wider mb-1.5 block">PUBG ID</label>
              <input type="text" defaultValue="5123456789" className="w-full bg-bg-base border border-border rounded-lg px-4 h-11 text-sm text-white outline-none focus:border-primary/40 transition-colors" />
            </div>
            <div>
              <label className="text-xs text-text-muted uppercase tracking-wider mb-1.5 block">Region</label>
              <select className="w-full bg-bg-base border border-border rounded-lg px-4 h-11 text-sm text-white outline-none">
                <option>Lahore</option><option>Karachi</option><option>Islamabad</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-text-muted uppercase tracking-wider mb-1.5 block">Primary Role</label>
              <select className="w-full bg-bg-base border border-border rounded-lg px-4 h-11 text-sm text-white outline-none">
                <option>IGL</option><option>Entry Fragger</option><option>Support</option><option>Sniper</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs text-text-muted uppercase tracking-wider mb-1.5 block">Bio</label>
            <textarea rows={4} defaultValue="Competitive PUBG Mobile player from Lahore. Specializing in IGL role." className="w-full bg-bg-base border border-border rounded-lg px-4 py-3 text-sm text-white outline-none focus:border-primary/40 transition-colors resize-none" />
          </div>
          <button type="button" className="px-6 py-2.5 rounded-lg bg-primary text-bg-base font-display font-semibold hover:bg-primary-electric btn-glow transition-all">
            Save Changes
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}
