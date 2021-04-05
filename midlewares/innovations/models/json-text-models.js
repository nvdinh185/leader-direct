// Database structure created from file: ./db/excel/sqlite-inovation-manager-v2.xlsx
module.exports = {
    ideas: {
        id: { type: 'INTEGER', notNull: 1, primaryKey: 1, autoIncrement: 1 },
        title: { type: 'STRING' },
        description: { type: 'STRING' },
        attach_id_list: { type: 'STRING' },
        category_id: { type: 'INTEGER' },
        created_time: { type: 'DATETIME' },
        changed_time: { type: 'DATETIME' },
        status: { type: 'BOOLEAN' }
    },
    ideas_attachs: {
        id: { type: 'INTEGER', notNull: 1, primaryKey: 1, autoIncrement: 1 },
        file_name: { type: 'STRING' },
        file_type: { type: 'STRING' },
        file_size: { type: 'INTEGER' },
        file_path: { type: 'STRING' },
        created_time: { type: 'DATETIME' }
    },
    ideas_categories: {
        id: { type: 'INTEGER', notNull: 1, primaryKey: 1, autoIncrement: 1 },
        name: { type: 'STRING' },
        background: { type: 'STRING' },
        is_default: { type: 'BOOLEAN' },
        order_1: { type: 'INTEGER' }
    },
    ideas_statuses: {
        id: { type: 'INTEGER', notNull: 1, primaryKey: 1, autoIncrement: 1 },
        name: { type: 'STRING' },
        is_default: { type: 'BOOLEAN' },
        order_1: { type: 'INTEGER' }
    }
}
