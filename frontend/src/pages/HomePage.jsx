import { Link } from 'react-router-dom';
import '../css/App.css'
import PrimaryButton from '../components/buttons/PrimaryButton';

const HomePage = () => {
  return (
    <>
      <div className='flex flex-col pt-2 mt-5 justify-center items-center'>
        <h1 className='font-semibold text-2xl'>Study 
          <span className=''> smarter.</span>
        </h1>
        <h1 className='my-5 px-6 pt-4 pb-8 text-8xl font-bold rounded-2xl'>Cognize</h1>
        <Link to="/sets">
          <PrimaryButton type="button" text="Get Started"></PrimaryButton>
        </Link>
      </div>
    </>
  )
    
}

export default HomePage;