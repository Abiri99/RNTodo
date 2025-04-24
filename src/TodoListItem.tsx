import { View, Text } from "react-native"

type TodoListItemProps = {
    data: Todo
    index: number
}

const TodoListItem = (props: TodoListItemProps) => (
    <View>
        <Text>{props.data.title + ' - index in list: ' + props.index}</Text>
    </View>
)

export default TodoListItem
