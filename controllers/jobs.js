import JobsModel from "../models/Job.js";

export const createJob = async (req,res) => {

    //creating a job from the request body
    const job = new JobsModel({
        company: req.body.company,
        position:req.body.position,
        status: req.body.status,
        createdBy: req.user.userID,
    })
    // console.log(job);
    //save the data to the database or catch the error
    try{
        await job.save();
        res.status(400).send(job);
    }
    catch(err){
        console.log(err);
    }
}

export const getAllJobs = async (req,res) => {
    //search for all jobs created by the current user in the database
    const allJobs = await JobsModel.find({
        createdBy: req.user.userID
    }).sort('createdAt');
    res.status(400).send(allJobs);
}

export const getJob = async (req,res) => {
    //get job id from params and find that job in the database
    const jobId = req.params;
    const currentJob = await JobsModel.findOne({
        _id: jobId.id,
        createdBy: req.user.userID,
    })
    //if job not found, send error message
    if(!currentJob){
        return res.status(400).send(`No job found with id ${jobId.id}`);
    }
    res.status(400).send(currentJob);
}

export const deleteJob = async (req,res) => {
    const jobId = req.params;
    
    try{
        await JobsModel.findByIdAndDelete({
            _id:jobId.id,
            createdBy:req.user.userID,
        })
        res.status(400).send(`Job with id ${jobId.id} was successfully deleted`)
    }
    catch(err){
        console.log(`executed with error ${err}`);
    }
}
