const Career = require("../models/careerModel");

/**
 * Creates a career
 *
 * @param {*} req
 * @param {*} res
 */
const careerPost = async (req, res) => {
  let career = new Career();

  career.name = req.body.name;
  career.id_code  = req.body.id_code;
  career.description = req.body.description;
  

  if (career.name && career.id_code) {
    await career.save()
      .then(data => {
        res.status(201); // CREATED
        res.header({
          'location': `/api/careers/?id=${data.id}`
        });
        res.json(data);
      })
      .catch( err => {
        res.status(422);
        console.log('error while saving the career', err);
        res.json({
          error: 'There was an error saving the career'
        });
      });
  } else {
    res.status(422);
    console.log('error while saving the career')
    res.json({
      error: 'No valid data provided for career'
    });
  }
};

/**
 * Get all teachers
 *
 * @param {*} req
 * @param {*} res
 */
const careerGet = (req, res) => {
  // if an specific teacher is required
  if (req.query && req.query.id) {
    Career.findById(req.query.id)
      .then( (career) => {
        res.json(career);
      })
      .catch(err => {
        res.status(404);
        console.log('error while queryting the career', err)
        res.json({ error: "Career doesnt exist" })
      });
  } else {
    // get all careers
    Career.find()
      .then( careers => {
        res.json(careers);
      })
      .catch(err => {
        res.status(422);
        res.json({ "error": err });
      });
  }
};

/**
 * Updates a career
 *
 * @param {*} req
 * @param {*} res
 */
const careerPatch = (req, res) => {
  console.log("entra patch");
  // get teacher by id
  if (req.query && req.query._id) {
    Career.findById(req.query._id, function (err, career) {
      if (err) {
        res.status(404);
        console.log('error while queryting the career', err)
        res.json({ error: "Career doesnt exist" })
      }

      // update the career object (patch)
      career.name = req.body.name ? req.body.name : career.name;
      career.id_code = req.body.id_code ? req.body.id_code : career.id_code;
      career.description = req.body.description ? req.body.description : career.description;


      career.save(function (err) {
        if (err) {
          res.status(422);
          console.log('error while saving the career', err)
          res.json({
            error: 'There was an error saving the career'
          });
        }
        res.status(200); // OK
        res.json(career);
      });
    });
  } else {
    res.status(404);
    res.json({ error: "Career doesnt exist" })
  }
};

/**
 * Deletes a career
 *
 * @param {*} req
 * @param {*} res
 */
 const careerDelete = (req, res) => {
  // get career by id
  if (req.query && req.query._id) {
    Career.findById(req.query._id, function (err, career) {
      if (err) {
        res.status(404);
        console.log('error while queryting the career', err)
        res.json({ error: "Career doesnt exist" })
      }

      career.deleteOne(function (err) {
        if (err) {
          res.status(422);
          console.log('error while deleting the Career', err)
          res.json({
            error: 'There was an error deleting the Career'
          });
        }
        res.status(204); //No content
        res.json({});
      });
    });
  } else {
    res.status(404);
    res.json({ error: "Career doesnt exist" })
  }
};

module.exports = {
  careerGet,
  careerPost,
  careerPatch,
  careerDelete
}