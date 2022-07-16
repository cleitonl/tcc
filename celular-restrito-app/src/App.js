import {createStackNavigator, createAppContainer} from 'react-navigation';
import ConsultaCelular from './screens/ConsultaCelular';

const MainNavigator = createStackNavigator({
  ConsultaCelular: ConsultaCelular,
});

const App = createAppContainer(MainNavigator);

export default App;