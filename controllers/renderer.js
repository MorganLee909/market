module.exports = {
    home: function(req, res){
        return res.render("index.ejs");
    },

    logout: function(req, res){
        req.session.user = undefined;
        req.session.vendor = undefined;
        return res.redirect("/");
    }
}