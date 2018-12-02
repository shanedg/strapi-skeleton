'use strict';

/**
 * Account.js controller
 *
 * @description: A set of functions called "actions" for managing `Account`.
 */

module.exports = {

  /**
   * Retrieve account records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.account.search(ctx.query);
    } else {
      return strapi.services.account.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a account record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.account.fetch(ctx.params);
  },

  /**
   * Count account records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.account.count(ctx.query);
  },

  /**
   * Create a/an account record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.account.add(ctx.request.body);
  },

  /**
   * Update a/an account record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.account.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an account record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.account.remove(ctx.params);
  },

  /**
   * Add relation to a/an account record.
   *
   * @return {Object}
   */

  createRelation: async (ctx, next) => {
    return strapi.services.account.addRelation(ctx.params, ctx.request.body);
  },

  /**
   * Update relation to a/an account record.
   *
   * @return {Object}
   */

  updateRelation: async (ctx, next) => {
    return strapi.services.account.editRelation(ctx.params, ctx.request.body);
  },

  /**
   * Destroy relation to a/an account record.
   *
   * @return {Object}
   */

  destroyRelation: async (ctx, next) => {
    return strapi.services.account.removeRelation(ctx.params, ctx.request.body);
  }
};
