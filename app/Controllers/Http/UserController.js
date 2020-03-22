'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with users
 */

 /**
  * Constants
  */
const User = use('App/Models/User')
const Database = use('Database')

class UserController {
  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  index ({ request, response, view }) {
    return view.render('site.home.login')
  }

  /**
   * Render a form to be used for creating a new user.
   * GET users/create
   *
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  create ({ request, response, view }) {
    return view.render('site.home.userCreate')
  }

  /**
   * Create/save a new user.
   * POST users
   *
   * @param {Request} ctx.request
   * @param {Auth} ctx.aut
   * @param {Response} ctx.response
   */
  async store ({ request, auth, response }) {
    // Captura os dados enviados
    const data = request.only(['username', 'email', 'password'])

    // Utiliza o transaction para previnir erros no CRUD
    const trx = await Database.beginTransaction()

    const user = await User.create(data, trx)

    let token = await auth.generate(user)

    Object.assign(user, token)

    // Se não houver nenhum erro no transaction, ele efetiva a query
    await trx.commit()
    return user

  } 

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    // if (auth.user.id !== Number(params.id)) {
    //   return "Acesso não permitido"
    // }
  }

  /**
   * Render a form to update an existing user.
   * GET users/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }

  /**
   * Checks User Login and Password
   * @param {Request} ctx.request
   * @param {Auth} ctx.auth
   * @param {Response} ctx.response
   */
  async login({request, auth, response}) {
    const {email, password} = request.all();
    
    try {
      if (await auth.attempt(email, password)) {
        let user = await User.findBy('email', email)
        let token = await auth.generate(user)

        Object.assign(user, token)
        return response.json(user)
      }
    }
    catch (e) {
      return response.json({message: 'Usuário não encontrado'})
    }
  }

}

module.exports = UserController
