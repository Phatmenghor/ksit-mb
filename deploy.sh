#!/bin/bash

# ========================================================================
# 🚀 STREAMLINED DEPLOYMENT SCRIPT FOR KSIT MOBILE
# ========================================================================

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

# Global variables for deployment choices
USE_GIT=false
INSTALL_DEPS=false
BUILD_PROJECT=false
START_PM2=false

print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_success() {
    echo -e "${CYAN}[SUCCESS]${NC} $1"
}

command_exists() {
    command -v "$1" >/dev/null 2>&1
}

ask_yes_no() {
    while true; do
        read -p "$(echo -e "${BLUE}$1 (y/n):${NC} ")" yn
        case $yn in
            [Yy]* ) return 0;;
            [Nn]* ) return 1;;
            * ) echo "Please answer yes or no.";;
        esac
    done
}

# Load environment variables from .env.production
load_env_vars() {
    if [ -f ".env.production" ]; then
        set -a
        print_status "Loading environment from .env.production..."
        while IFS= read -r line; do
            if [[ ! -z "$line" && ! "$line" =~ ^[[:space:]]*# ]]; then
                if [[ "$line" =~ ^[A-Za-z_][A-Za-z0-9_]*= ]]; then
                    clean_line=$(echo "$line" | tr -d '\r' | sed 's/[[:space:]]*$//')
                    echo "Exporting: $clean_line"
                    export "$clean_line"
                fi
            fi
        done < .env.production
        set +a
        print_success "Environment loaded from .env.production"
    else
        print_error "No .env.production file found!"
        exit 1
    fi
}

# Show deployment banner
show_banner() {
    load_env_vars
    
    echo ""
    echo -e "${PURPLE}============================================${NC}"
    echo -e "${PURPLE}🚀 KSIT MOBILE DEPLOYMENT SCRIPT${NC}"
    echo -e "${PURPLE}============================================${NC}"
    echo -e "${CYAN}App Name:${NC} ${APP_NAME}"
    echo -e "${CYAN}Frontend Port:${NC} ${EXTERNAL_PORT}"
    echo -e "${CYAN}PM2 Port:${NC} ${PORT}"
    echo -e "${CYAN}Environment:${NC} ${NODE_ENV}"
    echo -e "${CYAN}Git Branch:${NC} ${GIT_BRANCH}"
    echo -e "${CYAN}Git Repository:${NC} ${GIT_REPO_URL}"
    echo -e "${PURPLE}============================================${NC}"
    echo ""
}

# Ask deployment questions
ask_deployment_questions() {
    show_banner
    
    print_status "What would you like to deploy today?"
    echo ""
    
    # Ask about Git operations
    if [ ! -z "$GIT_REPO_URL" ]; then
        if ask_yes_no "🔄 Pull latest code from Git branch '${GIT_BRANCH}'?"; then
            USE_GIT=true
            print_success "✅ Will pull from Git"
        else
            print_warning "❌ Skip Git operations"
        fi
    else
        print_warning "❌ No Git configuration found - skipping Git operations"
    fi
    
    echo ""
    
    # Ask about dependency installation
    if ask_yes_no "📦 Install/update dependencies with npm install --force?"; then
        INSTALL_DEPS=true
        print_success "✅ Will install dependencies"
    else
        print_warning "❌ Skip dependency installation"
    fi
    
    echo ""
    
    # Ask about building
    if ask_yes_no "🔨 Build Next.js project with npm run build?"; then
        BUILD_PROJECT=true
        print_success "✅ Will build project"
    else
        print_warning "❌ Skip build step"
    fi
    
    echo ""
    
    # Ask about PM2
    if ask_yes_no "🚀 Start/restart application with PM2?"; then
        START_PM2=true
        print_success "✅ Will start with PM2"
    else
        print_warning "❌ Skip PM2 startup"
    fi
    
    echo ""
    echo -e "${YELLOW}📋 DEPLOYMENT PLAN:${NC}"
    if [ "$USE_GIT" = true ]; then
        echo -e "  ${GREEN}✅ Pull code from Git (${GIT_BRANCH})${NC}"
    else
        echo -e "  ${RED}❌ Skip Git operations${NC}"
    fi
    
    if [ "$INSTALL_DEPS" = true ]; then
        echo -e "  ${GREEN}✅ Install dependencies (npm install --force)${NC}"
    else
        echo -e "  ${RED}❌ Skip dependency installation${NC}"
    fi
    
    if [ "$BUILD_PROJECT" = true ]; then
        echo -e "  ${GREEN}✅ Build Next.js project (npm run build)${NC}"
    else
        echo -e "  ${RED}❌ Skip build step${NC}"
    fi
    
    if [ "$START_PM2" = true ]; then
        echo -e "  ${GREEN}✅ Start with PM2${NC}"
    else
        echo -e "  ${RED}❌ Skip PM2 startup${NC}"
    fi
    
    echo ""
    if ask_yes_no "🚀 Continue with this deployment plan?"; then
        print_success "Starting deployment..."
        echo ""
    else
        print_warning "Deployment cancelled by user."
        exit 0
    fi
}

# Check prerequisites
check_prerequisites() {
    print_status "Checking prerequisites..."
    
    if ! command_exists node; then
        print_error "Node.js is not installed!"
        exit 1
    fi
    print_success "Node.js $(node --version) is available"
    
    if ! command_exists npm; then
        print_error "npm is not installed!"
        exit 1
    fi
    print_success "npm $(npm --version) is available"
    
    if [ "$START_PM2" = true ] && ! command_exists pm2; then
        print_error "PM2 is not installed!"
        if ask_yes_no "Install PM2 globally?"; then
            npm install -g pm2
        else
            print_error "PM2 is required for startup. Exiting."
            exit 1
        fi
    fi
    
    if [ "$USE_GIT" = true ] && ! command_exists git; then
        print_error "Git is not installed!"
        exit 1
    fi
    
    print_success "All prerequisites met"
}

# Setup git credentials
setup_git_credentials() {
    print_status "Setting up git credentials..."
    
    git config --global credential.helper store
    git config --global user.email "${GIT_USERNAME}@users.noreply.github.com"
    git config --global user.name "${GIT_USERNAME}"
    
    if [[ "$GIT_REPO_URL" == https* ]]; then
        REPO_PART=$(echo "$GIT_REPO_URL" | sed 's|https://github.com/||')
        GIT_URL_WITH_CREDS="https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/${REPO_PART}"
    else
        GIT_URL_WITH_CREDS="https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/${GIT_REPO_URL}"
    fi
    
    echo "https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com" > ~/.git-credentials
    
    export GIT_ASKPASS=/bin/true
    export SSH_ASKPASS=/bin/true
    export GIT_TERMINAL_PROMPT=0
    
    print_success "Git credentials configured"
}

# Pull latest code from git
pull_code() {
    if [ "$USE_GIT" = true ]; then
        print_status "🔄 Pulling latest code from Git..."
        
        setup_git_credentials
        
        if [ ! -d ".git" ]; then
            print_status "Cloning repository..."
            git clone "$GIT_URL_WITH_CREDS" .
            git checkout ${GIT_BRANCH}
            print_success "Repository cloned successfully"
        else
            print_status "Fetching latest changes from branch: ${GIT_BRANCH}..."
            git remote set-url origin "$GIT_URL_WITH_CREDS"
            git fetch origin ${GIT_BRANCH}
            
            LOCAL=$(git rev-parse HEAD 2>/dev/null || echo "no-local")
            REMOTE=$(git rev-parse origin/${GIT_BRANCH} 2>/dev/null || echo "no-remote")
            
            if [ "$LOCAL" = "$REMOTE" ]; then
                print_status "Code is already up to date"
            else
                print_status "Pulling latest changes..."
                git reset --hard origin/${GIT_BRANCH}
                git pull origin ${GIT_BRANCH}
                print_success "Code updated successfully"
            fi
        fi
    else
        print_status "🔄 Skipping Git operations"
    fi
}

# Install dependencies with force
install_dependencies() {
    if [ "$INSTALL_DEPS" = true ]; then
        print_status "📦 Installing dependencies with --force..."
        
        # Install Next.js specifically first (matching your manual process)
        print_status "Installing Next.js with --force..."
        npm install next --force
        
        if [ $? -ne 0 ]; then
            print_error "Failed to install Next.js"
            exit 1
        fi
        
        # Then install all other dependencies
        print_status "Installing all dependencies with --force..."
        npm install --force
        
        if [ $? -eq 0 ]; then
            print_success "Dependencies installed successfully"
        else
            print_error "Failed to install dependencies"
            exit 1
        fi
    else
        print_status "📦 Skipping dependency installation"
        
        # Check if dependencies exist
        if [ ! -d "node_modules" ]; then
            print_error "No node_modules found! Please install dependencies first."
            exit 1
        fi
    fi
}

# Build Next.js project
build_project() {
    if [ "$BUILD_PROJECT" = true ]; then
        print_status "🔨 Building Next.js project..."
        
        # Clean previous build
        if [ -d ".next" ]; then
            print_status "Cleaning previous build..."
            rm -rf .next
        fi
        
        # Reload environment variables to ensure they're fresh
        load_env_vars
        
        # Set essential build environment variables explicitly
        export NODE_ENV=production
        export NEXT_TELEMETRY_DISABLED=1
        
        # Print environment variables being used for build (for debugging)
        print_status "Build environment:"
        echo "NODE_ENV: $NODE_ENV"
        echo "NEXT_PUBLIC_API_BASE_URL: $NEXT_PUBLIC_API_BASE_URL"
        echo "BACKEND_API_URL: $BACKEND_API_URL"
        echo "NODE_OPTIONS: $NODE_OPTIONS"
        
        # Run build with explicit environment variable passing
        print_status "Running: npm run build"
        
        # Build with all environment variables explicitly set
        env \
            NODE_ENV="$NODE_ENV" \
            NEXT_PUBLIC_NODE_ENV="$NEXT_PUBLIC_NODE_ENV" \
            NEXT_PUBLIC_API_BASE_URL="$NEXT_PUBLIC_API_BASE_URL" \
            BACKEND_API_URL="$BACKEND_API_URL" \
            NODE_OPTIONS="$NODE_OPTIONS" \
            NEXT_TELEMETRY_DISABLED="$NEXT_TELEMETRY_DISABLED" \
            ENABLE_HOT_RELOAD="$ENABLE_HOT_RELOAD" \
            ENABLE_SOURCE_MAPS="$ENABLE_SOURCE_MAPS" \
            ANALYZE="$ANALYZE" \
            LOG_LEVEL="$LOG_LEVEL" \
            DEBUG_MODE="$DEBUG_MODE" \
            SECURE_COOKIES="$SECURE_COOKIES" \
            TRUST_PROXY="$TRUST_PROXY" \
            npm run build
        
        if [ $? -eq 0 ]; then
            print_success "Build completed successfully"
        else
            print_error "Build failed"
            print_error "Trying alternative build approach..."
            
            # Fallback: try building without explicit env passing
            npm run build
            
            if [ $? -eq 0 ]; then
                print_success "Build completed with fallback approach"
            else
                print_error "Build failed completely"
                exit 1
            fi
        fi
    else
        print_status "🔨 Skipping build step"
    fi
}

# Create PM2 configuration
create_pm2_config() {
    print_status "Creating PM2 configuration..."
    
    mkdir -p logs
    
    cat > pm2.config.js << EOF
module.exports = {
  apps: [
    {
      name: '${APP_NAME}',
      script: 'npm',
      args: 'start',
      instances: 1,
      exec_mode: 'fork',
      watch: false,
      env_file: '.env.production',
      log_file: './logs/app.log',
      out_file: './logs/out.log',
      error_file: './logs/error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      restart_delay: 4000,
      max_restarts: 10,
      min_uptime: '10s',
      max_memory_restart: '1G',
      autorestart: true,
      kill_timeout: 5000,
      listen_timeout: 10000,
      env: {
        NODE_ENV: '${NODE_ENV}',
        PORT: '${PORT}',
        EXTERNAL_PORT: '${EXTERNAL_PORT}',
        NEXT_PUBLIC_API_BASE_URL: '${NEXT_PUBLIC_API_BASE_URL}',
        BACKEND_API_URL: '${BACKEND_API_URL}',
        NODE_OPTIONS: '${NODE_OPTIONS}',
        NEXT_TELEMETRY_DISABLED: '${NEXT_TELEMETRY_DISABLED}',
        ENABLE_HOT_RELOAD: '${ENABLE_HOT_RELOAD}',
        ENABLE_SOURCE_MAPS: '${ENABLE_SOURCE_MAPS}',
        ANALYZE: '${ANALYZE}',
        LOG_LEVEL: '${LOG_LEVEL}',
        DEBUG_MODE: '${DEBUG_MODE}',
        SECURE_COOKIES: '${SECURE_COOKIES}',
        TRUST_PROXY: '${TRUST_PROXY}'
      }
    }
  ]
};
EOF
    
    print_success "PM2 configuration created"
}

# Start/restart PM2 process
start_pm2() {
    if [ "$START_PM2" = true ]; then
        print_status "🚀 Starting PM2 process..."
        
        create_pm2_config
        
        # Stop existing process if running
        if pm2 list | grep -q "${APP_NAME}"; then
            print_status "Stopping existing PM2 process..."
            pm2 stop ${APP_NAME}
            pm2 delete ${APP_NAME}
        fi
        
        # Start new process
        pm2 start pm2.config.js
        
        if [ $? -eq 0 ]; then
            print_success "PM2 process started successfully"
            pm2 save
            
            # Setup startup if configured
            if [ "${PM2_STARTUP:-true}" = "true" ]; then
                pm2 startup
                pm2 save
            fi
        else
            print_error "Failed to start PM2 process"
            exit 1
        fi
        
        print_status "PM2 Status:"
        pm2 status
    else
        print_status "🚀 Skipping PM2 startup"
    fi
}

# Show deployment summary
show_deployment_summary() {
    echo ""
    echo -e "${PURPLE}============================================${NC}"
    echo -e "${PURPLE}🎉 KSIT MOBILE DEPLOYMENT COMPLETED!${NC}"
    echo -e "${PURPLE}============================================${NC}"
    echo -e "${CYAN}App Name:${NC} ${APP_NAME}"
    echo -e "${CYAN}Frontend Port:${NC} ${EXTERNAL_PORT}"
    echo -e "${CYAN}PM2 Internal Port:${NC} ${PORT}"
    echo -e "${CYAN}Environment:${NC} ${NODE_ENV}"
    echo -e "${CYAN}Git Branch:${NC} ${GIT_BRANCH}"
    echo -e "${PURPLE}============================================${NC}"
    echo -e "${YELLOW}📱 Application URLs:${NC}"
    echo -e "  ${BLUE}Frontend:${NC} http://152.42.219.13:${EXTERNAL_PORT}"
    echo -e "  ${BLUE}Backend API:${NC} http://152.42.219.13:9090"
    echo -e "  ${BLUE}Swagger UI:${NC} http://152.42.219.13:9090/swagger-ui/swagger-ui/index.html"
    echo -e "  ${BLUE}API Flow:${NC} Frontend → ${EXTERNAL_PORT}/api/* → nginx proxy → 9090/api/*"
    echo -e "${PURPLE}============================================${NC}"
    echo -e "${YELLOW}📋 Useful Commands:${NC}"
    echo -e "  ${BLUE}pm2 logs ${APP_NAME}${NC}     - View logs"
    echo -e "  ${BLUE}pm2 restart ${APP_NAME}${NC}  - Restart app"
    echo -e "  ${BLUE}pm2 stop ${APP_NAME}${NC}     - Stop app"
    echo -e "  ${BLUE}pm2 status${NC}              - Check status"
    echo -e "  ${BLUE}pm2 monit${NC}               - Monitor resources"
    echo -e "${PURPLE}============================================${NC}"
}

# Main deployment function
main() {
    # Ask deployment questions first
    ask_deployment_questions
    
    # Check prerequisites
    check_prerequisites
    
    # Execute deployment steps
    pull_code
    install_dependencies
    build_project
    start_pm2
    
    # Show summary
    show_deployment_summary
}

# Handle script interruption
trap 'echo -e "\n${RED}⚠️  Deployment interrupted!${NC}"; exit 1' INT TERM

# Ensure we're in the right directory
if [ ! -f "package.json" ] && [ ! -d ".git" ]; then
    print_status "No package.json found. This might be the first deployment."
fi

# Run main function
main "$@"