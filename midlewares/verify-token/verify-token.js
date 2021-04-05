// đây là máy chủ xác thực chính nên không sử dụng xác thực qua proxy
const IS_PROXY = true;

// biến khởi tạo phiên kết nối socket
var verifySocketToken;

// khởi tạo phiên kết nối máy chủ bằng socket nếu IS_PROXY
if (IS_PROXY) verifySocketToken = require("./verify-socket-token");

module.exports = {
    // thêm hàm tự xác thực token độc lập
    verifyTokenOnly: (token) => {
        return new Promise(async (rs, rj) => {
            if (!token) {
                rj("No token for verify");
                return;
            }

            if (IS_PROXY) {
                verifySocketToken.verify(token)
                    .then(user => {
                        rs(user);
                    })
                    .catch(err => {
                        rj(err);
                    });
                return;
            }
            rj("No Authentication method allowed!");
        })
    },
    verifyToken: async (req, res, next) => {
        console.log("token: ", req.token);

        if (!req.token) {
            req.error = "No token for verify";
            next();
            return;
        }
        if (IS_PROXY) {

            verifySocketToken.verify(req.token, req.clientDevice)
                .then(user => {
                    req.user = user;
                    next();
                })
                .catch(err => {
                    req.error = err;
                    next();
                });

            return;
        }

        const { rsaService } = require('cng-node-js-utils');
        // xác thực gốc
        const { serverKey, adminUser } = require('../../server-socketio/admin');

        let publicKey = serverKey.getId();

        if (!publicKey) {
            req.error = "No public key in server";
            next();
            return;
        }

        try {
            let tokenUser = rsaService.verifyToken(req.token, publicKey);

            if (!tokenUser || !tokenUser.username || !tokenUser.iat) {
                throw "No user in token!";
            }
            // console.log("Trả về token user", tokenUser);
            // Kiểm tra user đang tồn tại trong csdl và còn hợp lệ
            let dbUser = await adminUser.getFirstRecord(
                { username: tokenUser.username }
                , {
                    id: 1,
                    username: 1,
                    fullname: 1,
                    nickname: 1,
                    user_type: 1,
                    reg_device_id: 1,
                    role: 1,
                    background: 1,
                    avatar: 1,
                    updated_time: 1,
                    status: 1
                }
            );

            if (!dbUser || !dbUser.username) {
                throw "No user exist!";
            }

            if (!dbUser.status || dbUser.status !== 1) {
                throw "This user was blocked!";
            }

            if (!dbUser.status || dbUser.status !== 1) {
                throw "This user was blocked!";
            }

            // console.log("Token pass",((dbUser.updated_time - tokenUser.iat)/1000).toFixed(3));

            if (dbUser.updated_time > tokenUser.iat) {
                throw `Token did logout ${((dbUser.updated_time - tokenUser.iat) / 1000).toFixed(2)}!`;
            }

            req.user = {
                ...tokenUser,
                ...dbUser
            };

        } catch (e) {
            req.error = e;
        } finally {
            next()
        }
    },
    getOnlineTokens: (req, res, next) => {
        let verifiedTokensOnline = verifySocketToken.getTokenOnline();
        let onlineUsers = [];
        for (const [token, tokenUser] of verifiedTokensOnline.entries()) {
            onlineUsers.push(tokenUser);
        }
        req.finalJson = onlineUsers;
        next();
    }
}