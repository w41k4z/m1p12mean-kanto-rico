const passport = require("passport");
const router = require("express").Router();
const resend = require("../config/resend");
const socketService = require('../config/socket');
const ApiResponse = require('../config/response/api.response');
const Notification = require('../models/Notification');

router.get("/", passport.authenticate("jwt", { session: false }), async (req, res, next) => {
    try {
        const userId = req.user.id;
        const notifications = await Notification.find({ userId, read: false }).sort({ createdAt: -1 });
        const payload = { notifications };
        return res.json(new ApiResponse(payload));
    } catch (error) {
        next(error);
    }
});

router.post("/read", passport.authenticate("jwt", { session: false }), async (req, res, next) => {
    try {
        const userId = req.user.id;
        await Notification.updateMany({ userId, read: false }, {read: true});
        return res.json(new ApiResponse(null, "Notifications marquées comme lues"));
    } catch (error) {
        next(error);
    }
});

// Test notification
router.get("/test", passport.authenticate("jwt", { session: false }), async (req, res, next) => {
    try {
        socketService.sendNotification(req.user.id, "It fucking works " + req.user.displayName);
        return res.json("Socket notification works");
    } catch (error) {
        next(error);
    }
});

// Test email
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
