const cron = require("node-cron");
const { hash } = require("bcrypt");
const Auth = require("../repositories/auth");

const authRepository = new Auth();

class User {
  constructor(
    name,
    surname,
    email,
    password,
    identity_no,
    total_account,
    amount,
    percentage
  ) {
    this.name = name;
    this.surname = surname;
    this.password = password;
    this.email = email;
    this.identity_no = identity_no;
    this.total_account = total_account;
    this.amount = amount;
    this.percentage = percentage;
  }
}

const simulatorMod = async () => {
  console.log("simulator working.");
  
  const randomText = (length) =>
    Array(length)
      .fill()
      .map(
        () =>
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"[
            Math.floor(Math.random() * 62)
          ]
      )
      .join("");
  const randomNumber = (length, max = Number.MAX_SAFE_INTEGER) =>
    Math.min(max, Math.floor(Math.random() * Math.pow(10, length)));

  const user1TotalAccount = randomNumber(4, 5000);
  const user1Amount = randomNumber(4, user1TotalAccount);

  const user1 = new User(
    randomText(5),
    randomText(5),
    `${randomText(5)}@mail.com`,
    await hash(randomText(5), 10),
    String(randomNumber(5)),
    user1TotalAccount,
    user1Amount,
    0
  );

  const user2 = new User(
    randomText(5),
    randomText(5),
    `${randomText(5)}@mail.com`,
    await hash(randomText(5), 10),
    String(randomNumber(5)),
    randomNumber(4, 5000),
    0,
    randomNumber(2)
  );
  const user3 = new User(
    randomText(5),
    randomText(5),
    `${randomText(5)}@mail.com`,
    await hash(randomText(5), 10),
    String(randomNumber(5)),
    randomNumber(4, 5000),
    0,
    0
  );

  user1.mod_account = Number((user1.total_account - user1.amount).toFixed(2));
  user1.main_account = user1.amount;
  user1.mod_type = await authRepository.calculateModType(user1);

  user2.main_account = (user2.total_account * user2.percentage) / 100;
  user2.mod_account = Number(
    (user2.total_account - user2.main_account).toFixed(2)
  );
  user2.mod_type = await authRepository.calculateModType(user2);

  user3.mod_type = null;

  const createdUserMany = await authRepository.createMany([
    user1,
    user2,
    user3,
  ]);

  const getAllUser = await authRepository.getAll();

  for (const user of getAllUser) {
    if (user.mod_type === "bronze") {
      user.mod_income = Number(((user.mod_account * 10) / 100).toFixed(2));
      user.total_account = Number(user.mod_income) + Number(user.total_account);
    } else if (user.mod_type === "silver") {
      user.mod_income = Number(((user.mod_account * 15) / 100).toFixed(2));
      user.total_account = Number(user.mod_income) + Number(user.total_account);
    } else if (user.mod_type === "gold") {
      user.mod_income = Number(((user.mod_account * 18) / 100).toFixed(2));
      user.total_account = Number(user.mod_income) + Number(user.total_account);
    } else if (user.mod_type === "diamond") {
      user.mod_income = Number(((user.mod_account * 22) / 100).toFixed(2));
      user.total_account = Number(user.mod_income) + Number(user.total_account);
    } else {
      user.mod_income = 0;
      user.total_account = Number(user.mod_income) + Number(user.total_account);
    }

    await authRepository.update(user);
  }

  const updatedUserList = await authRepository.getAll();
};

//cron.schedule("* * * * *", simulatorMod);
