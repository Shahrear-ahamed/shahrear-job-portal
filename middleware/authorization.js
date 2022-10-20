const verifyUserAccess = (...roles) => {
    return (req, res, next) => {
        const userRole = req?.user?.role;
        const userNewRoles = userRole.toLowerCase();

        const lowerTxt = [];

        roles.forEach(element => {
            lowerTxt.push(element.toLowerCase());
        });

        if (!lowerTxt.includes(userNewRoles)) {
            return res.status(401).json({
                status: "fail", error: "your are not authorized for this role"
            })
        }

        next();
    }
}

module.exports = verifyUserAccess