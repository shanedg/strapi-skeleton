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
      env: {
        NODE_ENV: 'production',
        // DATABASE_HOST: 'postgres-ok',
        // DATABASE_PORT: 5432,
        // DATABASE_NAME: 'strapi-db',
        // DATABASE_USERNAME: 'strapi-user',
        // DATABASE_PASSWORD: 'strapi-user-alright',
        // DATABASE_SSL: false,
      },
      env_production: {
        NODE_ENV: 'production',
      },
      exec_mode: 'cluster',
    },
  ],

  deploy : {}
};
