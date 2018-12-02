'use strict';

/**
 * Transaction.js controller
 *
 * @description: A set of functions called "actions" for managing `Transaction`.
 */

module.exports = {

  /**
   * Retrieve transaction records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.transaction.search(ctx.query);
    } else {
      return strapi.services.transaction.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a transaction record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.transaction.fetch(ctx.params);
  },

  /**
   * Count transaction records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.transaction.count(ctx.query);
  },

  /**
   * Create a/an transaction record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.transaction.add(ctx.request.body);
  },

  /**
   * Update a/an transaction record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.transaction.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an transaction record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.transaction.remove(ctx.params);
  },

  /**
   * Add relation to a/an transaction record.
   *
   * @return {Object}
   */

  createRelation: async (ctx, next) => {
    return strapi.services.transaction.addRelation(ctx.params, ctx.request.body);
  },

  /**
   * Update relation to a/an transaction record.
   *
   * @return {Object}
   */

  updateRelation: async (ctx, next) => {
    return strapi.services.transaction.editRelation(ctx.params, ctx.request.body);
  },

  /**
   * Destroy relation to a/an transaction record.
   *
   * @return {Object}
   */

  destroyRelation: async (ctx, next) => {
    return strapi.services.transaction.removeRelation(ctx.params, ctx.request.body);
  }
};
