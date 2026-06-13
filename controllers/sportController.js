// Import the model to get access to the data logic
const SportModel = require('../models/sportModel');

exports.getSportDetails = (req, res) => {
    const sportCode = req.params.code;
    const sportInfo = SportModel.getSportByCode(sportCode);

    if (sportInfo) {
        // Render the view template and inject the model's data
        res.render('sportDetail', { 
            pageTitle: sportInfo.title, 
            sport: sportInfo 
        });
    } else {
        // Handle gracefully if a sport code isn't supported yet
        res.status(404).render('404', { pageTitle: 'Sport Not Found' });
    }
};