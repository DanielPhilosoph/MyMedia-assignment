const { beforeEach, afterAll, beforeAll, it, expect } = require("@jest/globals");
const request = require("supertest");
const app = require("../../app");
const DB = require("../../mongo/mongoClass");
jest.setTimeout(11000);

const db = new DB();

beforeAll(async () => {
  await db.deleteAll();
});

afterAll(async () => {
  await db.deleteAll();
});

describe("Register tests", () => {
  it("User can register", async () => {
    const response = await request(app)
      .post("/register")
      .send({
        firstName: "eeee",
        lastName: "tttt",
        email: "gafaf@gmail.com",
        password: "123456789",
      })
      .expect(200);
    expect(response.body.user).toBeDefined();
  });

  it("User can't register if email is already exists", async () => {
    const response = await request(app)
      .post("/register")
      .send({
        firstName: "sameEmail",
        lastName: "bad",
        email: "gafaf@gmail.com",
        password: "123456789",
      })
      .expect(403);
    expect(response.error).toBeDefined();
  });

  it("User can't register if password is less then 8 chars", async () => {
    const response = await request(app)
      .post("/register")
      .send({
        firstName: "shortPassword",
        lastName: "bad",
        email: "someOtherEmail@gmail.com",
        password: "1234567",
      })
      .expect(403);
    expect(response.error).toBeDefined();
  });
});

describe("Login tests", () => {
  it("User can login and gets a token", async () => {
    const response = await request(app)
      .post("/login")
      .send({
        email: "gafaf@gmail.com",
        password: "123456789",
      })
      .expect(200);
    expect(response.body.user.token).toBeDefined();
  });

  it("User can't login if password is wrong", async () => {
    await request(app)
      .post("/login")
      .send({
        email: "gafaf@gmail.com",
        password: "someWrongPassword",
      })
      .expect(401);
  });

  it("User can't login if password is wrong", async () => {
    await request(app)
      .post("/login")
      .send({
        email: "someWrongEmail",
        password: "123456789",
      })
      .expect(401);
  });
});
