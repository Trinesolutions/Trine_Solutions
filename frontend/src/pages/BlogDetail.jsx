import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, User, ArrowLeft, ArrowRight, Tag, Clock, BookOpen, Share2 } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

// Simple HTML sanitization to prevent XSS attacks
const sanitizeHTML = (html) => {
  if (!html) return '';
  // Create a temporary element to parse the HTML
  const tempDiv = document.createElement('div');
  tempDiv.textContent = html;
  // Allow safe tags by parsing and filtering
  const allowedTags = ['p', 'br', 'b', 'i', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'blockquote', 'a', 'span', 'div'];
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  
  // Handle case where body is null (can happen in certain environments)
  if (!doc.body) {
    // Fallback: return HTML-escaped content (tempDiv.innerHTML contains escaped version
    // since we set tempDiv.textContent above, which safely escapes any HTML)
    return tempDiv.innerHTML;
  }
  
  const sanitize = (node) => {
    if (node.nodeType === Node.TEXT_NODE) return;
    if (node.nodeType === Node.ELEMENT_NODE) {
      // Remove dangerous tags
      if (!allowedTags.includes(node.tagName.toLowerCase())) {
        node.replaceWith(...node.childNodes);
        return;
      }
      // Remove event handlers and dangerous URL schemes (javascript:, data:, vbscript:)
      Array.from(node.attributes).forEach(attr => {
        const attrValue = attr.value.toLowerCase().trim();
        if (attr.name.startsWith('on') || 
            (attr.name === 'href' && (
              attrValue.startsWith('javascript:') ||
              attrValue.startsWith('data:') ||
              attrValue.startsWith('vbscript:')
            )) ||
            (attr.name === 'src' && (
              attrValue.startsWith('javascript:') ||
              attrValue.startsWith('data:') ||
              attrValue.startsWith('vbscript:')
            ))) {
          node.removeAttribute(attr.name);
        }
      });
    }
    Array.from(node.childNodes).forEach(sanitize);
  };
  
  sanitize(doc.body);
  return doc.body.innerHTML;
};

// Truncate excerpt text for related post cards
const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

// Filter related posts by same category or matching tags, excluding current post
const filterRelatedPosts = (allPosts, currentPost) => {
  if (!Array.isArray(allPosts) || !currentPost) return [];
  
  const currentSlug = currentPost.slug;
  const currentCategory = currentPost.category?.toLowerCase();
  const currentTags = (currentPost.tags || []).map(tag => tag.toLowerCase());
  
  // Filter posts that match category or have common tags, and pre-compute relevance scores
  const relatedWithScores = allPosts
    .filter(p => p.slug !== currentSlug)
    .map(p => {
      const sameCategory = p.category?.toLowerCase() === currentCategory;
      const postTags = (p.tags || []).map(tag => tag.toLowerCase());
      const matchingTagCount = postTags.filter(tag => currentTags.includes(tag)).length;
      
      // Only include posts that match category or have at least one matching tag
      if (!sameCategory && matchingTagCount === 0) return null;
      
      // Pre-compute score: category match (1 point) + number of matching tags
      const score = (sameCategory ? 1 : 0) + matchingTagCount;
      return { post: p, score };
    })
    .filter(item => item !== null);
  
  // Sort by pre-computed relevance score (higher scores first)
  relatedWithScores.sort((a, b) => b.score - a.score);
  
  // Return up to 3 related posts
  return relatedWithScores.slice(0, 3).map(item => item.post);
};

