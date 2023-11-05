const jane = User.build({ Uid: 1, Uname: "ani@gmail.com", Upasswd:"ani", Mid:3 });
  console.log(jane)
  await jane.save();


// const jane = await User.create({ Uid: 1, Uname: "ani@gmail.com", Upasswd:"ani", Mid:3 });
// console.log(jane.toJSON()); // This is good!

// jane.name = "Ada";
// // the name is still "Jane" in the database
// await jane.save();
// // Now the name was updated to "Ada" in the database!