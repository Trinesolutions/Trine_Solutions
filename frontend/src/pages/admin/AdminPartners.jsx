import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Plus, Edit2, Trash2, X, Save, Link, Upload, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import AdminLayout from './AdminLayout';
import { uploadToCloudinary } from '../../utils/cloudinary';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api/admin`;

const AdminPartners = () => {
  const navigate = useNavigate();
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingPartner, setEditingPartner] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    logo_url: '',
    website: '',
    priority: 0,
  });
  const [deploymentInfo, setDeploymentInfo] = useState(null); // New state to track deployment status

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchPartners();
  }, [token, navigate]);

  const fetchPartners = async () => {
    try {
      const response = await axios.get(`${API}/partners`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPartners(response.data);
      setDeploymentInfo({ status: 'full', message: 'Partners functionality available' });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching partners:', error);
      // Handle 404 errors (endpoints not available on Render)
      if (error.response?.status === 404) {
        setDeploymentInfo({ 
          status: 'limited', 
          message: 'Partners functionality not available in this deployment. Contact administrator to enable full functionality.' 
        });
        // Set empty partners array to show empty state
        setPartners([]);
      } else if (error.response?.status === 401) {
        navigate('/admin/login');
      } else {
        // For other errors, show empty state but log the error
        console.error('Unexpected error:', error);
        setPartners([]);
        setDeploymentInfo({ 
          status: 'error', 
          message: 'Error loading partners. Please try again later.' 
        });
      }
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const result = await uploadToCloudinary(file, 'partners');
      setFormData({
        ...formData,
        logo_url: result.url,
      });
      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error('Upload error:', error);
      // Handle specific error for unavailable functionality
      if (error.message === 'Image upload functionality not available on this deployment') {
        toast.error('Image upload not available on this deployment');
      } else {
        toast.error('Failed to upload image');
      }
    } finally {
      setUploading(false);
    }
  };

  const openModal = (partner = null) => {
    if (partner) {
      setEditingPartner(partner);
      setFormData({
        name: partner.name,
        logo_url: partner.logo_url,
        website: partner.website || '',
        priority: partner.priority || 0,
      });
    } else {
      setEditingPartner(null);
      setFormData({
        name: '',
        logo_url: '',
        website: '',
        priority: 0,
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingPartner) {
        await axios.put(`${API}/partners/${editingPartner.id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Partner updated successfully');
      } else {
        await axios.post(`${API}/partners`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Partner added successfully');
      }
      setShowModal(false);
      fetchPartners();
    } catch (error) {
      console.error('Error saving partner:', error);
      // Handle 404 errors (endpoints not available on Render)
      if (error.response?.status === 404) {
        toast.error('Partners functionality not available on this deployment');
      } else {
        toast.error('Failed to save partner');
      }
    }
  };

  const handleDelete = async (partnerId) => {
    if (!window.confirm('Are you sure you want to remove this partner?')) return;
    
    try {
      await axios.delete(`${API}/partners/${partnerId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Partner removed successfully');
      fetchPartners();
    } catch (error) {
      console.error('Error deleting partner:', error);
      // Handle 404 errors (endpoints not available on Render)
      if (error.response?.status === 404) {
        toast.error('Partners functionality not available on this deployment');
      } else {
        toast.error('Failed to remove partner');
      }
    }
  };

  return (
    <AdminLayout>
      <div data-testid="admin-partners-page">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-trine-orange">
              Trusted Partners
            </h2>
            <p className="text-gray-500">Manage your trusted partners and their logos</p>
          </div>
          {deploymentInfo?.status === 'full' && (
            <button
              onClick={() => openModal()}
              className="btn-primary flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add Partner</span>
            </button>
          )}
        </div>

        {/* Deployment Status Message */}
        {deploymentInfo?.status !== 'full' && (
          <div className={`mb-6 p-4 rounded-xl ${
            deploymentInfo?.status === 'limited' 
              ? 'bg-yellow-50 border border-yellow-200 text-yellow-800' 
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}>
            <div className="flex items-start">
              <div className="flex-shrink-0">
                {deploymentInfo?.status === 'limited' ? (
                  <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium">
                  {deploymentInfo?.status === 'limited' ? 'Limited Functionality' : 'Error'}
                </h3>
                <div className="mt-2 text-sm">
                  <p>{deploymentInfo?.message}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Partners Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-40 bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : partners.length === 0 && deploymentInfo?.status === 'full' ? (
          <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl">
            <p className="text-gray-500 mb-4">No partners added yet</p>
            <button
              onClick={() => openModal()}
              className="btn-primary"
            >
              Add First Partner
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="h-32 flex items-center justify-center p-4">
                  {partner.logo_url ? (
                    <img
                      src={partner.logo_url}
                      alt={partner.name}
                      className="max-h-20 max-w-full object-contain"
                    />
                  ) : (
                    <div className="text-gray-400 text-center">
                      <Link className="w-12 h-12 mx-auto" />
                      <p className="text-sm mt-2">{partner.name}</p>
                    </div>
                  )}
                </div>
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="font-bold text-sm truncate">{partner.name}</h3>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-gray-500">Priority: {partner.priority}</span>
                    {deploymentInfo?.status === 'full' && (
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => openModal(partner)}
                          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          <Edit2 className="w-4 h-4 text-blue-500" />
                        </button>
                        <button
                          onClick={() => handleDelete(partner.id)}
                          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal - only show if full functionality is available */}
        {showModal && deploymentInfo?.status === 'full' && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between sticky top-0 bg-white dark:bg-gray-800">
                <h3 className="text-xl font-bold">
                  {editingPartner ? 'Edit Partner' : 'Add New Partner'}
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
                  <label className="block text-sm font-medium mb-2">Partner Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Logo</label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="text"
                      name="logo_url"
                      value={formData.logo_url}
                      onChange={handleChange}
                      placeholder="https://example.com/logo.png"
                      className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 outline-none focus:border-orange-500"
                    />
                    <label className="cursor-pointer">
                      <div className="px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center space-x-2">
                        <Upload className="w-5 h-5" />
                        <span>Upload</span>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={uploading}
                      />
                    </label>
                  </div>
                  {uploading && (
                    <div className="mt-2 text-sm text-gray-500 flex items-center">
                      <div className="w-4 h-4 border-t-2 border-orange-500 rounded-full animate-spin mr-2"></div>
                      Uploading...
                    </div>
                  )}
                  {formData.logo_url && (
                    <div className="mt-3">
                      <img 
                        src={formData.logo_url} 
                        alt="Preview" 
                        className="h-16 object-contain border border-gray-200 dark:border-gray-700 rounded-lg p-2"
                      />
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Website</label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="https://example.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Display Priority</label>
                  <input
                    type="number"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    min="0"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 outline-none focus:border-orange-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Lower numbers appear first</p>
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
                    disabled={uploading}
                  >
                    <Save className="w-5 h-5" />
                    <span>{editingPartner ? 'Update' : 'Add'}</span>
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

export default AdminPartners;