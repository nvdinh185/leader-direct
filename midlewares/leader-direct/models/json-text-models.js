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
    name: { type: 'STRING', length: 200 },
    description: { type: 'STRING', length: 500 },
    category: { type: 'INTEGER' },
    img_url: { type: 'STRING', length: 255 },
    attachments: { type: 'STRING', length: 1000 },
    directs: { type: 'STRING', length: 1000 },
    created_time: { type: 'DATETIME' },
    created_user: { type: 'STRING', length: 255 },
    updated_time: { type: 'DATETIME' },
    updated_user: { type: 'STRING', length: 255 },
    status: { type: 'BOOLEAN', defaultValue: '1' }
  },
  directs: {
    id: { type: 'INTEGER', notNull: 1, isUnique: 1, autoIncrement: 1 },
    meeting_id: {
      type: 'INTEGER',
      notNull: 1,
      foreignKey: 'FOREIGN KEY (meeting_id) REFERENCES meetings(id)'
    },
    uuid: {
      type: 'STRING',
      notNull: 1,
      primaryKey: 1,
      isUnique: 1,
      length: 50
    },
    description: { type: 'STRING', notNull: 1, length: 500 },
    category: {
      type: 'INTEGER',
      notNull: 1,
      foreignKey: 'FOREIGN KEY (category) REFERENCES categories(id)'
    },
    leader: {
      type: 'INTEGER',
      notNull: 1,
      foreignKey: 'FOREIGN KEY (leader) REFERENCES categories(id)'
    },
    executors: { type: 'STRING', length: 200 },
    assessors: { type: 'STRING', length: 200 },
    img_url: { type: 'STRING', length: 255 },
    due_date: { type: 'DATETIME' },
    created_time: { type: 'DATETIME' },
    created_user: { type: 'STRING', length: 255 },
    updated_time: { type: 'DATETIME' },
    updated_user: { type: 'STRING', length: 255 },
    assess_criteria: { type: 'STRING', length: 2000 },
    percent_complete: { type: 'STRING', length: 255 },
    leader_opinion: { type: 'STRING', length: 500 },
    status: { type: 'INTEGER', defaultValue: '1' }
  },
  direct_logs: {
    uuid: {
      type: 'STRING',
      notNull: 1,
      primaryKey: 1,
      isUnique: 1,
      length: 50
    },
    direct_uuid: {
      type: 'STRING',
      notNull: 1,
      foreignKey: 'FOREIGN KEY (direct_uuid) REFERENCES directs(uuid)',
      length: 50
    },
    updated_fields: { type: 'STRING', length: 500 },
    prev_values: { type: 'STRING', length: 1000 },
    updated_values: { type: 'STRING', length: 1000 },
    updated_user: { type: 'STRING', length: 50 },
    updated_time: { type: 'DATETIME' },
    updated_ip: { type: 'STRING', length: 50 }
  },
  direct_loops: {
    id: {
      type: 'NUMBER',
      notNull: 1,
      primaryKey: 1,
      isUnique: 1,
      autoIncrement: 1
    },
    meeting_id: { type: 'INTEGER' },
    direct_id: { type: 'INTEGER' },
    direct_uuid: {
      type: 'STRING',
      foreignKey: 'FOREIGN KEY (direct_uuid) REFERENCES directs(uuid)',
      length: 50
    },
    executors: { type: 'STRING', length: 500 },
    assessors: { type: 'STRING', length: 500 },
    frequency: { type: 'STRING', length: 255 },
    loop_number: { type: 'NUMBER' },
    created_time: { type: 'DATETIME' },
    created_user: { type: 'STRING', length: 255 },
    updated_time: { type: 'DATETIME' },
    updated_user: { type: 'STRING', length: 255 },
    status: { type: 'BOOLEAN', defaultValue: '1' }
  },
  direct_orgs: {
    id: { type: 'INTEGER', notNull: 1, autoIncrement: 1 },
    uuid: {
      type: 'STRING',
      notNull: 1,
      primaryKey: 1,
      isUnique: 1,
      length: 50
    },
    meeting_id: {
      type: 'INTEGER',
      notNull: 1,
      foreignKey: 'FOREIGN KEY (meeting_id) REFERENCES meetings(id)'
    },
    direct_uuid: {
      type: 'STRING',
      notNull: 1,
      foreignKey: 'FOREIGN KEY (direct_uuid) REFERENCES directs(uuid)',
      length: 50
    },
    organization_id: {
      type: 'INTEGER',
      notNull: 1,
      foreignKey: 'FOREIGN KEY (organization_id) REFERENCES organizations(id)'
    },
    attachments: { type: 'STRING', length: 1000 },
    exec_status: {
      type: 'INTEGER',
      foreignKey: 'FOREIGN KEY (exec_status) REFERENCES categories(id)'
    },
    percent_complete: { type: 'STRING', length: 255 },
    delay_reason: { type: 'STRING', length: 1000 },
    due_date: { type: 'DATETIME' },
    histories: { type: 'STRING', length: 1000 },
    created_time: { type: 'DATETIME' },
    created_user: { type: 'STRING', length: 255 },
    updated_time: { type: 'DATETIME' },
    updated_user: { type: 'STRING', length: 255 },
    status: { type: 'BOOLEAN', defaultValue: '1' }
  },
  direct_executes: {
    id: { type: 'INTEGER', notNull: 1, autoIncrement: 1 },
    uuid: {
      type: 'STRING',
      notNull: 1,
      primaryKey: 1,
      isUnique: 1,
      length: 50
    },
    direct_uuid: {
      type: 'STRING',
      notNull: 1,
      foreignKey: 'FOREIGN KEY (direct_uuid) REFERENCES directs(uuid)',
      length: 50
    },
    direct_org_uuid: {
      type: 'STRING',
      notNull: 1,
      foreignKey: 'FOREIGN KEY (direct_org_id) REFERENCES direct_orgs(id)',
      length: 50
    },
    organization_id: {
      type: 'INTEGER',
      notNull: 1,
      foreignKey: 'FOREIGN KEY (organization_id) REFERENCES organizations(id)'
    },
    update_no: { type: 'INTEGER', notNull: 1 },
    description: { type: 'STRING', length: 1000 },
    category: {
      type: 'INTEGER',
      notNull: 1,
      foreignKey: 'FOREIGN KEY (category) REFERENCES categories(id)'
    },
    attachments: { type: 'STRING', length: 500 },
    created_time: { type: 'DATETIME' },
    created_user: { type: 'STRING', length: 50 },
    is_editable: { type: 'BOOLEAN' },
    status: { type: 'BOOLEAN', defaultValue: '1' }
  },
  direct_assessments: {
    id: { type: 'INTEGER', notNull: 1, autoIncrement: 1 },
    uuid: {
      type: 'STRING',
      notNull: 1,
      primaryKey: 1,
      isUnique: 1,
      length: 50
    },
    meeting_id: {
      type: 'INTEGER',
      notNull: 1,
      foreignKey: 'FOREIGN KEY (meeting_id) REFERENCES meetings(id)'
    },
    direct_uuid: {
      type: 'STRING',
      notNull: 1,
      foreignKey: 'FOREIGN KEY (direct_uuid) REFERENCES directs(uuid)',
      length: 50
    },
    organization_id: {
      type: 'INTEGER',
      notNull: 1,
      foreignKey: 'FOREIGN KEY (organization_id) REFERENCES organizations(id)'
    },
    organization_exe: { type: 'INTEGER', notNull: 1 },
    description: { type: 'STRING', length: 1000 },
    exec_status: {
      type: 'INTEGER',
      notNull: 1,
      foreignKey: 'FOREIGN KEY (category) REFERENCES categories(id)'
    },
    exe_histories: { type: 'STRING', length: 1000 },
    attachments: { type: 'STRING', length: 500 },
    created_time: { type: 'DATETIME' },
    created_user: { type: 'STRING', length: 50 },
    is_editable: { type: 'BOOLEAN' },
    status: { type: 'BOOLEAN', defaultValue: '1' }
  },
  direct_assess_logs: {
    id: { type: 'INTEGER', notNull: 1, autoIncrement: 1 },
    uuid: {
      type: 'STRING',
      notNull: 1,
      primaryKey: 1,
      isUnique: 1,
      length: 50
    },
    direct_uuid: {
      type: 'STRING',
      notNull: 1,
      foreignKey: 'FOREIGN KEY (direct_uuid) REFERENCES directs(uuid)',
      length: 50
    },
    direct_org_uuid: {
      type: 'STRING',
      notNull: 1,
      foreignKey: 'FOREIGN KEY (direct_org_id) REFERENCES direct_orgs(id)',
      length: 50
    },
    direct_exe_uuid: { type: 'STRING', length: 1000 },
    direct_ass_uuid: {
      type: 'INTEGER',
      notNull: 1,
      foreignKey: 'FOREIGN KEY (organization_id) REFERENCES organizations(id)'
    },
    organization_exe: { type: 'INTEGER', notNull: 1 },
    organization_ass: { type: 'INTEGER', notNull: 1 },
    description: { type: 'STRING', length: 1000 },
    update_no: { type: 'INTEGER', notNull: 1 },
    category: {
      type: 'INTEGER',
      notNull: 1,
      foreignKey: 'FOREIGN KEY (category) REFERENCES categories(id)'
    },
    attachments: { type: 'STRING', length: 500 },
    created_time: { type: 'DATETIME' },
    created_user: { type: 'STRING', length: 50 },
    status: { type: 'BOOLEAN', defaultValue: '1' }
  },
  attachments: {
    id: { type: 'INTEGER', notNull: 1, isUnique: 1, autoIncrement: 1 },
    uuid: {
      type: 'STRING',
      notNull: 1,
      primaryKey: 1,
      isUnique: 1,
      length: 50
    },
    category: {
      type: 'INTEGER',
      foreignKey: 'FOREIGN KEY (category) REFERENCES categories(id)'
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
    children: { type: 'STRING', length: 500 },
    value: { type: 'INTEGER', notNull: 1 },
    code: { type: 'STRING', notNull: 1, length: 50 },
    name: { type: 'STRING', length: 50 },
    description: { type: 'STRING', length: 255 },
    bg_color: { type: 'STRING', length: 100 },
    text_color: { type: 'STRING', length: 50 },
    created_time: { type: 'DATETIME' },
    created_user: { type: 'STRING', length: 255 },
    updated_time: { type: 'DATETIME' },
    updated_user: { type: 'STRING', length: 50 },
    status: { type: 'BOOLEAN', defaultValue: '1' }
  }
}
