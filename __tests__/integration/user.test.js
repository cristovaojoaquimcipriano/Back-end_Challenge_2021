const request = require("supertest");
const server = require("../../src/app");
const mongoose = require("mongoose");
const datasync = require("../../src/config/cron");
const userModel = require("../../src/models/user");

beforeAll(async () => {
  // console.log("Teste nos end-points do usuario");
});

afterAll(async () => {
  mongoose.disconnect();
  datasync.stop();
  // console.log("Server stop");
});

const fakeUser = {
  gender: "male",
  name: {
    title: "Mr",
    first: "Zachary",
    last: "Castillo",
  },
  location: {
    street: {
      number: 9471,
      name: "Hamilton Ave",
    },
    city: "Maitland",
    state: "Australian Capital Territory",
    country: "Australia",
    postcode: 1929,
    coordinates: {
      latitude: "-84.8785",
      longitude: "-122.7837",
    },
    timezone: {
      offset: "+5:00",
      description: "Ekaterinburg, Islamabad, Karachi, Tashkent",
    },
  },
  email: "zachary.castillo@example.com",
  login: {
    uuid: "f2af5818-bd8f-49f1-9acd-17d40280a96b",
    username: "smallsnake165",
    password: "passwort",
    salt: "SZI0K0f3",
    md5: "88b2f363583003d3f0fab83443ff41cd",
    sha1: "9437c3ecb55883ed28e40a1132fc7a85208301f8",
    sha256: "f6c32ff82bfdfeb69ff48662653efd1fccbc27f31dbe03e0a2d5890d343cf259",
  },
  dob: {
    date: "1968-09-07T00:40:06.251Z",
    age: 53,
  },
  registered: {
    date: "2016-06-13T08:36:49.993Z",
    age: 5,
  },
  phone: "00-1506-5370",
  cell: "0481-314-142",
  id: {
    name: "TFN",
    value: "518482566",
  },
  picture: {
    large: "https://randomuser.me/api/portraits/men/26.jpg",
    medium: "https://randomuser.me/api/portraits/med/men/26.jpg",
    thumbnail: "https://randomuser.me/api/portraits/thumb/men/26.jpg",
  },
  nat: "AU",
};

describe("Find all users", () => {
  it("Access the route get users", async () => {
    const response = await request(server).get("/users");
    expect(response.status).toBe(200);
  });
});

describe("Find by id", () => {
  it("Access the route get users/:id", async () => {
    const data = await userModel.create(fakeUser);
    const response = await request(server).get("/users/" + data._id);
    expect(response.status).toBe(200);
  });
});

describe("Remove on database", () => {
  it("Access the route delete users/:id", async () => {
    const data = await userModel.create(fakeUser);
    const response = await request(server).delete("/users/" + data._id);
    expect(response.status).toBe(200);
  });
});

describe("Update on database", () => {
  it("Access the route put users/:id", async () => {
    const data = await userModel.create(fakeUser);
    const response = await request(server)
      .put("/users/" + data._id)
      .send({
        name: {
          title: "Mr",
          first: "Cristovão",
          last: "Cipriano",
        },
        status: "draft",
      });

    expect(response.status).toBe(200);
  });
});
