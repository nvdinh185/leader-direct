// Database structure created from file: ./db/excel/sqlite-inovation-manager-v2.xlsx
module.exports = {
    users: {
        id: { type: 'INTEGER', notNull: 1, primaryKey: 1, autoIncrement: 1 },
        username: { type: 'STRING' },
        password: { type: 'STRING' },
        fullname: { type: 'STRING' },
        nickname: { type: 'STRING' },
        phone: { type: 'STRING' },
        email: { type: 'STRING' },
        address: { type: 'STRING' },
        avatar: { type: 'STRING' },
        background: { type: 'STRING' },
        role: { type: 'INTEGER', defaultValue: '1' },
        created_time: { type: 'DATETIME' },
        updated_time: { type: 'DATETIME' },
        status: { type: 'BOOLEAN' }
    },
    ideas: {
        id: { type: 'INTEGER', notNull: 1, primaryKey: 1, autoIncrement: 1 },
        title: { type: 'STRING' },
        description: { type: 'STRING' },
        attach_id_list: { type: 'STRING' },
        category_id: { type: 'INTEGER' },
        user_id: { type: 'INTEGER' },
        created_time: { type: 'DATETIME' },
        changed_username: { type: 'STRING' },
        changed_time: { type: 'DATETIME' },
        voted_users: { type: 'STRING' },
        commented_users: { type: 'STRING' },
        voted_count: { type: 'INTEGER', defaultValue: '0' },
        commented_count: { type: 'INTEGER', defaultValue: '0' },
        total_point: { type: 'NUMBER', defaultValue: '0' },
        status: { type: 'BOOLEAN' }
    },
    ideas_comments: {
        id: { type: 'INTEGER', notNull: 1, primaryKey: 1, autoIncrement: 1 },
        created_time: { type: 'INTEGER' },
        content: { type: 'STRING' },
        attach_id_list: { type: 'STRING' },
        idea_id: { type: 'INTEGER' },
        user_id: { type: 'INTEGER' }
    },
    ideas_interactives: {
        id: { type: 'INTEGER', notNull: 1, primaryKey: 1, autoIncrement: 1 },
        user_id: { type: 'INTEGER' },
        idea_id: { type: 'INTEGER' },
        created_time: { type: 'DATETIME' },
        activities_type: { type: 'INTEGER' }
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
    },
    ideas_questions: {
        id: { type: 'INTEGER', notNull: 1, primaryKey: 1, autoIncrement: 1 },
        question: { type: 'STRING' },
        min_point: { type: 'NUMBER' },
        max_point: { type: 'NUMBER' },
        weight: { type: 'NUMBER' },
        order_1: { type: 'INTEGER' }
    },
    ideas_marks: {
        idea_id: { type: 'INTEGER', isUnique: 1 },
        question_id: { type: 'INTEGER', isUnique: 1 },
        user_id: { type: 'INTEGER', isUnique: 1 },
        point: { type: 'NUMBER' },
        created_time: { type: 'DATETIME' },
        updated_time: { type: 'DATETIME' }
    }
}
