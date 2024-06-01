import React, { useState, useEffect } from 'react';
import { Text, TextInput, View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { updateCocktail, openDatabaseKocktails } from '../db/dbService';

const db = openDatabaseKocktails();

export default function EditCocktail({ route, navigation }) {
  const { cocktailId } = route.params;
  const [cocktail, setCocktail] = useState(null);
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    fetchCocktail();
    navigation.setOptions({
      headerTitle: 'Редактирование',
      headerTitleAlign: 'center', // Выровнять название topBar посередине
    });
  }, []);

  const fetchCocktail = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM Cocktails WHERE id = ?', [cocktailId], (tx, results) => {
        if (results.rows.length > 0) {
          const row = results.rows.item(0);
          setCocktail(row);
          setName(row.name);
          setImage(row.image);
          setDescription(row.description);

          tx.executeSql('SELECT * FROM Ingredients WHERE cocktail_id = ?', [cocktailId], (tx, results) => {
            const ingredientsArray = [];
            for (let i = 0; i < results.rows.length; i++) {
              ingredientsArray.push(results.rows.item(i));
            }
            setIngredients(ingredientsArray);
          });
        }
      });
    });
  };

  const handleSave = () => {
    const updatedCocktail = {
      name,
      image,
      description,
      ingredients
    };
    updateCocktail(cocktailId, updatedCocktail);
    navigation.goBack();
  };

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', amt: '' }]);
  };

  const removeIngredient = (index) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        {/* <TextInput
          style={styles.input}
          placeholder="Image"
          value={image}
          onChangeText={setImage}
        /> */}
        <TextInput
          style={styles.textArea}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          multiline={true}
          numberOfLines={4}
        />
        {ingredients.map((ingredient, index) => (
          <View key={index} style={styles.ingredientContainer}>
            <TextInput
              style={styles.input}
              placeholder="Ingredient Name"
              value={ingredient.name}
              onChangeText={(value) => handleIngredientChange(index, 'name', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Amount"
              value={ingredient.amt}
              onChangeText={(value) => handleIngredientChange(index, 'amt', value)}
            />
            <TouchableOpacity style={styles.removeButton} onPress={() => removeIngredient(index)}>
              <Text style={styles.removeButtonText}>Удалить</Text>
            </TouchableOpacity>
          </View>
        ))}
        <TouchableOpacity style={styles.addButton} onPress={addIngredient}>
          <Text style={styles.addButtonText}>Добавить ингредиент</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.addButtonText}>Сохранить</Text>
        </TouchableOpacity>

        {/* <Button title="Удалить" onPress={handleSave} /> */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
  form: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 15,
    marginBottom: 10,
    fontSize: 18,
  },
  textArea: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 15,
    marginBottom: 10,
    fontSize: 18,
    height: 200, // Increased height for multiline input
    textAlignVertical: 'top', // Ensure text starts at the top-left corner
  },
  ingredientContainer: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  addButton: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4caf50',
    borderRadius: 5,
    marginVertical: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  removeButton: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff4d4d',
    borderRadius: 5,
    marginTop: 10,
  },

  saveButton: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2196f3',
    borderRadius: 5,
    marginVertical: 10,
  },

  removeButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});