// App.jsx - Updated with Google Analytics
import { lazy, Suspense, useEffect } from "react";
import { ParallaxProvider } from "react-scroll-parallax";
import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { initGA, logPageView } from "./lib/analytics.js";

// Critical components - load immediately (above the fold)
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Homepage from "./pages/Home";
import UpdateArticlePage from "./pages/UpdateArticlePage.jsx";
import About from "./pages/About.jsx";

// Lazy load components for code splitting
const ReviewPage = lazy(() => import("./pages/ReviewPage"));
const PostPage = lazy(() => import("./pages/PostPage"));
const TrendingPage = lazy(() => import("./pages/TrendingPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const UnpopularOpinionsPage = lazy(() =>
  import("./pages/UnpopularOpinionsPage")
);
const Merchandise = lazy(() => import("./pages/Merchandise"));
const RedirectIfAuth = lazy(() => import("./components/RedirectIfAuth"));
const RedirectIfUser = lazy(() => import("./components/RedirectIfUser"));
const AdminLayout = lazy(() => import("./components/AdminLayout"));
const CreatePostPage = lazy(() => import("./components/CreatePost"));
const UploadPosterPage = lazy(() => import("./pages/UploadPosterPage"));
const UploadGalleryPage = lazy(() => import("./pages/UploadGalleryPage"));
const AllPostsPage = lazy(() => import("./pages/AllPostsPage"));
const AdminProtectedRoute = lazy(() =>
  import("./components/AdminProtectedRoute")
);
const ReviewPosterPage = lazy(() => import("./pages/UploadReviewPoster"));
const TopPicksPage = lazy(() => import("./pages/TopPicksPage"));
const AddTopPicksPage = lazy(() => import("./pages/AddTopPicksPage"));
const CinemaSchoolPage = lazy(() => import("./pages/CinemaSchoolPage"));
const ArticlePageLayout = lazy(() => import("./components/ArticlePageLayout"));
const AIInsightsArticlePage = lazy(() =>
  import("./pages/AIInsightsArticlePage")
);
const NewsArticlePage = lazy(() => import("./pages/NewsArticlePage"));
const AuthCallback = lazy(() => import("./components/AuthCallback"));
const EditPostPage = lazy(() => import("./pages/EditPostPage"));
const Rule180Page = lazy(() => import("./pages/OneEightyDegreeRulePage"));
const TrendingRankManager = lazy(() => import("./pages/TrendingRankManager"));
const RuleOfThirdsPage = lazy(() => import("./pages/RuleOfThirdsPage"));
const CreateArticlePage = lazy(() => import("./pages/CreateArticlePage"));
const ArticlePage = lazy(() => import("./pages/ArticlePage"));
const ArticlePreviewPage = lazy(() => import("./pages/ArticlePreviewPage"));
const BoxOfficePage = lazy(() => import("./pages/BoxOfficePage"));
const ArticleSection = lazy(() => import("./pages/ArticleSection"));
const CreateQuotePage = lazy(() => import("./pages/CreateQuotePage"));
const EditQuotePage = lazy(() => import("./pages/EditQuotePage"));
const AddByGenrePage = lazy(() => import("./components/CreateByGenres"));
const GenreMoviesPage = lazy(() => import("./pages/AllGenresPage"));
const ExploreGenresPage = lazy(() => import("./pages/ExploreGenresPage"));
const IndiePage = lazy(() => import("./pages/IndiePage"));
const IndianIndiePage = lazy(() => import("./pages/IndianIndiePage"));
const WorldIndiePage = lazy(() => import("./pages/WorldIndiePage"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy.jsx"));
const AboutUs = lazy(() => import("./pages/About.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));
const Terms = lazy(() => import("./pages/Terms.jsx"));

// Individual Genre Pages
const SciFiPage = lazy(() => import("./pages/SciFiPage"));
const ActionPage = lazy(() => import("./pages/ActionPage"));
const ThrillerPage = lazy(() => import("./pages/ThrillerPage"));
const DramaPage = lazy(() => import("./pages/DramaPage"));
const HorrorPage = lazy(() => import("./pages/HorrorPage"));
const AnimationPage = lazy(() => import("./pages/AnimationPage"));
const ComedyPage = lazy(() => import("./pages/ComedyPage"));
const WarPage = lazy(() => import("./pages/WarPage"));

// Loading component for Suspense fallback
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-slate-950">
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-slate-400">Loading...</p>
    </div>
  </div>
);

const App = () => {
  const location = useLocation();
  const hideFooter = location.pathname.startsWith("/admin");

  // Initialize Google Analytics once on mount
  useEffect(() => {
    initGA();
  }, []);

  // Track page views on route change
  useEffect(() => {
    logPageView(location.pathname + location.search);
  }, [location]);

  return (
    <>
      <ParallaxProvider>
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            // Default options
            className: "",
            duration: 4000,
            style: {
              background: "rgba(15, 23, 42, 0.95)",
              color: "#f1f5f9",
              border: "1px solid rgba(251, 191, 36, 0.2)",
              borderRadius: "16px",
              padding: "16px 20px",
              fontSize: "14px",
              fontWeight: "500",
              backdropFilter: "blur(12px)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
            },
          }}
        />
        <ScrollToTop smooth={true} delay={100} />
        <Navbar />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Homepage />} />

            <Route element={<RedirectIfAuth />}>
              <Route path="/login" element={<LoginPage />} />
            </Route>

            <Route path="/post/:id" element={<PostPage />} />
            <Route path="/reviews" element={<ReviewPage />} />
            <Route path="/articles" element={<ArticleSection />} />
            <Route path="/articles/:slug" element={<ArticlePage />} />

            {/* Auth callback - must be outside protected routes */}
            <Route path="/auth/callback" element={<AuthCallback />} />
            {/* <Route path="/update-article/:slug" element={<UpdateArticlePage />} /> */}

            <Route element={<RedirectIfUser />}>
              <Route path="/news/:id" element={<NewsArticlePage />} />
              <Route path="/trending" element={<TrendingPage />} />
              <Route path="/explore-genres" element={<ExploreGenresPage />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />

              {/* Individual Genre Pages */}
              <Route path="/sci-fi" element={<SciFiPage />} />
              <Route path="/action" element={<ActionPage />} />
              <Route path="/thriller" element={<ThrillerPage />} />
              <Route path="/drama" element={<DramaPage />} />
              <Route path="/horror" element={<HorrorPage />} />
              <Route path="/animation" element={<AnimationPage />} />
              <Route path="/comedy" element={<ComedyPage />} />
              <Route path="/war" element={<WarPage />} />

              {/* Article Page */}

              {/* Indie Pages */}
              {/* <Route path="/indie" element={<IndiePage />} />
              <Route path="/indie/indian" element={<IndianIndiePage />} />
              <Route path="/indie/world" element={<WorldIndiePage />} /> */}

              <Route path="/genre/:genre" element={<GenreMoviesPage />} />
              <Route path="/recommendations-page" element={<TopPicksPage />} />
              <Route path="/merchandise" element={<Merchandise />} />
            </Route>

            <Route element={<AdminProtectedRoute />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<CreatePostPage />} />
                <Route path="create-post" element={<CreatePostPage />} />
                <Route path="upload-poster" element={<UploadPosterPage />} />
                <Route path="upload-gallery" element={<UploadGalleryPage />} />
                <Route path="all-posts" element={<AllPostsPage />} />
                <Route
                  path="upload-review-poster"
                  element={<ReviewPosterPage />}
                />
                <Route path="add-top-picks" element={<AddTopPicksPage />} />
                <Route path="edit-post" element={<EditPostPage />} />
                <Route path="edit-rank" element={<TrendingRankManager />} />
                <Route path="create-article" element={<CreateArticlePage />} />
                <Route path="update-article/:slug" element={<UpdateArticlePage />} />
                <Route
                  path="article-preview"
                  element={<ArticlePreviewPage />}
                />

                <Route path="create-quote" element={<CreateQuotePage />} />
                <Route path="edit-quote" element={<EditQuotePage />} />
                <Route path="add-byGenres" element={<AddByGenrePage />} />
              </Route>
            </Route>
          </Routes>
        </Suspense>
        {!hideFooter && <Footer />}
      </ParallaxProvider>
    </>
  );
};

export default App;
