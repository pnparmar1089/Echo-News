const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const mongoose = require("mongoose");
const UserModel = require("./models/User");
const AuthModel = require("./models/Auth");
const SaveModel = require("./models/Save");
mongoose.connect("mongodb://localhost:27017/Echonews");

const app = express();

app.use(express.json());
app.use(cors());

app.post("/api/register", async (req, res) => {
  try {
    const newPassword = await bcrypt.hash(req.body.password, 10);
    await UserModel.create({
      name: req.body.name,
      email: req.body.email,
      password: newPassword,
    });
    res.json({ status: "ok" });
  } catch (err) {
    res.json({ status: "error", error: "Duplicate email" });
  }
});

app.post("/api/save", async (req, res) => {
  const user = await SaveModel.findOne({
    email: req.body.email,
    title: req.body.title,
  });

  if (!user) {
    try {
      await SaveModel.create({
        email: req.body.email,
        source_is: req.body.source_is,
        source_name: req.body.source_name,
        author: req.body.author,
        title: req.body.title,
        description: req.body.description,
        url: req.body.url,
        urlToImage: req.body.urlToImage,
        publishedAt: req.body.publishedAt,
        content: req.body.content,
      });
      res.json({ status: "ok" });
    } catch (err) {
      res.json({ status: "error", error: "not save" });
    }
    res.json({ status: "ok", status: "saved!" });
  } else {
    res.json( { status: "error", error: "alredy saved!" });
  }
});


app.post("/api/delete", async (req, res) => {
  const user = await SaveModel.findOne({
    email: req.body.email
  });

  if (user) {
    try {
      await SaveModel.deleteOne({
        email: req.body.email,
        title: req.body.title,
        });
      res.json({ status: "ok" });
    } catch (err) {
      res.json({ status: "error", error: "not delete" });
    }
    res.json({ status: "ok", status: "Deleted!" });
  } else {
    res.json( { status: "error", error: "Error to find news" });
  }
});


app.post("/api/login", async (req, res) => {
  const user = await UserModel.findOne({
    email: req.body.email,
  });

  if (!user) {
    return { status: "error", error: "Invalid login" };
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (isPasswordValid) {
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      "secret123"
    );

    await AuthModel.create({
      email: req.body.email,
      token: token,
    });
    return res.json({ status: "ok", user: token });
  } else {
    return res.json({ status: "error", user: false });
  }
});

app.get("/api/checkAuth", async (req, res) => {
  const user = await AuthModel.findOne({
    token: req.headers["token"],
  });
  if (!user) {
    return res.json({ status: "error", user: false });
  } else {
    const decoded = jwt.verify(user.token, "secret123");
    const email = decoded.email;
    const name = decoded.name;
    return res.json({ status: "ok", email: email, name: name });
  }
});

app.get("/api/deletAuth", async (req, res) => {
  const dauth = await AuthModel.deleteMany({
    token: req.headers["token"],
  });
  // console.log(dauth)
  if (!dauth) {
    return res.json({ status: "error", user: false });
  } else {
    return res.json({ status: "ok" });
  }
});

app.get("/api/saved", async (req, res) => {
  const user = await AuthModel.findOne({
    token: req.headers["token"],
  });

  if (!user) {
    return res.json({ status: "error", user: false });
  } else {
    const decoded = jwt.verify(user.token, "secret123");
    const email = decoded.email;
    const news = await SaveModel.find({
      email: email,
    });
    return res.json({ status: "ok", news: news });
  }
});

app.post("/api/changepassword", async (req, res) => {
  const user = await UserModel.findOne({
    email: req.body.email,
  });

  if (!user) {
    return { status: "error", error: "Invalid login" };
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.oldpassword,
    user.password
  );
  const newPassword = await bcrypt.hash(req.body.newpassword, 10);
  if (isPasswordValid) {
    await UserModel.findOneAndUpdate(
      { email: req.body.email },
      { password: newPassword }
    );

    return res.json({ status: "ok" });
  } else {
    return res.json({ status: "error" });
  }
});

app.post("/api/user_name", async (req, res) => {
  const user = await UserModel.findOne({
    email: req.body.email,
  });
  if (user) {
    const name = req.body.newName;
    //  console.log(name)
    await UserModel.findOneAndUpdate({ email: req.body.email }, { name: name });
    return res.json({ status: "ok" });
  } else {
    return res.json({ status: "Error" });
  }
});

app.listen(3001, () => {
  console.log("server is running");
});
// app.get('/api/quote', async (req, res) => {
// 	const token = req.headers['x-access-token']

// 	try {
// 		const decoded = jwt.verify(token, 'secret123')
// 		const email = decoded.email
// 		const user = await User.findOne({ email: email })

// 		return res.json({ status: 'ok', quote: user.quote })
// 	} catch (error) {
// 		console.log(error)
// 		res.json({ status: 'error', error: 'invalid token' })
// 	}
// })

// app.post('/api/quote', async (req, res) => {
// 	const token = req.headers['x-access-token']

// 	try {
// 		const decoded = jwt.verify(token, 'secret123')
// 		const email = decoded.email
// 		await User.updateOne(
// 			{ email: email },
// 			{ $set: { quote: req.body.quote } }
// 		)

