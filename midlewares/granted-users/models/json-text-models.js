// Model create by: ./db/excel/api-function-granted-users-cdld.xlsx
module.exports =  {
  function_apis: {
    id: {
      type: 'INTEGER',
      notNull: 1,
      primaryKey: 1,
      isUnique: 1,
      autoIncrement: 1
    },
    method: { type: 'STRING' },
    base_directory: { type: 'STRING', length: 255 },
    api_router: { type: 'STRING', length: 255 },
    api_function: {
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
  function_groups: {
    id: {
      type: 'INTEGER',
      notNull: 1,
      primaryKey: 1,
      isUnique: 1,
      autoIncrement: 1
    },
    function_apis: { type: 'STRING', notNull: 1 },
    menus_granted: { type: 'STRING', length: 2000 },
    name: { type: 'STRING', length: 255 },
    description: { type: 'STRING' },
    updated_time: { type: 'DATETIME' },
    updated_user: { type: 'STRING', length: 50 },
    status: { type: 'BOOLEAN', defaultValue: '1' }
  },
  function_granted: {
    username: {
      type: 'STRING',
      notNull: 1,
      primaryKey: 1,
      isUnique: 1,
      length: 50
    },
    organization: { type: 'INTEGER' },
    function_groups: { type: 'STRING', length: 2000 },
    function_apis: { type: 'STRING', length: 2000 },
    menus_granted: { type: 'STRING', length: 2000 },
    menu_webs_granted: { type: 'STRING', length: 2000 },
    menu_apps_granted: { type: 'STRING', length: 2000 },
    description: { type: 'STRING', length: 200 },
    updated_time: { type: 'DATETIME' },
    updated_user: { type: 'STRING', length: 50 },
    status: { type: 'BOOLEAN', defaultValue: '1' }
  },
  menu_apis: {
    id: {
      type: 'INTEGER',
      notNull: 1,
      primaryKey: 1,
      isUnique: 1,
      autoIncrement: 1
    },
    parent_id: { type: 'INTEGER' },
    tag_id: { type: 'STRING', length: 30 },
    tag_children_id: { type: 'STRING', length: 30 },
    page: { type: 'STRING', length: 100 },
    icon: { type: 'STRING', length: 50 },
    name: { type: 'STRING', length: 100 },
    description: { type: 'STRING', length: 100 },
    api: { type: 'STRING', length: 1000 },
    api_params: { type: 'STRING', length: 2000 },
    next_id: { type: 'INTEGER' },
    updated_time: { type: 'DATETIME' },
    updated_user: { type: 'STRING', length: 50 },
    status: { type: 'BOOLEAN', defaultValue: '1' }
  },
  organizations: {
    id: {
      type: 'INTEGER',
      notNull: 1,
      primaryKey: 1,
      isUnique: 1,
      autoIncrement: 1
    },
    name: { type: 'STRING', length: 50 },
    code: { type: 'STRING', length: 50 },
    users: { type: 'STRING', length: 2000 },
    parent_id: { type: 'INTEGER' },
    created_time: { type: 'DATETIME' },
    updated_time: { type: 'DATETIME' },
    updated_user: { type: 'STRING', length: 50 },
    status: { type: 'BOOLEAN', defaultValue: '1' }
  },
  column_name_maps: {
    field: {
      type: 'STRING',
      notNull: 1,
      primaryKey: 1,
      isUnique: 1,
      length: 50
    },
    display_name: { type: 'STRING', length: 200 },
    updated_time: { type: 'DATETIME' },
    updated_user: { type: 'STRING', length: 50 }
  }
}
