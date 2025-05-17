document.addEventListener('DOMContentLoaded', function() {
    const calculateBtn = document.getElementById('calculate');
    const clearBtn = document.getElementById('clear');
    const resultsDiv = document.getElementById('results');
    const inputs = document.querySelectorAll('input');

    calculateBtn.addEventListener('click', calculateGPA);
    clearBtn.addEventListener('click', clearAll);

    function calculateGPA() {
        const name = document.getElementById('name').value.trim();
        if (!name) {
            alert('Please enter your name');
            return;
        }

        const scores = {
            apcs: getScore('apcs'),
            chemistry: getScore('chemistry'),
            apprecalc: getScore('apprecalc'),
            worldlit: getScore('worldlit'),
            apbio: getScore('apbio'),
            physics: getScore('physics'),
            khmer: getScore('khmer'),
            math: getScore('math'),
            moral: getScore('moral'),
            earthscience: getScore('earthscience'),
            biology: getScore('biology'),
            geography: getScore('geography'),
            history: getScore('history')
        };

        const khmerLangHistAvg = Math.floor((scores.khmer + scores.moral + scores.earthscience + scores.geography + scores.history) / 5);
        const khmerMathSciAvg = Math.floor((scores.chemistry + scores.physics + scores.math + scores.biology) / 4);

        const subjects = [
            { name: 'AP Computer Science Principles', score: scores.apcs, isAP: true },
            { name: 'AP Precalculus', score: scores.apprecalc, isAP: true },
            { name: 'AP Biology', score: scores.apbio, isAP: true },
            { name: 'Khmer Language and History', score: khmerLangHistAvg, isAP: false },
            { name: 'Khmer Math and Sciences', score: khmerMathSciAvg, isAP: false },
            { name: 'World Literature and Composition', score: scores.worldlit, isAP: false }
        ];

        let totalGPA = 0;
        let resultHTML = `<div class="student-result">
            <h2>${name}'s GPA Results</h2>`;

        subjects.forEach(subject => {
            const gradeInfo = getGradeInfo(subject.score, subject.isAP);
            totalGPA += gradeInfo.gpa;
            
            const gradeClass = `grade-${gradeInfo.letter.replace(/[+-]/g, '')}`;
            resultHTML += `
                <div class="subject-score">
                    <span>${subject.name}: ${subject.score}</span>
                    <span class="${gradeClass}">${gradeInfo.letter} (GPA: ${gradeInfo.gpa.toFixed(1)})</span>
                </div>`;
        });

        const averageGPA = (totalGPA / subjects.length).toFixed(2);
        resultHTML += `
            <div class="gpa-display">
                Overall GPA: <span class="grade-${getLetterGrade(parseFloat(averageGPA)).replace(/[+-]/g, '')}">${averageGPA}</span>
            </div>
        </div>`;

        resultsDiv.insertAdjacentHTML('afterbegin', resultHTML);
    }

    function getScore(id) {
        const value = parseInt(document.getElementById(id).value);
        return isNaN(value) ? 0 : Math.max(0, Math.min(100, value));
    }

    function getGradeInfo(score, isAP) {
        if (score >= 97) return { letter: 'A+', gpa: isAP ? 5.0 : 4.0 };
        if (score >= 93) return { letter: 'A', gpa: isAP ? 5.0 : 4.0 };
        if (score >= 90) return { letter: 'A-', gpa: isAP ? 4.7 : 3.7 };
        if (score >= 87) return { letter: 'B+', gpa: isAP ? 4.3 : 3.3 };
        if (score >= 83) return { letter: 'B', gpa: isAP ? 4.0 : 3.0 };
        if (score >= 80) return { letter: 'B-', gpa: isAP ? 3.7 : 2.7 };
        if (score >= 77) return { letter: 'C+', gpa: isAP ? 3.3 : 2.3 };
        if (score >= 73) return { letter: 'C', gpa: isAP ? 3.0 : 2.0 };
        if (score >= 70) return { letter: 'C-', gpa: isAP ? 2.7 : 1.7 };
        if (score >= 65) return { letter: 'D', gpa: isAP ? 2.0 : 1.0 };
        return { letter: 'F', gpa: 0 };
    }

    function getLetterGrade(gpa) {
        if (gpa >= 4.0) return 'A';
        if (gpa >= 3.7) return 'A-';
        if (gpa >= 3.3) return 'B+';
        if (gpa >= 3.0) return 'B';
        if (gpa >= 2.7) return 'B-';
        if (gpa >= 2.3) return 'C+';
        if (gpa >= 2.0) return 'C';
        if (gpa >= 1.7) return 'C-';
        if (gpa >= 1.0) return 'D';
        return 'F';
    }

    function clearAll() {
        document.getElementById('name').value = '';
        const inputs = document.querySelectorAll('input[type="number"]');
        inputs.forEach(input => input.value = '');
    }

    inputs.forEach((input, index) => {
        input.addEventListener('keydown', (event) => {
          if (event.key === 'ArrowDown') {
            event.preventDefault();
            const next = inputs[index + 1];
            if (next) next.focus();
          } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            const prev = inputs[index - 1];
            if (prev) prev.focus();
          }
        });
      });
});