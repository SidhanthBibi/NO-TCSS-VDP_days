// client/src/components/GPACalculator.js
import React, { useState } from 'react';

const GPACalculator = () => {
  const [courses, setCourses] = useState([{ name: '', grade: '', credits: '' }]);
  const [gpa, setGPA] = useState(null);

  const addCourse = () => {
    setCourses([...courses, { name: '', grade: '', credits: '' }]);
  };

  const updateCourse = (index, field, value) => {
    const updatedCourses = [...courses];
    updatedCourses[index][field] = value;
    setCourses(updatedCourses);
  };

  const calculateGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    courses.forEach(course => {
      const { grade, credits } = course;
      const numericGrade = getNumericGrade(grade);
      const numericCredits = parseFloat(credits);

      if (!isNaN(numericGrade) && !isNaN(numericCredits)) {
        totalPoints += numericGrade * numericCredits;
        totalCredits += numericCredits;
      }
    });

    const calculatedGPA = totalCredits > 0 ? totalPoints / totalCredits : 0;
    setGPA(calculatedGPA.toFixed(2));
  };

  const getNumericGrade = (grade) => {
    const gradeMap = { 'A': 4, 'B': 3, 'C': 2, 'D': 1, 'F': 0 };
    return gradeMap[grade.toUpperCase()] || 0;
  };

  return (
    <div className="gpa-calculator">
      <h2>GPA Calculator</h2>
      {courses.map((course, index) => (
        <div key={index} className="course-input">
          <input
            type="text"
            placeholder="Course Name"
            value={course.name}
            onChange={(e) => updateCourse(index, 'name', e.target.value)}
          />
          <input
            type="text"
            placeholder="Grade (A-F)"
            value={course.grade}
            onChange={(e) => updateCourse(index, 'grade', e.target.value)}
          />
          <input
            type="number"
            placeholder="Credits"
            value={course.credits}
            onChange={(e) => updateCourse(index, 'credits', e.target.value)}
          />
        </div>
      ))}
      <button onClick={addCourse}>Add Course</button>
      <button onClick={calculateGPA}>Calculate GPA</button>
      {gpa && <p>Your GPA: {gpa}</p>}
    </div>
  );
};

export default GPACalculator;