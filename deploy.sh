#!/bin/bash

# ========================================================================
# 🔧 CUSTOMIZABLE VARIABLES - CHANGE THESE FOR YOUR PROJECT
# ========================================================================
APP_NAME="ksit"
NODE_VERSION="18"
BUILD_COMMAND="npm run build"
START_COMMAND="npm start"
PM2_INSTANCES=1
MEMORY_LIMIT="1G"

# ========================================================================
# 🚀 SMART DEPLOYMENT SCRIPT FOR NEXT.JS WITH PM2
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

# Load environment variables from .env.production
load_env_vars() {
    if [ -f ".env.production" ]; then
        set -a
        print_status "Loading environment from .env.production..."
        while IFS= read -r line; do
            if [[ ! -z "$line" && ! "$line" =~ ^[[:space:]]*# ]]; then
                if [[ "$line" =~ ^[A-Za-z_][A-Za-z0-9_]*= ]]; then
                    # Remove any trailing whitespace and carriage returns
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

# Initialize environment and display configuration
init_environment() {
    load_env_vars
    
    # Use environment variables from .env.production (no fallback defaults)
    # These will be loaded from your .env.production file
    echo ""
    echo -e "${PURPLE}============================================${NC}"
    echo -e "${PURPLE}🚀 STARTING KSIT FRONTEND DEPLOYMENT${NC}"
    echo -e "${PURPLE}============================================${NC}"
    echo "APP_NAME: $APP_NAME"
    echo "FRONTEND_PORT: $EXTERNAL_PORT"
    echo "PM2_PORT: $PORT"
    echo "NODE_ENV: $NODE_ENV"
    echo "GIT_BRANCH: $GIT_BRANCH"
    echo "NEXT_PUBLIC_API_BASE_URL: $NEXT_PUBLIC_API_BASE_URL"
    echo "NODE_OPTIONS: $NODE_OPTIONS"
    echo "GIT_USERNAME: $GIT_USERNAME"
    echo -e "${PURPLE}============================================${NC}"
}

command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
check_prerequisites() {
    print_status "Checking prerequisites..."
    
    # Check Node.js
    if ! command_exists node; then
        print_status "Installing Node.js ${NODE_VERSION}..."
        curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | sudo -E bash -
        sudo apt-get install -y nodejs
    fi
    print_success "Node.js $(node --version) is available"
    
    # Check npm
    if ! command_exists npm; then
        print_error "npm is not available"
        exit 1
    fi
    print_success "npm $(npm --version) is available"
    
    # Check PM2
    if ! command_exists pm2; then
        print_status "Installing PM2..."
        npm install -g pm2
    fi
    print_success "PM2 is available"
    
    # Check Git
    if ! command_exists git; then
        print_status "Installing Git..."
        sudo apt-get update
        sudo apt-get install -y git
    fi
    print_success "Git is available"
}

# Setup git credentials with token
setup_git_credentials() {
    print_status "Setting up git credentials with token..."
    
    # Configure git to use token authentication
    git config --global credential.helper store
    git config --global user.email "${GIT_USERNAME}@users.noreply.github.com"
    git config --global user.name "${GIT_USERNAME}"
    
    # For GitHub, use token as password
    if [[ "$GIT_REPO_URL" == https* ]]; then
        REST_URL=$(echo "$GIT_REPO_URL" | sed 's|https://||')
        GIT_URL_WITH_CREDS="https://${GIT_USERNAME}:${GIT_PASSWORD}@${REST_URL}"
    else
        GIT_URL_WITH_CREDS="https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/${GIT_REPO_URL}"
    fi
    
    # Store credentials
    echo "https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com" > ~/.git-credentials
    
    export GIT_ASKPASS=/bin/true
    export SSH_ASKPASS=/bin/true
    export GIT_TERMINAL_PROMPT=0
    
    print_success "Git credentials configured with token"
}

# Pull latest code
pull_code() {
    print_status "Pulling latest code from Git..."
    
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
}

# Install dependencies
install_dependencies() {
    print_status "Installing dependencies..."
    
    npm cache clean --force
    # rm -rf node_modules package-lock.json
    npm install --force

    if [ $? -eq 0 ]; then
        print_success "Dependencies installed successfully"
    else
        print_error "Failed to install dependencies"
        exit 1
    fi
}

# Build project with proper environment variables
build_project() {
    print_status "Building Next.js project..."
    
    # Clean previous build
    rm -rf .next
    
    # Reload environment variables to ensure they're available during build
    load_env_vars
    
    # Print environment variables for debugging
    print_status "Build environment variables:"
    echo "NODE_ENV: $NODE_ENV"
    echo "NEXT_PUBLIC_NODE_ENV: $NEXT_PUBLIC_NODE_ENV"
    echo "NEXT_PUBLIC_API_BASE_URL: $NEXT_PUBLIC_API_BASE_URL"
    echo "BACKEND_API_URL: $BACKEND_API_URL"
    echo "NEXT_TELEMETRY_DISABLED: $NEXT_TELEMETRY_DISABLED"
    echo "NODE_OPTIONS: $NODE_OPTIONS"
    echo "ENABLE_HOT_RELOAD: $ENABLE_HOT_RELOAD"
    echo "ENABLE_SOURCE_MAPS: $ENABLE_SOURCE_MAPS"
    echo "ANALYZE: $ANALYZE"
    echo "LOG_LEVEL: $LOG_LEVEL"
    echo "DEBUG_MODE: $DEBUG_MODE"
    echo "SECURE_COOKIES: $SECURE_COOKIES"
    echo "TRUST_PROXY: $TRUST_PROXY"
    
    # Build with all environment variables explicitly passed
    print_status "Running build command: ${BUILD_COMMAND}"
    
    # Use env to ensure all environment variables are passed to the build process
    if env \
        NODE_ENV="$NODE_ENV" \
        NEXT_PUBLIC_NODE_ENV="$NEXT_PUBLIC_NODE_ENV" \
        NEXT_PUBLIC_API_BASE_URL="$NEXT_PUBLIC_API_BASE_URL" \
        BACKEND_API_URL="$BACKEND_API_URL" \
        NODE_OPTIONS="$NODE_OPTIONS" \
        ENABLE_HOT_RELOAD="$ENABLE_HOT_RELOAD" \
        ENABLE_SOURCE_MAPS="$ENABLE_SOURCE_MAPS" \
        NEXT_TELEMETRY_DISABLED="$NEXT_TELEMETRY_DISABLED" \
        ANALYZE="$ANALYZE" \
        LOG_LEVEL="$LOG_LEVEL" \
        DEBUG_MODE="$DEBUG_MODE" \
        SECURE_COOKIES="$SECURE_COOKIES" \
        TRUST_PROXY="$TRUST_PROXY" \
        ${BUILD_COMMAND}; then
        print_success "Build completed successfully"
    else
        print_error "Build failed with exit code $?"
        print_error "Checking for common build issues..."
        
        # Check if .env.production exists and is readable
        if [ ! -f ".env.production" ]; then
            print_error ".env.production file not found"
        elif [ ! -r ".env.production" ]; then
            print_error ".env.production file is not readable"
        fi
        
        # Check if node_modules exists
        if [ ! -d "node_modules" ]; then
            print_error "node_modules directory not found"
        fi
        
        # Check if package.json exists
        if [ ! -f "package.json" ]; then
            print_error "package.json not found"
        fi
        
        # Show last few lines of npm debug log if it exists
        if [ -f "npm-debug.log" ]; then
            print_error "Last 10 lines of npm-debug.log:"
            tail -10 npm-debug.log
        fi
        
        exit 1
    fi
}

# Create PM2 configuration
create_pm2_config() {
    print_status "Creating PM2 ecosystem file..."
    
    mkdir -p logs
    
    cat > pm2.config.js << PMEOF
module.exports = {
  apps: [
    {
      name: '${APP_NAME}',
      script: 'npm',
      args: 'start',
      instances: ${PM2_INSTANCES},
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
      max_memory_restart: '${MEMORY_LIMIT}',
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
        LOG_LEVEL: '${LOG_LEVEL}',
        DEBUG_MODE: '${DEBUG_MODE}',
        SECURE_COOKIES: '${SECURE_COOKIES}',
        TRUST_PROXY: '${TRUST_PROXY}'
      }
    }
  ]
};
PMEOF
    
    print_success "PM2 configuration created"
}

# Manage PM2 process
manage_pm2() {
    print_status "Managing PM2 process..."
    
    if pm2 list | grep -q "${APP_NAME}"; then
        print_status "Stopping existing PM2 process..."
        pm2 stop ${APP_NAME}
        pm2 delete ${APP_NAME}
    fi
    
    print_status "Starting PM2 process..."
    pm2 start pm2.config.js
    
    if [ $? -eq 0 ]; then
        print_success "PM2 process started successfully"
    else
        print_error "Failed to start PM2 process"
        exit 1
    fi
    
    pm2 save
    print_status "PM2 Status:"
    pm2 status
}

# Setup PM2 startup
setup_pm2_startup() {
    if [ "${PM2_STARTUP:-true}" = "true" ]; then
        print_status "Setting up PM2 startup..."
        pm2 startup
        pm2 save
        print_success "PM2 startup configured"
    fi
}

# Health check
health_check() {
    print_status "Performing health check..."
    sleep 10
    
    if command_exists netstat; then
        if netstat -tlnp 2>/dev/null | grep ":${PORT}" >/dev/null; then
            print_success "Application is running on port ${PORT}"
        else
            print_warning "Application might not be running on port ${PORT}"
        fi
    fi
    
    if pm2 list | grep -q "${APP_NAME}.*online"; then
        print_success "PM2 process is running"
    else
        print_warning "PM2 process status unknown"
    fi
}

# Show deployment summary
show_deployment_summary() {
    echo ""
    echo -e "${PURPLE}============================================${NC}"
    echo -e "${PURPLE}🎉 DEPLOYMENT COMPLETED SUCCESSFULLY!${NC}"
    echo -e "${PURPLE}============================================${NC}"
    echo -e "${CYAN}App Name: ${APP_NAME}${NC}"
    echo -e "${CYAN}Frontend Port: ${EXTERNAL_PORT}${NC}"
    echo -e "${CYAN}PM2 Internal Port: ${PORT}${NC}"
    echo -e "${CYAN}Environment: ${NODE_ENV}${NC}"
    echo -e "${CYAN}Git Branch: ${GIT_BRANCH}${NC}"
    echo -e "${CYAN}API Base URL: ${NEXT_PUBLIC_API_BASE_URL}${NC}"
    echo -e "${CYAN}Backend API: ${BACKEND_API_URL}${NC}"
    echo -e "${CYAN}Frontend URL: http://152.42.219.13:${EXTERNAL_PORT}${NC}"
    echo -e "${CYAN}Backend API: http://152.42.219.13:9090${NC}"
    echo -e "${CYAN}Swagger UI: http://152.42.219.13:9090/swagger-ui/swagger-ui/index.html${NC}"
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
    init_environment
    check_prerequisites
    pull_code
    install_dependencies
    build_project
    create_pm2_config
    manage_pm2
    health_check
    setup_pm2_startup
    show_deployment_summary
}

# Handle interruption
trap 'echo -e "\n${RED}⚠️  Deployment interrupted!${NC}"; exit 1' INT TERM

# Ensure we're in the right directory
if [ ! -f "package.json" ] && [ ! -d ".git" ]; then
    print_status "No package.json found. This might be the first deployment."
fi

# Run main function
main "$@"