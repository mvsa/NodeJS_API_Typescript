"use strict";
//mudar para utilizar .env
//o instrutor já expoe a instancia da classe, é a melhor solução?
Object.defineProperty(exports, "__esModule", { value: true });
class Configs {
    constructor() {
        this.secret = "changeme";
    }
}
exports.default = new Configs();
