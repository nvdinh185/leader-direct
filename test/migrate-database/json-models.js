//Create model from file: ./db/excel/function-granted-users-sso.xlsx
module.exports =  {
  social_users: {
    id: {
      type: 'STRING',
      notNull: 1,
      uniqueKeyMulti: 'id,provider',
      length: 50
    },
    provider: { type: 'STRING', notNull: 1, length: 30 },
    phone: { type: 'STRING', length: 30 },
    email: { type: 'STRING', length: 255 },
    avatar: { type: 'STRING', length: 1000 },
    name: { type: 'STRING', length: 500 },
    raw_data: { type: 'STRING' },
    created_time: { type: 'TIMESTAMP' },
    updated_time: { type: 'TIMESTAMP' },
    token: { type: 'STRING' },
    status: { type: 'INTEGER' }
  },
  server_keys: {
    service_id: {
      type: 'STRING',
      notNull: 1,
      primaryKey: 1,
      isUnique: 1,
      length: 255
    },
    service_name: { type: 'STRING', length: 255 },
    public_key: { type: 'STRING', length: 255 },
    private_password_key: { type: 'STRING', length: 1000 },
    server_name: { type: 'STRING', length: 500 },
    server_url: { type: 'STRING', length: 255 },
    created_time: { type: 'STRING', length: 50 },
    signature: { type: 'STRING', length: 255 },
    status: { type: 'INTEGER' }
  },
  client_devices: {
    id: {
      type: 'INTEGER',
      notNull: 1,
      primaryKey: 1,
      isUnique: 1,
      autoIncrement: 1
    },
    parent_id: { type: 'INTEGER' },
    public_key: { type: 'STRING', isUnique: 1, length: 300 },
    client_app: { type: 'STRING', length: 255 },
    client_name: { type: 'STRING', length: 1000 },
    client_signature: { type: 'STRING', length: 2000 },
    client_device: { type: 'STRING', length: 1000 },
    device_name: { type: 'STRING', length: 500 },
    created_ip: { type: 'STRING', length: 255 },
    created_time: { type: 'STRING', length: 255 },
    socket_status: { type: 'INTEGER' },
    socket_online_count: { type: 'INTEGER' },
    last_socket_id: { type: 'STRING', length: 255 },
    last_device: { type: 'STRING', length: 1000 },
    last_access_ip: { type: 'STRING', length: 255 },
    last_access_time: { type: 'INTEGER' },
    count_all: { type: 'INTEGER', defaultValue: '1' },
    server_public_key: { type: 'STRING', length: 1000 },
    last_client_info: { type: 'STRING', length: 1000 },
    server_signature: { type: 'STRING', length: 1000 },
    status: { type: 'INTEGER', defaultValue: '1' }
  },
  admin_users: {
    id: {
      type: 'INTEGER',
      notNull: 1,
      primaryKey: 1,
      isUnique: 1,
      autoIncrement: 1
    },
    username: { type: 'STRING', isUnique: 1, length: 255 },
    user_type: { type: 'STRING', length: 255 },
    reg_device_id: { type: 'INTEGER' },
    created_time: { type: 'STRING', length: 255 },
    server_public_key: { type: 'STRING', length: 2000 },
    server_signature: { type: 'STRING', length: 2000 },
    password_sign: { type: 'STRING', length: 2000 },
    public_key: { type: 'STRING', length: 2000 },
    private_password_key: { type: 'STRING', length: 2000 },
    user_signature: { type: 'STRING', length: 2000 },
    role: { type: 'INTEGER', defaultValue: '0' },
    fullname: { type: 'STRING', length: 255 },
    nickname: { type: 'STRING', length: 255 },
    address: { type: 'STRING', length: 500 },
    email: { type: 'STRING', length: 255 },
    phone: { type: 'STRING', length: 255 },
    avatar: { type: 'STRING', length: 2000 },
    background: { type: 'STRING', length: 2000 },
    start_time: { type: 'INTEGER' },
    end_time: { type: 'INTEGER' },
    updated_time: { type: 'INTEGER' },
    broadcast_status: { type: 'INTEGER', defaultValue: '1' },
    confident: { type: 'INTEGER' },
    socket_status: { type: 'INTEGER' },
    socket_online_count: { type: 'INTEGER' },
    last_socket_id: { type: 'STRING', length: 255 },
    last_device_id: { type: 'INTEGER' },
    last_device: { type: 'STRING', length: 1000 },
    last_access_ip: { type: 'STRING', length: 255 },
    last_access_time: { type: 'INTEGER' },
    count_all: { type: 'INTEGER', defaultValue: '1' },
    status: { type: 'INTEGER', defaultValue: '2' }
  },
  admin_user_clients: {
    user_id: {
      type: 'STRING',
      uniqueKeyMulti: 'user_id, client_id',
      length: 255
    },
    client_id: { type: 'STRING', length: 255 },
    created_ip: { type: 'STRING', length: 255 },
    created_time: { type: 'INTEGER' },
    confirm_type: { type: 'STRING', length: 255 },
    status: { type: 'INTEGER', defaultValue: '2' }
  }
}
