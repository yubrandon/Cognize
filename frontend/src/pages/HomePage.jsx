import { Link } from 'react-router-dom';
import '../css/App.css'

const HomePage = () => {
  return (
    <>
      <div>
        <h2>Study <span>smarter.</span></h2>
        <h1>Clever<span>Cards</span></h1>
        <button><Link to="/sets">Get Started</Link></button>
      </div>
    </>
  )
    
}

export default HomePage;