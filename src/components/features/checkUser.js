import {Auth} from 'aws-amplify';

async function checkUser() {
    let user = await Auth.currentAuthenticatedUser();  
    console.log(user);
}