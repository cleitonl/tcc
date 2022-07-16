import React, { Component } from 'react';
import { Container, Button, Item, Input, Text, Form, Icon } from 'native-base';
import { ImageBackground, View, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';

export default class ConsultaCelular extends Component {

  constructor(props) {
    super(props)
    this.state = {
      foco: true,
      isLoading: false,
      imei: null,
      situacaoRes: null,
      situacaoCor: '#000000',
      situacaoImei: null,
      resConsulta: {
        marca: null,
        modelo: null,
        numero: null,
        dataFato: null,
        bo: null,
        imei: null,
        situacao: null
      },
    };
  }

  //Função que Pesquisa na API Celulares
  consultarImei = function () {
    this.setState({ isLoading: true })
    if (this.state.imei == null || this.state.imei.length < 15) { //validação de quantidade de caracteres
      Alert.alert('Aviso', 'insira os 15 digitos do IMEI')
      this.setState({ isLoading: false })
    }
    else { //consulta, seta o loading, seta o state com a resposta e seta a situação
      axios.get(`http://192.168.56.1:8080/aparelho/consulta/` + this.state.imei)
        .then((response) => {
          if (response.data.success === true) {
            this.setState({ foco: false })
            this.setState({ isLoading: false, resConsulta: response.data.data });
            this.setarSituação();
          } else {
            console.log("chamou else")
            this.setState({ isLoading: false, resConsulta: response.data.data });
            this.setarSituação();
          }
        })
        .catch((error) => { //erros de serviço!
          let ndata = {
            marca: null,
            modelo: null,
            numero: null,
            dataFato: null,
            bo: null,
            imei: null,
            situacao: false
          }
          this.setState({ isLoading: false, resConsulta: ndata, situacaoImei: null, situacaoRes:'' })
          Alert.alert("Imei não encontrado!")
        });

    }
  }
  //Função que seta a situação na renderização
  setarSituação = function () {
    switch (this.state.resConsulta.situacao) {
      case true:
        this.setState({ situacaoRes: 'QUEIXADO DE ROUBO/FURTO.' })
        this.setState({ situacaoCor: '#950000' })
        this.setState({ situacaoImei: this.state.resConsulta.imei })
        break;
      case false:
        this.setState({ situacaoRes: 'SEM QUEIXA DE ROUBO/FURTO.' })
        this.setState({ situacaoCor: '#009514' })
        this.setState({ situacaoImei: this.state.imei })
        break;
    }
  }

  render() {
    //renderiza o loading quando isLoading estiver False
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 50, }}>
          <Text style={{ textAlign: "center" }}>Carregando!</Text>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }

    //Render Principal - renderiza quando isLoading estiver True
    return (
      <ImageBackground source={require('../assets/back.jpg')} style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }}>
        <Container style={{ backgroundColor: 'rgba(255, 255, 255, 1)' }}>
          <View style={{ margin: 10, flex: 1 }}>

            <Form>
              <Item>
                <Input onChangeText={(imei) => this.setState({ imei })} maxLength={15} keyboardType='number-pad' autoFocus={this.state.foco} placeholder="Insira o IMEI" style={{ fontSize: 27 }} />
                <Icon active name='search' />
              </Item>

              <View style={{ paddingTop: 20 }}>
                <Button onPress={() => this.consultarImei()} style={{ alignSelf: "center", margin: 10 }} ><Text> Consultar Situação </Text></Button>
              </View>
            </Form>

            <View>
              <Text>Imei:</Text>
              {this.state.situacaoImei && <Text style={{ fontWeight: 'bold', fontSize: 38, }}>{this.state.situacaoImei}</Text>}
            </View>

            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View>
                <Text>Marca:</Text>
                <Text>Modelo:</Text>
                <Text>Contato:</Text>
                <Text>Data do Fato:</Text>
                <Text>Bo:</Text>
              </View>

              <View style={{ marginLeft: 5 }}>
                <Text>{this.state.resConsulta.marca}</Text>
                <Text>{this.state.resConsulta.modelo}</Text>
                <Text>{this.state.resConsulta.numero}</Text>
                <Text>{this.state.resConsulta.dataFato}</Text>
                <Text>{this.state.resConsulta.bo}</Text>
              </View>
            </View>

            <View>
              <Text>Situação:</Text>
              <Text style={{ textAlign: "center", color: this.state.situacaoCor, fontWeight: 'bold', fontSize: 23 }}>{this.state.situacaoRes}</Text>
            </View>

          </View>
        </Container>
      </ImageBackground>
    );
  }
}

//Header Menu
ConsultaCelular.navigationOptions = {
  title: 'Consultar Celular',
  headerStyle: { backgroundColor: '#585858' },
  headerTitleStyle: { color: 'white' }
}