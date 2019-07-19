const router = require("express").Router();
const violationController = require("../../controllers/violationController");

// Matches with "/api/books"
router.route("/")
  .get(violationController.findAllViolationsForState)
router.route("/clusterUser")
  .post(violationController.clusterUser);

// Matches with "/api/books/:id"
router
  .route("/geolocation")
  .get(violationController.findViolationsByLocation)
//   .put(violationController.update)
//   .delete(violationController.remove);

module.exports = router;
