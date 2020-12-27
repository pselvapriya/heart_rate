var Common = require("./common");

var Devicelist = function(app) {
    this.app = app;
    this.common = new Common(app);
};
module.exports = Devicelist;

Devicelist.prototype.performAction = function(req, res) {
    const self = this;

    if (req.params.action === "insert") {
        self.common.commonAdd(req, res);
    } else if (req.params.action === "update") {
        self.common.commonUpdate(req, res);
    } else if (req.params.action === "delete") {
        self.common.commonDelete(req, res);
    } else if (req.params.action === "list") {
        self.common.commondlist(req, res);
    } else {
        res.status(401).json({ status: false, message: "Invalid Access" });
    }
};