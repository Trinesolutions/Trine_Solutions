import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Plus, Edit2, Trash2, X, Save, Zap, Search, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';
import AdminLayout from './AdminLayout';
import { iconOptions, getIconByName, getIconCategories, getIconsByCategory } from '@/utils/serviceIcons';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api/admin`;

const AdminServices = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [iconCategory, setIconCategory] = useState('All');
  const [iconSearch, setIconSearch] = useState('');
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: 'Zap',
    capabilities: '',
    tools: '',
    image: '',
    fullDescription: '',
  });

  const token = localStorage.getItem('adminToken');

  // Memoize filtered icons to avoid recalculating on every render
  const filteredIcons = useMemo(() => {
    return getIconsByCategory(iconCategory)
      .filter(opt => opt.name.toLowerCase().includes(iconSearch.toLowerCase()));
  }, [iconCategory, iconSearch]);

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchServices();
  }, [token, navigate]);

  const fetchServices = async () => {
    try {
      const response = await axios.get(`${API}/services`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setServices(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching services:', error);
      if (error.response?.status === 401) {
        navigate('/admin/login');
      }
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Reset image error when image URL changes
    if (name === 'image') {
      setImageError(false);
    }
  };

  const openModal = (service = null) => {
    setImageError(false);
    if (service) {
      setEditingService(service);
      setFormData({
        title: service.title,
        description: service.description,
        icon: service.icon,
        capabilities: service.capabilities?.join(', ') || '',
        tools: service.tools?.join(', ') || '',
        image: service.image || '',
        fullDescription: service.fullDescription || '',
      });
    } else {
      setEditingService(null);
      setFormData({
        title: '',
        description: '',
        icon: 'Zap',
        capabilities: '',
        tools: '',
        image: '',
        fullDescription: '',
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      capabilities: formData.capabilities.split(',').map(t => t.trim()).filter(t => t),
      tools: formData.tools.split(',').map(t => t.trim()).filter(t => t),
      image: formData.image || null,
      fullDescription: formData.fullDescription || null,
    };

    try {
      if (editingService) {
        await axios.put(`${API}/services/${editingService.id}`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Service updated successfully');
      } else {
        await axios.post(`${API}/services`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Service created successfully');
      }
      setShowModal(false);
      fetchServices();
    } catch (error) {
      console.error('Error saving service:', error);
      toast.error('Failed to save service');
    }
  };

  const handleDelete = async (serviceId) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    
    try {
      await axios.delete(`${API}/services/${serviceId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Service deleted successfully');
      fetchServices();
    } catch (error) {
      console.error('Error deleting service:', error);
      toast.error('Failed to delete service');
    }
  };

  const getIcon = (iconName) => {
    return getIconByName(iconName);
  };

  return (
    <AdminLayout>
      <div data-testid="admin-services-page">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold">Services</h2>
            <p className="text-gray-500">Manage your service offerings</p>
          </div>
          <button
            onClick={() => openModal()}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>New Service</span>
          </button>
        </div>

        {/* Services Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-48 bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl">
            <p className="text-gray-500 mb-4">No services yet</p>
            <button
              onClick={() => openModal()}
              className="btn-primary"
            >
              Create Your First Service
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const Icon = getIcon(service.icon);
              return (
                <div
                  key={service.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-orange-blue flex items-center justify-center">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => openModal(service)}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <Edit2 className="w-4 h-4 text-blue-500" />
                      </button>
                      <button
                        onClick={() => handleDelete(service.id)}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </div>
                  <h3 className="font-bold text-lg mb-2">{service.title}</h3>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-3">{service.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {service.tools?.slice(0, 3).map((tool, i) => (
                      <span key={i} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between sticky top-0 bg-white dark:bg-gray-800">
                <h3 className="text-xl font-bold">
                  {editingService ? 'Edit Service' : 'Create New Service'}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 outline-none focus:border-orange-500 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Icon *</label>
                  
                  {/* Selected Icon Preview */}
                  <div className="flex items-center gap-4 mb-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <div className="w-14 h-14 rounded-xl bg-gradient-orange-blue flex items-center justify-center">
                      {(() => {
                        const SelectedIcon = getIconByName(formData.icon);
                        return <SelectedIcon className="w-7 h-7 text-white" />;
                      })()}
                    </div>
                    <div>
                      <p className="font-medium text-trine-black dark:text-white">{formData.icon}</p>
                      <p className="text-xs text-gray-500">Selected icon</p>
                    </div>
                  </div>

                  {/* Icon Category Filter */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <button
                      type="button"
                      onClick={() => setIconCategory('All')}
                      className={`px-3 py-1.5 text-sm rounded-lg transition-all ${
                        iconCategory === 'All'
                          ? 'bg-trine-orange text-white'
                          : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      All
                    </button>
                    {getIconCategories().map((cat) => (
                      <button
                        type="button"
                        key={cat}
                        onClick={() => setIconCategory(cat)}
                        className={`px-3 py-1.5 text-sm rounded-lg transition-all ${
                          iconCategory === cat
                            ? 'bg-trine-orange text-white'
                            : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Icon Search */}
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={iconSearch}
                      onChange={(e) => setIconSearch(e.target.value)}
                      placeholder="Search icons..."
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm outline-none focus:border-trine-orange"
                    />
                  </div>

                  {/* Icon Grid */}
                  <div className="max-h-48 overflow-y-auto rounded-xl border border-gray-200 dark:border-gray-700 p-3">
                    <div className="grid grid-cols-8 gap-2">
                      {filteredIcons.map((opt) => (
                        <button
                          type="button"
                          key={opt.name}
                          onClick={() => setFormData({ ...formData, icon: opt.name })}
                          title={opt.name}
                          className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                            formData.icon === opt.name
                              ? 'bg-gradient-orange-blue text-white ring-2 ring-trine-orange ring-offset-2 dark:ring-offset-gray-800'
                              : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                          }`}
                        >
                          <opt.icon className="w-5 h-5" />
                        </button>
                      ))}
                    </div>
                    {filteredIcons.length === 0 && (
                      <p className="text-center text-gray-500 py-4 text-sm">No icons found</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Capabilities (comma-separated)</label>
                  <input
                    type="text"
                    name="capabilities"
                    value={formData.capabilities}
                    onChange={handleChange}
                    placeholder="Cloud Migration, DevOps, Automation"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Tools & Technologies (comma-separated)</label>
                  <input
                    type="text"
                    name="tools"
                    value={formData.tools}
                    onChange={handleChange}
                    placeholder="AWS, Azure, Kubernetes, Terraform"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Service Image URL</label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 outline-none focus:border-orange-500"
                  />
                  {formData.image && !imageError && (
                    <div className="mt-3 p-2 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                      <img
                        src={formData.image}
                        alt={formData.title ? `${formData.title} preview` : 'Service image preview'}
                        className="w-full h-32 object-cover rounded-lg"
                        onError={() => setImageError(true)}
                      />
                    </div>
                  )}
                  {formData.image && imageError && (
                    <p className="mt-2 text-sm text-red-500">Unable to load image preview. Please check the URL.</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Full Description (for detail page)</label>
                  <textarea
                    name="fullDescription"
                    value={formData.fullDescription}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Enter a detailed description of the service that will appear on the service detail page..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 outline-none focus:border-orange-500 resize-none"
                  />
                </div>
                <div className="flex items-center justify-end space-x-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary flex items-center space-x-2"
                  >
                    <Save className="w-5 h-5" />
                    <span>{editingService ? 'Update' : 'Create'}</span>
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

export default AdminServices;
