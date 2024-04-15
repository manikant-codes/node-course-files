const https = require("https");
const fs = require("fs");

const images = [
  "https://bootstrapmade.com/demo/templates/Arsha/assets/img/hero-img.png",
  "https://bootstrapmade.com/demo/templates/Arsha/assets/img/clients/client-1.png",
  "https://bootstrapmade.com/demo/templates/Arsha/assets/img/clients/client-2.png",
  "https://bootstrapmade.com/demo/templates/Arsha/assets/img/clients/client-3.png",
  "https://bootstrapmade.com/demo/templates/Arsha/assets/img/clients/client-4.png",
  "https://bootstrapmade.com/demo/templates/Arsha/assets/img/clients/client-5.png",
  "https://bootstrapmade.com/demo/templates/Arsha/assets/img/clients/client-6.png",
  "https://bootstrapmade.com/demo/templates/Arsha/assets/img/skills.png",
  "https://bootstrapmade.com/demo/templates/Arsha/assets/img/portfolio/portfolio-1.jpg",
  "https://bootstrapmade.com/demo/templates/Arsha/assets/img/portfolio/portfolio-2.jpg",
  "https://bootstrapmade.com/demo/templates/Arsha/assets/img/portfolio/portfolio-3.jpg",
  "https://bootstrapmade.com/demo/templates/Arsha/assets/img/portfolio/portfolio-4.jpg",
  "https://bootstrapmade.com/demo/templates/Arsha/assets/img/portfolio/portfolio-5.jpg",
  "https://bootstrapmade.com/demo/templates/Arsha/assets/img/portfolio/portfolio-6.jpg",
  "https://bootstrapmade.com/demo/templates/Arsha/assets/img/portfolio/portfolio-7.jpg",
  "https://bootstrapmade.com/demo/templates/Arsha/assets/img/portfolio/portfolio-8.jpg",
  "https://bootstrapmade.com/demo/templates/Arsha/assets/img/portfolio/portfolio-9.jpg",
  "https://bootstrapmade.com/demo/templates/Arsha/assets/img/team/team-1.jpg",
  "https://bootstrapmade.com/demo/templates/Arsha/assets/img/team/team-2.jpg",
  "https://bootstrapmade.com/demo/templates/Arsha/assets/img/team/team-3.jpg",
  "https://bootstrapmade.com/demo/templates/Arsha/assets/img/team/team-4.jpg",
];

let index = 1;
for (const img of images) {
  https
    .get(img, (res) => {
      res.pipe(fs.WriteStream(`./images/image${index}.png`));
      index++;
      // res.on("data", (chunk) => {
      //   console.log("chunk", chunk);
      //   fs.writeFileSync("./images/image01.png", chunk, { flag: "a" });
      // });
    })
    .end();
}
