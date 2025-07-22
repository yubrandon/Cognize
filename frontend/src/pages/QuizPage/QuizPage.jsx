import { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import getCards from "../../api/cards/getCards";
import generateQuestion from "../../api/generateQuestions";
import ReviewQuestionsPage from "./ReviewQuestionsPage";
import StudyQuestionsPage from "./StudyQuestionsPage";
import ChallengeQuestionsPage from "./ChallengeQuestionsPage";

const QuizPage = () => {
    const [deckName, setDeckName] = useState('');
    const [cardData, setCardData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const mode = searchParams.get('mode');
    const { deckId } = useParams();
    const navigate = useNavigate();

    const changeMode = (newMode) => {
        setSearchParams({mode: newMode});
    }

    const testQuiz = async () => {
        console.log('generating');
        console.log(deckName, cardData);
        const res = await generateQuestion(deckName, cardData);
        if(res.ok) {
            var json = await res.json();
            console.log(json);
            const questions = json.choices[0].message.content;
            if(questions.includes("`")) {
                json = json.replace(/`/g, "");
            }
            // Parsing the returned JSON object will give three arrays: 
            //  Review/Study/Challenge Questions
            const jsonQuestions = JSON.parse(questions);
            for(let array in jsonQuestions) {
                console.log(jsonQuestions[array]);
            }
           const reviewQuestions = jsonQuestions[0];
           const studyQuestions = jsonQuestions[1];
           const challengeQuestions = jsonQuestions[2];
           setLoading(false);
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
    if(loading) return <h1>Creating your quiz...</h1>
    if(error) return <h1>{error}</h1>
    return (
        <div>
            <button onClick={() => {changeMode('review')}}>review</button>
            <button onClick={() => {changeMode('study')}}>study</button>
            <button onClick={() => {changeMode('challenge')}}>challenge</button>
        </div>
    )

}

export default QuizPage;