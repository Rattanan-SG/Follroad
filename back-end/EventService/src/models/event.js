"use strict";
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const {
  EVENT_CATEGORY,
  EVENT_SOURCE,
  EVENT_MAPPING
} = require("../utils/constant");

module.exports = (sequelize, DataTypes) => {
  const event = sequelize.define(
    "event",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      eid: {
        unique: true,
        allowNull: true,
        type: DataTypes.STRING
      },
      uid: {
        allowNull: true,
        type: DataTypes.STRING
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
      longitude: {
        allowNull: false,
        type: DataTypes.DOUBLE
      },
      type: {
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          typeMustMatchWithIcon(value) {
            const found = EVENT_MAPPING.find(element => element.type == value);
            if (value && !found) {
              throw new Error(`Not found type ${this.type}`);
            }
            if (this.icon !== found.icon) {
              throw new Error(
                `type ${this.type} should match with icon ${found.icon}`
              );
            }
          }
        }
      },
      start: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
      },
      stop: {
        allowNull: false,
        type: DataTypes.DATE
      },
      contributor: {
        allowNull: false,
        type: DataTypes.STRING
      },
      icon: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          isIn: [Object.values(EVENT_CATEGORY)]
        }
      },
      source: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          isIn: [Object.values(EVENT_SOURCE)]
        }
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
      tableName: "event",
      paranoid: true,
      scopes: {
        activeEvent: {
          where: {
            stop: {
              [Op.gt]: sequelize.fn("NOW")
            }
          },
          order: [["start", "DESC"]]
        }
      }
    }
  );
  event.associate = models => {
    event.hasMany(models.comment, { foreignKey: "eventId" });
    event.hasMany(models.feedback, { foreignKey: "eventId" });
    event.hasMany(models.picture, {
      foreignKey: "eventId",
      onDelete: "CASCADE",
      hooks: true
    });
  };
  return event;
};
