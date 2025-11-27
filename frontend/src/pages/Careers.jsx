import { useState, useEffect } from 'react';
import axios from 'axios';
import { Briefcase, MapPin, Clock, DollarSign, Users, Heart, Zap, Award, X, Upload, Loader2, Check, FileText, Link as LinkIcon } from 'lucide-react';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Careers = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    resume: null,
    cover_letter: '',
    linkedin_url: '',
    portfolio_url: '',
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/jobs`);
      setJobs(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast.error('Failed to load job postings');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!validTypes.includes(file.type)) {
        toast.error('Please upload a PDF or DOC file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }
      setFormData({ ...formData, resume: file });
    }
  };

  const openApplicationModal = (job) => {
    setSelectedJob(job);
    setFormData({
      name: '',
      email: '',
      phone: '',
      resume: null,
      cover_letter: '',
      linkedin_url: '',
      portfolio_url: '',
    });
    setShowApplicationModal(true);
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    
    if (!formData.resume) {
      toast.error('Please upload your resume');
      return;
    }

    setUploading(true);

    try {
      const submitData = new FormData();
      submitData.append('job_id', selectedJob.id);
      submitData.append('name', formData.name);
      submitData.append('email', formData.email);
      submitData.append('phone', formData.phone);
      submitData.append('resume', formData.resume);
      if (formData.cover_letter) submitData.append('cover_letter', formData.cover_letter);
      if (formData.linkedin_url) submitData.append('linkedin_url', formData.linkedin_url);
      if (formData.portfolio_url) submitData.append('portfolio_url', formData.portfolio_url);

      await axios.post(`${BACKEND_URL}/api/jobs/apply`, submitData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('Application submitted successfully!');
      setShowApplicationModal(false);
      setSelectedJob(null);
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error(error.response?.data?.detail || 'Failed to submit application');
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
    },
    {
      icon: DollarSign,
      title: 'Competitive Compensation',
      description: 'Market-leading salaries, performance bonuses, and equity options',
    },
    {
      icon: Zap,
      title: 'Professional Growth',
      description: 'Continuous learning opportunities, certifications, and career development',
    },
    {
      icon: Award,
      title: 'Work-Life Balance',
      description: 'Flexible schedules, remote work options, and generous PTO',
    },
  ];

  const values = [
    {
      icon: Users,
      title: 'Collaborative Culture',
      description: 'Work with talented teams that value innovation and knowledge sharing',
    },
    {
      icon: Zap,
      title: 'Innovation First',
      description: 'Be at the forefront of technology and digital transformation',
    },
    {
      icon: Heart,
      title: 'Impact Driven',
      description: 'Your work directly impacts Fortune 500 companies and their millions of users',
    },
  ];

  return (
    <div className="careers-page">
      {/* Hero */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-30"></div>
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight" data-testid="careers-hero-title">
              <span className="bg-gradient-to-r from-trine-green via-trine-lightblue to-trine-orange bg-clip-text text-transparent">
                Build Your Future with Us
              </span>
            </h1>
            <p className="text-xl lg:text-2xl opacity-90 mb-12" data-testid="careers-hero-description">
              Join a team of innovators shaping the future of digital transformation
            </p>
            <div className="flex flex-wrap gap-8 justify-center text-lg">
              <div className="flex items-center space-x-3">
                <Users className="w-6 h-6 text-trine-lightblue" />
                <span>500+ Team Members</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-6 h-6 text-trine-green" />
                <span>Global Offices</span>
              </div>
              <div className="flex items-center space-x-3">
                <Award className="w-6 h-6 text-trine-orange" />
                <span>Top Employer</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container">
          <h2 className="text-4xl lg:text-5xl font-bold text-center mb-4" data-testid="benefits-title">
            <span className="bg-gradient-to-r from-trine-orange to-trine-lightblue bg-clip-text text-transparent">Why Join Us</span>
          </h2>
          <p className="text-center text-lg opacity-80 mb-16">Benefits that support your success</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="glass-card p-8 text-center hover:scale-105 hover:border-trine-green/30 transition-all duration-300" data-testid={`benefit-${index}`}>
                <benefit.icon className="w-16 h-16 mx-auto mb-6 text-trine-orange" />
                <h3 className="text-xl font-bold mb-3 text-trine-black">{benefit.title}</h3>
                <p className="opacity-80">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-4xl lg:text-5xl font-bold text-center mb-16" data-testid="values-title">
            <span className="bg-gradient-to-r from-trine-lightblue to-trine-green bg-clip-text text-transparent">Our Values</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <div key={index} className="glass-card p-8 hover:scale-105 hover:border-trine-lightblue/30 transition-all duration-300" data-testid={`value-${index}`}>
                <value.icon className="w-12 h-12 mb-4 text-trine-lightblue" />
                <h3 className="text-2xl font-bold mb-3 text-trine-black">{value.title}</h3>
                <p className="opacity-80">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 gradient-subtle">
        <div className="container">
          <h2 className="text-4xl lg:text-5xl font-bold text-center mb-8" data-testid="positions-title">
            <span className="bg-gradient-to-r from-trine-green to-trine-orange bg-clip-text text-transparent">Open Positions</span>
          </h2>
          <p className="text-center text-lg opacity-80 mb-12">Find your next opportunity</p>

          {/* Department Filter */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDepartment(dept)}
                data-testid={`department-${dept.toLowerCase().replace(/\s+/g, '-')}`}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedDepartment === dept
                    ? 'bg-gradient-to-r from-trine-orange to-trine-lightblue text-white'
                    : 'glass-card hover:scale-105 hover:border-trine-orange/30'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Positions List */}
          <div className="max-w-5xl mx-auto space-y-6">
            {loading ? (
              <div className="text-center py-12">
                <Loader2 className="w-12 h-12 animate-spin mx-auto text-orange-600 mb-4" />
                <p className="text-lg">Loading positions...</p>
              </div>
            ) : filteredPositions.length === 0 ? (
              <div className="text-center py-12">
                <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-lg">No positions available at the moment.</p>
              </div>
            ) : (
              filteredPositions.map((position, index) => (
                <div key={position.id} className="glass-card p-8 hover:scale-[1.02] hover:border-trine-lightblue/30 transition-all duration-300" data-testid={`position-${index}`}>
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2 text-trine-black">{position.title}</h3>
                      <p className="opacity-80 mb-4">{position.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm opacity-70 mb-6">
                        <div className="flex items-center space-x-2">
                          <Briefcase className="w-4 h-4 text-trine-orange" />
                          <span>{position.department}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-trine-lightblue" />
                          <span>{position.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-trine-green" />
                          <span>{position.type}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <DollarSign className="w-4 h-4 text-trine-orange" />
                          <span>{position.salary}</span>
                        </div>
                      </div>

                      {/* Requirements & Responsibilities Preview */}
                      {(position.requirements?.length > 0 || position.responsibilities?.length > 0) && (
                        <div className="grid md:grid-cols-2 gap-4 mt-4">
                          {position.requirements?.length > 0 && (
                            <div>
                              <p className="font-semibold text-sm text-gray-700 mb-2">Key Requirements:</p>
                              <ul className="text-sm opacity-70 space-y-1">
                                {position.requirements.slice(0, 3).map((req, i) => (
                                  <li key={i} className="flex items-start">
                                    <Check className="w-4 h-4 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                                    <span>{req}</span>
                                  </li>
                                ))}
                                {position.requirements.length > 3 && (
                                  <li className="text-xs italic text-gray-500">+{position.requirements.length - 3} more...</li>
                                )}
                              </ul>
                            </div>
                          )}
                          {position.responsibilities?.length > 0 && (
                            <div>
                              <p className="font-semibold text-sm text-gray-700 mb-2">Key Responsibilities:</p>
                              <ul className="text-sm opacity-70 space-y-1">
                                {position.responsibilities.slice(0, 3).map((resp, i) => (
                                  <li key={i} className="flex items-start">
                                    <Check className="w-4 h-4 text-orange-600 mr-2 flex-shrink-0 mt-0.5" />
                                    <span>{resp}</span>
                                  </li>
                                ))}
                                {position.responsibilities.length > 3 && (
                                  <li className="text-xs italic text-gray-500">+{position.responsibilities.length - 3} more...</li>
                                )}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <button 
                      onClick={() => openApplicationModal(position)}
                      className="btn-primary whitespace-nowrap" 
                      data-testid={`apply-btn-${index}`}
                    >
                      Apply Now
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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-800 px-8 py-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Apply for Position</h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">{selectedJob.title}</p>
              </div>
              <button
                onClick={() => setShowApplicationModal(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
                disabled={uploading}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmitApplication} className="p-8">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={uploading}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 outline-none focus:border-orange-500 disabled:opacity-50"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={uploading}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 outline-none focus:border-orange-500 disabled:opacity-50"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    disabled={uploading}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 outline-none focus:border-orange-500 disabled:opacity-50"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Resume * (PDF/DOC, max 5MB)</label>
                  <div className="relative">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={handleFileChange}
                      disabled={uploading}
                      className="hidden"
                      id="resume-upload"
                    />
                    <label
                      htmlFor="resume-upload"
                      className={`flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl border-2 border-dashed cursor-pointer transition-colors ${
                        formData.resume 
                          ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
                          : 'border-gray-300 dark:border-gray-600 hover:border-orange-500'
                      } ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {formData.resume ? (
                        <>
                          <FileText className="w-5 h-5 text-green-600" />
                          <span className="text-sm text-green-600 font-medium truncate">{formData.resume.name}</span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-5 h-5" />
                          <span className="text-sm">Upload Resume</span>
                        </>
                      )}
                    </label>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">LinkedIn URL (Optional)</label>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="url"
                      name="linkedin_url"
                      value={formData.linkedin_url}
                      onChange={handleChange}
                      disabled={uploading}
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 outline-none focus:border-orange-500 disabled:opacity-50"
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Portfolio URL (Optional)</label>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="url"
                      name="portfolio_url"
                      value={formData.portfolio_url}
                      onChange={handleChange}
                      disabled={uploading}
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 outline-none focus:border-orange-500 disabled:opacity-50"
                      placeholder="https://yourportfolio.com"
                    />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Cover Letter (Optional)</label>
                  <textarea
                    name="cover_letter"
                    value={formData.cover_letter}
                    onChange={handleChange}
                    disabled={uploading}
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 outline-none focus:border-orange-500 resize-none disabled:opacity-50"
                    placeholder="Tell us why you're a great fit for this position..."
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={() => setShowApplicationModal(false)}
                  disabled={uploading}
                  className="px-8 py-3 rounded-xl border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-semibold disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5" />
                      Submit Application
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CTA */}
      <section className="py-20">
        <div className="container text-center">
          <div className="glass-card p-12 rounded-3xl max-w-4xl mx-auto hover:border-trine-green/30 transition-all duration-300">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6" data-testid="careers-cta-title">
              <span className="bg-gradient-to-r from-trine-lightblue to-trine-green bg-clip-text text-transparent">Don't See the Right Role?</span>
            </h2>
            <p className="text-lg opacity-80 mb-10">
              We're always looking for talented individuals. Send us your resume and let's talk.
            </p>
            <a href="mailto:careers@trinesolutions.com" className="btn-primary inline-block" data-testid="careers-cta-btn">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
