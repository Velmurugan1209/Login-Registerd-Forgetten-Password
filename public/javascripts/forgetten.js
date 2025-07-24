
addEventListener('DOMContentLoaded',function (){
      document.getElementById('forgetten').addEventListener('submit',async function (refresh ){
        refresh.preventDefault();

        
        try{
            const email = document.getElementById('email').value
            const response = await axios.post('/sendlink' , {email})
            if(response.data.success){
                 document.getElementById('message').innerText = response.data.emailmessage       
            }
            else{
              document.getElementById('message').innerText = response.data.emailmessage  
            }

        }
        catch(err){
                 document.getElementById('message').innerText = err.response.data.emailmessage || " Some Is error on Link"
        }

      })

})