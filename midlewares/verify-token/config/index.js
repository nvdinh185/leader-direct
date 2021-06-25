module.exports = {
  APP_NAME: "API-SERVER",
  socketLink: {
    url: "https://c3.mobifone.vn",
    path: "/socket",
    timeout: 10000,
    // đường dẫn xác thực user qua post {token,username,device_id,device_name}
    userInfoPath: "/socket/api/get-user-info",
    // đường dẫn xác thực chính token - không dùng user proxy nữa mà xác thực chính token của nó
    tokenInfoPath: "/socket/admin-users/get-token-info",
  },
  deviceKey: {
    id: "MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAJceK9mBl3KK+guaEpj986kmQIQTrkN/MN24EYdUz/tulaKZayyBf4FouWjgFsCDNGfJ6wd+dD6mKXnQpcg5XjECAwEAAQ==",
    key: "MIIBOQIBAAJBAJceK9mBl3KK+guaEpj986kmQIQTrkN/MN24EYdUz/tulaKZayyBf4FouWjgFsCDNGfJ6wd+dD6mKXnQpcg5XjECAwEAAQJALVJAJmhmSlUB7s7TewzWsckmGjZo0hdoSWa14xd9lNM8hZQ3VI6uFhumCE6SRJP9IR/dFRYhfqhMudYz+HyCrQIhAMsScxF7Lt5cRavDrsE+aC7W3wYJgT3b5ptiYxE413bLAiEAvoEwGBB0cjhMt6guNrCdAwZZHqCCG9FymasuTxcr43MCIA3Ks/v09MrvU2AGC0Fenq7Hsx/y108/NxtIhFfwF1ofAiAswaMv9CW3c/yqJUv+M04gGMy1QlZu/K0k5y+xCyuXewIgMiKeuX7aIwPO8YdjHB8EgVTwzxTVIMWkF7TuVxnJsxc=",
    created_time: "2020-09-24 19:57:04",
  },
  // token cho máy resource, chỉ cần trùng cặp key và token được cấp theo ứng dụng sẽ login được
  token: "xyz",
  isDebug: false,
};
