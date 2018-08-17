import auth from '../../controllers/auth.js'
var authController = new auth();
describe('AuthController', function() {
    beforeEach(function() {
        authController.setRoles(['user'])
    })
    describe('isAuthorized', function() {
        var user = {}
        beforeEach(function() {
            user = {
                roles: ['user'],
                isAuthorized: function(needRole) {
                    return this.roles.indexOf(needRole) >= 0
                }
            }
            spyOn(user, 'isAuthorized')
            authController.setUser(user)
        })
        it('Should return false if not authorized', function() {
            var isAuth = authController.isAuthorized('admin');
            expect(user.isAuthorized).toHaveBeenCalled()
            expect(user.isAuthorized).toHaveBeenCalledWith('admin')
        })
        it('Should return true if authorized', function() {
            authController.setRoles(['user','admin'])
            var isAuth = authController.isAuthorized('admin')
            expect(user.isAuthorized).toHaveBeenCalled()
            expect(user.isAuthorized).toHaveBeenCalledWith('admin')
            expect(user.isAuthorized).toHaveBeenCalledTimes(1)
        })
        // it('should return future')
    })

    describe('isAuthorizedAsync', function() {
        it('Should return false if not authorized', function(done) {
            // this.timeout(2500); //Default timeout for mocha is 2000
            authController.isAuthorizedAsync('admin',
                function(isAuth) {
                    expect(isAuth).toBe(false)
                    done()
                }
            )
        })
        it('Should return true if authorized', function(done) {
            //this.timeout(2500); //Default timeout for mocha is 2000
            authController.setRoles(['user','admin'])
            authController.isAuthorizedAsync('admin',
                function(isAuth) {
                    expect(isAuth).toBe(true)
                    done()
                }
            )
        })
    })

    describe('isAuthorizedPromise', function() {
        it('Should return false if not authorized', function() {
            return authController.isAuthorizedPromise('admin').then(function(value) {
                expect(value).toBe(false)
            })
        })
    })

    describe('getIndex', function() {
        it('Should render index', function() {
            var req = {}
            var res = {
                render : jasmine.createSpy()
            }
            authController.getIndex(req, res)
            expect(res.render).toHaveBeenCalled()
            // res.render.firstCall.args[0].should.equal('index')
        })
    })

    describe('getIndexStub', function() {
        var user = {}
        beforeEach(function(){
            user = {
                roles: ['user'],
                isAuthorized: function(needRole) {
                    return this.roles.indexOf(needRole) >= 0
                }
            }
        })
        it('Should render admin', function() {
            var authorizedSpy = jasmine.createSpyObj(user, ['isAuthorized'])
            authorizedSpy.isAuthorized.and.callFake(function() {
                return true
            })
            var req = {user:user}
            var res = {
                render : jasmine.createSpy()
            }
            authController.getIndexStub(req, res)
            expect(res.render).toHaveBeenCalled()
            // res.render.calledOnce.should.be.true;
            // res.render.firstCall.args[0].should.equal('admin')
        })
    })
})
