"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return queryInterface
        .createTable(
          "feedback",
          {
            id: {
              allowNull: false,
              autoIncrement: true,
              primaryKey: true,
              type: Sequelize.INTEGER
            },
            uid: {
              unique: "composite_index",
              allowNull: false,
              type: Sequelize.STRING
            },
            eventId: {
              unique: "composite_index",
              allowNull: false,
              field: "event_id",
              references: { model: "event", key: "id" },
              type: Sequelize.INTEGER
            },
            react: {
              allowNull: false,
              type: Sequelize.BOOLEAN
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
          },
          { transaction: t }
        )
        .then(() => {
          return queryInterface.addConstraint(
            "feedback",
            ["uid", "event_id"],
            {
              type: "unique",
              name: "composite_index"
            },
            {
              transaction: t
            }
          );
        });
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("feedback");
  }
};
