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
        name: "phone",
        detail: "57030374",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "link",
        detail: "www.google.com",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "email",
        detail: "ianlauyin@gmail.com",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "map",
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
