'use strict'

const Lucid = use('Lucid')

class Job extends Lucid {
  static scopeActive (builder) {
    builder.where('deleted', 0)
  }

  category(){
    return this.belongsTo('App/Model/Category')
  }

  city(){
    return this.belongsTo('App/Model/City')
  }
  user(){
    return this.belongsTo('App/Model/User')
  }
}

module.exports = Job
