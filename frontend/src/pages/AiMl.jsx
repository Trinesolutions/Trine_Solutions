import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Brain, Cpu, BarChart3, Eye, ArrowLeft, PlayCircle, Star, Quote, Zap, Target, TrendingUp, Database } from 'lucide-react';

const AiMl = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const aiCapabilities = [
    {
      icon: Brain,
      title: "Machine Learning",
      description: "Build intelligent systems that learn and adapt from data to make accurate predictions",
      applications: ["Predictive Analytics", "Recommendation Systems", "Fraud Detection", "Demand Forecasting"],
      color: "from-purple-500 to-indigo-500",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop"
    },
    {
      icon: Eye,
      title: "Computer Vision",
      description: "Extract insights from images and videos using advanced visual recognition algorithms",
      applications: ["Image Classification", "Object Detection", "Quality Inspection", "Medical Imaging"],
      color: "from-blue-500 to-cyan-500",
      image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=400&h=300&fit=crop"
    },
    {
      icon: Cpu,
      title: "Natural Language Processing",
      description: "Enable machines to understand, interpret, and generate human language naturally",
      applications: ["Chatbots", "Document Analysis", "Sentiment Analysis", "Language Translation"],
      color: "from-green-500 to-emerald-500",
      image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?w=400&h=300&fit=crop"
    },
    {
      icon: BarChart3,
      title: "Deep Learning",
      description: "Leverage neural networks to solve complex problems with unprecedented accuracy",
      applications: ["Neural Networks", "Pattern Recognition", "Speech Processing", "Autonomous Systems"],
      color: "from-orange-500 to-red-500",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop"
    }
  ];

  const industries = [
    {
      name: "Healthcare",
      icon: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=100&h=100&fit=crop",
      applications: ["Medical Imaging Analysis", "Drug Discovery", "Personalized Treatment", "Predictive Diagnostics"],
      caseStudy: "Reduced diagnostic time by 70% with AI-powered medical imaging"
    },
    {
      name: "Financial Services",
      icon: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=100&h=100&fit=crop",
      applications: ["Algorithmic Trading", "Risk Assessment", "Fraud Detection", "Customer Insights"],
      caseStudy: "Prevented $50M in fraudulent transactions with ML models"
    },
    {
      name: "Manufacturing",
      icon: "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=100&h=100&fit=crop",
      applications: ["Predictive Maintenance", "Quality Control", "Supply Chain Optimization", "Process Automation"],
      caseStudy: "Increased production efficiency by 35% through predictive analytics"
    },
    {
      name: "Retail & E-commerce",
      icon: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=100&h=100&fit=crop",
      applications: ["Personalized Recommendations", "Inventory Optimization", "Dynamic Pricing", "Customer Behavior Analysis"],
      caseStudy: "Boosted sales by 25% with AI-driven recommendation engine"
    }
  ];

  const technologiesStack = [
    { category: "Frameworks", tools: ["TensorFlow", "PyTorch", "Scikit-learn", "Keras", "OpenCV", "spaCy"] },
    { category: "Cloud Platforms", tools: ["AWS SageMaker", "Azure ML", "Google AI Platform", "IBM Watson", "Databricks"] },
    { category: "Programming", tools: ["Python", "R", "Julia", "Scala", "JavaScript", "CUDA"] },
    { category: "Data Processing", tools: ["Apache Spark", "Hadoop", "Kafka", "Airflow", "MLflow", "Kubeflow"] }
  ];

  const mlWorkflow = [
    {
      step: "Data Collection",
      description: "Gather and prepare high-quality datasets for training",
      icon: Database,
      color: "from-blue-500 to-cyan-500"
    },
    {
      step: "Data Preprocessing",
      description: "Clean, transform, and feature engineer data for optimal results",
      icon: Zap,
      color: "from-purple-500 to-pink-500"
    },
    {
      step: "Model Development",
      description: "Design and train machine learning models using best practices",
      icon: Brain,
      color: "from-green-500 to-emerald-500"
    },
    {
      step: "Model Validation",
      description: "Evaluate model performance using rigorous testing methodologies",
      icon: Target,
      color: "from-orange-500 to-red-500"
    },
    {
      step: "Deployment",
      description: "Deploy models to production with robust MLOps pipelines",
      icon: Cpu,
      color: "from-indigo-500 to-purple-500"
    },
    {
      step: "Monitoring & Optimization",
      description: "Continuously monitor and improve model performance",
      icon: TrendingUp,
      color: "from-pink-500 to-red-500"
    }
  ];

  const testimonials = [
    {
      name: "Dr. Sarah Chen",
      position: "Head of Data Science, MedTech Innovations",
      content: "Their AI solution transformed our diagnostic capabilities, enabling us to detect diseases 3x faster with 95% accuracy.",
      rating: 5
    },
    {
      name: "Robert Johnson",
      position: "VP of Technology, RetailMax",
      content: "The recommendation system increased our conversion rate by 40% and customer satisfaction scores by 30%.",
      rating: 5
    }
  ];

  const businessValue = [
    { value: "45%", label: "Average ROI Increase", description: "Through AI implementation" },
    { value: "60%", label: "Process Automation", description: "Reduction in manual tasks" },
    { value: "90%", label: "Prediction Accuracy", description: "In forecasting models" },
    { value: "30%", label: "Cost Savings", description: "Through intelligent optimization" }
  ];

  return (
    <div className={`min-h-screen transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=800&fit=crop"
            alt="AI and Machine Learning"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/90 via-indigo-900/80 to-pink-900/90"></div>
        </div>
        
        {/* Neural Network Animation */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-1/4 right-1/3 w-40 h-40 bg-gradient-to-r from-orange-400 to-red-400 rounded-full blur-2xl animate-pulse" style={{animationDelay: '0.5s'}}></div>
        </div>

        <div className="container relative z-10 text-center text-white px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Brain className="w-16 h-16 text-purple-400 mr-4" />
              <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                AI & Machine Learning
              </h1>
            </div>
            <p className="text-xl lg:text-2xl mb-8 opacity-90 leading-relaxed">
              Unlock the power of artificial intelligence to automate processes, gain insights, and drive innovation across your organization
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105 flex items-center justify-center">
                Start AI Project
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link to="/portfolio" className="px-8 py-4 border-2 border-white/30 rounded-full font-semibold hover:bg-white/10 transition-all duration-300 flex items-center justify-center">
                View AI Solutions
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Breadcrumb */}
      <section className="py-4 bg-gray-50 dark:bg-gray-900">
        <div className="container">
          <nav className="flex items-center text-sm">
            <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-purple-500 transition-colors">Home</Link>
            <ArrowRight className="w-4 h-4 mx-2 text-gray-400" />
            <Link to="/services" className="text-gray-600 dark:text-gray-400 hover:text-purple-500 transition-colors">Services</Link>
            <ArrowRight className="w-4 h-4 mx-2 text-gray-400" />
            <span className="text-purple-500 font-medium">AI & Machine Learning</span>
          </nav>
        </div>
      </section>

      {/* Business Value Metrics */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {businessValue.map((metric, index) => (
              <div key={index} className="text-center group">
                <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                  {metric.value}
                </div>
                <div className="font-semibold text-gray-900 dark:text-white mb-1">{metric.label}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{metric.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Capabilities */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              AI <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Capabilities</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Comprehensive AI solutions powered by cutting-edge algorithms and deep learning technologies
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {aiCapabilities.map((capability, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                <div className="grid md:grid-cols-2">
                  <div className="p-8">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${capability.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <capability.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{capability.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{capability.description}</p>
                    
                    <div className="space-y-2">
                      {capability.applications.map((application, appIndex) => (
                        <div key={appIndex} className="flex items-center">
                          <CheckCircle2 className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300 text-sm">{application}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="relative overflow-hidden">
                    <img 
                      src={capability.image}
                      alt={capability.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ML Workflow */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              ML Development <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">Workflow</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our systematic approach to machine learning ensures reliable, scalable, and production-ready AI solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mlWorkflow.map((phase, index) => (
              <div key={index} className="relative group">
                <div className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${phase.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <phase.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-6xl font-bold text-gray-100 dark:text-gray-800 group-hover:text-gray-200 dark:group-hover:text-gray-700 transition-colors">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{phase.step}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{phase.description}</p>
                </div>

                {/* Connecting Arrow */}
                {index < mlWorkflow.length - 1 && index % 3 !== 2 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-gray-300 dark:text-gray-600" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Applications */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Industry <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">Applications</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              AI solutions tailored to specific industry challenges and opportunities
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {industries.map((industry, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center mb-6">
                  <img 
                    src={industry.icon}
                    alt={industry.name}
                    className="w-16 h-16 rounded-2xl object-cover mr-4"
                  />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{industry.name}</h3>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">AI Applications</h4>
                  <div className="space-y-3">
                    {industry.applications.map((application, appIndex) => (
                      <div key={appIndex} className="flex items-center">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{application}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl">
                  <div className="text-sm font-medium text-green-800 dark:text-green-400 mb-1">Success Story</div>
                  <div className="text-gray-700 dark:text-gray-300 text-sm">{industry.caseStudy}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Technology <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Stack</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Leveraging the latest tools and frameworks to build robust AI solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {technologiesStack.map((category, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-orange-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300">
                <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white text-center">{category.category}</h3>
                <div className="space-y-3">
                  {category.tools.map((tool, toolIndex) => (
                    <div key={toolIndex} className="flex items-center justify-center p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                      <span className="font-medium text-gray-900 dark:text-white text-sm">{tool}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Client <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Success Stories</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="relative bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-lg">
                <Quote className="w-12 h-12 text-purple-300 mb-4" />
                
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 mb-6 italic text-lg leading-relaxed">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</div>
                    <div className="text-gray-600 dark:text-gray-400 text-sm">{testimonial.position}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-600 via-pink-600 to-indigo-600">
        <div className="container text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Harness the Power of AI
            </h2>
            <p className="text-xl text-white/90 mb-10 leading-relaxed">
              Transform your business with intelligent automation and data-driven insights. 
              Start your AI journey with a comprehensive assessment and strategy session.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="px-8 py-4 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 flex items-center justify-center">
                Start AI Consultation
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link to="/insights" className="px-8 py-4 border-2 border-white/30 text-white rounded-full font-semibold hover:bg-white/10 transition-all duration-300 flex items-center justify-center">
                Read AI Insights
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AiMl;