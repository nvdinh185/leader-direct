// Database structure created from file: ./db/excel/api-function-granted-users-cdld.xlsx
module.exports = {
    meetings:
    {
        id:
        {
            type: 'INTEGER',
            notNull: 1,
            primaryKey: 1,
            isUnique: 1,
            autoIncrement: 1
        },
        name: { type: 'STRING', length: 2000 },
        description: { type: 'STRING', length: 2000 },
        category: { type: 'STRING', length: 255 },
        img_url: { type: 'STRING', length: 255 },
        attachments: { type: 'STRING', length: 1000 },
        directs: { type: 'STRING', length: 1000 },
        created_time: { type: 'DATETIME' },
        created_user: { type: 'STRING', length: 255 },
        updated_time: { type: 'DATETIME' },
        updated_user: { type: 'STRING', length: 255 },
        status: { type: 'BOOLEAN', defaultValue: '1' }
    },
    directs:
    {
        id:
        {
            type: 'INTEGER',
            notNull: 1,
            primaryKey: 1,
            isUnique: 1,
            autoIncrement: 1
        },
        description: { type: 'STRING', length: 2000 },
        categories: { type: 'STRING', length: 255 },
        executors: { type: 'STRING', length: 2000 },
        assessors: { type: 'STRING', length: 2000 },
        img_url: { type: 'STRING', length: 255 },
        attachments: { type: 'STRING', length: 1000 },
        created_time: { type: 'DATETIME' },
        created_user: { type: 'STRING', length: 255 },
        updated_time: { type: 'DATETIME' },
        updated_user: { type: 'STRING', length: 255 },
        status: { type: 'STRING', length: 255, defaultValue: '1' }
    },
    direct_orgs:
    {
        id: { type: 'INTEGER' },
        direct_id: { type: 'INTEGER' },
        organization_id:
        {
            type: 'STRING',
            foreignKey: 'FOREIGN KEY (course_id) REFERENCES courses(id)',
            length: 50
        },
        organization_role: {},
        description: { type: 'STRING', length: 255 },
        histories: { type: 'STRING', length: 255 },
        status: { type: 'STRING', length: 255 },
        created_time: { type: 'DATETIME' },
        created_user: { type: 'STRING', length: 255 },
        updated_time: { type: 'DATETIME' },
        updated_user: { type: 'STRING', length: 255 }
    },
    direct_executes:
    {
        id:
        {
            type: 'INTEGER',
            notNull: 1,
            primaryKey: 1,
            isUnique: 1,
            autoIncrement: 1
        },
        direct_id:
        {
            type: 'INTEGER',
            notNull: 1,
            foreignKey: 'FOREIGN KEY (course_id) REFERENCES courses(id)'
        },
        organization_id: { type: 'INTEGER', notNull: 1 },
        organization_role: { type: 'STRING', length: 255 },
        description: { type: 'STRING', length: 2000 },
        category: { type: 'STRING', length: 255 },
        attachments: { type: 'STRING', length: 2000 },
        status: { type: 'STRING', length: 255 },
        created_time: { type: 'DATETIME' },
        created_user: { type: 'STRING', length: 50 },
        updated_time: { type: 'DATETIME' },
        updated_user: { type: 'STRING', length: 255 }
    },
    attachments:
    {
        id:
        {
            type: 'INTEGER',
            notNull: 1,
            primaryKey: 1,
            isUnique: 1,
            autoIncrement: 1
        },
        uuid: { type: 'STRING', length: 50 },
        category:
        {
            type: 'STRING',
            foreignKey: 'FOREIGN KEY (course_id) REFERENCES courses(id)',
            length: 255
        },
        file_name: { type: 'STRING', length: 255 },
        file_path: { type: 'STRING', length: 255 },
        file_type: { type: 'STRING', length: 255 },
        url: { type: 'STRING', length: 255 },
        created_time: { type: 'DATETIME' },
        created_user: { type: 'STRING', length: 255 },
        updated_time: { type: 'DATETIME' },
        updated_user: { type: 'DATETIME', length: 50 },
        status: { type: 'BOOLEAN', defaultValue: '1' }
    },
    categories:
    {
        id:
        {
            type: 'INTEGER',
            notNull: 1,
            primaryKey: 1,
            isUnique: 1,
            autoIncrement: 1
        },
        parent_id: { type: 'INTEGER', notNull: 1 },
        code: { type: 'STRING', notNull: 1, length: 50 },
        name: { type: 'STRING', length: 50 },
        description: { type: 'STRING', length: 255 },
        created_time: { type: 'DATETIME' },
        created_user: { type: 'STRING', length: 255 },
        updated_time: { type: 'DATETIME' },
        updated_user: { type: 'STRING', length: 50 },
        status: { type: 'BOOLEAN', defaultValue: '1' }
    }
}
