"use strict";
const apiRoutes = [
    {
        path: "/user-rights",
        route: require("./routers/router-user-rights"),
    },
    {
        path: "/user-tables",
        route: require("./routers/router-user-tables"),
    },
    {
        path: "/models",
        route: require("./routers/router-models"),
    },
    {
        path: "/api",
        route: require("./routers/router-api"),
    }
];
module.exports = (app, ioSubDir) => {
    for (let r of apiRoutes) {
        if (r) {
            console.log("*> THE ROUTES of this server:", `${ioSubDir}${r.path}`);
            app.use(`${ioSubDir}${r.path}`, r.route);
        }
    }
};