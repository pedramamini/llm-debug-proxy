# 🪃 Orchestrator Mode Instructions

## 📋 Project Overview

Transform the existing basic JavaScript LLM debug proxy into a comprehensive Python 3.12-based intelligent LLM proxy ecosystem with AI-powered enhancement, security monitoring, and real-time analytics.

## 🎯 Primary Objective

Build an intelligent LLM proxy that:
- Intercepts and enhances all LLM requests using Claude AI analysis
- Learns from prompt patterns to provide muscle memory intelligence
- Provides comprehensive security monitoring and anomaly detection
- Offers real-time web dashboard with WebSocket updates
- Maintains complete audit trails and analytics
- Supports namespace preservation to prevent tool collisions

## 🏗️ Architecture Summary

**Technology Stack:**
- Backend: Python 3.12 + FastAPI + SQLAlchemy 2.0 + PostgreSQL
- Frontend: React + TypeScript + Shadcn/ui
- AI/ML: Claude via OpenRouter for intelligent analysis
- Real-time: FastAPI WebSockets
- Caching: Redis with async support
- Tasks: Celery for background processing

## 📁 Required Project Structure

```
llm-proxy-python/
├── app/                                 # Python backend
│   ├── main.py                          # FastAPI application
│   ├── core/                            # Core configuration
│   ├── models/                          # SQLAlchemy models
│   ├── api/                             # API routes and middleware
│   ├── services/                        # Business logic services
│   ├── utils/                           # Utilities and helpers
│   ├── websocket/                       # WebSocket management
│   └── tasks/                           # Celery background tasks
├── frontend/                            # React dashboard
│   ├── src/                             # React source code
│   ├── package.json                     # Frontend dependencies
│   └── vite.config.ts                   # Build configuration
├── reference/                           # Original JS/TS code
├── alembic/                             # Database migrations
├── tests/                               # Test suite
├── docker/                              # Docker configuration
├── scripts/                             # Setup and deployment scripts
├── docs/                                # Documentation
├── pyproject.toml                       # Python project config
├── requirements.txt                     # Python dependencies
└── docker-compose.yml                   # Development environment
```

## 🚀 Implementation Phases

### Phase 1: Foundation Setup (Week 1)
**Objective**: Set up Python project structure and core infrastructure

**Tasks:**
1. **Project Migration**
   - Move existing JavaScript code to `reference/` directory
   - Create Python project structure with proper organization
   - Set up Python 3.12 virtual environment
   - Configure pyproject.toml and dependencies

2. **Database Foundation**
   - Set up PostgreSQL with SQLAlchemy 2.0 async support
   - Create base models and database connection
   - Configure Alembic for database migrations
   - Implement initial database schema

3. **FastAPI Application**
   - Create FastAPI application with proper middleware pipeline
   - Set up basic routing structure and health checks
   - Configure CORS, logging, and error handling
   - Add development environment with hot reload

**Deliverables:**
- [ ] Complete Python project structure
- [ ] Working FastAPI server with database connection
- [ ] Initial database schema with migrations
- [ ] Development environment with Docker Compose

### Phase 2: Core Proxy Functionality (Week 2)
**Objective**: Implement core LLM proxy functionality with database logging

**Tasks:**
1. **Proxy Service Implementation**
   - Create core proxy handler for LLM requests
   - Implement request/response logging to database
   - Add namespace preservation for tool calls
   - Build error handling and retry logic

2. **Database Integration**
   - Implement repository pattern for data access
   - Create session management and tracking
   - Add comprehensive request/response logging
   - Build basic analytics data collection

3. **WebSocket Foundation**
   - Implement WebSocket connection manager
   - Create real-time event broadcasting system
   - Add connection lifecycle management
   - Build basic real-time monitoring

**Deliverables:**
- [ ] Working LLM proxy with database logging
- [ ] WebSocket server for real-time updates
- [ ] Session management and tracking
- [ ] Basic proxy functionality matching original features

### Phase 3: Intelligence Engine (Week 3)
**Objective**: Build AI-powered intelligence engine with Claude integration

**Tasks:**
1. **Pattern Recognition System**
   - Implement prompt pattern analysis algorithms
   - Create pattern storage and similarity matching
   - Build pattern classification and frequency tracking
   - Add success rate monitoring

2. **Claude AI Integration**
   - Set up OpenRouter API client for Claude access
   - Implement prompt enhancement suggestion service
   - Create anomaly detection using AI analysis
   - Build feedback processing and learning loops

3. **Enhancement Engine**
   - Create prompt enhancement pipeline
   - Implement A/B testing framework for enhancements
   - Add effectiveness tracking and metrics
   - Build enhancement application logic

**Deliverables:**
- [ ] Pattern recognition engine with database storage
- [ ] Claude integration for AI-powered analysis
- [ ] Prompt enhancement system with effectiveness tracking
- [ ] Learning algorithms that improve over time

### Phase 4: Security & Analytics (Week 4)
**Objective**: Implement comprehensive security monitoring and analytics

**Tasks:**
1. **Security Framework**
   - Build configurable security policy engine
   - Implement AI-powered anomaly detection
   - Create automated threat response system
   - Add comprehensive audit logging

2. **Analytics Engine**
   - Create advanced analytics and reporting system
   - Build performance metrics and monitoring
   - Implement custom dashboard data aggregation
   - Add data export and reporting capabilities

3. **Real-time Monitoring**
   - Complete WebSocket event system
   - Add live security monitoring
   - Implement real-time performance alerts
   - Create dashboard update mechanisms

