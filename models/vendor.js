'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vendor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Vendor.init({
    name: {
      type: DataTypes.STRING,
      validate: {
          notEmpty: {
              args: true,
              msg: "Required"
         },
         len: {
             args: [1,128],
             msg: "Name length is not in this range"
        }
      }
    },
    menu: DataTypes.ARRAY(DataTypes.STRING),
    tags: DataTypes.ARRAY(DataTypes.STRING)
  }, {
    sequelize,
    modelName: 'Vendor',
  });
  return Vendor;
};