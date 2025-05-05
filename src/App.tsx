import { Provider } from 'react-redux';
import HomeScreen from './ui/home/HomeScreen';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddTodoScreen from './ui/add_todo/AddTodoScreen';
import configureStore from './state/store';
import rootSaga from './state/sagas';

const store = configureStore([])
store.runSaga(rootSaga)

export type RootState = ReturnType<typeof store.getState>;

const Stack = createNativeStackNavigator({
  initialRouteName: 'Home',
  screens: {
    Home: {
      screen: HomeScreen,
      options: {
        headerShown: false,
      },
    },
    AddTodo: {
      screen: AddTodoScreen,
      options: {
        title: 'Add Todo',
      },
    },
  },
});

const Navigation = createStaticNavigation(Stack);

function App() {
  return (
    <Provider store={store}>
      <Navigation/>
    </Provider>
  );
}

export default App;
