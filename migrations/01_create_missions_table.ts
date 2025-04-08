module.exports = {
    up(query, DataTypes) {
        query.createTable('missions', {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false
            },
            shipId: {
                type: DataTypes.UUID,
                allowNull: false,
            }
        });
        return Promise.resolve();
    },

    down(query) {
        query.dropTable('missions');
        return Promise.resolve();
    },
};