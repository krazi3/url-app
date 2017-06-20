import Promise from 'bluebird';
import mongoose from 'mongoose';
 
const urlSchema = new mongoose.Schema({
    url: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    facebook: {
      locale: String,
      app_id: String,
      admins: String,
      title: String,
      description: String,
      url: String,
      site_name: String,
      site: String,
      publisher: String,
      section: String,
      published_time: String,
      modified_time: String,
      updated_time: String,
      image: [String],
    },
    twitter: {
      card: String,
      title: String,
      description: String,
      image: [String],
      site: String,
      url: String
    },
    general: {
      description: String,
      title: String
    }
});

urlSchema.statics = {
  /**
   * List urls in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of urls to be skipped.
   * @param {number} limit - Limit number of urs to be returned.
   * @returns {Promise<Url[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();
  },

  /**
   * Check if a url is already scraped or not.
   * @param {string} url
   * @return {Url}
   */
  isScraped(url) {
    return this.findOne({ url: url })
      .exec();
  }
}
 
export default mongoose.model('Url', urlSchema);
