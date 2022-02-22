import "./header.css";

function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <img
            src="https://www.freeiconspng.com/uploads/github-circle-mascot-git-icon-6.png"
            alt="git octopus"
          />
        </div>
        <nav className="navbar">
          <h1>The Git API Searcher</h1>
          <div className="links">
            <a href="/">Home</a>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
