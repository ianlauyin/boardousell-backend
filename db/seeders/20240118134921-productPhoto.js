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
        url: "https://images-cdn.fantasyflightgames.com/filer_public/83/e5/83e5bbdb-3d2d-477e-9a44-bbd300522ddc/mc01en_box_right.png",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_id: 1,
        url: "https://m.media-amazon.com/images/I/81gyL1Fo-IL.jpg",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        product_id: 2,
        url: "https://cf.geekdo-images.com/tAqLpWxQ0Oo3GaPP3MER1g__imagepagezoom/img/EdbcoIjK0fbLtbvadXuMATf7ubA=/fit-in/1200x900/filters:no_upscale():strip_icc()/pic5073276.jpg",
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
