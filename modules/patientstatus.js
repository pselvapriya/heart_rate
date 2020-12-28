var Common = require("./common")
var Table = require("./tables")

var Patientstatus = function (app){
    this.app = app;
    this.common = new Common(app);
    this.table = new Table(app);
}
module.exports = Patientstatus ;

Patientstatus .prototype.performAction = function (req,res){

    const self = this;

    if(req.params.action === 'list'){
        self.common.commonSearch(self.table.PATIENTSTATUS_TABLE,req,res);
    }
    else{
        res.status(401).json({status:false,message:'Invalid Access'})
    }
}