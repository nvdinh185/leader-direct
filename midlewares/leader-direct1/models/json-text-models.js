// Database structure created from file: ./db/excel/api-function-granted-users-cdld.xlsx
module.exports = {
    // meetings:
    // {
    //     id:
    //     {
    //         type: 'INTEGER',
    //         notNull: 1,
    //         primaryKey: 1,
    //         isUnique: 1,
    //         autoIncrement: 1
    //     },
    //     name: { type: 'STRING', length: 2000 },
    //     description: { type: 'STRING', length: 2000 },
    //     category: { type: 'STRING', length: 255 },
    //     img_url: { type: 'STRING', length: 255 },
    //     attachments: { type: 'STRING', length: 1000 },
    //     hosts: { type: 'STRING', length: 255 },
    //     directs: { type: 'STRING', length: 1000 },
    //     created_time: { type: 'DATETIME' },
    //     created_user: { type: 'STRING', length: 255 },
    //     updated_time: { type: 'DATETIME' },
    //     updated_user: { type: 'STRING', length: 255 },
    //     status: { type: 'BOOLEAN', defaultValue: '1' }
    // },
    organizations:
    {
        id:
        {
            type: 'INTEGER',
            notNull: 1,
            primaryKey: 1,
            isUnique: 1,
            autoIncrement: 1
        },
        name: { type: 'STRING', length: 50 },
        parent_id: { type: 'INTEGER' },
        created_time: { type: 'DATETIME' },
        updated_time: { type: 'DATETIME' },
        updated_user: { type: 'STRING', length: 50 },
        status: { type: 'BOOLEAN', defaultValue: '1' }
    }
}
