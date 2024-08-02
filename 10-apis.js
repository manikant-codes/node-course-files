const path = require("path");
const fs = require("fs");
const http = require("http");
const url = require("url");

const albumsPath = path.join(__dirname, "data", "albums.json");
const commentsPath = path.join(__dirname, "data", "comments.json");
const postsPath = path.join(__dirname, "data", "posts.json");
const usersPath = path.join(__dirname, "data", "users.json");

const server = http.createServer(function (req, res) {
  const { postId, email } = url.parse(req.url, true).query;

  if (req.url === "/albums") {
    fs.readFile(albumsPath, "utf-8", (err, data) => {
      if (err) {
        res.writeHead(500, {
          "Content-Type": "application/json",
        });
        res.end(
          JSON.stringify({ success: false, msg: "Something went wrong!" })
        );
      } else {
        res.writeHead(200, {
          "Content-Type": "application/json",
        });
        res.end(data);
      }
    });
  } else if (req.url.startsWith("/comments")) {
    fs.readFile(commentsPath, "utf-8", (err, data) => {
      if (err) {
        res.writeHead(500, {
          "Content-Type": "application/json",
        });
        res.end(
          JSON.stringify({ success: false, msg: "Something went wrong!" })
        );
      } else {
        res.writeHead(200, {
          "Content-Type": "application/json",
        });
        const arrData = JSON.parse(data);
        if (postId || email) {
          const filteredData = arrData.filter((value, index, array) => {
            if (value.postId === Number(postId) || value.email === email) {
              return true;
            }
            return false;
          });
          res.end(JSON.stringify(filteredData));
        } else {
          res.end(JSON.stringify(arrData));
        }
      }
    });
  } else {
    res.writeHead(404, {
      "Content-Type": "application/json",
    });
    res.end(JSON.stringify({ success: false, msg: "Path not found!" }));
  }
});

server.listen(5000, () => {
  console.log("Server is listening on port 5000!");
});

// fetch("https://jsonplaceholder.typicode.com/albums")
//   .then((response) => {
//     return response.json();
//   })
//   .then((data) => {
//     fs.writeFile(filePath, JSON.stringify(data), (err) => {
//       if (err) {
//         return console.log("Write failed!");
//       }
//       console.log("Write successful!");
//     });
//   })
//   .catch((err) => {
//     console.log(err);
//   });
