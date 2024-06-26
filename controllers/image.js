const returnClarifaiRequestOptions = (imgURL) => {
    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = 'f55dfcf9747849b19aa4f98de5f8be44';
    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = 'lelinh';       
    const APP_ID = 'my-first-application-wdlcl';
    // Change these to whatever model and image URL you want to use
    const IMAGE_URL = imgURL;
  
    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL
                    }
                }
            }
        ]
    });
  
    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };
    return requestOptions;
}
const handleApiCall = (req, res) => {
    fetch("https://api.clarifai.com/v2/models/" + 'face-detection' + "/outputs", returnClarifaiRequestOptions(req.body.input))
    .then(data => data.json())
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('Unable to work with api'))
}


const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id','=',id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries =>{
        res.json(entries[0].entries);
    })
    .catch(err => res.status(400).json('Unable to get entries'));
}

module.exports = {
    handleImage,
    handleApiCall
}