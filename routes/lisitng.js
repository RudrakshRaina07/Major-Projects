const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, validateError} = require("../middleware.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const uploads = multer({ storage });

const listingController = require("../controllers/listings.js");

router
    .route("/")
    // INDEX ROUTE
    .get(wrapAsync(listingController.index))
    // CREATE ROUTE
    .post(isLoggedIn,uploads.single("listing[image]"), validateError, wrapAsync (listingController.createListing));

//  NEW ROUTE
router.get("/new",isLoggedIn, listingController.renderNewForm);

router
    .route("/:id")
    // SHOW ROUTE
    .get( wrapAsync(listingController.showListing))
    // UPDATE ROUTE
    .put(isLoggedIn, uploads.single("listing[image]"),validateError, wrapAsync(listingController.updateListing))
    // DELETE ROUTE
    .delete(isLoggedIn, wrapAsync(listingController.destroyListing));

// EDIT ROUTE
router.get("/:id/edit",isLoggedIn, validateError, wrapAsync(listingController.renderEditForm));

// FILTER ROUTE
router.get("/category", validateError, wrapAsync(listingController.renderFilterForm));

module.exports = router;