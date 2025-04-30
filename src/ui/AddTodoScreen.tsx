import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {StyleSheet, TextInput, View, Button} from 'react-native';
import {todoAdded} from '../state/todosSlice';
import {useDispatch, useSelector} from 'react-redux';
import {todosSelector} from '../state/todosSelectors';

function AddTodoScreen() {
  const navigation = useNavigation();

  const todos = useSelector(todosSelector);
  const dispatch = useDispatch();

  const [title, onTitleChange] = useState('');

  const onAddPress = () => {
    let id: number;
    if (todos.length == 0) {
      id = 1;
    } else {
      id = todos[todos.length - 1].id + 1;
    }
    dispatch(
      todoAdded({
        todo: {
          id: id,
          title: title.trim(),
          isCompleted: false,
        },
      }),
    );
    navigation.goBack();
  };

  return (
    <View>
      <TextInput
        value={title}
        onChangeText={text => {
          onTitleChange(text);
        }}
        keyboardType="default"
        placeholder="Title"
        style={styles.titleInput}
      />

      <Button 
        title="Add" onPress={onAddPress}
        disabled={title.trim() === ''} />
    </View>
  );
}

const styles = StyleSheet.create({
  titleInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderColor: 'grey',
    padding: 10,
    borderRadius: 8,
  },
});

export default AddTodoScreen;
