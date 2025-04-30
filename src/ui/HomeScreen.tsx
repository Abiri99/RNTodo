import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import TodoListItem from './TodoListItem';
import {todosSelector} from '../state/todosSelectors';
import {useNavigation} from '@react-navigation/native';
import Todo from '../model/todo';
import {todoCompleted, todoInCompleted, todoRemoved} from '../state/todosSlice';

function HomeScreen() {
  const navigation = useNavigation();
  const todos = useSelector(todosSelector);
  const dispatch = useDispatch();

  const onAddTodoButtonPress = () => {
    navigation.navigate('AddTodo');
  };

  const addTodoButton = (
    <View style={styles.addTodoButton}>
      <Button title="Add Todo!" onPress={onAddTodoButtonPress} />
    </View>
  );

  const onTodoPress = (todo: Todo) => {
    if (todo.isCompleted) {
      dispatch(
        todoInCompleted({
          todo: todo,
        }),
      );
    } else {
      dispatch(
        todoCompleted({
          todo: todo,
        }),
      );
    }
  };

  const onTodoLongPress = (todo: Todo) => {
    dispatch(
      todoRemoved({
        todo: todo,
      }),
    );
  };

  if (todos.length == 0) {
    return <View style={styles.noTodosContainer}>{addTodoButton}</View>;
  } else {
    return (
      <FlatList
        data={todos}
        renderItem={({item, index, separators}) => {
          return (
            <TouchableOpacity
              onPress={() => onTodoPress(item)}
              onLongPress={() => {
                onTodoLongPress(item);
              }}>
              <TodoListItem
                data={item}
                index={index}
                style={styles.todoListItem}
              />
            </TouchableOpacity>
          );
        }}
        ListHeaderComponent={addTodoButton}
      />
    );
  }
}

const styles = StyleSheet.create({
  todoListItem: {
    marginVertical: 4,
    marginHorizontal: 8,
  },
  addTodoButton: {
    margin: 16,
  },
  noTodosContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  noTodosMessage: {
    fontSize: 20,
    fontStyle: 'italic',
    alignSelf: 'center',
    verticalAlign: 'middle',
  },
});

export default HomeScreen;
