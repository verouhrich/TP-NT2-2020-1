import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {vibrate} from './utils'
import Constants from 'expo-constants'

const CronometroPomodoro = props => (
  <View style={styles.tareaContainer}>
    <Text style={styles.Reloj}>
    {props.minutos}:{props.segundos}
    </Text>
  </View>
)

export default class App extends React.Component {
	constructor(){
		super();
		this.state={
			trabajando: true, 
			minutos: '25',
			segundos: '00',
			encendido: false,
			completado: false,
      texto: '¡Comenzar a trabajar!'
		}
  }
  
	componentDidMount(){
			this.interval = setInterval(() => {
        if(!this.state.completado && this.state.encendido){	
          if(this.state.segundos == 0){
            this.setState(tiempo => ({ 
              minutos: String(parseInt(tiempo.minutos) - 1), 
              segundos: '59' 
            })
            )
            if(parseInt(this.state.minutos) < 10){
            this.setState({ 
                minutos: '0' + String(this.state.minutos) 
              })
            }
          }else{
            this.setState(tiempo => ({ 
              segundos: String(parseInt(tiempo.segundos) - 1) 
            })
            )
            if(parseInt(this.state.segundos) < 10){
              this.setState(
                { segundos: '0' + String(this.state.segundos) 
              })
            }
          }
          if(parseInt(this.state.minutos) == '00' 
            && parseInt(this.state.segundos) == '00' 
            && this.state.trabajando ){
              this.setState({ 
                minutos: '05', 
                segundos: '00',  
                completado: false, 
                encendido: true , 
                trabajando: false , 
                texto: 'Descansando'
              })
              vibrate()
          }
          if(parseInt(this.state.minutos) == '00' 
            && parseInt(this.state.segundos) == '00' 
            && !this.state.trabajando ){
              this.setState({ 
                minutos: '25', 
                segundos: '00',  
                completado: false, 
                encendido: true, 
                trabajando: true, 
                texto: 'Trabajando'
              })
              vibrate()
          }
        }
      }, 1000)
	}
  
	iniciar(){
    this.setState({ 
      encendido : true,
      texto: 'Trabajando',
    })
  }
  
	pausar(){
		this.setState({ 
      encendido : false,
      texto: 'Trabajando'
    })
  }
  
  reiniciar(){
		this.setState({ 
			encendido: false, 
			minutos: '25',
			segundos: '00', 
			completado: false, 
			trabajando: true, 
      texto: '¡Comenzar a trabajar!'
    })
  }
	
	render() {
		return (
		<View style={[styles.AppContainer, styles.fill]}>
      <View style={styles.ContainerReloj}>
				<CronometroPomodoro 
          minutos={this.state.minutos} 
          segundos={this.state.segundos} 
          completado={this.state.completado}
				/>
				<Text>{this.state.texto}</Text>
			</View>
			<View style={styles.Botones}>		
			<Button 
				title='  Inicio ' 
				onPress={() => this.iniciar()}
				color = "black"
			/>
			<Button 
				title='  Pausa  '
				style={styles.Boton}
				onPress={() => this.pausar()}
				color = "black"
			/>
			<Button 
				title='Reiniciar' 
				style={styles.Boton}
				onPress={() => this.reiniciar()} 
				color = "black"
			/>
			</View>
		</View>
		);
	}
}

const styles = StyleSheet.create({
	AppContainer: {
		flex: 1,
		backgroundColor: "#DC143C",
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight		
  },
  Reloj: { 
    fontSize: 80 
  },
  ContainerReloj: { 
    alignItems: 'center', 
    flex: 4, 
	justifyContent: 'center'
  },
  Botones: {
    justifyContent: 'space-around', 
    flexDirection: 'row', 
    flex: 0.5, 
    alignItems: 'center', 
	backgroundColor : "black"
  }
});