**Deliverables:**
- [ ] Security policy engine with anomaly detection
- [ ] Comprehensive analytics and reporting system
- [ ] Real-time monitoring with WebSocket updates
- [ ] Audit logging and compliance features

### Phase 5: Frontend Dashboard (Week 5-6)
**Objective**: Build React dashboard with real-time monitoring and management

**Tasks:**
1. **Dashboard Foundation**
   - Set up React with TypeScript and Vite
   - Configure Shadcn/ui component library
   - Implement routing and layout structure
   - Create WebSocket client for real-time updates

2. **Core Dashboard Features**
   - Build real-time request monitoring interface
   - Create analytics visualization with charts
   - Implement pattern management and visualization
   - Add security monitoring dashboard

3. **Advanced Management Interface**
   - Build enhancement management interface
   - Create configuration forms for policies and rules
   - Add interactive data exploration tools
   - Implement responsive design for all screen sizes

**Deliverables:**
- [ ] Complete React dashboard with TypeScript
- [ ] Real-time monitoring interface with WebSocket updates
- [ ] Analytics visualization with interactive charts
- [ ] Management interfaces for all system components

### Phase 6: Testing & Production (Week 7-8)
**Objective**: Comprehensive testing, optimization, and production readiness

**Tasks:**
1. **Testing Suite**
   - Write comprehensive unit tests for all services
   - Create integration tests for API endpoints
   - Add end-to-end tests for critical workflows
   - Implement performance and load testing

2. **Performance Optimization**
   - Optimize database queries and indexing
   - Implement advanced caching strategies
   - Add connection pooling and async optimization
   - Profile and optimize critical code paths

3. **Production Deployment**
   - Create production Docker configuration
   - Add comprehensive error handling and monitoring
   - Implement health checks and observability
   - Create deployment scripts and documentation

**Deliverables:**
- [ ] Comprehensive test suite with 90%+ coverage
- [ ] Performance-optimized system meeting targets
- [ ] Production-ready deployment configuration
- [ ] Complete documentation and deployment guides

## 🎯 Success Criteria

### Technical Requirements
- [ ] System handles 1000+ requests per minute with <200ms overhead
- [ ] Pattern recognition achieves 85%+ accuracy
- [ ] Enhancement suggestions improve success rates by 30%+
- [ ] Security system detects 99%+ of anomalies
- [ ] WebSocket updates with <100ms latency
- [ ] Database operations under 50ms average
- [ ] Frontend loads in <2 seconds

### Functional Requirements
- [ ] Proxy all LLM requests with intelligent enhancement
- [ ] Learn from prompt patterns and provide suggestions
- [ ] Real-time security monitoring and threat detection
- [ ] Comprehensive analytics and reporting
- [ ] Support multiple LLM providers seamlessly
- [ ] Maintain complete audit trails
- [ ] Configurable transformation rules
- [ ] Intuitive web-based management interface

## 🔧 Key Configuration Requirements

### Environment Variables
```bash
# Database
DATABASE_URL=postgresql+asyncpg://user:password@localhost:5432/llm_proxy
REDIS_URL=redis://localhost:6379/0

# API Keys
OPENROUTER_API_KEY=your_openrouter_api_key_here
CLAUDE_MODEL=anthropic/claude-3-sonnet

# Security
SECRET_KEY=your-secret-key-here
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Features
ENABLE_INTELLIGENCE=true
ENABLE_REAL_TIME_ENHANCEMENT=true
ENABLE_ANOMALY_DETECTION=true
ENABLE_PATTERN_LEARNING=true
```

### Core Dependencies
```txt
# Production
fastapi==0.104.1
uvicorn[standard]==0.24.0
sqlalchemy==2.0.23
asyncpg==0.29.0
redis==5.0.1
httpx==0.25.2
pydantic==2.5.0
python-jose[cryptography]==3.3.0
celery==5.3.4
openai==1.3.0
anthropic==0.7.0

# Development
pytest==7.4.3
pytest-asyncio==0.21.1
black==23.11.0
ruff==0.1.6
mypy==1.7.1
```

## 📋 Orchestrator Execution Instructions

**Step 1: Initial Setup**
```
Create the Python 3.12 project structure and move the existing JavaScript code to a reference directory. Set up the development environment with FastAPI, PostgreSQL, and Redis using Docker Compose.
```

**Step 2: Core Infrastructure**
```
Implement the FastAPI application with SQLAlchemy 2.0 models, database migrations, and basic proxy functionality. Create the WebSocket manager for real-time updates.
```

**Step 3: Intelligence Integration**
```
Build the pattern recognition engine and integrate Claude via OpenRouter for AI-powered prompt enhancement and anomaly detection. Implement the learning algorithms.
```

**Step 4: Security & Analytics**
```
Create the security framework with policy engine and anomaly detection. Build the analytics system with comprehensive reporting and real-time monitoring.
```

**Step 5: Frontend Development**
```
Develop the React dashboard with TypeScript and Shadcn/ui. Implement real-time monitoring, analytics visualization, and management interfaces.
```

**Step 6: Testing & Deployment**
```
Create comprehensive test suite, optimize performance, and prepare production deployment with Docker, monitoring, and documentation.
```

## 🎯 Final Deliverable

A complete intelligent LLM proxy ecosystem that transforms basic request forwarding into an AI-powered platform with:
- Muscle memory intelligence that learns from interactions
- Real-time prompt enhancement using Claude AI
- Comprehensive security monitoring and threat detection
- Live web dashboard with analytics and management
- Production-ready deployment with full documentation

The system should demonstrate measurable improvements in LLM interaction quality while providing complete visibility and control over all LLM communications.