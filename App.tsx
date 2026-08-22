import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import { useTranslation } from 'react-i18next';
import { Loader2 } from 'lucide-react';

const HomePage = lazy(() => import('./pages/HomePage'));
const LibraryPage = lazy(() => import('./pages/LibraryPage'));
const ScholarshipsPage = lazy(() => import('./pages/ScholarshipsPage'));
const VolunteerPage = lazy(() => import('./pages/VolunteerPage'));
const KankorPage = lazy(() => import('./pages/KankorPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));

const PageLoader = () => (
  <div className="flex h-[calc(100vh-80px)] items-center justify-center">
    <Loader2 className="w-10 h-10 animate-spin text-sky-600" />
  </div>
);

export default function App() {
  const { i18n } = useTranslation();
  React.useEffect(() => {
    document.documentElement.dir = ['fa', 'ps'].includes(i18n.language) ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={
            <Suspense fallback={<PageLoader />}>
              <HomePage />
            </Suspense>
          } />
          <Route path="library" element={
            <Suspense fallback={<PageLoader />}>
              <LibraryPage />
            </Suspense>
          } />
          <Route path="scholarships" element={
            <Suspense fallback={<PageLoader />}>
              <ScholarshipsPage />
            </Suspense>
          } />
          <Route path="volunteer" element={
            <Suspense fallback={<PageLoader />}>
              <VolunteerPage />
            </Suspense>
          } />
          <Route path="kankor" element={
            <Suspense fallback={<PageLoader />}>
              <KankorPage />
            </Suspense>
          } />
          <Route path="register" element={
            <Suspense fallback={<PageLoader />}>
              <RegisterPage />
            </Suspense>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
