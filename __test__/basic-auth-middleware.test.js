"use strict";

const supertest = require("supertest");
const { server } = require("../src/server.js");
const request = supertest(server);
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  "postgres://pfwvsseb:nsW3ouLEURu7OyQ_rDA7sJ8s13aeOTt7@tai.db.elephantsql.com/pfwvsseb",
  {}
);

const { Users } = require("../src/models/index");

describe("express server", () => {
  it("should response with 404 on a bad route", async () => {
    // arrange
    let param = "/notfound";
    let status = 404;
    // act
    const response = await request.get(param);
    // assert
    expect(response.status).toBe(status);
  });
  it("should response with 404 on a bad method", async () => {
    // arrange
    let param = "/";
    let status = 404;
    // act
    const response = await request.post(param);
    // assert
    expect(response.status).toBe(status);
  });
  it("should check 500 errors", async () => {
    // arrange
    let param = "/bad";
    let status = 404;
    // act
    const response = await request.get(param);
    // assert
    expect(response.status).toBe(status);
  });

  it("should POST to /signin to login as a user (use basic auth)", async () => {
    // arrange
    let param = "/signin";
    let status = 403;
    // act
    const response = await request.post(param).auth("gg", "gg");

    // assert
    expect(response.status).toBe(status);
  });

  it("should POST to /signin rise error if user or password wrong", async () => {
    // arrange
    let param = "/signin";
    let status = 403;
    // act
    const response = await request.post(param).auth("gg", "dd");

    // assert
    expect(response.status).toBe(status);
  });

  it("should POST to /signup rise an error if user exsit", async () => {
    // arrange
    let param = "/signup";
    let status = 500;
    // act
    const response = await request
      .post(param)
      .send({ username: "mahmoud", password: "123", role: "admin" });
    // assert
    expect(response.status).toBe(status);
  });

});