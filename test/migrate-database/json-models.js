//Create model from file: ./db/excel/database-thietket-excel-orm-13-10-linh.xlsx
module.exports =  {
  tables: {
    table_name: {
      type: 'STRING',
      notNull: '1',
      uniqueKeyMulti: 'table_name,  field_name',
      length: '30'
    },
    field_name: { type: 'STRING', notNull: '1', length: '30' },
    description: { type: 'STRING', length: '1000' },
    orm_data_type: { type: 'STRING', notNull: '1', length: '20' },
    orm_length: { type: 'INTEGER' },
    orm_not_null: { type: 'BOOLEAN' },
    orm_primary_key: { type: 'BOOLEAN' },
    orm_auto_increment: { type: 'BOOLEAN' },
    orm_is_unique: { type: 'BOOLEAN' },
    orm_unique_multi: { type: 'STRING', length: '255' },
    orm_is_index: { type: 'BOOLEAN' },
    orm_index_multi: { type: 'STRING' },
    orm_foreign_key: { type: 'STRING' },
    orm_default_value: { type: 'STRING', length: '255' },
    order_1: { type: 'INTEGER' }
  },
  data_types: {
    model: { type: 'STRING', notNull: '1', primaryKey: '1', length: '20' },
    javascript: { type: 'STRING', length: '20' },
    sqlite: { type: 'STRING', length: '20' },
    oracle: { type: 'STRING', length: '20' },
    mongodb: { type: 'STRING', length: '20' },
    description: { type: 'STRING' }
  },
  organization_type: {
    id: {
      type: 'INTEGER',
      notNull: '1',
      primaryKey: '1',
      autoIncrement: '1'
    },
    name: { type: 'STRING', length: '255' }
  },
  organizations: {
    id: {
      type: 'INTEGER',
      notNull: '1',
      primaryKey: '1',
      autoIncrement: '1'
    },
    parent_id: { type: 'INTEGER' },
    organization_type: { type: 'INTEGER' },
    code: { type: 'STRING', length: '30' },
    name: { type: 'STRING', notNull: '1', length: '255' },
    order_1: { type: 'INTEGER' },
    status: { type: 'BOOLEAN' }
  },
  staffs: {
    id: {
      type: 'INTEGER',
      notNull: '1',
      primaryKey: '1',
      foreignKey: 'FOREIGN KEY (organization_id) REFERENCES organizations(id)',
      autoIncrement: '1'
    },
    code: { type: 'STRING', length: '255' },
    organization_id: { type: 'INTEGER' },
    name: { type: 'STRING', length: '255' },
    phone: { type: 'STRING', length: '255' },
    email: { type: 'STRING', length: '255' },
    start_date: { type: 'DATE' },
    end_date: { type: 'DATE' },
    status: { type: 'BOOLEAN' }
  },
  actions: {
    id: {
      type: 'INTEGER',
      notNull: '1',
      primaryKey: '1',
      autoIncrement: '1'
    },
    code: { type: 'STRING', length: '255' },
    name: { type: 'STRING', length: '255' },
    url: { type: 'STRING', length: '255' },
    status: { type: 'BOOLEAN' }
  },
  menu: {
    id: {
      type: 'INTEGER',
      notNull: '1',
      primaryKey: '1',
      autoIncrement: '1'
    },
    parent_id: { type: 'INTEGER' },
    name: { type: 'STRING', length: '255' },
    url: { type: 'STRING', length: '255' },
    icon: { type: 'STRING' }
  },
  roles: {
    id: {
      type: 'INTEGER',
      notNull: '1',
      primaryKey: '1',
      autoIncrement: '1'
    },
    code: { type: 'STRING', isUnique: '1', length: '255' },
    name: { type: 'STRING', length: '255' },
    menu: { type: 'STRING' },
    permissions: { type: 'STRING' },
    blocked: { type: 'BOOLEAN' },
    description: { type: 'STRING' }
  },
  users: {
    id: {
      type: 'INTEGER',
      notNull: '1',
      primaryKey: '1',
      foreignKey: 'FOREIGN KEY (organization_id) REFERENCES organizations(id)',
      autoIncrement: '1'
    },
    username: { type: 'STRING', isUnique: '1', length: '255' },
    email: { type: 'STRING', length: '255' },
    phone: { type: 'STRING', length: '255' },
    blocked: { type: 'BOOLEAN' },
    roles: { type: 'STRING' },
    organization_id: { type: 'INTEGER' }
  },
  geography: {
    id: { type: 'INTEGER', notNull: '1', primaryKey: '1' },
    parent_id: { type: 'INTEGER' },
    code: { type: 'STRING', length: '255' },
    name: { type: 'STRING', length: '255' },
    address: { type: 'STRING', length: '2000' },
    lat: { type: 'NUMBER' },
    lon: { type: 'NUMBER' },
    country_no: { type: 'STRING', length: '255' },
    province_no: { type: 'STRING', length: '255' },
    district_no: { type: 'STRING', length: '255' },
    ward_no: { type: 'STRING', length: '255' },
    organization_id: { type: 'INTEGER' },
    order_1: { type: 'INTEGER' },
    status: { type: 'BOOLEAN' }
  },
  status_codes: {
    code: { type: 'INTEGER', isUnique: '1' },
    name: { type: 'STRING', length: '255' },
    order_1: { type: 'INTEGER' }
  },
  categories: {
    id: {
      type: 'INTEGER',
      notNull: '1',
      primaryKey: '1',
      autoIncrement: '1'
    },
    code: { type: 'STRING' },
    name: { type: 'STRING', length: '100' },
    type: { type: 'STRING', length: '10' }
  },
  ccdc: {
    id: {
      type: 'INTEGER',
      notNull: '1',
      primaryKey: '1',
      foreignKey: 'FOREIGN KEY (organization_id) REFERENCES organizations(id), FOREIGN KEY (geography_id) REFERENCES geography(id), FOREIGN KEY (status) REFERENCES status_codes(code), FOREIGN KEY (staff_id) REFERENCES staffs(id)',
      autoIncrement: '1'
    },
    reference_id: { type: 'INTEGER' },
    category_id: { type: 'INTEGER' },
    code: { type: 'STRING' },
    name: { type: 'STRING', length: '100' },
    amount: { type: 'INTEGER' },
    date_use: { type: 'DATE' },
    geography_id: { type: 'INTEGER' },
    serial: { type: 'STRING', length: '255' },
    contract_no: { type: 'STRING', length: '255' },
    contract_date: { type: 'DATE' },
    price: { type: 'NUMBER' },
    total_price: { type: 'NUMBER' },
    organization_id: { type: 'INTEGER' },
    staff_id: { type: 'INTEGER' },
    notes: { type: 'STRING' },
    status: { type: 'INTEGER' },
    extras: { type: 'STRING' }
  },
  tscd: {
    id: {
      type: 'INTEGER',
      notNull: '1',
      primaryKey: '1',
      foreignKey: 'FOREIGN KEY (organization_id) REFERENCES organizations(id), FOREIGN KEY (geography_id) REFERENCES geography(id), FOREIGN KEY (status) REFERENCES status_codes(code), FOREIGN KEY (staff_id) REFERENCES staffs(id)',
      autoIncrement: '1'
    },
    reference_id: { type: 'INTEGER' },
    category_id: { type: 'INTEGER' },
    name: { type: 'STRING', length: '255' },
    code: { type: 'STRING' },
    code_group: { type: 'STRING' },
    amount: { type: 'INTEGER' },
    price: { type: 'NUMBER' },
    remain_value: { type: 'NUMBER' },
    business_no: { type: 'STRING' },
    serial: { type: 'STRING', length: '255' },
    approve_no: { type: 'STRING', length: '255' },
    approve_date: { type: 'DATE' },
    invest_no: { type: 'STRING', length: '255' },
    invest_date: { type: 'DATE' },
    duration_use: { type: 'INTEGER' },
    date_in_use: { type: 'DATE' },
    liquidate_no: { type: 'STRING', length: '255' },
    liquidate_date: { type: 'DATE' },
    date_transfer: { type: 'DATE' },
    organization_id: { type: 'INTEGER' },
    geography_id: { type: 'INTEGER' },
    staff_id: { type: 'INTEGER' },
    sun_organization_code: { type: 'STRING', length: '255' },
    sun_staff_code: { type: 'STRING', length: '255' },
    sun_code: { type: 'STRING', length: '255' },
    notes: { type: 'STRING' },
    extras: { type: 'STRING' },
    status: { type: 'INTEGER' }
  },
  history: {
    id: { type: 'INTEGER', notNull: '1', primaryKey: '1' },
    name: { type: 'STRING', length: '255' },
    type: { type: 'STRING', length: '255' },
    date_update: { type: 'DATE' },
    date_liquidate: { type: 'DATE' },
    date_hand_over: { type: 'DATE' },
    date_transfer: { type: 'DATE', length: '100' },
    specified_number: { type: 'NUMBER' },
    user_id: { type: 'STRING', length: '30' },
    user_id_from: { type: 'STRING', length: '30' },
    ccdc_id: { type: 'STRING', length: '30' },
    tscd_id: { type: 'STRING', length: '30' }
  },
  logs: {
    id: {
      type: 'INTEGER',
      notNull: '1',
      primaryKey: '1',
      autoIncrement: '1'
    },
    user_id: { type: 'STRING', notNull: '1', length: '255' },
    action: { type: 'STRING', length: '255' },
    request: { type: 'STRING', length: '2000' }
  },
  extras: {
    id: {
      type: 'INTEGER',
      notNull: '1',
      primaryKey: '1',
      autoIncrement: '1'
    },
    category_id: { type: 'INTEGER' },
    fields: { type: 'STRING' },
    description: { type: 'STRING', length: '2000' }
  }
}
