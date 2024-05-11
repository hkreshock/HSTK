import { SafeAreaView, FlatList, View, Text, Image, ActivityIndicator, TextInput } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import hstkFetch from '../../hstkFetch';

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
                !loading ?
                <TextInput style={{ height: 40, margin: 12, borderWidth: 1, padding: 10 }} onChangeText={onChangeSearch} value={search} />
                : null
            }
            {
                posts.length ?
                <FlatList
                  data={posts}
                  renderItem={
                    loading ?
                    (v, i) => <ActivityIndicator id={i} size="small" />
                    : ({item}) => <Item title={item.title} id={item.id} />
                  }
                  keyExtractor={(item, idx) => item.id || idx}
                />
                : <Text>No Results</Text>
            }
        </SafeAreaView>
    )
}