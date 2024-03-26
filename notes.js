// Steps
// Folder banana hai.
// Us folder ko vs code ke saath open karna hai.
// vs code me terminal open karna hai, aur us terminal me ye command likhna hai: npm init -y
// Is se aapka ek node project initialize hoojaega.
// Itna karne ke baad ek server.js/app.js/index.js file banani hai.
// Iske baad kuch packages install karne hai:
// cors, dotenv, express, mongoose, nodemon insab ka installation command dekhlena.
// Iske baad nodemon ka script add karna hai. package.json me jaana hai aur wa scripts me ye script add karni hai: "start": "nodemon index.js/app.js/server.js".
// Uske baad aap ko express ka use kar ke server banana hai aur app.listen() ka use karke wo server configure karna hai.

// Ye folders banane hai kyu ke hame MVC architecture follow karna hai (Model View Controller):
// controllers
// routes
// models
// middlewares
// db

// Reviews

// Pehle CRUD karlena hai.
// Populate method ka use kar ke review jo mil raha hai us me user aur product ke info add karsakte hai. Ham store sirf id kar rahe hai unki.
// Fir populate aur mongoose virtuals ka use kar ke ham product jo hame mil raha hai us me us product ke reviews add kar sakte hai. Ye ek virtual property hoogi, yane ye database me stored nahi hai, jab ham fetch karrahe hain us samay add karenge.
// ProductSchema.virtual("reviews", {
//     ref: "Review",
//     localField: "_id",
//     foreignField: "product",
//     justOne: false,
//     // match: { rating: 5 },
//   });

// Is se bhi pehle ham user aur product ko mila ke ek unique index set karenge ta ke ek user ek product pe ek hi review desake.
// ReviewSchema.index({ product: 1, user: 1 }, { unique: true });

// Iske baad product schema pe ham post deleteOne hook define karenge isme {document: true} dena jaruru rahe ga agar ham chahte hai ke this andar document ko refer kare. Is me ham us product ke related sare reviews delete kardenge.
