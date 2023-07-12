const chai = require("chai");
const expect = chai.expect;

class User {
  constructor(name, username, email, address, phone, website, company) {
    this.name = name;
    this.username = username;
    this.email = email;
    this.address = address;
    this.phone = phone;
    this.website = website;
    this.company = company;
  }

  validateUserData() {
    expect(this.name).to.equal("Chelsey Dietrich");
    expect(this.username).to.equal("Kamren");
    expect(this.email).to.equal("Lucio_Hettinger@annie.ca");
    this.address.validateUserData();
    expect(this.phone).to.equal("(254)954-1289");
    expect(this.website).to.equal("demarco.info");
    this.company.validateUserData();
  }
}

class Address {
  constructor(street, suite, city, zipcode, geo) {
    this.street = street;
    this.suite = suite;
    this.city = city;
    this.zipcode = zipcode;
    this.geo = geo;
  }

  validateUserData() {
    expect(this.street).to.equal("Skiles Walks");
    expect(this.suite).to.equal("Suite 351");
    expect(this.city).to.equal("Roscoeview");
    expect(this.zipcode).to.equal("33263");
    this.geo.validateUserData();
  }
}

class Geo {
  constructor(lat, lng) {
    this.lat = lat;
    this.lng = lng;
  }

  validateUserData() {
    expect(this.lat).to.equal("-31.8129");
    expect(this.lng).to.equal("62.5342");
  }
}

class Company {
  constructor(name, catchPhrase, bs) {
    this.name = name;
    this.catchPhrase = catchPhrase;
    this.bs = bs;
  }

  validateUserData() {
    expect(this.name).to.equal("Keebler LLC");
    expect(this.catchPhrase).to.equal("User-centric fault-tolerant solution");
    expect(this.bs).to.equal("revolutionize end-to-end systems");
  }
}

module.exports = { User, Address, Geo, Company };
