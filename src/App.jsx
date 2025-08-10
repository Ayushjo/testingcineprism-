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

const App = () => {
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
          {
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
          }

          <Route
            path="/recommendations-page"
            element={<RecommendationsPage />}
          />

          <Route path="/merchandise" element={<Merchandise />} />
        </Routes>
        <Footer />
      </ParallaxProvider>
    </>
  );
};

export default App;
