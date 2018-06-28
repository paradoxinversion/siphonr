const getTweetUrlData = tweet => {
  try {
    if (tweet.entities.urls.length > 0) {
      const urls = tweet.entities.urls.map(urlEntry => {
        const entry = {
          expandedUrl: urlEntry.expanded_url,
          miniUrl: urlEntry.url,
          urlTextIndices: urlEntry.indices
        };
        return entry;
      });
      return urls;
    } else {
      return [];
    }
  } catch (e) {
    const error = new Error(e.message);
    console.log();
    return error;
  }
};

module.exports = getTweetUrlData;
