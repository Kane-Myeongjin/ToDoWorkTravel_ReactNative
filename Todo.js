import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { theme } from "./color";
import { styles } from "./style";
import { useState } from "react";

export default function Todo(props) {
    const { toDo, checkToDo, editToDo, deleteToDo, index } = props;
    const [edit, setEdit] = useState(false);
    const [text, setText] = useState(toDo.text);

    const onChangeText = (payload) => setText(payload);

    const onSubmitEditing = (key) => {
        editToDo(key, text);
        setEdit(false);
    };

    return (
        <View style={styles.toDo} key={index}>
            {toDo.done === false ? (
                <View style={styles.doing}>
                    <TouchableOpacity
                        style={styles.check}
                        onPress={() => {
                            checkToDo(index);
                        }}
                    >
                        <Fontisto
                            name="checkbox-passive"
                            size={16}
                            color="white"
                        />
                    </TouchableOpacity>
                    {edit === true ? (
                        <TextInput
                            value={text}
                            style={styles.editText}
                            autoFocus
                            returnKeyType="done"
                            onChangeText={onChangeText}
                            onEndEditing={() => onSubmitEditing(index)}
                            onSubmitEditing={() => onSubmitEditing(index)}
                        />
                    ) : (
                        <Text style={styles.doingText}>{toDo.text}</Text>
                    )}
                </View>
            ) : (
                <View style={styles.done}>
                    <TouchableOpacity
                        style={styles.check}
                        onPress={() => checkToDo(index)}
                    >
                        <Fontisto
                            name="checkbox-active"
                            size={16}
                            color={theme.todoBg}
                        />
                    </TouchableOpacity>
                    <Text style={styles.doneText}>{toDo.text}</Text>
                </View>
            )}
            <View style={styles.icons}>
                {toDo.done === false && (
                    <TouchableOpacity
                        onPress={() => setEdit(true)}
                        style={styles.edit}
                    >
                        <Feather name="edit" size={16} color="white" />
                    </TouchableOpacity>
                )}
                <TouchableOpacity onPress={() => deleteToDo(index)}>
                    <Fontisto name="trash" size={16} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
}
