const mergeQuizData = (questions, responses) => {
    // Must copy inputs else null input may be read on re-render
    const data = {};
    Object.assign(data, questions);
    const tempResponses = {};
    Object.assign(tempResponses, responses);

    // Combine questions and user responses into one object for LLM prompting
    for(let set in data) {
        const currentSet = data[set];
        const currentAnswers = tempResponses[set];

        if(!currentAnswers) {
            throw new ReferenceError("Undefined")
        }

        for(let question in currentSet) {
            const prompt = currentSet[question];
            prompt.userResponse = currentAnswers[question];
        }
    }
    return data;    
}

export default mergeQuizData;