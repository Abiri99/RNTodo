import { View, Text, StyleSheet, ViewStyle } from "react-native"
import Todo from "../model/todo"

type TodoListItemProps = {
    data: Todo
    index: number
    style: ViewStyle
}

const TodoListItem = (props: TodoListItemProps) => (
    <View style={props.style}>
        <View style={styles.container}>
            <Text style={styles.title}>{props.data.title + ' - index in list: ' + props.index}</Text>
        </View>
    </View>
)

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 6,
        width: '100%',
        height: 'auto',
        paddingHorizontal: 12,
        paddingVertical: 16,
    },
    title: {
        fontSize: 16,
        color: 'black'
    }
})

export default TodoListItem
