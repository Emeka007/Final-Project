const express = require('express');
const router = express.Router();    
const Post = require('../models/Post');

/**
 * GET /
 * HOME
*/
router.get('', async (req, res) => {
  try {
const locals = 

{
    title:"Web Development Blog",
    description:"This is a simple blog about web development, created with NodeJs & MongoDb."
}
 



  let perPage = 10;
  let page = req.query.page || 1;

    const data = await Post.aggregate([ { $sort: { createdAt: -1 } } ])
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec();


const count = await Post.countDocuments({});
const nextPage = parseInt(page) + 1;
const hasNextPage = nextPage <= Math.ceil(count / perPage);

res.render('index', { 
  locals, 
  data,
  current: page,
  nextPage: hasNextPage? nextPage : null
});



} catch (error) {
console.log(error);
}






});

function insertPostData () {
       Post.insertMany([
        {
          title: "Building a Blog with Node.js",
           body: "Learn how to use Node.js to build RESTful APIs using frameworks like Express.js"
         },
         {
                  title: "Mastering Web Foundations: A Beginner's Guide to HTML",
                   body: "Dive into the basics of web development by learning HTML from scratch. Understand its structure, tags, and how to create your first webpage...."
                 },
                 {
                   title: "Crafting Style: The Power of CSS in Web Design",
                   body: "Explore the world of CSS and discover how to add style, layout, and responsiveness to your HTML pages, making your websites visually appealing and user-friendly."
                 },
                 {
                   title: "Understand how to work with MongoDB and Mongoose",
                  body: "Understand how to work with MongoDB and Mongoose, an Object Data Modeling (ODM) library, in Node.js applications."
                 },
                 {
                   title: "Unleashing Interactivity: An Introduction to JavaScript",
                   body: "Learn the fundamentals of JavaScript and unlock the potential to make your web pages dynamic, interactive, and engaging for users."
                 },
                 {
                   title: "Enhancing User Experience with jQuery: Simplifying JavaScript",
                   body: "Discover how jQuery can streamline your JavaScript code and empower you to create animations, handle events, and manipulate the DOM with ease."
                 },
                 {
                   title: "Asynchronous Programming with Node.js",
                   body: "Asynchronous Programming with Node.js: Explore the asynchronous nature of Node.js and how it allows for non-blocking I/O operations."
                 },
                 {
                   title: "Learn the basics of Node.js and its architecture",
                   body: "Learn the basics of Node.js and its architecture, how it works, and why it is popular among developers."
                },
                 {
                   title: "NodeJs Limiting Network Traffic",
                   body: "Learn how to limit netowrk traffic."
                 },
                 {
                   title: "Streamlining Development: Harnessing the Power of Node.js",
                   body: "Learn how Node.js revolutionizes web development by enabling server-side JavaScript execution. Discover its features, ecosystem, and best practices for building efficient web applications."
                },
                {
                  title: "Efficient Web Development Workflow with HTML, CSS, and JavaScript",
                  body: "Optimize your development process by mastering the integration of HTML, CSS, and JavaScript. Explore tools, techniques, and workflows to boost productivity and code quality."
               },
               {
                title: "Advanced Techniques: Leveraging HTML, CSS, JavaScript, jQuery, and Node.js",
                body: "Take your web development skills to the next level with advanced techniques. Explore complex concepts, best practices, and real-world examples using HTML, CSS, JavaScript, jQuery, and Node.js."
             },
        ])
         }
        
        insertPostData();
        



/**
 * GET /
 * Post :id
*/
router.get('/post/:id', async (req, res) => {
  try {
    let slug = req.params.id;

    const data = await Post.findById({ _id: slug });

    const locals = {
      title: data.title,
      description: "This is a simple blog about web development, created with NodeJs & MongoDb.",
    }

    res.render('post', { 
      locals,
      data,
      currentRoute: `/post/${slug}`
    });
  } catch (error) {
    console.log(error);
  }

});




/**
 * POST /
 * Post - searchTerm
*/
router.post('/search', async (req, res) => {
  try {
    const locals = {
      title: "Search",
      description: "This is a simple blog about web development, created with NodeJs & MongoDb."
    }

    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "")

    const data = await Post.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChar, 'i') }},
        { body: { $regex: new RegExp(searchNoSpecialChar, 'i') }}
      ]
    });

    
    

    res.render("search", {
      data,
      locals,
      
    });
    
  } catch (error) {
    console.log(error);
  }

});

/**
 * GET /
 * About
*/
router.get('/about', async (req, res) => {
  try {
    const locals = {
      title: "About",
      description: "Learn more about Chukwuemeka Obanya and his passions for web development, football, and chess."
    };

    // Fetch data for latest posts
    const data = await Post.aggregate([{ $sort: { createdAt: -1 } }]).limit(5).exec();

    // Render the about page with data
    res.render('about', {
      locals,
      data, // Pass the data variable to the template
      currentRoute: '/about'
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});


/**
 * GET /
 * Contact
*/
router.get('/contact', (req, res) => {
  res.render('contact', {
    currentRoute: '/contact'
  });
});

module.exports = router;