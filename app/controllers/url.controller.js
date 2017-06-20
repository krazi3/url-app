import Url from '../models/url.model';
import scrape from 'html-metadata';

/**
 * Get url list.
 * @property {number} req.query.skip - Number of Urls to be skipped.
 * @property {number} req.query.limit - Limit number of Urls to be returned.
 * @returns {Urls[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0} = req.query;
  Url.list({ limit, skip })
    .then(urls => res.json(urls))
    .catch(e => next(e));
}

/**
 * extracts metadata and Saves a Url
 * @property {string} req.body.url - url for which metadata is to be extracted
 * @returns {url}
 */
 function extract(req, res, next) {
  const url = req.body.url;

  Url.isScraped(url)
    .then(fetchedUrl => {
      if(fetchedUrl) {
        return res.json(fetchedUrl);
      }
      else {
        scrape(url)
          .then(metadata => {
            var params = {
              url: url,
              facebook: metadata.openGraph ? normalizeImageUrls(metadata.openGraph) : {},
              twitter: metadata.twitter ? normalizeImageUrls(metadata.twitter) : {},
              general: metadata.general
            }
            var newUrl = new Url(params);
            newUrl.save()
              .then(res.json(newUrl))
              .catch(e => next(e));
          })
          .catch(e => next(e));
      }
    })
    .catch(e => next(e));
 }

function normalizeImageUrls(data) {
  if(data.image instanceof Array)
    data.image = data.image.map(image => image.url);
  else if(data.image instanceof Object)
    data.image = data.image.url;
  else
    data.image = [data.image];
  return data;
}

export default { list, extract };
