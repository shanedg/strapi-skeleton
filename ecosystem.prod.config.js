// Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/

module.exports = {
  apps : [
    {
      name: 'strapi-skeleton',
      script: 'server.js',
      instances: 1,
      autorestart: true,
      max_memory_restart: '1G',
      append_env_to_name: true,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],

  deploy : {}
};
