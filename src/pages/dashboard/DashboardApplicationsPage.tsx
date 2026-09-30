import { DashboardLayout } from './DashboardPage';
import { mockRecruitmentPosts } from '@/data/mockData';

export default function DashboardApplicationsPage() {
  const posts = mockRecruitmentPosts.filter(p => p.status === 'OPEN').slice(0, 4);
  return (
    <DashboardLayout title="My Applications">
      <div className="space-y-3">
        {posts.map((post, i) => (
          <div key={post.id} className="card p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-display font-semibold text-white">{post.title}</h3>
                <p className="text-xs text-text-muted">{post.team?.name} • Applied {i + 1} day{i > 0 ? 's' : ''} ago</p>
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-md border ${i === 0 ? 'bg-primary/10 text-primary border-primary/30' : i === 1 ? 'bg-yellow/10 text-yellow border-yellow/30' : 'bg-bg-hover text-text-muted border-border'}`}>
                {i === 0 ? 'ACCEPTED' : i === 1 ? 'PENDING' : 'REVIEWING'}
              </span>
            </div>
            <p className="text-sm text-text-secondary mb-2">{post.description}</p>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
