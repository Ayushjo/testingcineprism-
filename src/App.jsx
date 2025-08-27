// App.jsx - Updated for Google OAuth only
import { ParallaxProvider } from "react-scroll-parallax";
import Homepage from "./pages/Home";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import ReviewPage from "./pages/ReviewPage";
import Footer from "./components/Footer";
import PostPage from "./pages/PostPage";
import ScienceFictionPage from "./components/ScienceFictionPage";
import ActionPage from "./components/ActionPage";
import ThrillerPage from "./components/ThrillerPage";
import DramaPage from "./components/DramaPage";
import HorrorPage from "./components/HorroPage";
import AnimationPage from "./components/AnimationPage";
import TrendingPage from "./pages/TrendingPage";
import LoginPage from "./pages/LoginPage";
// REMOVE: import SignupPage from "./pages/SignUpPage";
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

// ADD: Import the AuthCallback component
import AuthCallback from "./components/AuthCallback";
import EditPostPage from "./pages/EditPostPage";

const App = () => {
  const location = useLocation();
  const hideFooter = location.pathname.startsWith("/admin");

  return (
    <>
      <ParallaxProvider>
        <Toaster />
        <MeteorCursor />
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/post/:id" element={<PostPage />} />

          <Route element={<RedirectIfAuth />}>
            <Route path="/login" element={<LoginPage />} />
            {/* REMOVE: <Route path="/signup" element={<SignupPage />} /> */}
          </Route>

          {/* ADD: OAuth callback route */}
          <Route path="/auth/callback" element={<AuthCallback />} />

          <Route element={<RedirectIfUser />}>
            <Route
              path="/genre/Science-Fiction"
              element={<ScienceFictionPage />}
            />
            <Route path="/genre/Action" element={<ActionPage />} />
            <Route path="/genre/Thriller" element={<ThrillerPage />} />
            <Route path="/genre/Drama" element={<DramaPage />} />
            <Route path="/genre/Horror" element={<HorrorPage />} />
            <Route path="/genre/Animation" element={<AnimationPage />} />
            <Route path="/trending" element={<TrendingPage />} />
            <Route path="/reviews" element={<ReviewPage />} />
            <Route path="/cinema-school" element={<CinemaSchoolPage />} />
            <Route
              path="/unpopular-opinions"
              element={<UnpopularOpinionsPage />}
            />
          </Route>

          <Route path="/ai-insights/:id" element={<AIInsightsArticlePage />} />
          <Route path="/news/:id" element={<NewsArticlePage />} />
          <Route path="/recommendations-page" element={<TopPicksPage />} />
          <Route path="/merchandise" element={<Merchandise />} />

          {/* Protected Admin Routes */}
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
            </Route>
          </Route>
        </Routes>
        {!hideFooter && <Footer />}
      </ParallaxProvider>
    </>
  );
};

export default App;
