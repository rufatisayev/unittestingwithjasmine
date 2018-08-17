function AuthController() {
    var roles = []
    var user;
    function setRoles(role) {
        roles = role
    }
    function setUser(inUser) {
        user = inUser
    }
    function isAuthorized(needRole) {
        if(user) {
            return user.isAuthorized(needRole)
        } else {
         return roles.indexOf(needRole) >= 0;
        }
    }
    function isAuthorizedAsync(needRole, cb) {
        return setTimeout(function(){
            cb(roles.indexOf(needRole) >= 0)
        }, 0)
    }
    function isAuthorizedPromise(needRole) {
        return new Promise(function(resolve){
            setTimeout(function(){
                resolve(roles.indexOf(needRole) >= 0)
            }, 0)
        })
    }
    function getIndex(req, res) {
        return res.render('index')
    }
    function getIndexStub(req, res) {
        if(req.user.isAuthorized('admin')) {
            return res.render('admin')
        }
        return res.render('index')
    }
    function getIndexMock(req, res) {
        if(req.user.isAuthorized('admin')) {
            return res.render('admin')
        }
        return res.render('index')
    }
    return {setRoles, setUser, isAuthorized, isAuthorizedAsync, isAuthorizedPromise, getIndex, getIndexStub, getIndexMock}
}

// module.exports = AuthController - mocha
export default AuthController