// 		return res.json({ status: 'ok' })
// 	} catch (error) {
// 		console.log(error)
// 		res.json({ status: 'error', error: 'invalid token' })
// 	}
// })



// const express = require("express");
// const cors = require("cors");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");

// const mongoose = require("mongoose");
// const UserModel = require("./models/User");
// const AuthModel = require("./models/Auth");
// const SaveModel = require("./models/Save");
// mongoose.connect("mongodb://localhost:27017/Echonews");

// const app = express();

// app.use(express.json());
// app.use(cors());

// app.post("/api/register", async (req, res) => {
//   try {
//     const newPassword = await bcrypt.hash(req.body.password, 10);
//     await UserModel.create({
//       name: req.body.name,
//       email: req.body.email,
//       password: newPassword,
//     });
//     res.json({ status: "ok" });
//   } catch (err) {
//     res.json({ status: "error", error: "Duplicate email" });
//   }
// });

// app.post("/api/save", async (req, res) => {
//   const user = await SaveModel.findOne({
//     email: req.body.email,
//     title: req.body.title,
//   });

//   if (!user) {
//     try {
//       await SaveModel.create({
//         email: req.body.email,
//         source_is: req.body.source_is,
//         source_name: req.body.source_name,
//         author: req.body.author,
//         title: req.body.title,
//         description: req.body.description,
//         url: req.body.url,
//         urlToImage: req.body.urlToImage,
//         publishedAt: req.body.publishedAt,
//         content: req.body.content,
//       });
//       res.json({ status: "ok", status: "saved!" });
//     } catch (err) {
//       res.json({ status: "error", error: "not save" });
//     }
    
//   } else {
//     res.json( { status: "error", error: "alredy saved!" });
//   }
// });

// app.post("/api/delete", async (req, res) => {
//   const user = await SaveModel.findOne({
//     _id: req.body.id
//   });

//   if (user) {
//     try {
//       await SaveModel.deleteOne({
//         email: req.body.email,
//         _id: req.body.id
//         });
//       res.json({ status: "ok", status: "Deleted!" });
//     } catch (err) {
//       res.json({ status: "error", error: "not delete" });
//     }
//   } else {
//     res.json( { status: "error", error: "Error to find news" });
//   }
// });


// app.post("/api/login", async (req, res) => {
//   const user = await UserModel.findOne({
//     email: req.body.email,
//   });

//   if (!user) {
//     return { status: "error", error: "Invalid login" };
//   }

//   const isPasswordValid = await bcrypt.compare(
//     req.body.password,
//     user.password
//   );

//   if (isPasswordValid) {
//     const token = jwt.sign(
//       {
//         name: user.name,
//         email: user.email,
//       },
//       "secret123"
//     );

//     await AuthModel.create({
//       email: req.body.email,
//       token: token,
//     });
//     return res.json({ status: "ok", user: token });
//   } else {
//     return res.json({ status: "error", user: false });
//   }
// });

// app.get("/api/auth/checkAuth", async (req, res) => {
//   const user = await AuthModel.findOne({
//     token: req.headers["token"],
//   });
//   if (!user) {
//     return res.json({ status: "error", user: false });
//   } else {
//     const decoded = jwt.verify(user.token, "secret123");
//     const email = decoded.email;
//     const name = decoded.name;
//     return res.json({ status: "ok", email: email, name: name });
//   }
// });

// app.get("/api/deletAuth", async (req, res) => {
//   const dauth = await AuthModel.deleteMany({
//     token: req.headers["token"],
//   });
//   // console.log(dauth)
//   if (!dauth) {
//     return res.json({ status: "error", user: false });
//   } else {
//     return res.json({ status: "ok" });
//   }
// });

// app.get("/api/saved", async (req, res) => {
//   const user = await AuthModel.findOne({
//     token: req.headers["token"],
//   });

//   if (!user) {
//     return res.json({ status: "error", user: false });
//   } else {
//     const decoded = jwt.verify(user.token, "secret123");
//     const email = decoded.email;
//     const news = await SaveModel.find({
//       email: email,
//     });
//     return res.json({ status: "ok", news: news });
//   }
// });

// app.post("/api/changepassword", async (req, res) => {
//   const user = await UserModel.findOne({
//     email: req.body.email,
//   });

//   if (!user) {
//     return { status: "error", error: "Invalid login" };
//   }

//   const isPasswordValid = await bcrypt.compare(
//     req.body.oldpassword,
//     user.password
//   );
//   const newPassword = await bcrypt.hash(req.body.newpassword, 10);
//   if (isPasswordValid) {
//     await UserModel.findOneAndUpdate(
//       { email: req.body.email },
//       { password: newPassword }
//     );

//     return res.json({ status: "ok" });
//   } else {
//     return res.json({ status: "error" });
//   }
// });

// app.post("/api/profile/user_name", async (req, res) => {
//   const user = await UserModel.findOne({
//     email: req.body.email,
//   });
//   if (user) {
//     const name = req.body.newName;
//     //  console.log(name)
//     await UserModel.findOneAndUpdate({ email: req.body.email }, { name: name });
//     return res.json({ status: "ok" });
//   } else {
//     return res.json({ status: "Error" });
//   }
// });

// app.listen(3001, () => {
//   console.log("server is running");
// });

