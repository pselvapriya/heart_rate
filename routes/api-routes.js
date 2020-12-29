var Utils = require("../modules/utils");
var Boodskap = require("../modules/boodskap");
var Commons = require("../modules/common");
var Tables = require("../modules/tables");
var Devicelist = require("../modules/devicelist");
var Patientstatus = require("../modules/patientstatus");
var Phistory = require("../modules/patienthistory");

var Patientasset = require("../modules/patient");

var APIRoutes = function (app,router) {

    this.app = app;
    this.router = router;
    this.conf = app.conf;
    this.utils = new Utils(app);
    this.common = new Commons(app);
    this.table = new Tables(app);
    this.patientasset = new Patientasset(app);
    this.patientstatus = new Patientstatus(app);
    this.phistory = new Phistory(app);
    this.devicelist = new Devicelist(app);

    this.init();
};

module.exports = APIRoutes;

APIRoutes.prototype.init = function () {

    const self = this;

    var sessionCheck = function(req, res, next) {
        var sessionObj = req.session["sessionObj"];

        if (sessionObj && sessionObj.token) {
            next();
        } else {
            res.status(401).json({ status: false, message: "Unauthorized Access" });
        }
    };

    //Authentication, Activation & Reset Password

    self.router.post("/login", function(req, res) {
        var boodskap = new Boodskap(self.app);
        boodskap.login(req, res);
    });

    self.router.post("/logout", sessionCheck, function(req, res) {
        var sessionObj = req.session["sessionObj"];
        var boodskap = new Boodskap(self.app, sessionObj.token);
        boodskap.logout(req, function(status) {
            res.json({ status: true });
        });
    });
    
    

    self.router.post('/patient/:action', sessionCheck, function (req, res) {
    
        self.patientasset.performAction(req,res);
    });
    self.router.post('/patientstatus/:action', sessionCheck, function (req, res) {
        self.patientstatus.performAction(req,res);
    });
    self.router.post( "/patienthistory/:action",sessionCheck, function(req, res) {

     self.phistory.performAction(req, res);
        } );
   

    // devicelist================================================
    self.router.get("/devicelist/:action", sessionCheck, function(req, res) {
        console.log(req.body);
        self.devicelist.performAction(req, res);
    });

};