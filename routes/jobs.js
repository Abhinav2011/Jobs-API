import express from "express";
import { createJob, getAllJobs, getJob, deleteJob} from "../controllers/jobs.js";
const router = express.Router();

//1) post request to create a job
router.post('/',createJob);

//2) get request to get all jobs
router.get('/',getAllJobs);

// //3) get request to get a single job by jobID
router.get('/:id',getJob);

// //4) delete request to delete a job by jobID
router.delete('/:id',deleteJob);

// //5) patch request to update a job by jobID
// router.patch('/:id',updateJob);

export default router;