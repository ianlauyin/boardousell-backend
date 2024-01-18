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
    await queryInterface.bulkInsert("statuses", [
      {
        condition: "pending",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        condition: "processing",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        condition: "shipped",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        condition: "delivered",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        condition: "cancelled",
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
    await queryInterface.bulkDelete("statuses", null, {});
  },
};
