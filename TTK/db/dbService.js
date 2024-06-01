import SQLite from 'react-native-sqlite-storage';
import koktels from '../data/koktels.json';

const database_name = "CocktailsDB.db";
// const table_name_cocktails = "Cocktails";
// const table_name_ingredients = "Ingredients";

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
export const getTableCount = (db_ = db) => {
  return new Promise((resolve, reject) => {
      db_.transaction(tx => {
          tx.executeSql(
              "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';",
              [],
              (tx, results) => {
                  const tableCount = results.rows.length;
                  console.log('Количество таблиц в базе данных:', tableCount);
                  for (let i = 0; i < results.rows.length; i++) {
                      console.log('Таблица:', results.rows.item(i).name);
                  }
                  resolve(tableCount); // Возвращаем количество таблиц через resolve
              },
              error => {
                  console.error('Ошибка при выполнении SQL-запроса:', error);
                  reject(error); // Возвращаем ошибку через reject
              }
          );
      });
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

export const clearDatabaseKoktels = () => {
  console.log('Очистка базы данных...');
  db.transaction(tx => {
      tx.executeSql(
          `DROP TABLE IF EXISTS Cocktails;`,
          [],
          () => {
              console.log(`Таблица Cocktails успешно удалена!`);
          },
          (tx, error) => {
              console.error('Ошибка при удалении таблицы:', error);
          }
      );
  });
  db.transaction(tx => {
    tx.executeSql(
        `DROP TABLE IF EXISTS Ingredients;`,
        [],
        () => {
            console.log(`Таблица Ingredients успешно удалена!`);
        },
        (tx, error) => {
            console.error('Ошибка при удалении таблицы:', error);
        }
    );
});
};