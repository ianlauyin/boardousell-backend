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
        url: "https://firebasestorage.googleapis.com/v0/b/boardousell.appspot.com/o/notice%2Fnotice1.jpg?alt=media&token=8bfecd58-7962-4a4b-b522-b3f46623860c",
        detail:
          "Happy New Year, everyone. We are giving out new year sales discount on certain boardgame. Please take a look and Have Fun!",
        created_at: new Date("2024-01-01T07:00:00"),
        updated_at: new Date("2024-01-01T07:00:00"),
      },
      {
        title: "New Boardgames Arrived!",
        detail:
          "New Boardgames have arrived at our shop. Including Bullet!, Blackout, Tiny Town. Please have a look to these new boardgames and Have Fun!.",
        created_at: new Date("2024-01-10T07:00:00"),
        updated_at: new Date("2024-01-10T07:00:00"),
      },
      {
        title: "Chinese New Year Sales",
        detail:
          "Happy Chinese New Year, everyone. We are giving out new year sales discount on certain boardgame. Please take a look and Have Fun!",
        url: "https://firebasestorage.googleapis.com/v0/b/boardousell.appspot.com/o/notice%2Fnotice3.jpg?alt=media&token=27a8d4f3-24fc-42f4-8f7f-1d3ae228974f",
        created_at: new Date("2024-01-25T07:00:00"),
        updated_at: new Date("2024-01-25T07:00:00"),
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
