import React, {Component} from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import axios from 'axios';
import { ActivityIndicator,
         StyleSheet,
         View,
         Image,
         Text, FlatList } from 'react-native';



export class IssMap extends Component {

    constructor(props) {
        super(props);
        this.state = this.getInitialState();
        this.getIssPosition();
        this.getIssInformations();
    }

    render() {
        return (
            this.state.loadedPosition ? 
            (<MapView style = {styles.map} region={this.state.region}>
                <Marker
                    coordinate={{ 
                        latitude: this.state.issPosition.latitude,
                        longitude: this.state.issPosition.longitude,
                    }}>

                    <Image source={require('../../src/img/ISSIcon.png')} />
                    <Callout>
                        <View style={styles.issView}>
                            <Text style={styles.issTitle}>Informações da ISS</Text>
                            <Text>Atualmente a ISS possui { this.state.issDescription.astroNumber } astronautas. São eles:</Text>
                            <FlatList
                                data={ this.state.issDescription.astroNames }
                                renderItem={({item}) => (
                                    <Text key={item.key} style={{ fontWeight: 'bold' }}>{item.name}</Text>
                                )}
                            />
                        </View>
                    </Callout>
                </Marker>

            </MapView>) :
            (
                <View style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )
        );
    }

    getInitialState() {
        return {
            loadedPosition: false,
            region: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0,
                longitudeDelta: 0,
            },
            issPosition: {
                latitude: 0,
                longitude: 0,
            },
            issDescription: {
                astroNumber: 0,
                astroNames: [],
            },
        };
    }

    getIssInformations() {
        axios.get('http://api.open-notify.org/astros.json')
        .then(res => {
            this.setState({
                issDescription: {
                    astroNumber: res.data.number,
                    astroNames: res.data.people.map((astro, index) => { return { key: index.toString(), name: astro.name }; })
                }
             });
        })
    }


    getIssPosition() {
        setInterval(() => {
            axios.get('http://api.open-notify.org/iss-now.json')
            .then(
                res => {
                    const marker = {
                        latitude: res.data.iss_position.latitude,
                        longitude: res.data.iss_position.longitude
                    };

                    this.setState({
                        loadedPosition: true, 
                        region: {
                            latitude: parseFloat(marker.latitude),
                            longitude: parseFloat(marker.longitude),
                            latitudeDelta: 25,
                            longitudeDelta: 50, 
                        },
                        issPosition: {
                            latitude: parseFloat(marker.latitude),
                            longitude: parseFloat(marker.longitude),
                        }
                    });
                },
                err => reject(err)
            );
        }, 1000);
       
    }
}

const styles = StyleSheet.create({
    map: {
        height: 100,
        flex: 1
    },
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10
    },
    issView: {
        width: 350,
        height: 'auto'
    },  
    issTitle: {
        textAlign: 'center',
        fontWeight: 'bold'
    }
});