
import { Text, StyleSheet } from 'react-native';

export default function BigTitle() {
    return (
        <Text style={styles.bigTitle}>Todo List</Text>
    );
    }

const styles = StyleSheet.create({
    bigTitle: {
        fontSize: 40,
        fontWeight: "bold",
        textAlign: "center",
        margin: 10,
    },
});