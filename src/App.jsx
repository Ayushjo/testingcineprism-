import { ParallaxProvider } from "react-scroll-parallax";
import Homepage from "./components/Home";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import ReviewPage from "./components/ReviewPage";
import Footer from "./components/Footer";
import PostPage from "./components/PostPage";
import ScienceFictionPage from "./components/ScienceFictionPage";
import ActionPage from "./components/ActionPage";
import ThrillerPage from "./components/ThrillerPage";
import DramaPage from "./components/DramaPage";
import HorrorPage from "./components/HorroPage";
import AnimationPage from "./components/AnimationPage";
import TrendingPage from "./components/TrendingPage";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignUpPage";
import UnpopularOpinionsPage from "./components/UnpopularOpinionsPage";
import RecommendationsPage from "./components/RecommendationsPage";
import Merchandise from "./components/Merchandise";
import MeteorCursor from "./components/MeteorCursor";
import RedirectIfAuth from "./components/RedirectIfAuth";
import { Toaster } from "react-hot-toast";
import RedirectIfUser from "./components/RedirectIfUser";
import InteractiveVideoGrid from "./components/InteractiveVideoGrid";
import AdminLayout from "./components/AdminLayout";
import CreatePostPage from "./components/CreatePost";
import UploadPosterPage from "./components/UploadPosterPage";
import UploadGalleryPage from "./components/UploadGalleryPage";
import AllPostsPage from "./components/AllPostsPage";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import { useLocation } from "react-router-dom";

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
          <Route path="/post" element={<PostPage />} />

          <Route element={<RedirectIfAuth />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Route>

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
            <Route
              path="/unpopular-opinions"
              element={<UnpopularOpinionsPage />}
            />
          </Route>

          <Route
            path="/recommendations-page"
            element={<RecommendationsPage />}
          />
          <Route path="/merchandise" element={<Merchandise />} />

          {/* Protected Admin Routes */}
          <Route element={<AdminProtectedRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<CreatePostPage />} />
              <Route path="create-post" element={<CreatePostPage />} />
              <Route path="upload-poster" element={<UploadPosterPage />} />
              <Route path="upload-gallery" element={<UploadGalleryPage />} />
              <Route path="all-posts" element={<AllPostsPage />} />
            </Route>
          </Route>
        </Routes>
        {!hideFooter && <Footer />}
      </ParallaxProvider>
    </>
  );
};

export default App;
