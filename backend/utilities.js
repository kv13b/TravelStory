const jwt = require("jsonwebtoken");

function authToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  const decoded = jwt.decode(token);
  console.log("Decoded Token:", decoded);

  if (!token) {
    console.error("No token found in the Authorization header.");
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.error("JWT verification failed:", err.message);
      return res.sendStatus(403); // Forbidden
    }

    req.user = user; // Attach the verified user data to the request object
    next(); // Pass control to the next middleware or route handler
  });
}

module.exports = {
  authToken,
};
