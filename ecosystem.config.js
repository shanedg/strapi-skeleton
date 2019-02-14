// Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/

module.exports = {
  apps : [
    {
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
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'development',
      },
    }
  ],

  deploy : {}
};
