import { Text, View, TextInput, Button, ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';


export default function App() {
  
  const [cep, alterarCep] = useState("00000-000");
  const [logradouro, alterarLogradouro] = React.useState("");
  const [complemento, alterarComplemento] = useState("");
  const [bairro, alterarBairro] = useState("");
  const [localidade, alterarLocalidade] = useState("");
  const [uf, alterarUf] = useState("");
  const [ibge, alterarIbge] = useState("");
  const [gia, alterarGia] = useState("");
  const [ddd, alterarDDD] = useState("");
  const [siafi, alterarSiafi] = useState("");

  const [isLoading, setLoading] = useState(false);

  const buscarEndereco = async () => {
    try{
      const response = await fetch('https://viacep.com.br/ws/' + cep.toString().replace("-","") + '/json/');
      const json = await response.json();
      alterarLogradouro(json.logradouro);
      alterarComplemento(json.complemento);
      alterarBairro(json.bairro);
      alterarLocalidade(json.localidade);
      alterarUf(json.uf);
      alterarIbge(json.ibge);
      alterarGia(json.gia);
      alterarDDD(json.ddd);
      alterarSiafi(json.siafi);

    }catch(error){
      Alert.alert(error);
    }finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    buscarEndereco();
  }, []);

  return(
    <ScrollView>
    <SafeAreaView style={style.container} >
    <View>
      <Text style = {style.texto}>Entre com o CEP para pesquisar: 00000-000</Text>
      <TextInput
        style = {style.input}
        onChangeText = {alterarCep}
        value = { cep }
        keyboardType = "numeric"
        maxLength = {9}
        onFocus = {() => alterarCep("")}
      />

      {isLoading ? <ActivityIndicator />:
      <Button
        onPress={() => {
          setLoading(true);
          buscarEndereco();
          }
        }
        style = {style.botao}
        title='Consumindo ViaCEP API'
        color='#841584'
        accessibilityLabel='Aprenda mais sobre consumo de API REST'
      />
      }

      <Text>Endereço</Text>
      <TextInput
        style = {style.input}
        onChangeText={alterarLogradouro}
        value={logradouro}
        keyboardType='default'
        hintText={'Logradouro'}
        accessibilityHint='Logradouro'
        multiline={true}
      />  

      <Text>Complemento</Text>
      <TextInput
        style = {style.input}
        onChangeText={alterarComplemento}
        value={complemento}
        keyboardType='default'
      />

      <Text>Bairro</Text>
      <TextInput
        style = {style.input}
        onChangeText={alterarBairro}
        value={bairro}
        keyboardType='default'
      />

      <Text>Localidade</Text>
      <TextInput
        style = {style.input}
        onChangeText={alterarLocalidade}
        value={localidade}
        keyboardType='default'
      />

      <Text>Estado</Text>
      <TextInput
        style = {style.input}
        onChangeText={alterarUf}
        value={uf}
        keyboardType='default'
        maxLength={2}
      />

      <Text>Ibge</Text>
      <TextInput
        style = {style.input}
        onChangeText={alterarIbge}
        value={ibge}
        keyboardType='default'
      />

      <Text>Gia</Text>
      <TextInput
        style = {style.input}
        onChangeText={alterarGia}
        value={gia}
        keyboardType='default'
      />

      <Text>DDD</Text>
      <TextInput
        style = {style.input}
        onChangeText={alterarDDD}
        value={ddd}
        keyboardType='default'
      />

      <Text>Siafi</Text>
      <TextInput
        style = {style.input}
        onChangeText={alterarSiafi}
        value={siafi}
        keyboardType='numeric'
      />
    </View>
    </SafeAreaView>
    </ScrollView>
  )

}

const style = StyleSheet.create({
  container:{
    display: 'flex',
    flex: 1,
    backgroundColor: '#fff',
    margin: 32,
    marginTop: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  texto:{
    alignSelf: 'center',
    textAlign: 'center',
  },

  input:{
    height: 40,
    minHeight: 40,
    margin: 16,
    borderWidth: 1,
    padding: 4,
    width: '100%',
    maxWidth: 256,
    minWidth: 250,
    borderRadius: 32,
    textAlign: 'center',
  },

  botao:{
    height: 40,
    margin: 16,
    borderWidth: 1,
    padding: 4,
    width: 50,
    borderRadius: 32,

  },
})
