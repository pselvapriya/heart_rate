var Common = require("./common");
var Table = require("./tables");

var Hrchart = function(app) {
    this.app = app;
    this.common = new Common(app);
    this.table = new Table(app);
};
module.exports = Hrchart;

Hrchart.prototype.performAction = function(req, res) {
    const self = this;

    if (req.params.action === "hrlist") {
        self.common.commonHRChartSearch(self.table.PATIENTHISTORY_TABLE, req, res);
    } else {
        res.status(401).json({ status: false, message: "Invalid Access" });
    }
};