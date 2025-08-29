import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import mergeQuizData from "../../api/quiz/mergeQuizData";
import parseOutput from "../../api/quiz/parseOutput";
import generateResults from "../../api/quiz/generateResults";
import getCards from "../../api/cards/getCards";
import QuizResultCategory from "../../components/quiz/QuizResultCategory";

const QuizResultsPage = ({ questions, responses }) => {
    const navigate = useNavigate();
    const { deckId } = useParams();
    const [error, setError] = useState(null);
    const [results, setResults] = useState({});
    const [loading, setLoading] = useState(true);
    const hasParsed = useRef(false);

    const handleReturn = () => {
        navigate(`/sets/${deckId}`);
    }
    
    useEffect(() => {
        if(hasParsed.current) return;
        hasParsed.current = true;

        const handleResults = async () => {
            const deckData = await getCards(deckId)
                .catch((error) => setError(error));
            if(!error) {
                let count = 0;
                let maxCalls = 3;
                try{
                    /*while(true) {
                        try {
                            const quizData = mergeQuizData(questions, responses);
                            const quizResults = await generateResults(deckData.name, JSON.stringify(quizData));
                            const resultData = await parseOutput(quizResults);
                            setResults(resultData);
                            setLoading(false);
                        }
                        catch (e) {
                            if(++count === maxCalls) throw e;
                        }   
                    }   */             
                }
                catch (e) {
                    alert('Error! Please try again later!');
                    navigate(`/sets/${deckId}`);
                }
                         
            }

        }
        //handleResults();
        const resultData= {
            "review": [
                {
                "question": "What does IM stand for?",
                "answer": "intramuscular",
                "userResponse": ""
                },
                {
                "question": "What does PCN stand for?",
                "answer": "penicillin",
                "userResponse": ""
                },
                {
                "question": "What does ut dict stand for?",
                "answer": "as directed",
                "userResponse": ""
                },
                {
                "question": "What does PCN stand for in pharmacy shorthand?",
                "answer": "penicillin",
                "userResponse": ""
                },
                {
                "question": "What route of administration is associated with IM?",
                "answer": "intramuscular",
                "userResponse": ""
                },
                {
                "question": "What does PO stand for?",
                "answer": "orally",
                "userResponse": ""
                },
                {
                "question": "What does post stand for?",
                "answer": "after",
                "userResponse": ""
                },
                {
                "question": "What does ou stand for?",
                "answer": "both eyes",
                "userResponse": ""
                },
                {
                "question": "What does Ped stand for?",
                "answer": "pediatric",
                "userResponse": ""
                },
                {
                "question": "What does PCN stand for in the context of medications?",
                "answer": "penicillin",
                "userResponse": ""
                }
            ],
            "study": [
                {
                "question": "What is the timeframe associated with the abbreviation pc?",
                "answer": "after meals",
                "userResponse": ""
                },
                {
                "question": "What is the likely timeframe associated with the abbreviation post in a medication order?",
                "answer": "after",
                "userResponse": ""
                },
                {
                "question": "What does the route code IM commonly apply to?",
                "answer": "vaccination",
                "userResponse": ""
                }
            ],
            "challenge": [
                {
                "question": "Convert the order 'PCN 500mg tid' into full terms.",
                "answer": "penicillin 500mg taken three times daily",
                "userResponse": ""
                },
                {
                "question": "Which additional route abbreviation would typically be used in conjunction with penicillin?",
                "answer": "IM",
                "userResponse": ""
                },
                {
                "question": "If an order was given for IM penicillin, what key piece of information would be critically required before administration?",
                "answer": "allergies",
                "userResponse": ""
                }
            ]
            }
        setResults(resultData);
        setLoading(false);
    }, []);
    if(loading) return <h1 className="flex flex-row justify-center p-3 text-lg font-medium">Loading results...</h1>
    if(error) return <h1 className="flex flex-row justify-center p-3 text-lg font-medium">Error! Could not load deck, try again later!</h1>
    return (
        <div className="flex flex-col items-start p5 ml-7">
            <h1 className="text-6xl font-bold py-3 w-1/2">Quiz Results</h1>
            <QuizResultCategory category={"Review"} questionSet={results.review}/>
            <QuizResultCategory category={"Study"} questionSet={results.study}/>
            <QuizResultCategory category={"Challenge"} questionSet={results.challenge}/>
            <button type="button" onClick={handleReturn}>Return to Deck</button>
        </div>
    )
}

export default QuizResultsPage;