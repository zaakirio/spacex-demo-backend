module.exports = {
    up: async (query, DataTypes) => {
        try {
            // Check if columns exist before adding them
            const tableInfo = await query.describeTable('ships');

            if (!tableInfo.type) {
                await query.addColumn('ships', 'type', {
                    type: DataTypes.STRING,
                    allowNull: true,
                    defaultValue: null
                });
            }

            if (!tableInfo.home_port) {
                await query.addColumn('ships', 'home_port', {
                    type: DataTypes.STRING,
                    allowNull: true,
                    defaultValue: null
                });
            }

            if (!tableInfo.year_built) {
                await query.addColumn('ships', 'year_built', {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                    defaultValue: null
                });
            }

            console.log('Migration completed successfully');
        } catch (error) {
            console.error('Migration failed:', error);
            throw error;
        }
    },

    down: async (query) => {
        try {
            const tableInfo = await query.describeTable('ships');

            if (tableInfo.type) {
                await query.removeColumn('ships', 'type');
            }

            if (tableInfo.home_port) {
                await query.removeColumn('ships', 'home_port');
            }

            if (tableInfo.year_built) {
                await query.removeColumn('ships', 'year_built');
            }

            console.log('Migration reverted successfully');
        } catch (error) {
            console.error('Migration revert failed:', error);
            throw error;
        }
    }
}; 