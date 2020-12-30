var Common = require("./common");

var Devicelist = function(app) {
    this.app = app;
    this.common = new Common(app);
};
module.exports = Devicelist;

Devicelist.prototype.performAction = function(req, res) {
    const self = this;
    if (req.params.action === "list") {
        self.common.commonDevice(req, res);
    } else {
        res.status(401).json({ status: false, message: "Invalid Access" });
    }
};