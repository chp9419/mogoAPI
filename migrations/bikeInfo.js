const Sequelize = require('sequelize')

class BikeInfo extends Sequelize.Model {
  static init (sequelize) {
    return super.init(
      {
        bikeName: {
          type: Sequelize.STRING(20),
          allowNull: false,
          unique: true
        },
        brandName: {
          type: Sequelize.STRING(20),
          allowNull: false
        },
        bikeSize: {
          type: Sequelize.STRING(10),
          allowNull: false
        },
        amount: {
          type: Sequelize.INTEGER,
          allowNull: true
        }
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: 'bikeInfo',
        tableName: 'BikeInfo',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
      }
    )
  }

  static associate (db) {
    db.BikeInfo.hasMany(db.User, { foreignKey: 'bike_id', sourceKey: 'id' })
  }
}

module.exports = BikeInfo
