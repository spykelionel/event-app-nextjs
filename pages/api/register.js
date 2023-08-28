import path from "path";
import fs from "fs";

function buildPath() {
  return path.join(process.cwd(), "data", "users.json");
}

function extractData(filePath) {
  const jsonData = fs.readFileSync(filePath);
  const data = JSON.parse(jsonData);
  return data;
}


export default function handler(req, res) {
  const { method } = req;

  const filePath = buildPath();
  let { users, sessions } = extractData(filePath);

  console.log(users);

  if (!users) {
    return res.status(404).json({
      status: 404,
      message: "User data not found",
    });
  }

  if (method === "POST") {
    const { email, password } = req.body;

    if (!email | !email.includes("@")) {
      res.status(422).json({ message: "Invalid email address" });
    }
    let exist = false;

    users.map((user) => {
      if (user.email === email) {
        exist = true;
        return
      }
      users = [...users, { id: Date.now(), email, password }];
      return users;
    });

    if (!exist) {
      fs.writeFileSync(filePath, JSON.stringify({ users, sessions }));
      return res.status(201).json({
        message: `You have been registered successfully with the email: ${email}`,
      });
    }
    return res.status(409).json({
      message: "Could not register user",
      status: 409,
    });
  }
}
