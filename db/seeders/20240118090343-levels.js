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
    await queryInterface.bulkInsert("levels", [
      {
        title: "basic",
        requirement: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "standard",
        requirement: 5000,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        title: "premium",
        requirement: 10000,
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
    await queryInterface.bulkDelete(`levels`, null, {});
  },
};
