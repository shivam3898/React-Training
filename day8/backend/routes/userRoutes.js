const { authJwt } = require("../middleware")
const controller = require("../controllers/userController")

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/test/all", controller.allAccess)

    app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard)

    app.put("/api/test/user/edit", [authJwt.verifyToken], controller.editUser)

    app.get("/api/test/getUsers", [authJwt.verifyToken, authJwt.isAdmin], controller.getUsers)

    app.get("/api/test/user/:id", [authJwt.verifyToken], controller.getOneUser)

    app.delete("/api/test/delete/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.deleteUser)

    app.get("/api/test/admin", [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard)
}