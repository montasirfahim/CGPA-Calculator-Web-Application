
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

         let courses = [];
         function calculateCGPA() {
            const courseRows = document.querySelectorAll('.course-row');
            let totalCredit = 0;
            let totalObtainedPoint = 0;
            courses = [];
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


        // function printResult() {
        //     const resultDiv = document.getElementById('result').innerHTML;
        //     const originalContent = document.body.innerHTML;
        //     const inputSection = document.getElementById('course-container').innerHTML;

        //     document.body.innerHTML = resultDiv;
        //     window.print();
        //     document.body.innerHTML = inputSection + originalContent;
        // }



        function printResult() {
            const printTab = window.open('', '_blank');
         printTab.document.open();
            printTab.document.write(`
                <html>
                <head>
                    <title>Print Result</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            margin: 35px 5px 0 5px; /* top: 35px, left and right: 5px, bottom: 0px */
                        }
                        table {
                            width: 100%;
                            border-collapse: collapse;
                            table-layout: fixed;
                            text-align: left;
                        }

                        th, td {
                            border: 1px solid black;
                            padding: 4px;
                            white-space: nowrap; /* Prevents wrapping */
                        }

                        th {
                            background-color: #f2f2f2; 
                        }

                
                        th:nth-child(1), td:nth-child(1) {
                            width: 47%;
                        }

                        th:nth-child(2), td:nth-child(2) {
                            width: 16%; 
                        }

                        th:nth-child(3), td:nth-child(3) {
                            width: 14%; /* "Grade Point" */
                        }

                        th:nth-child(4), td:nth-child(4) {
                            width: 15%; /* "Letter Grade" */
                        }

                        th:nth-child(5), td:nth-child(5) {
                            width: 8%; /* "Point" column */
                        }

                        h2, h3 {
                            text-align: left;
                        }

                        .print-button {
                            display: none;
                        }
                    </style>
                </head>
                <body>
                    <h2>Grade Sheet:</h2>
                    <table border="1" style="width: 100%; border-collapse: collapse; text-align: left;">
                        <thead>
                            <tr>
                                <th>Course Name</th>
                                <th>Course Credit</th>
                                <th>Grade Point</th>
                                <th>Letter Grade</th>
                                <th>Point</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${courses.map(course => `
                                <tr>
                                    <td>${course.courseName}</td>
                                    <td>${course.courseCredit.toFixed(2)}</td>
                                    <td>${course.obtainedGPA.toFixed(2)}</td>
                                    <td>${course.letterGrade}</td>
                                    <td>${course.obtainedPoint.toFixed(2)}</td>
                                </tr>
                            `).join('')}
                            
                            <tr>
                                <td><strong>Total:</strong></td>
                                <td><strong>${courses.reduce((sum, course) => sum + course.courseCredit, 0).toFixed(2)}</strong></td>
                                <td></td><td></td>
                                <td><strong>${courses.reduce((sum, course) => sum + course.obtainedPoint, 0).toFixed(2)}</strong></td>
                            </tr>
                        </tbody>
                    </table>
                    <h3>Total CGPA: ${courses.length > 0 ? (courses.reduce((sum, course) => sum + course.obtainedPoint, 0) / courses.reduce((sum, course) => sum + course.courseCredit, 0)).toFixed(2) : 0}</h3>
                </body>
                </html>
            `);
            printTab.document.close();
            printTab.focus(); 
            printTab.print(); 
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
    