const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [relatedLoading, setRelatedLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchBlogPost();
  }, [slug]);

  const fetchBlogPost = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BACKEND_URL}/api/blog/${slug}`);
      setPost(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching blog post:', err);
      setError('Blog post not found');
    } finally {
      setLoading(false);
    }
  };

  // Fetch related posts when the main post is loaded
  // Using post?.slug as dependency to prevent unnecessary API calls when post object is recreated
  useEffect(() => {
    const fetchRelatedPosts = async () => {
      if (!post?.slug) return;
      
      try {
        setRelatedLoading(true);
        const response = await axios.get(`${BACKEND_URL}/api/blog`);
        const allPosts = response.data;
        const filtered = filterRelatedPosts(allPosts, post);
        setRelatedPosts(filtered);
      } catch (err) {
        console.error('Error fetching related posts:', err);
        setRelatedPosts([]);
      } finally {
        setRelatedLoading(false);
      }
    };

    fetchRelatedPosts();
  }, [post?.slug, post?.category, post?.tags]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50 flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="inline-flex p-6 bg-orange-100 rounded-full mb-6">
            <BookOpen className="w-12 h-12 text-orange-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-8">The article you're looking for doesn't exist or has been removed.</p>
          <Link to="/blog">
            <button className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2 mx-auto">
              <ArrowLeft className="w-5 h-5" />
              Back to Blog
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-orange-500 to-orange-600">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-400/20 via-transparent to-black/30"></div>
        </div>
        
        {/* Animated Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-32 right-20 w-96 h-96 bg-green-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="container relative z-10 px-6">
          {/* Back Button */}
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Blog</span>
          </Link>

          <div className="max-w-4xl">
            {/* Post Type Badge */}
            <div className="flex items-center gap-3 mb-6">
              <span className={`px-4 py-2 text-white text-sm font-bold rounded-full shadow-lg ${
                post.post_type === 'company-update' 
                  ? 'bg-gradient-to-r from-green-600 to-green-500' 
                  : 'bg-gradient-to-r from-orange-700 to-orange-600'
              }`}>
                {post.post_type === 'company-update' ? '📢 Company Update' : post.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span className="font-medium">{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{formatDate(post.published_date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{post.readTime || '5 min read'}</span>
              </div>
              <button 
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {post.image && (
        <section className="relative -mt-8 z-20 px-6">
          <div className="container max-w-5xl">
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {/* Content Section */}
      <section className="py-16">
        <div className="container max-w-4xl px-6">
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <Tag className="w-5 h-5 text-orange-600" />
              {post.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 bg-green-100 text-green-700 text-sm font-semibold rounded-full hover:bg-green-200 transition-colors cursor-default"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Main Content */}
          <div className="prose prose-lg max-w-none">
            <div 
              className="text-gray-700 leading-relaxed whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: sanitizeHTML(post.content || post.excerpt) }}
            />
          </div>

          {/* Gallery Images */}
          {post.gallery_images && post.gallery_images.length > 0 && (
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <span className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </span>
                Gallery
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {post.gallery_images.map((img, idx) => (
                  <div 
                    key={idx} 
                    className="relative h-48 rounded-2xl overflow-hidden cursor-pointer group"
                    onClick={() => setSelectedImage(img)}
                  >
                    <img
                      src={img}
                      alt={`Gallery ${idx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                      <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity font-semibold">
                        View
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Author Section */}
      <section className="py-12 bg-white/50 border-y border-gray-200">
        <div className="container max-w-4xl px-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-orange-500 to-green-500 flex items-center justify-center text-white text-2xl font-bold">
              {post.author?.charAt(0) || 'A'}
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-800">{post.author}</h4>
              <p className="text-gray-600">Author at Trine Solutions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts Section */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-gradient-to-br from-green-50 via-white to-orange-50">
          <div className="container px-6">
            {/* Section Header */}
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
                <BookOpen className="w-4 h-4" />
                Keep Reading
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                Related Articles
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore more content similar to this article based on topics and categories
              </p>
            </div>

            {/* Related Posts Grid */}
            {relatedLoading ? (
              <div className="flex justify-center">
                <div className="w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {relatedPosts.map((relatedPost, index) => (
                  <Link
                    key={relatedPost._id || relatedPost.slug || index}
                    to={`/blog/${relatedPost.slug}`}
                    className="group"
                  >
                    <article className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col">
                      {/* Image Container */}
                      <div className="relative h-48 overflow-hidden">
                        {relatedPost.image ? (
                          <img
                            src={relatedPost.image}
                            alt={relatedPost.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-orange-100 to-green-100 flex items-center justify-center">
                            <BookOpen className="w-12 h-12 text-orange-400" />
                          </div>
                        )}
                        {/* Overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        {/* Category Badge */}
                        <div className="absolute top-4 left-4">
                          <span className={`px-3 py-1 text-xs font-bold rounded-full shadow-md ${
                            relatedPost.post_type === 'company-update'
                              ? 'bg-gradient-to-r from-green-600 to-green-500 text-white'
                              : 'bg-gradient-to-r from-orange-600 to-orange-500 text-white'
                          }`}>
                            {relatedPost.post_type === 'company-update' ? 'Update' : relatedPost.category || 'Article'}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex flex-col flex-grow">
                        {/* Title */}
                        <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-orange-600 transition-colors duration-300">
                          {relatedPost.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
                          {truncateText(relatedPost.excerpt, 100)}
                        </p>

                        {/* Meta Info */}
                        <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-100">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-orange-500 to-green-500 flex items-center justify-center text-white text-xs font-bold">
                              {relatedPost.author?.charAt(0) || 'A'}
                            </div>
                            <span className="font-medium">{relatedPost.author || 'Anonymous'}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{formatDate(relatedPost.published_date)}</span>
                          </div>
                        </div>

                        {/* Read More Link */}
                        <div className="mt-4 flex items-center gap-2 text-orange-600 font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                          <span>Read More</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-orange-500 to-orange-600"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, white 1.5px, transparent 1.5px)',
            backgroundSize: '48px 48px'
          }}></div>
        </div>

        <div className="container relative z-10 text-center text-white px-6">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Want to Learn More?
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
            Explore more articles and insights from our team of experts
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/blog">
              <button className="px-8 py-4 bg-white text-orange-600 rounded-xl font-bold hover:bg-green-50 transform hover:scale-105 transition-all duration-300 shadow-xl flex items-center gap-2">
                <ArrowLeft className="w-5 h-5" />
                Back to Blog
              </button>
            </Link>
            <Link to="/contact">
              <button className="px-8 py-4 border-2 border-white text-white rounded-xl font-bold hover:bg-white/20 transform hover:scale-105 transition-all duration-300">
                Contact Us
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Image Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img
            src={selectedImage}
            alt="Gallery"
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
          />
        </div>
      )}
    </div>
  );
};

export default BlogDetail;
