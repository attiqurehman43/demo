import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  Modal,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';

const DATA = [
  {id: 1, text: 'One'},
  {id: 2, text: 'Two'},
  {id: 3, text: 'Three'},
  {id: 4, text: 'Four'},
];

const newData = [
  {id: 5, text: 'Five'},
  {id: 6, text: 'Six'},
  {id: 7, text: 'Seven'},
  {id: 8, text: 'Eight'},
];

const App = () => {
  const [data, setData] = useState(DATA);
  const [isRender, setisRender] = useState(false);
  const [isModalVisible, setisModalVisible] = useState(false);
  const [inputText, setinputText] = useState();
  const [key, setKey] = useState();
  const [editItem, seteditItem] = useState();
  const [add, setadd] = useState(false);
  const [search, setsearch] = useState('');

  // const result = DATA => {
  //   const abc = DATA.reduce((acc, curr) => acc + curr.id, 0);
  //   console.log(abc);
  //   return abc;
  // };
  // result(DATA);

  // Check total number of occurances in array
  const occurances = DATA.reduce((acc, curr) => {
    if (curr in acc) {
      acc[curr] = acc[curr] + 1;
    } else {
      acc[curr] = 1;
    }
    return acc;
  }, {});
  console.log(occurances);

  /*For Loop*/
  // useEffect(() => {
  //   for (let i = 0; i < newData.length; i++) {
  //     DATA.push(newData[i]);
  //   }
  //   console.log(DATA);
  // }, []);

  //While Loop //
  // useEffect(() => {
  //   let i = 0;
  //   while (i < newData.length) {
  //     DATA.push(newData[i]);
  //     i++;
  //   }
  //   console.log(DATA);
  // }, []);

  /* Do while loop */
  useEffect(() => {
    let i = 0;
    do {
      DATA.push(newData[i]);
      i++;
    } while (i < newData.length);
    console.log(DATA);
  }, []);

  const onPressItem = item => {
    setisModalVisible(true);
    setinputText(item.text);
    seteditItem(item.id);
    setadd(false);
  };

  const addElement = item => {
    setisModalVisible(true);
    setinputText(item.text);
    seteditItem(item.id);
    setadd(true);
  };

  const onDelete = id => {
    let filterArray = data.filter(i => i.id != id);
    setData(filterArray);
    setadd(false);
  };

  const renderItem = ({item}) => {
    return (
      <View>
        <TouchableOpacity style={styles.item} onPress={() => onPressItem(item)}>
          <Text style={styles.text}>{item.text}</Text>
          <TouchableOpacity
            style={styles.btnStyle}
            onPress={() => onDelete(item.id)}>
            <Text>Delete</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    );
  };

  // const onEdit = editItem => {
  //   const newData = data.map(item => {
  //     if (item.id == editItem) {
  //       item.text = inputText;
  //       return item;
  //     }
  //     return item;
  //   });
  //   setData(newData);
  //   setisRender(!isRender);
  // };

  /*FUntion of Find*/
  // const onEdit = editItem => {
  //   const abc = data.find(item => item.id == editItem);

  //   abc.text = inputText;

  //   // console.log('pop', abc);
  // };

  /*FUntion of FindIndex*/
  const onEdit = editItem => {
    const abc = data.findIndex(item => item.id == editItem);

    abc.text = inputText;

    let value = data[abc];
    console.log('value', value);
    value.text = inputText;
  };

  const onSave = editItem => {
    let array = [...data];

    array.push({id: key, text: inputText});
    setData(array);

    setisModalVisible(false);
    setadd(true);
  };

  const onPressSaveEdit = () => {
    onEdit(editItem);
    setisModalVisible(false);
  };

  //Filter Data from Array
  let bData = data.filter(i =>
    search.length > 0 ? i.text.toLowerCase().includes(search.toLowerCase()) : i,
  );

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.textInputStyle}
        value={search}
        placeholder="Search Here..."
        autoCapitalize="none"
        autoCorrect={false}
        underlineColorAndroid="transparent"
        onChangeText={text => setsearch(text)}
      />

      <FlatList
        data={bData}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        extraData={isRender}
      />
      <TouchableOpacity onPress={addElement} style={styles.addbtnStyle}>
        <Text>Add Items</Text>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        visible={isModalVisible}
        onRequestClose={() => setisModalVisible(false)}>
        <View style={styles.ModalView}>
          <Text style={styles.text}>Change Text:</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => {
              setinputText(text);
              setKey(Math.floor(Math.random() * text.length));
            }}
            defaultValue={inputText}
            editable={true}
            multiline={false}
            maxLength={200}
          />
          {add ? (
            <TouchableOpacity onPress={onSave} style={styles.touchableSave}>
              <Text>Add Item</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => onPressSaveEdit()}
              style={styles.touchableSave}>
              <Text>Edit & Update</Text>
            </TouchableOpacity>
          )}
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 20,
    paddingVertical: 30,
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 30,
  },
  btnStyle: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#FFF000',
  },
  addbtnStyle: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    borderRadius: 10,
    minWidth: 10,
    minHeight: 50,
    marginBottom: 2,
  },
  textInput: {
    width: '90%',
    height: 70,
    borderColor: 'grey',
    borderWidth: 3,
    fontSize: 25,
    borderRadius: 30,
    paddingLeft: 30,
  },
  textInputStyle: {
    height: 50,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: '#009688',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  ModalView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchableSave: {
    backgroundColor: 'orange',
    paddingHorizontal: 40,
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 40,
    padding: 20,
  },
});

export default App;
