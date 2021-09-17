import jwt from 'jsonwebtoken';

let payload = {
    iss:"api.com",
    iat: new Date().getSeconds(),
    exp: new Date().setMinutes(60),
    name: "Marcos",
    email:"marcos@marcos.com"
}

const token = jwt.sign(payload,"changeme");

console.log(token);