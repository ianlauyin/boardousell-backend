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
    await queryInterface.bulkInsert(`infomations`, [
      {
        name: "Phone",
        detail: "12345678",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Link",
        detail: "www.google.com",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Email",
        detail: "boardousell@boardousell.com",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Map",
        detail: "觀塘巧明工業大廈88樓8A室",
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
    await queryInterface.bulkDelete(`infomations`, null, {});
  },
};
