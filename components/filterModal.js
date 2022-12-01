import React, { useState } from "react";
import { Text, View, FlatList } from "react-native";
import { Button, CheckBox } from "react-native-elements";
import styles from './styles'
import { bookStoreData } from "./storeBooks";
import { useNavigation } from "@react-navigation/native";

const FilterModal = () => {
  const navigation = useNavigation();
  const genres = ["Mystery", "Children", "Young Adult", "Popular", "Fantasy"]; //placeholder categories
  const [checkedState, setCheckedState] = useState(new Array(genres.length).fill(false));
  const [filteredList, setFilteredList] = useState([]);

  const filterList = (cat, position) => {
    let newData = bookStoreData.filter((book) => book.category == cat);
    let checkedData = filteredList.filter((book) => book.category !== cat); //remove the genre from the filtered list when unchecked

    const updatedCheckedState = checkedState.map((item, index) => //update each individual checkbox checked state when pressed
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);

    !checkedState[position] ? 
    setFilteredList(filteredList => [...filteredList, ...newData]) : setFilteredList(checkedData);
  };


  const reset = () => {
    const updatedCheckedState = new Array(checkedState.length).fill(false);
    setCheckedState(updatedCheckedState);
    setFilteredList([]);
    console.log(filteredList);
  }

  return (
    <View style={styles.bookPreviewContainer}>
      <Text>Genre</Text>

      <Text>
      {genres.map((g, i) => {
        return(
        <CheckBox 
        title={g}
        checked={checkedState[i]}
        onPress={() => filterList(g, i)} />
      )})}

      </Text>

      <Button 
      title= "Apply Filter"
      onPress={() => navigation.navigate('Store', {filteredData: filteredList})}></Button>

      <Button title="Reset" onPress={()=> reset() }/>
    </View>
  );
};

export default FilterModal;