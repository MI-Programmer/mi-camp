const mongoose = require("mongoose");
const Campground = require("../models/campground");
const { descriptors, places } = require("./seedHelpers");
const cities = require("./cities");

mongoose.connect("mongodb://localhost:27017/mi-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "66473d638b83a5101dad9ae1",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis voluptatibus debitis, corrupti molestiae eligendi consectetur dolore. Molestiae vitae rerum voluptas sunt non, eum, modi magni ducimus impedit labore corporis nisi?",
      price,
      images: [
        {
          url: "https://res.cloudinary.com/dk4afdlfz/image/upload/v1716022776/MICamp/fyrlcwmzm54qcpauarfn.jpg",
          filename: "MICamp/fyrlcwmzm54qcpauarfn",
        },
        {
          url: "https://res.cloudinary.com/dk4afdlfz/image/upload/v1716022776/MICamp/qw1hmflzurvk6ifricpg.jpg",
          filename: "MICamp/qw1hmflzurvk6ifricpg",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => mongoose.connection.close());
