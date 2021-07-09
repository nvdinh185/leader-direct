// Database structure created from file: ./db/excel/api-function-granted-users-cdld.xlsx
module.exports =  {
  meetings: {
    id: {
      type: 'INTEGER',
      notNull: 1,
      primaryKey: 1,
      isUnique: 1,
      autoIncrement: 1
    },
    name: { type: 'STRING', length: 2000 },
    description: { type: 'STRING', length: 2000 },
    category: { type: 'INTEGER' },
    img_url: { type: 'STRING', length: 255 },
    attachments: { type: 'STRING', length: 1000 },
    directs: { type: 'STRING', length: 2000 },
    created_time: { type: 'DATETIME' },
    created_user: { type: 'STRING', length: 255 },
    updated_time: { type: 'DATETIME' },
    updated_user: { type: 'STRING', length: 255 },
    status: { type: 'BOOLEAN', defaultValue: '1' }
  },
  directs: {
    id: {
      type: 'INTEGER',
      notNull: 1,
      primaryKey: 1,
      isUnique: 1,
      autoIncrement: 1
    },
    uuid: { type: 'STRING', notNull: 1, isUnique: 1, length: 50 },
    description: { type: 'STRING', length: 2000 },
    category: { type: 'INTEGER' },
    leader: { type: 'STRING', length: 255 },
    executors: { type: 'STRING', length: 500 },
    assessors: { type: 'STRING', length: 2000 },
    img_url: { type: 'STRING', length: 255 },
    attachments: { type: 'STRING', length: 1000 },
    expired_date: { type: 'DATETIME' },
    created_time: { type: 'DATETIME' },
    created_user: { type: 'STRING', length: 255 },
    updated_time: { type: 'DATETIME' },
    updated_user: { type: 'STRING', length: 255 },
    percent_complete: { type: 'STRING', length: 255 },
    leader_opinion: { type: 'STRING', length: 500 },
    status: { type: 'BOOLEAN' }
  },
  direct_loops: {
    id: { type: 'NUMBER', notNull: 1, primaryKey: 1, autoIncrement: 1 },
    direct_id: { type: 'NUMBER' },
    direct_uuid: { type: 'STRING', length: 50 },
    executors: { type: 'STRING', length: 500 },
    assessors: { type: 'STRING', length: 500 },
    frequency: { type: 'STRING', length: 255 },
    loop_number: { type: 'NUMBER' },
    created_time: { type: 'DATETIME' },
    created_user: { type: 'STRING', length: 255 },
    updated_time: { type: 'DATETIME' },
    updated_user: { type: 'STRING', length: 255 },
    status: { type: 'BOOLEAN' }
  },
  direct_orgs: {
    id: { type: 'INTEGER', notNull: 1, primaryKey: 1, autoIncrement: 1 },
    direct_id: { type: 'INTEGER' },
    direct_uuid: { type: 'STRING', length: 50 },
    organization_id: {
      type: 'INTEGER',
      foreignKey: 'FOREIGN KEY (course_id) REFERENCES courses(id)'
    },
    organization_role: { type: 'INTEGER' },
    attachments: { type: 'STRING', length: 2000 },
    exec_status: { type: 'INTEGER' },
    percent_complete: { type: 'STRING', length: 255 },
    delay_reason: { type: 'STRING', length: 1000 },
    expired_date: { type: 'DATETIME' },
    histories: { type: 'STRING', length: 255 },
    created_time: { type: 'DATETIME' },
    created_user: { type: 'STRING', length: 255 },
    updated_time: { type: 'DATETIME' },
    updated_user: { type: 'STRING', length: 255 },
    status: { type: 'BOOLEAN' }
  },
  direct_executes: {
    id: {
      type: 'INTEGER',
      notNull: 1,
      primaryKey: 1,
      isUnique: 1,
      autoIncrement: 1
    },
    uuid: { type: 'STRING', length: 50 },
    direct_uuid: { type: 'STRING', length: 50 },
    direct_org_id: {
      type: 'INTEGER',
      notNull: 1,
      foreignKey: 'FOREIGN KEY (course_id) REFERENCES courses(id)'
    },
    organization_id: { type: 'INTEGER', notNull: 1 },
    organization_role: { type: 'STRING', length: 255 },
    description: { type: 'STRING', length: 2000 },
    category: { type: 'INTEGER' },
    attachments: { type: 'STRING', length: 2000 },
    created_time: { type: 'DATETIME' },
    created_user: { type: 'STRING', length: 50 },
    updated_time: { type: 'DATETIME' },
    updated_user: { type: 'STRING', length: 255 },
    status: { type: 'BOOLEAN' }
  },
  attachments: {
    id: {
      type: 'INTEGER',
      notNull: 1,
      primaryKey: 1,
      isUnique: 1,
      autoIncrement: 1
    },
    uuid: { type: 'STRING', length: 50 },
    category: {
      type: 'INTEGER',
      foreignKey: 'FOREIGN KEY (course_id) REFERENCES courses(id)'
    },
    file_name: { type: 'STRING', length: 255 },
    file_path: { type: 'STRING', length: 255 },
    file_type: { type: 'STRING', length: 255 },
    url: { type: 'STRING', length: 255 },
    created_time: { type: 'DATETIME' },
    created_user: { type: 'STRING', length: 255 },
    updated_time: { type: 'DATETIME' },
    updated_user: { type: 'STRING', length: 50 },
    status: { type: 'BOOLEAN', defaultValue: '1' }
  },
  categories: {
    id: { type: 'INTEGER', notNull: 1, primaryKey: 1, isUnique: 1 },
    parent_id: { type: 'INTEGER', notNull: 1 },
    children: { type: 'STRING', length: 2000 },
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
