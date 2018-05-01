var Campground=require('../models/campground'),
    Comment=require('../models/comment');

//middleware functions
var middlewareObj={};

middlewareObj.checkCampgroundOwnership=function(req,res,next){
    if(req.isAuthenticated())
    {
        Campground.findById(req.params.id,function(err,foundCampground){
            if(err){
                console.log(err);
                req.flash("error","Campground not found");
            
            }
        else{
                if (!foundCampground) {
                    req.flash("error", "Item not found.");
                    return res.redirect("back");
                }
               if(foundCampground.author.id.equals(req.user._id)){
                    next();
            
                }
                else{
                    req.flash("error", "Permission Denied for the Requested Operation");
                res.redirect('back');
                }
        
        }
     
    });
    
}
else{
    req.flash("error","Please Log in to Continue");
    res.redirect('back');
}
    
}

middlewareObj.checkCommentOwnership=function(req,res,next){
    if(req.isAuthenticated())
    {
        Comment.findById(req.params.comment_id,function(err,foundComment){
            if(err){
                console.log(err);
            }
        else{
               if (!foundComment) {
                    req.flash("error", "Item not found.");
                    return res.redirect("back");
                }
               if(foundComment.author.id.equals(req.user._id)){
            next();
            
                }
                else{
            res.redirect('back');
                }
        
        }
     
    });
    
}
else{
    req.flash("error","Please Log in to Continue");
    res.redirect('back');
}
}

middlewareObj.isLoggedIn=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    else{
        req.flash("error","Please Log in to Continue");
        res.redirect('/login');
    }
}

module.exports=middlewareObj;