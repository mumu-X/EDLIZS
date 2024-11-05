import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity, Image, ListRenderItem } from 'react-native';
import { useRealm } from '@realm/react';
import { Disease } from '../models/Task';
import ImagePath from '../Constants/ImagePath';

type SearchResult = {
  label: string;
  subtopic: string;
  content: string[];
};

const SearchPage = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const realm = useRealm();

  const handleSearch = (text: string) => {
    setSearchText(text);
    if (text.length > 0) {
      const filteredResults = realm.objects<Disease>('Disease').filtered(
        'ANY SArray.subtopic CONTAINS[c] \$0 OR label CONTAINS[c] \$0 OR ANY SArray.sections.content.text CONTAINS[c] \$0',
        text
      );

      const formattedResults: SearchResult[] = filteredResults.map((disease) => {
        return disease.SArray.map((sArray) => ({
          label: disease.label,
          subtopic: sArray.subtopic,
          content: sArray.sections.flatMap((section) =>
            section.content.map((content) => content.text)
          ),
        }));
      }).flat();

      setResults(formattedResults);
    } else {
      setResults([]);
    }
  };

  const highlightSearchTerm = (text: string) => {
    const regex = new RegExp(`(${searchText})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, index) =>
      part.toLowerCase() === searchText.toLowerCase() ? (
        <Text key={index} style={styles.highlight}>
          {part}
        </Text>
      ) : (
        part
      )
    );
  };

  const renderItem: ListRenderItem<SearchResult> = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.title}>{item.label}</Text>
      <Text style={styles.subtitle}>{item.subtopic}</Text>
      {item.content.slice(0, 3).map((line, index) => (
        <Text key={index} style={styles.content}>
          {highlightSearchTerm(line)}
        </Text>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchText}
          onChangeText={handleSearch}
        />
        <TouchableOpacity>
          <Image source={ImagePath.search} style={{ width: 25, height: 25 }} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={results}
        keyExtractor={(item, index) => `${item.label}-${index}`}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.noResults}>
            Download Offline storage In Top Right of Home Page To Use Search
          </Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    padding: 8,
  },
  itemContainer: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
  },
  content: {
    fontSize: 14,
    color: '#333',
    marginTop: 4,
  },
  highlight: {
    backgroundColor: 'yellow',
  },
  noResults: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#999',
  },
});

export default SearchPage;
