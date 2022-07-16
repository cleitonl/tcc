import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from "react-native";
import { FlatList } from 'react-native-gesture-handler';

export default class Avisos extends Component {
  avisos = [
    {
      titulo: '',
      data: '04/09/2019',
      conteudo: 'Adicionado a Função da Lista de Desempenho Operacional'
    }
  ]

  render() {
    return (
      <View style={styles.fundoAviso}>
        <View style={styles.topo}>

          <Image source={require('../assets/letter.png')} style={{ width: 30, height: 30 }} />
          <Text style={styles.tituloTopo}>Quadro de Avisos:</Text>

        </View>

        <FlatList
          
          data = {this.avisos}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) =>
            <View>
              <View style={styles.tituloContainer}>
                <Text style={styles.tituloTexto}>{item.titulo}</Text>
                <Text style={styles.tituloTexto}>{item.data}</Text>
              </View>
              <View>
                <Text>{item.conteudo}</Text>
              </View>
            </View>
          }
        />

      </View>
    )
  }

}

const styles = StyleSheet.create({
  topo: {
    flexDirection: 'row'
  },
  tituloTopo: {
    margin: 2,
    fontSize: 18,
    fontWeight: "bold"
  },
  fundoAviso: {
    flex: 1,
    margin: 5,
    padding: 5,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.85)'
  },
  tituloContainer: {
    fontWeight: "bold",
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  tituloTexto: {
    fontSize: 15,
    fontWeight: "bold"
  }
})
