'use strict';

/**
 * Paycheck.js controller
 *
 * @description: A set of functions called "actions" for managing `Paycheck`.
 */

module.exports = {

  /**
   * Retrieve paycheck records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.paycheck.search(ctx.query);
    } else {
      return strapi.services.paycheck.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a paycheck record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.paycheck.fetch(ctx.params);
  },

  /**
   * Count paycheck records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.paycheck.count(ctx.query);
  },

  /**
   * Create a/an paycheck record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.paycheck.add(ctx.request.body);
  },

  /**
   * Update a/an paycheck record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.paycheck.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an paycheck record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.paycheck.remove(ctx.params);
  },

  /**
   * Add relation to a/an paycheck record.
   *
   * @return {Object}
   */

  createRelation: async (ctx, next) => {
    return strapi.services.paycheck.addRelation(ctx.params, ctx.request.body);
  },

  /**
   * Update relation to a/an paycheck record.
   *
   * @return {Object}
   */

  updateRelation: async (ctx, next) => {
    return strapi.services.paycheck.editRelation(ctx.params, ctx.request.body);
  },

  /**
   * Destroy relation to a/an paycheck record.
   *
   * @return {Object}
   */

  destroyRelation: async (ctx, next) => {
    return strapi.services.paycheck.removeRelation(ctx.params, ctx.request.body);
  }
};
