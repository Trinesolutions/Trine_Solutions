from fastapi import FastAPI, APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi import File, UploadFile
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta
import bcrypt
from jose import JWTError, jwt
import secrets
import cloudinary
import cloudinary.uploader


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Cloudinary configuration
CLOUDINARY_ENABLED = False
try:
    cloudinary_config = {
        'cloud_name': os.getenv('CLOUDINARY_CLOUD_NAME'),
        'api_key': os.getenv('CLOUDINARY_API_KEY'),
        'api_secret': os.getenv('CLOUDINARY_API_SECRET'),
    }
    
    # Check if all required config values are present
    if all(cloudinary_config.values()):
        cloudinary.config(
            cloud_name=cloudinary_config['cloud_name'],
            api_key=cloudinary_config['api_key'],
            api_secret=cloudinary_config['api_secret'],
            secure=True
        )
        CLOUDINARY_ENABLED = True
        print("Cloudinary configured successfully")
    else:
        print("Cloudinary not configured: missing environment variables")
except Exception as e:
    print(f"Cloudinary configuration error: {e}")

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# JWT Configuration
# NOTE: In production, JWT_SECRET_KEY should be set as an environment variable
# to ensure tokens remain valid across server restarts
SECRET_KEY = os.environ.get('JWT_SECRET_KEY', secrets.token_urlsafe(32))
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24  # 24 hours

# Security
security = HTTPBearer()

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Create admin router
admin_router = APIRouter(prefix="/api/admin")


# ===================== MODELS =====================

