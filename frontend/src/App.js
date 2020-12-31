import { BrowserRouter as Router, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import ProfileEditScreen from "./screens/ProfileEditScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen";
import UserProfileScreen from "./screens/UserProfileScreen";
import PostDetailsScreen from "./screens/PostDetailsScreen";
import {
  createMuiTheme,
  responsiveFontSizes,
  MuiThemeProvider,
} from "@material-ui/core";
const App = () => {
  let theme = createMuiTheme();
  theme = responsiveFontSizes(theme);
  return (
    <Router>
      <MuiThemeProvider theme={theme}>
        <Route path="/" exact component={HomeScreen} />
        <Route path="/search/:keyword" exact component={HomeScreen} />
        <Route path="/login" component={LoginScreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route path="/profile" component={ProfileScreen} exact />
        <Route path="/profile/edit" component={ProfileEditScreen} />
        <Route path="/:id/profile" component={UserProfileScreen} exact />
        <Route path="/:id/post" component={PostDetailsScreen} exact />
      </MuiThemeProvider>
    </Router>
  );
};

export default App;
