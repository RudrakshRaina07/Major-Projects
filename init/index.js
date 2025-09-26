const mongoose = require("mongoose");
const dataListing = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderLust";

main()
.then(() => {
    console.log("connected to DB");
})
.catch((err) => {
    console.log(err);
});
async function main() {
    await mongoose.connect(MONGO_URL);
}

const data =  async() => {
    await Listing.deleteMany({});
    dataListing.data = dataListing.data.map((obj) => ({...obj, owner: "68c975a61e7f691acebd5194"}));
    await Listing.insertMany(dataListing.data);
    console.log("initialzed");
}

data();