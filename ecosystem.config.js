// Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/

module.exports = {
  apps : [{
    name: 'strapi-skeleton-dev',
    script: 'server.js',
    instances: 1,
    autorestart: true,
    max_memory_restart: '250M',
    append_env_to_name: true,
    watch: true,
    ignore_watch: [
      'admin',
      'plugins',
      'config',
      'ecosystem.config.js',
      // only local
      '.editorconfig',
      '.eslintignore',
      '.eslintrc',
      '.gitignore',
      '.npmignore',
      'Dockerfile',
      'ecosystem.config.js',
      'README.md',
      '.git',
    ],
    env: {
      NODE_ENV: 'development',
    },
    env_localdocker: {
      NODE_ENV: 'localdocker',
    },
    env_staging: {
      NODE_ENV: 'staging',
    },
    env_production: {
      NODE_ENV: 'production',
    },
    exec_mode: 'cluster',
  },
  {
    name: 'strapi-skeleton',
    script: 'server.js',
    instances: 1,
    autorestart: true,
    max_memory_restart: '1G',
    append_env_to_name: true,
    env: {
      NODE_ENV: 'staging',
    },
    env_production: {
      NODE_ENV: 'production',
    },
    exec_mode: 'cluster',
  }],

  deploy : {}
};
