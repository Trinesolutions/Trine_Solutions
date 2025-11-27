import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Plus, Edit2, Trash2, X, Save, Eye, Briefcase, MapPin, Clock, DollarSign, Users, Search, Filter, CheckCircle, XCircle, FileText } from 'lucide-react';
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
  const [editingJob, setEditingJob] = useState(null);
  const [activeTab, setActiveTab] = useState('jobs');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
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
      new: 'bg-trine-lightblue/20 text-trine-lightblue border border-trine-lightblue/30',
      reviewing: 'bg-trine-orange/20 text-trine-orange border border-trine-orange/30',
      interview: 'bg-trine-black/10 text-trine-black border border-trine-black/30 dark:bg-white/10 dark:text-white dark:border-white/30',
      accepted: 'bg-trine-green/20 text-trine-green border border-trine-green/30',
      rejected: 'bg-trine-orange/30 text-trine-black border border-trine-orange/50 dark:text-white',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'accepted': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  // Filter applications
  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          app.job_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          app.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Stats
  const stats = {
    totalJobs: jobs.length,
    activeJobs: jobs.filter(j => j.active).length,
    totalApplications: applications.length,
    newApplications: applications.filter(a => a.status === 'new').length,
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-trine-orange border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-500 dark:text-gray-400">Loading careers data...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-trine-black dark:text-white">
              Careers Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage job postings and review applications
            </p>
          </div>
          <button
            onClick={() => openModal()}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-trine-orange to-trine-green text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-trine-orange/25 transition-all duration-300 transform hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            Add New Job
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:border-trine-orange/50 transition-colors duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-trine-orange/10 flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-trine-orange" />
              </div>
              <div>
                <p className="text-2xl font-bold text-trine-black dark:text-white">{stats.totalJobs}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Jobs</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:border-trine-green/50 transition-colors duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-trine-green/10 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-trine-green" />
              </div>
              <div>
                <p className="text-2xl font-bold text-trine-black dark:text-white">{stats.activeJobs}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Active Jobs</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:border-trine-lightblue/50 transition-colors duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-trine-lightblue/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-trine-lightblue" />
              </div>
              <div>
                <p className="text-2xl font-bold text-trine-black dark:text-white">{stats.totalApplications}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Applications</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:border-trine-orange/50 transition-colors duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-trine-orange/10 to-trine-green/10 flex items-center justify-center">
                <FileText className="w-6 h-6 text-trine-orange" />
              </div>
              <div>
                <p className="text-2xl font-bold text-trine-black dark:text-white">{stats.newApplications}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">New Applications</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-xl w-fit">
          <button
            onClick={() => setActiveTab('jobs')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              activeTab === 'jobs'
                ? 'bg-white dark:bg-gray-700 text-trine-orange shadow-md'
                : 'text-gray-600 dark:text-gray-400 hover:text-trine-orange'
            }`}
          >
            <span className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              Job Postings ({jobs.length})
            </span>
          </button>
          <button
            onClick={() => setActiveTab('applications')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              activeTab === 'applications'
                ? 'bg-white dark:bg-gray-700 text-trine-green shadow-md'
                : 'text-gray-600 dark:text-gray-400 hover:text-trine-green'
            }`}
          >
            <span className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Applications ({applications.length})
              {stats.newApplications > 0 && (
                <span className="px-2 py-0.5 text-xs bg-trine-orange text-white rounded-full">
                  {stats.newApplications}
                </span>
              )}
            </span>
          </button>
        </div>

        {/* Jobs Tab */}
        {activeTab === 'jobs' && (
          <div className="space-y-6 animate-fade-in">
            {/* Jobs Grid */}
            <div className="grid gap-6">
              {jobs.map((job, index) => (
                <div
                  key={job.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:border-trine-orange/50 hover:shadow-xl hover:shadow-trine-orange/5 transition-all duration-300 group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-bold text-trine-black dark:text-white group-hover:text-trine-orange transition-colors">
                          {job.title}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          job.active 
                            ? 'bg-trine-green/10 text-trine-green border border-trine-green/30' 
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-500 border border-gray-200 dark:border-gray-600'
                        }`}>
                          {job.active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                        <div className="flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-trine-orange" />
                          {job.department}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-trine-green" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-trine-lightblue" />
                          {job.type}
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-trine-orange" />
                          {job.salary}
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 line-clamp-2">{job.description}</p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => openModal(job)}
                        className="p-3 bg-trine-orange/10 hover:bg-trine-orange/20 rounded-xl transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="w-5 h-5 text-trine-orange" />
                      </button>
                      <button
                        onClick={() => handleDelete(job.id)}
                        className="p-3 bg-red-500/10 hover:bg-red-500/20 rounded-xl transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5 text-red-500" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="grid md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-trine-orange"></span>
                        <span className="text-gray-500 dark:text-gray-400">Requirements:</span>
                        <span className="font-semibold text-trine-black dark:text-white">{job.requirements?.length || 0}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-trine-green"></span>
                        <span className="text-gray-500 dark:text-gray-400">Responsibilities:</span>
                        <span className="font-semibold text-trine-black dark:text-white">{job.responsibilities?.length || 0}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-trine-lightblue"></span>
                        <span className="text-gray-500 dark:text-gray-400">Benefits:</span>
                        <span className="font-semibold text-trine-black dark:text-white">{job.benefits?.length || 0}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-gradient-to-r from-trine-orange to-trine-green"></span>
                        <span className="text-gray-500 dark:text-gray-400">Applications:</span>
                        <span className="font-semibold text-trine-black dark:text-white">
                          {applications.filter(app => app.job_id === job.id).length}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {jobs.length === 0 && (
                <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-trine-orange/10 flex items-center justify-center">
                    <Briefcase className="w-10 h-10 text-trine-orange" />
                  </div>
                  <h3 className="text-xl font-semibold text-trine-black dark:text-white mb-2">No Job Postings Yet</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">Create your first job posting to start receiving applications</p>
                  <button
                    onClick={() => openModal()}
                    className="px-6 py-3 bg-gradient-to-r from-trine-orange to-trine-green text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                  >
                    Create First Job
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Applications Tab */}
        {activeTab === 'applications' && (
          <div className="space-y-6 animate-fade-in">
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, email, or job title..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:border-trine-orange focus:ring-2 focus:ring-trine-orange/20 outline-none transition-all"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="pl-12 pr-8 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:border-trine-orange outline-none appearance-none cursor-pointer min-w-[180px]"
                >
                  <option value="all">All Status</option>
                  <option value="new">New</option>
                  <option value="reviewing">Reviewing</option>
                  <option value="interview">Interview</option>
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>

            {/* Applications List */}
            <div className="grid gap-4">
              {filteredApplications.map((app, index) => (
                <div
                  key={app.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:border-trine-green/50 hover:shadow-lg transition-all duration-300"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-trine-orange to-trine-green flex items-center justify-center text-white font-bold text-lg">
                          {app.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-trine-black dark:text-white">{app.name}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Applied for: <span className="font-semibold text-trine-orange">{app.job_title}</span>
                          </p>
                          <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-600 dark:text-gray-400">
                            <span className="flex items-center gap-1">📧 {app.email}</span>
                            <span className="flex items-center gap-1">📱 {app.phone}</span>
                          </div>
                          <p className="text-xs text-gray-400 mt-2">
                            Applied: {new Date(app.applied_at).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </p>
                        </div>
                      </div>
                      
                      {app.cover_letter && (
                        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">Cover Letter</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">{app.cover_letter}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-3 lg:items-end">
                      <span className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 ${getStatusColor(app.status)}`}>
                        {getStatusIcon(app.status)}
                        {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                      </span>
                      
                      <div className="flex flex-wrap gap-2">
                        <a
                          href={app.resume_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-trine-lightblue text-white rounded-lg font-semibold hover:bg-trine-lightblue/90 transition-colors text-sm"
                        >
                          <Eye className="w-4 h-4" />
                          Resume
                        </a>
                        
                        {app.linkedin_url && (
                          <a
                            href={app.linkedin_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm"
                          >
                            LinkedIn
                          </a>
                        )}

                        {app.portfolio_url && (
                          <a
                            href={app.portfolio_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm"
                          >
                            Portfolio
                          </a>
                        )}
                      </div>

                      <select
                        value={app.status}
                        onChange={(e) => updateApplicationStatus(app.id, e.target.value)}
                        className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium focus:border-trine-orange outline-none cursor-pointer"
                      >
                        <option value="new">📩 New</option>
                        <option value="reviewing">👀 Reviewing</option>
                        <option value="interview">🎯 Interview</option>
                        <option value="accepted">✅ Accepted</option>
                        <option value="rejected">❌ Rejected</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}

              {filteredApplications.length === 0 && applications.length > 0 && (
                <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
                  <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">No applications match your search criteria</p>
                </div>
              )}

              {applications.length === 0 && (
                <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-trine-green/10 flex items-center justify-center">
                    <Users className="w-10 h-10 text-trine-green" />
                  </div>
                  <h3 className="text-xl font-semibold text-trine-black dark:text-white mb-2">No Applications Yet</h3>
                  <p className="text-gray-500 dark:text-gray-400">Applications will appear here once candidates apply for your job postings</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Add/Edit Job Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
              <div className="sticky top-0 bg-white dark:bg-gray-800 px-8 py-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center z-10">
                <div>
                  <h2 className="text-2xl font-bold text-trine-black dark:text-white">
                    {editingJob ? 'Edit Job Posting' : 'Create New Job Posting'}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {editingJob ? 'Update the job details below' : 'Fill in the details for the new position'}
                  </p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Job Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      placeholder="e.g., Senior Software Engineer"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:border-trine-orange focus:ring-2 focus:ring-trine-orange/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Department <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      required
                      placeholder="e.g., Engineering, Sales, Marketing"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:border-trine-orange focus:ring-2 focus:ring-trine-orange/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Location <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                      placeholder="e.g., San Francisco, CA or Remote"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:border-trine-orange focus:ring-2 focus:ring-trine-orange/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Job Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:border-trine-orange outline-none cursor-pointer"
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Salary Range <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="salary"
                      value={formData.salary}
                      onChange={handleChange}
                      required
                      placeholder="e.g., $100k - $150k"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:border-trine-orange focus:ring-2 focus:ring-trine-orange/20 outline-none transition-all"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      rows={4}
                      placeholder="Brief description of the role and what you're looking for..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:border-trine-orange focus:ring-2 focus:ring-trine-orange/20 outline-none resize-none transition-all"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Requirements <span className="text-gray-400">(one per line)</span>
                    </label>
                    <textarea
                      name="requirements"
                      value={formData.requirements}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Bachelor's degree in Computer Science&#10;5+ years of experience&#10;Strong knowledge of Python"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:border-trine-orange focus:ring-2 focus:ring-trine-orange/20 outline-none resize-none transition-all"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Responsibilities <span className="text-gray-400">(one per line)</span>
                    </label>
                    <textarea
                      name="responsibilities"
                      value={formData.responsibilities}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Design and develop scalable applications&#10;Collaborate with cross-functional teams&#10;Mentor junior developers"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:border-trine-orange focus:ring-2 focus:ring-trine-orange/20 outline-none resize-none transition-all"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Benefits <span className="text-gray-400">(one per line)</span>
                    </label>
                    <textarea
                      name="benefits"
                      value={formData.benefits}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Comprehensive health insurance&#10;401(k) matching&#10;Flexible work hours"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:border-trine-orange focus:ring-2 focus:ring-trine-orange/20 outline-none resize-none transition-all"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative">
                        <input
                          type="checkbox"
                          name="active"
                          checked={formData.active}
                          onChange={handleChange}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-300 dark:bg-gray-600 rounded-full peer peer-checked:bg-trine-green transition-colors"></div>
                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                      </div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-trine-orange transition-colors">
                        Active (visible on careers page)
                      </span>
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
                    className="px-8 py-3 bg-gradient-to-r from-trine-orange to-trine-green text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-trine-orange/25 transition-all flex items-center gap-2"
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
