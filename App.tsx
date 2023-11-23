import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Alert, FlatList, Keyboard, Pressable, SafeAreaView, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { THEME } from './src/styles/theme';
import { Header } from './src/components/Header';
import { Circle, CheckCircle, PlusCircle, ClipboardText, Trash } from 'phosphor-react-native';
import { useState } from 'react';
import { useFonts } from 'expo-font';
import { Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter'

type Todo = {
  id: number;
  content: string;
  done: boolean;
  isPressed: boolean;
};

export default function App() {
  const [fontsLoaded] = useFonts({ Inter_400Regular, Inter_700Bold });
  const [todoContent, setTodoContent] = useState('');
  const [todoList, setTodoList] = useState<Todo[]>([]);
  
  function onAddTodo() {
    if (!todoContent) return;

    Keyboard.dismiss();

    const newTodo: Todo = {
      id: todoList.length > 0 ? todoList[0].id + 1 : 1,
      content: todoContent,
      done: false,
      isPressed: false
    };

    setTodoList([newTodo, ...todoList]);

    setTodoContent('');
  }

  function toggleDone(id: number) {
    const updatedTodoList = todoList.map(todo => todo.id === id ? { ...todo, done: !todo.done } : { ...todo });
    setTodoList(updatedTodoList);
  }

  function togglePressed(id: number, status: boolean) {
    const updatedTodoList = todoList.map(todo => todo.id === id ? { ...todo, isPressed: status } : { ...todo });
    setTodoList(updatedTodoList);
  }

  function onRemoveTodo(id: number) {
    togglePressed(id, true);
    Alert.alert('Atenção!', 'Tem certeza que deseja remover este todo?', [
      {
        text: 'Sim',
        style: 'destructive',
        onPress: () => {
          togglePressed(id, false);
          setTodoList((prev) => prev.filter(todo => todo.id !== id));
        }
      },
      {
        text: 'Não',
        style: 'cancel',
        isPreferred: true,
        onPress: () => {
          togglePressed(id, false);
        },
      }
    ]);
  }

  if (!fontsLoaded) {
    return (
      <ActivityIndicator />
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: THEME.COLORS.BASE.GRAY_700 }}>
      <StatusBar 
        style="light"
        backgroundColor="transparent"
        translucent
      />
      <View style={{ flex: 1 }}>
        <Header />
        <View style={{
          height: '100%',
          backgroundColor: THEME.COLORS.BASE.GRAY_600,
          paddingHorizontal: 24
        }}>
          <View style={{ marginTop: -30, flexDirection: 'row', gap: 4  }}>
            <TextInput 
              style={{
                flex: 1, 
                backgroundColor: THEME.COLORS.BASE.GRAY_500,
                borderColor: todoContent ? THEME.COLORS.PRODUCT.PURPLE_DARK : THEME.COLORS.BASE.GRAY_700,
                borderWidth: 1,
                borderRadius: 6,
                padding: 16,
                fontSize: THEME.FONTS.SIZE.LG,
                color: THEME.COLORS.BASE.GRAY_100,
              }}
              value={todoContent}
              onChangeText={setTodoContent}
              placeholder='Adicione uma nova tarefa'
              placeholderTextColor={THEME.COLORS.BASE.GRAY_300}
            />
            <Pressable
              style={({ pressed }) => [{ 
                backgroundColor: pressed ? THEME.COLORS.PRODUCT.BLUE : THEME.COLORS.PRODUCT.BLUE_DARK,
                borderRadius: 6,
                padding: 18,
                }]
              }

              onPress={onAddTodo}
            >
              <PlusCircle color={THEME.COLORS.BASE.GRAY_100 }/>
            </Pressable>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 24,
              marginBottom: 20
            }}
          >
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <Text
                style={{
                  fontSize: THEME.FONTS.SIZE.MD,
                  fontFamily: THEME.FONTS.FAMILY.INTER.BOLD,
                  color: THEME.COLORS.PRODUCT.BLUE
                }}
              >Criadas</Text>
              <View
                style={{
                  backgroundColor: THEME.COLORS.BASE.GRAY_400,
                  paddingHorizontal: 8,
                  paddingVertical: 2,
                  borderRadius: 9999
                }}
              >
                <Text
                style={{
                  fontFamily: THEME.FONTS.FAMILY.INTER.BOLD,
                  fontSize: THEME.FONTS.SIZE.SM,
                  color: THEME.COLORS.BASE.GRAY_200
                }}
              >{todoList.length}</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <Text
                style={{
                  fontSize: THEME.FONTS.SIZE.MD,
                  fontFamily: THEME.FONTS.FAMILY.INTER.BOLD,
                  color: THEME.COLORS.PRODUCT.PURPLE
                }}
              >Concluídas</Text>
              <View
                style={{
                  backgroundColor: THEME.COLORS.BASE.GRAY_400,
                  paddingHorizontal: 8,
                  paddingVertical: 2,
                  borderRadius: 9999
                }}
              >
                <Text
                  style={{
                    fontFamily: THEME.FONTS.FAMILY.INTER.BOLD,
                    fontSize: THEME.FONTS.SIZE.SM,
                    color: THEME.COLORS.BASE.GRAY_200
                  }}
                >{todoList.filter(todo => todo.done).length ?? 0}</Text>
              </View>
            </View>
          </View>

          <FlatList
            data={todoList}
            contentContainerStyle={{
              paddingBottom: 150
            }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index, separators }) => (
              <View
                style={{
                  backgroundColor: THEME.COLORS.BASE.GRAY_500,
                  borderWidth: 1,
                  borderColor: THEME.COLORS.BASE.GRAY_400,
                  borderRadius: 8,
                  padding: 12,
                  marginVertical: 6,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8,
                  height: 64
                }}
              >
                <Pressable onPress={() => toggleDone(item.id)}>
                  { item.done ? <CheckCircle weight='fill' color={THEME.COLORS.PRODUCT.PURPLE} size={22} /> : <Circle color={THEME.COLORS.PRODUCT.BLUE} size={22} />}
                </Pressable>
                <Text
                  numberOfLines={2}
                  style={{
                    color: THEME.COLORS.BASE.GRAY_100,
                    flex: 1
                  }}
                >{item.content} - {item.id}</Text>
                <Pressable
                  style={({ pressed }) => [{ 
                    backgroundColor: pressed ? THEME.COLORS.BASE.GRAY_400 : 'transparent',
                    borderRadius: 6,
                    padding: 18,
                    }]
                  }
                  onPress={() => onRemoveTodo(item.id)}
                >
                  <Trash size={20} color={item.isPressed ? THEME.COLORS.FEEDBACK.DANGER : THEME.COLORS.BASE.GRAY_300} />
                </Pressable>
              </View>
            )}
            ListEmptyComponent={() => (
              <View 
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderTopColor: THEME.COLORS.BASE.GRAY_400,
                  borderTopWidth: 1,
                  paddingHorizontal: 20,
                  paddingVertical: 48
                  }}
                >
                <ClipboardText style={{ marginBottom: 16 }} size={56} color={THEME.COLORS.BASE.GRAY_400} />
                <Text style={{ lineHeight: 25, fontFamily: THEME.FONTS.FAMILY.INTER.BOLD, color: THEME.COLORS.BASE.GRAY_300 }}>Você ainda não tem tarefas cadastradas</Text>
                <Text style={{ color: THEME.COLORS.BASE.GRAY_300 }}>Crie tarefas e organize seus itens a fazer</Text>
              </View>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
