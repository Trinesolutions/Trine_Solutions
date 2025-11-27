import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Lock, Mail, Eye, EyeOff, ArrowRight, Shield, User, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';
const API = `${BACKEND_URL}/api/admin`;

const AdminLogin = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });

  const handleChange = (e) => {
    setError('');
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const endpoint = isLogin ? '/login' : '/register';
      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : formData;

      const response = await axios.post(`${API}${endpoint}`, payload);
      
      localStorage.setItem('adminToken', response.data.access_token);
      localStorage.setItem('adminUser', JSON.stringify(response.data.user));
      
      toast.success(isLogin ? 'Welcome back!' : 'Account created successfully!');
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Auth error:', error);
      const errorMessage = error.response?.data?.detail || 'Authentication failed. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden" data-testid="admin-login-page">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-trine-black via-gray-900 to-trine-black"></div>
      
      {/* Animated Grid */}
      <div className="animated-grid-bg" aria-hidden="true"></div>
      
      {/* Floating Glow Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-trine-orange/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-trine-lightblue/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-trine-green/10 rounded-full blur-3xl"></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md px-6">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-3xl shadow-2xl">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-trine-orange via-trine-lightblue to-trine-green flex items-center justify-center mx-auto mb-4 shadow-xl shadow-trine-orange/20">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Portal</h1>
            <p className="text-gray-400">
              {isLogin ? 'Sign in to manage your content' : 'Create your admin account'}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                <div className="relative group">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required={!isLogin}
                    data-testid="admin-name-input"
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 outline-none focus:border-trine-orange focus:bg-white/10 focus:ring-2 focus:ring-trine-orange/20 transition-all duration-300"
                    placeholder="John Doe"
                  />
                  <User className="w-5 h-5 text-gray-500 group-focus-within:text-trine-orange absolute left-4 top-1/2 -translate-y-1/2 transition-colors" />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
              <div className="relative group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  data-testid="admin-email-input"
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 outline-none focus:border-trine-orange focus:bg-white/10 focus:ring-2 focus:ring-trine-orange/20 transition-all duration-300"
                  placeholder="admin@trinesolutions.com"
                />
                <Mail className="w-5 h-5 text-gray-500 group-focus-within:text-trine-orange absolute left-4 top-1/2 -translate-y-1/2 transition-colors" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <div className="relative group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  data-testid="admin-password-input"
                  className="w-full pl-12 pr-12 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 outline-none focus:border-trine-orange focus:bg-white/10 focus:ring-2 focus:ring-trine-orange/20 transition-all duration-300"
                  placeholder="••••••••"
                />
                <Lock className="w-5 h-5 text-gray-500 group-focus-within:text-trine-orange absolute left-4 top-1/2 -translate-y-1/2 transition-colors" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors p-1"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              data-testid="admin-submit-btn"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-trine-orange via-trine-lightblue to-trine-green text-white font-semibold flex items-center justify-center space-x-2 hover:shadow-xl hover:shadow-trine-orange/30 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? (
                <div className="flex items-center space-x-2" role="status" aria-label="Loading">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                <>
                  <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
              className="text-gray-400 hover:text-trine-orange transition-colors text-sm"
            >
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
              <span className="font-semibold text-trine-lightblue hover:text-trine-orange">
                {isLogin ? 'Register' : 'Sign In'}
              </span>
            </button>
          </div>
        </div>

        {/* Back to website */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-gray-400 hover:text-trine-orange transition-colors text-sm inline-flex items-center space-x-2 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            <span>Back to Website</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
