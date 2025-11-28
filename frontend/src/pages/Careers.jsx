import { useState, useEffect } from 'react';
import axios from 'axios';
import { Briefcase, Mail,MapPin, Clock, DollarSign, Users, Heart, Zap, Award, X, Upload, Loader2, Check, FileText, Link as LinkIcon, CheckCircle, ArrowRight, Sparkles, Building2, GraduationCap, Cpu } from 'lucide-react';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

const Careers = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    resume: null,
    cover_letter: '',
    linkedin_url: '',
    portfolio_url: '',
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/jobs`);
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast.error('Failed to load job postings');
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) errors.phone = 'Phone is required';
    if (!formData.resume) errors.resume = 'Resume is required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!validTypes.includes(file.type)) {
        toast.error('Please upload a PDF or DOC file');
        setFormErrors(prev => ({ ...prev, resume: 'Please upload PDF or DOC file' }));
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        setFormErrors(prev => ({ ...prev, resume: 'File size must be less than 5MB' }));
        return;
      }
      setFormData(prev => ({ ...prev, resume: file }));
      setFormErrors(prev => ({ ...prev, resume: '' }));
    }
  };

  const openApplicationModal = (job) => {
    setSelectedJob(job);
    setUploadProgress(0);
    setFormData({
      name: '',
      email: '',
      phone: '',
      resume: null,
      cover_letter: '',
      linkedin_url: '',
      portfolio_url: '',
    });
    setFormErrors({});
    setShowApplicationModal(true);
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      const submitData = new FormData();
      submitData.append('job_id', selectedJob.id);
      submitData.append('job_title', selectedJob.title);
      submitData.append('name', formData.name);
      submitData.append('email', formData.email);
      submitData.append('phone', formData.phone);
      submitData.append('resume', formData.resume);
      if (formData.cover_letter) submitData.append('cover_letter', formData.cover_letter);
      if (formData.linkedin_url) submitData.append('linkedin_url', formData.linkedin_url);
      if (formData.portfolio_url) submitData.append('portfolio_url', formData.portfolio_url);

      await axios.post(`${BACKEND_URL}/api/jobs/apply`, submitData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total && progressEvent.total > 0) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(percentCompleted);
          }
        },
      });

      setShowApplicationModal(false);
      setSelectedJob(null);
      setShowSuccessModal(true);
      toast.success('Application submitted successfully!');
    } catch (error) {
      console.error('Error submitting application:', error);
      const errorMessage = error.response?.data?.detail || 'Failed to submit application. Please try again.';
      toast.error(errorMessage);
      setUploadProgress(0);
    } finally {
      setUploading(false);
    }
  };

  const departments = ['All', ...new Set(jobs.map(job => job.department))];
  const filteredPositions = selectedDepartment === 'All' ? jobs : jobs.filter(job => job.department === selectedDepartment);

  const benefits = [
    {
      icon: Heart,
      title: 'Health & Wellness',
      description: 'Comprehensive health insurance, mental health support, and fitness programs',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: DollarSign,
      title: 'Competitive Compensation',
      description: 'Market-leading salaries, performance bonuses, and equity options',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Zap,
      title: 'Professional Growth',
      description: 'Continuous learning opportunities, certifications, and career development',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Award,
      title: 'Work-Life Balance',
      description: 'Flexible schedules, remote work options, and generous PTO',
      color: 'from-blue-500 to-cyan-500'
    },
  ];

  const values = [
    {
      icon: Users,
      title: 'Collaborative Culture',
      description: 'Work with talented teams that value innovation and knowledge sharing',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      icon: Cpu,
      title: 'Innovation First',
      description: 'Be at the forefront of technology and digital transformation',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      icon: Heart,
      title: 'Impact Driven',
      description: 'Your work directly impacts Fortune 500 companies and their millions of users',
      color: 'from-pink-500 to-rose-500'
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 mb-8">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <span className="text-white font-semibold text-sm">We're Hiring Exceptional Talent</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-8 text-white">
              Build Your
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mt-4">
                Career Legacy
              </span>
            </h1>
            
            <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
              Join a team of innovators shaping the future of digital transformation. 
              Your next career milestone starts here at Trine Solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 rounded-full text-sm font-semibold mb-4">
              <Heart className="w-4 h-4" />
              PERKS & BENEFITS
            </div>
            <h2 className="text-4xl lg:text-5xl font-black mb-6 text-gray-900 dark:text-white">
              Why You'll Love <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Working Here</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We invest in our team's success with comprehensive benefits that support your growth and well-being
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="group bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-200 dark:border-gray-700 hover:border-cyan-500/30 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{benefit.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-full text-sm font-semibold mb-4">
              <Users className="w-4 h-4" />
              OUR CULTURE
            </div>
            <h2 className="text-4xl lg:text-5xl font-black mb-6 text-gray-900 dark:text-white">
              Our Core <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Values</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              The principles that guide our work and define who we are as a team
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <div 
                key={index}
                className="group bg-gray-50 dark:bg-gray-800 rounded-3xl p-8 border border-gray-200 dark:border-gray-700 hover:border-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <value.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-600 dark:text-green-400 rounded-full text-sm font-semibold mb-4">
              <Briefcase className="w-4 h-4" />
              JOIN OUR TEAM
            </div>
            <h2 className="text-4xl lg:text-5xl font-black mb-6 text-gray-900 dark:text-white">
              Open <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Positions</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Find your next opportunity and take your career to new heights with Trine Solutions
            </p>
          </div>

          {/* Department Filter */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDepartment(dept)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedDepartment === dept
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/25'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Positions List */}
          <div className="max-w-6xl mx-auto space-y-6">
            {loading ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full border-4 border-cyan-600 border-t-transparent animate-spin"></div>
                <p className="text-lg text-gray-600 dark:text-gray-300">Loading career opportunities...</p>
              </div>
            ) : filteredPositions.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-700">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <Briefcase className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No positions available</h3>
                <p className="text-gray-500 dark:text-gray-400">Check back soon for new opportunities!</p>
              </div>
            ) : (
              filteredPositions.map((position, index) => (
                <div 
                  key={position.id}
                  className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-200 dark:border-gray-700 hover:border-cyan-500/30 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-300"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                          {position.title}
                        </h3>
                        <span className="px-3 py-1 bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-semibold rounded-full">
                          {position.type}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{position.description}</p>
                      
                      <div className="flex flex-wrap gap-4 mb-6">
                        <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                          <Building2 className="w-4 h-4 text-cyan-600" />
                          <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">{position.department}</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                          <MapPin className="w-4 h-4 text-blue-600" />
                          <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">{position.location}</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                          <DollarSign className="w-4 h-4 text-green-600" />
                          <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">{position.salary}</span>
                        </div>
                      </div>

                      {(position.requirements?.length > 0 || position.responsibilities?.length > 0) && (
                        <div className="grid md:grid-cols-2 gap-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                          {position.requirements?.length > 0 && (
                            <div>
                              <p className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 bg-cyan-600 rounded-full"></span>
                                Key Requirements
                              </p>
                              <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                                {position.requirements.slice(0, 3).map((req, i) => (
                                  <li key={i} className="flex items-start gap-3">
                                    <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                                    <span className="text-sm">{req}</span>
                                  </li>
                                ))}
                                {position.requirements.length > 3 && (
                                  <li className="text-xs text-cyan-600 font-medium pl-7">
                                    +{position.requirements.length - 3} more requirements
                                  </li>
                                )}
                              </ul>
                            </div>
                          )}
                          {position.responsibilities?.length > 0 && (
                            <div>
                              <p className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                                Key Responsibilities
                              </p>
                              <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                                {position.responsibilities.slice(0, 3).map((resp, i) => (
                                  <li key={i} className="flex items-start gap-3">
                                    <Check className="w-4 h-4 text-blue-500 flex-shrink-0 mt-1" />
                                    <span className="text-sm">{resp}</span>
                                  </li>
                                ))}
                                {position.responsibilities.length > 3 && (
                                  <li className="text-xs text-blue-600 font-medium pl-7">
                                    +{position.responsibilities.length - 3} more responsibilities
                                  </li>
                                )}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <button 
                      onClick={() => openApplicationModal(position)}
                      className="lg:self-start flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105" 
                    >
                      <span>Apply Now</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Application Modal */}
      {showApplicationModal && selectedJob && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-900 px-8 py-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Apply for Position</h2>
                <p className="text-cyan-600 dark:text-cyan-400 font-semibold mt-1">{selectedJob.title}</p>
              </div>
              <button
                onClick={() => setShowApplicationModal(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
                disabled={uploading}
              >
                <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleSubmitApplication} className="p-8">
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={uploading}
                    className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-gray-800 outline-none transition-all ${
                      formErrors.name 
                        ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                        : 'border-gray-300 dark:border-gray-600 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20'
                    } disabled:opacity-50`}
                    placeholder="John Doe"
                  />
                  {formErrors.name && <p className="text-red-500 text-sm mt-2">{formErrors.name}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={uploading}
                    className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-gray-800 outline-none transition-all ${
                      formErrors.email 
                        ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                        : 'border-gray-300 dark:border-gray-600 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20'
                    } disabled:opacity-50`}
                    placeholder="john@example.com"
                  />
                  {formErrors.email && <p className="text-red-500 text-sm mt-2">{formErrors.email}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    disabled={uploading}
                    className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-gray-800 outline-none transition-all ${
                      formErrors.phone 
                        ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                        : 'border-gray-300 dark:border-gray-600 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20'
                    } disabled:opacity-50`}
                    placeholder="+1 (555) 123-4567"
                  />
                  {formErrors.phone && <p className="text-red-500 text-sm mt-2">{formErrors.phone}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                    Resume <span className="text-red-500">*</span>
                    <span className="text-gray-500 font-normal text-sm ml-2">(PDF/DOC, max 5MB)</span>
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      disabled={uploading}
                      className="hidden"
                      id="resume-upload"
                    />
                    <label
                      htmlFor="resume-upload"
                      className={`flex items-center justify-center gap-3 w-full px-4 py-4 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-300 ${
                        formData.resume 
                          ? 'border-green-500 bg-green-50 dark:bg-green-500/10' 
                          : formErrors.resume
                          ? 'border-red-500 bg-red-50 dark:bg-red-500/10'
                          : 'border-gray-300 dark:border-gray-600 hover:border-cyan-500 hover:bg-cyan-50 dark:hover:bg-cyan-500/10'
                      } ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {formData.resume ? (
                        <>
                          <FileText className="w-5 h-5 text-green-600" />
                          <span className="text-green-600 font-medium truncate max-w-[200px]">{formData.resume.name}</span>
                          <CheckCircle className="w-5 h-5 text-green-600 ml-auto" />
                        </>
                      ) : (
                        <>
                          <Upload className="w-5 h-5 text-gray-400" />
                          <span className="text-gray-500">Click to upload resume</span>
                        </>
                      )}
                    </label>
                  </div>
                  {formErrors.resume && <p className="text-red-500 text-sm mt-2">{formErrors.resume}</p>}
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                    LinkedIn URL <span className="text-gray-500 font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="url"
                      name="linkedin_url"
                      value={formData.linkedin_url}
                      onChange={handleChange}
                      disabled={uploading}
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 disabled:opacity-50 transition-all"
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                    Portfolio URL <span className="text-gray-500 font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="url"
                      name="portfolio_url"
                      value={formData.portfolio_url}
                      onChange={handleChange}
                      disabled={uploading}
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 disabled:opacity-50 transition-all"
                      placeholder="https://yourportfolio.com"
                    />
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                    Cover Letter <span className="text-gray-500 font-normal">(Optional)</span>
                  </label>
                  <textarea
                    name="cover_letter"
                    value={formData.cover_letter}
                    onChange={handleChange}
                    disabled={uploading}
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 resize-none disabled:opacity-50 transition-all"
                    placeholder="Tell us why you're a great fit for this position and what excites you about joining Trine Solutions..."
                  />
                </div>
              </div>

              {uploading && (
                <div className="mb-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">Uploading your application...</span>
                    <span className="text-sm font-bold text-cyan-600">{uploadProgress}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <div className="flex flex-col-reverse sm:flex-row justify-end gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={() => setShowApplicationModal(false)}
                  disabled={uploading}
                  className="px-8 py-4 rounded-xl border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-semibold text-gray-700 dark:text-gray-300 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading || !formData.resume}
                  className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Submitting... {uploadProgress}%</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5" />
                      <span>Submit Application</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-md w-full p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Application Submitted!
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              Thank you for applying to Trine Solutions! We've received your application and will review it carefully. 
              Our hiring team will contact you within 5-7 business days if your profile matches our requirements.
            </p>
            
            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
            >
              Continue Exploring
            </button>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl lg:text-5xl font-black mb-6 text-white">
              Don't See the{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Perfect Role?</span>
            </h2>
            <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
              We're always looking for exceptional talent. Send us your resume and tell us how you can contribute to our mission.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:careers@trinesolutions.com" 
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <Mail className="w-5 h-5" />
                <span>Contact Our Team</span>
              </a>
              <a 
                href="mailto:talent@trinesolutions.com" 
                className="inline-flex items-center gap-3 px-8 py-4 bg-cyan-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105"
              >
                <Upload className="w-5 h-5" />
                <span>Send Your Resume</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};



export default Careers;