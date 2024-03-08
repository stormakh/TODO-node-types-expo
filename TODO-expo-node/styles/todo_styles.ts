import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    layout: {
      marginTop: '10%',
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "stretch",
      justifyContent: "center",
    },
    container: {
        flex: 1,
        padding: 10,
      },
      input: {
        borderWidth: 1,
        borderColor: "gray",
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
      },
      user: {
        fontSize: 16,
        fontWeight: "bold",
      },
      todoItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "lightgray",
      },
      todoTitle: {
        fontWeight: "bold",
      },
      buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        height: 'auto',
      },
      homeButton: {
        fontSize: 20,
        fontWeight: "bold",
        color: "blue",
        textAlign: "center",
        position  : "absolute",
        top: -60,
        left: 10,
        backgroundColor: "lightgray",
      },
  });