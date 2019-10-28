"use strict";
module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define(
    "comment",
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
      uid: {
        allowNull: false,
        type: DataTypes.STRING
      },
      authorName: {
        allowNull: false,
        field: "author_name",
        type: DataTypes.STRING
      },
      authorPictureUrl: {
        allowNull: false,
        field: "author_picture_url",
        type: DataTypes.TEXT
      },
      detail: {
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
    { tableName: "comment", paranoid: true }
  );
  comment.associate = models => {
    comment.belongsTo(models.event, { foreignKey: "eventId" });
  };
  return comment;
};
