import SQLite from 'react-native-sqlite-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

SQLite.DEBUG(true);
SQLite.enablePromise(false);

const FetchNewYorkTimesService = async (setData) => {
  const newsLastUpdate = await AsyncStorage.getItem('@news_last_update');
  const newsLastUpdateDate = newsLastUpdate !== null ? new Date(newsLastUpdate) : null;

  const currentDate = new Date();

  if (newsLastUpdateDate !== null && newsLastUpdateDate.toDateString() === currentDate.toDateString()) {
    await fetchFromSQLite(setData);
  } else {
    await fetchFromAPI(setData);
  }
};

const fetchFromAPI = async (setData) => {
  fetch('https://api.nytimes.com/svc/topstories/v2/fashion.json?api-key=SGIrrwebH4QGgqXd8k8M94iAmGMylWGB')
    .then((res) => {
      return res.json();
    })
    .then(async (res) => {
      setData(res.results.map((item) => {
        return {
          title: item.title,
          abstract: item.abstract,
          url: item.url,
          byline: item.byline,
          thumbnail: item.multimedia[0].url,
        };
      }));

      AsyncStorage.setItem('@news_last_update', (new Date()).toISOString());
      writeToSQLite(res.results);
    })
    .catch((error) => {
      console.warn(error);
    });
};

const fetchFromSQLite = async (setData) => {
  const db = SQLite.openDatabase('NewsSQLite.db');

  await db.transaction(async (tx) => {
    await createSQLiteTable(tx);
    await readFromSQLite(tx, setData);
  });
};

const writeToSQLite = async (res) => {
  const db = SQLite.openDatabase('NewsSQLite.db');

  await db.transaction(async (tx) => {
    await createSQLiteTable(tx);
    await tx.executeSql('select count(*) from news', [], (tx, count) => {
      const prevLen = count.rows.item(0)['count(*)'];
      console.log('prevLen:', prevLen);
      const len = res.length;
      for (let i = 0; i < len; i++) {
        if (i < prevLen) {
          tx.executeSql(`update news set
            title = ?,
            abstract = ?,
            url = ?,
            byline = ?,
            thumbnail = ?
            where id = ?`,
            [res[i].title, res[i].abstract, res[i].url, res[i].byline, res[i].multimedia[0].url, i]);
        } else {
          tx.executeSql(`insert into news (id, title, abstract, url, byline, thumbnail) values
            (?, ?, ?, ?, ?, ?)`,
            [i, res[i].title, res[i].abstract, res[i].url, res[i].byline, res[i].multimedia[0].url]);
        }
      }

      for (let i = len; i < prevLen; i++) {
        tx.executeSql('delete from news where id = ?', [i]);
      }
    });
  });
};

const dropSQLiteTable = (tx) => {
  tx.executeSql('drop table if exists news');
};

const createSQLiteTable = (tx) => {
  tx.executeSql(`
    create table if not exists news (
      id integer primary key not null,
      title varchar(255),
      abstract varchar(255),
      url varchar(255),
      byline varchar(255),
      thumbnail varchar(255)
    )`
  , []);
};

const readFromSQLite = (tx, setData) => {
  tx.executeSql(
    `select * from news`,
    [],
    (tx, res) => {
      const len = res.rows.length;
      var data = [];
      for (let i = 0; i < len; i++) {
        data.push(res.rows.item(i));
      }

      setData(data);
    });
};

export { FetchNewYorkTimesService };
