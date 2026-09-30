import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

const HomePage = lazy(() => import('@/pages/home/HomePage'));
const TeamsPage = lazy(() => import('@/pages/teams/TeamsPage'));
const TeamDetailPage = lazy(() => import('@/pages/teams/TeamDetailPage'));
const PlayersPage = lazy(() => import('@/pages/players/PlayersPage'));
const PlayerDetailPage = lazy(() => import('@/pages/players/PlayerDetailPage'));
const TournamentsPage = lazy(() => import('@/pages/tournaments/TournamentsPage'));
const TournamentDetailPage = lazy(() => import('@/pages/tournaments/TournamentDetailPage'));
const RankingsPage = lazy(() => import('@/pages/rankings/RankingsPage'));
const NewsPage = lazy(() => import('@/pages/news/NewsPage'));
const NewsDetailPage = lazy(() => import('@/pages/news/NewsDetailPage'));
const MarketplacePage = lazy(() => import('@/pages/marketplace/MarketplacePage'));
const ProductDetailPage = lazy(() => import('@/pages/marketplace/ProductDetailPage'));
const LoginPage = lazy(() => import('@/pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('@/pages/auth/RegisterPage'));
const ForgotPasswordPage = lazy(() => import('@/pages/auth/ForgotPasswordPage'));
const DashboardPage = lazy(() => import('@/pages/dashboard/DashboardPage'));
const DashboardProfilePage = lazy(() => import('@/pages/dashboard/DashboardProfilePage'));
const DashboardTeamPage = lazy(() => import('@/pages/dashboard/DashboardTeamPage'));
const DashboardTournamentsPage = lazy(() => import('@/pages/dashboard/DashboardTournamentsPage'));
const DashboardRecruitmentPage = lazy(() => import('@/pages/dashboard/DashboardRecruitmentPage'));
const DashboardApplicationsPage = lazy(() => import('@/pages/dashboard/DashboardApplicationsPage'));
const DashboardNotificationsPage = lazy(() => import('@/pages/dashboard/DashboardNotificationsPage'));
const AdminPage = lazy(() => import('@/pages/admin/AdminPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));
const SearchPage = lazy(() => import('@/pages/SearchPage'));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner fullScreen />}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/teams" element={<TeamsPage />} />
            <Route path="/teams/:id" element={<TeamDetailPage />} />
            <Route path="/players" element={<PlayersPage />} />
            <Route path="/players/:id" element={<PlayerDetailPage />} />
            <Route path="/tournaments" element={<TournamentsPage />} />
            <Route path="/tournaments/:id" element={<TournamentDetailPage />} />
            <Route path="/rankings" element={<RankingsPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/news/:slug" element={<NewsDetailPage />} />
            <Route path="/marketplace" element={<MarketplacePage />} />
            <Route path="/marketplace/:slug" element={<ProductDetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/dashboard/profile" element={<DashboardProfilePage />} />
            <Route path="/dashboard/team" element={<DashboardTeamPage />} />
            <Route path="/dashboard/tournaments" element={<DashboardTournamentsPage />} />
            <Route path="/dashboard/recruitment" element={<DashboardRecruitmentPage />} />
            <Route path="/dashboard/applications" element={<DashboardApplicationsPage />} />
            <Route path="/dashboard/notifications" element={<DashboardNotificationsPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
