"use strict";
const { EVENT_CATEGORY, EVENT_SOURCE } = require("../utils/constant");
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("event", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      eid: {
        unique: true,
        type: Sequelize.STRING
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
      longitude: {
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
      contributor: {
        allowNull: false,
        type: Sequelize.STRING
      },
      icon: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          isIn: [Object.values(EVENT_CATEGORY)]
        }
      },
      source: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          isIn: [Object.values(EVENT_SOURCE)]
        }
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
    return queryInterface.dropTable("event");
  }
};
