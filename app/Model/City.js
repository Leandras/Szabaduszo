'use strict'

const Lucid = use('Lucid')

class City extends Lucid {
    jobs (){
        return this.hasMany('App/Model/Job')
    }
}

module.exports = City
