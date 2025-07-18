module.exports = {
  apps: [
    {
      name: 'ksit',
      script: 'npm',
      args: 'start',
      instances: 1,
      exec_mode: 'fork',
      watch: false,
      env: {
        NODE_ENV: 'production',
        PORT: '8443',
        EXTERNAL_PORT: '8443'
      },
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
