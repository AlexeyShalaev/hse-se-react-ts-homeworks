"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Корректное использование:
var user = {
    name: "John",
    address: {
        city: "New York"
    }
};
console.log(user);
var helloCapitalize = "Hello";
console.log(helloCapitalize);
// Теперь можно изменять значения:
var mutableUser = {
    name: "John",
    address: {
        city: "New York",
        postalCode: 12345
    }
};
mutableUser.name = "Jane";
mutableUser.address.city = "Los Angeles";
console.log(mutableUser);
var params = 'id';
console.log(params);
