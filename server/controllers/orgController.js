const saveToDb = require("../../database/saveToDb");
const retrieveDb = require("../../database/retrieveFromDb");

exports.createOrganization = (req, res) =>{
  saveToDb.insertOrganization(req.body.form)
    .then(savedOrganization=>{
      res.status(201).send(savedOrganization);
    })
    .catch(error=>{
      res.status(404).send(error)
    })
}

exports.fetchOrganizations = (req, res) =>{
  retrieveDb.getOrganizations()
    .then(organizations=>{
      res.status(200).send(organizations);
    })
    .catch(error=>{
      res.status(404).send(error);
    })
}

exports.joinOrganization = (req, res)=>{
  saveToDb.findUserAndJoinOrganization(req.body)
    .then(()=>{
      res.status(201).send();
    })
    .catch(error=>{
      res.status(404).send(error);
    })
}