import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Plus, Edit2, Trash2, X, Save, Eye, EyeOff, Upload, Loader2, FileText, Calendar, User, Tag, Search, Filter } from 'lucide-react';
import { toast } from 'sonner';
import AdminLayout from './AdminLayout';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api/admin`;

const AdminBlog = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    image: '',
    gallery_images: '',
    post_type: 'blog',
    author: '',
    category: '',
    readTime: '',
    tags: '',
    published: true,
  });
  const [uploadingFeatured, setUploadingFeatured] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchPosts();
  }, [token, navigate]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${API}/blog`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPosts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      if (error.response?.status === 401) {
        navigate('/admin/login');
      } else {
        toast.error('Failed to load blog posts. Please try again.');
      }
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleImageUpload = async (file, type = 'featured') => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB');
      return;
    }

    const formDataUpload = new FormData();
    formDataUpload.append('file', file);
    formDataUpload.append('folder', 'blog');

    try {
      if (type === 'featured') {
        setUploadingFeatured(true);
      } else {
        setUploadingGallery(true);
      }

      const response = await axios.post(`${API}/upload-image`, formDataUpload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      const imageUrl = response.data.url;

      if (type === 'featured') {
        setFormData({ ...formData, image: imageUrl });
        toast.success('Featured image uploaded successfully!');
      } else {
        // Add to gallery images
        const currentGallery = formData.gallery_images ? formData.gallery_images.split(',').map(img => img.trim()) : [];
        currentGallery.push(imageUrl);
        setFormData({ ...formData, gallery_images: currentGallery.join(', ') });
        toast.success('Gallery image uploaded successfully!');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(error.response?.data?.detail || 'Failed to upload image');
    } finally {
      if (type === 'featured') {
        setUploadingFeatured(false);
      } else {
        setUploadingGallery(false);
      }
    }
  };

  const openModal = (post = null) => {
    if (post) {
      setEditingPost(post);
      setFormData({
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        image: post.featured_image || post.image || '', // Backend stores as 'featured_image'
        gallery_images: post.gallery_images?.join(', ') || '',
        post_type: post.post_type || 'blog',
        author: post.author,
        category: post.category,
        readTime: post.readTime,
        tags: post.tags?.join(', ') || '',
        published: post.published !== false,
      });
    } else {
      setEditingPost(null);
      setFormData({
        title: '',
        excerpt: '',
        content: '',
        image: '',
        gallery_images: '',
        post_type: 'blog',
        author: '',
        category: '',
        readTime: '',
        tags: '',
        published: true,
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title: formData.title,
      excerpt: formData.excerpt,
      content: formData.content,
      featured_image: formData.image, // Backend expects 'featured_image' field
      gallery_images: formData.gallery_images.split(',').map(img => img.trim()).filter(img => img),
      post_type: formData.post_type,
      author: formData.author,
      category: formData.category,
      readTime: formData.readTime,
      tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
      published: formData.published,
    };

    try {
      if (editingPost) {
        await axios.put(`${API}/blog/${editingPost.id}`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Post updated successfully');
      } else {
        await axios.post(`${API}/blog`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Post created successfully');
      }
      setShowModal(false);
      fetchPosts();
    } catch (error) {
      console.error('Error saving post:', error);
      toast.error('Failed to save post');
    }
  };

  const handleDelete = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    
    try {
      await axios.delete(`${API}/blog/${postId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Post deleted successfully');
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error('Failed to delete post');
    }
  };

  const categories = ['AI & Innovation', 'Cybersecurity', 'Cloud Computing', 'Compliance', 'Digital Transformation'];

  // Filter posts
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || post.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Stats
  const stats = {
    totalPosts: posts.length,
    publishedPosts: posts.filter(p => p.published === true).length,
    draftPosts: posts.filter(p => p.published === false || p.published === undefined).length,
  };

  return (
    <AdminLayout>
      <div data-testid="admin-blog-page" className="space-y-8 animate-fade-in">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-trine-black dark:text-white">
              Blog Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Create and manage your blog posts and company updates
            </p>
          </div>
          <button
            onClick={() => openModal()}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-trine-orange to-trine-green text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-trine-orange/25 transition-all duration-300 transform hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            New Post
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:border-trine-orange/50 hover:shadow-lg hover:shadow-trine-orange/5 transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-trine-orange/10 flex items-center justify-center">
                <FileText className="w-6 h-6 text-trine-orange" />
              </div>
              <div>
                <p className="text-2xl font-bold text-trine-black dark:text-white">{stats.totalPosts}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Posts</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:border-trine-green/50 hover:shadow-lg hover:shadow-trine-green/5 transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-trine-green/10 flex items-center justify-center">
                <Eye className="w-6 h-6 text-trine-green" />
              </div>
              <div>
                <p className="text-2xl font-bold text-trine-black dark:text-white">{stats.publishedPosts}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Published</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:border-trine-black/30 dark:hover:border-white/30 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-trine-black/10 dark:bg-white/10 flex items-center justify-center">
                <EyeOff className="w-6 h-6 text-trine-black dark:text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-trine-black dark:text-white">{stats.draftPosts}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Drafts</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search posts by title, author, or content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:border-trine-orange focus:ring-2 focus:ring-trine-orange/20 outline-none transition-all"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="pl-12 pr-8 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:border-trine-orange outline-none appearance-none cursor-pointer min-w-[200px]"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Posts Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-72 bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : filteredPosts.length === 0 && posts.length > 0 ? (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">No posts match your search criteria</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-trine-orange/10 flex items-center justify-center">
              <FileText className="w-10 h-10 text-trine-orange" />
            </div>
            <h3 className="text-xl font-semibold text-trine-black dark:text-white mb-2">No Blog Posts Yet</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Create your first blog post to share insights with your audience</p>
            <button
              onClick={() => openModal()}
              className="px-6 py-3 bg-gradient-to-r from-trine-orange to-trine-green text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Create First Post
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => (
              <div
                key={post.id}
                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-trine-orange/50 hover:shadow-xl hover:shadow-trine-orange/5 transition-all duration-300 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="h-44 overflow-hidden relative">
                  <img
                    src={post.image || 'https://via.placeholder.com/400x300'}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-3 right-3">
                    {post.published ? (
                      <span className="flex items-center gap-1 px-2 py-1 bg-trine-green/90 text-white text-xs font-semibold rounded-lg">
                        <Eye className="w-3 h-3" /> Published
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 px-2 py-1 bg-gray-500/90 text-white text-xs font-semibold rounded-lg">
                        <EyeOff className="w-3 h-3" /> Draft
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-trine-orange/10 text-trine-orange text-xs font-semibold rounded-full">
                      {post.category}
                    </span>
                    {post.post_type === 'company-update' && (
                      <span className="px-3 py-1 bg-trine-green/10 text-trine-green text-xs font-semibold rounded-full">
                        Update
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-lg text-trine-black dark:text-white mb-2 line-clamp-2 group-hover:text-trine-orange transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {post.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.published_date || post.date}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openModal(post)}
                        className="p-2 rounded-lg hover:bg-trine-orange/10 transition-colors"
                      >
                        <Edit2 className="w-4 h-4 text-trine-orange" />
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="p-2 rounded-lg hover:bg-red-500/10 transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white dark:bg-gray-800 rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between sticky top-0 bg-white dark:bg-gray-800 z-10">
                <div>
                  <h3 className="text-2xl font-bold text-trine-black dark:text-white">
                    {editingPost ? 'Edit Post' : 'Create New Post'}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {editingPost ? 'Update your blog post details' : 'Fill in the details for your new blog post'}
                  </p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      placeholder="Enter a compelling title..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:border-trine-orange focus:ring-2 focus:ring-trine-orange/20 outline-none transition-all"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Excerpt <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="excerpt"
                      value={formData.excerpt}
                      onChange={handleChange}
                      required
                      rows={2}
                      placeholder="A brief summary of your post..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:border-trine-orange focus:ring-2 focus:ring-trine-orange/20 outline-none resize-none transition-all"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Content <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="content"
                      value={formData.content}
                      onChange={handleChange}
                      required
                      rows={6}
                      placeholder="Write your blog post content here..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:border-trine-orange focus:ring-2 focus:ring-trine-orange/20 outline-none resize-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Featured Image <span className="text-red-500">*</span>
                    </label>
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="url"
                          name="image"
                          value={formData.image}
                          onChange={handleChange}
                          placeholder="Image URL or upload below"
                          required
                          className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:border-trine-orange focus:ring-2 focus:ring-trine-orange/20 outline-none transition-all"
                        />
                        <label className="px-4 py-3 bg-gradient-to-r from-trine-orange to-trine-green text-white rounded-xl cursor-pointer hover:shadow-lg hover:shadow-trine-orange/25 transition-all flex items-center gap-2 whitespace-nowrap">
                          {uploadingFeatured ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              Uploading...
                            </>
                          ) : (
                            <>
                              <Upload className="w-4 h-4" />
                              Upload
                            </>
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e.target.files[0], 'featured')}
                            className="hidden"
                            disabled={uploadingFeatured}
                          />
                        </label>
                      </div>
                      {formData.image && (
                        <img
                          src={formData.image}
                          alt="Featured preview"
                          className="w-full h-32 object-cover rounded-xl border border-gray-300 dark:border-gray-600"
                        />
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Author <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="author"
                      value={formData.author}
                      onChange={handleChange}
                      required
                      placeholder="Author name"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:border-trine-orange focus:ring-2 focus:ring-trine-orange/20 outline-none transition-all"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Gallery Images <span className="text-gray-400">(optional)</span>
                    </label>
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <textarea
                          name="gallery_images"
                          value={formData.gallery_images}
                          onChange={handleChange}
                          rows={2}
                          placeholder="Comma-separated URLs or upload images below"
                          className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:border-trine-orange focus:ring-2 focus:ring-trine-orange/20 outline-none resize-none transition-all"
                        />
                        <label className="px-4 py-3 bg-trine-green text-white rounded-xl cursor-pointer hover:bg-trine-green/90 transition-all flex items-center gap-2 whitespace-nowrap h-fit">
                          {uploadingGallery ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              Uploading...
                            </>
                          ) : (
                            <>
                              <Upload className="w-4 h-4" />
                              Add Image
                            </>
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e.target.files[0], 'gallery')}
                            className="hidden"
                            disabled={uploadingGallery}
                          />
                        </label>
                      </div>
                      {formData.gallery_images && formData.gallery_images.split(',').filter(img => img.trim()).length > 0 && (
                        <div className="grid grid-cols-4 gap-2">
                          {formData.gallery_images.split(',').map((img, idx) => (
                            img.trim() && (
                              <div key={idx} className="relative group">
                                <img
                                  src={img.trim()}
                                  alt={`Gallery ${idx + 1}`}
                                  className="w-full h-20 object-cover rounded-lg border border-gray-300 dark:border-gray-600"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    const images = formData.gallery_images.split(',').map(i => i.trim()).filter((_, i) => i !== idx);
                                    setFormData({ ...formData, gallery_images: images.join(', ') });
                                  }}
                                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </div>
                            )
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Post Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="post_type"
                      value={formData.post_type}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:border-trine-orange outline-none cursor-pointer"
                    >
                      <option value="blog">Blog Post</option>
                      <option value="company-update">Company Update</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:border-trine-orange outline-none cursor-pointer"
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Read Time <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="readTime"
                      value={formData.readTime}
                      onChange={handleChange}
                      required
                      placeholder="e.g., 8 min read"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:border-trine-orange focus:ring-2 focus:ring-trine-orange/20 outline-none transition-all"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Tags <span className="text-gray-400">(comma-separated)</span>
                    </label>
                    <div className="relative">
                      <Tag className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="tags"
                        value={formData.tags}
                        onChange={handleChange}
                        placeholder="AI, Cloud, Security"
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:border-trine-orange focus:ring-2 focus:ring-trine-orange/20 outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative">
                        <input
                          type="checkbox"
                          name="published"
                          checked={formData.published}
                          onChange={handleChange}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-300 dark:bg-gray-600 rounded-full peer peer-checked:bg-trine-green transition-colors"></div>
                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                      </div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-trine-orange transition-colors">
                        Published (visible on the website)
                      </span>
                    </label>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-8 py-3 rounded-xl border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3 bg-gradient-to-r from-trine-orange to-trine-green text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-trine-orange/25 transition-all flex items-center gap-2"
                  >
                    <Save className="w-5 h-5" />
                    <span>{editingPost ? 'Update Post' : 'Create Post'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminBlog;
