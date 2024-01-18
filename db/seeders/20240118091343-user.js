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
    await queryInterface.bulkInsert("users", [
      {
        email: "test@test.com",
        name: "Test Ting",
        level_id: 1,
        points: 0,
        phone: 12345678,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        email: "boardgame@test.com",
        name: "Board Game",
        level_id: 2,
        points: 5000,
        phone: 87654321,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        email: "ian@test.com",
        name: "Ian Lau",
        level_id: 3,
        points: 10000,
        phone: 12348765,
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
    await queryInterface.bulkDelete("users", null, {});
  },
};
