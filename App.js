/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {Button} from 'react-native-paper';
import cheerio from 'cheerio';
import _ from 'lodash';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import ProductSearchbar from './src/javascripts/components/ProductSearchbar';
import ProductSearchSubmitButton from './src/javascripts/components/ProductSearchSubmitButton';

const URL = 'https://camelcamelcamel.com/search?sq=avermedia&p=1';

const example = {
  itemName: {
    amazonPrice: undefined,
    thirdPartyNewPrice: undefined,
    thirdParterUsedPrice: undefined
  }
}

const App: () => React$Node = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState({});

  useEffect(() => {
    const results = {};
    async function fetchData(url) {
      const data = await fetch(url);
      const $ = cheerio.load(await data.text());

      const rows = $('.search_results .row')
        .get()
        .map(row => {
          const $names = $(row).find('a[x-camel-place="Search - Title"]').text()
          const $tables = $(row).find('tbody').get().map(tr => {
            const priceObj = {};
            const $priceType = $(tr).find('a[x-camel-place="Search - Price Type"]').text();
            const $price = $(tr).find('.text-right').text();
            console.log('priceType', $priceType);
            console.log('price', $price);
            priceObj[$priceType] = $price;
            // _.merge(results, priceObj);
            return priceObj
          })
        });

      console.log('rows', rows);
      return $
    }

    fetchData(URL);
  }, [searchQuery])

  const handleChangeText = query => {
    setSearchQuery(query);
  };
  const handleSearchSubmit = query => {
    console.log('pressed mfer', searchQuery)
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <ProductSearchbar handleChangeText={handleChangeText} searchQuery={searchQuery} />
            </View>
            <View style={styles.sectionContainer}>
              <View style={styles.buttonContainer}>
                <ProductSearchSubmitButton
                  handleSearchSubmit={handleSearchSubmit}
                  placeholder='Submit'
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  buttonContainer: {
    alignItems: 'center'
  }
});

export default App;
