"use strict";
module.exports = (sequelize, DataTypes) => {
  const feedback = sequelize.define(
    "feedback",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      uid: {
        unique: "composite_index",
        allowNull: false,
        type: DataTypes.STRING
      },
      eventId: {
        unique: "composite_index",
        allowNull: false,
        field: "event_id",
        references: { model: "event", key: "id" },
        type: DataTypes.INTEGER
      },
      react: {
        allowNull: false,
        type: DataTypes.BOOLEAN
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
    { tableName: "feedback", paranoid: true }
  );
  feedback.associate = models => {
    feedback.belongsTo(models.event, { foreignKey: "eventId" });
  };
  return feedback;
};
