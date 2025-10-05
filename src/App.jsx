// App.jsx - Updated with ScrollToTop
import { ParallaxProvider } from "react-scroll-parallax";
import Homepage from "./pages/Home";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import ReviewPage from "./pages/ReviewPage";
import Footer from "./components/Footer";
import PostPage from "./pages/PostPage";

import TrendingPage from "./pages/TrendingPage";
import LoginPage from "./pages/LoginPage";
import UnpopularOpinionsPage from "./pages/UnpopularOpinionsPage";
import Merchandise from "./pages/Merchandise";
import MeteorCursor from "./components/MeteorCursor";
import RedirectIfAuth from "./components/RedirectIfAuth";
import { Toaster } from "react-hot-toast";
import RedirectIfUser from "./components/RedirectIfUser";
import AdminLayout from "./components/AdminLayout";
import CreatePostPage from "./components/CreatePost";
import UploadPosterPage from "./pages/UploadPosterPage";
import UploadGalleryPage from "./pages/UploadGalleryPage";
import AllPostsPage from "./pages/AllPostsPage";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import { useLocation } from "react-router-dom";
import ReviewPosterPage from "./pages/UploadReviewPoster";
import TopPicksPage from "./pages/TopPicksPage";
import AddTopPicksPage from "./pages/AddTopPicksPage";
import CinemaSchoolPage from "./pages/CinemaSchoolPage";
import ArticlePageLayout from "./components/ArticlePageLayout";
import AIInsightsArticlePage from "./pages/AIInsightsArticlePage";
import NewsArticlePage from "./pages/NewsArticlePage";
import AuthCallback from "./components/AuthCallback";
import EditPostPage from "./pages/EditPostPage";
import Rule180Page from "./pages/OneEightyDegreeRulePage";
import TrendingRankManager from "./pages/TrendingRankManager";
import RuleOfThirdsPage from "./pages/RuleOfThirdsPage";

// ADD: Import ScrollToTop component
import ScrollToTop from "./components/ScrollToTop";
import CreateArticlePage from "./pages/CreateArticlePage";
import ArticlePage from "./pages/ArticlePage";
import BoxOfficePage from "./pages/BoxOfficePage";
import ArticleSection from "./pages/ArticleSection";
import CreateQuotePage from "./pages/CreateQuotePage";
import EditQuotePage from "./pages/EditQuotePage";
import AddByGenrePage from "./components/CreateByGenres";
import GenreMoviesPage from "./pages/AllGenresPage";
import ExploreGenresPage from "./pages/ExploreGenresPage";

const App = () => {
  const location = useLocation();
  const hideFooter = location.pathname.startsWith("/admin");

  return (
    <>
      <ParallaxProvider>
        <Toaster />
        <MeteorCursor />
        {/* ADD: ScrollToTop component */}
        <ScrollToTop smooth={true} delay={100} />
        <Navbar />
        <Routes>
          {/* <Route path="/rule-of-thirds" element={<RuleOfThirdsPage />} />
          <Route path="/cinema-school" element={<CinemaSchoolPage />} />
          <Route path="/180-degree-rule" element={<Rule180Page />} /> */}
          <Route path="/" element={<Homepage />} />
          {/* <Route path="/articles/:slug" element={<ArticlePage />} /> */}

          <Route element={<RedirectIfAuth />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>
          {/* <Route path="/articles" element={<ArticleSection />} /> */}
          <Route path="/news/:id" element={<NewsArticlePage />} />
          <Route path="/trending" element={<TrendingPage />} />
          <Route path="/explore-genres" element={<ExploreGenresPage />} />
          <Route path="/reviews" element={<ReviewPage />} />
          {/* <Route path="/box-office" element={<BoxOfficePage />} /> */}

          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/genre/:genre" element={<GenreMoviesPage />} />

          {/* <Route
              path="/genre/Science-Fiction"
              element={<ScienceFictionPage />}
            />
            <Route path="/genre/Action" element={<ActionPage />} />
            <Route path="/genre/Thriller" element={<ThrillerPage />} />
            <Route path="/genre/Drama" element={<DramaPage />} />
            <Route path="/genre/Horror" element={<HorrorPage />} />
            <Route path="/genre/Animation" element={<AnimationPage />} /> */}

          <Route path="/recommendations-page" element={<TopPicksPage />} />
          {/* <Route
              path="/ai-insights/:id"
              element={<AIInsightsArticlePage />}
            /> */}

          <Route path="/merchandise" element={<Merchandise />} />

          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route element={<RedirectIfUser />}></Route>

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
              <Route path="create-quote" element={<CreateQuotePage />} />
              <Route path="edit-quote" element={<EditQuotePage />} />
              <Route path="add-byGenres" element={<AddByGenrePage />} />
            </Route>
          </Route>
        </Routes>
        {!hideFooter && <Footer />}
      </ParallaxProvider>
    </>
  );
};

export default App;
