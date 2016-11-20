'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')

Route.get('/', 'JobsController.main').as('main')
Route.get('/job', 'JobsController.index').as('job_list')
Route.get('/job/create', 'JobsController.create').as('job_create')
Route.post('/job/create', 'JobsController.doCreate').as('do_job_create')
Route.post('/job/:id/edit', 'JobsController.doEdit').as('do_job_edit')
Route.get('/job/:id/edit', 'JobsController.edit').as('job_edit')
Route.get('/job/:id/delete', 'JobsController.doDelete').as('job_delete')
Route.get('/job/:id/take', 'JobsController.doTake').as('job_take')

Route.get('/login', 'UserController.login').as('login')
Route.post('/login', 'UserController.doLogin').as('do_login')
Route.get('/register', 'UserController.register').as('register')
Route.post('/register', 'UserController.doRegister').as('do_register')
Route.get('/logout', 'UserController.doLogout').as('do_logout').middleware('auth')

