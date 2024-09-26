import { Link } from 'react-router-dom';

function Menu() {
    return (
    <div role="navigation" className="menu">
        <ul>
            <li><Link to="/">Homepage</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="https://google.com">Google</Link></li>
        </ul>
    </div>
    );
  }
  
  export default Menu;
  