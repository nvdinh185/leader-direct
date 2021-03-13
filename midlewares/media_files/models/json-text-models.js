// Database structure created from file: ./db/excel/media.xlsx
module.exports = {
    organizations: {
        id: {
            type: 'INTEGER',
            notNull: 1,
            primaryKey: 1,
            isUnique: 1,
            autoIncrement: 1
        },
        name: { type: 'STRING', notNull: 1, isUnique: 1 },
        status: { type: 'INTEGER', isIndex: 1 }
    }
}