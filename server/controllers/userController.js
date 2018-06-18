const checkdb = require('../../database/checkdbs.js');
const retrieveFromDb = require('../../database/retrieveFromDb.js');
const addVolunteerToOpp = require('../../database/addVolunteerToOpp.js');
const saveToDb = require('../../database/saveToDb.js')
exports.signUp = (req, res) => {
  return checkdb.checkOrganizationExists(req, res)
}

exports.login = (req, res) => {
  return checkdb.checkUserCredential(req.body, res, session, req)
}

exports.fetchOpps = (req, res) => {
  return retrieveFromDb.findOpportunitiesByUser(req.session.passport.user._id, res)
}

exports.enroll = (req, res) => {
  let opportunity = req.body.opportunity;
  if (req.user) {
    addVolunteerToOpp.checkIfEnrolled(opportunity, req.user._id, res);
  } else {
    res.send('login')
  }
}

exports.deleteComment = (req, res) => {
  let commentId = req.body.commentId;
  let oppId = req.body.oppId;
  retrieveFromDb.findCommentByIdAndDelete(commentId)
  .then(deletedComment => {
    retrieveFromDb.findCommentsByOppId(oppId)
    .then(comments => {
      res.status(201).send(comments);
    })
  }).catch(err => {
    res.status(404).send('Failed to delete comment');
  })

}

exports.editComment = (req, res) => {
  let editComment = req.body.editComment;
  let commentId = req.body.commentId;
  let oppId = req.body.oppId;
  retrieveFromDb.findCommentByIdAndUpdate(commentId, editComment)
  .then(editedComment => {
    retrieveFromDb.findCommentsByOppId(oppId)
    .then(comments => {
      res.status(201).send(comments);
    })
  }).catch(err => {
    res.status(404).send('Failed to delete comment');
  })
}

exports.createComment = (req, res) => {
  let commentInfo = req.body;
  let oppId = commentInfo.opportunityId;
  saveToDb.addNewComment(commentInfo)
  .then(saveComment => {
    retrieveFromDb.findCommentsByOppId(oppId)
    .then(comments => {
      res.status(201).send(comments);
    })
  }).catch(err => {
    res.status(404).send('Failed to save comments');
  })
}

exports.fetchCommentsByOppId = (req, res) => {
  let oppId = req.body.opportunityId;
  retrieveFromDb.findCommentsByOppId(oppId)
  .then(comments => {
    res.status(200).send(comments);
  }).catch(err => {
    res.status(404).send('Failed to fetch comments by oppId');
  })
}

exports.sub = (req, res) => {
  let opportunity = req.body.opportunity;
  if (req.user) {
     addVolunteerToOpp.subscribeToOpp(opportunity, req.user._id, res);
  } else {
    res.send('login')
  }
  // console.log(req.body.opportunity, "opp")
  // console.log(req.user, 'user')
}

exports.logout = (req, res) => {
  //how do we want to hangle logouts?
  req.logout();
  req.session.destroy();
  res.redirect('/');
}