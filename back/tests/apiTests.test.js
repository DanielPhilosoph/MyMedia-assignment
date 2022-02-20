const { afterAll, beforeAll, it, expect } = require("@jest/globals");
const request = require("supertest");
const app = require("../app");
const DB = require("../mongo/mongoClass");
jest.setTimeout(11000);

const db = new DB();

let mockDataUsers = [
  {
    firstName: "first",
    lastName: "person",
    email: "first@gmail.com",
    password: "123456789",
  },
  {
    firstName: "second",
    lastName: "person",
    email: "second@gmail.com",
    password: "123456789",
  },
];

beforeAll(async () => {
  await db.deleteAll();
});

afterAll(async () => {
  await db.deleteAll();
});

describe("Register tests", () => {
  it("User can register", async () => {
    mockDataUsers = mockDataUsers.map(async (user) => {
      const response = await request(app).post("/register").send(user).expect(200);
      expect(response.body.user).toBeDefined();
      user._id = response.body.user._id;
      return user;
    });
    mockDataUsers = await Promise.all(mockDataUsers);
  });

  it("User can't register if email is already exists", async () => {
    const response = await request(app)
      .post("/register")
      .send({
        firstName: "sameEmail",
        lastName: "bad",
        email: "first@gmail.com",
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
    const inputs = {
      email: "first@gmail.com",
      password: "123456789",
    };
    const response = await request(app).post("/login").send(inputs).expect(200);
    expect(response.body.user.token).toBeDefined();

    //? Set a user token to mock data
    mockDataUsers = mockDataUsers.map((user) => {
      if (user.email === inputs.email) {
        user.token = response.body.user.token;
      }
      return user;
    });
  });

  it("User can't login if password is wrong", async () => {
    await request(app)
      .post("/login")
      .send({
        email: "first@gmail.com",
        password: "someWrongPassword",
      })
      .expect(401);
  });

  it("User can't login if email is wrong", async () => {
    await request(app)
      .post("/login")
      .send({
        email: "someWrongEmail",
        password: "123456789",
      })
      .expect(401);
  });
});

describe("User tests", () => {
  it("GET /user/:id will NOT work if authorization isn't given", async () => {
    await request(app).get(`/user/${mockDataUsers[0]._id}`).expect(401);
  });

  it("GET /user/:id will return a specific user", async () => {
    let userWithToken;
    mockDataUsers.forEach((user) => {
      if (user.token) {
        userWithToken = user;
      }
    });

    const response = await request(app)
      .get(`/user/${userWithToken._id}`)
      .set("Authorization", userWithToken.token)
      .expect(200);

    expect(response.body.user.firstName).toBe(userWithToken.firstName);
    expect(response.body.user.lastName).toBe(userWithToken.lastName);
    expect(response.body.user.email).toBe(userWithToken.email);
  });

  it("GET /user/:id will return error if does not exists", async () => {
    let userWithToken;
    mockDataUsers.forEach((user) => {
      if (user.token) {
        userWithToken = user;
      }
    });

    await request(app)
      .get(`/user/someIdThatDoesNotExists`)
      .set("Authorization", userWithToken.token)
      .expect(404);
  });

  it("GET /user/users will return all users", async () => {
    let userWithToken;
    mockDataUsers.forEach((user) => {
      if (user.token) {
        userWithToken = user;
      }
    });

    const response = await request(app)
      .get(`/user/users`)
      .set("Authorization", userWithToken.token)
      .expect(200);
    expect(response.body.users).toBeDefined();
    expect(response.body.users.length).toBe(mockDataUsers.length);
  });
});
