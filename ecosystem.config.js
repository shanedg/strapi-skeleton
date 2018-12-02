module.exports = {
  apps : [{
    name: 'strapi-skeleton',
    script: 'server.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    instances: 1,
    autorestart: true,
    watch: true,
    ignore_watch: [
      'admin',
      'plugins',
      '.editorconfig',
      '.eslintignore',
      '.eslintrc',
      '.gitignore',
      '.git',
      '.npmignore',
      'Dockerfile',
      'ecosystem.config.js',
      'README.md'
    ],
    max_memory_restart: '1G',
    append_env_to_name: true,
    env: {
      NODE_ENV: 'development'
    },
    env_localdocker: {
      NODE_ENV: 'localdocker'
    },
    env_staging: {
      NODE_ENV: 'staging'
    },
    env_production: {
      NODE_ENV: 'production'
    },
    exec_mode: 'cluster'
  }],

  deploy : {
    production : {
      user : 'node',
      host : '212.83.163.1',
      ref  : 'origin/master',
      repo : 'git@github.com:repo.git',
      path : '/var/www/production',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
