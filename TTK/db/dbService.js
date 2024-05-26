import SQLite from 'react-native-sqlite-storage';
import koktels from '../data/koktels.json';

const database_name = "CocktailsDB.db";
const database_version = "1.0";
const database_displayname = "Cocktails Database";
const database_size = 200000;

SQLite.DEBUG(false);
SQLite.enablePromise(false);

// Открытие или создание базы данных
export const openDatabaseKocktails = () => {
  const db = SQLite.openDatabase(
    {
      name: database_name,
      location: 'default',
    },
    () => { console.log('Database opened or created') },
    error => { console.log('Error: ', error) }
  );
    return db;
}
const db = openDatabaseKocktails();

export const createTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS Cocktails (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        image TEXT,
        description TEXT
      );`,
      [],
      () => { console.log('Table created successfully') },
      error => { console.log('Error creating table: ', error) }
    );

    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS Ingredients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cocktail_id INTEGER,
        name TEXT,
        amt TEXT,
        FOREIGN KEY (cocktail_id) REFERENCES Cocktails(id)
      );`,
      [],
      () => { console.log('Table created successfully') },
      error => { console.log('Error creating table: ', error) }
    );
  });
};

// Функция вставки данных из JSON файла
export const insertData = () => {
  db.transaction(tx => {
    koktels.forEach(cocktail => {
      tx.executeSql(
        'INSERT INTO Cocktails (name, image, description) VALUES (?, ?, ?);',
        [cocktail.name, cocktail.image, cocktail.description],
        (tx, results) => {
          const cocktailId = results.insertId;
          cocktail.ingredients.forEach(ingredient => {
            tx.executeSql(
              'INSERT INTO Ingredients (cocktail_id, name, amt) VALUES (?, ?, ?);',
              [cocktailId, ingredient.name, ingredient.amt],
              () => { console.log('Ingredient inserted successfully') },
              error => { console.log('Error inserting ingredient: ', error) }
            );
          });
        },
        error => { console.log('Error inserting cocktail: ', error) }
      );
    });
  });
};

// Функция для получения всех данных из базы данных и вывода их в консоль
export const fetchData = () => {
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM Cocktails', [], (tx, results) => {
      const len = results.rows.length;
      for (let i = 0; i < len; i++) {
        const row = results.rows.item(i);
        console.log('Cocktail: ', row);
        console.log('i: ', i);
        tx.executeSql('SELECT * FROM Ingredients WHERE cocktail_id = ?', [row.id], (tx, results) => {
          const len = results.rows.length;
          for (let j = 0; j < len; j++) {
            const ingredient = results.rows.item(j);
            console.log('Ingredient: ', ingredient);
          }
        });
      }
    });
  });
};


// Функция для подсчета количества таблиц в базе данных
export const getTableCount = (db) => {
  db.transaction(tx => {
    tx.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';",
      [],
      (tx, results) => {
        const tableCount = results.rows.length;
        console.log('Количество таблиц в базе данных:', tableCount);
        for (let i = 0; i < results.rows.length; i++) {
          console.log('Таблица:', results.rows.item(i).name);
        }
      },
      error => {
        console.error('Ошибка при выполнении SQL-запроса:', error);
      }
    );
  });
};

export const updateCocktail = (cocktailId, updatedCocktail) => {
  db.transaction(tx => {
    tx.executeSql(
      'UPDATE Cocktails SET name = ?, image = ?, description = ? WHERE id = ?;',
      [updatedCocktail.name, updatedCocktail.image, updatedCocktail.description, cocktailId],
      () => { console.log('Cocktail updated successfully') },
      error => { console.log('Error updating cocktail: ', error) }
    );

    // Удалить старые ингредиенты
    tx.executeSql(
      'DELETE FROM Ingredients WHERE cocktail_id = ?;',
      [cocktailId],
      () => {
        // Вставить новые ингредиенты
        updatedCocktail.ingredients.forEach(ingredient => {
          tx.executeSql(
            'INSERT INTO Ingredients (cocktail_id, name, amt) VALUES (?, ?, ?);',
            [cocktailId, ingredient.name, ingredient.amt],
            () => { console.log('Ingredient inserted successfully') },
            error => { console.log('Error inserting ingredient: ', error) }
          );
        });
      },
      error => { console.log('Error deleting old ingredients: ', error) }
    );
  });
};











// ---------------------------------------

// export const getDBConnection = async () => {
//   try {
//     const db = await SQLite.openDatabase(
//       database_name,
//       database_version,
//       database_displayname,
//       database_size
//     );
//     console.log("Database OPEN");
//     return db;
//   } catch (error) {
//     console.error("Error: ", error);
//   }
// };

// export const CreateDefaultDB = async (db) => {
//   const createCocktailsTableQuery = `
//     CREATE TABLE IF NOT EXISTS cocktails (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       name TEXT,
//       image TEXT,
//       description TEXT
//     );
//   `;

//   const createIngredientsTableQuery = `
//     CREATE TABLE IF NOT EXISTS ingredients (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       cocktail_id INTEGER,
//       name TEXT,
//       amt TEXT,
//       FOREIGN KEY (cocktail_id) REFERENCES cocktails(id)
//     );
//   `;

//   await db.executeSql(createCocktailsTableQuery);
//   await db.executeSql(createIngredientsTableQuery);

