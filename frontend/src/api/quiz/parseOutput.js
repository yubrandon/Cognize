const parseOutput = async ( json ) => {
    const resultsSets = {};
    var jsonResult = await json.choices[0].message.content;
    // Sanitization
    // JSON output may include tilde (`) characters
    if(jsonResult.includes("`")) {
        jsonResult = await jsonResult.replace(/`/g,"");
    }
    var parsedResult = await JSON.parse(jsonResult);

    if(typeof parsedResult === "string") {
        parsedResult = await JSON.parse(jsonResult);
    }
    if(!parsedResult.review || !parsedResult.study || !parsedResult.challenge) {
        throw new Error("Error occurred! Try again later!");
    }
    else {
        for(let array in parsedResult) {
            //console.log(parsedResult[array], array);
            resultsSets[array] = parsedResult[array];
        }
    }
    return resultsSets;
}

export default parseOutput;