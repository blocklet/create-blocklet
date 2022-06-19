import { Link } from 'react-router-dom';

function About() {
  return (
    <div>
      <h1>
        <Link className="app-link" to="/">
          Back Home
        </Link>
      </h1>
      <h2>Hello, i'm a dapp blocklet</h2>
    </div>
  );
}

export default About;
