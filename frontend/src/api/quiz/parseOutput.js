const parseOutput = ( json ) => {
    const questionSets = {};
    const jsonQuestions = json.choices[0].message.content;
    console.log('content',jsonQuestions);
    // Sanitization
    // JSON output may include tilde (`) characters
    if(jsonQuestions.includes("`")) {
        jsonQuestions = jsonQuestions.replace(/`/g,"");
    }
    var questions;
    try {
        questions = JSON.parse(jsonQuestions);
    }
    catch (e) {
        console.log('error',e);
    }
    if(questions.error) {
        console.log(questions.error);
        alert("Error generating questions! Please try again shortly.");
    }
    else {
        for(let array in questions) {
            //console.log(questions[array], array);
            questionSets[array] = questions[array];
        }
        console.log('sanitized questions:', questionSets);
        return questionSets;
    }

}

export default parseOutput;