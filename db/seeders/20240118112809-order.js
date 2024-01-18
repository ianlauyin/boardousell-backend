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
    await queryInterface.bulkInsert(
      "orders",
      [
        {
          address_id: 1,
          status_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          address_id: 2,
          status_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          address_id: 3,
          status_id: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("orders", null, {});
  },
};
