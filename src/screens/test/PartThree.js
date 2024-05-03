import { SafeAreaView, FlatList, View, Text, Image, ActivityIndicator, TextInput, TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import PartThreeDetail from './PartThreeDetail';
import hstkFetch from '../../hstkFetch';

const Item = ({ title, id, setID }) => (
    <TouchableOpacity onPress={() => setID(id)} style={{ display: 'flex', flexDirection: 'row', padding: '12px', alignItems: 'center' }}>
        <Image style={{ width: '25px', height: '25px' }} source={require('../../../assets/icon.png')}></Image>
        <View style={{ display: 'flex', flexDirection: 'column', maxWidth: '50%' }}>
            <Text>{id}</Text>
            <Text>{title}</Text>
        </View>
        <AntDesign style={{ marginLeft: 'auto' }} name='right' color='#151515' size={24} />
    </TouchableOpacity >
);

export default function () {
    const [activeID, setActivePost] = useState(null);
    const [loading, toggleLoading] = useState(true);
    const [search, setSearchValue] = useState('');
    const [posts, setPosts] = useState(['loading']);
    const [localDataSource, setLocalDataSource] = useState([]);

    useEffect(() => {
        hstkFetch('https://jsonplaceholder.typicode.com/posts').then((response) => {
            return response.json();
          }).then((data) => {
            setLocalDataSource(data)
            setPosts(data)
            toggleLoading(false)
        })
    }, []);
    const onChangeSearch = (val) => {
        setPosts([]);
        setSearchValue(val);
        const newPosts = localDataSource.filter(({ body }) => body.toLowerCase().includes(val.toLowerCase()));
        setPosts(newPosts);
    }

    return (
        <SafeAreaView>
            {
                !loading && !activeID ?
                <TextInput style={{ height: 40, margin: 12, borderWidth: 1, padding: 10 }} onChangeText={onChangeSearch} value={search} />
                : null
            }
            <PartThreeDetail id={activeID} />
            {
                posts.length && !activeID ?
                <FlatList
                  data={posts}
                  renderItem={
                    loading ?
                    (v, i) => <ActivityIndicator id={i} size="small" />
                    : ({item}) => <Item setID={setActivePost} title={item.title} id={item.id} />
                  }
                  keyExtractor={(item, idx) => item.id || idx}
                />
                : !activeID ? <Text>No Results</Text> : null
            }
        </SafeAreaView>
    )
}