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
      env: {
        NODE_ENV: 'development',
        DATABASE_HOST: '127.0.0.1',
        DATABASE_PORT: 5432,
        DATABASE_NAME: 'strapi-db',
        DATABASE_USERNAME: 'strapi-user',
        DATABASE_PASSWORD: 'strapi-user-alright',
        DATABASE_SSL: false,
      },
      env_localdocker: {
        NODE_ENV: 'development',
        DATABASE_HOST: 'postgres-ok',
        DATABASE_PORT: 5432,
        DATABASE_NAME: 'strapi-db',
        DATABASE_USERNAME: 'strapi-user',
        DATABASE_PASSWORD: 'strapi-user-alright',
        DATABASE_SSL: false,
      },
      exec_mode: 'cluster',
    }
  ],

  deploy : {}
};
