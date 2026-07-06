///////////////////////////////////////////////////////////////////////////////////////
// Reinitializing the database ensures that the map is displayed correctly. 
// If the database is not reinitialized, all other functionality will continue to work, but the map will not be visible when using the existing database.

// const path = require("path");

// if (process.env.NODE_ENV !== "production") {
//     require("dotenv").config({
//         path: path.resolve(__dirname, "../.env"),
//     });
// }

// const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");

// const geocodingClient = mbxGeocoding({
//     accessToken: process.env.MAP_TOKEN,
// });

///////////////////////////////////////////////////////////////////////////////////////////////////


const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
    .then(() => {
        console.log("connected to DB");
    })
    .catch((err) => {
        console.log(err)
    });

async function main() {
    await mongoose.connect(MONGO_URL);
};




const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
        ...obj, owner: "6a4724bda9ddd62b7945b9bb"
    }));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");



////////////////////////////////////////////////////////////////////////////////////

// Reinitializing the database ensures that the map is displayed correctly. 
// If the database is not reinitialized, all other functionality will continue to work, but the map will not be visible when using the existing database.

    // await Listing.deleteMany({});

    // for (let obj of initData.data) {

    //     const response = await geocodingClient
    //         .forwardGeocode({
    //             query: `${obj.location}, ${obj.country}`,
    //             limit: 1,
    //         })
    //         .send();

    //     obj.owner = "6a4724bda9ddd62b7945b9bb";
    //     obj.geometry = response.body.features[0].geometry;

    //     const listing = new Listing(obj);
    //     await listing.save();
    // }

    // console.log("Data initialized");


};

initDB();