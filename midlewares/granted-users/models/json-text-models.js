// Model create by: ./db/excel/api-function-granted-users-cdld.xlsx
module.exports = {
    models:
    {
        model_name: { type: 'STRING', notNull: 1, isUnique: 1, length: 30 },
        db_type: { type: 'STRING', length: 10 },
        db_name: { type: 'STRING', length: 30 },
        db_connection: { type: 'STRING', length: 30 },
        name: { type: 'STRING', length: 255 },
        description: { type: 'STRING' },
        created_date: { type: 'DATE' },
        updated_time: { type: 'DATETIME' },
        updated_user: { type: 'STRING', length: 255 },
        status: { type: 'BOOLEAN', defaultValue: '0' }
    },
    table_models:
    {
        id:
        {
            type: 'INTEGER',
            notNull: 1,
            primaryKey: 1,
            isUnique: 1,
            autoIncrement: 1
        },
        model_name:
        {
            type: 'STRING',
            uniqueKeyMulti: 'model_name, table_name',
            length: 50
        },
        table_name: { type: 'STRING', length: 50 },
        name: { type: 'STRING', length: 100 },
        updated_time: { type: 'DATETIME' },
        updated_user: { type: 'STRING', length: 50 },
        status: { type: 'BOOLEAN', defaultValue: '1' }
    },
    table_groups:
    {
        id:
        {
            type: 'INTEGER',
            notNull: 1,
            primaryKey: 1,
            isUnique: 1,
            autoIncrement: 1
        },
        table_models: { type: 'STRING' },
        name: { type: 'STRING', length: 255 },
        updated_time: { type: 'DATETIME' },
        updated_user: { type: 'STRING', length: 50 },
        status: { type: 'BOOLEAN', defaultValue: '1' }
    },
    api_routers:
    {
        api_router: { type: 'STRING', notNull: 1, length: 255 },
        name: { type: 'STRING', notNull: 1, length: 255 }
    },
    function_apis:
    {
        id:
        {
            type: 'INTEGER',
            notNull: 1,
            primaryKey: 1,
            isUnique: 1,
            autoIncrement: 1
        },
        method: { type: 'STRING' },
        base_directory: { type: 'STRING', length: 255 },
        api_router: { type: 'STRING', length: 255 },
        api_function:
        {
            type: 'STRING',
            notNull: 1,
            uniqueKeyMulti: 'method, api_function',
            length: 255
        },
        has_token: { type: 'BOOLEAN' },
        has_granted: { type: 'BOOLEAN' },
        has_log: { type: 'BOOLEAN' },
        form_data: { type: 'STRING' },
        name: { type: 'STRING', length: 255 },
        description: { type: 'STRING' },
        status: { type: 'BOOLEAN', defaultValue: '1' },
        sample_data: { type: 'STRING' },
        sample_results: { type: 'STRING' }
    },
    function_groups:
    {
        id: { type: 'INTEGER', notNull: 1, primaryKey: 1, isUnique: 1 },
        function_apis: { type: 'STRING', notNull: 1 },
        name: { type: 'STRING', length: 255 },
        description: { type: 'STRING' },
        updated_time: { type: 'DATETIME' },
        updated_user: { type: 'STRING', length: 50 },
        status: { type: 'BOOLEAN', defaultValue: '1' }
    },
    function_granted:
    {
        username:
        {
            type: 'STRING',
            notNull: 1,
            primaryKey: 1,
            isUnique: 1,
            length: 50
        },
        function_groups: { type: 'STRING' },
        function_apis: { type: 'STRING' },
        menu_apis_granted: { type: 'STRING' },
        menu_webs_granted: { type: 'STRING' },
        menu_apps_granted: { type: 'STRING' },
        table_groups: { type: 'STRING' },
        table_models: { type: 'STRING' },
        description: { type: 'STRING' },
        updated_time: { type: 'DATETIME' },
        updated_user: { type: 'STRING', length: 50 },
        status: { type: 'BOOLEAN', defaultValue: '1' }
    },
    menu_apis:
    {
        id:
        {
            type: 'INTEGER',
            notNull: 1,
            primaryKey: 1,
            isUnique: 1,
            autoIncrement: 1
        },
        parent_id: { type: 'INTEGER' },
        tag_id: { type: 'STRING', length: 30 },
        tag_children_id: { type: 'STRING', length: 30 },
        is_active: { type: 'BOOLEAN' },
        page: { type: 'STRING', length: 100 },
        name: { type: 'STRING', length: 100 },
        description: { type: 'STRING' },
        api: { type: 'STRING' },
        api_params: { type: 'STRING' },
        next_id: { type: 'INTEGER' },
        updated_time: { type: 'DATETIME' },
        updated_user: { type: 'STRING', length: 50 },
        status: { type: 'BOOLEAN', defaultValue: '1' }
    }
}
