"use client";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ArticlePageLayout from "../components/ArticlePageLayout"; // Adjust path as needed

export default function NewsArticlePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Retrieve article from sessionStorage
    const storedArticle = sessionStorage.getItem("currentArticle");

    if (storedArticle) {
      try {
        const parsedArticle = JSON.parse(storedArticle);

        // Verify the ID matches
        if (parsedArticle.id === parseInt(id)) {
          setArticle(parsedArticle);
        } else {
          // ID mismatch - redirect to trending page
          navigate("/trending");
          return;
        }
      } catch (error) {
        console.error("Error parsing stored article:", error);
        navigate("/trending");
        return;
      }
    } else {
      // No stored data - redirect to trending page
      navigate("/trending");
      return;
    }

    setLoading(false);
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400"></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 flex items-center justify-center">
        <div className="text-white text-center">
          <h2 className="text-2xl font-bold mb-2">Article Not Found</h2>
          <p className="text-slate-400">Please return to the trending page.</p>
        </div>
      </div>
    );
  }

  return <ArticlePageLayout article={article} />;
}
