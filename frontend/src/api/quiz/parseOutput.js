const parseOutput = ( json ) => {
    const resultsSets = {};
    var jsonResult = json.choices[0].message.content;
    // Sanitization
    // JSON output may include tilde (`) characters
    if(jsonResult.includes("`")) {
        jsonResult = jsonResult.replace(/`/g,"");
    }
    var parsedResult = JSON.parse(jsonResult);
    //console.log(parsedResult);

    if(typeof parsedResult === "string") {
        parsedResult = JSON.parse(jsonResult);
    }

    if(!parsedResult.review || !parsedResult.study || !parsedResult.challenge) {
        throw new Error("Error occurred! Try again later!");
    }
    else {
        for(let array in parsedResult) {
            console.log(parsedResult[array], array);
            resultsSets[array] = parsedResult[array];
        }
    }
    return resultsSets;
}

export default parseOutput;