# Admin User Models
class AdminUser(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: str
    password_hash: str
    name: str
    role: str = "admin"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    is_active: bool = True

class AdminUserCreate(BaseModel):
    email: str
    password: str
    name: str

class AdminUserLogin(BaseModel):
    email: str
    password: str

class AdminUserResponse(BaseModel):
    id: str
    email: str
    name: str
    role: str
    is_active: bool

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: AdminUserResponse


# Content Models
class Service(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    icon: str
    capabilities: List[str] = []
    tools: List[str] = []

class ServiceCreate(BaseModel):
    title: str
    description: str
    icon: str
    capabilities: List[str] = []
    tools: List[str] = []

class CaseStudy(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    industry: str
    challenge: str
    solution: str
    results: str
    image: str
    technologies: List[str] = []

class CaseStudyCreate(BaseModel):
    title: str
    industry: str
    challenge: str
    solution: str
    results: str
    image: str
    technologies: List[str] = []

class BlogPost(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    excerpt: str
    content: str
    featured_image: str
    gallery_images: List[str] = []  # Additional images for the blog post
    post_type: str = "blog"  # "blog" or "company-update"
    published_date: str = Field(default_factory=lambda: datetime.now(timezone.utc).strftime("%Y-%m-%d"))
    author: str
    category: str
    readTime: str
    tags: List[str] = []
    published: bool = True

class BlogPostCreate(BaseModel):
    title: str
    excerpt: str
    content: str
    featured_image: str
    gallery_images: List[str] = []
    post_type: str = "blog"
    author: str
    category: str
    readTime: str
    tags: List[str] = []
    published: bool = True

class ContactForm(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    company: str
    message: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    read: bool = False

class ContactFormCreate(BaseModel):
    name: str
    email: str
    company: str
    message: str

class TeamMember(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    position: str
    bio: str
    image: str

class TeamMemberCreate(BaseModel):
    name: str
    position: str
    bio: str
    image: str

class Testimonial(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    role: str
    company: str
    content: str
    avatar: str
    image: Optional[str] = None
    rating: int = 5

class TestimonialCreate(BaseModel):
    name: str
    role: str
    company: str
    content: str
    avatar: str
    image: Optional[str] = None
    rating: int = 5

class Announcement(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    content: str
    type: str = "info"  # info, success, warning, alert
    active: bool = True
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    expires_at: Optional[datetime] = None

class AnnouncementCreate(BaseModel):
    title: str
    content: str
    type: str = "info"
    active: bool = True
    expires_at: Optional[str] = None


# Partner Models
class Partner(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    logo_url: str
    website: Optional[str] = None
    priority: int = 0  # For ordering partners

class PartnerCreate(BaseModel):
    name: str
    logo_url: str
    website: Optional[str] = None
    priority: int = 0

class PartnerUpdate(BaseModel):
    name: Optional[str] = None
    logo_url: Optional[str] = None
    website: Optional[str] = None
    priority: Optional[int] = None

# Career/Job Models
class Job(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    department: str
    location: str
    type: str  # Full-time, Part-time, Contract, etc.
    salary: str
    description: str
    requirements: List[str] = []
    responsibilities: List[str] = []
    benefits: List[str] = []
    active: bool = True
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class JobCreate(BaseModel):
    title: str
    department: str
    location: str
    type: str
    salary: str
    description: str
    requirements: List[str] = []
    responsibilities: List[str] = []
    benefits: List[str] = []
    active: bool = True

class JobApplication(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    job_id: str
    job_title: str
    name: str
    email: str
    phone: str
    resume_url: str
    cover_letter: Optional[str] = None
    linkedin_url: Optional[str] = None
    portfolio_url: Optional[str] = None
    applied_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    status: str = "new"  # new, reviewing, interview, rejected, accepted

class JobApplicationCreate(BaseModel):
    job_id: str
    job_title: str
    name: str
    email: EmailStr
    phone: str
    cover_letter: Optional[str] = None
    linkedin_url: Optional[str] = None
    portfolio_url: Optional[str] = None

# ===================== AUTH HELPERS =====================

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_password(password: str, hashed: str) -> bool:
    return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        token = credentials.credentials
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    user = await db.admin_users.find_one({"id": user_id}, {"_id": 0})
    if user is None:
        raise credentials_exception
    if not user.get("is_active", True):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="User account is disabled")
    return user

# Routes
@api_router.get("/")
async def root():
    return {"message": "Trine Solutions API"}

@api_router.get("/services", response_model=List[Service])
async def get_services():
    services = await db.services.find({}, {"_id": 0}).to_list(100)
    if not services:
        # Return default services
        default_services = [
            {
                "id": "1",
                "title": "Digital Transformation",
                "description": "Transform your business with cutting-edge digital solutions that drive innovation and efficiency.",
                "icon": "Zap",
                "capabilities": ["Enterprise Architecture", "Process Automation", "Digital Strategy", "Change Management"],
                "tools": ["Cloud Platforms", "AI/ML", "IoT", "Blockchain"]
            },
            {
                "id": "2",
                "title": "Cybersecurity",
                "description": "Protect your enterprise with comprehensive security solutions and risk management strategies.",
                "icon": "Shield",
                "capabilities": ["Security Assessment", "Threat Intelligence", "Incident Response", "Compliance Management"],
                "tools": ["SIEM", "Penetration Testing", "Security Operations Center", "Identity Management"]
            },
            {
                "id": "3",
                "title": "Cloud & DevOps",
                "description": "Accelerate delivery with modern cloud infrastructure and DevOps best practices.",
                "icon": "Cloud",
                "capabilities": ["Cloud Migration", "Infrastructure as Code", "CI/CD Pipelines", "Container Orchestration"],
                "tools": ["AWS", "Azure", "GCP", "Kubernetes", "Terraform"]
            },
            {
                "id": "4",
                "title": "Data Analytics & AI",
                "description": "Unlock insights from your data with advanced analytics and artificial intelligence solutions.",
                "icon": "BarChart3",
                "capabilities": ["Data Warehousing", "Machine Learning", "Predictive Analytics", "Business Intelligence"],
                "tools": ["Python", "TensorFlow", "Tableau", "Power BI", "Snowflake"]
            },
            {
                "id": "5",
                "title": "Risk & Compliance",
                "description": "Navigate regulatory landscapes with expert risk management and compliance solutions.",
                "icon": "FileCheck",
                "capabilities": ["Regulatory Compliance", "Risk Assessment", "Audit Support", "Policy Development"],
                "tools": ["GRC Platforms", "Audit Tools", "Compliance Management Systems"]
            },
            {
                "id": "6",
                "title": "Managed IT Services",
                "description": "Focus on your business while we manage your IT infrastructure and support needs.",
                "icon": "Wrench",
                "capabilities": ["24/7 Support", "Infrastructure Management", "Service Desk", "Performance Monitoring"],
                "tools": ["Monitoring Tools", "Service Management", "Remote Support", "Asset Management"]
            }
        ]
        return default_services
    return services

@api_router.get("/case-studies", response_model=List[CaseStudy])
async def get_case_studies():
    studies = await db.case_studies.find({}, {"_id": 0}).to_list(100)
    if not studies:
        default_studies = [
            {
                "id": "1",
                "title": "Global Bank Digital Transformation",
                "industry": "Banking",
                "challenge": "Legacy systems hindering digital innovation and customer experience",
                "solution": "Implemented cloud-native architecture with microservices and AI-powered customer insights",
                "results": "40% reduction in processing time, 65% increase in customer satisfaction, $12M annual savings",
                "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
                "technologies": ["AWS", "Kubernetes", "React", "Python", "TensorFlow"]
            },
            {
                "id": "2",
                "title": "Healthcare Data Security Overhaul",
                "industry": "Healthcare",
                "challenge": "Protecting sensitive patient data while ensuring HIPAA compliance",
                "solution": "Deployed zero-trust security architecture with advanced encryption and monitoring",
                "results": "100% compliance achievement, Zero security breaches, 30% reduction in security incidents",
                "image": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800",
                "technologies": ["Azure", "Security Operations Center", "Identity Management", "Encryption"]
            },
            {
                "id": "3",
                "title": "Retail Supply Chain Optimization",
                "industry": "Retail",
                "challenge": "Inefficient inventory management leading to stockouts and excess inventory",
                "solution": "AI-powered predictive analytics and real-time inventory tracking system",
                "results": "25% reduction in inventory costs, 50% decrease in stockouts, 35% improvement in forecast accuracy",
                "image": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800",
                "technologies": ["Machine Learning", "IoT", "Real-time Analytics", "Cloud Integration"]
            }
        ]
        return default_studies
    return studies

@api_router.get("/blog", response_model=List[BlogPost])
async def get_blog_posts():
    posts = await db.blog_posts.find({}, {"_id": 0}).to_list(100)
    if not posts:
        default_posts = [
            {
                "id": "1",
                "title": "The Future of Enterprise AI: Trends Shaping 2025",
                "excerpt": "Explore how artificial intelligence is revolutionizing enterprise operations and what to expect in the coming years.",
                "content": "Artificial Intelligence continues to reshape the enterprise landscape in unprecedented ways. From predictive analytics to automated decision-making, AI is becoming the cornerstone of modern business operations. This comprehensive guide explores the key trends that will define enterprise AI in 2025 and beyond.",
                "image": "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200",
                "date": "2025-01-15",
                "author": "Dr. Sarah Chen",
                "category": "AI & Innovation",
                "readTime": "8 min read",
                "tags": ["AI", "Machine Learning", "Enterprise Technology", "Innovation"]
            },
            {
                "id": "2",
                "title": "Zero Trust Security: A Comprehensive Implementation Guide",
                "excerpt": "Learn how zero trust architecture is becoming essential for modern cybersecurity strategies and how to implement it effectively.",
                "content": "As cyber threats become increasingly sophisticated, the traditional perimeter-based security model is no longer sufficient. Zero Trust Architecture represents a paradigm shift in how organizations approach security, assuming that threats can exist both inside and outside the network.",
                "image": "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200",
                "date": "2025-01-10",
                "author": "Michael Rodriguez",
                "category": "Cybersecurity",
                "readTime": "12 min read",
                "tags": ["Cybersecurity", "Zero Trust", "Network Security", "Enterprise Security"]
            },
            {
                "id": "3",
                "title": "Cloud Migration Best Practices for Enterprise Success",
                "excerpt": "Navigate the complexities of cloud migration with our expert insights and proven strategies for 2025.",
                "content": "Cloud migration is no longer a question of 'if' but 'how' for modern enterprises. This comprehensive guide covers everything from assessment and planning to execution and optimization, ensuring your cloud journey is smooth and successful.",
                "image": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200",
                "date": "2025-01-05",
                "author": "Emily Watson",
                "category": "Cloud Computing",
                "readTime": "10 min read",
                "tags": ["Cloud Computing", "AWS", "Azure", "Migration Strategy"]
            },
            {
                "id": "4",
                "title": "Data Privacy Regulations: Global Compliance Strategies",
                "excerpt": "Stay compliant with evolving data privacy regulations across different jurisdictions with our expert guidance.",
                "content": "The regulatory landscape for data privacy is constantly evolving, with new laws and requirements emerging globally. Understanding and complying with regulations like GDPR, CCPA, and emerging frameworks is crucial for any organization handling personal data.",
                "image": "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200",
                "date": "2024-12-28",
                "author": "James Park",
                "category": "Compliance",
                "readTime": "15 min read",
                "tags": ["Data Privacy", "GDPR", "Compliance", "Legal"]
            },
            {
                "id": "5",
                "title": "Kubernetes at Scale: Managing Enterprise Container Orchestration",
                "excerpt": "Master the art of scaling Kubernetes deployments for enterprise-grade applications with advanced strategies.",
                "content": "Kubernetes has become the de facto standard for container orchestration, but managing it at enterprise scale presents unique challenges. This guide provides advanced techniques for scaling, monitoring, and optimizing Kubernetes in production environments.",
                "image": "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=1200",
                "date": "2024-12-20",
                "author": "Dr. Sarah Chen",
                "category": "Cloud Computing",
                "readTime": "14 min read",
                "tags": ["Kubernetes", "DevOps", "Container Orchestration", "Cloud Native"]
            },
            {
                "id": "6",
                "title": "The ROI of Digital Transformation: Measuring Success",
                "excerpt": "Discover how to quantify and maximize the return on investment from your digital transformation initiatives.",
                "content": "Digital transformation requires significant investment, but how do you measure its success? This article explores key metrics, frameworks, and real-world examples of organizations that have successfully quantified their digital transformation ROI.",
                "image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200",
                "date": "2024-12-15",
                "author": "Emily Watson",
                "category": "Digital Transformation",
                "readTime": "11 min read",
                "tags": ["Digital Transformation", "ROI", "Business Strategy", "Metrics"]
            },
            {
                "id": "7",
                "title": "API Security: Protecting Your Digital Assets in 2025",
                "excerpt": "Essential strategies for securing APIs in an increasingly interconnected digital ecosystem.",
                "content": "APIs are the backbone of modern applications, but they also represent a significant security risk if not properly protected. This comprehensive guide covers the latest API security threats and how to defend against them.",
                "image": "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=1200",
                "date": "2024-12-10",
                "author": "Michael Rodriguez",
                "category": "Cybersecurity",
                "readTime": "9 min read",
                "tags": ["API Security", "Cybersecurity", "Web Security", "Best Practices"]
            },
            {
                "id": "8",
                "title": "Building Data-Driven Organizations: A Leadership Perspective",
                "excerpt": "Transform your organization's culture to embrace data-driven decision making at every level.",
                "content": "Becoming a truly data-driven organization requires more than just technology—it demands cultural change, leadership commitment, and the right processes. Learn how leading organizations are making this transition successfully.",
                "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200",
                "date": "2024-12-05",
                "author": "James Park",
                "category": "AI & Innovation",
                "readTime": "13 min read",
                "tags": ["Data Analytics", "Leadership", "Business Intelligence", "Culture"]
            }
        ]
        return default_posts
    return posts

@api_router.post("/contact", response_model=ContactForm)
async def create_contact(input: ContactFormCreate):
    contact_dict = input.model_dump()
    contact_obj = ContactForm(**contact_dict)
    
    doc = contact_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    await db.contacts.insert_one(doc)
    return contact_obj

@api_router.get("/team", response_model=List[TeamMember])
async def get_team():
    team = await db.team_members.find({}, {"_id": 0}).to_list(100)
    if not team:
        default_team = [
            {
                "id": "1",
                "name": "John Anderson",
                "position": "Chief Executive Officer",
                "bio": "20+ years leading digital transformation initiatives for Fortune 500 companies.",
                "image": "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400"
            },
            {
                "id": "2",
                "name": "Dr. Sarah Chen",
                "position": "Chief Technology Officer",
                "bio": "Former tech lead at major cloud providers, specializing in AI and distributed systems.",
                "image": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400"
            },
            {
                "id": "3",
                "name": "Michael Rodriguez",
                "position": "Head of Cybersecurity",
                "bio": "Certified ethical hacker with expertise in enterprise security architecture.",
                "image": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400"
            },
            {
                "id": "4",
                "name": "Emily Watson",
                "position": "Director of Cloud Solutions",
                "bio": "Cloud architect with deep expertise in AWS, Azure, and GCP implementations.",
                "image": "https://images.unsplash.com/photo-1580489944761-15a19d4ea984?w=400"
            }
        ]
        return default_team
    return team

@api_router.get("/announcements", response_model=List[Announcement])
async def get_announcements():
    now = datetime.now(timezone.utc)
    announcements = await db.announcements.find(
        {"active": True},
        {"_id": 0}
    ).to_list(100)
    # Filter out expired announcements
    active_announcements = []
    for ann in announcements:
        if ann.get("expires_at"):
            expires = datetime.fromisoformat(ann["expires_at"].replace('Z', '+00:00')) if isinstance(ann["expires_at"], str) else ann["expires_at"]
            if expires > now:
                active_announcements.append(ann)
        else:
            active_announcements.append(ann)
    return active_announcements

@api_router.get("/testimonials", response_model=List[Testimonial])
async def get_testimonials():
    testimonials = await db.testimonials.find({}, {"_id": 0}).to_list(100)
    if not testimonials:
        default_testimonials = [
            {
                "id": "1",
                "name": "Sarah Chen",
                "role": "CTO",
                "company": "Global Finance Corp",
                "content": "Trine Solutions transformed our digital infrastructure, resulting in 40% cost savings and unprecedented scalability. Their team understood our complex requirements from day one.",
                "avatar": "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
                "image": "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800",
                "rating": 5
            },
            {
                "id": "2",
                "name": "Marcus Johnson",
                "role": "CEO",
                "company": "TechInnovate Inc",
                "content": "Their cybersecurity implementation protected us from a major breach. The ROI was immediate and substantial. I cannot recommend Trine Solutions highly enough.",
                "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
                "image": "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
                "rating": 5
            },
            {
                "id": "3",
                "name": "Elena Rodriguez",
                "role": "Digital Director",
                "company": "Retail Giant Ltd",
                "content": "The e-commerce platform they built increased our conversion rate by 65%. Exceptional work from start to finish. Their attention to detail is unmatched.",
                "avatar": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
                "image": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800",
                "rating": 5
            },
            {
                "id": "4",
                "name": "David Park",
                "role": "VP Engineering",
                "company": "HealthTech Solutions",
                "content": "Working with Trine Solutions on our healthcare platform was transformative. They delivered a HIPAA-compliant solution that exceeded all our expectations.",
                "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
                "image": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800",
                "rating": 5
            }
        ]
        return default_testimonials
    return testimonials


# ===================== ADMIN AUTH ROUTES =====================

@admin_router.post("/register", response_model=TokenResponse)
async def admin_register(user_data: AdminUserCreate):
    # Normalize email to lowercase for case-insensitive comparison
    normalized_email = user_data.email.lower()
    
    # Check if user already exists (case-insensitive)
    existing_user = await db.admin_users.find_one({"email": normalized_email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Check if this is the first admin (auto-approve)
    admin_count = await db.admin_users.count_documents({})
    
    # Create user with normalized email
    user = AdminUser(
        email=normalized_email,
        password_hash=hash_password(user_data.password),
        name=user_data.name,
        role="admin" if admin_count == 0 else "admin",
        is_active=True
    )
    
    doc = user.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.admin_users.insert_one(doc)
    
    # Generate token
    access_token = create_access_token(data={"sub": user.id})
    
    return TokenResponse(
        access_token=access_token,
        user=AdminUserResponse(
            id=user.id,
            email=user.email,
            name=user.name,
            role=user.role,
            is_active=user.is_active
        )
    )

@admin_router.post("/login", response_model=TokenResponse)
async def admin_login(credentials: AdminUserLogin):
    # Normalize email to lowercase for case-insensitive lookup
    normalized_email = credentials.email.lower()
    
    user = await db.admin_users.find_one({"email": normalized_email}, {"_id": 0})
    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    if not verify_password(credentials.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    if not user.get("is_active", True):
        raise HTTPException(status_code=403, detail="Account is disabled")
    
    access_token = create_access_token(data={"sub": user["id"]})
    
    return TokenResponse(
        access_token=access_token,
        user=AdminUserResponse(
            id=user["id"],
            email=user["email"],
            name=user["name"],
            role=user.get("role", "admin"),
            is_active=user.get("is_active", True)
        )
    )

@admin_router.get("/me", response_model=AdminUserResponse)
async def get_current_admin(current_user: dict = Depends(get_current_user)):
    return AdminUserResponse(
        id=current_user["id"],
        email=current_user["email"],
        name=current_user["name"],
        role=current_user.get("role", "admin"),
        is_active=current_user.get("is_active", True)
    )


# ===================== ADMIN CRUD ROUTES =====================

# Dashboard Stats
@admin_router.get("/dashboard/stats")
async def get_dashboard_stats(current_user: dict = Depends(get_current_user)):
    blog_count = await db.blog_posts.count_documents({})
    case_study_count = await db.case_studies.count_documents({})
    contact_count = await db.contacts.count_documents({})
    unread_contacts = await db.contacts.count_documents({"read": False})
    team_count = await db.team_members.count_documents({})
    service_count = await db.services.count_documents({})
    announcement_count = await db.announcements.count_documents({"active": True})
    testimonial_count = await db.testimonials.count_documents({})
    
    return {
        "blog_posts": blog_count,
        "case_studies": case_study_count,
        "total_contacts": contact_count,
        "unread_contacts": unread_contacts,
        "team_members": team_count,
        "services": service_count,
        "active_announcements": announcement_count,
        "testimonials": testimonial_count
    }

# Blog Posts CRUD
@admin_router.get("/blog", response_model=List[BlogPost])
async def admin_get_blog_posts(current_user: dict = Depends(get_current_user)):
    posts = await db.blog_posts.find({}, {"_id": 0}).to_list(100)
    return posts

@admin_router.post("/blog", response_model=BlogPost)
async def admin_create_blog_post(post_data: BlogPostCreate, current_user: dict = Depends(get_current_user)):
    post = BlogPost(**post_data.model_dump())
    doc = post.model_dump()
    await db.blog_posts.insert_one(doc)
    return post

@admin_router.put("/blog/{post_id}", response_model=BlogPost)
async def admin_update_blog_post(post_id: str, post_data: BlogPostCreate, current_user: dict = Depends(get_current_user)):
    existing = await db.blog_posts.find_one({"id": post_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Blog post not found")
    
    update_data = post_data.model_dump()
    await db.blog_posts.update_one({"id": post_id}, {"$set": update_data})
    
    updated = await db.blog_posts.find_one({"id": post_id}, {"_id": 0})
    return BlogPost(**updated)

@admin_router.delete("/blog/{post_id}")
async def admin_delete_blog_post(post_id: str, current_user: dict = Depends(get_current_user)):
    result = await db.blog_posts.delete_one({"id": post_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Blog post not found")
    return {"message": "Blog post deleted successfully"}

# Case Studies CRUD
@admin_router.get("/case-studies", response_model=List[CaseStudy])
async def admin_get_case_studies(current_user: dict = Depends(get_current_user)):
    studies = await db.case_studies.find({}, {"_id": 0}).to_list(100)
    return studies

@admin_router.post("/case-studies", response_model=CaseStudy)
async def admin_create_case_study(study_data: CaseStudyCreate, current_user: dict = Depends(get_current_user)):
    study = CaseStudy(**study_data.model_dump())
    doc = study.model_dump()
    await db.case_studies.insert_one(doc)
    return study

@admin_router.put("/case-studies/{study_id}", response_model=CaseStudy)
async def admin_update_case_study(study_id: str, study_data: CaseStudyCreate, current_user: dict = Depends(get_current_user)):
    existing = await db.case_studies.find_one({"id": study_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Case study not found")
    
    update_data = study_data.model_dump()
    await db.case_studies.update_one({"id": study_id}, {"$set": update_data})
    
    updated = await db.case_studies.find_one({"id": study_id}, {"_id": 0})
    return CaseStudy(**updated)

@admin_router.delete("/case-studies/{study_id}")
async def admin_delete_case_study(study_id: str, current_user: dict = Depends(get_current_user)):
    result = await db.case_studies.delete_one({"id": study_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Case study not found")
    return {"message": "Case study deleted successfully"}

# Services CRUD
@admin_router.get("/services", response_model=List[Service])
async def admin_get_services(current_user: dict = Depends(get_current_user)):
    services = await db.services.find({}, {"_id": 0}).to_list(100)
    return services

@admin_router.post("/services", response_model=Service)
async def admin_create_service(service_data: ServiceCreate, current_user: dict = Depends(get_current_user)):
    service = Service(**service_data.model_dump())
    doc = service.model_dump()
    await db.services.insert_one(doc)
    return service

@admin_router.put("/services/{service_id}", response_model=Service)
async def admin_update_service(service_id: str, service_data: ServiceCreate, current_user: dict = Depends(get_current_user)):
    existing = await db.services.find_one({"id": service_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Service not found")
    
    update_data = service_data.model_dump()
    await db.services.update_one({"id": service_id}, {"$set": update_data})
    
    updated = await db.services.find_one({"id": service_id}, {"_id": 0})
    return Service(**updated)

@admin_router.delete("/services/{service_id}")
async def admin_delete_service(service_id: str, current_user: dict = Depends(get_current_user)):
    result = await db.services.delete_one({"id": service_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Service not found")
    return {"message": "Service deleted successfully"}

# Team Members CRUD
@admin_router.get("/team", response_model=List[TeamMember])
async def admin_get_team(current_user: dict = Depends(get_current_user)):
    team = await db.team_members.find({}, {"_id": 0}).to_list(100)
    return team

@admin_router.post("/team", response_model=TeamMember)
async def admin_create_team_member(member_data: TeamMemberCreate, current_user: dict = Depends(get_current_user)):
    member = TeamMember(**member_data.model_dump())
    doc = member.model_dump()
    await db.team_members.insert_one(doc)
    return member

@admin_router.put("/team/{member_id}", response_model=TeamMember)
async def admin_update_team_member(member_id: str, member_data: TeamMemberCreate, current_user: dict = Depends(get_current_user)):
    existing = await db.team_members.find_one({"id": member_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Team member not found")
    
    update_data = member_data.model_dump()
    await db.team_members.update_one({"id": member_id}, {"$set": update_data})
    
    updated = await db.team_members.find_one({"id": member_id}, {"_id": 0})
    return TeamMember(**updated)

@admin_router.delete("/team/{member_id}")
async def admin_delete_team_member(member_id: str, current_user: dict = Depends(get_current_user)):
    result = await db.team_members.delete_one({"id": member_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Team member not found")
    return {"message": "Team member deleted successfully"}

# Testimonials CRUD
@admin_router.get("/testimonials", response_model=List[Testimonial])
async def admin_get_testimonials(current_user: dict = Depends(get_current_user)):
    testimonials = await db.testimonials.find({}, {"_id": 0}).to_list(100)
    return testimonials

@admin_router.post("/testimonials", response_model=Testimonial)
async def admin_create_testimonial(testimonial_data: TestimonialCreate, current_user: dict = Depends(get_current_user)):
    testimonial = Testimonial(**testimonial_data.model_dump())
    doc = testimonial.model_dump()
    await db.testimonials.insert_one(doc)
    return testimonial

@admin_router.put("/testimonials/{testimonial_id}", response_model=Testimonial)
async def admin_update_testimonial(testimonial_id: str, testimonial_data: TestimonialCreate, current_user: dict = Depends(get_current_user)):
    existing = await db.testimonials.find_one({"id": testimonial_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    
    update_data = testimonial_data.model_dump()
    await db.testimonials.update_one({"id": testimonial_id}, {"$set": update_data})
    
    updated = await db.testimonials.find_one({"id": testimonial_id}, {"_id": 0})
    return Testimonial(**updated)

@admin_router.delete("/testimonials/{testimonial_id}")
async def admin_delete_testimonial(testimonial_id: str, current_user: dict = Depends(get_current_user)):
    result = await db.testimonials.delete_one({"id": testimonial_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    return {"message": "Testimonial deleted successfully"}

# Contacts Management
@admin_router.get("/contacts", response_model=List[ContactForm])
async def admin_get_contacts(current_user: dict = Depends(get_current_user)):
    contacts = await db.contacts.find({}, {"_id": 0}).sort("timestamp", -1).to_list(100)
    return contacts

@admin_router.put("/contacts/{contact_id}/read")
async def admin_mark_contact_read(contact_id: str, current_user: dict = Depends(get_current_user)):
    result = await db.contacts.update_one({"id": contact_id}, {"$set": {"read": True}})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Contact not found")
    return {"message": "Contact marked as read"}

@admin_router.delete("/contacts/{contact_id}")
async def admin_delete_contact(contact_id: str, current_user: dict = Depends(get_current_user)):
    result = await db.contacts.delete_one({"id": contact_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Contact not found")
    return {"message": "Contact deleted successfully"}

# Announcements CRUD
@admin_router.get("/announcements", response_model=List[Announcement])
async def admin_get_announcements(current_user: dict = Depends(get_current_user)):
    announcements = await db.announcements.find({}, {"_id": 0}).to_list(100)
    return announcements

@admin_router.post("/announcements", response_model=Announcement)
async def admin_create_announcement(ann_data: AnnouncementCreate, current_user: dict = Depends(get_current_user)):
    announcement = Announcement(
        title=ann_data.title,
        content=ann_data.content,
        type=ann_data.type,
        active=ann_data.active,
        expires_at=datetime.fromisoformat(ann_data.expires_at) if ann_data.expires_at else None
    )
    doc = announcement.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    if doc['expires_at']:
        doc['expires_at'] = doc['expires_at'].isoformat()
    await db.announcements.insert_one(doc)
    return announcement

@admin_router.put("/announcements/{ann_id}", response_model=Announcement)
async def admin_update_announcement(ann_id: str, ann_data: AnnouncementCreate, current_user: dict = Depends(get_current_user)):
    existing = await db.announcements.find_one({"id": ann_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Announcement not found")
    
    update_data = {
        "title": ann_data.title,
        "content": ann_data.content,
        "type": ann_data.type,
        "active": ann_data.active,
        "expires_at": ann_data.expires_at
    }
    await db.announcements.update_one({"id": ann_id}, {"$set": update_data})
    
    updated = await db.announcements.find_one({"id": ann_id}, {"_id": 0})
    return Announcement(**updated)

@admin_router.delete("/announcements/{ann_id}")
async def admin_delete_announcement(ann_id: str, current_user: dict = Depends(get_current_user)):
    result = await db.announcements.delete_one({"id": ann_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Announcement not found")
    return {"message": "Announcement deleted successfully"}

# Partners CRUD
@api_router.get("/partners", response_model=List[Partner])
async def get_partners():
    try:
        partners = await db.partners.find({}, {"_id": 0}).sort("priority", 1).to_list(100)
        if not partners:
            # Return default partners
            default_partners = [
                {
                    "id": "1",
                    "name": "Amazon Web Services",
                    "logo_url": "https://res.cloudinary.com/demo/image/upload/v1621234567/aws-logo.png",
                    "website": "https://aws.amazon.com",
                    "priority": 1
                },
                {
                    "id": "2",
                    "name": "Microsoft Azure",
                    "logo_url": "https://res.cloudinary.com/demo/image/upload/v1621234567/azure-logo.png",
                    "website": "https://azure.microsoft.com",
                    "priority": 2
                },
                {
                    "id": "3",
                    "name": "Google Cloud",
                    "logo_url": "https://res.cloudinary.com/demo/image/upload/v1621234567/gcp-logo.png",
                    "website": "https://cloud.google.com",
                    "priority": 3
                },
                {
                    "id": "4",
                    "name": "IBM Cloud",
                    "logo_url": "https://res.cloudinary.com/demo/image/upload/v1621234567/ibm-cloud-logo.png",
                    "website": "https://www.ibm.com/cloud",
                    "priority": 4
                },
                {
                    "id": "5",
                    "name": "Oracle Cloud",
                    "logo_url": "https://res.cloudinary.com/demo/image/upload/v1621234567/oracle-cloud-logo.png",
                    "website": "https://www.oracle.com/cloud/",
                    "priority": 5
                },
                {
                    "id": "6",
                    "name": "Salesforce",
                    "logo_url": "https://res.cloudinary.com/demo/image/upload/v1621234567/salesforce-logo.png",
                    "website": "https://www.salesforce.com",
                    "priority": 6
                }
            ]
            return default_partners
        return partners
    except Exception as e:
        # If there's an error accessing the database, return default partners
        logger.error(f"Error fetching partners: {e}")
        default_partners = [
            {
                "id": "1",
                "name": "Amazon Web Services",
                "logo_url": "https://res.cloudinary.com/demo/image/upload/v1621234567/aws-logo.png",
                "website": "https://aws.amazon.com",
                "priority": 1
            },
            {
                "id": "2",
                "name": "Microsoft Azure",
                "logo_url": "https://res.cloudinary.com/demo/image/upload/v1621234567/azure-logo.png",
                "website": "https://azure.microsoft.com",
                "priority": 2
            },
            {
                "id": "3",
                "name": "Google Cloud",
                "logo_url": "https://res.cloudinary.com/demo/image/upload/v1621234567/gcp-logo.png",
                "website": "https://cloud.google.com",
                "priority": 3
            },
            {
                "id": "4",
                "name": "IBM Cloud",
                "logo_url": "https://res.cloudinary.com/demo/image/upload/v1621234567/ibm-cloud-logo.png",
                "website": "https://www.ibm.com/cloud",
                "priority": 4
            },
            {
                "id": "5",
                "name": "Oracle Cloud",
                "logo_url": "https://res.cloudinary.com/demo/image/upload/v1621234567/oracle-cloud-logo.png",
                "website": "https://www.oracle.com/cloud/",
                "priority": 5
            },
            {
                "id": "6",
                "name": "Salesforce",
                "logo_url": "https://res.cloudinary.com/demo/image/upload/v1621234567/salesforce-logo.png",
                "website": "https://www.salesforce.com",
                "priority": 6
            }
        ]
        return default_partners

@admin_router.get("/partners", response_model=List[Partner])
async def admin_get_partners(current_user: dict = Depends(get_current_user)):
    try:
        partners = await db.partners.find({}, {"_id": 0}).sort("priority", 1).to_list(100)
        return partners
    except Exception as e:
        logger.error(f"Error fetching partners for admin: {e}")
        return []

@admin_router.post("/partners", response_model=Partner)
async def admin_create_partner(partner_data: PartnerCreate, current_user: dict = Depends(get_current_user)):
    # Check if partners collection exists, if not it will be created automatically
    try:
        partner = Partner(**partner_data.model_dump())
        doc = partner.model_dump()
        await db.partners.insert_one(doc)
        return partner
    except Exception as e:
        logger.error(f"Error creating partner: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to create partner: {str(e)}")

@admin_router.put("/partners/{partner_id}", response_model=Partner)
async def admin_update_partner(partner_id: str, partner_data: PartnerUpdate, current_user: dict = Depends(get_current_user)):
    try:
        existing = await db.partners.find_one({"id": partner_id})
        if not existing:
            raise HTTPException(status_code=404, detail="Partner not found")
        
        update_data = {k: v for k, v in partner_data.model_dump().items() if v is not None}
        await db.partners.update_one({"id": partner_id}, {"$set": update_data})
        
        updated = await db.partners.find_one({"id": partner_id}, {"_id": 0})
        return Partner(**updated)
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating partner: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to update partner: {str(e)}")

@admin_router.delete("/partners/{partner_id}")
async def admin_delete_partner(partner_id: str, current_user: dict = Depends(get_current_user)):
    try:
        result = await db.partners.delete_one({"id": partner_id})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Partner not found")
        return {"message": "Partner deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting partner: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to delete partner: {str(e)}")

# ===================== JOBS/CAREERS ENDPOINTS =====================

# Public endpoints
@api_router.get("/jobs", response_model=List[Job])
async def get_active_jobs():
    try:
        jobs = await db.jobs.find({"active": True}, {"_id": 0}).sort("created_at", -1).to_list(100)
        return jobs
    except Exception as e:
        logger.error(f"Error fetching jobs: {e}")
        return []

@api_router.post("/jobs/apply")
async def submit_job_application(
    job_id: str,
    job_title: str,
    name: str,
    email: str,
    phone: str,
    cover_letter: str = None,
    linkedin_url: str = None,
    portfolio_url: str = None,
    resume: UploadFile = File(...)
):
    """Submit job application with resume upload to Cloudinary"""
    try:
        # Validate file type
        if not resume.content_type.startswith('application/'):
            raise HTTPException(status_code=400, detail="Only PDF, DOC, or DOCX files are allowed")
        
        # Validate file size (max 5MB)
        contents = await resume.read()
        if len(contents) > 5 * 1024 * 1024:
            raise HTTPException(status_code=400, detail="File size must be less than 5MB")
        
        # Upload resume to Cloudinary
        if CLOUDINARY_ENABLED:
            try:
                result = cloudinary.uploader.upload(
                    contents,
                    folder="resumes",
                    resource_type="raw",
                    public_id=f"{name.replace(' ', '_')}_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
                )
                resume_url = result["secure_url"]
            except Exception as e:
                logger.error(f"Cloudinary upload error: {e}")
                raise HTTPException(status_code=500, detail="Failed to upload resume")
        else:
            raise HTTPException(status_code=503, detail="Resume upload service not configured")
        
        # Create application record
        application = JobApplication(
            job_id=job_id,
            job_title=job_title,
            name=name,
            email=email,
            phone=phone,
            resume_url=resume_url,
            cover_letter=cover_letter,
            linkedin_url=linkedin_url,
            portfolio_url=portfolio_url
        )
        
        doc = application.model_dump()
        await db.job_applications.insert_one(doc)
        
        return {"message": "Application submitted successfully", "application_id": application.id}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error submitting job application: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to submit application: {str(e)}")

# Admin endpoints
@admin_router.get("/jobs", response_model=List[Job])
async def admin_get_all_jobs(current_user: dict = Depends(get_current_user)):
    try:
        jobs = await db.jobs.find({}, {"_id": 0}).sort("created_at", -1).to_list(100)
        return jobs
    except Exception as e:
        logger.error(f"Error fetching jobs for admin: {e}")
        return []

@admin_router.post("/jobs", response_model=Job)
async def admin_create_job(job_data: JobCreate, current_user: dict = Depends(get_current_user)):
    try:
        job = Job(**job_data.model_dump())
        doc = job.model_dump()
        await db.jobs.insert_one(doc)
        return job
    except Exception as e:
        logger.error(f"Error creating job: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to create job: {str(e)}")

@admin_router.put("/jobs/{job_id}", response_model=Job)
async def admin_update_job(job_id: str, job_data: JobCreate, current_user: dict = Depends(get_current_user)):
    try:
        existing = await db.jobs.find_one({"id": job_id})
        if not existing:
            raise HTTPException(status_code=404, detail="Job not found")
        
        update_data = job_data.model_dump()
        await db.jobs.update_one({"id": job_id}, {"$set": update_data})
        
        updated = await db.jobs.find_one({"id": job_id}, {"_id": 0})
        return Job(**updated)
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating job: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to update job: {str(e)}")

@admin_router.delete("/jobs/{job_id}")
async def admin_delete_job(job_id: str, current_user: dict = Depends(get_current_user)):
    try:
        result = await db.jobs.delete_one({"id": job_id})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Job not found")
        return {"message": "Job deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting job: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to delete job: {str(e)}")

@admin_router.get("/job-applications", response_model=List[JobApplication])
async def admin_get_job_applications(current_user: dict = Depends(get_current_user)):
    try:
        applications = await db.job_applications.find({}, {"_id": 0}).sort("applied_at", -1).to_list(500)
        return applications
    except Exception as e:
        logger.error(f"Error fetching job applications: {e}")
        return []

@admin_router.put("/job-applications/{application_id}/status")
async def admin_update_application_status(
    application_id: str,
    status: str,
    current_user: dict = Depends(get_current_user)
):
    try:
        valid_statuses = ["new", "reviewing", "interview", "rejected", "accepted"]
        if status not in valid_statuses:
            raise HTTPException(status_code=400, detail=f"Invalid status. Must be one of: {', '.join(valid_statuses)}")
        
        result = await db.job_applications.update_one(
            {"id": application_id},
            {"$set": {"status": status}}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Application not found")
        
        return {"message": "Application status updated successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating application status: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to update status: {str(e)}")

# Cloudinary Upload Endpoint
@admin_router.post("/upload-image")
async def upload_image_to_cloudinary(file: UploadFile = File(...), folder: str = "partners", current_user: dict = Depends(get_current_user)):
    # Check if Cloudinary is enabled
    if not CLOUDINARY_ENABLED:
        raise HTTPException(status_code=404, detail="Cloudinary upload not configured")
    
    try:
        # Read the file content
        contents = await file.read()
        
        # Upload to Cloudinary
        result = cloudinary.uploader.upload(
            contents,
            folder=folder,
            resource_type="image"
        )
        
        return {
            "url": result["secure_url"],
            "public_id": result["public_id"],
            "format": result["format"],
            "width": result["width"],
            "height": result["height"]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Upload failed: {str(e)}")

# Include the routers in the main app
app.include_router(api_router)
app.include_router(admin_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()