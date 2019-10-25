"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("comment", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      eventId: {
        allowNull: false,
        field: "event_id",
        references: { model: "event", key: "id" },
        type: Sequelize.INTEGER
      },
      uid: {
        allowNull: false,
        type: Sequelize.STRING
      },
      authorName: {
        allowNull: false,
        field: "author_name",
        type: Sequelize.STRING
      },
      authorPictureUrl: {
        allowNull: false,
        field: "author_picture_url",
        type: Sequelize.TEXT
      },
      detail: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      createdAt: {
        field: "created_at",
        type: Sequelize.DATE
      },
      updatedAt: {
        field: "updated_at",
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        field: "deleted_at",
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("comment");
  }
};
