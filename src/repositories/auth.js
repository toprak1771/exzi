const { hash, compare } = require("bcrypt");

const RepositoryMain = require("./repository_main");
const { PrismaClient } = require("@prisma/client");
const { ErrorHandler } = require("../utils/errorhandler");
const { sign } = require("jsonwebtoken");
const prisma = new PrismaClient();
const SECRET_KEY = process.env.SECRET_KEY;

class Auth extends RepositoryMain {

  async register(data) {
    const findUser = await prisma.user.findFirst({
      where: { OR:[
        {
            email:data.email,
        },
        {identity_no:data.identity_no}
      ] },
    });
   
    if (findUser) {
      throw new ErrorHandler(409, "This user or identity_no already use.");
    }

    const hashedPassword = await hash(data.password, 10);
    const createUser = await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    return createUser;
  }

  async login(data) {
    console.log("data:",data);

    const findUser = await prisma.user.findFirst({
        where:{email:data.email},
    });
    if(!findUser) {
        throw new ErrorHandler(409, "User doens't exist.");
    }

    const isPasswordMatch = await compare(data.password,findUser.password);

    if(!isPasswordMatch) {
        throw new ErrorHandler(409, "Password doesnt match.");
    }

    const token = await this.createToken(findUser);

    return {token,findUser}
    
  }

  async createToken(user) {
    const dataStoredInToken = {id:user.id};
    const secretKey = SECRET_KEY;
    const expiresIn = 5 * 60 * 60;

    return {
        expiresIn,
        token:sign(dataStoredInToken,secretKey,{expiresIn:expiresIn})
    }
  }


}

module.exports = Auth;
