
addEventListener('DOMContentLoaded' , function (){

    document.getElementById('login').addEventListener('submit' , async function (refresh) {

        refresh.preventDefault() ; 
          

         const email = document.getElementById('email').value ;
            const password = document.getElementById('password').value ; 
         try{
             
            const Loginresponse = await axios.post('http://localhost:3000/login',{email,password})

            if(Loginresponse.data.success){
                console.log(Loginresponse.data.data.success);  
               // document.getElementById('message').innerText = Loginresponse.data.data.email ;
                const msg = encodeURIComponent(Loginresponse.data.data.email) ;
                window.location.href = `/loginsucess?msg=${msg}`;                      
            }
            else{
                        window.location.href = '/registerpage'
            }  
         }
         catch(err){
      
      document.getElementById('message').innerText = err.Loginresponse?.data?.message || "Login Error";
           
         
      
         }       
})

document.getElementById('signupbutton').addEventListener('click',  function (){
        window.location.href = '/registerpage' ;
    })
 document.getElementById('forgetbutton').addEventListener('click', function (){
        window.location.href = '/forgettenpage' ;
    })
  

})



 







