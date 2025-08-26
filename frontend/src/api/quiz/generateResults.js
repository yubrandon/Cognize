const generateResults = async (deckName, quizData) => {
    const url = `https://openrouter.ai/api/v1/chat/completions`;
    const response = await fetch(url, {
        method:"POST",
        headers: {
            "Authorization": `Bearer ${import.meta.env.VITE_LLM_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "model": `${import.meta.env.VITE_LLM_MODEL}`,
            "messages": [
                {
                    "role":"user",
                    "content": `You are a tutor grading a student's quiz results on their flash card deck named ${deckName}. 
                                Here is a JSON object containg different types of questions the student has answered: ${quizData}
                                The quiz questions have been created from flash cards that the student has inputted.
                                The categories of questions are the following:
                                    "Review": Questions containing content that the student is expected to already know.
                                    "Study": Questions containing content that the student may know based on their current knowledge.
                                    "Challenge": Questions containing content that the student has not indicated that they know, and are meant to be challenging questions that may be solvable.
                                Each array under these categories contains objects with question, answer, and userResponse keys.
                                The questions and answer keys have been generated previously, while the userResponse key contains what the user put in as their answer.
                                Note that the "answer" key is the generated correct answer, not the user's answer, while userResponse is what the user has put in as their own answer.
                                Your job is to output a JSON object containing the results of the student's quiz.
                                
                                The format must match the following:
                                "{
                                    "review": {[
                                        {"question":"What is USA an acronym for?"}, "answer":"United States of America", "userResponse":"United States of America", "correct":<true/false> "comments":<Your comments on the student's response>},
                                        {..}
                                    ]},
                                    "study": {[
                                        {..}
                                    ]},
                                    "challenge": {[
                                        {..}
                                    ]},
                                }"
                                The question and answer keys will be output directly from the input, as they have been predetermined.
                                Your job is to determine if the userResponse key value is correct compared to the answer key value, and include comments under the comments key as needed for expanding on why the student was correct or incorrect.
                                Make sure to not confuse the "answer" key value with the "userResponse" key value.

                                The "correct" key MUST have a boolean value. 
                                The value for "comments" is a string that comments on how well the student answered the question.
                                If the question is simple, a simple comment can be made according to if the student was simply correct or not.
                                If the question is more nuanced, but the student's response is acceptable, you may set the value for "correct" to true and add more nuance in the comments.
                                If the user's response is blank, not related to the question, or gibberish, you may assume that the student did not know what to answer.
                                Content for the "comments" key should not include irrelevant information such as critiquing how important knowing the answer is, and should only focus on the correctness of the answer.
                                Comments should also not refer to the student as "user", or any other 3rd person language, and should focus on the student's response.
                                    
                                **CRITICAL INSTRUCTION**
                                ONLY output the raw JSON object without any explanations or formatting characters.
                                DO NOT include any text such as backticks, curly braces, or the word "json".
                                The output MUST be a valid JSON object that can be parsed.

                                `
                },
            ]
        })
    });
    const json = await response.json();
    return json;
}

export default generateResults;