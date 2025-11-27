import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Plus, Edit2, Trash2, X, Save, Eye, Briefcase, MapPin, Clock, DollarSign, Users } from 'lucide-react';
import { toast } from 'sonner';
import AdminLayout from './AdminLayout';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api/admin`;

const AdminJobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showApplicationsModal, setShowApplicationsModal] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [activeTab, setActiveTab] = useState('jobs'); // 'jobs' or 'applications'
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    location: '',
    type: 'Full-time',
    salary: '',
    description: '',
    requirements: '',
    responsibilities: '',
    benefits: '',
    active: true,
  });

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchJobs();
    fetchApplications();
  }, [token, navigate]);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${API}/jobs`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setJobs(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      if (error.response?.status === 401) {
        navigate('/admin/login');
      }
      setLoading(false);
    }
  };

  const fetchApplications = async () => {
    try {
      const response = await axios.get(`${API}/job-applications`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setApplications(response.data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const openModal = (job = null) => {
    if (job) {
      setEditingJob(job);
      setFormData({
        title: job.title,
        department: job.department,
        location: job.location,
        type: job.type,
        salary: job.salary,
        description: job.description,
        requirements: job.requirements?.join('\n') || '',
        responsibilities: job.responsibilities?.join('\n') || '',
        benefits: job.benefits?.join('\n') || '',
        active: job.active !== false,
      });
    } else {
      setEditingJob(null);
      setFormData({
        title: '',
        department: '',
        location: '',
        type: 'Full-time',
        salary: '',
        description: '',
        requirements: '',
        responsibilities: '',
        benefits: '',
        active: true,
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const jobData = {
      title: formData.title,
      department: formData.department,
      location: formData.location,
      type: formData.type,
      salary: formData.salary,
      description: formData.description,
      requirements: formData.requirements.split('\n').filter(r => r.trim()),
      responsibilities: formData.responsibilities.split('\n').filter(r => r.trim()),
      benefits: formData.benefits.split('\n').filter(b => b.trim()),
      active: formData.active,
    };

    try {
      if (editingJob) {
        await axios.put(`${API}/jobs/${editingJob.id}`, jobData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Job updated successfully!');
      } else {
        await axios.post(`${API}/jobs`, jobData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Job created successfully!');
      }
      fetchJobs();
      setShowModal(false);
    } catch (error) {
      console.error('Error saving job:', error);
      toast.error(error.response?.data?.detail || 'Failed to save job');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this job posting?')) return;
    
    try {
      await axios.delete(`${API}/jobs/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Job deleted successfully!');
      fetchJobs();
    } catch (error) {
      console.error('Error deleting job:', error);
      toast.error('Failed to delete job');
    }
  };

  const updateApplicationStatus = async (applicationId, status) => {
    try {
      await axios.put(
        `${API}/job-applications/${applicationId}/status`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { status }
        }
      );
      toast.success('Application status updated!');
      fetchApplications();
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      new: 'bg-blue-100 text-blue-800',
      reviewing: 'bg-yellow-100 text-yellow-800',
      interview: 'bg-purple-100 text-purple-800',
      accepted: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="text-xl">Loading...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">Careers Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage job postings and applications</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('jobs')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'jobs'
                ? 'text-orange-600 border-b-2 border-orange-600'
                : 'text-gray-600 dark:text-gray-400 hover:text-orange-500'
            }`}
          >
            Job Postings ({jobs.length})
          </button>
          <button
            onClick={() => setActiveTab('applications')}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === 'applications'
                ? 'text-orange-600 border-b-2 border-orange-600'
                : 'text-gray-600 dark:text-gray-400 hover:text-orange-500'
            }`}
          >
            Applications ({applications.length})
          </button>
        </div>

        {/* Jobs Tab */}
        {activeTab === 'jobs' && (
          <>
            {/* Add Job Button */}
            <div className="mb-6">
              <button
                onClick={() => openModal()}
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add New Job
              </button>
            </div>

            {/* Jobs Grid */}
            <div className="grid gap-6">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{job.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          job.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {job.active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                        <div className="flex items-center gap-2">
                          <Briefcase className="w-4 h-4" />
                          {job.department}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {job.type}
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4" />
                          {job.salary}
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 line-clamp-2">{job.description}</p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => openModal(job)}
                        className="p-2 hover:bg-orange-100 dark:hover:bg-orange-900/30 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="w-5 h-5 text-orange-600" />
                      </button>
                      <button
                        onClick={() => handleDelete(job.id)}
                        className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5 text-red-600" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="font-semibold text-gray-700 dark:text-gray-300 mb-1">Requirements</p>
                        <p className="text-gray-600 dark:text-gray-400">{job.requirements?.length || 0} items</p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-700 dark:text-gray-300 mb-1">Responsibilities</p>
                        <p className="text-gray-600 dark:text-gray-400">{job.responsibilities?.length || 0} items</p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-700 dark:text-gray-300 mb-1">Applications</p>
                        <p className="text-gray-600 dark:text-gray-400">
                          {applications.filter(app => app.job_id === job.id).length} received
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {jobs.length === 0 && (
                <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl">
                  <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">No job postings yet. Create your first job posting!</p>
                </div>
              )}
            </div>
          </>
        )}

        {/* Applications Tab */}
        {activeTab === 'applications' && (
          <div className="grid gap-6">
            {applications.map((app) => (
              <div
                key={app.id}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{app.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">Applied for: <span className="font-semibold">{app.job_title}</span></p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                      <div>📧 {app.email}</div>
                      <div>📱 {app.phone}</div>
                      {app.linkedin_url && <div>🔗 LinkedIn</div>}
                      {app.portfolio_url && <div>💼 Portfolio</div>}
                    </div>
                    <p className="text-sm text-gray-500">Applied: {new Date(app.applied_at).toLocaleDateString()}</p>
                  </div>
                  <div className="ml-4">
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(app.status)}`}>
                      {app.status}
                    </span>
                  </div>
                </div>

                {app.cover_letter && (
                  <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Cover Letter</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">{app.cover_letter}</p>
                  </div>
                )}

                <div className="flex flex-wrap gap-3">
                  <a
                    href={app.resume_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    View Resume
                  </a>
                  
                  <select
                    value={app.status}
                    onChange={(e) => updateApplicationStatus(app.id, e.target.value)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white font-semibold"
                  >
                    <option value="new">New</option>
                    <option value="reviewing">Reviewing</option>
                    <option value="interview">Interview</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                  </select>

                  {app.linkedin_url && (
                    <a
                      href={app.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      LinkedIn
                    </a>
                  )}

                  {app.portfolio_url && (
                    <a
                      href={app.portfolio_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      Portfolio
                    </a>
                  )}
                </div>
              </div>
            ))}

            {applications.length === 0 && (
              <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">No applications received yet.</p>
              </div>
            )}
          </div>
        )}

        {/* Add/Edit Job Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white dark:bg-gray-800 px-8 py-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  {editingJob ? 'Edit Job' : 'Add New Job'}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Job Title *</label>
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
                    <label className="block text-sm font-medium mb-2">Department *</label>
                    <input
                      type="text"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      required
                      placeholder="e.g., Engineering, Sales, Marketing"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Location *</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                      placeholder="e.g., San Francisco, CA or Remote"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Job Type *</label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 outline-none focus:border-orange-500"
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Salary Range *</label>
                    <input
                      type="text"
                      name="salary"
                      value={formData.salary}
                      onChange={handleChange}
                      required
                      placeholder="e.g., $100k - $150k"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 outline-none focus:border-orange-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Description *</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      rows={4}
                      placeholder="Brief description of the role..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 outline-none focus:border-orange-500 resize-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Requirements (one per line)</label>
                    <textarea
                      name="requirements"
                      value={formData.requirements}
                      onChange={handleChange}
                      rows={6}
                      placeholder="Bachelor's degree in Computer Science&#10;5+ years of experience&#10;Strong knowledge of Python"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 outline-none focus:border-orange-500 resize-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Responsibilities (one per line)</label>
                    <textarea
                      name="responsibilities"
                      value={formData.responsibilities}
                      onChange={handleChange}
                      rows={6}
                      placeholder="Design and develop scalable applications&#10;Collaborate with cross-functional teams&#10;Mentor junior developers"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 outline-none focus:border-orange-500 resize-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Benefits (one per line)</label>
                    <textarea
                      name="benefits"
                      value={formData.benefits}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Comprehensive health insurance&#10;401(k) matching&#10;Flexible work hours"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 outline-none focus:border-orange-500 resize-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="active"
                        checked={formData.active}
                        onChange={handleChange}
                        className="w-5 h-5 rounded border-gray-300"
                      />
                      <span className="text-sm font-medium">Active (visible on careers page)</span>
                    </label>
                  </div>
                </div>

                <div className="flex justify-end gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-8 py-3 rounded-xl border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2"
                  >
                    <Save className="w-5 h-5" />
                    {editingJob ? 'Update Job' : 'Create Job'}
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

export default AdminJobs;
