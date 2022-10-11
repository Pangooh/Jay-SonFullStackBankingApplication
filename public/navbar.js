function NavBar(){

  function HandleLogout() {
    firebase.auth().signOut()
      .then (() => {
        let HomeLink = document.getElementById('HomeLink');
        HomeLink.click();
      });
  }

  return(

    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" id="HomeLink" href="#">Jay's Bank</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item" id="CreateLink">
            <a className="nav-link" href="#/CreateAccount/">Create Account</a>
          </li>
          <li className="nav-item" id="LoginLink">
            <a className="nav-link" href="#/login/">Login</a>
          </li>
          <li className="nav-item" id="DepositLink">
            <a className="nav-link" href="#/deposit/">Deposit</a>
          </li>
          <li className="nav-item" id="WithdrawLink">
            <a className="nav-link" href="#/withdraw/">Withdraw</a>
          </li>
          <li className="nav-item" id="BalanceLink">
            <a className="nav-link" href="#/balance/">Balance</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#/alldata/">AllData</a>
          </li>
          <li className="nav-item" id="LogoutLink" style={{display: 'none'}}>
              <a className="nav-link cursor-pointer fw-bold" onClick={HandleLogout}>Log Out</a>
          </li>       
        </ul>
      </div>
      <div className="float-end">
        <span className="fw-bold mt-1 text-black" id="LoginStatus">Not Logged In</span>
      </div>

    </nav>

  );
}