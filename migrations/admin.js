const Sequelize = require('sequelize');

class adminUser extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                admin: {
                    type: Sequelize.STRING(20),
                    allowNull: false,
                    unique: true,
                },
                salt: {
                    type: Sequelize.STRING(150),
                    allowNull: false,
                },
                hash: {
                    type: Sequelize.STRING(150),
                    allowNull: false,
                },
                created_at: {
                    type: Sequelize.DATE,
                    allowNull: false,
                    defaultValue: Sequelize.NOW,
                },
            },
            {
                sequelize,
                timestamps: false,
                underscored: false,
                modelName: 'admin',
                tableName: 'adminId',
                paranoid: false,
                charset: 'utf8mb4',
                collate: 'utf8mb4_general_ci',
            }
        );
    }

    static associate(db) {}
}

module.exports = adminUser;

// belognsTo and Many
