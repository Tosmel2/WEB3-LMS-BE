import Instructor from '../../model/Instructor.js';


export const createInstructor = async (req, res) => {
  try {
    const { firstname, lastname, email } = req.body;

    const instructor = await Instructor.create({
      firstname,
      lastname,
      email,
      status: 'pending'
    });

    res.status(201).json(instructor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getInstructors = async (req, res) => {
  try {
    const instructors = await Instructor.find();
    res.status(200).json(instructors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getInstructorById = async (req, res) => {
  try {
    const { id } = req.params;
    const instructor = await Instructor.findById(id);
    res.status(200).json(instructor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCoursesByInstructorId = async (req, res) => {
  try {
    const { id } = req.params;
    const instructor = await Instructor.findById(id).populate('courses');
    res.status(200).json(instructor.courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStudentsByInstructorId = async (req, res) => {
  try {
    const { id } = req.params;
    const instructor = await Instructor.findById(id).populate('students');
    res.status(200).json(instructor.students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCommentsByInstructorId = async (req, res) => {
  try {
    const { id } = req.params;
    const instructor = await Instructor.findById(id).populate('comments');
    res.status(200).json(instructor.comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// export const getInstructorCourses = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const instructor = await Instructor.findById(id);

//     if (!instructor) {
//       return res.status(404).json({ message: 'Instructor not found' });
//     }

//     const courses = await Course.find({ instructor: id });
//     res.status(200).json(courses);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const addCommentToInstructor = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    const instructor = await Instructor.findById(id);

    instructor.comments.push({ text });
    await instructor.save();

    res.status(201).json(instructor.comments[instructor.comments.length - 1]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateInstructor = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstname, lastname, email, status } = req.body;

    const instructor = await Instructor.findByIdAndUpdate(
      id,
      {
        firstname,
        lastname,
        email,
        status
      },
      { new: true }
    );

    res.status(200).json(instructor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const deleteInstructor = async (req, res) => {
  try {
    const { id } = req.params;
    const instructor = await Instructor.findByIdAndDelete(id);

    res.status(200).json(instructor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const approveInstructor = async (req, res) => {
  try {
    const { id } = req.params;

    const instructor = await Instructor.findByIdAndUpdate(id, { status: 'approved' }, { new: true });

    if (!instructor) {
      return res.status(404).json({ message: 'Instructor not found' });
    }

    res.status(200).json(instructor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const rejectInstructor = async (req, res) => {
  try {
    const { id } = req.params;

    const instructor = await Instructor.findByIdAndUpdate(id, { status: 'rejected' }, { new: true });

    if (!instructor) {
      return res.status(404).json({ message: 'Instructor not found' });
    }

    res.status(200).json(instructor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addCourseToInstructor = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price } = req.body;

    const instructor = await Instructor.findById(id);

    if (!instructor) {
      return res.status(404).json({ message: 'Instructor not found' });
    }

    const course = await Course.create({
      title,
      description,
      price,
      instructor: id
    });

    instructor.courses.push(course);
    await instructor.save();

    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

