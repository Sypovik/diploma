import React, { useEffect } from 'react';
import { Button, Text, View } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import koktels from '../data/koktels.json'; // путь к JSON файлу с данными
import { createTable, insertData, fetchData } from '../db/dbService';



export default function DB_test() {
    useEffect(() => {
        createTable();
        insertData();
        fetchData();
      }, []);
    
      // Функция создания таблицы
      
    
      return (
        <View>
          <Text>Database Example</Text>
          <Button title="Fetch Data" onPress={fetchData} />
        </View>
      );
    };