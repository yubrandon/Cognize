import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import getCards from "../api/getCards";
import generateQuestion from "../api/generateQuestions";


const QuizPage = () => {
    const [deckName, setDeckName] = useState('');
    const [cardData, setCardData] = useState([]);
    const [quizQuestions, setQuizQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { deckId } = useParams();
    const navigate = useNavigate();

    const testQuiz = async () => {
        console.log('generating');
        console.log(deckName, cardData);
        const res = await generateQuestion(deckName, cardData);
        console.log(res);
        if(res.ok) {
            const json = await res.json();
            console.log(json);
            const questions = json.choices[0].message.content;
            console.log(questions);
            const q = JSON.parse(questions);
            /*for(let index in q) {
                console.log(q[index])
            }*/
        }
        else {
            const json = await res.json();
            console.log(json);
            //alert('Error generating questions! Returning to the previous page!');
            //navigate("./..");
        }


    
    }

    useEffect(() => {
        const fetchCards = async () => {
            const deckData = await getCards(deckId)
                .catch((error) => setError(error));
            if(!error) {
                setDeckName(deckData.name);
                setCardData(deckData.cards);
                setLoading(false);
            }
            else {
                alert(error);
            }
        }
        fetchCards();
    }, []);

    //if(loading) return <h1>Creating your quiz...</h1>
    if(error) return <h1>{error}</h1>
    
    return (
        <div>
            <button type="button"
            onClick={testQuiz}>
                quiz
            </button>
        </div>
    )
}

export default QuizPage;