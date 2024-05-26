import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, Button, FlatList, TextInput, View } from 'react-native';
import { getDBConnection, createTables, insertUser, getUsers, updateUser, deleteUser } from '../db/dbService';

export default function DB_test() {
  const [db, setDb] = useState(null);
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const initDb = async () => {
      const db = await getDBConnection();
      await createTables(db);
      setDb(db);
      const users = await getUsers(db);
      setUsers(users);
    };
    initDb();
    
    return () => {
      if (db) {
        closeDatabase(db);
      }
    };
  }, []);

  const handleAddUser = async () => {
    if (db && name && age) {
      await insertUser(db, name, age);
      const users = await getUsers(db);
      setUsers(users);
      setName('');
      setAge('');
    }
  };

  const handleUpdateUser = async () => {
    if (db && userId && name && age) {
      await updateUser(db, userId, name, age);
      const users = await getUsers(db);
      setUsers(users);
      setUserId(null);
      setName('');
      setAge('');
    }
  };

  const handleDeleteUser = async (id) => {
    if (db) {
      await deleteUser(db, id);
      const users = await getUsers(db);
      setUsers(users);
    }
  };

  return (
    <SafeAreaView>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
      <Button
        title={userId ? "Update User" : "Add User"}
        onPress={userId ? handleUpdateUser : handleAddUser}
      />
      <FlatList
        data={users}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name} - {item.age}</Text>
            <Button
              title="Edit"
              onPress={() => {
                setUserId(item.id);
                setName(item.name);
                setAge(item.age.toString());
              }}
            />
            <Button
              title="Delete"
              onPress={() => handleDeleteUser(item.id)}
            />
          </View>
        )}
      />
      
    </SafeAreaView>
  );
};

