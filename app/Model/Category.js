'use strict'

const Lucid = use('Lucid')

class Category extends Lucid {
    jobs (){
        return this.hasMany('App/Model/Job')
    }
}

module.exports = Category
