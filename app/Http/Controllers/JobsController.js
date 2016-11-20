'use strict'

const Job = use('App/Model/Job')
const Category = use ('App/Model/Category')
const City = use ('App/Model/City')
const User = use ('App/Model/User') 
const Validator = use('Validator')
const Helpers = use('Helpers')



class JobsController {
 * main (request, response) {
 
    const jobs = yield Job.all()
    const categories = yield Category.all()
    const cities = yield City.all()
    const users = yield User.all()
    
    for (let job of jobs){
        const catName = yield Category.find(job.category_id)
        const cityName = yield City.find(job.city_id)
        const userName = yield User.find(job.user_id)
        job.categoryName = catName.name;
        job.CityName = cityName.name;
        job.UserName = userName.nickname;
    }
    
    //console.log("Nevek: " +  job.categoryName)
    
    yield response.sendView('main', {jobs: jobs.toJSON(), cities, categories})

   
    
  }

  /**
   *
   */
  * create (request, response) {
    const categories = yield Category.all()
    const cities = yield City.all()
    const users = yield User.all()

    yield response.sendView('job_create', { categories: categories.toJSON(),
        cities: cities.toJSON(),
        users: users.toJSON()
     })
  }

  /**
   *
   */

  * doCreate (request, response){
      const jobData = request.all()
      const validation = yield Validator.validateAll(jobData, {
          name: 'required',
          description: 'required',
          payment: 'required',
      })

      if(validation.fails()){
          yield request
            .withAll()
            .andWith({ errors: validation.messages() })
            .flash()

            response.route('job_create')
      }else{
          const category = yield Category.find(jobData.category)

          if(!category){
              yield request
                .withAll()
                .andWith({ errors: [{ message: 'Make new category!' }]})
                .flash()

                response.route('job_create')
          }else{
              
        
          const job = new Job()
          job.name = jobData.name
          job.description = jobData.description
          job.payment = jobData.payment
          job.category_id = jobData.category
          job.city_id = jobData.city
          job.user_id = request.currentUser.id

          const cat = yield Category.find(job.category_id)
          const cit = yield City.find(job.city_id)
          cat.numberOfJobs += 1;
          cit.numberOfJobs += 1;

          yield cat.update()
          yield cit.update()
          yield job.save()

          response.route('main')

          }
      }
  }

  * edit (request, response){
      const categories = yield Category.all()
      const jobId = request.param('id')
      const job = yield Job.find(jobId)
      const cities = yield City.all()
      yield response.sendView('job_edit', { 
            categories: categories.toJSON(),
            job: job.toJSON(),
            cities: cities.toJSON() })
  }

  * doEdit (request, response){

      const jobId = request.param('id')
      const job = yield Job.find(jobId)
     
    

      const jobData = request.all()
      const validation = yield Validator.validateAll(jobData, {
          name: 'required',
          description: 'required',
          payment: 'required',
      })
    
      if(validation.fails()){
          yield request
            .andWith({ errors: validation.messages() })
            .flash()

         
            yield response.route('job_edit', {id: job.id})
            return;
      }
          const category = yield Category.find(jobData.category)
          const city = yield City.find(jobData.city)

          if(!category){
              yield request
                .withAll()
                .andWith({ errors: [{ message: 'Új kategória készítése!' }]})
                .flash()

              
                yield response.route('job_edit')
          }else{
              if(!city){
                  yield request
                    .withAll()
                    .andWith({errors: [{ message: "Új város megadása" }]})
                    .flash()

                 
                    yield response.route('job_edit')
              }else{
                
                job.name = jobData.name
                job.description = jobData.description
                job.payment = jobData.payment
                job.category_id = jobData.category
                job.city_id = jobData.city

            
                yield job.update()

                yield response.route('main')
                }
          }
      
  }

   * doDelete (request, response) {

    const jobId = request.param('id');
    const job = yield Job.find(jobId);
    const cat = yield Category.find(job.category_id)
    const cit = yield City.find(job.city_id)
    cat.numberOfJobs -= 1;
    cit.numberOfJobs -= 1;

    yield cat.update()
    yield cit.update()
    yield job.delete();

    yield response.route('main')
  }

  * doTake (request, response){
      const jobId = request.param('id')
      const job = yield Job.find(jobId)

      job.taken = true;
      yield job.update()

      yield response.route('main')
  }
  
}

module.exports = JobsController
