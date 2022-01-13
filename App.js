import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
    Text,
    TouchableOpacity,
    View,
    TextInput,
    ScrollView,
    Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { theme } from "./color";
import { styles } from "./style";
import Todo from "./Todo";

const STORAGE_KEY = "@toDos";
const TYPE_KEY = "@toDoTypes";

export default function App() {
    const [working, setWorking] = useState(true);
    const [text, setText] = useState("");
    const [toDos, setToDos] = useState({});

    useEffect(() => {
        loadType();
        loadTodos();
    }, []);

    useEffect(() => {
        saveType(working);
    }, [working]);

    const travel = () => setWorking(false);
    const work = () => setWorking(true);
    const onChangeText = (payload) => setText(payload);

    const saveType = async (working) => {
        try {
            await AsyncStorage.setItem(TYPE_KEY, working.toString());
        } catch (e) {
            console.error("AsyncStorage Save Error", e);
        }
    };

    const loadType = async () => {
        try {
            const value = await AsyncStorage.getItem(TYPE_KEY);
            value != null ? setWorking(value === "true") : null;
        } catch (e) {
            console.error("AsyncStorage Load Error", e);
        }
    };

    const saveTodos = async (toSave) => {
        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
        } catch (e) {
            console.error("AsyncStorage Save Error", e);
        }
    };

    const loadTodos = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
            jsonValue != null ? setToDos(JSON.parse(jsonValue)) : null;
        } catch (e) {
            console.error("AsyncStorage Load Error", e);
        }
    };

    const addToDo = async () => {
        if (text === "") {
            return;
        }

        const newToDos = {
            ...toDos,
            [Date.now()]: { text, working, done: false },
        };

        setToDos(newToDos);
        await saveTodos(newToDos);
        setText("");
    };

    const deleteToDo = (key) => {
        Alert.alert("Delete To Do", "Are you sure?", [
            { text: "Cancel" },
            {
                text: "Delete",
                onPress: () => {
                    const newToDos = { ...toDos };
                    delete newToDos[key];
                    setToDos(newToDos);
                    saveTodos(newToDos);
                },
            },
        ]);
    };

    const checkToDo = async (key) => {
        const newToDos = { ...toDos };

        newToDos[key].done = !newToDos[key].done;

        setToDos(newToDos);
        await saveTodos(newToDos);
    };

    const editToDo = async (key, text) => {
        const newToDos = { ...toDos };

        newToDos[key].text = text;

        setToDos(newToDos);
        await saveTodos(newToDos);
    };

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.header}>
                <TouchableOpacity onPress={work}>
                    <Text
                        style={{
                            ...styles.btnText,
                            color: working ? "white" : theme.grey,
                        }}
                    >
                        Work
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={travel}>
                    <Text
                        style={{
                            ...styles.btnText,
                            color: !working ? "white" : theme.grey,
                        }}
                    >
                        Travel
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.body}>
                <TextInput
                    placeholder={
                        working
                            ? "What do you have to do"
                            : "Where do you want to go"
                    }
                    value={text}
                    style={styles.input}
                    returnKeyType="done"
                    onChangeText={onChangeText}
                    onSubmitEditing={addToDo}
                />
                <View style={styles.scroll}>
                    <ScrollView>
                        {Object.keys(toDos).map((key) =>
                            toDos[key].working === working ? (
                                <Todo
                                    key={key}
                                    index={key}
                                    toDo={toDos[key]}
                                    editToDo={editToDo}
                                    deleteToDo={deleteToDo}
                                    checkToDo={checkToDo}
                                />
                            ) : null
                        )}
                    </ScrollView>
                </View>
            </View>
        </View>
    );
}
