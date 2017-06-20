import Joi from 'joi';

export default {
  // POST /urls
  extractUrl: {
    body: {
      url: Joi.string().required()
    }
  }
}
