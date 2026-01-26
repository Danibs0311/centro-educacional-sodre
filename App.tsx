
import React, { Suspense } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Routes, Route, useLocation } from 'react-router-dom';
import LoadingSpinner from './components/LoadingSpinner';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import WhatsAppButton from './components/WhatsAppButton';
import ChatWidget from './components/Chatbot/ChatWidget';

// Lazy Load Pages for Performance
const Home = React.lazy(() => import('./pages/Home'));
const Education = React.lazy(() => import('./pages/Education'));
const NAE = React.lazy(() => import('./pages/NAE'));
const ProfessionalDetail = React.lazy(() => import('./pages/ProfessionalDetail'));
const Scholarships = React.lazy(() => import('./pages/Scholarships'));
const Blog = React.lazy(() => import('./pages/Blog'));
const BlogPost = React.lazy(() => import('./pages/BlogPost'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Login = React.lazy(() => import('./pages/Login'));
const BlogLogin = React.lazy(() => import('./pages/BlogLogin'));
const BlogAdmin = React.lazy(() => import('./pages/BlogAdmin'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const AdminManagement = React.lazy(() => import('./pages/AdminManagement'));

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <AuthProvider>
        <ScrollToTop />
        <WhatsAppButton />
        <ChatWidget />
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/bolsas" element={<Layout><Scholarships /></Layout>} />
            <Route path="/nucleo-atendimento-especializado" element={<Layout><NAE /></Layout>} />
            <Route path="/equipe/:slug" element={<Layout><ProfessionalDetail /></Layout>} />
            <Route path="/educacao-infantil" element={<Layout><Education type="infantil" imageHash={101} /></Layout>} />
            <Route path="/ensino-fundamental-1" element={<Layout><Education type="fund1" imageHash={102} /></Layout>} />
            <Route path="/ensino-fundamental-2" element={<Layout><Education type="fund2" imageHash={103} /></Layout>} />
            <Route path="/ensino-medio" element={<Layout><Education type="medio" imageHash={104} /></Layout>} />
            <Route path="/blog" element={<Layout><Blog /></Layout>} />
            <Route path="/blog/:slug" element={<Layout><BlogPost /></Layout>} />
            <Route path="/contato" element={<Layout><Contact /></Layout>} />

            <Route path="/login" element={<Login />} />
            <Route path="/blog-login" element={<BlogLogin />} />
            <Route path="/blog-admin" element={<BlogAdmin />} />
            <Route path="/admin-gestao" element={<AdminManagement />} />
            <Route path="/area-responsavel" element={<Dashboard />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </HelmetProvider>
  );
};

export default App;
