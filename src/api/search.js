import getUserTimeline from "../commands/getUserTimeline";

const search = async (req, res) => {
  try{
    if (req.query.user){
      const result = await getUserTimeline(req.query.oauth_token, req.query.oauth_token_secret, req.query.user, req.query.count);
      await res.json( result);
    }
    else{
      res.send("No username was received.");
    }
  } catch (e) {
    console.log("Error in Search::", e);
    throw e;
  }
};

export default search;
