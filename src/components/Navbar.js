import React,{useState} from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'


export default function Navbar() {

  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  
  const closeNavbar = () => {
    setIsNavCollapsed(true);
  }
  const handleNavCollapse = () => {
    setIsNavCollapsed(!isNavCollapsed);
  }
    let location=useLocation();
    const navigate=useNavigate();
    const handleLogOut = ()=>{
      localStorage.removeItem('token');
      navigate('/');
      handleNavCollapse();
    }
   
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary ">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/" onClick={closeNavbar}>iNotebook</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" onClick={handleNavCollapse}>
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/"  onClick={closeNavbar}>Home</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about"  onClick={closeNavbar}>About</Link>
          </li>
        </ul>
        {!localStorage.getItem('token')?<form className="d-flex" role="search">
          <Link className="btn btn-outline-primary mx1" to="/login"  role="button"  onClick={closeNavbar}>Login</Link>
          <Link className="btn btn-outline-primary mx-1" to="/signUp"  role="button"  onClick={closeNavbar}>Sign Up</Link>
        </form>: <button className="btn btn-primary" onClick={handleLogOut}>Log Out</button>}
        
      </div>
    </div>
  </nav>
  )
}
