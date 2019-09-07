let express = require('express'),
    router = express.Router(),
    util = require('../Utilities/util'),
    artistService = require('../Services/artist');


/**Api to create artist */
router.post('/create-artist', (req, res) => {
	//console.log(" body "+req.body);
    artistService.createArtist(req.body, (data) => {
        res.send(data);
    });
});

/**Api to update article */
router.put('/update-artist', (req, res) => {
    artistService.updateArtist(req.body, (data) => {
        res.send(data);
    });
});

/**Api to delete the artist */
router.delete('/delete-artist', (req, res) => {
    artistService.deleteArtist(req.query, (data) => {
        res.send(data);
    });
});

/**Api to get the list of article */
router.get('/get-artist', (req, res) => {
    artistService.getArtist(req.query, (data) => {
        res.send(data);
    });
});
/**API to get the artist by id... */
router.get('/get-artist-by-id', (req, res) => {
    artistService.getArtistById(req.query, (data) => {
        res.send(data);
    });
});

module.exports = router;
