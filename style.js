import { Dimensions, StyleSheet } from "react-native";
import { theme } from "./color";

const { width: SCREEN_WEIGHT, height: SCREEN_HEIGHT } =
    Dimensions.get("window");

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.bg,
        paddingHorizontal: 20,
    },
    header: {
        justifyContent: "space-between",
        flexDirection: "row",
        marginTop: 100,
    },
    btnText: {
        fontSize: 38,
        fontWeight: "600",
    },
    input: {
        backgroundColor: "white",
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 30,
        marginVertical: 20,
        fontSize: 18,
    },
    toDo: {
        backgroundColor: theme.grey,
        marginBottom: 10,
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    doingText: {
        color: "white",
        fontSize: 16,
        fontWeight: "500",
    },
    doing: {
        alignItems: "center",
        flexDirection: "row",
    },
    check: {
        paddingHorizontal: 10,
    },
    done: {
        alignItems: "center",
        flexDirection: "row",
    },
    doneText: {
        textDecorationLine: "line-through",
        color: theme.todoBg,
        fontSize: 16,
        fontWeight: "500",
        paddingLeft: 20,
    },
    icons: {
        flexDirection: "row",
        alignItems: "center",
    },
    edit: {
        paddingHorizontal: 10,
    },
    editText: {
        backgroundColor: "white",
        paddingHorizontal: 50,
        borderRadius: 10,
    },
    scroll: { flex: 0 },
});
