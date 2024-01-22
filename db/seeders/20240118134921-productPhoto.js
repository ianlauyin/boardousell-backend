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
    await queryInterface.bulkInsert(`product_photos`, [
      {
        product_id: 1,
        url: "https://firebasestorage.googleapis.com/v0/b/boardousell.appspot.com/o/product%2Fmc01en_box_right.png?alt=media&token=daff5366-3c2c-42eb-a2e1-64fa8ce2e175",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_id: 1,
        url: "https://firebasestorage.googleapis.com/v0/b/boardousell.appspot.com/o/product%2F81gyL1Fo-IL.jpg?alt=media&token=40b9bef3-2247-4814-b7d5-8f25fdd87a77",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_id: 2,
        url: "https://firebasestorage.googleapis.com/v0/b/boardousell.appspot.com/o/product%2F81i5ppaknxL.__AC_SX300_SY300_QL70_ML2_.jpg?alt=media&token=43d32015-3465-42cb-b058-314831bf93aa",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_id: 3,
        url: "https://firebasestorage.googleapis.com/v0/b/boardousell.appspot.com/o/product%2F81mNFBse9rL._AC_SL1500_.jpg?alt=media&token=44283439-4d34-4c49-9f8f-64c66880eb15",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_id: 4,
        url: "https://firebasestorage.googleapis.com/v0/b/boardousell.appspot.com/o/product%2F91MjYVqgiEL._AC_SL1500_.jpg?alt=media&token=b9e070d7-0a39-4f0d-8b12-1d28fe4eb678",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_id: 5,
        url: "https://firebasestorage.googleapis.com/v0/b/boardousell.appspot.com/o/product%2Fpic4338675.jpg?alt=media&token=c90e9c5e-5cdf-457c-a726-627956db38bb",
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
    await queryInterface.bulkDelete(`product_photos`, null, {});
  },
};
