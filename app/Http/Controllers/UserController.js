'use strict'
const User = use('App/Model/User')
const Validator = use('Validator')
const Helpers = use('Helpers')
const Hash = use('Hash')

class UserController {
    * login (request, response) {
        if (request.currentUser) {
         response.route('main')
        return
        }

        yield response.sendView('login')
  }

    *doLogin(request, response){
        const username = request.input('username')
        const password = request.input('password')

        try {
        const login = yield request.auth.attempt(username, password)

        if (login) {
            response.route('login')
            return
        }

        throw new Error('Invalid credentails')
        }
        catch (err) {
        yield request.withAll().andWith({ error: err }).flash()
        response.route('login')
        }
    }

    * doLogout (request, response) {
         yield request.auth.logout()
        response.route('main')
     }

    *register(request, response){
        yield response.sendView('register');
    }
    *doRegister(request, response){
        const userData = request.all();
        const validation = yield Validator.validateAll(userData, {
            username: 'required|unique:users',
            email: 'required|unique:users',
            nickname: 'required|max:30',
            password: 'required',
            password_again: 'required|same:password',
            
    });
    if (validation.fails()) {
      yield request
        .withAll()
        .andWith({ errors: validation.messages() })
        .flash()

      response.route('register')
    }else{
        const user = new User()
        user.username = userData.username
        user.email = userData.email
        user.nickname = userData.nickname
        user.password = yield Hash.make(userData.password)
        if(userData.isEmployer){
            user.isEmployer = true
        }
        
        yield user.save()

        response.route('main')
    }
    }
}

module.exports = UserController
