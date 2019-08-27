"use strict";
const moment = require("moment");
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
        type: DataTypes.DATE,
        get() {
          return moment(this.getDataValue("start"))
            .local()
            .format("YYYY-MM-DD h:mm:ss");
        }
      },
      stop: {
        allowNull: false,
        type: DataTypes.DATE,
        get() {
          return moment(this.getDataValue("stop"))
            .local()
            .format("YYYY-MM-DD h:mm:ss");
        }
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
      paranoid: true
    }
  );
  internalEvent.associate = function(models) {
    // associations can be defined here
  };
  return internalEvent;
};
