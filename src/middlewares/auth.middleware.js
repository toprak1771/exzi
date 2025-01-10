const {verify} = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const authMiddleWare = async (req,res,next) => {
    const headerAuthorization = req.header("Authorization");
    const token = headerAuthorization ? headerAuthorization.split("Bearer ")[1] : null;
    const Authorization = req.cookies["Authorization"] || token;
    if(Authorization== null) {
        return res.status(401).send('Unauthorized: No token provided');
    } 

    verify(Authorization,process.env.SECRET_KEY,async (err,responseData) => {
        if(err) {
            return res.status(401).send('Not authenticate');
        }

        const findUser = await prisma.user.findUnique({
            where:{id:responseData.id}
        })
        req.user = findUser;
        next();
    })
}

module.exports = {authMiddleWare};