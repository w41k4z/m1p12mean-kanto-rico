const passport = require("passport");
const router = require("express").Router();
const resend = require("../config/resend");
const socketService = require('../config/socket');

router.get("/", passport.authenticate("jwt", { session: false }), async (req, res, next) => {
    try {
        socketService.sendNotification(req.user.id, "It fucking works " + req.user.displayName);
        return res.json("Socket notification works");
    } catch (error) {
        next(error);
    }
});

router.get("/email", async (req, res, next) => {
    try {
        const response = await resend.emails.send({
            from: process.env.RESEND_EMAIL,
            to: ['alainricor@gmail.com'],
            subject: 'Resend Test',
            html: '<p>Resend works perfectly</p>'
        })
        return res.json("Resend works perfectly");
    } catch (error) {
        next(error);
    }
});

module.exports = router;
