"use strict";
// Camelize
Object.defineProperty(exports, "__esModule", { value: true });
var camelizeExample = {
    firstName: "John",
    lastName: "Doe",
    userDetails: {
        userId: 1,
        userName: "johndoe"
    }
};
console.log(camelizeExample);
var dp = {
    user: {
        profile: {
            name: 'John'
        }
    },
    posts: [{ id: 1 }]
};
console.log(dp);
