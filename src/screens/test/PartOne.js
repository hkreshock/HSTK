import { SafeAreaView, FlatList, View, Text, Image } from "react-native";
import placeholderData from '../../localPlaceholderData';
import { AntDesign } from '@expo/vector-icons';

const Item = ({ title, id }) => (
    <View style={{ display: 'flex', flexDirection: 'row', padding: 12, alignItems: 'center' }}>
        <Image style={{ width: 25, height: 25 }} source={require('../../../assets/icon.png')}></Image>
        <View style={{ display: 'flex', flexDirection: 'column', maxWidth: '50%' }}>
            <Text>{id}</Text>
            <Text>{title}</Text>
        </View>
        <AntDesign style={{ marginLeft: 'auto' }} name='right' color='#151515' size={24} />
    </View>
);

export default function () {
    return (
        <SafeAreaView>
            <FlatList
              data={placeholderData}
              renderItem={({item}) => <Item title={item.title} id={item.id} />}
              keyExtractor={item => item.id}
            />
        </SafeAreaView>
    )
}