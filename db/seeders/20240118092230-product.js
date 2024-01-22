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
    await queryInterface.bulkInsert("products", [
      {
        price: 650,
        name: "Marvel Champion",
        description:
          "Marvel Champions: The Card Game invites players to embody iconic heroes from the Marvel Universe as they battle to stop infamous villains from enacting their devious schemes.",
        stocks: 10,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        price: 1600,
        name: "Nemesis",
        description:
          "Nemesis is a semi-cooperative game in which you and your crewmates must survive on a ship infested with hostile organisms. To win the game, you have to complete one of the two objectives dealt to you at the start of the game and get back to Earth in one piece. You will find many obstacles on your way: swarms of Intruders (the name given to the alien organisms by the ship AI), the poor physical condition of the ship, agendas held by your fellow players, and sometimes just cruel fate.",
        stocks: 5,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        price: 300,
        name: "Tiny Towns",
        description:
          "Plan well as you build your town one building at a time. Will it fit?",
        stocks: 20,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        price: 1500,
        name: "Marvel zombie",
        description:
          "Design the most appealing 1950s neighborhood, with fences, parks, and swimming pools.",
        stocks: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        price: 400,
        name: "Blackout: Hong Kong",
        description:
          "Manage ever-changing resources & a network of various specialists to save Hong Kong! ",
        stocks: 3,
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
    await queryInterface.bulkDelete("products", null, {});
  },
};