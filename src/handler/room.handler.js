const router = require("express").Router();
const express = require("express");
const service = require("../services/room.service");

router.get(
  "/getBookingDetails",
  [
    //middlewares
  ],
  function (req, res, next) {
    service.getBookingDetails(req, res, next);
  }
);
router.get(
  "/guests",
  [
    //middlewares
  ],
  function (req, res, next) {
    service.getGuestDetails(req, res, next);
  }
);
router.delete(
  "/booking",
  [
    //middlewares
  ],
  function (req, res, next) {
    service.deleteBooking(req, res, next);
  }
);

router.post(
    "/booking",
    [
      //middlewares
    ],
    function (req, res, next) {
      service.registerBooking(req, res, next);
    }
  );
  router.patch(
    "/booking",
    [
      //middlewares
    ],
    function (req, res, next) {
      service.updateBooking(req, res, next);
    }
  );
module.exports = router;
