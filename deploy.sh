#!/bin/bash

# Smart Deployment Script for Next.js Applications with PM2
# This script automates deployment for any Next.js project using environment variables

set -e  # Exit on any error

# Load environment variables from .env.production file (filtering out comments and problematic lines)
if [ -f ".env.production" ]; then
    set -a
    echo "Loading environment from .env.production..."
    # Filter out comments and lines with special characters that might cause issues
    while IFS= read -r line; do
        # Skip empty lines and comments
        if [[ ! -z "$line" && ! "$line" =~ ^[[:space:]]*# ]]; then
            # Skip lines with emojis or special characters that might cause issues
            if [[ "$line" =~ ^[A-Za-z_][A-Za-z0-9_]*= ]]; then
                echo "Exporting: $line"
                export "$line"
            fi
        fi
    done < .env.production  # ← FIX: Changed from .env to .env.production
    set +a
    echo "✅ Environment loaded from .env.production"
else
    echo "❌ No .env.production file found!"
    exit 1
fi

# Verify environment variables were loaded
echo ""
echo "📋 Loaded Environment Variables:"
echo "APP_NAME=${APP_NAME}"
echo "EXTERNAL_PORT=${EXTERNAL_PORT}"
echo "PORT=${PORT}"
echo "NODE_ENV=${NODE_ENV}"

# Default values if not set in .env.production (these should now work properly)
APP_NAME=${APP_NAME:-nextjs_app}
EXTERNAL_PORT=${EXTERNAL_PORT:-3000}
PORT=${PORT:-3000}
NODE_ENV=${NODE_ENV:-production}
GIT_USERNAME=${GIT_USERNAME}
GIT_PASSWORD=${GIT_PASSWORD}
GIT_REPO_URL=${GIT_REPO_URL}
GIT_BRANCH=${GIT_BRANCH:-main}

echo ""
echo "🔧 Final Configuration:"
echo "APP_NAME: $APP_NAME"
echo "EXTERNAL_PORT: $EXTERNAL_PORT"
echo "PORT: $PORT"
echo "NODE_ENV: $NODE_ENV"
echo "GIT_BRANCH: $GIT_BRANCH"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Global variables for project features
HAS_PRISMA=false
HAS_DATABASE=false
HAS_NEXTJS=false

# Function to print colored output
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

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to ask yes/no question
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

# Function to display deployment banner
show_banner() {
    echo -e "${PURPLE}============================================${NC}"
    echo -e "${PURPLE}SMART DEPLOYMENT SCRIPT${NC}"
    echo -e "${PURPLE}============================================${NC}"
    echo -e "${CYAN}App Name:${NC} ${APP_NAME}"
    echo -e "${CYAN}Port:${NC} ${EXTERNAL_PORT}"
    echo -e "${CYAN}Environment:${NC} ${NODE_ENV}"
    echo -e "${CYAN}Git Branch:${NC} ${GIT_BRANCH}"
    echo -e "${PURPLE}============================================${NC}"
    echo ""
}

# Function to detect project type and features
detect_project_features() {
    print_status "Detecting project features..."
    
    # Check if Prisma exists
    if [ -f "prisma/schema.prisma" ] || [ -f "schema.prisma" ]; then
        HAS_PRISMA=true
        print_status "✅ Prisma detected"
        
        # Check if DATABASE_URL is configured - read directly from .env.production if not in environment
        if [ -z "$DATABASE_URL" ] && [ -f ".env.production" ]; then
            DATABASE_URL=$(grep "^DATABASE_URL=" .env.production | head -1 | cut -d= -f2- | sed 's/^"//;s/"$//')
        fi
        
        if [ ! -z "$DATABASE_URL" ]; then
            # Remove quotes and check format
            CLEAN_DB_URL=$(echo "$DATABASE_URL" | sed 's/^"//;s/"$//')
            if [[ "$CLEAN_DB_URL" == postgresql* || "$CLEAN_DB_URL" == postgres* || "$CLEAN_DB_URL" == mysql* || "$CLEAN_DB_URL" == sqlite* ]]; then
                HAS_DATABASE=true
                print_status "✅ Database configuration detected: ${CLEAN_DB_URL%%:*}://"
                export DATABASE_URL="$CLEAN_DB_URL"
            else
                print_warning "❌ DATABASE_URL format not recognized - skipping database operations"
                print_warning "Current DATABASE_URL: $CLEAN_DB_URL"
            fi
        else
            print_warning "❌ DATABASE_URL not found - skipping database operations"
        fi
    else
        print_status "❌ No Prisma schema found - frontend-only project"
    fi
    
    # Check if it's a Next.js project
    if [ -f "next.config.js" ] || [ -f "next.config.mjs" ] || [ -f "next.config.ts" ]; then
        HAS_NEXTJS=true
        print_status "✅ Next.js project detected"
    else
        HAS_NEXTJS=false
        print_status "❌ Not a Next.js project"
    fi
}

# Function to ask deployment questions
ask_deployment_questions() {
    show_banner
    
    # Detect project features first
    detect_project_features
    
    echo ""
    print_status "Project Analysis:"
    if [ "$HAS_NEXTJS" = true ]; then
        print_status "📦 Next.js Application"
    else
        print_status "📦 Node.js Application"
    fi
    
    if [ "$HAS_PRISMA" = true ]; then
        print_status "🗄️  Database with Prisma"
    else
        print_status "🗄️  Frontend Only (No Database)"
    fi
    
    if [ "$HAS_DATABASE" = true ]; then
        print_status "🔗 Database Connection Ready"
    else
        print_status "🔗 No Database Connection"
    fi
    
    echo ""
    
    # Ask all questions upfront
    USE_GIT=false
    INSTALL_DEPS=false
    BUILD_PROJECT=false
    RUN_MIGRATIONS=false
    
    if [ ! -z "$GIT_REPO_URL" ]; then
        if ask_yes_no "Do you want to pull latest code from Git branch '${GIT_BRANCH}'?"; then
            USE_GIT=true
        fi
    else
        print_status "No Git configuration found - skipping Git operations"
    fi
    
    if ask_yes_no "Do you want to install/update dependencies?"; then
        INSTALL_DEPS=true
    fi
    
    if [ "$HAS_NEXTJS" = true ]; then
        if ask_yes_no "Do you want to build the Next.js project?"; then
            BUILD_PROJECT=true
        fi
    else
        BUILD_PROJECT=false
        print_status "Skipping build step (not a Next.js project)"
    fi
    
    if [ "$HAS_PRISMA" = true ] && [ "$HAS_DATABASE" = true ]; then
        if ask_yes_no "Do you want to run database migrations?"; then
            RUN_MIGRATIONS=true
        fi
    else
        RUN_MIGRATIONS=false
        if [ "$HAS_PRISMA" = false ]; then
            print_status "Skipping database migrations (no Prisma schema found)"
        else
            print_status "Skipping database migrations (DATABASE_URL not configured)"
        fi
    fi
    
    echo ""
    print_status "Deployment plan:"
    if [ "$USE_GIT" = true ]; then
        print_status "✅ Pull code from Git (${GIT_BRANCH})"
    else
        print_status "❌ Skip Git operations"
    fi
    
    if [ "$INSTALL_DEPS" = true ]; then
        print_status "✅ Install/update dependencies"
    else
        print_status "❌ Skip dependency installation"
    fi
    
    if [ "$BUILD_PROJECT" = true ]; then
        print_status "✅ Build Next.js project"
    else
        print_status "❌ Skip build step"
    fi
    
    if [ "$RUN_MIGRATIONS" = true ]; then
        print_status "✅ Run database migrations"
    else
        print_status "❌ Skip database migrations"
    fi
    
    echo ""
    if ask_yes_no "Continue with deployment?"; then
        print_status "Starting deployment..."
    else
        print_warning "Deployment cancelled by user."
        exit 0
    fi
}

# Check prerequisites
check_prerequisites() {
    print_status "Checking prerequisites..."
    
    # Check Node.js
    if ! command_exists node; then
        print_error "Node.js is not installed!"
        exit 1
    fi
    print_success "Node.js $(node --version) is available"
    
    # Check npm
    if ! command_exists npm; then
        print_error "npm is not installed!"
        exit 1
    fi
    print_success "npm $(npm --version) is available"
    
    # Check PM2
    if ! command_exists pm2; then
        print_error "PM2 is not installed!"
        if ask_yes_no "Do you want to install PM2 globally?"; then
            print_status "Installing PM2..."
            npm install -g pm2
        else
            print_error "PM2 is required. Exiting."
            exit 1
        fi
    fi
    print_success "PM2 is available"
    
    # Check Git (only if needed)
    if [ "$USE_GIT" = true ]; then
        if ! command_exists git; then
            print_error "Git is not installed!"
            exit 1
        fi
        print_success "Git is available"
    fi
}

# Function to setup git credentials
setup_git_credentials() {
    print_status "Setting up git credentials..."
    
    # Configure git to use credentials
    git config --global credential.helper store
    git config --global user.email "${GIT_USERNAME}@company.com"
    git config --global user.name "${GIT_USERNAME}"
    
    # Create the proper Git URL with credentials
    if [[ "$GIT_REPO_URL" == http* ]]; then
        # Extract the protocol and rest of URL
        PROTOCOL=$(echo "$GIT_REPO_URL" | cut -d: -f1)
        REST_URL=$(echo "$GIT_REPO_URL" | cut -d/ -f3-)
        GIT_URL_WITH_CREDS="${PROTOCOL}://${GIT_USERNAME}:${GIT_PASSWORD}@${REST_URL}"
    else
        # Assume it needs http://
        GIT_URL_WITH_CREDS="http://${GIT_USERNAME}:${GIT_PASSWORD}@${GIT_REPO_URL}"
    fi
    
    print_status "Using Git URL: ${PROTOCOL}://${GIT_USERNAME}:***@${REST_URL}"
    
    # Disable git prompts
    export GIT_ASKPASS=/bin/true
    export SSH_ASKPASS=/bin/true
    export GIT_TERMINAL_PROMPT=0
}

# Function to pull latest code from git
pull_code() {
    if [ "$USE_GIT" = true ]; then
        print_status "Pulling latest code from Git..."
        
        setup_git_credentials
        
        # Check if .git directory exists
        if [ ! -d ".git" ]; then
            print_status "Cloning repository..."
            git clone "$GIT_URL_WITH_CREDS" .
            git checkout ${GIT_BRANCH}
            print_success "Repository cloned successfully"
        else
            print_status "Fetching latest changes from branch: ${GIT_BRANCH}..."
            
            # Update remote URL with credentials
            git remote set-url origin "$GIT_URL_WITH_CREDS"
            
            git fetch origin ${GIT_BRANCH}
            
            # Check if there are changes
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
        print_status "Skipping Git operations"
    fi
}

# Function to install dependencies
install_dependencies() {
    if [ "$INSTALL_DEPS" = true ]; then
        print_status "Installing dependencies..."
        
        # Check if node_modules exists and if package-lock.json exists
        if [ ! -d "node_modules" ] || [ ! -f "package-lock.json" ]; then
            print_warning "Performing fresh install (missing node_modules or package-lock.json)..."
            rm -rf node_modules
            npm install
        else
            # Use npm ci for faster, reliable installs when package-lock.json exists
            print_status "Using npm ci for clean install..."
            npm ci --production=false
        fi
        
        if [ $? -eq 0 ]; then
            print_success "Dependencies installed successfully"
        else
            print_error "npm ci failed, falling back to npm install..."
            rm -rf node_modules package-lock.json
            npm install
            if [ $? -eq 0 ]; then
                print_success "Dependencies installed successfully with npm install"
            else
                print_error "Failed to install dependencies"
                exit 1
            fi
        fi
    else
        print_status "Skipping dependency installation"
        
        # Check if critical dependencies exist
        if [ ! -d "node_modules" ]; then
            print_error "Dependencies missing! Please install dependencies first."
            exit 1
        fi
    fi
}

# Function to generate Prisma client
generate_prisma() {
    if [ "$HAS_PRISMA" = true ]; then
        print_status "Generating Prisma client..."
        
        npx prisma generate
        if [ $? -eq 0 ]; then
            print_success "Prisma client generated successfully"
        else
            print_error "Failed to generate Prisma client"
            exit 1
        fi
    else
        print_status "Skipping Prisma client generation (no Prisma detected)"
    fi
}

# Function to run database migrations
run_migrations() {
    if [ "$RUN_MIGRATIONS" = true ] && [ "$HAS_PRISMA" = true ] && [ "$HAS_DATABASE" = true ]; then
        print_status "Running database migrations..."
        
        # Verify DATABASE_URL is set and valid
        if [ -z "$DATABASE_URL" ]; then
            print_error "DATABASE_URL is not set"
            return 1
        fi
        
        # Run migrations
        npx prisma migrate deploy
        if [ $? -eq 0 ]; then
            print_success "Database migrations completed successfully"
        else
            print_error "Database migrations failed"
            return 1
        fi
    else
        if [ "$RUN_MIGRATIONS" = false ]; then
            print_status "Skipping database migrations (user choice)"
        elif [ "$HAS_PRISMA" = false ]; then
            print_status "Skipping database migrations (no Prisma schema)"
        elif [ "$HAS_DATABASE" = false ]; then
            print_status "Skipping database migrations (DATABASE_URL not configured)"
        fi
    fi
}

# Function to build Next.js project
build_project() {
    if [ "$BUILD_PROJECT" = true ]; then
        print_status "Building Next.js project..."
        
        # Clear Next.js cache
        print_status "Clearing Next.js cache..."
        rm -rf .next
        
        # Set environment variables for build
        export NODE_ENV=production
        export NEXT_TELEMETRY_DISABLED=1
        
        # Build the project
        npm run build
        
        if [ $? -eq 0 ]; then
            print_success "Build completed successfully"
        else
            print_error "Build failed"
            exit 1
        fi
    else
        print_status "Skipping build step"
        
        # Check if build exists for Next.js projects
        if [ "$HAS_NEXTJS" = true ] && [ ! -d ".next" ]; then
            print_error "No build found! Please build the project first."
            exit 1
        fi
    fi
}

# Function to create or update PM2 ecosystem file
create_pm2_config() {
    print_status "Creating PM2 ecosystem file..."
    
    # Create logs directory
    mkdir -p logs
    
    # Determine the start script
    START_SCRIPT="npm"
    START_ARGS="start"
    
    # For non-Next.js projects, check if there's a different start script
    if [ "$HAS_NEXTJS" = false ]; then
        # Check package.json for start script
        if [ -f "package.json" ]; then
            if grep -q '"start"' package.json; then
                START_SCRIPT="npm"
                START_ARGS="start"
            elif [ -f "server.js" ]; then
                START_SCRIPT="node"
                START_ARGS="server.js"
            elif [ -f "index.js" ]; then
                START_SCRIPT="node"
                START_ARGS="index.js"
            fi
        fi
    fi
    
    # Create pm2.config.js with correct environment file reference
    cat > pm2.config.js << EOF
module.exports = {
  apps: [
    {
      name: '${APP_NAME}',
      script: '${START_SCRIPT}',
      args: '${START_ARGS}',
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
      instance_var: 'INSTANCE_ID',
      env: {
        NODE_ENV: '${NODE_ENV}',
        PORT: '${PORT}',
        EXTERNAL_PORT: '${EXTERNAL_PORT}'
      }
    }
  ]
};
EOF
    
    print_success "PM2 configuration created"
}

# Function to manage PM2 process
manage_pm2() {
    print_status "Managing PM2 process..."
    
    # Stop existing process if running
    if pm2 list | grep -q "${APP_NAME}"; then
        print_status "Stopping existing PM2 process..."
        pm2 stop ${APP_NAME}
        pm2 delete ${APP_NAME}
    fi
    
    # Start new process
    print_status "Starting PM2 process..."
    pm2 start pm2.config.js
    
    if [ $? -eq 0 ]; then
        print_success "PM2 process started successfully"
    else
        print_error "Failed to start PM2 process"
        exit 1
    fi
    
    # Save PM2 configuration
    pm2 save
    
    # Show status
    print_status "PM2 Status:"
    pm2 status
}

# Function to setup PM2 startup (with environment variable control)
setup_pm2_startup() {
    # Check if PM2_STARTUP is set to false, otherwise default to true
    if [ "${PM2_STARTUP:-true}" = "true" ]; then
        print_status "Setting up PM2 startup..."
        pm2 startup
        pm2 save
        print_success "PM2 startup configured"
    else
        print_status "Skipping PM2 startup setup (PM2_STARTUP=false)"
    fi
}

# Function to show deployment summary
show_deployment_summary() {
    echo ""
    echo -e "${PURPLE}============================================${NC}"
    echo -e "${PURPLE}🎉 DEPLOYMENT COMPLETED SUCCESSFULLY!${NC}"
    echo -e "${PURPLE}============================================${NC}"
    echo -e "${CYAN}App Name:${NC} ${APP_NAME}"
    echo -e "${CYAN}Port:${NC} ${EXTERNAL_PORT}"
    echo -e "${CYAN}Environment:${NC} ${NODE_ENV}"
    echo -e "${CYAN}Git Branch:${NC} ${GIT_BRANCH}"
    echo -e "${CYAN}Access URL:${NC} http://localhost:${EXTERNAL_PORT}"
    echo -e "${PURPLE}============================================${NC}"
    echo -e "${YELLOW}📋 Useful PM2 Commands:${NC}"
    echo -e "  ${BLUE}pm2 logs ${APP_NAME}${NC}     - View application logs"
    echo -e "  ${BLUE}pm2 restart ${APP_NAME}${NC}  - Restart application"
    echo -e "  ${BLUE}pm2 stop ${APP_NAME}${NC}     - Stop application"
    echo -e "  ${BLUE}pm2 status${NC}              - Check all processes"
    echo -e "  ${BLUE}pm2 monit${NC}               - Monitor in real-time"
    echo -e "  ${BLUE}pm2 delete ${APP_NAME}${NC}   - Delete application"
    echo -e "${PURPLE}============================================${NC}"
}

# Function to health check
health_check() {
    print_status "Performing health check..."
    
    # Wait for application to start
    sleep 5
    
    # Check if port is listening
    if command_exists netstat; then
        if netstat -tlnp 2>/dev/null | grep ":${EXTERNAL_PORT}" >/dev/null; then
            print_success "Application is running on port ${EXTERNAL_PORT}"
        else
            print_warning "Application might not be running on port ${EXTERNAL_PORT}"
        fi
    fi
    
    # Check PM2 status
    if pm2 list | grep -q "${APP_NAME}.*online"; then
        print_success "PM2 process is running"
    else
        print_warning "PM2 process status unknown"
    fi
}

# Main deployment function
main() {
    # Show banner and ask questions
    ask_deployment_questions
    
    # Check prerequisites
    check_prerequisites
    
    # Pull latest code
    pull_code
    
    # Install dependencies
    install_dependencies
    
    # Generate Prisma client
    generate_prisma
    
    # Run database migrations
    run_migrations
    
    # Build project
    build_project
    
    # Create PM2 configuration
    create_pm2_config
    
    # Manage PM2 process
    manage_pm2
    
    # Health check
    health_check
    
    # Setup PM2 startup (optional)
    setup_pm2_startup
    
    # Show deployment summary
    show_deployment_summary
}

# Handle script interruption
trap 'echo -e "\n${RED}⚠️  Deployment interrupted!${NC}"; exit 1' INT TERM

# Ensure we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found! Please run this script from the project root directory."
    exit 1
fi

# Run main function
main "$@"