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
    await queryInterface.bulkInsert("reviews", [
      {
        product_id: 1,
        rating: 5,
        detail: "I really love this game.",
        user_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_id: 2,
        rating: 4,
        detail: "So many systems in this game, variant possibility.",
        user_id: 3,
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
    await queryInterface.bulkDelete("reviews", null, {});
  },
};
