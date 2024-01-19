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
        name: "Strategy",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Party game",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Cooperative game",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Hand management",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Hidden roles",
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
