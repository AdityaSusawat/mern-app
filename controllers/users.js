import User from "../models/User";

/* READ */

export const getUser = async (req, res) => {
  try {
    const { id } = req.params; //capture id value from the URL of the request and make them accessible within your route handlers
    const user = await User.findById(id); //we use the id to find the correct user
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      //because we will make multiple API calls to the db
      user.friends.map((id) => User.findById(id)) //creates an array of promises ; For each id in user.friends, it calls User.findById(id), which returns a promise for finding a user by their ID.
    );
    const formattedFriends = friends.map(
      //make sure we format it the proper way for the frontend
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */

export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      //if the friendId iss included in the main user's friends, then we will remove them from there
      user.friends = user.friends.filter((id) => id !== friendId); //filter method takes a callback function as an arg and this function is applied to each element of the array
      //all id values that are not equal to friendId
      friend.friends = friend.friends.filter((id) => id !== id); //remove the user from the friend's friends as well
    } else {
      user.friends.push(friendId); //add friendId to user's friends
      friend.friends.push(id); //add user to friend's friends
    }

    await user.save(); //to make sure that we save this updated list
    await friend.save();

    const friends = await Promise.all(
      //because we will make multiple API calls to the db
      user.friends.map((id) => User.findById(id)) //creates an array of promises ; For each id in user.friends, it calls User.findById(id), which returns a promise for finding a user by their ID.
    );
    const formattedFriends = friends.map(
      //make sure we format it the proper way for the frontend
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