//   const insertCocktailQuery = `
//     INSERT INTO cocktails (id, name, image, description)
//     VALUES (?, ?, ?, ?);
//   `;

//   const insertIngredientQuery = `
//     INSERT INTO ingredients (cocktail_id, name, amt)
//     VALUES (?, ?, ?);
//   `;

//   for (const cocktail of cocktailsData) {
//     const { id, name, image, description, ingredients } = cocktail;
//     console.log(`Cocktail ID: ${id}`);
//     console.log(`Cocktail Name: ${name}`);
//     await db.executeSql(insertCocktailQuery, [id, name, image, description]);


//     for (const ingredient of ingredients) {
//       const { name, amt } = ingredient;
//       await db.executeSql(insertIngredientQuery, [id, name, amt]);

//       console.log(`Ingredient Name: ${name} Amount: ${amt}`);
//     }
//   }

//   console.log("Database populated with initial data");
//   const selectQuery = `SELECT * FROM cocktails`;
//   const results = await db.executeSql(selectQuery);
//   const cocktails = [];
//   results.forEach(result => {
//     for (let i = 0; i < result.rows.length; i++) {
//       cocktails.push(result.rows.item(i));
//     }
//   });
//   console.log("Cocktails:", cocktails);
// };

// export const addCocktail = async (db, cocktail) => {
//   const { name, image, description, ingredients } = cocktail;
//   const insertCocktailQuery = `
//     INSERT INTO cocktails (name, image, description)
//     VALUES (?, ?, ?);
//   `;
//   const result = await db.executeSql(insertCocktailQuery, [name, image, description]);
//   const cocktail_id = result[0].insertId;

//   const insertIngredientQuery = `
//     INSERT INTO ingredients (cocktail_id, name, amt)
//     VALUES (?, ?, ?);
//   `;

//   for (const ingredient of ingredients) {
//     await db.executeSql(insertIngredientQuery, [cocktail_id, ingredient.name, ingredient.amt]);
//   }

//   console.log(`Cocktail ${name} added with ID: ${cocktail_id}`);
// };

// export const editCocktail = async (db, cocktail_id, updatedCocktail) => {
//   const { name, image, description, ingredients } = updatedCocktail;
//   const updateCocktailQuery = `
//     UPDATE cocktails
//     SET name = ?, image = ?, description = ?
//     WHERE id = ?;
//   `;
//   await db.executeSql(updateCocktailQuery, [name, image, description, cocktail_id]);

//   const deleteIngredientsQuery = `
//     DELETE FROM ingredients
//     WHERE cocktail_id = ?;
//   `;
//   await db.executeSql(deleteIngredientsQuery, [cocktail_id]);

//   const insertIngredientQuery = `
//     INSERT INTO ingredients (cocktail_id, name, amt)
//     VALUES (?, ?, ?);
//   `;

//   for (const ingredient of ingredients) {
//     await db.executeSql(insertIngredientQuery, [cocktail_id, ingredient.name, ingredient.amt]);
//   }

//   console.log(`Cocktail ID: ${cocktail_id} updated`);
// };

// export const deleteCocktail = async (db, cocktail_id) => {
//   const deleteCocktailQuery = `
//     DELETE FROM cocktails
//     WHERE id = ?;
//   `;
//   await db.executeSql(deleteCocktailQuery, [cocktail_id]);

//   const deleteIngredientsQuery = `
//     DELETE FROM ingredients
//     WHERE cocktail_id = ?;
//   `;
//   await db.executeSql(deleteIngredientsQuery, [cocktail_id]);

//   console.log(`Cocktail ID: ${cocktail_id} deleted`);
// };

// export const getAllCocktails = async (db) => {
//   console.log("Fetching all cocktails from the database");
//   const selectCocktailsQuery = `
//     SELECT * FROM cocktails;
//   `;
//   const result = await db.executeSql(selectCocktailsQuery);
//   const cocktails = [];
//   console.log(result);
//   for (let i = 0; i < result[0].rows.length; i++) {
//     const cocktail = result[0].rows.item(i);
//     const selectIngredientsQuery = `
//       SELECT * FROM ingredients WHERE cocktail_id = ?;
//     `;
//     const ingredientsResult = await db.executeSql(selectIngredientsQuery, [cocktail.id]);
//     const ingredients = [];

//     for (let j = 0; j < ingredientsResult[0].rows.length; j++) {
//       ingredients.push(ingredientsResult[0].rows.item(j));
//     }

//     cocktails.push({ ...cocktail, ingredients });
//   }
//   console.log('Cocktails:', JSON.stringify(cocktails, null, 2));
// };

// export const closeDatabase = async (db) => {
//   if (db) {
//     console.log("Closing DB");
//     await db.close();
//     console.log("Database CLOSED");
//   } else {
//     console.log("Database was not OPENED");
//   }
// };


// export const getTablesInDatabase = async (db) => {
//   const tablesQuery = `
//       SELECT name FROM sqlite_master WHERE type='table';
//   `;
//   const result = await db.executeSql(tablesQuery);
//   const tables = [];

//   for (let i = 0; i < result[0].rows.length; i++) {
//     tables.push(result[0].rows.item(i).name);
//   }

//   console.log('Tables in the database:', tables);
// };