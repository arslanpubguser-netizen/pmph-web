import { DashboardLayout } from './DashboardPage';
import { mockRecruitmentPosts } from '@/data/mockData';
import { Link } from 'react-router-dom';

export default function DashboardRecruitmentPage() {
  const posts = mockRecruitmentPosts.slice(0, 5);
  return (
    <DashboardLayout title="Recruitment">
      <div className="space-y-3">
        {posts.map(post => (
          <div key={post.id} className="card p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-display font-semibold text-white">{post.title}</h3>
                <p className="text-xs text-text-muted mt-1">{post.team?.name}</p>
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-md border ${post.status === 'OPEN' ? 'bg-primary/10 text-primary border-primary/30' : post.status === 'FILLED' ? 'bg-bg-hover text-text-muted border-border' : 'bg-red/10 text-red border-red/30'}`}>
                {post.status}
              </span>
            </div>
            <p className="text-sm text-text-secondary mb-3">{post.description}</p>
            <div className="flex items-center gap-3 text-xs text-text-muted">
              <span>Role: <span className="text-primary">{post.role}</span></span>
              <span>Rank: <span className="text-yellow">{post.rankRequired}+</span></span>
              <span>Region: <span className="text-white">{post.region}</span></span>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
