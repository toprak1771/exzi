const { hash, compare } = require("bcrypt");

const RepositoryMain = require("./repository_main");
const { PrismaClient } = require("@prisma/client");
const { ErrorHandler } = require("../utils/errorhandler");
const { sign } = require("jsonwebtoken");
const prisma = new PrismaClient();
const SECRET_KEY = process.env.SECRET_KEY;

class Auth extends RepositoryMain {

  async register(data) {
    try {
      const findUser = await prisma.user.findFirst({
        where: {
          OR: [
            {
              email: data.email,
            },
            { identity_no: data.identity_no },
          ],
        },
      });

      if (findUser) {
        throw new ErrorHandler(409, "This user or identity_no already use.");
      }

      let { newData } = await this.calculateMainModAccount(data);

      const hashedPassword = await hash(newData.password, 10);
      const createUser = await prisma.user.create({
        data: {
          ...newData,
          password: hashedPassword,
        },
      });

      return createUser;
    } catch (error) {
      console.error("Hata:", error);
      throw new ErrorHandler(500, error.message);
    }
  }

  async getAll() {
    try {
      const getAllUsers = await prisma.user.findMany();
      return getAllUsers;
    } catch (error) {
      console.error("Hata:", error);
      throw new ErrorHandler(500, error.message);
    }
  }

  async createMany(data) {
    try {
      const createdManyUser = await prisma.user.createMany({
        data:data
      });
      return createdManyUser;
    } catch (error) {
      console.error("Hata:", error);
      throw new ErrorHandler(500, error.message);
    }
  }

  async login(data) {
    try {
      console.log("data:", data);

      const findUser = await prisma.user.findFirst({
        where: { email: data.email },
      });
      if (!findUser) {
        throw new ErrorHandler(409, "User doens't exist.");
      }

      const isPasswordMatch = await compare(data.password, findUser.password);

      if (!isPasswordMatch) {
        throw new ErrorHandler(409, "Password doesnt match.");
      }

      const token = await this.createToken(findUser);

      return { token, findUser };
    } catch (error) {
      console.error("Hata:", error);
      throw new ErrorHandler(500, error.message);
    }
  }

  async createToken(user) {
    const dataStoredInToken = { id: user.id };
    const secretKey = SECRET_KEY;
    const expiresIn = 5 * 60 * 60;

    return {
      expiresIn,
      token: sign(dataStoredInToken, secretKey, { expiresIn: expiresIn }),
    };
  }

  async update(user){
    console.log("updateUserr:",user);
    try {
      const updatedUser = await prisma.user.update({
        where:{
          id:user.id
        },
        data:user
      })
      return updatedUser;
    } catch (error) {
      console.error("Hata:", error);
      throw new ErrorHandler(500, error.message);
    }
  }

  async calculateMainModAccount(data) {
    if (Object.hasOwn(data, "amount")) {
      data.main_account = data.amount;
      data.mod_account = data.total_account - data.amount;
      data.mod_type = await this.calculateModType(data);
      return { newData: data };
    } else {
      data.main_account = Number(
        ((data.total_account * data.percentage) / 100).toFixed(2)
      );
      data.mod_account = data.total_account - data.main_account;
      data.mod_type = await this.calculateModType(data);
      return { newData: data };
    }
  }

  async calculateModType(data) {
    let mod_type;
    if (data.mod_account >= 1000 && data.mod_account < 2000) {
      mod_type = "bronze";
    } else if (data.mod_account >= 2000 && data.mod_account < 2500) {
      mod_type = "silver";
    } else if (data.mod_account >= 2500 && data.mod_account < 3000) {
      mod_type = "gold";
    } else if (data.mod_account >= 3000) {
      mod_type = "diamond";
    } else {
      mod_type = null;
    }

    return mod_type;
  }
}

module.exports = Auth;
