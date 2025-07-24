
addEventListener('DOMContentLoaded' , function (){
    this.document.getElementById('reset').addEventListener('submit' , async function (refresh){
        refresh.preventDefault();
        const email = document.getElementById('email').value;
             const password = document.getElementById('password').value;
             const conformpassword = document.getElementById('conformpassword').value
        
        try{
            
            const response = await axios.put('http://localhost:3000/resetss' , {email,password,conformpassword})

            if(response.data.success){
                document.getElementById('message').innerText = response.data.message ;
                window.location.href = '/login' ;
            }
        }
        catch(err){
            document.getElementById('message').innerText = err.response.data.message || " Some Is error"
        }
    })
})