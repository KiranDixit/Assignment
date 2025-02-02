const request = require("supertest");
const app = require("../server");
const { expect } = require("chai");

describe("Hotel Booking API", () => {
  it("should retrieve booking details", (done) => {
    request(app)
      .get(`/rooms/getBookingDetails?emailId=rahuld@gmail.com`)
      .expect(200)
      .end(done);
  });
  it("error", (done) => {
    request(app)
      .get(`/rooms/getBookingDetails?email=viratkohli123@gmail.com`)
      .expect(404)
      .end(done);
  });
});

describe("Listing guests", () => {
  it("should list all guests", (done) => {
    request(app)
      .get("/rooms/guests")
      .end((err, res) => {
        expect(200);
        done();
      });
  });
});
