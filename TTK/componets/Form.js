import React from 'react';
import { StyleSheet, Text, TextInput, Button, View} from 'react-native';
import {Formik} from 'formik';

export default function Form() {

  return (
    <View style={styles.main}>
        <Formik initialValues={{name: '', id: ''}} onSubmit={(values) => console.log(values)}>
            {({ handleChange, handleBlur, handleSubmit, values }) => (
                <View>
                    <TextInput
                        style={styles.input}
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        value={values.name}
                        placeholder='Название коктейля'
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={handleChange('id')}
                        onBlur={handleBlur('id')}
                        value={values.id}
                        placeholder='ID коктейля'
                    />
                    <Button title='Добавить' onPress={handleSubmit}/>
                </View>
            )}
        </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
    input:{
        borderBottomWidth: 1,
        borderColor: 'blue',
        padding: 10,
        width: '60%',  
    }
});