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
    await queryInterface.bulkInsert("product_orders", [
      {
        amount: 2,
        product_id: 1,
        order_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        amount: 1,
        product_id: 1,
        order_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        amount: 1,
        product_id: 1,
        order_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        amount: 1,
        product_id: 2,
        order_id: 3,
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
    await queryInterface.bulkDelete(`product_orders`, null, {});
  },
};
