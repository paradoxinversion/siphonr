const getTweetAuthor = (tweet) => {
  return {
    id_str: tweet.user.id_str,
    name: tweet.user.name,
    screen_name: tweet.user.screen_name,
    location: tweet.user.location,
    description: tweet.user.description,
    created_at: tweet.user.created_at,
    followers_count: tweet.user.followers_count,
    friends_count: tweet.user.friends_count,
    verified: tweet.user.verified,
    statuses_count: tweet.user.statuses_count,
    default_profile: tweet.user.default_profile,
    default_profile_image: tweet.user.default_profile_image,
    profile_image: tweet.user.profile_image_url_https.replace(/_normal/, "_400x400"),
  };
};

export default getTweetAuthor;
