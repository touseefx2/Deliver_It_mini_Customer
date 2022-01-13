import { observer } from 'mobx-react';
import React, { useState } from 'react';
import {
  SafeAreaView,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
  StatusBar,
  FlatList
} from 'react-native';
import styles from './styles';
import Slider from 'react-native-slider'
import LinearGradient from 'react-native-linear-gradient'
import { Picker } from '@react-native-picker/picker';
const CustomFilter = observer(({ parentComponentId }) => {

  const [price, setPrice] = React.useState(0)
  const [year, setYear] = React.useState(0)
  const [engine, setEngine] = React.useState(0)
  const [selectedPickup, setSelectedPickup] = useState('');
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [minYear, setMinYear] = useState('')
  const [maxYear, setMaxYear] = useState('')
  const [minEngine, setMinEngine] = useState('')
  const [maxEngine, setMaxEngine] = useState('')
  const [transmission, setTransmission] = useState('')
  const [c, setC] = useState(false);
  const applyFilter = () => {

  }
  const [featureList, setFeatureList] = useState([
    { name: 'ABS', added: false }
    , { name: 'Air Bags', added: false }
    , { name: 'Air Conditioning', added: false }
    , { name: 'Cruise Control', added: false }
    , { name: 'Keyless Entry', added: false }
    , { name: 'Moon Roof', added: false }
    , { name: 'Sun Roof', added: false }
    , { name: 'Power Steering', added: false }
    , { name: 'Power Windows', added: false }
    , { name: 'Music System', added: false }
    , { name: 'Power Mirrors', added: false }
    , { name: 'Manual Transmission', added: false }
    , { name: 'Automatic Transmission', added: false }
    , { name: 'Navigation System', added: false }
  ]);
  const Add = (index) => {
    let temp = []
    temp = featureList
    temp[index].added = true
    // addedFeatures.push(temp[index.name])
    setFeatureList(temp)
    setC(!c)
  }
  const Remove = (index) => {
    console.log(index)
    let temp = []
    temp = featureList
    temp[index].added = false
    setFeatureList(temp)
    setC(!c)
  }
  return (

    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        animated={true}
        barStyle="light-content"
        backgroundColor={styles.Status.backgroundColor} />
      <LinearGradient colors={['#0e47a1', '#002171']} style={styles.Header}>
        <Text style={styles.HeaderText}>Filters</Text>
      </LinearGradient>
      <ScrollView>
        <View style={styles.Body}>
          {/* <Text style={styles.Heading}>Pickup Point</Text> */}
          {/* <TextInput placeholder='Search' style={styles.Search} /> */}
          {/* <View style={styles.Search}>
            <Picker
              style={styles.Picker}
              selectedValue={selectedPickup}
              onValueChange={(itemValue, itemIndex) => {
                setSelectedPickup(itemValue);
              }
              }>

              <Picker.Item label="PSO, Kashmir Highway" value="PSO, Kashmir Highway" />
              <Picker.Item label="Attock, H-8" value="Attock, H-8" />
              <Picker.Item label="PSO, Faqir Api Road" value="PSO, Faqir Api Road" />
              <Picker.Item label="PSO, I-10" value="PSO, I-10" />
              <Picker.Item label="Attock, Faqir Api Road" value="Attock, Faqir Api Road" />
              <Picker.Item label="PSO, I-9" value="PSO, I-9" />
              <Picker.Item label="Total, I-9" value="PSO, I-9" />
              <Picker.Item label="Shell, G-10" value="Shell, G-10" />
              <Picker.Item label="PSO, Blue Area" value="PSO, Blue Area" />
            </Picker>
          </View> */}
          <Text style={styles.Heading}>Price Range</Text>
          <View style={styles.Price}>
            <TextInput style={styles.MinMax} placeholder='Min' onChangeText={(val) => setMinPrice(val)} keyboardType='numeric' />
            <Text style={styles.MidText}>to</Text>
            <TextInput style={styles.MinMax} placeholder='Max' onChangeText={(val) => setMaxPrice(val)} keyboardType='numeric' />
          </View>
          {/* <Slider
            value={price}
            minimumValue={0}
            maximumValue={50000}
            step={100}
            minimumTrackTintColor={'#0E47A1'}
            thumbStyle={{ backgroundColor: '#0E47A1' }}
            onValueChange={(value) => setPrice(value)} /> */}

          <Text style={styles.Heading}>Model Year</Text>
          <View style={styles.Price}>
            <TextInput style={styles.MinMax} placeholder='Min' onChangeText={(val) => setMinYear(val)} keyboardType='numeric' />
            <Text style={styles.MidText}>to</Text>
            <TextInput style={styles.MinMax} placeholder='Max' onChangeText={(val) => setMaxYear(val)} keyboardType='numeric' />
          </View>
          {/* <Slider
            value={year}
            minimumValue={0}
            maximumValue={50000}
            step={100}
            minimumTrackTintColor={'#0E47A1'}
            thumbStyle={{ backgroundColor: '#0E47A1' }}
            onValueChange={(value) => setYear(value)} /> */}

          <Text style={styles.Heading}>Engine Capacity (CC)</Text>
          <View style={styles.Price}>
            <TextInput style={styles.MinMax} placeholder='Min' onChangeText={(val) => setMinEngine(val)} keyboardType='numeric' />
            <Text style={styles.MidText}>to</Text>
            <TextInput style={styles.MinMax} placeholder='Max' onChangeText={(val) => setMaxEngine(val)} keyboardType='numeric' />
          </View>
          {/* <Slider
            value={engine}
            minimumValue={0}
            maximumValue={50000}
            step={100}
            minimumTrackTintColor={'#0E47A1'}
            thumbStyle={{ backgroundColor: '#0E47A1' }}
            onValueChange={(value) => setEngine(value)} /> */}
          <Text style={styles.Heading}>Transmission</Text>
          <View style={styles.Price}>
            <Text style={styles.ButtonLeft}>Automatic</Text>
            <Text style={styles.ButtonRight}>Manual</Text>
          </View>

          <Text style={styles.Heading}>Features</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}> 
            <FlatList
              data={featureList}
              numColumns={2}
              renderItem={({ item, index }) =>
                <TouchableOpacity onPress={item.added ? (() => Remove(index)) : (() => Add(index))}>
                  <View style={item.added ? (styles.AddedFeaturesView) : (styles.FeaturesView)}>
                    <Text style={item.added ? (styles.AddedFeatures) : (styles.Features)} >{item.name}</Text>
                  </View>
                </TouchableOpacity>

              }
              keyExtractor={(item, index) => index.toString()}
            />
          </ScrollView>
          {/* <View style={styles.Price}>
            <Text style={styles.Features}>ABS</Text>
            <Text style={styles.Features}>Air Bags</Text>
          </View>
          <View style={styles.Price}>
            <Text style={styles.Features}>Air Conditioning</Text>
          </View>
          <View style={styles.Price}>
            <Text style={styles.Features}>Cruise Control</Text>
            <Text style={styles.Features}>Keyless Entry</Text>
          </View> */}
          <TouchableOpacity onPress={applyFilter}>
            <LinearGradient colors={['#0e47a1', '#002171']} style={styles.Button}>
              <Text style={styles.buttonText}>Apply</Text>
            </LinearGradient>
          </TouchableOpacity>

        </View>

      </ScrollView>
    </SafeAreaView>
  );
});


export default CustomFilter;
