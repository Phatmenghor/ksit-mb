#!/bin/bash

# ========================================================================
# 🚀 FULL DEPLOYMENT SCRIPT FOR KSIT MOBILE
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

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_success() {
    echo -e "${CYAN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Load environment variables from .env.production
load_env_vars() {
    if [ -f ".env.production" ]; then
        print_status "Loading environment from .env.production..."
        set -a
        source .env.production
        set +a
        print_success "Environment loaded successfully"
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
    echo -e "${PURPLE}🚀 KSIT MOBILE FULL DEPLOYMENT${NC}"
    echo -e "${PURPLE}============================================${NC}"
    echo -e "${CYAN}App Name:${NC} ${APP_NAME}"
    echo -e "${CYAN}Port:${NC} ${EXTERNAL_PORT}"
    echo -e "${CYAN}Environment:${NC} ${NODE_ENV}"
    echo -e "${CYAN}Git Branch:${NC} ${GIT_BRANCH}"
    echo -e "${CYAN}Git Repository:${NC} ${GIT_REPO_URL}"
    echo -e "${PURPLE}============================================${NC}"
    echo ""
}

# Pull latest code from git
pull_code() {
    print_status "🔄 Pulling latest code from Git branch '${GIT_BRANCH}'..."
    
    if [ -z "$GIT_REPO_URL" ]; then
        print_error "No Git repository URL found in .env.production"
        exit 1
    fi
    
    # Setup git credentials if provided
    if [ ! -z "$GIT_USERNAME" ] && [ ! -z "$GIT_PASSWORD" ]; then
        print_status "Setting up git credentials..."
        git config --global credential.helper store
        git config --global user.email "${GIT_USERNAME}@users.noreply.github.com"
        git config --global user.name "${GIT_USERNAME}"
        
        # Create credentials file
        echo "https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com" > ~/.git-credentials
        
        # Prepare authenticated URL
        if [[ "$GIT_REPO_URL" == https* ]]; then
            REPO_PART=$(echo "$GIT_REPO_URL" | sed 's|https://github.com/||')
            GIT_URL_WITH_CREDS="https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/${REPO_PART}"
        else
            GIT_URL_WITH_CREDS="https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/${GIT_REPO_URL}"
        fi
        
        export GIT_ASKPASS=/bin/true
        export SSH_ASKPASS=/bin/true
        export GIT_TERMINAL_PROMPT=0
        
        print_success "Git credentials configured"
    else
        GIT_URL_WITH_CREDS="$GIT_REPO_URL"
    fi
    
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
    print_status "📦 Installing Next.js with --force..."
    npm i next --force
    
    if [ $? -ne 0 ]; then
        print_error "Failed to install Next.js"
        exit 1
    fi
    print_success "Next.js installed successfully"
}

# Build project
build_project() {
    print_status "🔨 Building Next.js project..."
    npm run build
    
    if [ $? -ne 0 ]; then
        print_error "Build failed"
        exit 1
    fi
    print_success "Build completed successfully"
}

# Setup PM2
setup_pm2() {
    # Create logs directory
    print_status "📁 Creating logs directory..."
    mkdir -p logs
    print_success "Logs directory created"
    
    # Stop and delete existing PM2 process
    print_status "🛑 Stopping and deleting existing PM2 process..."
    pm2 stop ksit 2>/dev/null || true
    pm2 delete ksit 2>/dev/null || true
    print_success "Existing PM2 process removed"
    
    # Create PM2 configuration
    print_status "⚙️ Creating PM2 configuration..."
    cat > pm2.config.js << 'EOF'
module.exports = {
  apps: [
    {
      name: 'ksit',
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
      listen_timeout: 10000
    }
  ]
};
EOF
    print_success "PM2 configuration created"
    
    # Start PM2 process
    print_status "🚀 Starting PM2 process..."
    pm2 start pm2.config.js
    
    if [ $? -ne 0 ]; then
        print_error "Failed to start PM2 process"
        exit 1
    fi
    
    # Save PM2 configuration
    print_status "💾 Saving PM2 configuration..."
    pm2 save
    
    print_success "🎉 Deployment completed! App running on http://152.42.219.13:8443"
}

# Main deployment function - Full deployment without questions
deploy() {
    print_status "🚀 Starting FULL deployment process..."
    echo ""
    
    # Step 1: Pull code from git
    pull_code
    echo ""
    
    # Step 2: Install dependencies
    install_dependencies
    echo ""
    
    # Step 3: Build project
    build_project
    echo ""
    
    # Step 4: Setup PM2
    setup_pm2
}

# Show deployment summary
show_deployment_summary() {
    echo ""
    echo -e "${PURPLE}============================================${NC}"
    echo -e "${PURPLE}🎉 FULL DEPLOYMENT COMPLETED!${NC}"
    echo -e "${PURPLE}============================================${NC}"
    echo -e "${YELLOW}📱 Application URLs:${NC}"
    echo -e "  ${BLUE}Frontend:${NC} http://152.42.219.13:8443"
    echo -e "  ${BLUE}Backend API:${NC} http://152.42.219.13:9090"
    echo -e "  ${BLUE}Swagger UI:${NC} http://152.42.219.13:9090/swagger-ui/swagger-ui/index.html"
    echo -e "${PURPLE}============================================${NC}"
    echo -e "${YELLOW}📋 Useful Commands:${NC}"
    echo -e "  ${BLUE}pm2 logs ksit${NC}     - View logs"
    echo -e "  ${BLUE}pm2 restart ksit${NC}  - Restart app"
    echo -e "  ${BLUE}pm2 stop ksit${NC}     - Stop app"
    echo -e "  ${BLUE}pm2 status${NC}        - Check status"
    echo -e "  ${BLUE}pm2 monit${NC}         - Monitor resources"
    echo -e "${PURPLE}============================================${NC}"
}

# Handle script interruption
trap 'echo -e "\n${RED}⚠️  Deployment interrupted!${NC}"; exit 1' INT TERM

# Main execution
main() {
    show_banner
    deploy
    show_deployment_summary
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "No package.json found. Please run this script from your project root directory."
    exit 1
fi

# Run main function
main "$@"