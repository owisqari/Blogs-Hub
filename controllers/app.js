const express = require("express");
const url = require("mongoose");
const BlogsDB = require("../modules/Blogs");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

url
  .connect(
    "mongodb+srv://admin:admin@cluster0.e0ld66h.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.log("Cannot connect to the database", err);
  });

//config ejs
app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.send("Hello World");
});

//rendring create users form
app.get("/createUsers", (req, res) => {
  BlogsDB.find()
    .then((data) => {
      res.render("createUsers.ejs", { blog: data });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/createUsers", (req, res) => {
  const newBlog = new BlogsDB({
    title: req.body.title,
    body: req.body.model,
  });
  newBlog
    .save()
    .then(() => {
      res.redirect("/createUsers");
    })
    .catch((err) => {
      console.log(err);
    });
});

//displaying blog details
app.get("/blogDetail/:id", (req, res) => {
  BlogsDB.findById(req.params.id)
    .then((data) => {
      res.render("blogDetails.ejs", { blog: data });
    })
    .catch((err) => {
      console.log(err);
    });
});

//deleting blog
app.get("/blogDelete/:id", (req, res) => {
  BlogsDB.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect("/createUsers");
    })
    .catch((err) => {
      console.log(err);
    });
});

//updating blog
app.get("/blogUpdate/:id", (req, res) => {
  BlogsDB.findById(req.params.id)
    .then((data) => {
      res.render("blogUpdate.ejs", { blog: data });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/blogUpdate/:id", (req, res) => {
  BlogsDB.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    body: req.body.body,
  })
    .then(() => {
      res.redirect("/createUsers");
    })
    .catch((err) => {
      console.log(err);
    });
});
//testing port 5050
app.listen(5050, () => {
  console.log("Server is running on port 5050");
});

// BlogsDB.findById(req.params.id)
//     .then((data) => {
//       data.title = req.body.title;
//       data.body = req.body.body;
//       data
//         .save()
//         .then(() => {
//           res.redirect("/createUsers");
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
