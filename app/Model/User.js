'use strict'

const Lucid = use('Lucid')

class User extends Lucid {

  apiTokens () {
    return this.hasMany('App/Model/Token')
  }

  jobs (){
    return this.hasMany('App/Model/Jobs')
  }

}

module.exports = User
