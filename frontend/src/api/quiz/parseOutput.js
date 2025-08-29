const parseOutput = async ( json ) => {
    const parsedResults = {};
    var llmOutput = await json.choices[0].message.content;
    if(llmOutput.includes("`")) {
        llmOutput = await llmOutput.replace(/`/g,"");
    }
    var parsedOutput = await JSON.parse(llmOutput);
    if(typeof parsedOutput === "string") {
        parsedOutput = await JSON.parse(llmOutput);
    }
    if(!parsedOutput.review || !parsedOutput.study || !parsedOutput.challenge) {
        throw new Error("Error occurred! Try again later!");
    }
    else {
        for(let set in parsedOutput) {
            parsedResults[set] = parsedOutput[set];
        }
    }
    console.log(parsedOutput);

    return parsedResults;
}

export default parseOutput;