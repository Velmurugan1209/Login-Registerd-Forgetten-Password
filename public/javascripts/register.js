
addEventListener('DOMContentLoaded' , function (){
    document.getElementById('register').addEventListener('submit' , async function (ref){
       ref.preventDefault();

        const name = document.getElementById('name').value
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value

        try{
            const response = await axios.post('http://localhost:3000/registerpage', {name,email,password} )
            if(response.data.success){
                document.getElementById('Regmessage').innerText = response.data.data.Regmessage
                window.location.href = '/login' ;
            }
        }
        catch(err){
            document.getElementById('Regmessage').innerText = err.response?.data?.Regmessage || "Login Error";
        }
    })
})