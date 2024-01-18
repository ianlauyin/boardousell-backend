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
    await queryInterface.bulkInsert(`categories`, [
      {
        name: "strategy",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "party game",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "cooperative game",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "hand management",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "hidden roles",
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
    await queryInterface.bulkDelete("categories", null, {});
  },
};
