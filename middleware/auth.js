import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  //put this in any request where we want to verifyToken
  try {
    let token = req.header("Authorization"); //from the frontend we are grabbing the "Authorization" header and that's where the token will be set

    if (!token) {
      return res.status(403).send("Access denied");
    }

    if (token.startsWith("Bearer ")) {
      //we want the token to be starting from "Bearer "
      token = token.slice(7, token.length).trimLeft(); //then we are take everything from the right side of "Bearer "
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next(); //proceed to the next step of the function
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
