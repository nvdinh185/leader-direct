module.exports = {
    type: "oracle", //  "mongodb" | "oracle" | "sqlite3"
    auto_increment_support: false,
    database: "SERVICE-NAME",
    serverCfg: {
        // phần giành cho các csdl có xác thực
        hosts: [{ host: "xyz", port: 1521 }],
        username: "xxx",
        password: "yyy",
    },
    options: {
        name: "Node-Orm-Pool",
        max: 2,
        min: 2,
        increment: 0,
        idle: 10000,
        timeout: 4,
    },
};