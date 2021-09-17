"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const newsType_1 = __importDefault(require("./types/newsType"));
const schema = (0, graphql_1.buildSchema)(newsType_1.default);
exports.default = schema;
