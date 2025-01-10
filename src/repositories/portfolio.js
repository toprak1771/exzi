const RepositoryMain = require("./repository_main");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class Portfolio extends RepositoryMain {
  async create(data,user_id) {
    await this.amountCalculate(data);
    const updateUser = await prisma.user.update({
        where: {
            id:user_id
        },
        data:data
    })
    return updateUser;
  }

  async amountCalculate(data) {
    let totalCrypto = 0;

    Object.keys(data.portfolio).map((key) => {
      const cryptoPercentage = data.portfolio[key];
      const cryptoSalary = Number(
        ((data.total_account * cryptoPercentage) / 100).toFixed(2)
      );
      data.portfolio[key] = [`%${data.portfolio[key]}`, `${cryptoSalary} USDT`];
      totalCrypto += cryptoSalary;
      data.portfolio.totalCrypto = `${totalCrypto} USDT`;
    });
    return data;
  }
}

module.exports = Portfolio;
