/* src/App.js */
import React from 'react';
import Amplify from 'aws-amplify';
import awsExports from "../aws-exports";
import { withAuthenticator} from '@aws-amplify/ui-react';
import Header from './features/header'


Amplify.configure(awsExports);

const App = () => {
    return (
    <div>
      <Header />
    </div>
  )
}

export default withAuthenticator(App)
