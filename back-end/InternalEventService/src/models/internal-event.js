"use strict";
module.exports = (sequelize, DataTypes) => {
  const internalEvent = sequelize.define(
    "internalEvent",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING
      },
      description: {
        allowNull: false,
        type: DataTypes.TEXT
      },
      latitude: {
        allowNull: false,
        type: DataTypes.DOUBLE
      },
      longtitude: {
        allowNull: false,
        type: DataTypes.DOUBLE
      },
      type: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      start: {
        allowNull: false,
        type: DataTypes.DATE
      },
      stop: {
        allowNull: false,
        type: DataTypes.DATE
      },
      icon: {
        allowNull: false,
        type: DataTypes.STRING
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
    {
      tableName: "internal_event",
      paranoid: true,
      defaultScope: {
        attributes: {
          include: [
            [
              sequelize.fn(
                "date_format",
                sequelize.col("start"),
                "%Y-%m-%d %T"
              ),
              "start"
            ],
            [
              sequelize.fn("date_format", sequelize.col("stop"), "%Y-%m-%d %T"),
              "stop"
            ]
          ]
        }
      }
    }
  );
  internalEvent.associate = function(models) {
    // associations can be defined here
  };
  return internalEvent;
};
