const saveToDb = require("../../database/saveToDb");

exports.createOrganization = (req, res) =>{
  saveToDb.insertOrganization(req.body.form)
    .then(savedOrganization=>{
      res.status(201).send(savedOrganization);
    })
    .catch(error=>{
      res.status(404).send(error)
    })
}