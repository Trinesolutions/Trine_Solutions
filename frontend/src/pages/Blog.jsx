import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Search, Tag, Clock, TrendingUp, Sparkles, BookOpen } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';
import SEO, { pageSEO } from '@/components/SEO';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('all'); // 'all', 'blog', 'company-update'
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/blog`);
      setBlogPosts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      setLoading(false);
    }
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }
    
    setSubmitting(true);
    try {
      await axios.post(`${BACKEND_URL}/api/newsletter/subscribe`, { email });
      toast.success('Successfully subscribed to newsletter!');
      setEmail('');
    } catch (error) {
      console.error('Subscription error:', error);
      toast.error(error.response?.data?.detail || 'Failed to subscribe. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const categories = ['All', ...new Set(blogPosts.map(post => post.category))];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesType = selectedType === 'all' || post.post_type === selectedType;
    return matchesSearch && matchesCategory && matchesType;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50">
      <SEO 
        {...pageSEO.blog}
        canonicalUrl="https://trinesolutions.com/blog"
        breadcrumbs={[
          { name: 'Home', url: 'https://trinesolutions.com/' },
          { name: 'Blog', url: 'https://trinesolutions.com/blog' }
        ]}
      />
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-12 lg:pb-16">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-orange-500 to-orange-600">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-400/20 via-transparent to-black/30"></div>
        </div>
        
        {/* Animated Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-32 right-20 w-96 h-96 bg-green-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
        </div>

        {/* Dot Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.15]">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <div className="text-center lg:text-left text-white lg:col-span-2">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 mb-8 shadow-xl">
                <BookOpen className="w-5 h-5 text-white animate-pulse" />
                <span className="text-sm font-semibold tracking-wide">Latest Articles & Updates</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-8xl font-black mb-8 leading-tight">
                <span className="block text-white drop-shadow-2xl">Our Blog &</span>
                <span className="block bg-gradient-to-r from-green-300 via-green-200 to-green-100 bg-clip-text text-transparent drop-shadow-lg">
                  Insights
                </span>
              </h1>
              
              <p className="text-lg md:text-xl lg:text-2xl max-w-4xl mx-auto lg:mx-0 mb-12 text-white/95 leading-relaxed font-light">
                Stay updated with the latest trends, insights, and innovations in technology and digital transformation
              </p>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto lg:mx-0">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-6 py-5 pr-14 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-green-300 text-lg"
                  />
                  <Search className="absolute right-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-white/70" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white/50 backdrop-blur-sm border-y border-gray-200">
        <div className="container">
          {/* Type Filter */}
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200 overflow-x-auto no-scrollbar">
            <Sparkles className="w-5 h-5 text-orange-600 flex-shrink-0" />
            <span className="text-sm font-semibold text-gray-700 flex-shrink-0">Type:</span>
            <button
              onClick={() => setSelectedType('all')}
              className={`px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 flex-shrink-0 ${
                selectedType === 'all'
                  ? 'bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              All Posts
            </button>
            <button
              onClick={() => setSelectedType('blog')}
              className={`px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 flex-shrink-0 ${
                selectedType === 'blog'
                  ? 'bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              Blog Articles
            </button>
            <button
              onClick={() => setSelectedType('company-update')}
              className={`px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 flex-shrink-0 ${
                selectedType === 'company-update'
                  ? 'bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              Company Updates
            </button>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            <Tag className="w-5 h-5 text-orange-600 flex-shrink-0" />
            <span className="text-sm font-semibold text-gray-700 flex-shrink-0">Categories:</span>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 flex-shrink-0 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20">
        <div className="container">
          {loading ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600 text-lg">Loading articles...</p>
              </div>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-flex p-6 bg-orange-100 rounded-full mb-6">
                <BookOpen className="w-12 h-12 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">No articles found</h3>
              <p className="text-gray-600">Try adjusting your search or category filter</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredPosts.map((post, index) => (
                <article
                  key={post.id}
                  className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Featured Image */}
                  {post.image && (
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      {/* Post Type & Category Badge */}
                      <div className="absolute top-4 left-4 flex items-center gap-2">
                        <span className={`px-4 py-2 text-white text-xs font-bold rounded-full shadow-lg ${
                          post.post_type === 'company-update' 
                            ? 'bg-gradient-to-r from-green-600 to-green-500' 
                            : 'bg-gradient-to-r from-orange-600 to-orange-500'
                        }`}>
                          {post.post_type === 'company-update' ? '📢 Company Update' : post.category}
                        </span>
                      </div>

                      {/* Gallery Images Indicator */}
                      {post.gallery_images && post.gallery_images.length > 0 && (
                        <div className="absolute bottom-4 right-4">
                          <div className="px-3 py-1 bg-black/60 backdrop-blur-sm text-white text-xs font-semibold rounded-full flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>+{post.gallery_images.length} images</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6">
                    {/* Meta Info */}
                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-orange-600" />
                        <span>{formatDate(post.published_date)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-orange-600" />
                        <span>{post.author}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-300 line-clamp-2">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Gallery Preview */}
                    {post.gallery_images && post.gallery_images.length > 0 && (
                      <div className="mb-4">
                        <div className="grid grid-cols-3 gap-2">
                          {post.gallery_images.slice(0, 3).map((img, idx) => (
                            <div key={idx} className="relative h-20 rounded-lg overflow-hidden">
                              <img
                                src={img}
                                alt={`Gallery ${idx + 1}`}
                                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Read More Link */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime || '5 min read'}</span>
                      </div>
                      <Link 
                        to={`/blog/${post.slug || post.id}`}
                        className="group/btn flex items-center gap-2 text-orange-600 font-semibold hover:gap-3 transition-all duration-300"
                      >
                        Read More
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* More Articles Link */}
          {filteredPosts.length > 0 && (
            <div className="text-center mt-12">
              <Link to="/insights" className="inline-block">
                <button className="px-10 py-4 bg-gradient-to-r from-orange-600 to-orange-500 text-white font-bold text-lg rounded-2xl hover:shadow-2xl hover:shadow-orange-500/50 transform hover:scale-105 transition-all duration-300">
                  Explore More Insights
                </button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-orange-500 to-orange-600"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, white 1.5px, transparent 1.5px)',
            backgroundSize: '48px 48px'
          }}></div>
        </div>

        <div className="container relative z-10 text-center text-white">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 mb-6 shadow-xl">
            <Sparkles className="w-5 h-5 text-white" />
            <span className="text-sm font-semibold tracking-wide">Stay Updated</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-black mb-6">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Get the latest articles, insights, and updates delivered directly to your inbox
          </p>

          <div className="max-w-xl mx-auto">
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-green-300"
                disabled={submitting}
              />
              <button 
                type="submit"
                disabled={submitting}
                className="px-8 py-4 bg-white text-orange-600 rounded-2xl font-bold hover:bg-green-50 transform hover:scale-105 transition-all duration-300 shadow-2xl flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {submitting ? 'Subscribing...' : 'Subscribe'}
                {!submitting && <ArrowRight className="w-5 h-5" />}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
