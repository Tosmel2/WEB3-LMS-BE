import Course from '../model/Courses.js'

// Add a new course
export const addCourse = async (req, res) => {
  try {
    const {
      title,
      instructor,
      description,
      isFree,
      courseThumbnailImage,
    } = req.body

    //   const newCourse = await Course.create({
    //     title,
    //     instructor,
    //     description,
    //     isFree,
    // });

    const newCourse = new Course({
      title,
      // courseThumbnailImage,
      instructor,
      description,
      isFree,
    })

    await newCourse.save()

    res.status(201).json(newCourse)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get all courses
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find()

    res.status(200).json(courses)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get a single course
export const getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)

    if (!course) {
      return res.status(404).json({ message: 'Course not found' })
    }

    res.status(200).json(course)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Update a course
export const updateCourse = async (req, res) => {
  try {
    const { title, instructor, description, isFree, status } = req.body

    const course = await Course.findById(req.params.id)

    if (!course) {
      return res.status(404).json({ message: 'Course not found' })
    }

    course.title = title
    course.instructor = instructor
    course.description = description
    course.isFree = isFree
    course.status = status

    await course.save()

    res.status(200).json(course)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Delete a course
export const deleteCourse = async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id)

    if (deletedCourse) {
      return res.status(200).json({
        status: 'Course deleted successfully',
        data: { deletedCourse },
      })
    } else {
      res.status(404).json({
        status: 'error',
        message: 'Course not found',
      })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Search courses
export const searchCourses = async (req, res) => {
  try {
    const { query } = req.params;
    const regex = new RegExp(query, 'i'); // 'i' means case-insensitive
    const courses = await Course.find({ title: { $regex: regex } });

    const searchQuery = req.query.q;
    let results = await db.query(`SELECT * FROM courses WHERE title LIKE '%${searchQuery}%'`);
    res.json(results.rows);

    results = courses.map((course) => ({
      id: course._id,
      title: course.title,
      description: course.description,
    }));

    return res.status(200).json({ results });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server Error');
  }
};

