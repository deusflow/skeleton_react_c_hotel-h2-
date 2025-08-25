/**
 * Loginpage how to
 * Her skal I bruge useState til at oprette 2 tilstande: 
 * en til brugernavn/brugernavn-input, og en til password/adgangskode.
 * 
 */

export default function LoginPage() { 


    //en submit handler
    async function onSubmit(e)
    {
        e.preventDefault(); // forhindrer siden i at reloade
        console.log("Login submit");

        try{
            

        }
        


    }catch(error)
    {
        console.log("Login error", error);
    }
    //return en simpelt login form
    return(<div></div>);

}