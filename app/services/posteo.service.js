const db = require('../config/db.config.js');
const Posteo = db.posteo;
const errors = require('../errors/errors')

const removePost = async (posteoId) => {

    let posteo = await Posteo.findOne({ where: { id: posteoId } })

    if (!posteo) {
      throw new errors.NotFound()
    }
    await posteo.destroy()
  
    return { ok: true }
  }

  module.exports = {removePost}
