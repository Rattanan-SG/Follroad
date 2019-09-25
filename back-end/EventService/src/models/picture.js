"use strict";
module.exports = (sequelize, DataTypes) => {
  const picture = sequelize.define(
    "picture",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      eventId: {
        allowNull: false,
        field: "event_id",
        references: { model: "event", key: "id" },
        type: DataTypes.INTEGER
      },
      url: {
        allowNull: false,
        type: DataTypes.TEXT
      },
      createdAt: {
        field: "created_at",
        type: DataTypes.DATE
      },
      updatedAt: {
        field: "updated_at",
        type: DataTypes.DATE
      },
      deletedAt: {
        allowNull: true,
        field: "deleted_at",
        type: DataTypes.DATE
      }
    },
    { tableName: "picture", paranoid: true }
  );
  picture.associate = models => {
    picture.belongsTo(models.event, { foreignKey: "eventId" });
  };
  return picture;
};
