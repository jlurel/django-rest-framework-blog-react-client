import { Link } from 'react-router-dom';
import { FaQuestionCircle } from 'react-icons/fa';

const PageNotFound = () => (
  <div className="flex flex-col items-center">
    <div className="flex items-center mb-5">
      <p className="text-9xl">4</p>
      <FaQuestionCircle className="text-8xl text-red-300 align-middle animate-bounce" />
      <p className="text-9xl">4</p>
    </div>
    <div className="text-xl text-center w-[600px]">
      Maybe this page moved? Got deleted? Is hiding out in quarantine? Never existed in the first
      place?
      <p className="my-5">
        {`Let's go 
        ${(
          <Link to="/" className="text-red-600">
            home
          </Link>
        )}
        and try from there.`}
      </p>
    </div>
  </div>
);

export default PageNotFound;
