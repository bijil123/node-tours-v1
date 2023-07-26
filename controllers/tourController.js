

const Tour = require("./../models/tourModel");
const APIFeatures = require("./../utils/apiFeatures");

module.exports.preFillQuery = async (req, res, next) => {
    req.query.sort = "-ratingsAverage,-price";
    req.query.limit = "5";
    next();
}

module.exports.createTour = async (req,res) => {

    try{
        const newTour = await Tour.create(req.body);
        res.status(200).json({
            status: 'success',
            data: {
                tour: newTour
            }
        });
    } catch(err){
        res.status(400).json({
            status: 'faild',
            message: err.message
        })
    }
    
};

module.exports.getAllTours = async (req,res) => {

    try {

        const features =new APIFeatures(Tour.find(), req.query).filter().sort().select().paginate();
        const query = features.query;

        const tours = await query;
        res.status(200).json({
            status:'success',
            data: {
                length: tours.length,
                tours:tours
            }
        })
    } catch(err){
        res.status(400).json({
            status:'failed',
            message: err.message
        })
    }
    
};

module.exports.getTour = async (req,res) => {

    try{
        const tour = await Tour.findById(req.params.id);
        res.status(200).json({
            status:'success',
            data: {
                tour:tour
            }
        })
    } catch(err){
        res.status(400).json({
            status:'failed',
            message: err 
        })
    }

};

module.exports.updateTour = async (req,res) => {
    try{
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        res.status(200).json({
            status:'success',
            data: {
                tour:tour
            }
        })
    } catch(err){
        res.status(400).json({
            status:'failed',
            message: err.message 
        })
    }
}

module.exports.deleteTour = async (req,res) => {
    try{
        await Tour.findByIdAndDelete(req.params.id)
        res.status(200).json({
            status:'success',
            data: null
        })
    } catch(err){
        res.status(400).json({
            status:'failed',
            message: err.message 
        })
    }
}