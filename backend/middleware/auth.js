import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
    const JWT_SECRET = 'supasecreto'
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(401).json({msg:"Authentication Invalid"});
    }

    const token = authHeader.split(" ")[1];
    try {
        const payload = jwt.verify(token, JWT_SECRET);
        req.user = { userId: payload?.user?.Uid, userName: payload?.user?.Uname, role: payload?.user?.role};
        next();
    } catch (error) {
        next(error);
    }
};

export default userAuth;