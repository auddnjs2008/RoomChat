export const userFriends = (req, res) => {
  res.render("userfriends", { subtitle: "friends", users });
};
export const userRooms = (req, res) =>
  res.render("userrooms", { subtitle: "rooms" });

export const roomDetail = (req, res) =>
  res.render("roomdetail", { subtitle: "roomDetail" });

export const userProfile = (req, res) =>
  res.render("profile", { subtitle: "Profile" });
