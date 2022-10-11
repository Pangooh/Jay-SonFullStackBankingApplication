function CreateAccount(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');

  return (
    <Card
      bgcolor="secondary"
      header="Create Account"
      status={status}
      body={show ? 
        <CreateForm setShow={setShow}/> : 
        <CreateMsg setShow={setShow}/>}
    />
  )
}

function CreateMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => props.setShow(true)}>Add another account</button>
  </>);
}

function CreateForm(props){
  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');

  const ctx = React.useContext(UserContext);  

  function handle(){
    const EmailInput    = document.getElementById('EmailInput');
    const PasswordInput = document.getElementById('PasswordInput');

    firebase.auth().createUserWithEmailAndPassword(
      EmailInput.value,
      PasswordInput.value
    )
    .then((user) => { 
      var user = firebase.auth().currentUser;
      
      ctx.user.email = EmailInput.value;

      var uid = user.uid; 
      const url = `/account/create/${name}/${email}/${uid}`;
      (async () => {
          var res  = await fetch(url);
          var data = await res.json();    
          console.log(data);        
      })();
      props.setShow(false);
    }, function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log('Error: ' + errorCode + ' ' + errorMessage);   
    });
  
  }    

  return (<>

    Name<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter name" 
      value={name} 
      onChange={e => setName(e.currentTarget.value)} /><br/>

    Email address<br/>
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

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>Create Account</button>

  </>);
}