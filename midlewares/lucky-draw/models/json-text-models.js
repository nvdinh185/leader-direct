// Database structure created from file: ./db/excel/function-granted-users-lucky-draw-1.0.xlsx
module.exports = {
  organizations: {
    id: {
      type: 'INTEGER',
      notNull: 1,
      primaryKey: 1,
      isUnique: 1,
      autoIncrement: 1
    },
    parent_id: {
      type: 'INTEGER',
      foreignKey: 'FOREIGN KEY (parent_id) REFERENCES organizations(id)'
    },
    code: { type: 'STRING', isUnique: 1 },
    short_name: { type: 'STRING' },
    name: { type: 'STRING', length: 100 },
    status: { type: 'INTEGER' },
    order_1: { type: 'INTEGER' }
  }
}
