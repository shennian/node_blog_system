module.exports = {
  mobile: function(req, res, next) {
    var deviceAgent = req.headers["user-agent"].toLowerCase();
    var agentID = deviceAgent.match(/(iphone|ipod|ipad|android)/);
    if(agentID){
      res.sendfile('public/index_phone.html')
    }else{
      next()
    }
  }
}