const express = require("express");
const tagsRouter = express.Router();

tagsRouter.use((req, res, next) => {
  console.log("A request is being made to /tags");

  next();
});

const { getAllTags, getPostsByTagName } = require("../db");

tagsRouter.get("/", async (req, res) => {
    const tags = await getAllTags();

    res.send({
        tags,
    });
});

tagsRouter.get('/:tagName/posts', async (req, res, next) => {
  let tagName = req.params.tagName;
  try {
    // use our method to get posts by tag name from the db
    // send out an object to the client { posts: // the posts }
    let posts = getPostsByTagName(tagName)
    res.send({ posts });
  } catch ({ name, message }) {
    // forward the name and message to the error handler
    next({ name, message })
  }
});

module.exports = tagsRouter;
