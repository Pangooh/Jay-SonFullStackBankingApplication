function Login(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');    

  return (
    <Card
      bgcolor="secondary"
      header="Login"
      status={status}
      body={show ? 
        <LoginForm setShow={setShow} setStatus={setStatus}/> :
        <LoginMsg setShow={setShow} setStatus={setStatus}/>}
    />
  ) 
}

function LoginMsg(props){
  return(<>
    <h5>Success</h5>
  </>);
}

function LoginForm(props){
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');

  const ctx = React.useContext(UserContext)
  const EmailInput     = document.getElementById('EmailInput');
  const PasswordInput  = document.getElementById('PasswordInput');

  function handle() {
    firebase.auth().signInWithEmailAndPassword(
      EmailInput.value,
      PasswordInput.value
    )
    .then((user) => { 
      props.setShow(false);
      props.setStatus(true);
      ctx.user.email = EmailInput.value;
    })
    .catch((e) => console.log(e.message));
  }

  function handleGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    firebase.auth().signInWithPopup(provider)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        const user = result.user;
        console.log(user);
        props.setShow(false);
        props.setStatus(true);
        ctx.user.email = user.email;
        console.log(ctx);
        // check if user exists in mongodb
        fetch(`/account/findOne/${user.email}`)
          .then(response => response.text())
          .then(text => {
              try {
                const data = JSON.parse(text);
                //console.log('JSON:', data);
              } catch(err) {
                // if not, create new user in mongodb
                //console.log('err:', text);
                var user = firebase.auth().currentUser;
                var displayName = user.displayName; 
                var userEmail = user.email; 
                var uid = user.uid; 
                // mongodb
                const url = `/account/create/${displayName}/${userEmail}/${uid}`;
                (async () => {
                    var res  = await fetch(url);
                    var data = await res.json();    
                    console.log(data);        
                })();
              }
          });
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        const email = error.email;
    });
  }

  return (<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      id = "EmailInput"
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    Password<br/>
    <input type="password" 
      className="form-control"
      id = "PasswordInput" 
      placeholder="Enter password" 
      value={password} 
      onChange={e => setPassword(e.currentTarget.value)}/><br/>

    <button type="submit" className="btn btn-light" onClick={handle}>Login</button>
    <button id = "googleButton" className="btn btn-light" onClick={handleGoogle}>Google Login</button>
    
   
  </>);
}