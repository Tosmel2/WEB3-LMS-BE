const multer = require('multer')
const express = require('express')

const router = express.Router()
const storage = require('../utilis/multer')

const upload = multer({ storage })

const PostDiscussion = require('../controller/Discussion/PostDiscussion')
const updateDiscussion = require('../controller/Discussion/updateDiscussion')
const deleteDiscussion = require('../controller/Discussion/deleteDiscussion')
const getAllDisscussion = require('../controller/Discussion/getAllDisscussion')
const getDisscussionId = require('../controller/Discussion/getDisscussionId')

router.get('/', getAllDisscussion)

router.get('/:id', getDisscussionId)

router.post('/', upload.single('image'), PostDiscussion)

router.put('/:id', updateDiscussion)

router.delete('/:id', deleteDiscussion)

module.exports = router
