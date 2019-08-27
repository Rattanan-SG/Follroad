"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("internal_event", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      latitude: {
        allowNull: false,
        type: Sequelize.DOUBLE
      },
      longtitude: {
        allowNull: false,
        type: Sequelize.DOUBLE
      },
      type: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      start: {
        allowNull: false,
        type: Sequelize.DATE
      },
      stop: {
        allowNull: false,
        type: Sequelize.DATE
      },
      icon: {
        allowNull: false,
        type: Sequelize.STRING
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
    return queryInterface.dropTable("internal_event");
  }
};
