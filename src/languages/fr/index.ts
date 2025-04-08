
import general from './general';
import navigation from './navigation';
import buttons from './buttons';
import forms from './forms';
import messages from './messages';
import profile from './profile';
import map from './map';
import pages from './pages';
import generic from './generic';

// Combine all translations into a single object
const fr = {
  ...general,
  ...navigation,
  ...buttons,
  ...forms,
  ...messages,
  ...profile,
  ...map,
  ...pages,
  ...generic
};

export default fr;
