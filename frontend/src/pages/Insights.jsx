import { useEffect, useState } from 'react';
import axios from 'axios';
import { Calendar, User, Tag, Search, Clock, ArrowRight, TrendingUp } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Insights = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await axios.get(`${API}/blog`);
        setBlogPosts(response.data);
        setFilteredPosts(response.data);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    };
    fetchBlogPosts();
  }, []);

  useEffect(() => {
    let filtered = blogPosts;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredPosts(filtered);
  }, [selectedCategory, searchQuery, blogPosts]);

  const categories = ['All', 'AI & Innovation', 'Cybersecurity', 'Cloud Computing', 'Compliance', 'Digital Transformation'];

  const featuredPost = blogPosts[0];

  return (
    <div className="min-h-screen" data-testid="insights-page">
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900"></div>
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-20 w-96 h-96 bg-orange-500 rounded-full filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
        <div className="container relative z-10 text-center text-white">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6 animate-fade-in-up">
            <TrendingUp className="w-4 h-4 text-orange-400" />
            <span className="text-sm font-medium">Latest Insights & Thought Leadership</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 animate-fade-in-up" data-testid="insights-hero-title" style={{ animationDelay: '0.1s' }}>
            Stories That Inspire Innovation
          </h1>
          <p className="text-lg lg:text-xl max-w-3xl mx-auto opacity-90 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Expert perspectives on technology trends, best practices, and industry innovations from our team of thought leaders.
          </p>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container">
          <div className="flex flex-col gap-8">
            {/* Search */}
            <div className="max-w-2xl mx-auto w-full">
              <div className="relative">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search insights, articles, and topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  data-testid="insights-search-input"
                  className="w-full pl-14 pr-6 py-4 rounded-2xl glass-card text-lg outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  data-testid={`category-${category.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gradient-orange-blue text-white shadow-lg scale-105'
                      : 'glass-card hover:scale-105 hover:shadow-md'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-12">
          <div className="container">
            <h2 className="text-3xl font-bold mb-8">Featured</h2>
            <div className="glass-card overflow-hidden grid md:grid-cols-2 gap-0" data-testid="featured-post">
              <div className="h-80 md:h-auto overflow-hidden">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <span className="text-sm text-orange-500 font-semibold uppercase mb-3">{featuredPost.category}</span>
                <h3 className="text-3xl md:text-4xl font-bold mb-4">{featuredPost.title}</h3>
                <p className="text-lg opacity-80 mb-6 leading-relaxed">{featuredPost.excerpt}</p>
                <div className="flex items-center gap-6 text-sm opacity-60 mb-6">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>{featuredPost.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{featuredPost.date}</span>
                  </div>
                </div>
                <button className="btn-primary w-fit">Read Article</button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="py-12">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">All Insights</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.slice(1).map((post, index) => (
              <div key={post.id} className="glass-card overflow-hidden group" data-testid={`blog-post-${index}`}>
                <div className="h-56 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <span className="text-xs text-orange-500 font-semibold uppercase">{post.category}</span>
                  <h3 className="text-xl font-bold mt-2 mb-3">{post.title}</h3>
                  <p className="text-sm opacity-80 mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs opacity-60 mb-4">
                    <div className="flex items-center space-x-2">
                      <User className="w-3 h-3" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-3 h-3" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                  <button className="text-orange-500 font-semibold text-sm hover:underline">Read More</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 gradient-subtle">
        <div className="container">
          <div className="glass-card p-12 rounded-3xl text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-4" data-testid="newsletter-title">Subscribe to Our Newsletter</h2>
            <p className="text-lg opacity-80 mb-8">
              Get the latest insights, industry trends, and expert perspectives delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                data-testid="newsletter-email-input"
                className="flex-1 px-6 py-3 rounded-full bg-white dark:bg-gray-900 outline-none"
              />
              <button className="btn-primary" data-testid="newsletter-subscribe-btn">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Insights;