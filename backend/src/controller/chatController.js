const Chat = require("../model/Chat");
const User = require("../model/User");

exports.createChat = async (req, res) => {
  const { user } = req.body;
  console.log("user", user);
  console.log("req.user",req.user)

  if (!user) {
    console.log("user param is not exists");
    return res.status(400).send("Error Occured");
  }
  var isChat = await Chat.find({
    $and: [{ user: { $eq: req.user } }, { user: { $eq: user } }],
  })
    .populate("user", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "fullname email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      user: [req.user, user],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "user",
        "-password"
      );
      res.status(200).send(fullChat);
    } catch (err) {
      res.status(400).send(err);
      console.log(err);
    }
  }
};
