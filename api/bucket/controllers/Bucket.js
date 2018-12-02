'use strict';

/**
 * Bucket.js controller
 *
 * @description: A set of functions called "actions" for managing `Bucket`.
 */

module.exports = {

  /**
   * Retrieve bucket records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.bucket.search(ctx.query);
    } else {
      return strapi.services.bucket.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a bucket record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.bucket.fetch(ctx.params);
  },

  /**
   * Count bucket records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.bucket.count(ctx.query);
  },

  /**
   * Create a/an bucket record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.bucket.add(ctx.request.body);
  },

  /**
   * Update a/an bucket record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.bucket.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an bucket record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.bucket.remove(ctx.params);
  },

  /**
   * Add relation to a/an bucket record.
   *
   * @return {Object}
   */

  createRelation: async (ctx, next) => {
    return strapi.services.bucket.addRelation(ctx.params, ctx.request.body);
  },

  /**
   * Update relation to a/an bucket record.
   *
   * @return {Object}
   */

  updateRelation: async (ctx, next) => {
    return strapi.services.bucket.editRelation(ctx.params, ctx.request.body);
  },

  /**
   * Destroy relation to a/an bucket record.
   *
   * @return {Object}
   */

  destroyRelation: async (ctx, next) => {
    return strapi.services.bucket.removeRelation(ctx.params, ctx.request.body);
  }
};
