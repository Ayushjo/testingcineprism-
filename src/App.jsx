import { ParallaxProvider } from "react-scroll-parallax";
import Homepage from "./components/Home";
import Navbar from "./components/Navbar";
import { Routes,Route } from "react-router-dom";
import ReviewPage from "./components/ReviewPage";
import Footer from "./components/Footer";
import PostPage from "./components/PostPage";
const App = () => {
  return (
    <>
      <ParallaxProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/reviews" element={<ReviewPage />} />
          <Route path="/post" element={<PostPage />} />
        </Routes>
        <Footer />
      </ParallaxProvider>
    </>
  );
};

export default App;
