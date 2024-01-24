"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("product_categories", [
      {
        product_id: 1,
        category_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_id: 1,
        category_id: 4,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_id: 2,
        category_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_id: 2,
        category_id: 5,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_id: 3,
        category_id: 6,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_id: 1,
        category_id: 6,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_id: 4,
        category_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_id: 4,
        category_id: 7,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_id: 1,
        category_id: 7,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_id: 5,
        category_id: 7,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_id: 5,
        category_id: 4,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_id: 6,
        category_id: 4,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_id: 6,
        category_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_id: 6,
        category_id: 7,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_id: 7,
        category_id: 8,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_id: 8,
        category_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_id: 9,
        category_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_id: 9,
        category_id: 4,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_id: 9,
        category_id: 6,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_id: 9,
        category_id: 7,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete(`product_categories`, null, {});
  },
};
