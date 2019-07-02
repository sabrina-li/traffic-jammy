const router = require("express").Router();
const violationRoutes = require("./violation");

// Book routes
router.use("/violation", violationRoutes);

module.exports = router;
