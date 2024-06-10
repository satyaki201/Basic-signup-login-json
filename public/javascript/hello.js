var counter=1;
var form_fill=document.getElementById("form-fill-up");
form_fill.style.display="none";
var signup=document.getElementById("login-credential");
signup.style.display="none";
document.getElementById("dynamic").addEventListener('mouseover',function(){
    if(counter==1)
    {
    var clickeventcounter=0;
    const parentDiv = document.createElement('div');
    parentDiv.id="contains_button";
    document.body.append(parentDiv);
    const dynamicbutton = document.createElement('button');
    dynamicbutton.id="dbutton";
    dynamicbutton.textContent="button";
    document.getElementById("contains_button").appendChild(dynamicbutton);

    document.getElementById("dbutton").addEventListener('click',function(){
        clickeventcounter++;
        console.log(clickeventcounter);
        if(clickeventcounter%2==0)
        {const parentDiv =document.getElementById('dynamic');
        if (parentDiv) {parentDiv.style.display="none";
            //parentDiv.remove();  // Correct method to remove the element
        }}
        else
        {const parentDiv =document.getElementById('dynamic');
            parentDiv.style.display="block";
            parentDiv.innerHTML="Changed Bitchi";  // Correct method to remove the element
        }
    });
    counter++;
} 
});
document.getElementById("login").addEventListener('click',function()
{
    form_fill.style.display="block";
    signup.style.display="none";
});
document.getElementById("signup").addEventListener('click',function()
{
    form_fill.style.display="none";
    signup.style.display="block";
})
document.getElementById("sub").addEventListener('click',function(event){
event.preventDefault();
var nameval=document.getElementById("name").value;
var mailval=document.getElementById("mail").value;
var password=document.getElementById("password").value;
if(nameval.trim()!="" && mailval.trim()!="" && password.trim()!="")
{
var data = {
    name: nameval,
    mail: mailval,
    pass:password
};

fetch('/submit-form', {
    method: 'POST',
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
})
.then(function(response){
    return response
  })
  .then(function(data) {
    console.log(data)
  })
  .catch(error => console.error('Error:', error));}
else
alert("Something are invalid Please Check before Entering values");
});

document.getElementById("sub2").addEventListener('click',function(e){
    e.preventDefault();
    var mail=document.getElementById('mail-signup').value;
    var password=document.getElementById('password-signup').value;
    if(mail.trim()!="" && password.trim()!="")
    {
        data={
            mail:mail,
            password:password
    };
    fetch('/check-existence',{method: 'POST',
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
    })
    .then(function(response){
    return response;
    })
    .then(function(data) {
        console.log(data)
      })
      .catch(error => console.error('Error:', error));
    }
    else
    alert("Hatt be Halkatt");
})



