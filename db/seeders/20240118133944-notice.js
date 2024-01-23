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
        url: "https://firebasestorage.googleapis.com/v0/b/boardousell.appspot.com/o/notice%2F25_01.jpg?alt=media&token=0323212f-6360-4ce0-837a-c27215bf6ab8",
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
