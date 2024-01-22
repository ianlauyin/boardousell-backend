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
    await queryInterface.bulkInsert("notices", [
      {
        title: "New Year Sales!",
        url: "https://firebasestorage.googleapis.com/v0/b/boardousell.appspot.com/o/notice%2Fistockphoto-1486111092-612x612.jpg?alt=media&token=65fde69c-a297-4419-8e9f-2d80e2ae1d17",
        detail:
          "Happy New Year, everyone. We are giving out new year sales discount on certain boardgame. Please take a look and Have Fun!",
        created_at: new Date("2024-01-01T07:00:00"),
        updated_at: new Date("2024-01-01T07:00:00"),
      },
      {
        title: "New Boardgames Arrived!",
        detail:
          "New Boardgames have arrived at our shop. Including Bullet!, Blackout, Tiny Town. Please have a look to these new boardgames and Have Fun!.",
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
    await queryInterface.bulkDelete("notices", null, {});
  },
};
