const RepositoryMain = require("./repository_main");
const { PrismaClient } = require("@prisma/client");
const redis = require("../services/redis_services");
const { ErrorHandler } = require("../utils/errorhandler");
const { promisify } = require("util");

const prisma = new PrismaClient();

class Portfolio extends RepositoryMain {
  async create(data, user_id) {
    try {
      await this.amountCalculate(data);
      const updatedUser = await prisma.user.update({
        where: {
          id: user_id,
        },
        data: data,
        select: {
          id: true,
          name: true,
          surname: true,
          identity_no: true,
          email: true,
          portfolio: true,
          total_account: true,
        },
      });

      const userPortfolioName = "Portfolio" + updatedUser.id;
      const dataRedis = JSON.stringify(updatedUser);
      redis.set(userPortfolioName, dataRedis, (err, message) => {
        if (err) {
          throw new ErrorHandler(400, err);
        }
        console.log("redis_message:", message);
      });
      return updatedUser;
    } catch (error) {
      console.error("Hata:", error);
      throw new ErrorHandler(500, error.message);
    }
  }

  async update(data, user_id) {
    try {
      await this.amountCalculate(data);
      const updatedUser = await prisma.user.update({
        where: { id: user_id },
        data: data,
        select: {
          id: true,
          name: true,
          surname: true,
          identity_no: true,
          email: true,
          portfolio: true,
          total_account: true,
        },
      });

      const userPortfolioName = "Portfolio" + updatedUser.id;
      const dataRedis = JSON.stringify(updatedUser);
      redis.set(userPortfolioName, dataRedis, (err, message) => {
        if (err) {
          throw new ErrorHandler(400, err);
        }
        console.log("redis_message:", message);
      });

      return updatedUser;
    } catch (error) {
      console.error("Hata:", err);
      throw new ErrorHandler(500, err.message);
    }
  }

  async getAll() {
    try {
      const redisKeys = promisify(redis.keys).bind(redis);
      const redisGet = promisify(redis.get).bind(redis);
      const redisSet = promisify(redis.set).bind(redis);

      const keys = await redisKeys("Portfolio*");

      if (keys.length > 0) {
        const portfolioList = await Promise.all(
          keys.map(async (redisKey) => {
            const portfolio = await redisGet(redisKey);
            return JSON.parse(portfolio);
          })
        );

        return portfolioList;
      } else {
        const getAllPortfolio = await prisma.user.findMany({
          select: {
            id: true,
            name: true,
            surname: true,
            identity_no: true,
            email: true,
            portfolio: true,
            total_account: true,
          },
        });
        for (const portfolio of getAllPortfolio) {
          const portfolioName = "Portfolio" + portfolio.id;
          const dataRedis = JSON.stringify(portfolio);
          const redisGet = await redisSet(portfolioName, dataRedis);
        }

        return getAllPortfolio;
      }
    } catch (error) {
      console.error("Hata:", error);
      throw new ErrorHandler(500, error.message);
    }
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
