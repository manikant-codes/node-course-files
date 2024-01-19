const fs = require("fs");
const https = require("https");
const Stream = require("stream").Transform;

let counter = 0;

const urls = [
  "https://laasyaart.com/wp-content/uploads/2019/07/anuradha_boxed.jpg",
  "https://laasyaart.com/wp-content/uploads/2021/07/ramachandran-serigraph-blog-350x270.jpg",
  "https://laasyaart.com/wp-content/uploads/2019/07/Shaktii_boxed.jpg",
  "https://laasyaart.com/wp-content/uploads/2019/07/bharti_boxed.jpg",
  "https://laasyaart.com/wp-content/uploads/2023/06/br-listing.jpg",
  "https://laasyaart.com/wp-content/uploads/2019/07/deepa-vedapak_boxed.jpg",
  "https://laasyaart.com/wp-content/uploads/2019/07/jaggananth_boxed.jpg",
  "https://laasyaart.com/wp-content/uploads/2021/09/JAMINI-ROY.jpg",
  "https://laasyaart.com/wp-content/uploads/2020/06/Je-Shen-artish-Laasya-art.jpg",
  "https://laasyaart.com/wp-content/uploads/2019/07/kalamkari_boxed.jpg",
  "https://laasyaart.com/wp-content/uploads/2019/07/kandi_boxed.jpg",
  "https://laasyaart.com/wp-content/uploads/2019/07/laxma_boxed-1.jpg",
  "https://laasyaart.com/wp-content/uploads/2021/01/madhuri-artist-page-snip.jpg",
  "https://laasyaart.com/wp-content/uploads/2019/07/mf-husain-boxed.jpg",
  "https://laasyaart.com/wp-content/uploads/2019/07/Satya-Narayan-Lal-Karn-_-Boxed.jpg",
  "https://laasyaart.com/wp-content/uploads/2019/07/nishant_boxed.jpg",
  "https://laasyaart.com/wp-content/uploads/2022/06/1.jpg",
  "https://laasyaart.com/wp-content/uploads/2020/06/Ramesh-Gorjala-Indian-comtemporary-artist.jpg",
  "https://laasyaart.com/wp-content/uploads/2019/07/Surya-Namaskar_boxed.jpg",
  "https://laasyaart.com/wp-content/uploads/2019/07/Lakshmi-and-Ganesh-_-Acrylic-on-canvas-with-24ct-gold-and-silver-leaf-_-36-X-48-inches-_-SOLD-1-350x270.jpg",
  "https://laasyaart.com/wp-content/uploads/2020/08/Senaka-Artist.jpg",
  "https://laasyaart.com/wp-content/uploads/2023/03/IMG_4692-copy-320x270-1.jpg",
  "https://laasyaart.com/wp-content/uploads/2019/07/sudip_boxed.jpg",
  "https://laasyaart.com/wp-content/uploads/2019/07/sujata_boxed.jpg",
  "https://laasyaart.com/wp-content/uploads/2019/07/Radha-Krishna_boxed.jpg",
  "https://laasyaart.com/wp-content/uploads/2021/08/thota-original-art.jpg",
  "https://laasyaart.com/wp-content/uploads/2021/09/VINITA-KARIM.jpg",
  "https://laasyaart.com/wp-content/uploads/2023/01/nandi-new.jpg",
];

function downloadImage(url) {
  https
    .request(url, function (res) {
      const data = new Stream();
      res.on("data", function (chunk) {
        data.push(chunk);
      });

      res.on("end", function () {
        counter++;
        fs.writeFile(`./images/${counter}.jpg`, data.read(), function (err) {
          if (err) {
            console.log(err);
            console.log("Downlad failed :(");
          } else {
            console.log("Downladed :)");
          }
        });
      });
    })
    .end();
}

urls.forEach((url) => {
  downloadImage(url);
});
