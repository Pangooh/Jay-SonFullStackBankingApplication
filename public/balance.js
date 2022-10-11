function Balance(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  

  return (
    <Card
      bgcolor="secondary"
      header="Balance"
      status={status}
      body={show ?
        <BalanceForm setShow={setShow} setStatus={setStatus}/> :
        <BalanceMsg setShow={setShow} setStatus={setStatus}/>}
    />
  )

}

/* function BalanceMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
        props.setShow(true);
        props.setStatus('');
      }}>
        Check balance again
    </button>
  </>);
} */

function BalanceForm(props){
  const [balance, setBalance] = React.useState(0); 
  const ctx = React.useContext(UserContext);  
  const email = ctx.user.email;

    fetch(`/account/findOne/${email}`)
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            setBalance(data.balance);
        } catch(err) {
            console.log('err:', text);
        }
    });
  

  return (<>

    <h5>Your Remaining Balance is : ${balance}</h5>

  </>);
}