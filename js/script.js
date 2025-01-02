
        console.log("JavaScript file is loaded! Debugged!");

        function getLetterGrade(gpa) {
            if (gpa == 4.0) {
                return 'A+';
            } else if (gpa >= 3.75 && gpa <= 4.00) {
                return 'A';
            } else if (gpa >= 3.50 && gpa < 3.75) {
                return 'A-';
            } else if (gpa >= 3.25 && gpa < 3.50) {
                return 'B+';
            } else if (gpa >= 3.00 && gpa < 3.25) {
                return 'B';
            } else if (gpa >= 2.75 && gpa < 3.00) {
                return 'B-';
            } else if (gpa >= 2.50 && gpa < 2.75) {
                return 'C+';
            } else if (gpa >= 2.25 && gpa < 2.50) {
                return 'C';
            } else if (gpa >= 2.0 && gpa < 2.25) {
                return 'D';
            } else if (gpa >= 0.0 && gpa < 2.00) {
                return 'F';
            } else {
                return 'Invalid GPA';  
            }
        }


        function addCourseRow() {
            const container = document.getElementById('course-container');

            const newRow = document.createElement('div');
            newRow.className = 'course-row';

            newRow.innerHTML = `
                
                <input type="text" placeholder="Course Name">
                <input type="number" placeholder="Course Credit" min="1">
                <input type="number" placeholder="Obtained Grade Point" step="0.25" min="0" max="4">
		<button class="delete-button" onclick="deleteCourseRow(this)">Delete</button>
            `;

            container.appendChild(newRow);
        }

        function deleteCourseRow(button) {
            const row = button.parentElement;
            row.remove();
        }

         function calculateCGPA() {
            const courseRows = document.querySelectorAll('.course-row');
            let totalCredit = 0;
            let totalObtainedPoint = 0;
            const courses = [];

            courseRows.forEach(row => {
                const inputs = row.querySelectorAll('input');
                const courseName = inputs[0].value;
                const courseCredit = parseFloat(inputs[1].value) || 0;
                const obtainedGPA = parseFloat(inputs[2].value) || 0;
                const obtainedPoint = courseCredit * obtainedGPA;
                let letterGrade = getLetterGrade(obtainedGPA);

                totalCredit += courseCredit;
                totalObtainedPoint += obtainedPoint;

                if (courseName && courseCredit > 0 && obtainedGPA >= 0 && obtainedGPA <= 4.00) {
                    courses.push({ courseName, courseCredit, obtainedGPA, letterGrade, obtainedPoint });
                }
            });

            const resultDiv = document.getElementById('result');

            if (courses.length === 0) {
                resultDiv.innerHTML = '<p style="color: red;">Error: Please enter valid course information before calculating.</p>';
                return;
            }

            let resultHTML = '<h2>Result:</h2>';
            resultHTML += '<table border="1" style="width: 100%; border-collapse: collapse; text-align: left;">';
            resultHTML += '<tr><th>Course Name</th><th>Course Credit</th><th>Obtained Grade Point</th><th>Letter Grade</th><th>Obtained Point</th></tr>';

            courses.forEach(course => {
                resultHTML += `<tr>
                    <td>${course.courseName}</td>
                    <td>${course.courseCredit.toFixed(2)}</td>
                    <td>${course.obtainedGPA.toFixed(2)}</td>
                    <td>${course.letterGrade}</td>
                    <td>${course.obtainedPoint.toFixed(2)}</td>
                </tr>`;
            });

            resultHTML += `<tr>
                <td><strong>Total:</strong></td>
                <td><strong>${totalCredit.toFixed(2)}</strong></td>
                <td></td> <td></td>
                <td><strong>${totalObtainedPoint.toFixed(2)}</strong></td>
            </tr>`;
            resultHTML += '</table>';

            const cgpa = totalCredit > 0 ? (totalObtainedPoint / totalCredit).toFixed(2) : 0;
            resultHTML += `<h3>Total CGPA: ${cgpa}</h3>`;

            resultHTML += '<button class="print-button" onclick="printResult()">Print Result</button>';

            resultDiv.innerHTML = resultHTML;
        }


        function printResult() {
            const resultDiv = document.getElementById('result').innerHTML;
            const originalContent = document.body.innerHTML;

            document.body.innerHTML = resultDiv;
            window.print();
            document.body.innerHTML = originalContent;
        }


        function resetForm() {
            document.getElementById('course-container').innerHTML = `
                <div class="course-row">
                    <input type="text" placeholder="Course Name">
                    <input type="number" placeholder="Course Credit" min="1">
                    <input type="number" placeholder="Obtained Grade Point" step="0.25" min="0" max="4">
                    <button class="add-button" onclick="addCourseRow()">Add More Course</button>
                </div>
            `;
            document.getElementById('result').innerHTML = '';
        }
    
